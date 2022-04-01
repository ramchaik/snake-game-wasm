/*
------------
    WAT
------------
Memory:
    1. Memory can either be created in WebAssembly and exported to JS.
    2. Or it can be created in JS and is passed to WebAssembly.

Eg of 1:
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

NOTES:
    (memory $mem 1)
    1 -> 1 page of memory, page has around 64kb

Eg of 2:

(module
    (import "console" "log" (func $log))
    (import "console" "error" (func $error))
    (memory (import "js" "mem") 1)
    (data (i32.const 0) "Hi")
    (func $sum (param $x i32) (param $y i32) (result i32)
        call $log
        call $error
        local.get $x
        local.get $y
        i32.add
    )
    (export "sum" (func $sum))
)

*/
async function init() {
    const memory = new WebAssembly.Memory({ initial: 1 });
    const importObject = {
        js: {
            mem: memory,
        },
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

    const uint8Array = new Uint8Array(memory.buffer, 0, 2);
    const text = new TextDecoder("utf-8").decode(uint8Array);

    console.log('text: ', text);
}

init();
