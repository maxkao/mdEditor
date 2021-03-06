import { render, click } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import createTaxonomy from 'mdeditor/tests/helpers/create-taxonomy';

module('Integration | Component | object/md taxonomy/classification/taxon', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    assert.expect(7);
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });
    this.model = createTaxonomy()[0].taxonomicClassification[0];

    this.delete = function(taxa){
        assert.ok(taxa, 'called delete');
    };

    await render(hbs`{{object/md-taxonomy/classification/taxon model=model}}`);

    assert.equal(this.element.textContent.replace(/[\s\n]+/g, '|').trim(),
      '|Kingdom|Fungi|(555705)|Kingdom|Edit|Delete|Add|Child|Subkingdom|Dikarya|(936287)|Edit|Delete|Add|Child|Division|Basidiomycota|(623881)|Edit|Delete|Add|Child|');

    await click('.btn-success');

    assert.equal(this.element.textContent.replace(/[\s\n]+/g, '|').trim(),
      '|Kingdom|Fungi|(555705)|Kingdom|Taxonomic|Level|Taxonomic|Name|Taxonomic|ID|Common|Names|1|Add|Common|Name|0|Delete|OK|Subkingdom|Dikarya|(936287)|Edit|Delete|Add|Child|Division|Basidiomycota|(623881)|Edit|Delete|Add|Child|',
      'edit'
    );

    await render(hbs`{{object/md-taxonomy/classification/taxon model=model deleteTaxa=delete}}`);

    await click('.btn-danger');
    await click('.btn-danger');

    assert.equal(this.element.textContent.replace(/[\s\n]+/g, '|').trim(),
    '|Kingdom|Fungi|(555705)|Kingdom|Edit|Delete|Add|Child|Subkingdom|Dikarya|(936287)|Edit|Delete|Add|Child|Division|Basidiomycota|(623881)|Edit|Delete|Add|Child|');

    await click('.btn-info');

    assert.dom('.md-taxon-body').isVisible({count:4});
    assert.dom('.md-taxon-body.md-spotlight-target').isVisible();


    // Template block usage:
    await render(hbs`
      {{#object/md-taxonomy/classification/taxon model=model}}
        template block text
      {{/object/md-taxonomy/classification/taxon}}
    `);

    assert.equal(this.element.textContent.replace(/[\s\n]+/g, '|').trim(),
      '|Kingdom|Fungi|(555705)|Kingdom|Edit|Delete|Add|Child|Subkingdom|Dikarya|(936287)|Edit|Delete|Add|Child|Division|Basidiomycota|(623881)|Edit|Delete|Add|Child|Not|Defined|Edit|Delete|Add|Child|',
      'block');
  });
});
