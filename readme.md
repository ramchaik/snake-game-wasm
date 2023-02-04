# Snake Game

Browser based Snake Game made in Rust/WebAssembly and TS/JS.

### Packing Rust to WASM

Install the `wasm-pack` crate 
```sh
cargo install wasm-pack
```

run the below command to pack the rust to WASM.
```sh
npm run pack:wasm
```

### Running Development Web Server Locally

To bundle the `TS/JS` with `webpack` (using `webpack-dev-server`) and run the web server locally.

```sh
npm run dev
```