export class Subscriber {
  constructor(observable, subscription) {
    this.observer = observable;
    this.closed = false;
    this.subscription = subscription;
    this.subscription.add(() => this.closed = true);
  }

  next(event) {
    if (!this.closed) this.observer.next(event);
  }

  error(error) {
    if (!this.closed) {
      this.closed = true;
      this.observer.error(error);
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