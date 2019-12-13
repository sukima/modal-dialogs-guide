import Component from '@ember/component';
import { CHAIR as CHAIR_OPTIONS } from '../-state-machine';

export default class StoryLivingRoomComponent extends Component {

  tagName = '';

  OPTIONS = CHAIR_OPTIONS;

  get isChairTooBig() {
    return this.currentState.context.chair === CHAIR_OPTIONS.TOO_BIG;
  }

  get isChairTooSmall() {
    return this.currentState.context.chair === CHAIR_OPTIONS.TOO_SMALL;
  }

  get isChairJustRight() {
    return this.currentState.context.chair === CHAIR_OPTIONS.JUST_RIGHT;
  }

  get isChairUnselected() {
    return this.currentState.context.chair === CHAIR_OPTIONS.UNSELECTED;
  }

  didInsertElement() {
    super.didInsertElement(...arguments);
    let component = this;
    this.registerUiViewInfo({
      nextLabel: 'Sit in chair',
      get nextDisabled() { return component.isChairUnselected; },
    });
  }

}
