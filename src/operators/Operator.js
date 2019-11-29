
/**
 * An operator is a function that receive an Observable and retrun another.
 * @returns {(Observable) => Observable}
 */
export default function operator() {
  return (observable) => observable;
}