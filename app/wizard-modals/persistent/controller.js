import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class WizardModalsPersistentController extends Controller {

  queryParams = ['state'];

  @tracked state = undefined;

  @action async openModal() {
    await this.modalManager.open(this.state);
    if (this.state.done) {
      this.state = undefined;
    }
  }

}
