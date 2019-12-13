import Component from '@ember/component';
import { BED as BED_OPTIONS } from '../-state-machine';

export default class StoryBedroomComponent extends Component {

  tagName = '';

  OPTIONS = BED_OPTIONS;

  get isBedTooHard() {
    return this.currentState.context.bed === BED_OPTIONS.TOO_HARD;
  }

  get isBedTooSoft() {
    return this.currentState.context.bed === BED_OPTIONS.TOO_SOFT;
  }

  get isBedJustRight() {
    return this.currentState.context.bed === BED_OPTIONS.JUST_RIGHT;
  }

  get isBedUnselected() {
    return this.currentState.context.bed === BED_OPTIONS.UNSELECTED;
  }

  didInsertElement() {
    super.didInsertElement(...arguments);
    let component = this;
    this.registerUiViewInfo({
      nextLabel: 'Sleep in bed',
      get nextDisabled() { return component.isBedUnselected; },
    });
  }

}
