import Component from '@ember/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class WizardModalComponent extends Component {

  tagName = '';

  uiViewInfos = {};

  @tracked currentState;

  get state() {
    return this.currentState && this.currentState.value;
  }

  didInsertElement() {
    super.didInsertElement(...arguments);
    this.currentMachine = this.machine.withConfig({
      actions: {
        confirm: () => this.confirmModal(),
        cancel: () => this.cancelModal(),
      },
    });
    this.registerManager({
      open: (currentState) => this.openModal(currentState),
      confirm: () => this.confirmModal(),
      cancel: () => this.cancelModal(),
    });
  }

  openModal(initialState = this.currentMachine.initialState) {
    let currentState = this.currentMachine.resolveState(initialState);
    this.onTransition(currentState);
    return this.modalManager.open();
  }

  confirmModal() {
    this.modalManager.confirm();
  }

  cancelModal() {
    this.modalManager.cancel();
  }

  @action transitionTo(event) {
    let currentState = this.currentMachine.resolveState(this.currentState);
    let newState = this.currentMachine.transition(currentState, event);
    const { actions } = newState;
    actions.forEach(action => action.exec && action.exec());
    this.onTransition(newState);
  }

}
