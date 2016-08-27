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
            
            

            
            //Get the prices
            var prices = data.reverse();
            
            
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

                for (var j = 0; j < prices.length; j++) {

                    if ((j+1) === prices.length) {
                        break;
                    }

                    chart.append("line")
                        .style("stroke", "red")
                        .style("stroke-width", 2)
                        .attr( "y1", y(prices[j].close) )
                        .attr( "y2", y(prices[j+1].close) )
                        .attr( "x1", x(j) )
                        .attr( "x2", x(j+1) );

                }

            });
                

            
            
            
            
        }); //End get request
        
        
        
      
        
        
        
    }); //End get request
    
    
    
}); //End document