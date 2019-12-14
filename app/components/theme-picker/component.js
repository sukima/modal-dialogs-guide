import Component from '@ember/component';
import { action } from '@ember/object';

export default class ThemePickerComponent extends Component {

  tagName = '';

  @action onChange({ target: { value } }) {
    this.update(value);
  }
}
