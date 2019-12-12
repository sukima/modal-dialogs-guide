import Component from '@ember/component';

export default class StoryWakeUpComponent extends Component {

  tagName = '';

  didInsertElement() {
    super.didInsertElement(...arguments);
    this.registerUiViewInfo({
      nextLabel: 'Close',
    });
  }

}
