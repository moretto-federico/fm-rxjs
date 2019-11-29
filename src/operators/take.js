import { Subscription } from "../Subscription";
import { Subscriber } from "../Subscriber";
import { Observer } from "../Observer";

/**
 * Emit the first n values.
 * @param {(value: any) => any} func 
 */
export default function take(numberOfValues) {
  return (observable) => {
    let count = 0;
    return {
      subscribe: (observer) => {
        const subscription = new Subscription();
        const subscriber = new Subscriber(Observer.merge(observer, {
          next: (value) => {
            observer.next(value);
            if (count == numberOfValues - 1) {
              subscription.unsubscribe();
              observer.completed();
            }
            count++;
          },
        }), subscription);
        subscription.add(observable.subscribe(subscriber));
        return subscription;
      }
    }
  }
}