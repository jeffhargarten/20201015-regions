import * as d3 from 'd3';
import * as c3 from 'c3';

class barChart { 

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
                  ['% change', 1.95,1.74,3.05,3.00,0.75,3.54,2.96,1.97,8.53,4.86,1.73]
              ],
          type: 'bar',
          labels: {
              format: {
                  '% change': d3.format('+.0%')
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
              show: true,
              r: function(d) { if (d.x == 2018) { return 6;} else { return 0; } }
          },
          color: {
              pattern: ['#333333']
          },
          axis: {
                rotated: true,
                y: {
                      max: 10,
                      min: 0,
                      padding: {bottom: 0, top: 0},
                      tick: {
                       count: 4,
                       values: [0,2,4,6,8,10],
                       format: d3.format('+.0%')
                      }
                  },
              x: {
                type: 'category',
                categories: ["Anoka","Dakota","Hennepin","Itasca","Olmsted","Ramsey","St. Louis","Scott","Washington","Minneapolis","Statewide"],
                padding: {right: 0, left: 0},
                      tick: {
                       rotate: -75,
                       multiline: false
                      },
                      height: 40
              }
          }
  });

  }
}

export { barChart as default }