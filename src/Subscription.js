/**
 * Handle an array of teardown functions and call them on unsubscribe.
 */
export class Subscription {
  constructor() {
    this.teardowns = [];
  }

  /**
   * @param {() => Void} teardown 
   */
  add(teardown) {
    this.teardowns.push(teardown);
  }

  unsubscribe = () => {
    this.teardowns.forEach((teardown) => teardown());
  }
}