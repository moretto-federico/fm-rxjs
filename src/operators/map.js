
/**
 * Call func for each value emitted.
 * @param {(value: any) => any} func 
 */
export default function map(func) {
  return (observable) => {
    return {
      subscribe: (obs) => {
        const observer = {
          ...obs,
          next: (value) => obs.next(func(value)),
        }
        return observable.subscribe(observer);
      }
    }
  }
}