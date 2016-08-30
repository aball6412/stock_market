var express = require("express");
var app = require("express")();
var http = require("http").Server(app);
var io = require('socket.io')(http);

var https = require("https");


//Set the port
var port = process.env.PORT || 3000;


//Serve static pages and set view engine
app.use("/", express.static(__dirname + "/public"));
app.set("view engine", "ejs");



//Get the API key
var api_key = process.env.QUANDL_API_KEY;





//Create function to make API call to Quandl
var get_stock = function(url, update, response, ticker) {
    

    //Set initial variables
    var str = "";
    var price_list = [];
    
    //Make the API request
    https.get(url, function(res) {
        

        
        res.on("data", function(chunk) {
            str += chunk;
        });
        
        
        res.on("end", function() {
            
            var data = JSON.parse(str);
            
            if (data.quandl_error) {
                response.send("Error");
            }
            
            else {
                
                
                //Get the list of data
                var data = data.dataset.data;


                for (var i=0; i <data.length; i++) {


                    var date = data[i][0];
                    var close = data[i][11];


                    var display = {
                        date: date,
                        close: close
                    }

                    price_list.push(display);

                }

                if (update === false) {
                    response.render("index", { data: price_list, ticker: ticker }); 
                }
                else if (update === true) {
                    response.send(price_list);
                }
                
                else if (update === "socket.io") {
                    
                    io.emit("new_stock", { data: price_list, ticker: ticker.toUpperCase() });

                }
                
                
            } //End else statement
 
        });
        
        
    }); //End API request
    
    
}; //End get stock function








//ROUTES

app.get("/", function (request, response) {
    
    //Set up initial variables
    var url = "https://www.quandl.com/api/v3/datasets/WIKI/";
    var ticker = "TSLA";

    //Make the query string
    url = url + ticker + ".json?api_key=" + api_key;
    
    //Make API request
    get_stock(url, false, response, ticker);
    
    
    
    
}); //End index route





app.get("/update", function(request, response) {
    
    //Set initial variables
    var url = "https://www.quandl.com/api/v3/datasets/WIKI/";
    var ticker = request.query.ticker;
    
    //Make query string
    url = url + ticker + ".json?api_key=" + api_key;
    
    //Make API request
    get_stock(url, true, response);
    
    
}); //End update route



app.get("/remove", function(request, response) {
    
    
    response.send("Success");
    
    
});



io.on("connection", function(socket) {

    console.log("A client connected");
    
    socket.on("new_stock", function(ticker) {
        
        //When a user updates stock make API call to Quandl and send info to all connected clients
        var url = "https://www.quandl.com/api/v3/datasets/WIKI/";
        var ticker = ticker;
        url = url + ticker + ".json?api_key=" + api_key;
        
        //Get stock function will emit to all clients inside the function
        get_stock(url, "socket.io", null, ticker);
        
     
    });
    
    socket.on("remove_stock", function(ticker) {

        io.emit("remove_stock", ticker);
        
    });
    
    
    socket.on("disconnect", function() {
        
        console.log("A client disconnected");
    })
    
    
    
}); //End .io


//Need to use http.listen instead of app.listen because http is the one that sockets.io is connected to.
http.listen(port, function() {
    
    
    console.log("listening on port: " + port);
})