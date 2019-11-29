import { Observable } from "../Observable";
import { Subscription } from "../Subscription";

class MergeObservable extends Observable {
  constructor(observables) {
    super(() => { });
    this.observables = observables;
  }

  subscribe(observer) {
    const subscription = new Subscription();
    this.observables.forEach(observable => {
      const s = observable.subscribe({
        next: (value) => observer.next(value),
        error: (err) => {
          subscription.unsubscribe();
          observer.error(err);
        },
        completed: () => {
          subscription.unsubscribe();
          observer.completed();
        },
      });
      subscription.add(s.unsubscribe.bind(s));
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