import Component from '@ember/component';

export default class StoryBedTooHardComponent extends Component {

  tagName = '';

  didInsertElement() {
    super.didInsertElement(...arguments);
    this.registerUiViewInfo({
      nextLabel: 'Try another bed',
    });
  }

}
