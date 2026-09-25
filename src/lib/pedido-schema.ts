import { z } from "zod";

// Unidades federativas do Brasil. Fonte única da lista: o <select id="estado">
// do formulário e o schema do server fn importam daqui.
export const UFS = [
  "AC",
  "AL",
  "AP",
  "AM",
  "BA",
  "CE",
  "DF",
  "ES",
  "GO",
  "MA",
  "MT",
  "MS",
  "MG",
  "PA",
  "PB",
  "PR",
  "PE",
  "PI",
  "RJ",
  "RN",
  "RS",
  "RO",
  "RR",
  "SC",
  "SP",
  "SE",
  "TO",
] as const;

// Schema compartilhado entre o formulário (navegador) e o server fn.
// As mensagens são em português para poderem ser exibidas direto na tela.
export const pedidoSchema = z
  .object({
    nome: z
      .string()
      .min(3, "Informe seu nome completo (ao menos 3 caracteres).")
      .max(120, "O nome deve ter no máximo 120 caracteres."),
    preferenciaEntrega: z.enum(["E-mail", "WhatsApp", "Ambos"], {
      errorMap: () => ({ message: "Escolha sua preferência de entrega." }),
    }),
    email: z
      .string()
      .max(160, "O e-mail deve ter no máximo 160 caracteres."),
    whatsapp: z
      .string()
      .max(25, "O WhatsApp deve ter no máximo 25 caracteres."),
    nascimento: z.string().min(1, "Informe sua data de nascimento."),
    hora: z
      .string()
      .regex(
        /^([01]\d|2[0-3]):[0-5]\d$/,
        'Informe a hora no formato HH:MM ou marque "Não sei a hora exata".',
      )
      .nullable(),
    horaDesconhecida: z.boolean().optional().default(false),
    cidade: z
      .string()
      .min(2, "Informe a cidade de nascimento (ao menos 2 caracteres).")
      .max(80, "A cidade deve ter no máximo 80 caracteres."),
    estado: z.enum(UFS, {
      errorMap: () => ({ message: "Selecione o estado de nascimento." }),
    }),
    tipo: z.string().min(1, "Escolha o tipo de leitura.").max(80, "Tipo de leitura inválido."),
    mensagem: z
      .string()
      .max(1000, "O campo de observações deve ter no máximo 1000 caracteres.")
      .optional()
      .default(""),
  })
  .superRefine((pedido, contexto) => {
    if (pedido.preferenciaEntrega === "E-mail" || pedido.preferenciaEntrega === "Ambos") {
      const emailValido = z.string().email().safeParse(pedido.email).success;
      if (!emailValido) {
        contexto.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["email"],
          message: "Informe um e-mail válido, no formato voce@email.com.",
        });
      }
    }

    if (pedido.preferenciaEntrega === "WhatsApp" || pedido.preferenciaEntrega === "Ambos") {
      if (pedido.whatsapp.length < 8) {
        contexto.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["whatsapp"],
          message: "Informe seu WhatsApp com DDD.",
        });
      }
    }
  });

export type PedidoInput = z.input<typeof pedidoSchema>;

export type ErroValidacao = {
  campo: string | null;
  mensagem: string;
};

// Retorna os campos e mensagens inválidos para orientar o formulário.
export function validarPedido(valor: unknown): ErroValidacao[] {
  const resultado = pedidoSchema.safeParse(valor);
  if (resultado.success) return [];
  return resultado.error.issues.map((issue) => ({
    campo: typeof issue.path[0] === "string" ? issue.path[0] : null,
    mensagem: issue.message,
  }));
}
