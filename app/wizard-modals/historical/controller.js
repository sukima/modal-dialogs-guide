import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class WizardModalsHistoricalController extends Controller {

  @tracked modalResult = null;

  @action async chainActions(actionFuncs) {
    for (let func of actionFuncs) {
      await func();
    }
  }

}
