var express = require("express");
var app = express();
var https = require("https");



//Set the port
var port = process.env.PORT || 3000;





//Serve static pages and set view engine
app.use("/", express.static(__dirname + "/public"));
app.set("view engine", "ejs");



//Get the API key
var api_key = process.env.QUANDL_API_KEY;


//ROUTES

app.get("/", function (request, response) {
    
    //Set up initial variables
    var str = "";
    var price_list = [];
    var url = "https://www.quandl.com/api/v3/datasets/WIKI/";
    var ticker = "TSLA";

    

    //Make the query string
    url = url + ticker + ".json?api_key=" + api_key;
    

    
    //Make the API request
    https.get(url, function(res) {
        
        
        res.on("data", function(chunk) {
            str += chunk;
        });
        
        
        res.on("end", function() {
            
            var data = JSON.parse(str);
            
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
            


            response.render("index", { data: price_list });

            
        });
        
    }); //End API request
    
    
    
}); //End index route


app.listen(port);