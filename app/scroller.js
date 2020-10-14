import 'intersection-observer';
import scrollama from "scrollama";
import {select, selectAll, event} from 'd3-selection';
import StribCountyMap from './map.js';
import { debounce } from 'lodash';
const Stickyfill = require('stickyfilljs');

// Doing these as constants for now because confusing ES6 "this" scoping + laziness
const map = new StribCountyMap('#map-zoomer');
const scroller = scrollama();
var onloadHeight = window.innerHeight;

class ScrollyGraphic {

  constructor() {
    this.container = select('#scroll');
    this.graphic = this.container.select('.scroll__graphic');
    this.chart = this.graphic.select('#map-container');
    this.t = this.container.select('.scroll__text');
    this.step = this.t.selectAll('.step');
    this.map = new StribCountyMap('#precinct-map');
  }

  /********** PRIVATE METHODS **********/

  // generic window resize listener event
  _handleResize() {
    var self = this;

    if (window.innerHeight == onloadHeight) {

      // 1. update height of step elements
      var stepHeight = Math.floor(window.innerHeight * 0.75);
      self.step.style('height', stepHeight + 'px');

      // 2. update width/height of graphic element
      var bodyWidth = select('body').node().offsetWidth;
      var textWidth = self.t.node().offsetWidth;


      // 3. tell scrollama to update new element dimensions
      scroller.resize();
    }
  }

  // scrollama event handlers
  _handleStepEnter(response) {
    var self = this;

    // add color to current step only
    self.step.classed('is-active', function (d, i) {
      return i === response.index;
    })

    if (response.index == 0) {
      self.map.transition('zero');
    }

    if (response.index == 1) {
      self.map.transition('one');
    }

    if (response.index == 2) {
      self.map.transition('two');
    }

    if (response.index == 3) {
      self.map.transition('three');
    }

    if (response.index == 4) {
      self.map.transition('four');
    }

    if (response.index == 5) {
      self.map.transition('five');
    }
  }

  _handleStepExit(response) {
  }

  _handleStepProgress(response) {
  }

  _handleContainerEnter(response) {
    var self = this;

    // sticky the graphic
    self.graphic.classed('is-fixed', true);
    self.graphic.classed('is-bottom', false);
  }

  _handleContainerExit(response) {
    var self = this;

    // un-sticky the graphic, and pin to top/bottom of container
    self.graphic.classed('is-fixed', false);
    self.graphic.classed('is-bottom', response.direction === 'down');
  }

  _setupStickyfill() {
    selectAll('.sticky').each(function () {
      Stickyfill.add(this);
    });
  }

  /********** PUBLIC METHODS **********/

  init() {
    var self = this;

    self._setupStickyfill();

    self.map.render();

    // 1. force a resize on load to ensure proper dimensions are sent to scrollama
    self._handleResize();

    // 2. setup the scroller passing options
    // this will also initialize trigger observations
    // 3. bind scrollama event handlers (this can be chained like below)
    scroller.setup({
      container: '#scroll',
      graphic: '.scroll__graphic',
      text: '.scroll__text',
      step: '.scroll__text .step',
      debug: false,
    })

    // setup resize event
    window.addEventListener('resize', () => self._handleResize());

    scroller.onStepEnter((response) => self._handleStepEnter(response))
  }

}

export { ScrollyGraphic as default }
