export class Subscription {
  constructor() {
    this.teardowns = [];
  }

  add(teardown) {
    this.teardowns.push(teardown);
  }

  unsubscribe() {
    this.teardowns.forEach((teardown) => teardown());
  }
}