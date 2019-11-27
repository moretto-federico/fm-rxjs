import { Observable } from '../src/Observable';
import { EventEmitter } from './EventEmitter';

describe('Development tests', () => {
  describe('Observable', () => {
    it('observer receives next and completed', () => {
      const observer = {
        next: jest.fn(),
        error: jest.fn(),
        completed: jest.fn(),
      }
      const emitter = new EventEmitter();
      const observable = new Observable((o) => emitter.add(o));

      expect(observer.next).not.toBeCalled();
      expect(observer.error).not.toBeCalled();
      expect(observer.completed).not.toBeCalled(); // not called before subscription

      observable.subscribe(observer);

      expect(observer.next).not.toBeCalled();
      expect(observer.error).not.toBeCalled();
      expect(observer.completed).not.toBeCalled(); // not called before an event

      emitter.emit('event1');

      expect(observer.error).not.toBeCalled();
      expect(observer.next).toBeCalledWith('event1');
      expect(observer.completed).not.toBeCalled();

      emitter.emit('event2');

      expect(observer.error).not.toBeCalled();
      expect(observer.next).toBeCalledWith('event2');
      expect(observer.completed).not.toBeCalled();

      emitter.close();

      expect(observer.error).not.toBeCalled();
      expect(observer.next).toBeCalled();
      expect(observer.completed).toBeCalled();
    });

    it('observer doesnt receive next, completed after unsubscribe', () => {
      const observer = {
        next: jest.fn(),
        error: jest.fn(),
        completed: jest.fn(),
      }
      const emitter = new EventEmitter();
      const observable = new Observable((o) => emitter.add(o));
      const subscriber = observable.subscribe(observer);

      subscriber.unsubscribe();

      expect(observer.next).not.toBeCalled();
      expect(observer.error).not.toBeCalled();
      expect(observer.completed).not.toBeCalled();

      emitter.emit('event1');

      expect(observer.next).not.toBeCalled();
      expect(observer.error).not.toBeCalled();
      expect(observer.completed).not.toBeCalled();
    });

    it('observer doesnt receive next after completed', () => {
      const observer = {
        next: jest.fn(),
        error: jest.fn(),
        completed: jest.fn(),
      }
      const emitter = new EventEmitter();
      const observable = new Observable((o) => emitter.add(o));
      observable.subscribe(observer);

      emitter.close();
      emitter.emit('event1');

      expect(observer.next).not.toBeCalled();
      expect(observer.error).not.toBeCalled();
      expect(observer.completed).toBeCalled();
    });

    it('observer doesnt receive next after error', () => {
      const observer = {
        next: jest.fn(),
        error: jest.fn(),
        completed: jest.fn(),
      }
      const emitter = new EventEmitter();
      const observable = new Observable((o) => emitter.add(o));
      observable.subscribe(observer);

      emitter.error('erro1');
      emitter.emit('event1');

      expect(observer.next).not.toBeCalled();
      expect(observer.error).toBeCalled();
      expect(observer.completed).not.toBeCalled();
    });
  });
});
