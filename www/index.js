import init, {World} from "snake-game-wasm";

init().then((_) => {
  const CELL_SIZE = 20;
  const world = World.new();
  const canvas = document.getElementById("snake-canvas");
  const worldWidth = world.width();
  const ctx = canvas.getContext("2d");

  canvas.height = worldWidth * CELL_SIZE;
  canvas.width = worldWidth * CELL_SIZE;

  function drawWorld() {
    ctx.beginPath();
    for (let x = 0; x <= worldWidth; ++x) {
      ctx.moveTo(x * CELL_SIZE, 0);
      ctx.lineTo(x * CELL_SIZE, worldWidth * CELL_SIZE);
    }
    for (let y = 0; y <= worldWidth; ++y) {
      ctx.moveTo(0 ,y * CELL_SIZE);
      ctx.lineTo(worldWidth * CELL_SIZE, y * CELL_SIZE);
    }
    ctx.stroke();
  }
  drawWorld();
});
