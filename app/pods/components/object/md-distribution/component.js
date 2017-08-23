import Ember from 'ember';

const {
  Component,
  get,
  run: {
    once
  },
  getWithDefault,
  set,
  NativeArray
} = Ember;

export default Component.extend({
  didReceiveAttrs() {
    this._super(...arguments);

    let model = get(this, 'model.json.metadata');

    once(this, function() {
      set(model, 'resourceDistribution', NativeArray.apply(
        getWithDefault(model, 'resourceDistribution', [])));
    });
  },
  /**
   * The string representing the path in the profile object for the resource.
   *
   * @property profilePath
   * @type {String}
   * @default 'false'
   * @required
   */

  /**
   * The object to use as the data model for the resource.
   *
   * @property model
   * @type {Object}
   * @required
   */

  attributeBindings: ['data-spy'],
  tagName: 'section'
});
