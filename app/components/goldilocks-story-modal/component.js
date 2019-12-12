import Component from '@ember/component';
import StoryState from './-story-state';
import { GOLDILOCKS_STATECHART } from './-statechart';

export default class GoldilockaStoryModalComponent extends Component {

  tagName = '';

  storyState = new StoryState();

  guards = this.storyState.buildGuards();

  definition = GOLDILOCKS_STATECHART;

  get title() {
    let mainTitle = 'Goldilocks and the Three Bears';
    return this.subtitle ? `${mainTitle} - ${this.subtitle}` : mainTitle;
  }

}
