import merge from "../../src/creators/merge";
import { Observable } from "../../src/Observable";
import { EventEmitter } from "../EventEmitter";


describe('merge', () => {
  it('1 observable', () => {
    const observer = {
      next: jest.fn(),
      error: jest.fn(),
      completed: jest.fn(),
    };
    const emitter = new EventEmitter();
    const observable = new Observable((o) => emitter.add(o));

    const merged = merge(observable);
    merged.subscribe(observer);

    emitter.emit('1');
    expect(observer.next).toBeCalledWith('1');
    expect(observer.error).not.toBeCalled();
    expect(observer.completed).not.toBeCalled();

    emitter.error('err');
    expect(observer.next).toBeCalledWith('1');
    expect(observer.error).toBeCalledWith('err');
    expect(observer.completed).not.toBeCalled();
  });

  it('2 observable', () => {
    const observer = {
      next: jest.fn(),
      error: jest.fn(),
      completed: jest.fn(),
    };
    const emitter1 = new EventEmitter();
    const emitter2 = new EventEmitter();

    const merged = merge(
      new Observable((o) => emitter1.add(o)),
      new Observable((o) => emitter2.add(o))
    );
    merged.subscribe(observer);

    emitter1.emit('1');
    expect(observer.next).toHaveBeenNthCalledWith(1, '1');
    expect(observer.error).not.toBeCalled();
    expect(observer.completed).not.toBeCalled();

    emitter1.emit('2');
    expect(observer.next).toHaveBeenNthCalledWith(2, '2');
    expect(observer.error).not.toBeCalled();
    expect(observer.completed).not.toBeCalled();

    emitter2.emit('3');
    expect(observer.next).toHaveBeenNthCalledWith(3, '3');
    expect(observer.error).not.toBeCalled();
    expect(observer.completed).not.toBeCalled();

    emitter1.close();
    expect(observer.error).not.toBeCalled();
    expect(observer.completed).toBeCalled();

    emitter2.emit('4');
    expect(observer.next).toHaveBeenCalledTimes(3);
  });

  it('2 observable, unsubscribe', () => {
    const observer = {
      next: jest.fn(),
      error: jest.fn(),
      completed: jest.fn(),
    };
    const emitter1 = new EventEmitter();
    const emitter2 = new EventEmitter();

    const merged = merge(
      new Observable((o) => emitter1.add(o)),
      new Observable((o) => emitter2.add(o))
    );
    const subscription = merged.subscribe(observer);

    emitter1.emit('1');
    expect(observer.next).toHaveBeenNthCalledWith(1, '1');
    expect(observer.error).not.toBeCalled();
    expect(observer.completed).not.toBeCalled();

    subscription.unsubscribe();
    expect(observer.next).toHaveBeenCalledTimes(1);
    expect(observer.error).not.toBeCalled();
    expect(observer.completed).not.toBeCalled();

    emitter2.emit('2');
    expect(observer.next).toHaveBeenCalledTimes(1);
    expect(observer.error).not.toBeCalled();
    expect(observer.completed).not.toBeCalled();

    emitter1.emit('3');
    expect(observer.next).toHaveBeenCalledTimes(1);
    expect(observer.error).not.toBeCalled();
    expect(observer.completed).not.toBeCalled();
  });
});