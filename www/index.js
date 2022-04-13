import init, {World} from "snake-game-wasm";

init().then((_) => {
  const world = World.new();
  console.log(world.width)
});
