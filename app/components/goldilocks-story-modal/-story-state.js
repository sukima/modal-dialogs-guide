import { tracked } from '@glimmer/tracking';

export const PORRAGE = Object.freeze({
  TOO_HOT: 1,
  TOO_COLD: 2,
  JUST_RIGHT: 3,
});

export const CHAIR = Object.freeze({
  TOO_BIG: 4,
  TOO_SMALL: 5,
  JUST_RIGHT: 6,
});

export const BED = Object.freeze({
  TOO_HARD: 7,
  TOO_SOFT: 8,
  JUST_RIGHT: 9,
});

export default class StoryState {
  @tracked porrage = null;
  @tracked chair = null;
  @tracked bed = null;
  get isPorrageTooHot() { return this.story.porrage === PORRAGE.TOO_HOT; }
  get isPorrageTooCold() { return this.story.porrage === PORRAGE.TOO_COLD; }
  get isPorrageJustRight() { return this.story.porrage === PORRAGE.JUST_RIGHT; }
  get isChairTooBig() { return this.story.chair === CHAIR.TOO_BIG; }
  get isChairTooSmall() { return this.story.chair === CHAIR.TOO_SMALL; }
  get isChairJustRight() { return this.story.chair === CHAIR.JUST_RIGHT; }
  get isBedTooHard() { return this.story.bed === BED.TOO_HARD; }
  get isBedTooSoft() { return this.story.bed === BED.TOO_SOFT; }
  get isBedJustRight() { return this.story.bed === BED.JUST_RIGHT; }
  buildGuards() {
    return {
      isPorrageTooHot: () => this.isPorrageTooHot,
      isPorrageTooCold: () => this.isPorrageTooCold,
      isPorrageJustRight: () => this.isPorrageJustRight,
      isChairTooBig: () => this.isChairTooBig,
      isChairTooSmall: () => this.isChairTooSmall,
      isChairJustRight: () => this.isChairJustRight,
      isBedTooHard: () => this.isBedTooHard,
      isBedTooSoft: () => this.isBedTooSoft,
      isBedJustRight: () => this.isBedJustRight,
    };
  }
}

