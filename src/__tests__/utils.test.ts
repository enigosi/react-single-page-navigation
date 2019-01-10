import { findKey, getComponentBounds, mapValues, throttle } from "../utils";

describe("mapValues", () => {
  const input = { a: 1, b: 2 };
  const testCases = [
    ["Handle empty object", {}, (a: number) => a, {}],
    ["Return same value", input, (a: number) => a, { ...input }],
    ["Stringify values", input, (a: number) => `${a}`, { a: "1", b: "2" }],
    ["Double values", input, (a: number) => a * 2, { a: 2, b: 4 }]
  ];

  test.each(testCases)("%s", (_, inputObject, iteratee, resultObject) => {
    expect(mapValues(iteratee, inputObject)).toEqual(resultObject);
  });
});

describe("findKey", () => {
  const testCases = [
    ["Handle empty object", {}, true, undefined],
    ["Handle object without match", { a: 1, b: 2 }, 3, undefined],
    ["Find number", { a: 1, c: "2", b: 2 }, 2, "b"],
    ["Find string", { a: "1", c: 1, b: "2" }, "1", "a"]
  ];

  test.each(testCases)("%s", (_, inputObject, searched, result) => {
    expect(findKey(searched, inputObject)).toEqual(result);
  });
});

describe("getComponentBounds", () => {
  const WINDOW_HEIGHT = 1000;
  const COMPONENT_HEIGHT = 500;

  const getClientRectInput = (position: number) => ({
    height: COMPONENT_HEIGHT,
    top: position,
    bottom: position + COMPONENT_HEIGHT
  });

  const testCases = [];

  testCases.push([
    "Should correctly get bound if component is above the screen",
    getClientRectInput(-501),
    { top: -1, bottom: -1 }
  ]);

  testCases.push([
    "Should correctly get bound if component is beneath the screen",
    getClientRectInput(1001),
    { top: -1, bottom: -1 }
  ]);

  testCases.push([
    "Should correctly get bound if component is whole in the screen",
    getClientRectInput(200),
    { top: 200, bottom: 700 }
  ]);

  testCases.push([
    "Should correctly get bound if component is partially above the screen",
    getClientRectInput(-250),
    { top: 0, bottom: 250 }
  ]);

  testCases.push([
    "Should correctly get bound if component is partially beneath the screen",
    getClientRectInput(750),
    { top: 750, bottom: 1000 }
  ]);

  test.each(testCases)("%s", (_, inputObject, result) => {
    expect(getComponentBounds(WINDOW_HEIGHT)(inputObject)).toEqual(result);
  });
});

describe("throttle", () => {
  test("throttled function should fire correctly", () => {
    const spy = jest.fn();
    const throttled = throttle(1, spy);
    throttled(1);
    expect(spy).toBeCalledWith(1);
  });

  test("should throttle function calls correctly", done => {
    const spy = jest.fn();
    const throttled = throttle(4, spy);

    throttled();
    throttled();
    throttled();

    expect(spy.mock.calls.length).toBe(1);
    setTimeout(() => {
      // should still be 1
      expect(spy.mock.calls.length).toBe(1);
    }, 0);
    setTimeout(() => {
      // trailing call should already happen
      expect(spy.mock.calls.length).toBe(2);
      throttled();
      expect(spy.mock.calls.length).toBe(3);
      done();
    }, 6);
  });
});
