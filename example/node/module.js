const fs = require('fs');
const path = require('path');

const wasmFile = fs.readFileSync(path.join(__dirname, '..', '..', './dist/module.optimized.wasm'))


const wasm = new WebAssembly.Module(wasmFile, {});

module.exports = new WebAssembly.Instance(wasm, {
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
}).exports;
