use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub fn greet(name: &str) {
    alert(name);
}

// Import function to WASM
#[wasm_bindgen]
extern {
    pub fn alert(s: &str);
}

// Packing to wasm
// wasm-pack build --target web
