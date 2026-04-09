import { gamePause, getState, choiceSkinID, updateCanvasConfig, selectMode, touchMove } from "./game.js";
import { updateSkinView } from "./render.js";
import { initStartGame } from "./main.js";

const pauseButtonOut = document.querySelector(".buttonIsPauseOut");
const startButton = document.querySelector(".gameStart");
const homeButtonPause = document.querySelector(".home");
const pauseButtonIn = document.querySelector(".buttonIsPauseIn");
const restartButtonPause = document.querySelector(".restart");
const closeDivSkin = document.querySelector(".skinButtonModal");
const closeDivMode = document.querySelector(".modeButtonModal");
const homeButtonGameOver = document.querySelector(".buttonGameOverHome");
const restartButtonGameOver = document.querySelector(".buttonGameOverRestart");
const spanNickname = document.querySelector(".spanNickname");
const spanScore = document.querySelector(".spanScore");
const spanGameOverNickname = document.querySelector(".spanGameOverNickname");
const spanGameOverScore = document.querySelector(".spanGameOverScore");
const skinItem = document.querySelectorAll(".skinItem");
const modeItem = document.querySelectorAll(".modeItem");
const canvas = document.querySelector('.gameBoard');
const context = canvas.getContext("2d");
const gameRange = document.querySelector(".gameRange");
const previewHead = document.querySelector(".sHead");
const previewBody = document.querySelector(".sBody");
const previewTail = document.querySelector(".sTail");
const spriteItems = document.querySelectorAll(".skinSprite li");

const divSkin = document.getElementById('skin');
const divMode = document.getElementById('mode');
const divTitle = document.getElementById('title');
const divPause = document.getElementById('gamePause');
const divGameOver = document.getElementById('gameOver');
const Nickname = document.getElementById('apelido');
const choiceSkin = document.getElementById("buttonSkin");
const choiceMode = document.getElementById("buttonMode");

let state;
let touchStartX;
let touchStartY;
let touchEndX;
let touchEndY;

const togglePause = () => {
  gamePause()
  const { gameIsActive } = getState();
  const { gameIsPause } = getState();
  if (gameIsActive) {
    if (gameIsPause) {
      divPause.style.display = "flex";
      pauseButtonOut.style.display = "none";
    } else {
      divPause.style.display = "none";
      pauseButtonOut.style.display = "block";
    }
  }
};

const updateScore = () => {
  const { score } = getState();
  spanScore.innerText = score;

};

const showGameOver = () => {
  const { gameIsActive } = getState();
  if (!gameIsActive) {
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


const shadowAddClass = () => {
  spriteItems.forEach(item => item.classList.add("noShadow"));
}

const shadowRemoveClass = () => {
  spriteItems.forEach(item => item.classList.remove("noShadow"));
}

startButton.addEventListener("click", () => {
  spanNickname.innerText = Nickname.value;
  divTitle.style.display = "none";
  choiceMode.style.display = "none";
  choiceSkin.style.display = "none";
});

pauseButtonOut.addEventListener("click", togglePause);
pauseButtonIn.addEventListener("click", togglePause);


choiceMode.addEventListener("click", () => {
  divMode.style.display = "flex";
  choiceMode.style.display = "none";
  choiceSkin.style.display = "none";
});
closeDivMode.addEventListener("click", () => {
  divMode.style.display = "none";
  choiceMode.style.display = "block";
  choiceSkin.style.display = "block";
});

choiceSkin.addEventListener("click", () => {
  divSkin.style.display = "flex";
  choiceMode.style.display = "none";
  choiceSkin.style.display = "none";
});
closeDivSkin.addEventListener("click", () => {
  divSkin.style.display = "none";
  choiceMode.style.display = "block";
  choiceSkin.style.display = "block";
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
  botao.addEventListener("click", async (e) => {
    const alvoClicado = e.currentTarget;
    const valueSkin = e.currentTarget.getAttribute("data-valor");
    await choiceSkinID(valueSkin);
    updateSkinView(valueSkin);
    skinItem.forEach(b => b.classList.remove("ativa"));
    alvoClicado.classList.add("ativa");
  })
});

modeItem.forEach(botao => {
  botao.addEventListener("click", async (e) => {
    const valueMode = e.currentTarget.getAttribute("data-valor");
    selectMode(valueMode);
    modeItem.forEach(b => b.classList.remove("ativa"));
    e.currentTarget.classList.add("ativa");
  })
});

window.addEventListener("load", handleResize);
window.addEventListener("resize", handleResize);


canvas.addEventListener("touchstart", (e) => {

  touchStartX = e.touches[0].clientX;
  touchStartY = e.touches[0].clientY;
});
canvas.addEventListener("touchend", (e) => {
  touchEndX = e.changedTouches[0].clientX;
  touchEndY = e.changedTouches[0].clientY;
  touchMove(touchStartX, touchStartY, touchEndX, touchEndY)
})



export { togglePause, updateScore, showGameOver, context, handleResize, previewHead, previewBody, previewTail, shadowAddClass, shadowRemoveClass };