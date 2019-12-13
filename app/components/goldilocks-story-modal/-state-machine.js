import { Machine } from 'xstate';

export function createGoldilocksMachine() {
  return Machine({
    id: 'goldilocks',
    initial: 'cover',
    context: {
      porridge: '',
      chair: '',
      bed: '',
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
    actions: {},
    guards: {},
  });
}
