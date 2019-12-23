import Component from '@ember/component';
import Confirmer from 'confirmed';
import { guidFor } from '@ember/object/internals';
import { tracked } from '@glimmer/tracking';

export default class BasicModalComponent extends Component {

  tagName = '';

  guid = guidFor(this);

  @tracked animationEnd = () => {};

  @tracked isClosing = false;

  @tracked resolver;

  get showModal() {
    return !!this.resolver;
  }

  openModal() {
    this.isClosing = false;
    return new Confirmer(resolver => {
      this.resolver = resolver;
    }).onDone(async () => {
      if (this.closingClass) {
        await new Promise(resolve => {
          this.animationEnd = resolve;
          this.isClosing = true;
        });
      }
      this.resolver = null;
    });
  }

  didInsertElement() {
    super.didInsertElement(...arguments);
    this.registerManager({
      open: () => this.openModal(),
      confirm: (value) => this.resolver.confirm(value),
      reject: (value) => this.resolver.reject(value),
      cancel: (value) => this.resolver.cancel(value),
      error: (error) => this.resolver.error(error),
    }, this.name);
  }

  willDestroyElement() {
    super.willDestroyElement(...arguments);
    if (this.resolver) {
      this.resolver.cancel();
    }
    if (this.unregisterManager) {
      this.unregisterManager(this.name);
    }
  }

}
