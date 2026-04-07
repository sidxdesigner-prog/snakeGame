import { getSegmentRotation } from "./advancedSkin.js"

const renderGame = (state, context) => {
    
    const { renderSnake, foodRender, collumns, rows, box, isAdvancedSkin, snakeSkin  } = state

    context.clearRect(0, 0, context.canvas.width, context.canvas.height);

    for (let i = 0; i < renderSnake.length; i++) {
        const atual = renderSnake[i];
        const sucessor = (i === 0) ? null : renderSnake[i - 1];
        let anterior = (i < renderSnake.length - 1) ? renderSnake[i + 1] : null;

        if (isAdvancedSkin) {
            const dados = getSegmentRotation(anterior, atual, sucessor, i, renderSnake);

            if (dados && dados.img) {
                context.save();
                context.translate((atual.x * box) + box / 2, (atual.y * box) + box / 2);
                context.rotate(dados.angulo);
                context.drawImage(dados.img, -box / 2, -box / 2, box, box);
                context.restore();
            }
        } else {
            context.fillStyle = snakeSkin;
            context.fillRect(atual.x * box, atual.y * box, box, box);
        }
    }
    drawFood(context, foodRender, box)
}

const drawFood = (context, food, box) => {
    context.fillStyle = "red";
    context.fillRect(food.x * box, food.y * box, box, box);
};

export{renderGame};