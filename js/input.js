import { setNextDirection} from "./game.js"

const directionControl = (event) => {
    if (event.key == " ") {
        gameIsPause()
    }
    if ((event.key == "ArrowUp" || event.key == "w" || event.key == "W") && direction != "DOWN") {
        setNextDirection(UP);
    }
    if ((event.key == "ArrowLeft" || event.key == "a" || event.key == "A") && direction != "RIGHT") {
        setNextDirection(LEFT);
    }
    if ((event.key == "ArrowDown" || event.key == "s" || event.key == "S") && direction != "UP") {
        setNextDirection(DOWN);
    }
    if ((event.key == "ArrowRight" || event.key == "d" || event.key == "D") && direction != "LEFT") {
        setNextDirection(RIGHT);
    }
};

addEventListener("click", directionControl)