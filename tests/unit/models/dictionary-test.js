import {
  moduleForModel, test
}
from 'ember-qunit';

moduleForModel('dictionary', 'Unit | Model | dictionary', {
  // Specify the other units that are required for this test.
  needs: []
});

test('it exists', function(assert) {
  var model = this.subject();
  // var store = this.store();
  assert.ok(!!model);
});

test('should correctly compute title', function(assert) {
  const me = this.subject();

  assert.expect(1);
  me.set('json.dictionaryInfo.citation.title', 'bar');
  assert.equal(me.get('title'), 'bar');
});