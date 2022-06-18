use wasm_bindgen::prelude::*;
use wee_alloc::WeeAlloc;

#[global_allocator]
static ALLOC: WeeAlloc = WeeAlloc::INIT;

#[derive(PartialEq)]
enum Direction {
    Left,
    Right,
    Up,
    Down,
}

struct SnakeCell(usize);

struct Snake {
    body: Vec<SnakeCell>,
    direction: Direction,
}

impl Snake {
    pub fn new(spawn_index: usize) -> Snake {
        Snake {
            body: vec![SnakeCell(spawn_index)],
            direction: Direction::Right,
        }
    }
}

#[wasm_bindgen]
pub struct World {
    width: usize,
    size: usize,
    snake: Snake,
}

#[wasm_bindgen]
impl World {
    pub fn new(width: usize, snake_index: usize) -> World {
        World {
            width,
            size: width * width,
            snake: Snake::new(snake_index),
        }
    }

    pub fn width(&self) -> usize {
        self.width
    }

    pub fn snake_head_idx(&self) -> usize {
        self.snake.body[0].0
    }

    pub fn update(&mut self) {
        let snake_idx = self.snake_head_idx();
        let row = snake_idx / self.width;

        if self.snake.direction == Direction::Right {
            let next_col = (snake_idx + 1) % self.width;
            self.snake.body[0].0 = (row * self.width) + next_col;
        }

        if self.snake.direction == Direction::Left {
            let next_col = (snake_idx - 1) % self.width;
            self.snake.body[0].0 = (row * self.width) + next_col;
        }
    }
}

// Packing to wasm
// wasm-pack build --target web
