import Component from '@glimmer/component';
import Confirmer from 'confirmed';
import { guidFor } from '@ember/object/internals';
import { tracked } from '@glimmer/tracking';

export default class BasicModalComponent extends Component {

  @tracked resolver;

  guid = guidFor(this);

  modalManager = {
    name: this.args.name,
    open: () => this.openModal(),
    confirm: (value) => this.resolver.confirm(value),
    reject: (value) => this.resolver.reject(value),
    cancel: (value) => this.resolver.cancel(value),
    error: (error) => this.resolver.error(error),
  };

  get showModal() {
    return !!this.resolver;
  }

  constructor() {
    super(...arguments);
    this.args.registerManager(this.modalManager);
  }

  willDestroy() {
    let { unregisterManager = () => {} } = this.args;
    unregisterManager(this.modalManager);
    super.willDestroy(...arguments);
  }

  async openModal() {
    return new Confirmer(resolver => {
      this.resolver = resolver;
    }).onDone(async () => {
      if (this.modalElement.animations) {
        await this.modalElement.animations.run('close');
      }
      this.resolver = null;
    });
  }

}
