import Component from '@glimmer/component';
import { createGoldilocksMachine } from './-state-machine';

const MAIN_TITLE = 'Goldilocks and the Three Bears';

export default class GoldilockaStoryModalComponent extends Component {

  machine = createGoldilocksMachine();

  get title() {
    let { subtitle } = this.args;
    return subtitle ? `${MAIN_TITLE} - ${subtitle}` : MAIN_TITLE;
  }

}
