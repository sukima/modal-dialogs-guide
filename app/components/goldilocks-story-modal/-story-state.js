import { tracked } from '@glimmer/tracking';

export const PORRIDGE = Object.freeze({
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
  @tracked porridge = null;
  @tracked chair = null;
  @tracked bed = null;
  get isPorridgeTooHot() { return this.porridge === PORRIDGE.TOO_HOT; }
  get isPorridgeTooCold() { return this.porridge === PORRIDGE.TOO_COLD; }
  get isPorridgeJustRight() { return this.porridge === PORRIDGE.JUST_RIGHT; }
  get isChairTooBig() { return this.chair === CHAIR.TOO_BIG; }
  get isChairTooSmall() { return this.chair === CHAIR.TOO_SMALL; }
  get isChairJustRight() { return this.chair === CHAIR.JUST_RIGHT; }
  get isBedTooHard() { return this.bed === BED.TOO_HARD; }
  get isBedTooSoft() { return this.bed === BED.TOO_SOFT; }
  get isBedJustRight() { return this.bed === BED.JUST_RIGHT; }
  buildGuards() {
    return {
      isPorridgeTooHot: () => this.isPorridgeTooHot,
      isPorridgeTooCold: () => this.isPorridgeTooCold,
      isPorridgeJustRight: () => this.isPorridgeJustRight,
      isChairTooBig: () => this.isChairTooBig,
      isChairTooSmall: () => this.isChairTooSmall,
      isChairJustRight: () => this.isChairJustRight,
      isBedTooHard: () => this.isBedTooHard,
      isBedTooSoft: () => this.isBedTooSoft,
      isBedJustRight: () => this.isBedJustRight,
    };
  }
}

