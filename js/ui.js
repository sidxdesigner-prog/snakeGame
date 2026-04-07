import { initStartGame } from "./main.js"
import { gamePause, getState } from "./game.js"

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

const divSkin = document.getElementById('skin');
const divMode = document.getElementById('mode');
const divTitle = document.getElementById('title');
const divPause = document.getElementById('gamePause');
const divGameOver = document.getElementById('gameOver');
const Nickname =  document.getElementById('apelido');

let state;

const togglePause = () => {
  gamePause()
  state = getState();
  if (state.gameIsActive) {
    (state.gameIsPause) ? divPause.style.display = "flex" : divPause.style.display = "none";
  }
}

const updateScore = ()  =>{
  state  = getState();
  spanScore.innerText = state.score;

}

const showGameOver = () =>{
  state = getState();
  if (!state.gameIsActive){
    divGameOver.style.display = "flex";
    spanGameOverNickname.innerText = Nickname.value;
    spanGameOverScore.innerText = state().score;
  } 
}


startButton.addEventListener("click", () => {
  spanNickname.innerText = Nickname.value;
  divTitle.style.display = "none";
  initStartGame();
});

pauseButtonOutside.addEventListener("click", togglePause);
pauseButtonInside.addEventListener("click", togglePause)


choiceMode.addEventListener("click", () => {
  divMode.style.display = "flex";
})
closeDivMode.addEventListener("click", () => {
  divMode.style.display = "none";
})

choiceSkin.addEventListener("click", () => {
  divSkin.style.display = "flex";
})
closeDivSkin.addEventListener("click", () => {
  divSkin.style.display = "none";
})

homeButtonPause.addEventListener("click", () => {
  location.reload()
})
restartButtonPause.addEventListener("click", () => {
  divPause.style.display = "none";
  initStartGame();
})

homeButtonGameOver.addEventListener("click", () => {
  location.reload()
})
restartButtonGameOver.addEventListener("click", () => {
  divGameOver.style.display = "none";
  initStartGame();
})

export { togglePause, updateScore, showGameOver};