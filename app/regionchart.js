import * as d3 from 'd3';
import * as c3 from 'c3';

class regionChart { 

    constructor(target) {
      this.target = target;
      this.chartCounts = null;
    }
  
    render() {
      var self = this;
  
      var  padding = {
            top: 20,
            right: 40,
            bottom: 20,
            left: 100,
        };
      
      self.chartCounts = c3.generate({
          bindto: self.target,
          padding: padding,
          data: {
                // x: 'x',
                columns: [
                    ['2018',0.38080338,0.22851371,0.099739484,0.038611565,0.056654762,0.042062107,0.109760172,0.04385482]
                ],
            type: 'bar',
            labels: {
                format: {
                    // '2016': d3.format('.0%'),
                    '2018': d3.format('.0%')
                }
            }
          },
            tooltip: {
                show: false
            },
            legend: {
              show: false
            },
            point: {
                // show: true,
                // r: function(d) { if (d.x == 2018) { return 6;} else { return 0; } }
            },
            color: {
                pattern: ['#8b62a8']
            },
            axis: {
                  rotated: true,
                  y: {
                        max: 1,
                        min: 0,
                        padding: {bottom: 0, top: 0},
                        tick: {
                         count: 4,
                         values: [0,0.25,0.50,0.75,1],
                         format: d3.format('.0%')
                        }
                    },
                x: {
                  type: 'category',
                  categories: ['Hennepin/Ramsey','Other Metro','Central','West Central','Northland','Northwest','Southern','Southwest'],
                  padding: {right: 0, left: 0},
                        tick: {
                         rotate: -75,
                         multiline: false
                        },
                        height: 40
                }
            }
    });
  
    d3.selectAll(".c3-target-2016")
    .selectAll(".c3-bar, .c3-texts")
    .attr("transform", "translate(0, 5)");

    }
  }
  
  export { regionChart as default }