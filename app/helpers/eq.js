import Helper from '@ember/component/helper';

export function eq([a, b]) {
  return a === b;
}

export default Helper.helper(eq);
