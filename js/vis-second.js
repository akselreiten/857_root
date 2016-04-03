
//  Global Variables
var margin = {top: 30,right: 50,bottom: 30,left: 50},
    legendPos = {"All Other Sources": [110, 35],"World Bank": [82, 51],"United Kingdom":[100,66],"Domestic Resources":[120,83],"United States":[89,99],"Global Fund":[83,115]}, //  Holds position for legends used by the tooltip
    format = d3.time.format("%Y"),
    width = 700 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom,
    data;

//  SVG Drawing Area
var svg = d3.select("#chart-area")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


// 	Scales & Axis
var x = d3.time.scale().range([0, width]);
var y = d3.scale.linear().range([height, 0]);
var z = d3.scale.category20();

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom")
    .ticks(10);

var xAxisGroup = svg.append("g")
    .attr("class", "x-axis axis")
    .attr("transform", "translate(0," + height + ")");

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left")
    .ticks(8);

var yAxisGroup = svg.append("g")
    .attr("class", "y-axis axis");

//  Uses stack-technique (Source: http://bl.ocks.org/mbostock/3020685)
var stack = d3.layout.stack()
    .offset("zero")
    .values(function(d){ return d.values})
    .x(function(d){return d.date})
    .y(function(d){return d.value});

var nest = d3.nest()
    .key(function(d){return d.source});

var area = d3.svg.area()
    .interpolate("linear")
    .x(function(d){return x(d.date)})
    .y0(function(d){return y(d.y0)})
    .y1(function(d){return y(d.y0 + d.y)});


//  Tooltips and addition g-placeholder for binding of chart-data
svg.append("g").attr("id","area");
var tooltip = svg.append("g").style("display","none");


//  Adding legend placeholders
var colorLegendG = svg.append("g")
    .attr("class", "color-legend")
    .attr("transform", "translate(20, 20)");

var colorLegend = d3.legend.color()
    .scale(z)
    .shapePadding(1)
    .shapeWidth(15)
    .shapeHeight(15)
    .labelOffset(5);

// Initialize data
loadData();

function loadData() {
    //  Edited the file in python into a convenient format; global-funding-edited.csv
    d3.csv("data/global-funding-edited.csv", function(error, csv) {
        csv.forEach(function(d){
            d.date = format.parse(d.date);
            if (d.value == "--"){d.value = 0}
            d.value = +d.value;
        });
        data = csv;
        updateVisualization();
    });
}

function updateVisualization(){

    var layers = stack(nest.entries(data));
    x.domain(d3.extent(data,function(d){return d.date}));
    y.domain([0,d3.max(data,function(d){return (d.y0 + d.y)})]);

    //  Appending areas with corresponding colors
    svg.select("#area")
        .selectAll(".layer")
        .data(layers.reverse())
        .enter()
        .append("path")
        .attr("class","layer")
        .attr("d",function(d){return area(d.values)})
        .style("fill",function(d,i){
            return z(d.key)});

    //  Calls axis, adds legends, appends label on y-axis
    colorLegendG.call(colorLegend);
    xAxisGroup.call(xAxis);
    yAxisGroup
        .call(yAxis)
        .append("text")
        .attr("transform", "rotate(0)")
        .attr("y", -15)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .style("font-size","8px")
        .text("Millions USD");

    //  Appending title for the graph
    svg.append("text")
        .attr("class","chart-header")
        .attr("x", (width / 2))
        .attr("y", 0 - (margin.top)/2)
        .attr("text-anchor", "middle")
        .style("font-size", "12px")
        .text("Sources of global funding for Malaria Control from 2005-2013");

    //  Adding Mouse-listeners
    svg.selectAll(".layer")
        .attr("opacity",1)
        .on("mouseover",mouseOver)
        .on("mousemove", mouseMove)
        .on("mouseout",mouseOut);

    //  Appending Tooltips; text and lines
    tooltip.append("text")
        .attr("class", "y1")
        .attr("dx", 8)
        .attr("dy", "-.3em");

    tooltip.append("line")
        .attr("class","line-x")
        .style("stroke","black")
        .style("stroke-dasharray","10,5")
        .style("opacity",0.9)
        .attr("y1",0)
        .attr("y2",height);

}

//  Highlights area
function mouseOver(d,i){
    tooltip.style("display",null);
    svg.selectAll(".layer")
        .transition()
        .duration(200)
        .attr("opacity",function(d,j){
            return j != i ? 0.7 : 1;});
}

//  Appends values and line
function mouseMove(d,i){
    var xPointer = d3.mouse(this)[0];
    var xDate = + format(x.invert(xPointer));
    var obj = d.values[xDate % 2005]; // All values in data from 2005-2013

    tooltip.select("text.y1")
        .attr("transform","translate(" + legendPos[obj.source][0] + "," + legendPos[obj.source][1] +")")
        .text(": $" + Math.floor(obj.value) + " millions (" + xDate + ")")
        .style("fill",z(obj.source));

    tooltip.select("line.line-x")
        .attr("transform",
            "translate(" + xPointer + "," +
            height + ")")
        .attr("y1", 0)
        .attr("y2", -height);
}

//  Dishighlights area
function mouseOut(d,i){
    tooltip.style("display","none");
    svg.selectAll(".layer")
        .transition()
        .duration(200)
        .attr("opacity",1);
}





