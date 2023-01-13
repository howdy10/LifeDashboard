export const forEachFirebase = <T>(list: T[], callbackfn: (value: T) => void): void => {
  Object.keys(list).forEach((value) => callbackfn(list[value]));
};
