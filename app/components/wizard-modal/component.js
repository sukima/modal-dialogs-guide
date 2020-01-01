import Component from '@glimmer/component';
import { action } from '@ember/object';

export default class WizardModalComponent extends Component {

  uiViewInfos = {};

  get state() {
    let {
      done,
      value: currentValue,
      history: { value: previousValue } = {}
    } = this.args.currentState || {};
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
    let currentState = this.currentMachine.resolveState(initialState);
    this.args.onTransition(currentState);
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

  @action transition(event) {
    let currentState = this.currentMachine.resolveState(this.args.currentState);
    let newState = this.currentMachine.transition(currentState, event);
    const { actions } = newState;
    actions.forEach(action => action.exec && action.exec());
    this.args.onTransition(newState);
  }

}
