import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class StateMachineHistoryComponent extends Component {

  @tracked stack = [];

  @action pushState(state) {
    this.stack = [...this.stack, state];
  }

  @action reset() {
    this.stack = [];
  }

  get lastState() {
    return this.stack[this.stack.length - 1];
  }

}
