/**
 * Main JS file for project.
 */

// Define globals that are added through the js.globals in
// the config.json file, here like this:
// /* global _ */

// Utility functions, such as Pym integration, number formatting,
// and device checking

//import utilsFn from './utils.js';
//utilsFn({ });


// Import local ES6 modules like this:
//import utilsFn from './utils.js';

// Or import libraries installed with npm like this:
// import module from 'module';

// Utilize templates on the client.  Get the main content template.
//import Content from '../templates/_index-content.svelte.html';
//
// Get the data parts that are needed.  For larger data points,
// utilize window.fetch.  Add the build = true option in the buildData
// options.
//import content from '../content.json';
// OR: let content = await (await window.fetch('./assets/data/content.json')).json();
//
// const app = new Content({
//   target: document.querySelector('.main-app-container'),
//   data: {
//     content
//   }
// });

'use strict';

// Dependencies
import utilsFn from './utils.js';

import ScrollyGraphic from "../app/scroller.js";

(function(){
    let s = new ScrollyGraphic();
    s.init();
})();

// Import local ES6 modules like this:
//import utilsFn from './utils.js';

// Or import libraries installed with npm like this:
// import module from 'module';

// Setup utils function
utilsFn({ });

// var aspect = 500 / 550,
// chart = document.getElementById("precinct-map");
// var targetWidth = chart.parent().width();
// chart.setAttribute("width", targetWidth);
// chart.setAttribute("height", targetWidth / aspect);
// chart.setAttribute("viewBox", "0 -20 1000 1000");

// if ($(window).width() <= 520) {
//     chart.setAttribute("viewBox", "0 -20 500 550");
// }

// $(window).on("resize", function() {
// targetWidth = chart.parent().width();
// chart.attr("width", targetWidth);
// chart.attr("height", targetWidth / aspect);
// });