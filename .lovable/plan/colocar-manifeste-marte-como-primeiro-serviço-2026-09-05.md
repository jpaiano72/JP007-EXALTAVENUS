# Colocar "Manifeste Marte" como primeiro serviço

O cartão em destaque ("Mais pedido") passa a ser também o primeiro da lista de serviços, para ser o primeiro que a pessoa vê — especialmente no celular, onde os cartões ficam empilhados.

## O que muda

- Nova ordem dos cartões: Manifeste Marte, Mapa Astral Completo, Revolução Solar, Sinastria / Mapa do Casal.
- O Manifeste Marte continua com o selo "Mais pedido", a borda dourada e o brilho ao fundo.
- Textos, preços e descrições continuam iguais.
- No formulário, a lista "Tipo de leitura desejada" segue a mesma ordem dos cartões, mas a opção pré-selecionada continua sendo "Mapa Astral Completo".

## Detalhe técnico

Em `src/routes/index.tsx`, reordenar o array `servicos` movendo o item "Manifeste Marte" para a primeira posição. O `<select>` do formulário é gerado a partir desse mesmo array; manter `defaultValue="Mapa Astral Completo"`.
