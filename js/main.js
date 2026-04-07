import { updateGame, getState, startGame } from "./game.js"
import { renderGame } from "./render.js"

let gameInterval;

const gameLoop = () => {
    updateGame();
    const state = getState();
    renderGame(state);
    if (!state.gameIsActive) {
        clearInterval(gameInterval);
    }
}
const initStartGame = () => {
    startGame()
    clearInterval(gameInterval);
    gameInterval = setInterval(gameLoop, 200);
}

export{initStartGame};