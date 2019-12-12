import Component from '@ember/component';

export default class StoryPorridgeTooHotComponent extends Component {

  tagName = '';

  didInsertElement() {
    super.didInsertElement(...arguments);
    this.registerUiViewInfo({
      nextLabel: 'Try again',
    });
  }

}
