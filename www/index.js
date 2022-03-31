/*
------------
    WAT
------------

(module
    (import "console" "log" (func $log))
    (import "console" "error" (func $error))
    (memory $mem 1)
    (data (i32.const 0) "Hi")
    (func $sum (param $x i32) (param $y i32) (result i32)
        call $log
        call $error
        local.get $x
        local.get $y
        i32.add
    )
    (export "mem" (memory $mem))
    (export "sum" (func $sum))
)
*/
async function init() {
    const importObject = {
        console: {
            log: () => {
                console.log('Just logging something!');
            },
            error: () => {
                console.log('This is a Error!');
            },
        }
    };

    const response = await fetch("sum.wasm");
    const buffer = await response.arrayBuffer();
    const wasm = await WebAssembly.instantiate(buffer, importObject);

    const {sum, mem} = wasm.instance.exports;

    const uint8Array = new Uint8Array(mem.buffer, 0, 2);
    const text = new TextDecoder("utf-8").decode(uint8Array);
    const result = sum(100, 200);

    console.log('sum: ', result);
    console.log('text: ', text);
}

init();
