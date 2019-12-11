import Component from '@ember/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { Machine } from 'xstate';

export default class WizardModalComponent extends Component {

  tagName = '';

  uiViewInfos = {};

  @tracked currentState;

  get state() {
    return this.currentState.value;
  }

  init() {
    super.init(...arguments);
    let { definition, actions = {}, guards = {} } = this.stateDefinition;
    this.machine = new Machine(definition, {
      guards,
      actions: {
        confirm: () => this.confirmModal(),
        cancel: () => this.cancelModal(),
        ...actions,
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
    this.currentState = this.machine.initialState;
    this.notifyTransition();
    return this.modalManager.open();
  }

  confirmModal() {
    this.modalManager.confirm();
  }

  cancelModal() {
    this.modalManager.cancel();
  }

  notifyTransition() {
    if (this.onTransition) {
      this.onTransition(this.currentState);
    }
  }

  @action transitionTo(event) {
    let newState = this.machine.transition(this.currentState, event);
    const { actions } = newState;
    actions.forEach(action => action.exec && action.exec());
    this.currentState = newState;
    this.notifyTransition();
  }

}
