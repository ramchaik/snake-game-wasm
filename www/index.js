import init, {greet} from "snake-game-wasm";

init().then((_) => {
  // _ -> wasm instance (1st param) 
  // can't directly call the function on wasm instance need glue code
  // wasm can't understand string i/p i.e why we require glue code
  // exported greet function is the glue code use that  
  // _.greet("won't work");
  greet("Vaibhav");
});
