import Helper from '@ember/component/helper';

export function json([value], { indent = 2 }) {
  return JSON.stringify(value, null, indent);
}

export default Helper.helper(json);
