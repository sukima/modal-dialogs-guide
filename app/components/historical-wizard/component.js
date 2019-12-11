import Component from '@ember/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class HistoricalWizardComponent extends Component {

  tagName = '';

  @tracked history;

  @action pushState(state) {
    this.history = [...this.history, state];
  }

  @action registerManager(manager) {
    this.registerManager({
      open: () => manager.open().onConfirmed(() => this.history),
      confirm: manager.confirm,
      cancel: manager.cancel,
    });
  }

}
