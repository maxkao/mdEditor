import Ember from 'ember';

const {
  Component,
  computed,
  get,
  inject: {
    service
  },
} = Ember;

export default Component.extend({
  /**
   * Component that renders a Bootstrap card.
   *
   * ```handlebars
   * \{{#layout/md-card
   *   title="title"
   *   collapsible=true
   *   collapsed=false
   *   profilePath="card"
   *   data-spy="Card"
   *   shadow=true
   * }}
   *   Content
   * {{/layout/md-card}}
   * ```
   * @module mdeditor
   * @submodule components-layout
   * @class md-card
   * @constructor
   */

  spotlight: service(),

  classNames: ['md-card', 'card'],
  classNameBindings: ['shadow:box-shadow--4dp', 'scroll:scroll-card',
    'maximizable', 'fullScreen', 'required', 'muted'
  ],
  attributeBindings: ['data-spy'],

  /**
   * The card element id.
   *
   * @property cardId
   * @type {String}
   * @readOnly
   * @category computed
   * @requires elementId
   */
  cardId: computed('elementId', function() {
      return 'card-' + this.get('elementId');
    })
    .readOnly(),

  /**
   * The card title.
   *
   * @property title
   * @type {String}
   * @required
   */

  /**
   * The card title icon.
   *
   * @property titleIcon
   * @type {String}
   * @required
   */

  /**
   * If true, the "row" the card body will be initally collapsed.
   *
   * @property collapsed
   * @type {Boolean}
   * @default undefined
   */

  /**
   * If true, the spotlight button will be inserted into the toolbar.
   *
   * @property spotlightEnabled
   * @type {Boolean}
   * @default true
   */
  spotlightEnabled: true,

  /**
   * If true, the scroll-card class will be applied to the card.
   *
   * @property scroll
   * @type {Boolean}
   * @default undefined
   */

  /**
   * If true, the maximize control will be avialable on the card.
   *
   * @property maximizable
   * @type {Boolean}
   * @default undefined
   */

  /**
   * If true, a box shadow will be rendered around the card.
   *
   * @property shadow
   * @type {Boolean}
   * @default true
   */
  shadow: true,

  /**
   * If true, the card-block class will be added.
   *
   * @property block
   * @type {Boolean}
   * @default true
   */
  block: true,

  /**
   * If true, the card-block text color will be muted.
   *
   * @property muted
   * @type {Boolean}
   * @default false
   */
  muted: false,

  /**
   * If true, the collapse control will be added to the card header.
   *
   * @property collapsible
   * @type {Boolean}
   * @default undefined
   */

  /**
   * If true, the "row" class will be added to the card body.
   *
   * @property bodyIsRow
   * @type {Boolean}
   * @default undefined
   */

  /**
   * Bootstrap button class to apply to header buttton
   *
   * @property btnClass
   * @type {String}
   * @default 'primary'
   */
  btnClass: 'primary',

  /**
   * Icon to display in heder button
   *
   * @property btnIcon
   * @type {String}
   * @default undefined
   */

  /**
   * The text to display in the header button.
   * @property btnText
   * @type {String}
   * @default undefined
   */

  /**
   * The action to perform whrn the header button is clicked.
   * @property btnAction
   * @type {Function}
   * @default undefined
   */

  /**
   * The data-spy text. Defaults to the title.
   *
   * @property data-spy
   * @type {String}
   * @default "this.title"
   * @category computed
   */
  'data-spy': computed.oneWay('title'),

  windowIcon: computed('fullScreen', function() {
    return this.get('fullScreen') ? 'compress' : 'expand';
  }),

  isCollapsible: computed('fullScreen', 'collapsible', function() {
    return !this.get('fullScreen') && this.get('collapsible');
  }),

  didInsertElement() {
    this._super(...arguments);

    if(this.get('collapsible')) {
      let card = this.$(' > .card-collapse');

      card.on('shown.bs.collapse', function() {
        card.get(0).scrollIntoView({
          block: "end",
          behavior: "smooth"
        });
      });
    }
  },

  actions: {
    toggleFullScreen() {
      this.toggleProperty('fullScreen');
    },
    spotlight(id) {
      get(this, 'spotlight').setTarget(id);
    }
  }
});
