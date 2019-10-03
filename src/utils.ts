/**
 * lodash-like mapValues function
 * Returns new object with same keys
 * and each value equal to result of running it through provided callback
 */
export function mapValues<
  T extends {
    [key: string]: any;
  },
  R
>(callback: (originalValue: any) => R, obj: T): { [B in keyof T]: R } {
  const mappedObject: { [B in keyof T]?: R } = {};
  for (const key of Object.keys(obj)) {
    mappedObject[key] = callback(obj[key]);
  }

  return mappedObject as { [B in keyof T]: R };
}

/**
 * lodash-like mapValues function
 * Returns key of value matching search input
 */
export function findKey<
  T extends {
    [key: string]: any;
  },
  K extends keyof T
>(value: any, obj: T): K | undefined {
  for (const key of Object.keys(obj)) {
    if (obj[key] === value) {
      return key as K;
    }
  }
}

/**
 * Just a throttle function
 */
export function throttle(delay: number, fn: (...args: any[]) => any) {
  let lastCall = 0;
  let timeout: null | number = null;
  return (...args: any[]) => {
    const now = new Date().getTime();

    if (now - lastCall < delay) {
      if (timeout) {
        clearTimeout(timeout as any);
      }

      timeout = setTimeout(() => {
        lastCall = now;
        fn(...args);
      }, delay) as any;
      return;
    }
    lastCall = now;
    return fn(...args);
  };
}

/**
 * Helper for calculating top and bottom position of element within the screen
 * based on result of getBoundingClientRect
 */
export const getComponentBounds = (windowHeight: number) => (rect: DOMRect) => {
  // ELEMENT PRE TOP SCREEN EDGE
  // when top of the element is below top of the screen and above bottom of the screen
  if (rect.top >= 0 && rect.top <= windowHeight) {
    return {
      top: rect.top,
      // bottom equals bottom of the element or bottom of the screen
      bottom: Math.min(rect.bottom, windowHeight)
    };
  }
  // ELEMENT PAST TOP SCREEN EDGE
  // when top of element is above top screen edge but bottom of the element is still inside
  if (rect.top <= 0 && rect.top + rect.height >= 0) {
    return {
      top: 0,
      bottom: Math.min(rect.top + rect.height, windowHeight)
    };
  }
  // outside of the screen
  return { top: -1, bottom: -1 };
};
