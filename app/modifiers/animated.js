import Modifier from 'ember-modifier';

export default class AnimatedModifier extends Modifier {

  currentClasses = new Set();

  async runAnimation(name) {
    let animationClass = this.args.named[name];
    if (!animationClass) { return; }
    await new Promise(resolve => {
      let animationEnd = () => {
        this.element.classList.remove(animationClass);
        this.element.removeEventListener('animationend', animationEnd);
        resolve();
      }
      this.element.classList.add(animationClass);
      this.element.addEventListener('animationend', animationEnd);
    });
  }

  didInstall() {
    this.element.animations = Object.freeze({
      run: (name) => this.runAnimation(name),
      has: (name) => !!this.args.named[name],
    });
  }

  didReceiveArguments() {
    this.element.classList.remove(...this.currentClasses);
    this.currentClasses = new Set([
      'animated',
      ...this.currentClasses,
      ...this.args.positional
    ]);
    this.element.classList.add(...this.currentClasses);
  }

  willRemove() {
    this.element.classList.remove(...this.currentClasses);
  }

}
