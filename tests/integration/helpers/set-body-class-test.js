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
    assert.ok(document.body.classList.contains('test-class-a'), 'expected to have test-class-a');
    assert.ok(document.body.classList.contains('test-class-b'), 'expected to have test-class-b');
  });

  test('removes classes from the body element when removed from DOM', async function(assert) {
    this.set('isRendered', true);
    await render(hbs`
      {{#if this.isRendered}}
        {{set-body-class "test-class-a" "test-class-b"}}
      {{/if}}
    `);
    assert.ok(document.body.classList.contains('test-class-a'), 'expected to have test-class-a');
    assert.ok(document.body.classList.contains('test-class-b'), 'expected to have test-class-b');
    this.set('isRendered', false);
    assert.notOk(document.body.classList.contains('test-class-a'), 'expected not to have test-class-a');
    assert.notOk(document.body.classList.contains('test-class-b'), 'expected not to have test-class-b');
  });

  test('adjusts classes on the body element when params change', async function(assert) {
    this.set('testClass', 'test-class-a');
    await render(hbs`{{set-body-class this.testClass}}`);
    assert.ok(document.body.classList.contains('test-class-a'), 'expected to have test-class-a');
    assert.notOk(document.body.classList.contains('test-class-b'), 'expected not to have test-class-b');
    this.set('testClass', 'test-class-b');
    assert.ok(document.body.classList.contains('test-class-b'), 'expected to have test-class-b');
    assert.notOk(document.body.classList.contains('test-class-a'), 'expected not to have test-class-a');
  });

  test('preserves current classes on the body element', async function(assert) {
    document.body.classList.add('test-class-a');
    await render(hbs`{{set-body-class "test-class-b"}}`);
    assert.ok(document.body.classList.contains('test-class-a'), 'expected to have test-class-a');
    assert.ok(document.body.classList.contains('test-class-b'), 'expected to have test-class-b');
  });

  test('does not remove classes registered from other invocations', async function(assert) {
    this.set('isRendered', true);
    await render(hbs`
      {{set-body-class "test-class-b"}}
      {{#if this.isRendered}}
        {{set-body-class "test-class-a" "test-class-b"}}
      {{/if}}
    `);
    this.set('isRendered', false);
    assert.notOk(document.body.classList.contains('test-class-a'), 'expected not to have test-class-a');
    assert.ok(document.body.classList.contains('test-class-b'), 'expected to have test-class-b');
  });

});
