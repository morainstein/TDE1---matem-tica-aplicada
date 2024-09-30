function calcularFuncaoQuadratica(a, b, c, x) {
  return a * Math.pow(x, 2) + b * x + c;
}

function desenharGrafico(a, b, c) {
// Seleciona o canvas e o contexto 2D
  const canvas = document.getElementById('cartesiano');
  const ctx = canvas.getContext('2d');

// Tamanho do canvas
  const largura = canvas.width;
  const altura = canvas.height;
  const passo = 0.1;
  
// Coordenadas do centro do plano (meio do canvas)
  const centroX = largura / 2;
  const centroY = altura / 2;

// Limpar o canvas
  ctx.clearRect(0, 0, largura, altura);

// Desenhar eixos
  ctx.beginPath();
  ctx.moveTo(0, altura / 2);
  ctx.lineTo(largura, altura / 2); // Eixo X
  ctx.moveTo(largura / 2, 0);
  ctx.lineTo(largura / 2, altura); // Eixo Y
  ctx.strokeStyle = 'black';
  ctx.stroke();

// Desenhar função quadrática
  ctx.beginPath();
  ctx.moveTo(0, altura / 2 - calcularFuncaoQuadratica(a, b, c, -largura / 2) * 10);

  for (let x = -largura / 2; x < largura / 2; x += passo) {
    let y = calcularFuncaoQuadratica(a, b, c, x / 10); // Escalar para caber no gráfico
    ctx.lineTo(largura / 2 + x, altura / 2 - y * 10); // Escalar y para caber no canvas
  }

  ctx.strokeStyle = 'blue';
  ctx.stroke();

// Função para desenhar coordenadas no plano

  ctx.font = '12px Arial';
  ctx.fillStyle = 'black';

// Coordenadas positivas e negativas no eixo X
  for (let x = 50; x < largura; x += 50) {
    ctx.fillText((x - centroX) / 10, x, centroY - 5); // Abaixo do eixo X
    // ctx.fillText((centroX - x) / 50, centroX - (x - centroX), centroY - 5); // Acima do eixo X
  }

// Coordenadas positivas e negativas no eixo Y
  for (let y = 50; y < altura; y += 50) {
    ctx.fillText((centroY - y) / 10, centroX + 5, y + 3); // À direita do eixo Y
  }

// Função para desenhar a grade no plano cartesiano

  ctx.strokeStyle = '#e0e0e0';
  ctx.lineWidth = 1;

// Linhas horizontais
  for (let y = 50 /*espaçamento*/; y < altura; y += 50 /*espaçamento*/) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(largura, y);
    ctx.stroke();
  }

// Linhas verticais
  for (let x = 50 /*espaçamento*/; x < largura; x += 50 /*espaçamento*/) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, altura);
    ctx.stroke();
  }
}

function calcular() {
  // Pegar os valores dos inputs
  let a = parseFloat(document.getElementById('a').value);
  let b = parseFloat(document.getElementById('b').value);
  let c = parseFloat(document.getElementById('c').value);
  let x = parseFloat(document.getElementById('x').value);

  // Verificar se os valores foram preenchidos
  if (isNaN(a) || isNaN(b) || isNaN(c) || isNaN(x)) {
      document.getElementById('resultado').innerHTML = "Por favor, preencha todos os campos!";
      return;
  }

  // Calcular o valor da função quadrática
  let resultado = calcularFuncaoQuadratica(a, b, c, x);

  // Exibir o resultado na div "resultado"
  document.getElementById('resultado').innerHTML = "O valor de f(x) = " + resultado;
  desenharGrafico(a, b, c);
}


// Função que calcula as raízes da equação quadrática usando Bhaskara
function calcularRaizes(a, b, c) {
  let delta = Math.pow(b, 2) - 4 * a * c;

  if (delta > 0) {
      let raiz1 = (-b + Math.sqrt(delta)) / (2 * a);
      let raiz2 = (-b - Math.sqrt(delta)) / (2 * a);
      return { raiz1, raiz2 }; // Duas raízes reais e distintas
  } else if (delta === 0) {
      let raizUnica = -b / (2 * a);
      return { raizUnica }; // Uma raiz real (dupla)
  } else {
      return null; // Não existem raízes reais
  }
}

// Exemplo de uso:
let a = 2, b = -4, c = 1;
let x = 1; // Valor de x para calcular f(x)

console.log("Valor de f(x) para x = " + x + ": " + calcularFuncaoQuadratica(a, b, c, x));

let raizes = calcularRaizes(a, b, c);
if (raizes) {
  if (raizes.raiz1 && raizes.raiz2) {
      console.log("Raízes da equação: " + raizes.raiz1 + " e " + raizes.raiz2);
  } else {
      console.log("Raiz única da equação: " + raizes.raizUnica);
  }
} else {
  console.log("A equação não possui raízes reais.");
}
