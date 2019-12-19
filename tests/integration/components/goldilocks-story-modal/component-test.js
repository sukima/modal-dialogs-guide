import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { click, render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import { Machine } from 'xstate';
import { createModel } from '@xstate/test';
import { BED, CHAIR, PORRIDGE }
  from 'modal-dialogs-guide/components/goldilocks-story-modal/-state-machine';

const testMachine = Machine({
  id: 'goldilocks-test',
  initial: 'cover',
  states: {
    cancelled: {
      meta: {
        description: 'Cancelling the modal',
        test({ assert, el }) {
          assert.notOk(el.querySelector('.modal.open'), 'modal not rendered');
        },
      },
    },
    cover: {
      on: {
        PREV: 'cancelled',
        NEXT: 'front-door',
      },
      meta: {
        description: 'Initial Book Cover',
        test({ assert, el }) {
          assert.ok(el.querySelector('.modal-body.cover'), 'modal-body has class cover');
        },
      },
    },
    leaving: {
      on: {
        PREV: 'cancelled',
        NEXT: 'front-door',
      },
      meta: {
        description: 'Walking away from front door',
        test({ assert, el }) {
          assert.ok(el.querySelector('.modal-body.leaving'), 'modal-body has class leaving');
        },
      },
    },
    'front-door': {
      on: {
        PREV: 'leaving',
        NEXT: 'kitchen',
      },
      meta: {
        description: 'Front of door',
        test({ assert, el }) {
          assert.ok(el.querySelector('.modal-body.front-door'), 'modal-body has class front-door');
        },
      },
    },
    kitchen: {
      on: {
        PREV: 'front-door',
        PORRIDGE_TOO_HOT: 'porridge-too-hot',
        PORRIDGE_TOO_COLD: 'porridge-too-cold',
        PORRIDGE_JUST_RIGHT: 'living-room',
      },
      meta: {
        description: 'In the kitchen',
        test({ assert, el }) {
          assert.ok(el.querySelector('.modal-body.kitchen'), 'modal-body has class kitchen');
        },
      },
    },
    'porridge-too-hot': {
      on: {
        PREV: 'kitchen',
        NEXT: 'kitchen',
      },
      meta: {
        description: 'Eating porridge that is too hot',
        test({ assert, el }) {
          assert.ok(el.querySelector('.modal-body.porridge-too-hot'), 'modal-body has class porridge-too-hot');
        },
      },
    },
    'porridge-too-cold': {
      on: {
        PREV: 'kitchen',
        NEXT: 'kitchen',
      },
      meta: {
        description: 'Eating porridge that is too cold',
        test({ assert, el }) {
          assert.ok(el.querySelector('.modal-body.porridge-too-cold'), 'modal-body has class porridge-too-cold');
        },
      },
    },
    'living-room': {
      on: {
        PREV: 'kitchen',
        CHAIR_TOO_BIG: 'chair-too-big',
        CHAIR_TOO_SMALL: 'chair-too-small',
        CHAIR_JUST_RIGHT: 'bedroom',
      },
      meta: {
        description: 'In the living room',
        test({ assert, el }) {
          assert.ok(el.querySelector('.modal-body.living-room'), 'modal-body has class living-room');
        },
      },
    },
    'chair-too-big': {
      on: {
        PREV: 'living-room',
        NEXT: 'living-room',
      },
      meta: {
        description: 'Sitting in chair that is too big',
        test({ assert, el }) {
          assert.ok(el.querySelector('.modal-body.chair-too-big'), 'modal-body has class chair-too-big');
        },
      },
    },
    'chair-too-small': {
      on: {
        PREV: 'living-room',
        NEXT: 'living-room',
      },
      meta: {
        description: 'Sitting in chair that is too small',
        test({ assert, el }) {
          assert.ok(el.querySelector('.modal-body.chair-too-small'), 'modal-body has class chair-too-small');
        },
      },
    },
    bedroom: {
      on: {
        PREV: 'living-room',
        BED_TOO_HARD: 'bed-too-hard',
        BED_TOO_SOFT: 'bed-too-soft',
        BED_JUST_RIGHT: 'wake-up',
      },
      meta: {
        description: 'In bedroom',
        test({ assert, el }) {
          assert.ok(el.querySelector('.modal-body.bedroom'), 'modal-body has class bedroom');
        },
      },
    },
    'bed-too-hard': {
      on: {
        PREV: 'bedroom',
        NEXT: 'bedroom',
      },
      meta: {
        description: 'Sleeping in bed that is too hard',
        test({ assert, el }) {
          assert.ok(el.querySelector('.modal-body.bed-too-hard'), 'modal-body has class bed-too-hard');
        },
      },
    },
    'bed-too-soft': {
      on: {
        PREV: 'bedroom',
        NEXT: 'bedroom',
      },
      meta: {
        description: 'Sleeping in bed that is too soft',
        test({ assert, el }) {
          assert.ok(el.querySelector('.modal-body.bed-too-soft'), 'modal-body has class bed-too-soft');
        },
      },
    },
    'wake-up': {
      on: {
        PREV: 'bedroom',
        NEXT: 'done',
      },
      meta: {
        description: 'Waking up from sleep',
        test({ assert, el }) {
          assert.ok(el.querySelector('.modal-body.wake-up'), 'modal-body has class wake-up');
        },
      },
    },
    done: {
      meta: {
        description: 'Confirming the modal',
        test({ assert, el }) {
          assert.notOk(el.querySelector('.modal.open'), 'modal not rendered');
        },
      },
    },
  },
});

function selectInputAndNext({ name, value }) {
  return async function() {
    await click(`input[name="${name}"][value="${value}"]`);
    await click('[data-test-selector="next"]');
  };
}

const goldilocksModel = createModel(testMachine).withEvents({
  PREV: {
    async exec() {
      await click('[data-test-selector="back"]');
    }
  },
  NEXT: {
    async exec() {
      await click('[data-test-selector="next"]');
    }
  },
  PORRIDGE_TOO_HOT: {
    exec: selectInputAndNext({ name: 'porridge', value: PORRIDGE.TOO_HOT }),
  },
  PORRIDGE_TOO_COLD: {
    exec: selectInputAndNext({ name: 'porridge', value: PORRIDGE.TOO_COLD }),
  },
  PORRIDGE_JUST_RIGHT: {
    exec: selectInputAndNext({ name: 'porridge', value: PORRIDGE.JUST_RIGHT }),
  },
  CHAIR_TOO_BIG: {
    exec: selectInputAndNext({ name: 'chair', value: CHAIR.TOO_BIG }),
  },
  CHAIR_TOO_SMALL: {
    exec: selectInputAndNext({ name: 'chair', value: CHAIR.TOO_SMALL }),
  },
  CHAIR_JUST_RIGHT: {
    exec: selectInputAndNext({ name: 'chair', value: CHAIR.JUST_RIGHT }),
  },
  BED_TOO_HARD: {
    exec: selectInputAndNext({ name: 'bed', value: BED.TOO_HARD }),
  },
  BED_TOO_SOFT: {
    exec: selectInputAndNext({ name: 'bed', value: BED.TOO_SOFT }),
  },
  BED_JUST_RIGHT: {
    exec: selectInputAndNext({ name: 'bed', value: BED.JUST_RIGHT }),
  },
});

module('Integration | Component | Goldilocks Story Modal', function(hooks) {
  setupRenderingTest(hooks);

  hooks.after(function(assert) {
    try {
      goldilocksModel.testCoverage();
      assert.ok(true, 'expected tests to cover all states');
    } catch (error) {
      assert.ok(false, error.message);
    }
  });

  goldilocksModel.getSimplePathPlans().forEach(function (plan) {
    module(plan.description, function() {
      plan.paths.forEach(function (path) {
        test(path.description, async function(assert) {
          this.set('registerSpy', manager => manager.open());
          await render(hbs`
            <GoldilocksStoryModal
              @currentState={{this.currentState}}
              @onTransition={{fn (mut this.currentState)}}
              @registerManager={{this.registerSpy}}
            />`);
          await path.test({ assert, el: this.element });
        });
      });
    });
  });

});
