import { updateGame, getState, startGame } from "./game.js";
import { renderGame } from "./render.js";
import { showGameOver, handleResize, context} from "./ui.js";


let gameInterval;

const gameLoop = () => {
    updateGame();
    const state = getState();
    renderGame(state, context);
    if (!state.gameIsActive) {
        showGameOver();
        clearInterval(gameInterval);
    }
}
const initStartGame = () => {
    handleResize();
    startGame();
    clearInterval(gameInterval);
    gameInterval = setInterval(gameLoop, 200);
}

document.querySelector(".gameStart").addEventListener("click", () => {
    initStartGame();
});
export{initStartGame};