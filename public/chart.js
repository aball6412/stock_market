
$(document).ready(function() {
    
    //HOLDS ALL JAVASCRIPT RELATED TO CREATING THE CHART ON INITIAL PAGE LOAD
    
    
    
    //Find the date that we want to chart for
    //Get current date and split it into year, month, day
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
    


    //Set up scales
    var y = d3.scaleLinear()
        .domain([0, (d3.max(prices, function(d) {
            return d.close;
        }) + 5)])
        .range([height, 0]);
    
    var x = d3.scaleLinear()
        .domain([0, prices.length])
        .range([0, width]);
    
    

    //Make a time scale
    var yearScale = d3.scaleTime()
        .domain([new Date(d3.min(prices, function(d) {
            return d.date;
        })), new Date(d3.max(prices, function(d) {
            return d.date;
        }))] )
        .range([0, width]);
    
    
    //Set up the axes
    var yAxis = d3.axisLeft(y);
    var xAxis = d3.axisBottom(yearScale);
    

    ///CHART CREATION STARTS BELOW
    
    
    //Append the svg to the DOM
    var svg = d3.select("body").append("svg")
        .attr("id", "chart")
        .attr("width", w)
        .attr("height", h);
    
    
    var chart = svg.append("g")
        .classed("display", true)
        .attr("transform", "translate(" + margin.left + "," + margin.right + ")");
    
    
    
    //Create "dot" class and bind the data to the svg
    chart.selectAll(".dot")
        .data(prices)
        .enter()
            .append("rect")
            .classed("dot", true)
            .classed(ticker.toUpperCase(), true)
            .attr("display", "none")
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
        
        
        $(".row").append("<div style='color:" + colors[random] + "' class='stock " + ticker.toUpperCase() + " col-xs-4'><div data-internalid='" + ticker.toUpperCase() + "' class='stock_holder'><h3>" + ticker.toUpperCase() + "</h3><button type='button' class='btn btn-danger btn-sm remove_stock'>Remove</button></div></div>");
        
           
    });
        
    
    //Add x axis to the chart
    chart.append("g")
        .classed("xAxis", true)
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);
    
    //Add y axis to the chart
    chart.append("g")
        .classed("yAxis", true)
        .attr("transform", "translate(0,0)")
        .call(yAxis);
    
    
    //Create labels
    chart.select(".yAxis")
        .append("text")
        .attr("x", 0)
        .attr("y", 0)
        .style("font-size", 15)
        .style("text-anchor", "middle")
        .style("fill", "black")
        .attr("transform", "translate(-" + ((margin.left/2 ) + 7) + "," + height/2 + ") rotate(-90)")
        .text("Stock Price");
    
    
    chart.select(".xAxis")
        .append("text")
        .attr("x", 0)
        .attr("y", 0)
        .style("font-size", 15)
        .style("fill", "black")
        .attr("transform", "translate(" + width/2 + "," + ((margin.bottom/2) + 7) + ")")
        .text("Years");
    
    
}); //End document









