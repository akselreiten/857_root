
//  Global Variables
var malariaDataByCountryID = {};
var malariaData = [];
var mapJson;

var nameMapping = {
    "UN_population": "Population (UN, 2015)",
    "At_risk": "Countries at risk (2015)",
    "At_high_risk": "Countries at high risk (2015)",
    "Suspected_malaria_cases": "Suspected malaria cases (2015)",
    "Malaria_cases": "Malaria Cases (2015)"
};

var textLines = {"UN_population" : ["Africa is a highly populated continent","and the inhabitants are exposed and vulnerable to Malaria"],
    "At_risk" : ["All African Countries face a risk of Malaria.","The countries colored in gray, are currently unknown for WHO"],
    "At_high_risk" : ["The African continent faces the highest risk of Malaria in the world", "according to data from World Health Organization (WHO)."],
    "Suspected_malaria_cases" : ["Mozambique had over 60 million suspected cases of Malaria", "in 2015, and over 55 million of these were actually proven malaria cases"],
    "Malaria_cases" : ["88% of all malaria cases happened in Africa in 2015", "That's alot."]
}

//  SVG drawing area
var margin = {
    top: 10,
    right: 20,
    bottom: 10,
    left: 20
};

var legend_box_w = 20, legend_box_h = 20;

var width = 600 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

var svg = d3.select("#chart-area").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


//  Mercator projection
var projection = d3.geo.mercator()
    .center([20,0])
    .scale(300)
    .translate([width / 2, height / 2]);

//  Geo path
var path = d3.geo.path()
    .projection(projection);

//  Color scale
var colorScale = d3.scale.quantile();

//  Ordinal color scales; www.colorbrewer2.org
var colorDict = {
    "UN_population" : ['#eff3ff','#c6dbef','#9ecae1','#6baed6','#3182bd','#08519c'],
    "At_risk" : ['#edf8e9','#c7e9c0','#a1d99b','#74c476','#31a354','#006d2c'],
    "At_high_risk" : ['#feedde','#fdd0a2','#fdae6b','#fd8d3c','#e6550d','#a63603'],
    "Suspected_malaria_cases" : ['#f2f0f7','#dadaeb','#bcbddc','#9e9ac8','#756bb1','#54278f'],
    "Malaria_cases" : ['#fee5d9','#fcbba1','#fc9272','#fb6a4a','#de2d26','#a50f15']
}

//  Striped pattern for countries with no available information
var pattern = svg.append("pattern")
    .attr({ id:"no_information", width:"4", height:"8", patternUnits:"userSpaceOnUse", patternTransform:"rotate(55)"})
    .append("rect")
    .attr({ width:"3", height:"8", fill:"lightgray" });

//	Tooltip
var tip = d3.tip()
    .attr('class', 'd3-tip')
    .offset([0, 0]);

var formatThousand = d3.format(",");
var formatPercentage = d3.format("%");

//  Reading files to js.
queue()
  .defer(d3.json, "data/africa.topo.json")
  .defer(d3.csv, "data/global-malaria-2015.csv")
  .await(function(error, mapTopJson, malariaDataCsv){
      malariaDataCsv.forEach(function(d){
          d.At_high_risk = +d.At_high_risk;
          d.At_risk = +d.At_risk;
          d.Malaria_cases = +d.Malaria_cases;
          d.Suspected_malaria_cases = +d.Suspected_malaria_cases;
          d.UN_population = +d.UN_population;
          if (d.WHO_region == "African" || d.WHO_region == "Eastern Mediterranean"){
              malariaDataByCountryID[d.Code] = d;
              malariaData.push(d);
          }
      });
      mapJson = mapTopJson;
      createChoropleth();

  });


//  The method creates the map for the first time
function createChoropleth() {

    var world = topojson.feature(mapJson, mapJson.objects.collection).features

    svg.selectAll("path")
        .data(world)
        .enter().append("path")
        .attr("d",path)
        .attr("class",function(d){return "projection " + d.properties.adm0_a3_is})
        .on('mouseover',tip.show)
        .on('mouseout',tip.hide);

    //  Assigns default value
    updateChoropleth("At_high_risk");

}

//  The method sets color-scale and updates svg with correct colors.
function updateChoropleth(filterVar){
    filterVar = filterVar || "Malaria_cases";

    //  Sets range and domain of colorScale
    colorScale.range(colorDict[filterVar]);
    colorScale.domain(d3.extent(malariaData,function(d){return d[filterVar];}));

    //  Updates colors of the countries on the map
    svg.selectAll("path")
        .style("fill",function(d){
            return getColor(d.properties.adm0_a3_is,filterVar)
        });

    //  Appending tool-tip
    svg.call(tip);
    tip.html(function(d){return getToolTipInfo(d.properties.adm0_a3_is);});

    updateLegend(filterVar);
    updateText(filterVar);
    updateTitle(filterVar);

}

//  Updates legend
function updateLegend(filterVar){

    var legendContainer = svg.selectAll('g')
        .data(colorScale.range());

    var legend = legendContainer.enter().append("g");
    legend.append("rect");
    legend.append("text");

    var legendIntervals = getOrdinalRange(filterVar);
    console.log(legendIntervals);

    legendContainer.select("rect")
        .attr("x", 10)
        .attr("y", function(d, i){ return height + 35 - (i*legend_box_h) - 2*legend_box_w - 60;})
        .attr("width", legend_box_w)
        .attr("height", legend_box_h - 0.5)
        .style("fill", function(d) { return d;});

    legendContainer.select("text")
        .attr("x", 40)
        .attr("y", function(d, i){return height +35 - (i*legend_box_h) - 2*legend_box_w - 45;})
        .text(function(d, i){
            console.log(legendIntervals[i]);
            return legendIntervals[i]});

    legendContainer.exit().remove();
}

//Updates title
function updateTitle(filterVar){

    svg.append("g")
        .attr("id","title-container")

    var titleContainer = d3.select("#title-container")
        .selectAll('g')
        .data([filterVar]);

    var title = titleContainer.enter().append('g');
    title.append("text");

    titleContainer.select("text")
        .attr("x",10)
        .attr("y",300)
        .style("font-size","12px")
        .style("font-weight","bold")
        .text(nameMapping[filterVar]);

    titleContainer.exit().remove();

}

//  Updates text in headline according to filterVar
function updateText(filterVar){
    $("#headline").text(textLines[filterVar][0]);
    $("#underheadline").text(textLines[filterVar][1]);
}


//  Returns appropriate color according to inputs
function getColor(countryID, filterVar){
    if (countryID in malariaDataByCountryID){
        return isNaN(malariaDataByCountryID[countryID][filterVar]) ?
            "url(#no_information)" :
            colorScale(malariaDataByCountryID[countryID][filterVar]);
    }
    else{
        return "url(#no_information)";
    }
}

//  Calculates the ranges used in legend and returns these intervals
function getOrdinalRange(filterVar){
    var domain = colorScale.domain(),
        range = colorScale.range().length,
        l = (domain[1]-domain[0])/range,
        breaks = d3.range(0, range).map(function(i){return i * l}),
        intervals = [];
    if (filterVar == 'At_risk' || filterVar == 'At_high_risk'){
        for (i = 0; i < range-1; i++){intervals.push("" + formatPercentage(breaks[i]/100) + " - " + formatPercentage(breaks[i+1]/100))}
        intervals.push("" + formatPercentage(breaks[range-1]/100) + " - " + 100 + "%")
    }else{
        for (i = 0; i < range-1; i++){intervals.push(""+ formatThousand(Math.floor(breaks[i]/1000)*1000)+ " - "+ formatThousand(Math.floor(breaks[i+1]/1000)*1000));}
        intervals.push("> " + formatThousand(Math.floor(breaks[range-1]*1000)/1000));
    }
    return intervals;
}

//  Creates content for the tooltip
function getToolTipInfo(cID){
    if (cID in malariaDataByCountryID){
        var c = malariaDataByCountryID[cID];
        var str = "" + c.Country
            + "<span id=tooltip-info>"
            + "<br>UN population: " + formatThousand(c.UN_population)
            + "<br>At risk: " + formatPercentage(c.At_risk/100)
            + "<br>At high risk: " + formatPercentage(c.At_high_risk/100)
            + "<br>Suspected Malaria Cases: " + formatThousand(c.Suspected_malaria_cases)
            + "<br>Malaria Cases: " + formatThousand(c.Malaria_cases)
            + "</span>";
    }else{str = "No available information"}
    return str;
}


////////////////////////////////////////////////////
//                  Listeners                   ////
////////////////////////////////////////////////////

//Listens to the buttons, and runs filtered updateChoropleth
$(".btn-filter" ).click(function() {
    updateChoropleth(this.value);
});