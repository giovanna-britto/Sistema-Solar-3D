# Sistema Solar 3D

## Título da Obra
"Sistema Solar Interativo em 3D"

## Breve Descrição
Simulação tridimensional do sistema solar com planetas em órbita e materiais realistas. Permite navegação espacial com controle de câmera e foco em planetas específicos através de interação por mouse e teclado.

## Detalhes da Interação
- **Mouse**: Controle da rotação da câmera (clique e arraste)
- **Scroll**: Zoom in/out para aproximar ou afastar a visualização
- **Teclas numéricas (1-9)**: Focar em planetas específicos (1 = Mercúrio, ..., 8 = Netuno, 0 = Sol)
- **ESC**: Retornar à visão geral do sistema

## Requisitos Atendidos
1. **Formas 3D**: Esferas representando o Sol e os planetas, com anéis para Saturno
2. **Rotate() e Translate()**: Utilizados para posicionar os planetas em órbitas e rotação própria
3. **Materiais**: 
   - emissiveMaterial() para o Sol
   - ambientMaterial(), specularMaterial() e normalMaterial() para os planetas
4. **Iluminação**: 
   - pointLight() no centro (Sol)
   - directionalLight() para iluminação geral
   - ambientLight() para luz ambiente
5. **Animação/Interação**: 
   - Animação automática das órbitas planetárias
   - Interação por mouse (rotação de câmera e zoom)
   - Interação por teclado (foco em planetas específicos)
