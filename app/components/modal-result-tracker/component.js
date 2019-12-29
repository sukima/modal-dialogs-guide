import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class ModalResultTrackerComponent extends Component {

  @tracked result = undefined;

  @action async openModal() {
    this.result = undefined;
    this.result = await this.modalManager.open();
  }

  @action register(modalManager) {
    this.modalManager = modalManager;
  }

}
