import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class WizardModalsPersistentController extends Controller {

  queryParams = ['state'];

  @tracked state = undefined;

  @action openModal() {
    this.modalManager.open(this.state).onDone(() => {
      if (this.state.done) {
        this.state = undefined;
      }
    });
  }

}
