import Component from '@ember/component';

export default class StoryChairTooBigComponent extends Component {

  tagName = '';

  didInsertElement() {
    super.didInsertElement(...arguments);
    this.registerUiViewInfo({
      nextLabel: 'Try another chair',
    });
  }

}
