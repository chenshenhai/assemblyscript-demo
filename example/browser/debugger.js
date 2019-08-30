const $body = document.querySelector('body');

WebAssembly.instantiateStreaming(fetch('/dist/module.untouched.wasm'), {
  env: {
    memoryBase: 0,
    tableBase: 0,
    memory: new WebAssembly.Memory({
      initial: 256,
      maximum: 512,
    }),
    table: new WebAssembly.Table({
      initial: 0,
      maximum: 0,
      element: 'anyfunc',
    }),
    abort: console.log,
  },
}).then(mod => {
  const start = Date.now();
  mod.instance.exports.fib(40);
  const logWasm = `browser-wasm time consume: ${Date.now() - start} ms`;
  $body.innerHTML =  $body.innerHTML + `<p>${logWasm}</p>`

  console.log(logWasm)
});
