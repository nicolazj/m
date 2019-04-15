export const implode = (f: (idx: number) => any, arr: any[]) => {
  let l = arr.length;
  while (l > 1) {
    arr.splice(l - 1, 0, f(l));
    l--;
  }
  return arr;
};

export function fmtMSS(n: number) {
  let s = Math.floor(n) || 0;
  return (s - (s %= 60)) / 60 + (9 < s ? ':' : ':0') + s;
}
