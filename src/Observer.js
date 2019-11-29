export class Observer {
  /**
   * @abstract
   * {(value: any) => Void}
   */
  next() { };

  /**
   * @abstract
   * {(value: any) => Void}
   */
  error() { };

  /**
   * @abstract
   * {() => Void}
   */
  completed() { };

  static merge(observer, obj) {
    return {
      next: (value) => obj.next ? obj.next(value) : observer.next(value),
      error: (err) => obj.error ? obj.error(err) : observer.error(err),
      completed: () => obj.completed ? obj.completed() : observer.completed(),
    }
  }
}