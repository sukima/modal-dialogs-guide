import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Helper | eq', function(hooks) {
  setupRenderingTest(hooks);

  test('it can evaluate boolean comparisons', async function(assert) {
    await render(hbs`
      [{{eq true true}}] [{{eq true false}}] [{{eq false true}}] [{{eq false false}}]
    `);
    assert.equal(
      this.element.textContent.trim(),
      '[true] [false] [false] [true]'
    );
  });

  test('it compares with strict equality', async function(assert) {
    await render(hbs`
      [{{eq false null}}] [{{eq false ""}}] [{{eq (array) (array)}}] [{{eq false 0}}]
    `);
    assert.equal(
      this.element.textContent.trim(),
      '[false] [false] [false] [false]'
    );
  });

});
