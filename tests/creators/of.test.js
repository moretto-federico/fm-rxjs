import of from "../../src/creators/of";

describe('of', () => {
  it('not emit anything', () => {
    const observer = {
      next: jest.fn(),
      error: jest.fn(),
      completed: jest.fn(),
    };
    of().subscribe(observer);

    expect(observer.next).not.toBeCalled();
    expect(observer.error).not.toBeCalled();
    expect(observer.completed).toBeCalled();
  });

  it('emit one value', () => {
    const observer = {
      next: jest.fn(),
      error: jest.fn(),
      completed: jest.fn(),
    };
    of(1).subscribe(observer);

    expect(observer.next).toBeCalledWith(1);
    expect(observer.error).not.toBeCalled();
    expect(observer.completed).toBeCalled();
  });

  it('emit more values', () => {
    const observer = {
      next: jest.fn(),
      error: jest.fn(),
      completed: jest.fn(),
    };
    of(1, 2, 3).subscribe(observer);

    expect(observer.next).toHaveBeenNthCalledWith(1, 1);
    expect(observer.next).toHaveBeenNthCalledWith(2, 2);
    expect(observer.next).toHaveBeenNthCalledWith(3, 3);
    expect(observer.error).not.toBeCalled();
    expect(observer.completed).toBeCalled();
  });
});
