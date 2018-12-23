export function mapValues<
  T extends {
    [key: string]: any;
  },
  R
>(callback: (ddd: any) => R, obj: T): { [B in keyof T]: R } {
  const mappedObject: { [B in keyof T]?: R } = {};
  for (const key of Object.keys(obj)) {
    mappedObject[key] = callback(obj[key]);
  }

  return mappedObject as { [B in keyof T]: R };
}

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

export function throttle(delay: number, fn: (...args: any[]) => any) {
  let lastCall = 0;
  return (...args: any[]) => {
    const now = new Date().getTime();
    if (now - lastCall < delay) {
      return;
    }
    lastCall = now;
    return fn(...args);
  };
}
