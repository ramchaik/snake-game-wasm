
async function init() {
    const response = await fetch("sum.wasm");
    const buffer = await response.arrayBuffer();
    const wasm = await WebAssembly.instantiate(buffer);
    const {sum} = wasm.instance.exports;
    const result = sum(100, 200);
    console.log(result);
}

init();
