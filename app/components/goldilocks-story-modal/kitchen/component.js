import Component from '@ember/component';
import { isNone } from '@ember/utils';
import { PORRIDGE as PORRIDGE_OPTIONS } from '../-story-state';

export default class StoryKitchenComponent extends Component {

  tagName = '';

  OPTIONS = PORRIDGE_OPTIONS;

  didInsertElement() {
    super.didInsertElement(...arguments);
    let { storyState } = this;
    this.registerUiViewInfo({
      nextLabel: 'Drink Porridge',
      get nextDisabled() { return isNone(storyState.porridge); },
    });
  }

}
