const mod = require('./module');

const start = Date.now();
mod.fib(40)
console.log(`nodejs-wasm cost: ${Date.now() - start}`)



function pureFib(num) {
  if (num === 1 || num === 2) {
    return 1;
  } else {
    return pureFib(num - 1) + pureFib(num - 2)
  }
}
const startPure = Date.now()
pureFib(40);
console.log(`nodejs-js cost: ${Date.now() - startPure}`)