import $ from 'jquery';
import Component from '@ember/component';
import { typeOf } from '@ember/utils';

export default Component.extend({
  classNames: 'md-json-viewer',
  /**
   * True to render in modal dialog
   *
   * @type {Boolean}
   */
  modal: true,

  /**
   * Element selector or element that serves as the reference for modal position
   *
   * @property target
   * @type {String}
   */
  target: 'html',

  /**
   * Object or string to render as JSON in viewer
   *
   * @type {ObjectString}
   */
  json: {},

  close() {
    this.set('modal', false);
  },

  setFontSize(el, factor) {
    let currentFontSize = el.css('font-size');
    let currentFontSizeNum = parseFloat(currentFontSize, 10);
    let newFontSize = currentFontSizeNum * factor;

    el.animate({
      'font-size': `${newFontSize}px`
    });
  },

  didInsertElement() {
    let json = this.get('json');
    let out = typeOf(json) === 'string' ? json : JSON.stringify(json);

    $('.md-viewer-body')
      .JSONView(out);
  },

  actions: {
    collapse() {
      this.$('.md-viewer-body')
        .JSONView('collapse');
    },
    expand() {
      this.$('.md-viewer-body')
        .JSONView('expand');
    },
    zoomin() {
      let body = this.$('.md-viewer-body');
      this.setFontSize(body, 1.1);
    },
    zoomout() {
      let body = this.$('.md-viewer-body');
      this.setFontSize(body, 0.9);
    },
    closeModal() {
      this.close();
    }
  }
});
