import init, {World} from "snake-game-wasm";

init().then((_) => {
  const CELL_SIZE = 20;
  const WORLD_WIDTH = 8;
  const snakeSpawnIdx = Date.now() % (WORLD_WIDTH * WORLD_WIDTH);
  
  const world = World.new(WORLD_WIDTH, snakeSpawnIdx);
  const canvas = <HTMLCanvasElement> document.getElementById("snake-canvas");
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
      ctx.moveTo(0, y * CELL_SIZE);
      ctx.lineTo(worldWidth * CELL_SIZE, y * CELL_SIZE);
    }
    ctx.stroke();
  }
  
  function drawSnake() {
    const snakeIdx = world.snake_head_idx();
    
    const col = snakeIdx % worldWidth;
    const row = Math.floor(snakeIdx / worldWidth);
    
    ctx.beginPath();
    ctx.fillRect(
      col * CELL_SIZE,
      row * CELL_SIZE,
      CELL_SIZE,
      CELL_SIZE,
    );
    ctx.stroke();
  }
  
  function paint() {
    drawWorld();
    drawSnake();
  }

  function update() {
    const fps = 10;
    setTimeout(() => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      world.update();
      paint();
      // callback invoked before the next repaint 
      requestAnimationFrame(update)
    }, 1000 / fps);
  }
  
  paint();
  update();
});
