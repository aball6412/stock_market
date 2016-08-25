
$(document).ready(function() {
    
    
    console.log("nominal");
    
    
    
    w = 1000;
    h = 650;
    
    //Set chart margins
    var margin = {
            top: 50,
            bottom: 50,
            right: 50,
            left: 50
        }
    
    
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
                return 10;
            })
            .attr("y", function(d, i) {
                return 10;
            })
            .attr("width", function(d, i) {
                return 5;
            })
            .attr("height", function(d, i) {
                return 5;
            })
    
    
}); //End document


