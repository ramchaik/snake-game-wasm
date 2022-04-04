import init, {greet} from "snake-game-wasm";

init().then((_) => {
    greet("Vaibhav");
    console.log("OK");
});
