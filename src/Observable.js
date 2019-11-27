import { Subscriber } from "./Subscriber";
import { Subscription } from "./Subscription";

export class Observable {
  constructor(initFunction) {
    this.initFunction = initFunction;
  }

  subscribe(observer) {
    const subscription = new Subscription();
    const subscriber = new Subscriber(observer, subscription);
    const teardown = this.initFunction(subscriber);
    subscription.add(teardown);
    return subscription;
  }
}