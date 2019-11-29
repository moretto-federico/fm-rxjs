import { Observable } from "../Observable";
import { Subscription } from "../Subscription";
import { Observer } from "../Observer";

class MergeObservable extends Observable {
  constructor(observables) {
    super();
    this.observables = observables;
  }

  subscribe(observer) {
    const subscription = new Subscription();
    this.observables.forEach(observable => {
      const s = observable.subscribe(Observer.merge(observer, {
        error: (err) => {
          subscription.unsubscribe();
          observer.error(err);
        },
        completed: () => {
          subscription.unsubscribe();
          observer.completed();
        },
      }));
      subscription.add(s.unsubscribe);
    });
    return subscription;
  }
}

/**
 * Emit a values for each value emetted by the observables
 * @param  {...Observable} observables 
 */
export default function merge(...observables) {
  return new MergeObservable(observables);
}