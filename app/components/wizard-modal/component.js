import Component from '@ember/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { Machine } from 'xstate';

export default class WizardModalComponent extends Component {

  tagName = '';

  uiViewInfos = {};

  @tracked currentState;

  get state() {
    return this.currentState && this.currentState.value;
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
      open: (currentState) => this.openModal(currentState),
      confirm: () => this.confirmModal(),
      cancel: () => this.cancelModal(),
    });
  }

  openModal(initialState = this.machine.initialState) {
    let currentState = this.machine.resolveState(initialState);
    this.updateState(currentState);
    return this.modalManager.open();
  }

  confirmModal() {
    this.modalManager.confirm();
  }

  cancelModal() {
    this.modalManager.cancel();
  }

  updateState(state) {
    if (this.onTransition) {
      this.onTransition(state);
    } else {
      this.currentState = state;
    }
  }

  @action transitionTo(event) {
    let currentState = this.machine.resolveState(this.currentState);
    let newState = this.machine.transition(currentState, event);
    const { actions } = newState;
    actions.forEach(action => action.exec && action.exec());
    this.updateState(newState);
  }

}
