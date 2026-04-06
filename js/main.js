import { updateGame, getState, startGame } from "./game.js"
import { renderGame } from "./render.js"

let gameInterval;

const gameLoop = () => {
    updateGame()
    const state = getState()
    renderGame(state)
    if (!state.gameIsActive) {
        clearInterval(gameInterval);
    }
}
const initstartGame = () => {
    startGame()
    clearInterval(gameInterval);
    gameInterval = setInterval(gameLoop, 200);
}