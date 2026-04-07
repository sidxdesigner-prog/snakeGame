import { initStartGame } from "./main.js"
import { gamePause, getState, choiceSkinID, updateCanvasConfig } from "./game.js"

const pauseButtonOutside = document.querySelector(".outsidePlay");
const startButton = document.querySelector(".gameStart");
const homeButtonPause = document.querySelector(".home");
const pauseButtonInside = document.querySelector(".insidePlay");
const restartButtonPause = document.querySelector(".restart");
const closeDivSkin = document.querySelector(".skinButtonModal");
const closeDivMode = document.querySelector(".modeButtonModal");
const choiceSkin = document.querySelector(".buttonSkin");
const choiceMode = document.querySelector(".buttonMode");
const homeButtonGameOver = document.querySelector(".gameOverHome");
const restartButtonGameOver = document.querySelector(".gameOverRestart");
const spanNickname = document.querySelector(".spanNickname");
const spanScore = document.querySelector(".spanScore");
const spanGameOverNickname = document.querySelector(".spanGameOverNickname");
const spanGameOverScore = document.querySelector(".spanGameOverScore");
const skinItem = document.querySelectorAll(".skinItem");
const canvas = document.querySelector('.gameBoard');
const context = canvas.getContext("2d");
const gameRange = document.querySelector(".gameRange");

const divSkin = document.getElementById('skin');
const divMode = document.getElementById('mode');
const divTitle = document.getElementById('title');
const divPause = document.getElementById('gamePause');
const divGameOver = document.getElementById('gameOver');
const Nickname = document.getElementById('apelido');

let state;

const togglePause = () => {
  gamePause()
  const { gameIsActive } = getState();
  const { gameIsPause } = getState();
  if (gameIsActive) {
    (gameIsPause) ? divPause.style.display = "flex" : divPause.style.display = "none";
  }
};

const updateScore = () => {
  const { score } = getState();
  spanScore.innerText = score;

};

const showGameOver = () => {
  const { gameIsActive } = getState();
  if (gameIsActive) {
    divGameOver.style.display = "flex";
    spanGameOverNickname.innerText = Nickname.value;
    spanGameOverScore.innerText = state.score;
  }
};

const handleResize = () => {
  let larguraDisponivel = gameRange.clientWidth
  updateCanvasConfig(larguraDisponivel);
  const { box, collumns, rows } = getState();
  canvas.width = box * collumns;
  canvas.height = box * rows;
}

startButton.addEventListener("click", () => {
  spanNickname.innerText = Nickname.value;
  divTitle.style.display = "none";
  initStartGame();
});

pauseButtonOutside.addEventListener("click", togglePause);
pauseButtonInside.addEventListener("click", togglePause);


choiceMode.addEventListener("click", () => {
  divMode.style.display = "flex";
});
closeDivMode.addEventListener("click", () => {
  divMode.style.display = "none";
});

choiceSkin.addEventListener("click", () => {
  divSkin.style.display = "flex";
});
closeDivSkin.addEventListener("click", () => {
  divSkin.style.display = "none";
});

homeButtonPause.addEventListener("click", () => {
  location.reload()
});
restartButtonPause.addEventListener("click", () => {
  divPause.style.display = "none";
  initStartGame();
});

homeButtonGameOver.addEventListener("click", () => {
  location.reload()
});
restartButtonGameOver.addEventListener("click", () => {
  divGameOver.style.display = "none";
  initStartGame();
});

skinItem.forEach(botao => {
  botao.addEventListener("click", (e) => {
    const valueSkin = e.currentTarget.getAttribute("data-valor");
    await.choiceSkinID(valueSkin);
  })
});

window.addEventListener("load", handleResize);
window.addEventListener("resize", handleResize);

export { togglePause, updateScore, showGameOver, context, handleResize };