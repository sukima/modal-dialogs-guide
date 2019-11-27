import Component from '@ember/component';
import Confirmer from 'confirmed';
import { bool } from '@ember/object/computed';
import { guidFor } from '@ember/object/internals';

export default class BasicModalComponent extends Component {

  tagName = '';

  guid = guidFor(this);

  @bool('resolver') showModal;

  openModal() {
    return new Confirmer(resolver => {
      this.set('resolver', resolver);
      resolver.dispose(() => this.set('resolver', null));
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
