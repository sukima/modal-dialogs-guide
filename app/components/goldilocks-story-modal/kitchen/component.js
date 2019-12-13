import Component from '@ember/component';
import { PORRIDGE as PORRIDGE_OPTIONS } from '../-state-machine';

export default class StoryKitchenComponent extends Component {

  tagName = '';

  OPTIONS = PORRIDGE_OPTIONS;

  get isPorridgeTooHot() {
    return this.currentState.context.porridge === PORRIDGE_OPTIONS.TOO_HOT;
  }

  get isPorridgeTooCold() {
    return this.currentState.context.porridge === PORRIDGE_OPTIONS.TOO_COLD;
  }

  get isPorridgeJustRight() {
    return this.currentState.context.porridge === PORRIDGE_OPTIONS.JUST_RIGHT;
  }

  get isPorridgeUnselected() {
    return this.currentState.context.porridge === PORRIDGE_OPTIONS.UNSELECTED;
  }

  didInsertElement() {
    super.didInsertElement(...arguments);
    let component = this;
    this.registerUiViewInfo({
      nextLabel: 'Drink Porridge',
      get nextDisabled() { return component.isPorridgeUnselected; },
    });
  }

}
