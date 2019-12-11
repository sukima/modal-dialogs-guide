import Component from '@ember/component';
import StoryState from './-story-state';

export default class GoldilockaStoryModalComponent extends Component {

  tagName = '';

  storyState = new StoryState();

  guards = this.storyState.buildGuards();

  definition = {
    id: 'goldilocks',
    initial: 'cover',
    states: {
      cancelled: {
        type: 'final',
        entry: 'cancel',
      },
      cover: {
        on: {
          PREV: 'cancelled',
          NEXT: 'front-door',
        },
      },
      leaving: {
        on: {
          PREV: 'cancelled',
          NEXT: 'front-door',
        },
      },
      'front-door': {
        on: {
          PREV: 'leaving',
          NEXT: 'kitchen',
        },
      },
      kitchen: {
        on: {
          PREV: 'front-door',
          NEXT: [
            { target: 'porrage-too-hot', cond: 'isPorrageTooHot' },
            { target: 'porrage-too-cold', cond: 'isPorrageTooCold' },
            { target: 'livingroom', cond: 'isPorrageJustRight' },
          ],
        },
      },
      'porrage-too-hot': {
        on: {
          PREV: 'kitchen',
          NEXT: 'kitchen',
        },
      },
      'porrage-too-cold': {
        on: {
          PREV: 'kitchen',
          NEXT: 'kitchen',
        },
      },
      livingroom: {
        on: {
          PREV: 'kitchen',
          NEXT: [
            { target: 'chair-too-big', cond: 'isChairTooBig' },
            { target: 'chair-too-small', cond: 'isChairTooSmall' },
            { target: 'bedroom', cond: 'isChairJustRight' },
          ],
        },
      },
      'chair-too-big': {
        on: {
          PREV: 'livingroom',
          NEXT: 'livingroom',
        },
      },
      'chair-too-small': {
        on: {
          PREV: 'livingroom',
          NEXT: 'livingroom',
        },
      },
      bedroom: {
        on: {
          PREV: 'livingroom',
          NEXT: [
            { target: 'bed-too-hard', cond: 'isBedTooHard' },
            { target: 'bed-too-soft', cond: 'isBedTooSoft' },
            { target: 'wake-up', cond: 'isBedJustRight' },
          ],
        },
      },
      'bed-too-hard': {
        on: {
          PREV: 'bedroom',
          NEXT: 'bedroom',
        },
      },
      'bed-too-soft': {
        on: {
          PREV: 'bedroom',
          NEXT: 'bedroom',
        },
      },
      'wake-up': {
        on: {
          PREV: 'bedroom',
          NEXT: 'done',
        },
      },
      done: {
        type: 'final',
        entry: 'confirm',
      },
    },
    on: {
      CANCEL: 'cancelled',
    },
  };

  get title() {
    let mainTitle = 'Goldilocks and the Three Bears';
    return this.subtitle ? `${mainTitle} - ${this.subtitle}` : mainTitle;
  }

}
