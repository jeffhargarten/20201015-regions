import {select, selectAll, event} from 'd3-selection';
import {geoPath} from 'd3-geo';
import * as d3 from 'd3';
import {format} from 'd3-format';
import { feature } from 'topojson';
import * as topojson from "topojson";
import {annotation, annotationLabel,annotationCalloutCircle} from "d3-svg-annotation";
import map from '../sources/counties.json';
import ab from '../sources/ab_stats.json';


class StribCountyMap {

  constructor(target) {
    this.target = target;
    this.width  = $(this.target).outerWidth();
    this.height = $(this.target).outerHeight();
    this.svg = d3.select(this.target).attr("width", this.width-50).attr("height", this.height);
    // this.projection = d3.geoAlbers().scale(5037).translate([150, 1100]);
    this.land = feature(map, map.objects.counties).features;
    this.projection = d3.geoConicConformal()
    .parallels([45 + 37 / 60, 47 + 3 / 60])
    .rotate([94 + 15 / 60, 0])
    .fitSize([this.width, this.height], {type: "FeatureCollection", features: this.land});
    this.path = d3.geoPath(this.projection);
    this.data = ab.ab;
    this.m = map;
    this.colorScale = d3.scaleLinear()
    .domain([0, 0.10, 0.30, 0.50, 0.70, .90])
    .range(['#e7e7e7', '#D9D3EB', '#B6AED4', '#7D739C', '#62597D', '#4A4061']);
    this.colorScale2 = d3.scaleLinear()
    .domain([0.75, 2.5, 5, 10, 15, 20])
    .range(['#c7e5b5', '#9ee384', '#5bbf48', '#299e3d', '#118241', '#004C21']);
    this.colorScale3 = d3.scaleLinear()
    .domain([-0.30, -0.15, -0.01, 0, 0.01, 0.15, 0.30])
    .range(['#0d4673', '#67b4c2', '#A8B9C5', '#f4f4f4', '#DF8F86', '#f2614c', '#9c0004']);
  }
  
  _renderState() {
    var self = this;
      
    self.svg.append("g")
      .selectAll("path")
      .data(topojson.feature(map, this.m.objects.counties).features)
      .enter().append("path")
        .attr("d", self.path)
        .attr("class", "map-state-boundary");    
  }
  
  
  _renderCounties() {
    var self = this;

    self.svg.append("g")
      .selectAll("path")
      .data(topojson.feature(map, this.m.objects.counties).features)
      .enter().append("path")
        .attr("d", self.path)
        .attr("class", function(d) {
          for (var i=0; i < self.data.length; i++) {
            if (d.properties.COUNTYNAME == self.data[i].county) {
              return 'map-precinct-boundary ' + self.data[i].region;
            }
          }

        })
        .style("fill",function(d) {
          var change;
          
          for (var i=0; i < self.data.length; i++) {
            if (d.properties.COUNTYNAME == self.data[i].county) {
              change = self.data[i].pct_change_2014;
            }
          }

          return self.colorScale(change);
        });


        var marks = [{
          long: -96.180690,
          lat: 47.802990,
          name: "Northwest"
        }];
    
        self.svg.selectAll(".map-city-label-large")
        .data(marks)
        .enter().append("text")
        .attr("class", "map-city-label-large")
        .text(function(d) { return d.name; })
        .attr("x", function(d) {
            return self.projection([d.long, d.lat])[0];
        })
        .attr("y", function(d) {
            return self.projection([d.long, d.lat])[1];
        })
  }

  _startCounter(num, target) {
        $(target).each(function () {
            var $this = $(this);
            jQuery({ Counter: Number($(target).text) }).animate({ Counter: num }, {
                duration: 1000,
                easing: 'swing',
                step: function () {
                    $this.text(Math.ceil(this.Counter) + '%');
                }
            });
        });
}


  transition(state) {
    var self = this; 

    d3.selectAll(".northwest").classed("highlighted", false);
    $("#mainLegend").show();
    $("#splitLegend").hide();
    $("#changeLegend").hide();
    $(".map-city-label-large").hide();
    

    if (state == 'zero') {
      selectAll(".map-precinct-boundary")
      .style("fill",function(d) {
        for (var i=0; i < self.data.length; i++) {
          if (d.properties.COUNTYNAME == self.data[i].county) {
            return self.colorScale(self.data[i].general_ab_pct_2014);
          }
        }
      });
      self._startCounter(12, "#counterNum");
      $("#counterNum").css('background-color', self.colorScale(0.12));
      $("#year").html(2014);
      $("#kind").html("general");
    }

    if (state == 'one') {
      selectAll(".map-precinct-boundary")
      .style("fill",function(d) {
        for (var i=0; i < self.data.length; i++) {
          if (d.properties.COUNTYNAME == self.data[i].county) {
            return self.colorScale(self.data[i].general_ab_pct_2016);
          }
        }
      });
      self._startCounter(23, "#counterNum");
      $("#counterNum").css('background-color', self.colorScale(0.30));
      $("#year").html(2016);
      $("#kind").html("general");
    }

    if (state == 'two') {
      selectAll(".map-precinct-boundary")
      .style("fill",function(d) {
        for (var i=0; i < self.data.length; i++) {
          if (d.properties.COUNTYNAME == self.data[i].county) {
            return self.colorScale(self.data[i].general_ab_pct_2018);
          }
        }
      });
      d3.selectAll(".northwest").classed("highlighted", true);
      self._startCounter(24, "#counterNum");
      $("#counterNum").css('background-color', self.colorScale(0.30));
      $("#year").html(2018);
      $("#kind").html("general");
      $(".map-city-label-large").show();
    }


    if (state == 'three') {
      selectAll(".map-precinct-boundary")
      .style("fill",function(d) {
        for (var i=0; i < self.data.length; i++) {
          if (d.properties.COUNTYNAME == self.data[i].county) {
            return self.colorScale(self.data[i].primary_ab_pct_2020);
          }
        }
      });
      self._startCounter(60, "#counterNum");
      $("#counterNum").css('background-color', self.colorScale(0.60));
      $("#year").html(2020);
      $("#kind").html("primary");
    }  

    if (state == 'four') {
      selectAll(".map-precinct-boundary")
      .style("fill",function(d) {
        for (var i=0; i < self.data.length; i++) {
          if (d.properties.COUNTYNAME == self.data[i].county) {
            return self.colorScale2(self.data[i].pct_change_2020);
          }
        }
      });
      self._startCounter(500, "#bigcount");
      $("#year").html(2020);
      $("#kind").html("general");
      $("#mainLegend").hide();
      $("#changeLegend").show();
    }

    if (state == 'five') {
      selectAll(".map-precinct-boundary")
      .style("fill",function(d) {
        for (var i=0; i < self.data.length; i++) {
          if (d.properties.COUNTYNAME == self.data[i].county) {
            return self.colorScale3(self.data[i].general_ab_pct_2020);
          }
        }
      });
      self._startCounter(62, "#partisanCount");
      $("#mainLegend").hide();
      $("#splitLegend").show();
    }

  }

  render() {
    var self = this;
    $("#counterNum").css('background-color', self.colorScale(0.23));
    self._renderState();
    self._renderCounties();
  }
}

export { StribCountyMap as default }