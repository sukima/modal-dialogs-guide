import Component from '@ember/component';
import { createGoldilocksMachine } from './-state-machine';

export default class GoldilockaStoryModalComponent extends Component {

  tagName = '';

  machine = createGoldilocksMachine();

  get title() {
    let mainTitle = 'Goldilocks and the Three Bears';
    return this.subtitle ? `${mainTitle} - ${this.subtitle}` : mainTitle;
  }

}
