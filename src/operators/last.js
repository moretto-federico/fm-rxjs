import { Subscription } from "../Subscription";
import { Subscriber } from "../Subscriber";

/**
 * Emit the last value.
 * @param {(value: any) => any} func 
 */
export default function last() {
  return (observable) => {
    return {
      subscribe: (obs) => {
        let history = null;
        const subscriber = {
          ...obs,
          completed: () => {
            if (history) obs.next(history.value);
            obs.completed();
          },
          next: (value) => {
            history = { value };
          },
        };
        return observable.subscribe(subscriber);
      }
    }
  }
}