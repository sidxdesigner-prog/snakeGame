// CONSTANTES DO JOGO
const canvas = document.querySelector('.gameBoard');
const context = canvas.getContext("2d");
const box = 20;
const corButton = document.querySelectorAll(".skinItem")
const modeButton = document.querySelectorAll(".modeItem")
const buttonMode = document.getElementById("buttonMode")
const buttonSkin = document.getElementById("buttonSkin")
const title = document.querySelector('.title');
const buttonPauseHome = document.querySelector('.home')
const buttonPauseRestart = document.querySelector(".restart")
const divGameIsPause = document.querySelector(".gamePause")

// VARIAVEIS LET DO JOGO
let snake = []
snake[0] = { x: 520, y: 200 };
snake[1] = { x: 500, y: 200 };
snake[2] = { x: 480, y: 200 };
let snakeSkin = "red";
let gameMode = "classic"
let direction = "RIGHT";
let nextDirection = "RIGHT";
let gameInterval;
let food = {
  x: Math.floor(Math.random() * 50) * box,
  y: Math.floor(Math.random() * 20) * box
};
let gamePause;





// Functions
const abrirModal = (name) => {
  if (name === "skin") {
    skin.style.display = "block";
  } else if (name === "mode") {
    mode.style.display = "block";
  }
}
const fecharModal = (name) => {
  if (name === "skin") {
    skin.style.display = "none";
  } else if (name === "mode") {
    mode.style.display = "none";
  }
}

const escolherCor = (cor) => {
  snakeSkin = cor.target.getAttribute("data-valor");
}
const escolherMode = (mode) => {
  gameMode = mode.target.getAttribute("data-valor");
}

const startGame = () => {
  title.style.display = "none"
  buttonSkin.style.display = "none"
  buttonMode.style.display = "none"
  clearInterval(gameInterval);
  gameInterval = setInterval(draw, 125);

};

const gameIsPause = () => {
  if (gameInterval) {
    if (!gamePause) {
      gamePause = true;
      clearInterval(gameInterval);
      divGameIsPause.style.display = "block";
      context.clearRect(0, 0, canvas.width, canvas.height);
    } else {
      gamePause = false;
      gameInterval = setInterval(draw, 125);
      divGameIsPause.style.display = "none";
    }
  }
}

const draw = () => {
  context.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < snake.length; i++) {
    context.fillStyle = snakeSkin;
    context.fillRect(snake[i].x, snake[i].y, box, box);
  }
  drawFood();
  direction = nextDirection

  let snakeX = snake[0].x;
  let snakeY = snake[0].y;

  if (direction === "RIGHT") snakeX += box;
  if (direction === "LEFT") snakeX -= box;
  if (direction === "UP") snakeY -= box;
  if (direction === "DOWN") snakeY += box;

  let newHead = { x: snakeX, y: snakeY };
  snake.unshift(newHead);

  if (newHead.x === food.x && newHead.y === food.y) {
    food = {
      x: Math.floor(Math.random() * 50) * box,
      y: Math.floor(Math.random() * 20) * box
    };
  } else {
    snake.pop();
  }
  if (gameMode === "classic") {
    if (newHead.x < 0 || newHead.x > 999 || newHead.y < 0 || newHead.y > 399 || checkColision(newHead, snake)) {
      clearInterval(gameInterval);
      buttonSkin.style.display = "block";
      buttonMode.style.display = "block";
    }
  } else if (gameMode === "infinite") {
    if (newHead.x < 0) {
      snake[0].x = 980;
    } else if (newHead.x > 999) {
      snake[0].x = 0;
    } else if (newHead.y < 0) {
      snake[0].y = 380;
    } else if (newHead.y > 399) {
      snake[0].y = 0;
    }
    else if (checkColision(newHead, snake)) {
      clearInterval(gameInterval)
      buttonSkin.style.display = "block"
      buttonMode.style.display = "block"
    }
  }
};

const directionControl = (event) => {
  if (event.key == " ") {
    gameIsPause()
  }
  if (event.key == "ArrowUp" && direction != "DOWN") {
    nextDirection = "UP"
  }
  if (event.key == "ArrowLeft" && direction != "RIGHT") {
    nextDirection = "LEFT"
  }
  if (event.key == "ArrowDown" && direction != "UP") {
    nextDirection = "DOWN"
  }
  if (event.key == "ArrowRight" && direction != "LEFT") {
    nextDirection = "RIGHT"
  }
};

const drawFood = () => {
  context.fillStyle = "red";
  context.fillRect(food.x, food.y, box, box);
};

const checkColision = (newHead, snake) => {
  for (let i = 1; i < snake.length; i++) {
    if (newHead.x == snake[i].x && newHead.y == snake[i].y) {
      return true
    };
  };
  return false
};


// eventos listerners

addEventListener("keydown", directionControl);
corButton.forEach((botao) => {
  botao.addEventListener("click", (e) => {
    escolherCor(e);
  });
});
modeButton.forEach((botao) => {
  botao.addEventListener("click", (e) => {
    escolherMode(e);
  });
});