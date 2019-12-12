import Component from '@ember/component';

export default class StoryChairTooSmallComponent extends Component {

  tagName = '';

  didInsertElement() {
    super.didInsertElement(...arguments);
    this.registerUiViewInfo({
      nextLabel: 'Try another chair',
    });
  }

}
