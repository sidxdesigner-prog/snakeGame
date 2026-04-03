// CONSTANTES DO JOGO
const canvas = document.querySelector('.gameBoard');
const context = canvas.getContext("2d");
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
let box;
let snakeSkin = "red";
let gameMode = "classic"
let direction;
let nextDirection = "RIGHT";
let gameInterval;
let food = {};
let gamePause;
let gameIsActive;



// Functions
const abrirModal = (name) => {
  if (name === "skin") {
    skin.style.display = "block";
    mode.style.display = "none";
  } else if (name === "mode") {
    mode.style.display = "block";
    skin.style.display = "none";
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
  direction = "RIGHT"
  nextDirection = "RIGHT"
  gameIsActive = true
  title.style.display = "none"
  buttonSkin.style.display = "none"
  buttonMode.style.display = "none"
  ajusteTela()
  gerarCobra()
  gerarComida()
  clearInterval(gameInterval);
  gameInterval = setInterval(draw, 200);
}

const home = () => {
  gamePause = false;
  gameIsActive = false
  gerarCobra();
  divGameIsPause.style.display = "none";
  clearInterval(gameInterval);
  context.clearRect(0, 0, canvas.width, canvas.height);
  title.style.display = "flex"
  buttonSkin.style.display = "block"
  buttonMode.style.display = "block"

}
const restart = () => {
  gamePause = false;
  divGameIsPause.style.display = "none";
  startGame();

}

const ajusteTela = () => {
  canvas.style.width = "100%"
  canvas.width = canvas.offsetWidth;
  box = Math.floor(canvas.width / 50);
  canvas.height = box * 20;
  canvas.style.height = canvas.height + "px"
  canvas.style.width = canvas.width + "px"
  console.log("Redimensionando!")
};

const gerarCobra = () => {
  snake[0] = { x: 25, y: 10 };
  snake[1] = { x: 24, y: 10 };
  snake[2] = { x: 23, y: 10 };
}

const gerarComida = () => {
  food = {
    x: Math.floor(Math.random() * 50),
    y: Math.floor(Math.random() * 20)
  };
}

const gameIsPause = () => {
  ajusteTela()
  if (gameInterval && gameIsActive) {
    if (!gamePause) {
      gamePause = true;
      clearInterval(gameInterval);
      divGameIsPause.style.display = "block";
      context.clearRect(0, 0, canvas.width, canvas.height);
      buttonSkin.style.display = "block"
      buttonMode.style.display = "block"
    } else {
      gamePause = false;
      gameInterval = setInterval(draw, 200);
      divGameIsPause.style.display = "none";
    }
  }
}

const draw = () => {
  direction = nextDirection

  let snakeX = snake[0].x;
  let snakeY = snake[0].y;

  if (direction === "RIGHT") snakeX += 1;
  if (direction === "LEFT") snakeX -= 1;
  if (direction === "UP") snakeY -= 1;
  if (direction === "DOWN") snakeY += 1;

  if (gameMode === "classic") {
    if (snakeX < 0 || snakeX >= 50 || snakeY < 0 || snakeY >= 20 || checkColision(snakeX, snakeY, snake)) {
      gameIsActive = false;
      gamePause = true;
      divGameIsPause.style.display = "block";
      clearInterval(gameInterval);
      buttonSkin.style.display = "block";
      buttonMode.style.display = "block";
      return
    }
  } else if (gameMode === "infinite") {
    if (snakeX < 0) {
      snakeX = 49;
    } else if (snakeX > 49) {
      snakeX = 0;
    } else if (snakeY < 0) {
      snakeY = 19;
    } else if (snakeY > 19) {
      snakeY = 0;
    }
    else if (checkColision(snakeX, snakeY, snake)) {
      gameIsActive = false;
      divGameIsPause.style.display = "block";
      clearInterval(gameInterval)
      buttonSkin.style.display = "block"
      buttonMode.style.display = "block"
      return
    }
  }
  if (snakeX === food.x && snakeY === food.y) {
    food = {
      x: Math.floor(Math.random() * 50),
      y: Math.floor(Math.random() * 20)
    };
  } else {
    snake.pop();
  }
  let newHead = { x: snakeX, y: snakeY };
  snake.unshift(newHead);

  context.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < snake.length; i++) {
    context.fillStyle = snakeSkin;
    context.fillRect(snake[i].x * box, snake[i].y * box, box, box);
  }
  drawFood();
};

const directionControl = (event) => {
  if (event.key == " ") {
    gameIsPause()
  }
  if ((event.key == "ArrowUp" || event.key == "w" || event.key == "W") && direction != "DOWN") {
    nextDirection = "UP"
  }
  if ((event.key == "ArrowLeft" || event.key == "a" || event.key == "A") && direction != "RIGHT") {
    nextDirection = "LEFT"
  }
  if ((event.key == "ArrowDown" || event.key == "s" || event.key == "S") && direction != "UP") {
    nextDirection = "DOWN"
  }
  if ((event.key == "ArrowRight" || event.key == "d" || event.key == "D") && direction != "LEFT") {
    nextDirection = "RIGHT"
  }
};

const drawFood = () => {
  context.fillStyle = "red";
  context.fillRect(food.x * box, food.y * box, box, box);
};

const checkColision = (snakeX, snakeY, snake) => {
  for (let i = 1; i < snake.length; i++) {
    if (snakeX == snake[i].x && snakeY == snake[i].y) {
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
window.addEventListener("load", ajusteTela);
window.addEventListener("resize", ajusteTela);