import of from "../../src/creators/of";
import first from "../../src/operators/first";
import last from "../../src/operators/last";
import operator from "../../src/operators/operator";
import take from "../../src/operators/take";
import throwError from "../../src/creators/throwError";

describe('operators', () => {
  describe('first', () => {
    it('ok', () => {
      const observer = {
        next: jest.fn(),
        error: jest.fn(),
        completed: jest.fn(),
      };
      of(1, 2, 3).pipe(first()).subscribe(observer);

      expect(observer.next).toHaveBeenCalledTimes(1);
      expect(observer.next).toHaveBeenNthCalledWith(1, 1);
      expect(observer.error).not.toBeCalled();
      expect(observer.completed).toBeCalled();
    });

    it('error', () => {
      const observer = {
        next: jest.fn(),
        error: jest.fn(),
        completed: jest.fn(),
      };
      throwError('err').pipe(first()).subscribe(observer);

      expect(observer.next).not.toBeCalled();
      expect(observer.error).toBeCalledWith('err');
      expect(observer.completed).not.toBeCalled();
    });
  });

  describe('last', () => {
    it('ok', () => {
      const observer = {
        next: jest.fn(),
        error: jest.fn(),
        completed: jest.fn(),
      };
      of(1, 2, 3).pipe(last()).subscribe(observer);

      expect(observer.next).toHaveBeenCalledTimes(1);
      expect(observer.next).toHaveBeenNthCalledWith(1, 3);
      expect(observer.error).not.toBeCalled();
      expect(observer.completed).toBeCalled();
    });

    it('empty', () => {
      const observer = {
        next: jest.fn(),
        error: jest.fn(),
        completed: jest.fn(),
      };
      of().pipe(last()).subscribe(observer);

      expect(observer.next).not.toBeCalled();
      expect(observer.error).not.toBeCalled();
      expect(observer.completed).toBeCalled();
    });
  });

  describe('operator', () => {
    it('ok', () => {
      const observer = {
        next: jest.fn(),
        error: jest.fn(),
        completed: jest.fn(),
      };
      of(1, 2, 3).pipe(operator()).subscribe(observer);

      expect(observer.next).toHaveBeenCalledTimes(3);
      expect(observer.next).toHaveBeenNthCalledWith(1, 1);
      expect(observer.next).toHaveBeenNthCalledWith(2, 2);
      expect(observer.next).toHaveBeenNthCalledWith(3, 3);
      expect(observer.error).not.toBeCalled();
      expect(observer.completed).toBeCalled();
    });

    describe('take', () => {
      it('ok', () => {
        const observer = {
          next: jest.fn(),
          error: jest.fn(),
          completed: jest.fn(),
        };
        of(1, 2, 3).pipe(take(2)).subscribe(observer);

        expect(observer.next).toHaveBeenCalledTimes(2);
        expect(observer.next).toHaveBeenNthCalledWith(1, 1);
        expect(observer.next).toHaveBeenNthCalledWith(2, 2);
        expect(observer.error).not.toBeCalled();
        expect(observer.completed).toBeCalled();
      });
    });
  });
});
