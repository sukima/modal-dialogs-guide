import Component from '@ember/component';
import { isNone } from '@ember/utils';
import { CHAIR as CHAIR_OPTIONS } from '../-story-state';

export default class StoryLivingRoomComponent extends Component {

  tagName = '';

  OPTIONS = CHAIR_OPTIONS;

  didInsertElement() {
    super.didInsertElement(...arguments);
    let { storyState } = this;
    this.registerUiViewInfo({
      nextLabel: 'Sit in chair',
      get nextDisabled() { return isNone(storyState.chair); },
    });
  }

}
