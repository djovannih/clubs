export const sum = <T>(arr: T[], selector?: (v: T) => number): number =>
  arr.reduce((acc, v) => acc + (selector ? selector(v) : (v as number)), 0);

export const average = <T>(arr: T[], selector?: (v: T) => number): number =>
  sum(arr, selector) / Math.max(arr.length, 1);
