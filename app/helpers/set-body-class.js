import Helper from '@ember/component/helper';

const classNameCounts = new Map();

function updateClassNameCounts(classNames = [], step = 1) {
  for (let className of classNames) {
    let count = classNameCounts.get(className) || 0;
    classNameCounts.set(className, count + step);
  }
}

function syncBodyClasses() {
  document.querySelector('body').classList.remove(...classNameCounts.keys());
  for (let [className, count] of classNameCounts) {
    if (count <= 0) {
      classNameCounts.delete(className);
    }
  }
  document.querySelector('body').classList.add(...classNameCounts.keys());
}

export default Helper.extend({

  compute(classNames) {
    updateClassNameCounts(this._classNames, -1);
    this._classNames = new Set(classNames);
    updateClassNameCounts(this._classNames, 1);
    syncBodyClasses();
  },

  willDestroy() {
    this._super(...arguments);
    updateClassNameCounts(this._classNames, -1);
    syncBodyClasses();
  },

});
