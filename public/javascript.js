
$(document).ready(function() {
    
    
    console.log("nominal");
    
    
    var line = function(prices) {
        
        for (var lit = 0; lit <= prices.length; lit++) {
            
            console.log("lit");
            //console.log("x" + (i+2));
            
            
            chart.append("line")
                .style("stroke", "black")
                .attr(("y" + (i+1)), y(prices[i]))
                .attr(("y" + (i+2)), y(prices[i]))
                .attr(("x" + (i+1)), x(prices[i]))
                .attr(("x" + (i+2)), x(prices[i]));
        }
        
        
    } //End line function
    
    
    var w = 1000;
    var h = 650;
    
    //Set chart margins
    var margin = {
            top: 25,
            bottom: 25,
            right: 25,
            left: 25
        }
    
    
    var height = h - margin.top - margin.bottom;
    var width = w - margin.left - margin.right;
    
    
    //Set up scales
    var y = d3.scaleLinear()
        .domain([0, (d3.max(prices) + 5)])
        .range([height, 0]);
    
    var x = d3.scaleLinear()
        .domain([0, prices.length])
        .range([0, width]);
    
    
    //Set up the axes
    var yAxis = d3.axisLeft(y);
    var xAxis = d3.axisBottom(x);
    

    
    
    
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
            .attr("x", function(d, i) {
                return x(i);
            })
            .attr("y", function(d, i) {
                return y(d);
            })
            .attr("width", function(d, i) {
                return 5;
            })
            .attr("height", function(d, i) {
                return 5;
            })

    
    
//    //Put line on chart
//    chart.append("line")
//        .style("stroke", "black")
//        .attr("y1", y(10))
//        .attr("y2", y(50))
//        .attr("x1", x(2))
//        .attr("x2", x(3))
    
    chart.call(function(d, i){
          
        for (var j = 0; j < prices.length; j++) {
            
            if ((j+1) === prices.length) {
                break;
            }
            console.log("y" + (j+1));
            console.log("y" + (j+2));
   
            chart.append("line")
                .style("stroke", "black")
                .attr( "y1", y(prices[j]) )
                .attr( "y2", y(prices[j+1]) )
                .attr( "x1", x(j) )
                .attr( "x2", x(j+1) );

        }
           
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
    
    
}); //End document









