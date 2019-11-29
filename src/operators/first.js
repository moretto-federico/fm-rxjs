import { Subscription } from "../Subscription";
import { Subscriber } from "../Subscriber";
import { Observer } from "../Observer";

/**
 * Emit the first value.
 * @param {(value: any) => any} func 
 */
export default function first() {
  return (observable) => {
    return {
      subscribe: (observer) => {
        const subscription = new Subscription();
        const subscriber = new Subscriber(Observer.merge(observer, {
          next: (value) => {
            subscription.unsubscribe();
            observer.next(value);
            observer.completed();
          },
        }), subscription);
        subscription.add(observable.subscribe(subscriber));
        return subscription;
      }
    }
  }
}