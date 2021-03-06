/**
 * @submodule components-object
 * @module mdeditor
 */

import { oneWay, alias } from '@ember/object/computed';

import Component from '@ember/component';
import { getOwner } from '@ember/application';
import { isArray, A } from '@ember/array';
import { run } from '@ember/runloop';
import { typeOf } from '@ember/utils';
import { get, computed } from '@ember/object';
import Template from 'mdeditor/mixins/object-template';

export default Component.extend(Template, {
  /**
   * mdEditor class for input and edit of arrays of objects. The
   * component is rendered as an editable table.
   *
   * @class md-array-table
   * @constructor
   * @uses object-template
   */

  didReceiveAttrs() {
    this._super(...arguments);

    if (this.value) {
      this.applyTemplateArray('value');
    }

  },

  attributeBindings: ['data-spy'],

  /**
   * The array to render in the template
   *
   * @property value
   * @type {Array}
   * @default Ember.A()
   * @required
   */
  value: A(),

  /**
   * The template class to use for new items. This should be a constructor.
   * Objects should be created by extending Ember.Object.
   *  ```javascript
   *  Ember.Object.extend({
   *   foo: null,
   *   bar: Ember.A()
   *  }
   *  ```
   *
   * @property templateClass
   * @type {Any}
   * @constructor
   * @default null
   * @required
   */
  templateClass: null,

  /**
   * Comma-separated list of column headers to display in the table. If not
   * provided, the table header will not be created.
   *
   * @property columns
   * @type String
   */

  /**
   * Inital collapse state fo the panel.
   *
   * @property isCollapsed
   * @type {Boolean}
   * @default undefined
   */

  /**
   * The validation to apply to the array items.
   *
   * @property validation
   * @type {Ember.Mixin}
   * @default undefined
   */

  /**
   * Whether to render in a panel.
   *
   * @property plain
   * @type {Boolean}
   * @default false
   */
  plain: false,

  /**
   * Indicates whether at least one item is required is required in the value
   * array.
   *
   * @property required
   * @type {Boolean}
   * @default false
   */
  required: false,

  /**
   * The title for the panel. Should be in singular form.
   *
   * @property title
   * @type {String}
   * @default Item
   */
  title: 'Item',

  /**
   * The data-spy text. Defaults to the title.
   *
   * @property data-spy
   * @type {String}
   * @default "this.title"
   * @category computed
   */
  'data-spy': oneWay('title'),

  /**
   * Array of column headers
   *
   * @property columnArray
   * @type {Array}
   * @readOnly
   * @category computed
   * @requires columns
   */
  columnArray: computed('columns', function () {
    let columns = this.columns;

    return(typeof columns === 'string') ? columns.split(',') : null;
  }),

  /**
   * Uses isCollapsed if defined, otherwise inspects array length.
   *
   * @property collapsed
   * @type {Boolean}
   * @readOnly
   * @category computed
   * @requires isCollapsed
   */
  collapsed: computed('isCollapsed', 'value.[]', function () {
    let isCollapsed = this.isCollapsed;
    let value = this.value;

    if(isCollapsed !== undefined) {
      return isCollapsed;
    } else if(isArray(value) && get(value, 'length') > 0) {
      return false;
    } else {
      return true;
    }
  }),

  /**
   * Alias for values
   *
   * @property arrayValues
   * @type {Array}
   * @readOnly
   * @category computed
   * @requires value
   */
  arrayValues: alias('value'),

  /**
   * The panel id selector
   *
   * @property panelId
   * @type {String}
   * @default "panel-{this.elementId}"
   * @readOnly
   * @category computed
   * @requires elementId
   */
  panelId: computed('elementId', function () {
    return 'panel-' + this.elementId;
  }),

  /**
   * The color of the counter displayed in the panel header
   *
   * @property pillColor
   * @type {String}
   * @readOnly
   * @category computed
   * @requires value.[]
   */
  pillColor: computed('value.[]', 'required', function () {
    let count = this.get('value.length') || 0;
    let required = this.required;
    return(count === 0) ? required ? 'label-danger' : 'label-warning' :
      'label-info';
  }),

  onChange() {},
  /**
   * Focus the added row, or the last row on deletion.
   *
   * @method valueChanged
   * @return none
   */
  valueChanged() {
    run.schedule('afterRender', this, function () {
      let panel = this.$('.panel-collapse');
      let input = this.$('.panel-collapse tbody tr:last-of-type input')
        .first();

      if(panel.hasClass('in')) {
        input.focus();
      } else { //add a one-time listener to wait until panel is open
        panel.one('shown.bs.collapse', function () {
          input.focus();
        });
        panel.collapse('show');
      }
    });

    this.onChange();
  },

  actions: {
    addItem: function (value) {
      const Template = this.templateClass;
      const owner = getOwner(this);

      value.pushObject(typeOf(Template) === 'class' ? Template.create(
          owner.ownerInjection()
        ) :
        this.templateAsObject ? {} : null);
      this.valueChanged();
    },

    deleteItem: function (value, idx) {
      if(value.length > idx) {
        value.removeAt(idx);
      }
      this.valueChanged();
    }
  }
});
