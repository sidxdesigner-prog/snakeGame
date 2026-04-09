const skinLibrary = {
  0: "blue",
  1: "yellow",
  2: "green",
  3: "gyarados",
  4: "onix",
  5: "serperior",
  6: "arbok",
  7: "rayquaza"
}
const spriteNames = [
  [
    "head.png",
    "body.png",
    "tail.png",
    "curveUp.png",
    "curveDown.png",
  ],
  [
    "head.png",
    "arms.png",
    "body.png",
    "tail.png",
    "curveUp.png",
    "curveDown.png",
    "armsUp.png",
    "armsDown.png"
  ]
]
let imagensLoad = {};

const carregarSprites = (indiceSkin) => {
  const nomePasta = skinLibrary[indiceSkin]
  const arquivos = (indiceSkin == 7) ? spriteNames[1] : spriteNames[0];
  const promessas = arquivos.map(nomeArquivo => {
    return new Promise((resolve) => {
      const image = new Image();
      image.src = `assets/imagens/${nomePasta}/${nomeArquivo}`;
      image.onload = () => resolve();
      const chave = nomeArquivo.replace(".png", "");
      imagensLoad[chave] = image;
    });

  });
  return Promise.all(promessas);
};

const getSegmentRotation = (anterior, atual, sucessor, index, snake) => {
  const getSprite = (pref, fallback) => {
    const key = (index === 1 && imagensLoad[pref]) ? pref : fallback;
    return imagensLoad[key] || imagensLoad[fallback];
  };

  const getDist = (a, b) => {
    let d = a - b;
    if (Math.abs(d) > 1) d = d > 0 ? -1 : 1;
    return d;
  };

  // 1. TRATAMENTO DA CABEÇA (Retorno Antecipado)
  if (index === 0) {
    let ang = (atual.x > anterior.x) ? 0 : (atual.y > anterior.y) ? Math.PI / 2 : (atual.x < anterior.x) ? Math.PI : 3 * Math.PI / 2;
    if (Math.abs(anterior.x - atual.x) > 1) ang = (atual.x < anterior.x) ? 0 : Math.PI;
    if (Math.abs(anterior.y - atual.y) > 1) ang = (atual.y < anterior.y) ? Math.PI / 2 : 3 * Math.PI / 2;
    return { img: imagensLoad.head, angulo: ang };
  }

  // 2. TRATAMENTO DA CAUDA (Retorno Antecipado)
  if (index === snake.length - 1) {
    let ang = (sucessor.x > atual.x) ? 0 : (sucessor.y > atual.y) ? Math.PI / 2 : (sucessor.x < atual.x) ? Math.PI : 3 * Math.PI / 2;
    if (Math.abs(sucessor.x - atual.x) > 1) ang = (sucessor.x < atual.x) ? 0 : Math.PI;
    if (Math.abs(sucessor.y - atual.y) > 1) ang = (sucessor.y < atual.y) ? Math.PI / 2 : 3 * Math.PI / 2;
    return { img: imagensLoad.tail, angulo: ang };
  }

  // 3. SÓ AGORA CALCULAMOS AS DISTÂNCIAS (Área Segura)
  const dxA = getDist(anterior.x, atual.x);
  const dyA = getDist(anterior.y, atual.y);
  const dxS = getDist(sucessor.x, atual.x); // Aqui o sucessor nunca será null!
  const dyS = getDist(sucessor.y, atual.y);

  //as proximas condicionais definem a curva e o angulo, achei melhor fazer as sprites com mudanças angular doque fazer 24 a 36 imagens de cada uma
  if (dxA === -1) {
    // Se vai p/ CIMA, usamos 'down'. Se vai p/ BAIXO, usamos 'up'.
    if (dyS === -1) return { img: getSprite('armsUp', 'curveUp'), angulo: 0 };
    if (dyS === 1) return { img: getSprite('armsDown', 'curveDown'), angulo: 0 };
  }

  // GRUPO 180° (Vem da Direita: dxA = 1)
  if (dxA === 1) {
    if (dyS === -1) return { img: getSprite('armsDown', 'curveDown'), angulo: Math.PI };
    if (dyS === 1) return { img: getSprite('armsUp', 'curveUp'), angulo: Math.PI };
  }

  // GRUPO 90° (Vem de Cima: dyA = -1)
  if (dyA === -1) {
    if (dxS === 1) return { img: getSprite('armsUp', 'curveUp'), angulo: Math.PI / 2 };
    if (dxS === -1) return { img: getSprite('armsDown', 'curveDown'), angulo: Math.PI / 2 };
  }

  // GRUPO 270° (Vem de Baixo: dyA = 1)
  if (dyA === 1) {
    if (dxS === 1) return { img: getSprite('armsDown', 'curveDown'), angulo: (3 * Math.PI) / 2 };
    if (dxS === -1) return { img: getSprite('armsUp', 'curveUp'), angulo: (3 * Math.PI) / 2 };
  }

  // 4. LÓGICA DE CORPO RETO (Resolvendo a inversão de 180°)
  const imgReta = getSprite('arms', 'body');
  // Horizontal
  if (dyA === 0) {
    return { img: imgReta, angulo: (atual.x > anterior.x) ? 0 : Math.PI };
  }
  // Vertical
  return { img: imgReta, angulo: (atual.y > anterior.y) ? Math.PI / 2 : 3 * Math.PI / 2 };
};

export { carregarSprites, getSegmentRotation, skinLibrary}