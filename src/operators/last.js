import { Subscription } from "../Subscription";
import { Subscriber } from "../Subscriber";
import { Observer } from "../Observer";

/**
 * Emit the last value.
 * @param {(value: any) => any} func 
 */
export default function last() {
  return (observable) => {
    return {
      subscribe: (observer) => {
        let history = null;
        return observable.subscribe(Observer.merge(observer, {
          completed: () => {
            if (history) observer.next(history.value);
            observer.completed();
          },
          next: (value) => {
            history = { value };
          },
        }));
      }
    }
  }
}