use wasm_bindgen::prelude::*;
use wee_alloc::WeeAlloc; 

#[global_allocator]
static ALLOC: WeeAlloc = WeeAlloc::INIT;

#[wasm_bindgen]
pub struct World {
    pub width: usize
}

#[wasm_bindgen]
impl World {
   pub fn new() -> World {
       World {
           width: 8
       }
   } 
}

impl Default for World {
   fn default() -> Self {
       Self::new()
   } 
}

// Packing to wasm
// wasm-pack build --target web
