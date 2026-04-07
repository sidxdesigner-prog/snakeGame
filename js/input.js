import { setNextDirection} from "./game.js"
import {togglePause} from "./ui.js"

const directionControl = (event) => {
    if (event.key == " ") {
        togglePause()
    }
    if ((event.key == "ArrowUp" || event.key == "w" || event.key == "W")) {
        setNextDirection("UP");
    }
    if ((event.key == "ArrowLeft" || event.key == "a" || event.key == "A")) {
        setNextDirection("LEFT");
    }
    if ((event.key == "ArrowDown" || event.key == "s" || event.key == "S")) {
        setNextDirection("DOWN");
    }
    if ((event.key == "ArrowRight" || event.key == "d" || event.key == "D")) {
        setNextDirection("RIGHT");
    }
};

addEventListener("keydown", directionControl);