import Component from '@ember/component';
import { isNone } from '@ember/utils';
import { BED as BED_OPTIONS } from '../-story-state';

export default class StoryBedroomComponent extends Component {

  tagName = '';

  OPTIONS = BED_OPTIONS;

  didInsertElement() {
    super.didInsertElement(...arguments);
    let { storyState } = this;
    this.registerUiViewInfo({
      nextLabel: 'Sleep in bed',
      get nextDisabled() { return isNone(storyState.bed); },
    });
  }

}
