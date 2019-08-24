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
    const result = mod.instance.exports.fib(10);
    const $body = document.querySelector('body');
    $body.innerHTML = `<p>fib(10) = ${result}</p>`;
    console.log(result);
  });