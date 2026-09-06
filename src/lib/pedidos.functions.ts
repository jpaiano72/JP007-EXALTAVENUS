import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

// Validação do pedido enviado pelo formulário público do site.
// A tabela `pedidos` só recebe escrita via service_role (este server fn),
// então nenhum dado é exposto ou gravado diretamente pelo navegador.
const pedidoSchema = z.object({
  nome: z.string().min(1).max(120),
  genero: z.string().min(1).max(20),
  email: z.string().email().max(160),
  whatsapp: z.string().min(1).max(25),
  nascimento: z.string().min(1),
  hora: z.string().nullable(),
  horaDesconhecida: z.boolean().optional().default(false),
  cidade: z.string().min(1).max(80),
  estado: z.string().min(1).max(40),
  tipo: z.string().min(1).max(80),
  mensagem: z.string().max(1000).optional().default(""),
});

export const registrarPedido = createServerFn({ method: "POST" })
  .inputValidator((data) => pedidoSchema.parse(data))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin.from("pedidos").insert({
      nome: data.nome,
      genero: data.genero,
      email: data.email,
      whatsapp: data.whatsapp,
      nascimento: data.nascimento,
      hora: data.hora,
      hora_desconhecida: data.horaDesconhecida,
      cidade: data.cidade,
      estado: data.estado,
      tipo: data.tipo,
      mensagem: data.mensagem,
    });
    if (error) {
      console.error("[pedidos] Erro ao registrar pedido:", error.message);
      throw new Error("Não foi possível registrar o pedido.");
    }
    return { ok: true };
  });
