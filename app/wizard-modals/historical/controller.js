import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class WizardModalsHistoricalController extends Controller {

  @tracked modalResult = null;

  @action async trackModalResult(resetHistory, openModal) {
    resetHistory();
    this.modalResult = await openModal();
  }

}
