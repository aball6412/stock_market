$(document).ready(function() {
    
    //HOLDS ALL JAVASCRIPT THAT DOES NOT PERTAIN TO CREATING THE CHART

    $(".get_stock").click(function() {
        
        //Get the symbol that user inputed
        var ticker = $(".ticker_text").val();
        
        //Save info in data object
        var data = {
            ticker: ticker.toUpperCase()
        }
        
        
        
        //Make request to server with specified user data
        $.get("/update", data, function(data) {
            
            
            console.log(data);
            
            
        }); //End get request
        
        
        
      
        
        
        
    }); //End get request
    
    
    
}); //End document