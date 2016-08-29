$(document).ready(function() {
    
    //HOLDS ALL JAVASCRIPT THAT DOES NOT PERTAIN TO ADDING NEW STOCKS TO CHART AFTER INITIAL PAGE LOAD

    $(".get_stock").click(function() {
        
        //If there is an error showing, remove it
        $(".error_text").addClass("no_show");
        
        //Get the symbol that user inputed
        var ticker = $(".ticker_text").val();
        
        //Save info in data object
        var data = {
            ticker: ticker.toUpperCase()
        }
        
        
        //Emit message through sockets.io so all other clients update stock list as well
        socket.emit("new_stock", ticker.toUpperCase());
        
        //Reset the value of the input box to nothing
        $(".ticker_text").val("");
        

    }); //End get stock function
    
    
    
    
    //When you click to remove a stock...
    $(".holder").on("click", ".remove_stock", function() {
        
        //Get the ticker symbol
        var ticker = $(this).parent().data("internalid");
        
        
        //Make API call to remove stock
        $.get("/remove", { ticker: ticker }, function(data) {
            
            if (data === "Success") {
                //Emit message through sockets.io so all other clients update stock list as well
                socket.emit("remove_stock", ticker.toUpperCase());
            }
            
            
        }); //End get request
        
        
        
        //Remove specified stock from the chart
        d3.selectAll("." + ticker).remove();

        //Remove specified stock from the screen
        $(this).parent().parent().remove();
        
    });
    
    
    
    
    
    
}); //End document








