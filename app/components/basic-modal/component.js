import Component from '@glimmer/component';
import Confirmer from 'confirmed';
import { guidFor } from '@ember/object/internals';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class BasicModalComponent extends Component {

  guid = guidFor(this);

  @tracked resolver;

  get showModal() {
    return !!this.resolver;
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

  @action registerManager() {
    this.args.registerManager({
      open: () => this.openModal(),
      confirm: (value) => this.resolver.confirm(value),
      reject: (value) => this.resolver.reject(value),
      cancel: (value) => this.resolver.cancel(value),
      error: (error) => this.resolver.error(error),
    }, this.args.name);
  }

  @action teardown() {
    if (this.resolver) {
      this.resolver.cancel();
    }
    if (this.args.unregisterManager) {
      this.args.unregisterManager(this.name);
    }
  }

}
