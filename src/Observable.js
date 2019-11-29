import { Subscriber } from "./Subscriber";
import { Subscription } from "./Subscription";

export class Observable {
  /**
   * Initialize the observable object with the behaviour.
   * @param {(o: Observer) => (()=>Void)} initFunction 
   */
  constructor(initFunction) {
    this.initFunction = initFunction;
  }

  /**
   * Subscribe an observer and start!
   * @param {Observer} observer 
   * @returns {{unsubscribe: () => Void}}
   */
  subscribe(observer) {
    const subscription = new Subscription();
    const subscriber = new Subscriber(observer, subscription);
    const teardown = this.initFunction(subscriber);
    subscription.add(teardown);
    return subscription;
  }

  /**
   * Apply the operators to the observable object
   * @param  {...operator} operators 
   * @returns {Observable}
   */
  pipe(...operators) {
    return operators.reduce((acc, operator) => operator(acc), this);
  }
}