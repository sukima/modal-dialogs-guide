import Component from '@ember/component';
import { action } from '@ember/object';
import { assert } from '@ember/debug';

export default class ModalWorkspaceComponent extends Component {

  tagName = '';

  modalManagers = new Map();

  @action registerManager(manager) {
    let { name } = manager;
    assert('modal must have a @name property', name);
    this.modalManagers.set(name, manager);
  }

  @action unregisterManager({ name }) {
    this.modalManagers.delete(name);
  }

  @action openModal(name, ...args) {
    let manager = this.modalManagers.get(name);
    return manager.open(...args);
  }

}
