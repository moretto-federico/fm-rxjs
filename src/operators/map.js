import { Observer } from "../Observer"

/**
 * Call func for each value emitted.
 * @param {(value: any) => any} func 
 */
export default function map(func) {
  return (observable) => {
    return {
      subscribe: (observer) => {
        return observable.subscribe(Observer.merge(observer, {
          next: (value) => observer.next(func(value)),
        }));
      }
    }
  }
}