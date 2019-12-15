import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { stripIndent } from 'common-tags';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Helper | json', function(hooks) {
  setupRenderingTest(hooks);

  test('returns stringified JSON', async function(assert) {
    this.data = { foo: { bar: { baz: 'foobarbaz' } } };
    await render(hbs`{{json this.data}}`);
    assert.equal(
      this.element.textContent.trim(),
      '{"foo":{"bar":{"baz":"foobarbaz"}}}'
    );
  });

  test('returns stringified JSON with custom indent', async function(assert) {
    this.data = { foo: { bar: { baz: 'foobarbaz' } } };
    await render(hbs`{{json this.data indent=2}}`);
    assert.equal(
      this.element.textContent.trim(),
      stripIndent`
        {
          "foo": {
            "bar": {
              "baz": "foobarbaz"
            }
          }
        }
      `
    );
  });

});
