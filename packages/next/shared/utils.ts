export const implode = (f: (idx: number) => any, arr: any[]) => {
  let l = arr.length;
  while (l > 1) {
    arr.splice(l - 1, 0, f(l));
    l--;
  }
  return arr;
};
