import { Subscription } from "../Subscription";
import { Subscriber } from "../Subscriber";

/**
 * Emit the first n values.
 * @param {(value: any) => any} func 
 */
export default function take(numberOfValues) {
  return (observable) => {
    return {
      subscribe: (obs) => {
        const subscription = new Subscription();
        const subscriber = new Subscriber({
          ...obs,
          next: (value) => {
            subscription.unsubscribe();
            obs.next(value);
            obs.completed();
          },
        }, subscription);
        subscription.add(observable.subscribe(subscriber));
        return subscription;
      }
    }
  }
}