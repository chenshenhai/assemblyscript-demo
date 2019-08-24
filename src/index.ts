export function f(num: i32): i32 {
  let result: i32 = 0;
  if (num === 1 || num === 2) {
    result = 1;
  } else {
    result = f(num - 1) + f(num - 2)
  }
  return result;
}