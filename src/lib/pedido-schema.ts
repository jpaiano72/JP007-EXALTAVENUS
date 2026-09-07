import { z } from "zod";

// Schema compartilhado entre o formulário (navegador) e o server fn.
// As mensagens são em português para poderem ser exibidas direto na tela.
export const pedidoSchema = z.object({
  nome: z
    .string()
    .min(1, "Informe seu nome completo.")
    .max(120, "O nome deve ter no máximo 120 caracteres."),
  genero: z
    .string()
    .min(1, "Selecione uma opção de gênero.")
    .max(20, "Opção de gênero inválida."),
  email: z
    .string()
    .email("Informe um e-mail válido, no formato voce@email.com.")
    .max(160, "O e-mail deve ter no máximo 160 caracteres."),
  whatsapp: z
    .string()
    .min(8, "Informe seu WhatsApp com DDD.")
    .max(25, "O WhatsApp deve ter no máximo 25 caracteres."),
  nascimento: z.string().min(1, "Informe sua data de nascimento."),
  hora: z.string().nullable(),
  horaDesconhecida: z.boolean().optional().default(false),
  cidade: z
    .string()
    .min(1, "Informe a cidade de nascimento.")
    .max(80, "A cidade deve ter no máximo 80 caracteres."),
  estado: z
    .string()
    .min(1, "Informe o estado de nascimento.")
    .max(40, "O estado deve ter no máximo 40 caracteres."),
  tipo: z
    .string()
    .min(1, "Escolha o tipo de leitura.")
    .max(80, "Tipo de leitura inválido."),
  mensagem: z
    .string()
    .max(1000, "O campo de observações deve ter no máximo 1000 caracteres.")
    .optional()
    .default(""),
});

export type PedidoInput = z.input<typeof pedidoSchema>;

// Retorna a lista de mensagens de erro (vazia quando tudo está certo).
export function validarPedido(valor: unknown): string[] {
  const resultado = pedidoSchema.safeParse(valor);
  if (resultado.success) return [];
  return resultado.error.issues.map((issue) => issue.message);
}
