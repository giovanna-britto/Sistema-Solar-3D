// Sistema Solar 3D Interativo
// Implementação em p5.js usando WEBGL

// Variáveis globais
let angle = 0;
let cameraDistance = 1500;
let focusedPlanet = 0; // 0 = Sol, 1-8 = planetas
let rotationX = 0;
let rotationY = 0;
let previousMouseX, previousMouseY;
let dragging = false;

// Dados dos planetas (nome, tamanho, distância do sol, velocidade orbital, cor)
const planetas = [
  { nome: "Sol", tamanho: 100, distancia: 0, velocidade: 0, cor: [255, 255, 0] },
  { nome: "Mercúrio", tamanho: 10, distancia: 150, velocidade: 4.1, cor: [169, 169, 169] },
  { nome: "Vênus", tamanho: 15, distancia: 200, velocidade: 1.6, cor: [210, 180, 140] },
  { nome: "Terra", tamanho: 16, distancia: 250, velocidade: 1, cor: [70, 130, 180] },
  { nome: "Marte", tamanho: 12, distancia: 300, velocidade: 0.5, cor: [205, 92, 92] },
  { nome: "Júpiter", tamanho: 40, distancia: 400, velocidade: 0.08, cor: [244, 164, 96] },
  { nome: "Saturno", tamanho: 35, distancia: 500, velocidade: 0.03, cor: [238, 232, 170] },
  { nome: "Urano", tamanho: 25, distancia: 600, velocidade: 0.01, cor: [173, 216, 230] },
  { nome: "Netuno", tamanho: 24, distancia: 700, velocidade: 0.006, cor: [65, 105, 225] }
];

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  previousMouseX = mouseX;
  previousMouseY = mouseY;
}

function draw() {
  background(0);
  
  // Controle de câmera
  if (focusedPlanet === 0) {
    // Visão geral do sistema
    orbitControl(1, 1, 0.1);
    camera(cameraDistance, 0, cameraDistance * 0.5, 0, 0, 0, 0, 1, 0);
  } else {
    // Focar em um planeta específico
    let planeta = planetas[focusedPlanet];
    let x = planeta.distancia * cos(angle * planeta.velocidade);
    let z = planeta.distancia * sin(angle * planeta.velocidade);
    camera(x + 100, 0, z + 100, x, 0, z, 0, 1, 0);
  }
  
  // Rotação manual da câmera
  if (dragging) {
    rotationY += (mouseX - previousMouseX) * 0.01;
    rotationX += (mouseY - previousMouseY) * 0.01;
    previousMouseX = mouseX;
    previousMouseY = mouseY;
  }
  
  // Aplicar rotação da câmera
  rotateY(rotationY);
  rotateX(rotationX);
  
  // Adicionar iluminação
  ambientLight(50);
  pointLight(255, 255, 255, 0, 0, 0); // Luz no centro (sol)
  directionalLight(255, 255, 255, 1, 1, -1); // Luz direcional
  
  // Desenhar o Sol
  push();
  noStroke();
  emissiveMaterial(255, 255, 0); // Material emissivo para o Sol
  sphere(planetas[0].tamanho);
  pop();
  
  // Desenhar os planetas
  for (let i = 1; i < planetas.length; i++) {
    push();

    // Calcular posição orbital
    let orbitAngle = angle * planetas[i].velocidade;
    let x = planetas[i].distancia * cos(orbitAngle);
    let z = planetas[i].distancia * sin(orbitAngle);

    // Desenhar órbita
    push();
    stroke(50);
    noFill();
    rotateX(HALF_PI); // Mantém a órbita no plano XZ
    circle(0, 0, planetas[i].distancia * 2);
    pop();

    // Posicionar planeta
    translate(x, 0, z);
    noStroke();
    ambientMaterial(planetas[i].cor[0], planetas[i].cor[1], planetas[i].cor[2]);

    // Rotação do planeta sobre o eixo
    rotateY(angle * (planetas[i].velocidade * 10));
    sphere(planetas[i].tamanho);

    pop();
  }
  
  // Saturno com anéis
  push();
  let saturnIndex = 6;
  let saturnOrbitAngle = angle * planetas[saturnIndex].velocidade;
  let saturnX = planetas[saturnIndex].distancia * cos(saturnOrbitAngle);
  let saturnZ = planetas[saturnIndex].distancia * sin(saturnOrbitAngle);
  translate(saturnX, 0, saturnZ);
  rotateX(PI/3);
  
  // Anéis de Saturno
  stroke(238, 232, 170, 150);
  noFill();
  for (let i = 0; i < 10; i++) {
    ellipse(0, 0, planetas[saturnIndex].tamanho * 2 + i * 3, planetas[saturnIndex].tamanho * 2 + i * 3);
  }
  pop();
  
  // Incrementar ângulo para animação
  angle += 0.005;
}

// Eventos de interação
function mousePressed() {
  dragging = true;
  previousMouseX = mouseX;
  previousMouseY = mouseY;
}

function mouseReleased() {
  dragging = false;
}

function mouseWheel(event) {
  // Zoom com a roda do mouse
  cameraDistance += event.delta;
  cameraDistance = constrain(cameraDistance, 500, 3000);
  return false; // Prevenir o comportamento padrão de scroll
}

function keyPressed() {
  // Teclas 0-9 para focar nos planetas
  if (key >= '0' && key <= '9') {
    let planetIndex = parseInt(key);
    if (planetIndex < planetas.length) {
      focusedPlanet = planetIndex;
    }
  }
  
  // Tecla ESC para voltar à visão geral
  if (keyCode === ESCAPE) {
    focusedPlanet = 0;
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
