import of from "../../src/creators/of";
import map from "../../src/operators/map";

describe('map', () => {
  it('map x 2', () => {
    const observer = {
      next: jest.fn(),
      error: jest.fn(),
      completed: jest.fn(),
    };
    of(1, 2, 3).pipe(map(v => 2 * v)).subscribe(observer);

    expect(observer.next).toHaveBeenNthCalledWith(1, 2);
    expect(observer.next).toHaveBeenNthCalledWith(2, 4);
    expect(observer.next).toHaveBeenNthCalledWith(3, 6);
    expect(observer.error).not.toBeCalled();
    expect(observer.completed).toBeCalled();
  });
});
