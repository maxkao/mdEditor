import { find, render } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | object/md date array', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {

    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    await render(hbs`{{object/md-date-array value=model}}`);

    assert.equal(find('.panel').textContent.replace(/[ \n]+/g, '|').trim(),
      '|Dates|0|Add|#|Date|Date|Type|Description|Add|Date|');

    this.set('model', [{
      "date": "2016-10-12",
      "dateType": "dateType",
      description: 'description'
    }]);

    assert.equal(find('.panel').textContent.replace(/[ \n]+/g, '|').trim(),
      '|Dates|1|Add|#|Date|Date|Type|Description|0|dateType|×|Delete|',
      'item');

    // Template block usage:
    await render(hbs`
      {{#object/md-date-array value=model}}
        template block text
      {{/object/md-date-array}}
    `);

    assert.equal(find('.panel').textContent.replace(/[ \n]+/g, '|').trim(),
      '|Dates|1|Add|#|Date|Date|Type|Description|0|dateType|×|template|block|text|Delete|',
      'block');
  });
});
