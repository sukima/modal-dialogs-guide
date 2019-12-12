import Controller from '@ember/controller';
import { action } from '@ember/object';
import { run } from '@ember/runloop';

export default class WizardModalsHistoricalController extends Controller {

  @action openModal(resetHistory) {
    resetHistory();
    // Glimmer needs a nano-moment to update @currentState
    run.next(() => this.modalManager.open());
  }

}
