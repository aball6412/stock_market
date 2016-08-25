
$(document).ready(function() {
    
    
    console.log("nominal");
    
    
    
    w = 1000;
    h = 650;
    
    //Set chart margins
    var margin = {
            top: 0,
            bottom: 0,
            right: 0,
            left: 0
        }
    
    
    var height = h - margin.top - margin.bottom;
    var width = w - margin.left - margin.right;
    
    
    //Set up scales
    var y = d3.scaleLinear()
        .domain([0, prices.length])
        .range([0, height]);
    
    var x = d3.scaleLinear()
        .domain([0, (d3.max(prices) + 5)])
        .range([0, width]);
    
    
    console.log(d3.max(prices));
    
    
    
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
                return x(d);
            })
            .attr("y", function(d, i) {
                return y(i);
            })
            .attr("width", function(d, i) {
                return 5;
            })
            .attr("height", function(d, i) {
                return 5;
            })
    
    
}); //End document


