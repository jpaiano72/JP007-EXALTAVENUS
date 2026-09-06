# Registrar "hora não informada" nos pedidos

Hoje, quando a pessoa marca "Não sei a hora exata do meu nascimento", o pedido é salvo apenas com a hora em branco. Não dá para saber se ela marcou a opção ou se o dado se perdeu.

## O que muda

- Novo campo na tabela de pedidos: **hora não informada** (sim/não), preenchido automaticamente conforme a marcação no formulário.
- Pedidos antigos ficam marcados como "não informada = sim" quando estiverem sem hora, e "não" quando tiverem hora.
- A mensagem enviada pelo WhatsApp continua igual ("não sei a hora").

## Detalhes técnicos

- Migração: `ALTER TABLE public.pedidos ADD COLUMN hora_desconhecida boolean NOT NULL DEFAULT false;` seguida de um `UPDATE` marcando `true` onde `hora IS NULL`.
- `src/lib/pedidos.functions.ts`: adicionar `horaDesconhecida: z.boolean()` ao schema e gravar em `hora_desconhecida`.
- `src/routes/index.tsx`: enviar `horaDesconhecida` no objeto do pedido; incrementar `SITE_VERSION` e a versão em `package.json`/`package-lock.json` (patch).
