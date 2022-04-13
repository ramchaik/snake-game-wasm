use wasm_bindgen::prelude::*;
use wee_alloc::WeeAlloc; 

#[global_allocator]
static ALLOC: WeeAlloc = WeeAlloc::INIT;

#[wasm_bindgen]
pub struct World {
    width: usize
}

#[wasm_bindgen]
impl World {
   pub fn new() -> World {
       World {
           width: 8
       }
   } 

   pub fn width(&self) -> usize {
       self.width
   }
}

impl Default for World {
   fn default() -> Self {
       Self::new()
   } 
}

// Packing to wasm
// wasm-pack build --target web
