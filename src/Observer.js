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
}