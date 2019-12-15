import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Helper | set-body-class', function(hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function() {
    this.originalClassName = document.body.className;
  });

  hooks.afterEach(function() {
    document.body.className = this.originalClassName;
  });

  test('adds classes to the body element', async function(assert) {
    await render(hbs`{{set-body-class "test-class-a" "test-class-b"}}`);
    assert.ok(/\btest-class-a\b/.test(document.body.className));
    assert.ok(/\btest-class-b\b/.test(document.body.className));
  });

  test('removes classes from the body element when removed from DOM', async function(assert) {
    this.set('isRendered', true);
    await render(hbs`
      {{#if this.isRendered}}
        {{set-body-class "test-class-a" "test-class-b"}}
      {{/if}}
    `);
    assert.ok(/\btest-class-a\b/.test(document.body.className));
    assert.ok(/\btest-class-b\b/.test(document.body.className));
    this.set('isRendered', false);
    assert.notOk(/\btest-class-a\b/.test(document.body.className));
    assert.notOk(/\btest-class-b\b/.test(document.body.className));
  });

  test('adjusts classes on the body element when params change', async function(assert) {
    this.set('testClass', 'test-class-a');
    await render(hbs`{{set-body-class this.testClass}}`);
    assert.ok(/\btest-class-a\b/.test(document.body.className));
    assert.notOk(/\btest-class-b\b/.test(document.body.className));
    this.set('testClass', 'test-class-b');
    assert.ok(/\btest-class-b\b/.test(document.body.className));
    assert.notOk(/\btest-class-a\b/.test(document.body.className));
  });

  test('preserves current classes on the body element', async function(assert) {
    document.body.classList.add('test-class-a');
    await render(hbs`{{set-body-class "test-class-b"}}`);
    assert.ok(/\btest-class-a\b/.test(document.body.className));
    assert.ok(/\btest-class-b\b/.test(document.body.className));
  });

});
