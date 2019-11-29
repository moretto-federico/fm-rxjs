import { Observable } from "../Observable";

/**
 * Emit an error
 * @param  {any} error 
 */
export default function throwError(error) {
  return new Observable((observer) => {
    observer.error(error);
  })
}