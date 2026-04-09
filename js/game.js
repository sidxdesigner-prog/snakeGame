import { updateScore } from "./ui.js";
import { carregarSprites } from "./advancedSkin.js";

let snake = [];
let food = {};
let direction;
let nextDirection = "RIGHT";
let collumns = 30;
let rows = 15;
let gameMode = "classic";
let gameIsPause = false;
let gameIsActive = false;
let score = 0;
let currentSkin;
let box;
let isAdvancedSkin = false;
let snakeSkin = "blue";
let touchStartY;
let touchStartX;
let touchEndY;
let touchEndX;
let diffX;
let diffY;


const skinlibrary = {
  0: "blue",
  1: "yellow",
  2: "green",
  3: "gyarados",
  4: "onix",
  5: "serperior",
  6: "arbok",
  7: "rayquaza"
}

const selectMode = (mode) =>{
  gameMode = String(mode);
}
const choiceSkinID = (id) => {
  isAdvancedSkin = (parseInt(id) >= 3);
  if (isAdvancedSkin) {
    return carregarSprites(id);
  } else {
    snakeSkin = skinlibrary[id];
    return Promise.resolve();
  }
}

const setGameSkin = (skinName) => {
  currentSkin = skinName;
}
const updateCanvasConfig = (canvasSize) => {
  (canvasSize < 700) ? (collumns = 20, rows = 50) : (collumns = 50, rows = 20);
  box = Math.floor(canvasSize / collumns)
}

const gerarCobra = () => {
  snake = [];
  let centerX = Math.floor(collumns / 2);
  let centerY = Math.floor(rows / 2);
  snake[0] = { x: centerX, y: centerY };
  snake[1] = { x: centerX - 1, y: centerY };
  snake[2] = { x: centerX - 2, y: centerY };
}

const gerarComida = () => {
  food = {};
  let inside = false;
  let newFood = {};

  while (!inside) {
    newFood = {
      x: Math.floor(Math.random() * collumns),
      y: Math.floor(Math.random() * rows)
    }
    const foodToHeadColision = snake.some(segmento =>
      segmento.x === newFood.x && segmento.y === newFood.y
    );

    if (!foodToHeadColision) {
      inside = true;
    }
  }
  food = newFood;
}

const checkColision = (snakeX, snakeY, snake) => {
  for (let i = 1; i < snake.length - 1; i++) {
    if (snakeX == snake[i].x && snakeY == snake[i].y) {
      return true;
    };
  };
  return false;
};

const updateGame = () => {
  if (gameIsPause) return;

  direction = nextDirection;

  let snakeX = snake[0].x;
  let snakeY = snake[0].y;

  if (direction === "RIGHT") snakeX += 1;
  if (direction === "LEFT") snakeX -= 1;
  if (direction === "UP") snakeY -= 1;
  if (direction === "DOWN") snakeY += 1;

  if (gameMode === "classic") {
    if (snakeX < 0 || snakeX >= collumns || snakeY < 0 || snakeY >= rows || checkColision(snakeX, snakeY, snake)) {
      gameIsActive = false;
      gameIsPause = true;
      return
    }
  } else if (gameMode === "infinite") {
    if (snakeX < 0) {
      snakeX = collumns - 1;
    } else if (snakeX >= collumns) {
      snakeX = 0;
    } else if (snakeY < 0) {
      snakeY = rows - 1;
    } else if (snakeY >= rows) {
      snakeY = 0;
    }
    else if (checkColision(snakeX, snakeY, snake)) {
      gameIsActive = false;
      gameIsPause = true;
      return;
    }
  }
  if (snakeX === food.x && snakeY === food.y) {
    gerarComida();
    score += 1;
    updateScore();
  } else {
    snake.pop();
  }
  let newHead = { x: snakeX, y: snakeY };
  snake.unshift(newHead);
};

const setNextDirection = (dir) => {
  const oposit = {
    UP: "DOWN",
    DOWN: "UP",
    LEFT: "RIGHT",
    RIGHT: "LEFT"
  }
  if (dir !== oposit[direction]) {
    nextDirection = dir;
  };
}

const touchMove = (touchStartX, touchStartY, touchEndX, touchEndY) =>{
  diffX = touchEndX - touchStartX;
  diffY = touchEndY - touchStartY;
  if (Math.abs(diffX) > Math.abs(diffY)) {
    if (diffX > 0 && direction != "LEFT") nextDirection = "RIGHT";
    else if (diffX < 0 && direction != "RIGHT") nextDirection = "LEFT";
  } else {
    if (diffY > 0 && direction != "UP") nextDirection = "DOWN";
    else if (diffY < 0 && direction != "DOWN") nextDirection = "UP";
  }
}

const getState = () => {

  let renderSnake = snake.map(segment => {
    return { x: segment.x, y: segment.y };
  })
  let foodRender = { x: food.x, y: food.y };
  return { renderSnake, foodRender, gameIsPause, gameIsActive, score, rows, collumns, box, isAdvancedSkin, snakeSkin, touchStartX, touchEndX, touchStartY, touchEndY };
}

const startGame = () => {
  gameIsActive = true;
  gameIsPause = false;
  nextDirection = "RIGHT";
  gerarCobra();
  gerarComida();
}

const gamePause = () => {
  if (gameIsActive) {
    (!gameIsPause) ? gameIsPause = true : gameIsPause = false;
  }
}

export { updateGame, getState, setNextDirection, startGame, gerarCobra, gamePause, updateCanvasConfig, setGameSkin, choiceSkinID, selectMode, touchMove};