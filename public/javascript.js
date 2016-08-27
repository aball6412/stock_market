$(document).ready(function() {
    
    //HOLDS ALL JAVASCRIPT THAT DOES NOT PERTAIN TO ADDING NEW STOCKS TO CHART AFTER INITIAL PAGE LOAD

    $(".get_stock").click(function() {
        
        //Get the symbol that user inputed
        var ticker = $(".ticker_text").val();
        
        //Save info in data object
        var data = {
            ticker: ticker.toUpperCase()
        }
        
        
        
        //Make request to server with specified user data
        $.get("/update", data, function(data) {
            
      
            //Get the prices and reverse array so that it's charted correctly
            var prices = data.reverse();
            
            
            
            //Slice the price array so that we are starting at the start date
            var date = new Date();
    
            var year = date.getFullYear();
            var month = date.getMonth() + 1;
            var day = date.getUTCDate();


            //Create a new date that goes back a year (or other amount of time if we want later)
            var start_date = new Date(month + "/" + day + "/" + (year - 1));

            //Find the index where api data matches our start date
            var start_index = prices.findIndex(function(element, index, array) {

                return new Date(array[index].date) >= start_date;

            });

            //Slice the api data so that we are only charting from our start date forward
            prices = prices.slice(start_index);
            

            
            
            //Append new stock to the chart
            
            //Set up needed variables and select the chart on the page
            
            //Set height and width
            var w = 1000;
            var h = 450;

            //Set chart margins
            var margin = {
                    top: 50,
                    bottom: 75,
                    right: 50,
                    left: 100
                }


            var height = h - margin.top - margin.bottom;
            var width = w - margin.left - margin.right;
            
            var y = d3.scaleLinear()
                .domain([0, (d3.max(prices, function(d) {
                    return d.close;
                }) + 5)])
                .range([height, 0]);

            var x = d3.scaleLinear()
                .domain([0, prices.length])
                .range([0, width]);
            
            
            
            var chart = d3.select(".display");
            
            
                
            //Create "dot" class and bind the data to the svg
            chart.selectAll(".dot")
                .data(prices)
                .enter()
                    .append("rect")
                    .classed("dot", true)
                    .attr("x", function(d, i) {
                        return x(i);
                    })
                    .attr("y", function(d, i) {
                        return y(d.close);
                    })
                    .attr("width", function(d, i) {
                        return 1;
                    })
                    .attr("height", function(d, i) {
                        return 1;
                    });


            //Draw the line on the chart
            chart.call(function(d, i){

                console.log(ticker);
                
                //Get a random color
                var colors = ["#CCC", "#4d9e2e", "#5ae8d7", "#1f46bf", "#670ec1", "#de29b4", "#ec4b5f", "#e0dd09", "#09e0d0", "#c5adce"];

                var random = Math.floor(Math.random() * 10);
                
                for (var j = 0; j < prices.length; j++) {

                    if ((j+1) === prices.length) {
                        break;
                    }
                    
                    chart.append("line")
                        .style("stroke", colors[random])
                        .style("stroke-width", 2)
                        .classed(ticker.toUpperCase(), true)
                        .attr( "y1", y(prices[j].close) )
                        .attr( "y2", y(prices[j+1].close) )
                        .attr( "x1", x(j) )
                        .attr( "x2", x(j+1) );

                }
                
                
                $(".row").append("<div style='color:" + colors[random] + "' class='stock col-xs-4'><div data-internalid='" + ticker.toUpperCase() + "' class='stock_holder'><h3>" + ticker.toUpperCase() + "</h3><button type='button' class='btn btn-danger btn-sm remove_stock'>Remove</button></div></div>");

            });
            
            
            
                

        }); //End get request
        

    }); //End get stock function
    
    
    
    
    
    $(".holder").on("click", ".remove_stock", function() {
        
        
        console.log("I need to remove this stock");
        
        var ticker = $(this).parent().data("internalid");
        
        d3.selectAll("." + ticker).remove();
        
    });
    
    
    
    
    
    
}); //End document








