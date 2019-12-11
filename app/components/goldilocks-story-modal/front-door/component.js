import Component from '@ember/component';

export default class StoryFrontDoorComponent extends Component {

  tagName = '';

  didInsertElement() {
    super.didInsertElement(...arguments);
    this.registerUiViewInfo({
      prevLabel: 'Leave',
      nextLabel: 'Enter House'
    });
  }

}
