# Snake Game

Browser based Snake Game made in Rust/WebAssembly and TS/JS.

### Packing Rust to WASM

Install the `wasm-pack` crate and run the below command to pack the rust to WASM.

```sh
wasm-pack build --target web
```

### Running Development Web Server Locally

To bundle the `TS/JS` with `webpack` (using `webpack-dev-server`) and run the web server locally.

```sh
npm run dev
```