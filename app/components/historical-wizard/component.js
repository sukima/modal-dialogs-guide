import Component from '@ember/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { Machine } from 'xstate';
import { GOLDILOCKS_STATECHART }
  from 'modal-dialogs-guide/utils/goldilocks-statechart';

export default class HistoricalWizardComponent extends Component {

  tagName = '';

  @tracked history;

  get currentState() {
    return this.history[0];
  }

  init() {
    super.init(...arguments);
    this.story = {};
    this.machine = new Machine(GOLDILOCKS_STATECHART, {
      actions: {
        confirm: () => this.confirmModal(),
        cancel: () => this.cancelModal(),
      },
      guards: {
        isPorrageTooHot: () => this.story.isPorrageTooHot,
        isPorrageTooCold: () => this.story.isPorrageTooCold,
        isPorrageJustRight: () => this.story.isPorrageJustRight,
        isChairTooBig: () => this.story.isChairTooBig,
        isChairTooSmall: () => this.story.isChairTooSmall,
        isChairJustRight: () => this.story.isChairJustRight,
        isBedTooHard: () => this.story.isBedTooHard,
        isBedTooSoft: () => this.story.isBedTooSoft,
        isBedJustRight: () => this.story.isBedJustRight,
      },
    });
  }

  didInsertElement() {
    super.didInsertElement(...arguments);
    this.registerManager({
      open: () => this.openModal(),
      confirm: () => this.confirmModal(),
      cancel: () => this.cancelModal(),
    });
  }

  openModal() {
    this.history = [this.machine.initialState];
    return this.modalManager.open();
  }

  confirmModal() {
    this.modalManager.confirm(this.history);
  }

  cancelModal() {
    this.modalManager.cancel();
  }

  @action transitionTo(event) {
    let newState = this.machine.transition(this.currentState, event);
    const { actions } = newState;
    actions.forEach(action => action.exec && action.exec());
    this.history = [newState, ...this.history];
  }

}
