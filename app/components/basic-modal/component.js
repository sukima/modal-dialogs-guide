import Component from '@ember/component';
import Confirmer from 'confirmed';
import { guidFor } from '@ember/object/internals';
import { tracked } from '@glimmer/tracking';

export default class BasicModalComponent extends Component {

  tagName = '';

  guid = guidFor(this);

  @tracked resolver;

  get showModal() {
    return !!this.resolver;
  }

  openModal() {
    return new Confirmer(resolver => {
      this.resolver = resolver;
      resolver.dispose(() => this.resolver = null);
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
    });
  }

  willDestroyElement() {
    super.willDestroyElement(...arguments);
    if (this.resolver) {
      this.resolver.cancel();
    }
  }

}
