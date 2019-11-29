import { Observable } from "../Observable";

/**
 * Emit values one right after another
 * @param  {...any} values 
 */
export default function of(...values) {
  return new Observable((observer) => {
    values.forEach((value) => observer.next(value));
    observer.completed();
  })
}