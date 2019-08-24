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
    console.log(mod.instance.exports.fib(10));
  });