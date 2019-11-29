import of from "../../src/creators/of";
import first from "../../src/operators/first";
import last from "../../src/operators/last";

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
  });
});
