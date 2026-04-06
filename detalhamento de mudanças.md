index.html
style.css

main.js        → inicializa tudo (O CÉREBRO)
game.js        → lógica do jogo
render.js      → desenho no canvas
input.js       → teclado e touch
ui.js          → botões e interface
advancedSkin.js → sprites


input.js → altera estado (nextDirection)

ui.js → chama funções (startGame, pause, etc)

main.js → conecta tudo

game.js → atualiza estado

render.js → desenha estado

setInterval → chama → gameLoop
gameLoop → chama → updateGame
gameLoop → chama → renderGame

UpdateGame ----
1. aplicar direção
2. calcular nova cabeça
3. verificar colisão (ignorando cauda)
4. verificar se comeu
   ├─ se NÃO → remove cauda
   └─ se SIM → gerar comida
5. adicionar nova cabeça


1. clique em Start (UI)
2. UI chama função startGame (no game ou controller)
3. o jogo inicializa estado (cobra, comida, direção)
4. main.js inicia o loop (setInterval)

LOOP COMEÇA:

5. input já atualizou nextDirection (quando usuário apertou tecla)
6. game.updateGame() usa essa direção e atualiza o estado
7. main pega o estado atual (getState)
8. render desenha esse estado no canvas

(repete)


INPUT:
  tecla pressionada
  → input chama game.setNextDirection("UP")

GAME:
  guarda nextDirection

MAIN (loop):
  → chama updateGame()
      → usa nextDirection
      → atualiza estado (snake, food, etc)

  → pega estado (getState)

  → chama renderGame(estado)

RENDER:
  desenha no canvas



UI  e INPUT → GAME → MAIN LOOP → GAME → RENDER