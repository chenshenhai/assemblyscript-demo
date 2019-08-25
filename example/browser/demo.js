const $body = document.querySelector('body');

fetch('/dist/module.optimized.wasm')
  .then(res => res.arrayBuffer())
  .then((wasm) => {
    return new WebAssembly.instantiate(wasm, {
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
    })
  }).then(mod => {

    const start = Date.now();
    mod.instance.exports.fib(40);
    const logWasm = `browser-wasm time consume: ${Date.now() - start} ms`;
    $body.innerHTML =  $body.innerHTML + `<p>${logWasm}</p>`

    console.log(logWasm)
  });


  function pureFib(num) {
    if (num === 1 || num === 2) {
      return 1;
    } else {
      return pureFib(num - 1) + pureFib(num - 2)
    }
  }
  const startPure = Date.now()
  pureFib(40);
  const logPure = `browser-js time consume: ${Date.now() - startPure} ms`;
  $body.innerHTML =  $body.innerHTML + `<p>${logPure}</p>`
  console.log(logPure);