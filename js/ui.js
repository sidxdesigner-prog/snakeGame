import { gamePause, getState, choiceSkinID, updateCanvasConfig, selectMode, touchMove, resetGameState } from "./game.js";
import { updateSkinView } from "./render.js";
import { initStartGame } from "./main.js";
import { manageBGM, playSound } from "./audio.js";

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

let touchStartX;
let touchStartY;
let touchEndX;
let touchEndY;

const updateRankingUI = () => {
  const ranking = JSON.parse(localStorage.getItem('snakeRanking')) || [];
  const rankingList = document.getElementById('rankingList');
  
  rankingList.innerHTML = ""; 

  ranking.slice(0, 3).forEach((player, index) => {
    const li = document.createElement('li');
    li.innerText = `${index + 1}. ${player.name} - ${player.score}`;
    rankingList.appendChild(li);
  });
};

const saveScore = (name, score) => {
  if (score === 0) return; 

  let ranking = JSON.parse(localStorage.getItem('snakeRanking')) || [];
  
  ranking.push({ name: name, score: score });

  ranking.sort((a, b) => b.score - a.score);

  ranking = ranking.slice(0, 3);

  localStorage.setItem('snakeRanking', JSON.stringify(ranking));
  
  updateRankingUI();
};

const togglePause = () => {
  gamePause()
  let { gameIsActive } = getState();
  let { gameIsPause } = getState();
  manageBGM(gameIsActive, gameIsPause);
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
  let { score } = getState();
  spanScore.innerText = score;

};

const showGameOver = () => {
  let { gameIsActive, score} = getState();
  if (!gameIsActive) {
    playSound('gameover');
    manageBGM(false);
    saveScore(Nickname.value || "Anônimo", score);
    divGameOver.style.display = "flex";
    spanGameOverNickname.innerText = Nickname.value;
    spanGameOverScore.innerText = score;
  }
};

const handleResize = () => {
  let larguraDisponivel = gameRange.clientWidth
  updateCanvasConfig(larguraDisponivel);
  let { box, collumns, rows } = getState();
  canvas.width = box * collumns;
  canvas.height = box * rows;
}


const shadowAddClass = () => {
  spriteItems.forEach(item => item.classList.add("noShadow"));
}

const shadowRemoveClass = () => {
  spriteItems.forEach(item => item.classList.remove("noShadow"));
}

const goToHome = () => {
  resetGameState();
  
  manageBGM(false); 

  divGameOver.style.display = "none";
  divPause.style.display = "none";
  divTitle.style.display = "flex"; 
  
  
  choiceMode.style.display = "block";
  choiceSkin.style.display = "block";
  pauseButtonOut.style.display = "none";
  
  context.clearRect(0, 0, canvas.width, canvas.height);
};

startButton.addEventListener("click", () => {
  spanNickname.innerText = Nickname.value;
  divTitle.style.display = "none";
  choiceMode.style.display = "none";
  choiceSkin.style.display = "none";
  pauseButtonOut.style.display = "block";
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

restartButtonPause.addEventListener("click", () => {
  divPause.style.display = "none";
  initStartGame();
});

homeButtonPause.addEventListener("click", goToHome);

homeButtonGameOver.addEventListener("click", goToHome);

restartButtonGameOver.addEventListener("click", () => {
  divGameOver.style.display = "none";
  updateScore();
  initStartGame();
});

skinItem.forEach(botao => {
  botao.addEventListener("click", async (e) => {
    let alvoClicado = e.currentTarget;
    let valueSkin = e.currentTarget.getAttribute("data-valor");
    await choiceSkinID(valueSkin);
    updateSkinView(valueSkin);
    skinItem.forEach(b => b.classList.remove("ativa"));
    alvoClicado.classList.add("ativa");
  })
});

modeItem.forEach(botao => {
  botao.addEventListener("click", async (e) => {
    let alvoClicado = e.currentTarget;
    let valueMode = e.currentTarget.getAttribute("data-valor");
    selectMode(valueMode);
    modeItem.forEach(b => b.classList.remove("ativa"));
    alvoClicado.classList.add("ativa");
  })
});

const shareButton = document.getElementById('shareGame');
shareButton.addEventListener('click', () => {
  const gameUrl = window.location.href;

  navigator.clipboard.writeText(gameUrl).then(() => {
    alert("Link do jogo copiado para a área de transferência! 🐍✨");
  }).catch(err => {
    console.error('Erro ao copiar o link: ', err);
  });
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

updateRankingUI();

export { togglePause, updateScore, showGameOver, context, handleResize, previewHead, previewBody, previewTail, shadowAddClass, shadowRemoveClass };