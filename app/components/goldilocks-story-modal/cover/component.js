import Component from '@ember/component';

export default class StoryCoverComponent extends Component {

  tagName = '';

  didInsertElement() {
    super.didInsertElement(...arguments);
    this.registerUiViewInfo({
      prevLabel: 'Close',
      nextLabel: 'Continue'
    });
  }

}
