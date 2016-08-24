var express = require("express");
var app = express();
var https = require("https");

var port = process.env.PORT || 3000;






app.use("/", express.static(__dirname + "/public"));
app.set("view engine", "ejs");



//Get the API key
var api_key = process.env.QUANDL_API_KEY;



app.get("/", function (request, response) {
    
    //Set up initial variables
    var str = "";
    var url = "https://www.quandl.com/api/v3/datasets/WIKI/";
    var ticker = "TSLA";

    

    //Make the query string
    url = url + ticker + ".json?api_key=" + api_key;
    
    console.log(url);
    
    //Make the API request
    https.get(url, function(res) {
        
        
        res.on("data", function(chunk) {
            str += chunk;
        });
        
        
        res.on("end", function() {
            
            response.send(str);
            //response.render("index");
            
        });
        
    });
    
    
    
});


app.listen(port);