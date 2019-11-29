import { Subscription } from "./Subscription";
import { Observer } from "./Observer";

/**
 * Observer proxy.
 * Handle the close state.
 */
export class Subscriber extends Observer {
  /**
   * @param {Observer} observer 
   * @param {Subscription} subscription 
   */
  constructor(observer, subscription) {
    super();
    this.observer = observer;
    this.closed = false;
    this.subscription = subscription;
    this.subscription.add(() => this.closed = true);
  }

  next(value) {
    if (!this.closed) this.observer.next(value);
  }

  error(value) {
    if (!this.closed) {
      this.closed = true;
      this.observer.error(value);
      this.subscription.unsubscribe();
    }
  }

  completed() {
    if (!this.closed) {
      this.closed = true;
      this.observer.completed();
      this.subscription.unsubscribe();
    }
  }
}