import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class WizardModalComponent extends Component {

  @tracked currentState;

  uiViewInfos = {};

  get state() {
    let {
      done,
      value: currentValue,
      history: { value: previousValue } = {}
    } = this.currentState || {};
    return done ? previousValue : currentValue;
  }

  @action setup(modalManager) {
    this.modalManager = modalManager;
    this.currentMachine = this.args.machine.withConfig({
      actions: {
        confirm: () => this.confirmModal(),
        cancel: () => this.rejectModal(),
      },
    });
    this.args.registerManager({
      name: this.modalManager.name,
      open: (currentState) => this.openModal(currentState),
      confirm: () => this.confirmModal(),
      cancel: () => this.cancelModal(),
      reject: () => this.rejectModal(),
    });
  }

  openModal(initialState = this.currentMachine.initialState) {
    this.currentState = this.currentMachine.resolveState(initialState);
    this.performActions();
    this.args.onTransition(this.currentState);
    return this.modalManager.open();
  }

  confirmModal() {
    this.modalManager.confirm();
  }

  cancelModal() {
    this.modalManager.cancel();
  }

  rejectModal() {
    this.modalManager.reject();
  }

  performActions() {
    let { actions } = this.currentState;
    actions.forEach(action => action.exec && action.exec());
  }

  @action transition(event) {
    this.currentState = this.currentMachine.transition(this.currentState, event);
    this.performActions();
    this.args.onTransition(this.currentState);
  }

}
