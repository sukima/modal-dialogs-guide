import Component from '@ember/component';
import config from 'modal-dialogs-guide/config/environment';

export default class StoryCoverComponent extends Component {

  tagName = '';

  rootURL = config.rootURL;

  didInsertElement() {
    super.didInsertElement(...arguments);
    this.registerUiViewInfo({
      prevLabel: 'Close',
      nextLabel: 'Continue'
    });
  }

}
