import Controller from '@ember/controller';
import { action } from '@ember/object';

export default class WizardModalsHistoricalController extends Controller {

  @action openModal(resetHistory) {
    resetHistory();
    this.modalManager.open();
  }

}
