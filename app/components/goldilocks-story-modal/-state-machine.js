import { Machine, assign } from 'xstate';

export const PORRIDGE = Object.freeze({
  UNSELECTED: 'unselected',
  TOO_HOT: 'too-hot',
  TOO_COLD: 'too-cold',
  JUST_RIGHT: 'just-right',
});

export const CHAIR = Object.freeze({
  UNSELECTED: 'unselected',
  TOO_BIG: 'too-big',
  TOO_SMALL: 'too-small',
  JUST_RIGHT: 'just-right',
});

export const BED = Object.freeze({
  UNSELECTED: 'unselected',
  TOO_HARD: 'too-hard',
  TOO_SOFT: 'too-soft',
  JUST_RIGHT: 'just-right',
});

export function createGoldilocksMachine() {
  return Machine({
    id: 'goldilocks',
    initial: 'cover',
    context: {
      porridge: PORRIDGE.UNSELECTED,
      chair: CHAIR.UNSELECTED,
      bed: BED.UNSELECTED,
    },
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
            { target: 'porridge-too-hot', cond: 'isPorridgeTooHot' },
            { target: 'porridge-too-cold', cond: 'isPorridgeTooCold' },
            { target: 'living-room', cond: 'isPorridgeJustRight' },
          ],
          EAT: { target: 'kitchen', actions: ['eatPorridge'] },
        },
      },
      'porridge-too-hot': {
        on: {
          PREV: 'kitchen',
          NEXT: 'kitchen',
        },
      },
      'porridge-too-cold': {
        on: {
          PREV: 'kitchen',
          NEXT: 'kitchen',
        },
      },
      'living-room': {
        on: {
          PREV: 'kitchen',
          NEXT: [
            { target: 'chair-too-big', cond: 'isChairTooBig' },
            { target: 'chair-too-small', cond: 'isChairTooSmall' },
            { target: 'bedroom', cond: 'isChairJustRight' },
          ],
          SIT: { target: 'living-room', actions: ['sitInChair'] },
        },
      },
      'chair-too-big': {
        on: {
          PREV: 'living-room',
          NEXT: 'living-room',
        },
      },
      'chair-too-small': {
        on: {
          PREV: 'living-room',
          NEXT: 'living-room',
        },
      },
      bedroom: {
        on: {
          PREV: 'living-room',
          NEXT: [
            { target: 'bed-too-hard', cond: 'isBedTooHard' },
            { target: 'bed-too-soft', cond: 'isBedTooSoft' },
            { target: 'wake-up', cond: 'isBedJustRight' },
          ],
          SLEEP: { target: 'bedroom', actions: ['sleepInBed'] },
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
  },
  {
    actions: {
      eatPorridge: assign((_, { value }) => ({ porridge: value })),
      sitInChair: assign((_, { value }) => ({ chair: value })),
      sleepInBed: assign((_, { value }) => ({ bed: value })),
    },
    guards: {
      isPorridgeTooHot: (ctx) => ctx.porridge === PORRIDGE.TOO_HOT,
      isPorridgeTooCold: (ctx) => ctx.porridge === PORRIDGE.TOO_COLD,
      isPorridgeJustRight: (ctx) => ctx.porridge === PORRIDGE.JUST_RIGHT,
      isChairTooBig: (ctx) => ctx.chair === CHAIR.TOO_BIG,
      isChairTooSmall: (ctx) => ctx.chair === CHAIR.TOO_SMALL,
      isChairJustRight: (ctx) => ctx.chair === CHAIR.JUST_RIGHT,
      isBedTooHard: (ctx) => ctx.bed === BED.TOO_HARD,
      isBedTooSoft: (ctx) => ctx.bed === BED.TOO_SOFT,
      isBedJustRight: (ctx) => ctx.bed === BED.JUST_RIGHT,
    },
  });
}
