import init, {World} from "snake-game-wasm";

init().then((_) => {
  const world = World.new();
  const canvas = document.getElementById("snake-canvas");
  const ctx = canvas.getContext("2d");
});
