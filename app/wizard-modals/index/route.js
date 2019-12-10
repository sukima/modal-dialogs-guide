import Route from '@ember/routing/route';

export default class WizardModalsIndexRoute extends Route {

  afterModel() {
    this.replaceWith('wizard-modals.historical');
  }

}
