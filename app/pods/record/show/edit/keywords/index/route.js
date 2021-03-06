import { inject as service } from '@ember/service';
import Route from '@ember/routing/route';
import { A } from '@ember/array';
import { getWithDefault, set } from '@ember/object';
import { copy } from 'ember-copy';
import $ from 'jquery';
import ScrollTo from 'mdeditor/mixins/scroll-to';
import { on } from '@ember/object/evented';

export default Route.extend(ScrollTo, {
  keyword: service(),
  model() {
    let model = this.modelFor('record.show.edit');
    let json = model.get('json');
    let info = json.metadata.resourceInfo;

    set(info, 'keyword', !info.hasOwnProperty('keyword') ? A() :
      A(
        info.keyword));

    //check to see if custom list
    info.keyword.forEach((k) => {
      set(k, 'thesaurus', getWithDefault(k, 'thesaurus', {}));
      set(k, 'thesaurus.identifier', getWithDefault(k,
        'thesaurus.identifier', [{
          identifier: 'custom'
        }]));
      set(k, 'thesaurus.date', getWithDefault(k, 'thesaurus.date', [{}]));
      set(k, 'thesaurus.onlineResource', getWithDefault(k,
        'thesaurus.onlineResource', [{}]));

      // if(!has(k, 'thesaurus')) {
      //   set(k, 'thesaurus', {});
      // }
      // if(!has(k, 'thesaurus.identifier')) {
      //   set(k, 'thesaurus.identifier', [{
      //     identifier: 'custom'
      //   }]);
      // }
      // if(!has(k, 'thesaurus.date')) {
      //   set(k, 'thesaurus.date', [{}]);
      // }
      // if(!has(k, 'thesaurus.onlineResource')) {
      //   set(k, 'thesaurus.onlineResource', [{}]);
      // }

      //let obj = arr.objectAt(idx);
      //assign(obj, EmObject.create(k));
    });

    return model;
  },

  subbar: 'control/subbar-keywords',

  clearSubbar: on('deactivate', function() {
    this.controllerFor('record.show.edit')
      .set('subbar', null);
  }),

  setupController: function() {
    // Call _super for default behavior
    this._super(...arguments);

    this.controllerFor('record.show.edit')
      .set('subbar', this.subbar);
    this.controller.set('subbar', this.subbar);
  },

  actions: {
    getContext() {
      return this;
    },
    addThesaurus() {
      let the = this.currentRouteModel().get(
        'json.metadata.resourceInfo.keyword');

      $("html, body").animate({ scrollTop: $(document).height() }, "slow");

      the.pushObject({
        keyword: [],
        keywordType: 'theme',
        thesaurus: {
          identifier: [{
            identifier: null
          }]
        },
        fullPath: true
      });

      this.controller.set('refresh', the.get('length'));
      this.controller.set('scrollTo', 'thesaurus-' + (the.get('length')-1));
    },
    deleteThesaurus(id) {
      let the = this.currentRouteModel().get(
        'json.metadata.resourceInfo.keyword');
      the.removeAt(id);
      this.controller.set('refresh', the.get('length'));
    },
    editThesaurus(id) {
      this.transitionTo('record.show.edit.keywords.thesaurus', id);
    },
    selectThesaurus(selected, thesaurus) {
      if(selected) {
        set(thesaurus, 'thesaurus', copy(selected.citation,
          true));
        if(selected.keywordType) {
          set(thesaurus, 'keywordType', selected.keywordType);
        }
      } else {
        set(thesaurus, 'thesaurus.identifier.0.identifier', 'custom');
      }
    },
  }
});
