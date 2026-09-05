# Mudar o destaque para "Manifeste Marte"

Hoje o cartão "Mapa Astral Completo" é o único com brilho dourado ao fundo, borda dourada e o selo "Mais pedido". O pedido é mover esse destaque para o "Manifeste Marte".

## O que muda

- "Mapa Astral Completo" passa a ter a mesma aparência neutra dos demais cartões: sem brilho, sem borda dourada e sem selo.
- "Manifeste Marte" recebe o brilho ao fundo, a borda dourada e o selo em destaque.
- Nada mais muda: textos, preços, ordem dos cartões e o formulário continuam iguais.

## Detalhe técnico

Em `src/routes/index.tsx`, mover a flag `destaque: true` do item "Mapa Astral Completo" para o item "Manifeste Marte" na lista `servicos`. O estilo condicional (borda + halo + selo) já é aplicado por essa flag, então nenhuma outra alteração é necessária.

## Pergunta em aberto

O selo hoje diz "Mais pedido". Se preferir outro texto para o Manifeste Marte (por exemplo "Em destaque"), é só dizer — caso contrário mantenho "Mais pedido".
