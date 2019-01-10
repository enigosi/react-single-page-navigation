import { DEFAULT_TEST_ELEMENT_HEIGHT } from "./index.test";

/**
 * Return bounding client rect with props used by component
 */
export const getFakeBoundingClientRectResult = (
  index: number,
  scrollPosition: number
) => ({
  height: DEFAULT_TEST_ELEMENT_HEIGHT,
  top: index * DEFAULT_TEST_ELEMENT_HEIGHT - scrollPosition,
  bottom:
    index * DEFAULT_TEST_ELEMENT_HEIGHT -
    scrollPosition +
    DEFAULT_TEST_ELEMENT_HEIGHT
});

/**
 * Get argument of last call from jest.fn
 */
export const getLastCallFirstArg = (mockedFunction: {
  mock: { calls: any[] };
}) => mockedFunction.mock.calls[mockedFunction.mock.calls.length - 1][0];

/**
 * go around 200ms throttle that works based on new Date().getTime()
 */
export const createGetTimeFaker = () => {
  let lastTime = 0;
  (global as any).Date = class {
    public getTime = () => {
      lastTime += 201;
      return lastTime;
    };
  };
};
