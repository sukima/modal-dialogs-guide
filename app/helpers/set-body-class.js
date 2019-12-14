import Helper from '@ember/component/helper';
import { isBlank } from '@ember/utils';

export default class SetBodyClassHelper extends Helper {

  currentClassNames = new Set();

  compute([...bodyClasses]) {
    this.clearCurrentClassNames();
    this.currentClassNames = new Set(bodyClasses);
    this.populateCurrentClassNames();
  }

  willDestroy() {
    super.willDestroy(...arguments);
    this.clearCurrentClassNames();
  }

  clearCurrentClassNames() {
    for (let className of this.currentClassNames) {
      if (isBlank(className)) { continue; }
      document.body.classList.remove(className);
    }
  }

  populateCurrentClassNames() {
    for (let className of this.currentClassNames) {
      if (isBlank(className)) { continue; }
      document.body.classList.add(className);
    }
  }

}
