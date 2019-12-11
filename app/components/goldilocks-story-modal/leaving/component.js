import Component from '@ember/component';

export default class StoryLeavingComponent extends Component {

  tagName = '';

  didInsertElement() {
    super.didInsertElement(...arguments);
    this.registerUiViewInfo({
      prevLabel: 'Close',
      nextLabel: 'Return to the house',
    });
  }

}
