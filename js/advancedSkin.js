const skinlibrary = {
  0: "blue",
  1: "yellow",
  2: "green",
  3: "gyarados",
  4: "onix",
  5: "serperior",
  6: "arbok",
  7: "rayquaza"
}
const coresBases = [["Green"], ["Blue"], ["Yellow"]]
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
  const nomePasta = skinlibrary[indiceSkin]
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

  // logica começa pela head para não retornar null ou undefinet, já que o head não tem sucessor a ele ele vai considreal apenas o angulo do movimento do anterior que está a atrás
  if (index === 0) {
    let anguloHead = 0;
    if (atual.x > anterior.x) anguloHead = 0; // Direita
    if (atual.y > anterior.y) anguloHead = Math.PI / 2; // Baixo
    if (atual.x < anterior.x) anguloHead = Math.PI; // Esquerda
    if (atual.y < anterior.y) anguloHead = (3 * Math.PI) / 2; // Cima

    return { img: imagensLoad.head, angulo: anguloHead };
  }
  // logica continua pela tail para não retornar null ou undefinet, já que o nail não tem anterior a ele ele vai considreal apenas o angulo do movimento do sucessor que está a frente
  if (index === snake.length - 1) {
    return {
      img: imagensLoad.tail,
      angulo: (sucessor.x > atual.x) ? 0 :
        (sucessor.y > atual.y) ? Math.PI / 2 :
          (sucessor.x < atual.x) ? Math.PI :
            (3 * Math.PI) / 2
    };
  }

  //as proximas condicionais definem a curva e o angulo, achei melhor fazer as sprites com mudanças angular doque fazer 24 a 36 imagens de cada uma
  // Grupo 0° (Vem da Esquerda)
  if (atual.x > anterior.x) {
    if (atual.y > sucessor.y) {
      return { img: (index === 1) ? imagensLoad.armsUp : imagensLoad.curveUp, angulo: 0 };
    }
    if (atual.y < sucessor.y) {
      return { img: (index === 1) ? imagensLoad.armsDown : imagensLoad.curveDown, angulo: 0 };
    }
  }

  // Grupo 90° (Vem de Cima)
  if (atual.y > anterior.y) {
    if (atual.x < sucessor.x) {
      return { img: (index === 1) ? imagensLoad.armsUp : imagensLoad.curveUp, angulo: Math.PI / 2 };
    }
    if (atual.x > sucessor.x) {
      return { img: (index === 1) ? imagensLoad.armsDown : imagensLoad.curveDown, angulo: Math.PI / 2 };
    }
  }

  // Grupo 180° (Vem da Direita)
  if (atual.x < anterior.x) {
    if (atual.y > sucessor.y) {
      return { img: (index === 1) ? imagensLoad.armsUp : imagensLoad.curveUp, angulo: Math.PI };
    }
    if (atual.y < sucessor.y) {
      return { img: (index === 1) ? imagensLoad.armsDown : imagensLoad.curveDown, angulo: Math.PI };
    }
  }

  // Grupo 270° (Vem de Baixo)
  if (atual.y < anterior.y) {
    if (atual.x < sucessor.x) {
      return { img: (index === 1) ? imagensLoad.armsUp : imagensLoad.curveUp, angulo: (3 * Math.PI) / 2 };
    }
    if (atual.x > sucessor.x) {
      return { img: (index === 1) ? imagensLoad.armsDown : imagensLoad.curveDown, angulo: (3 * Math.PI) / 2 };
    }
  }

  // caso não sejá a tail nem curvas o código define a direção de movimento básica.
  const imagemReta = (index === 1) ? imagensLoad.arms : imagensLoad.body;
  if (anterior.x > atual.x) return { img: imagemReta, angulo: 0 };
  if (anterior.y > atual.y) return { img: imagemReta, angulo: Math.PI / 2 };
  if (anterior.x < atual.x) return { img: imagemReta, angulo: Math.PI };
  if (anterior.y < atual.y) return { img: imagemReta, angulo: (3 * Math.PI) / 2 };

  // novammentre se houver erro o código retorna algo para poder gerar a skin na direção esquerda -- direita
  return { img: imagensLoad.body, angulo: 0 };
};