
var width = 1000,
    height = 500;

var svg = d3.select("#chart-area").append("svg")
    .attr("width", width)
    .attr("height", height);

//Mercator projection
var projection = d3.geo.mercator()
    .center([0,45])
    .scale(120)
    .translate([width / 2, height / 2]);


/*Orthographic projection
 var projection = d3.geo.orthographic()
 .center([0,0])
 .scale(200)
 .translate([width / 2, height / 2]);
 */

//Geo path
var path = d3.geo.path()
    .projection(projection);

queue()
    .defer(d3.json,"../data/world-110m.json")
    .defer(d3.json,"../data/airports.json")
    .await(createVisualization);

function createVisualization(error,world110m,airport){

    console.log(world110m);

    var world = topojson.feature(world110m, world110m.objects.countries).features
    svg.selectAll("path")
        .data(world)
        .enter().append("path")
        .attr("d",path)
        .attr("class","projection");

    var circle = svg.selectAll("circle")
        .data(airport.nodes)
        .enter()
        .append("circle")
        .attr("class","circle-airport")
        .attr("r",4)
        .attr("cx",0)
        .attr("cy",0)
        .attr("transform", function(d) {
            return "translate(" + projection([d.longitude, d.latitude]) + ")";
        });







}
