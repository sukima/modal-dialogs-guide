import Component from '@ember/component';

export default class StoryKitchenComponent extends Component {

  tagName = '';

  didInsertElement() {
    super.didInsertElement(...arguments);
    this.registerUiViewInfo({
    });
  }

}
