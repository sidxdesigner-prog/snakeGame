ETAPA 1 (AGORA)
Ainda em um único arquivo (game.js)

Faça:

criar updateGame()
criar renderGame()
criar gameLoop()
substituir draw()

👉 SEM usar módulos ainda

🟡 ETAPA 2

Quando isso estiver funcionando:

👉 aí sim começa a separar:

mover lógica → game.js
mover render → render.js

E usar:

import { updateGame, getState } from "./game.js";
import { renderGame } from "./render.js";

ETAPA 3

Depois:

input.js
ui.js
main.js

“consigo fazer com import/export?”

👉 Sim, e o padrão será:

🔹 game.js
export:
- updateGame
- getState
- setNextDirection
- startGame
🔹 render.js
export:
- renderGame
🔹 main.js
import:
- updateGame
- getState
- renderGame
🔹 input.js
import:
- setNextDirection
🔹 ui.js
import:
- startGame
- pauseGame