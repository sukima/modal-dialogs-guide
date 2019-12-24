import Component from '@glimmer/component';
import { action } from '@ember/object';

export default class ThemePickerComponent extends Component {

  @action onChange({ target: { value } }) {
    this.args.update(value);
  }

}
