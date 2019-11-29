
export class EventEmitter {
  add(observer) {
    this.observer = observer;
    return () => { };
  }

  emit(event) {
    if (this.observer) this.observer.next(event);
  }

  error(error) {
    if (this.observer) this.observer.error(error);
  }

  close() {
    if (this.observer) this.observer.completed();
  }
}