import { createServerFn } from "@tanstack/react-start";
import { pedidoSchema } from "@/lib/pedido-schema";

// Validação do pedido enviado pelo formulário público do site.
// A tabela `pedidos` só recebe escrita via service_role (este server fn),
// então nenhum dado é exposto ou gravado diretamente pelo navegador.
export const registrarPedido = createServerFn({ method: "POST" })
  .inputValidator((data) => pedidoSchema.parse(data))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    // Mantém os dados no servidor e retorna apenas o status da operação ao cliente.
    const { error } = await supabaseAdmin
      .from("pedidos")
      .insert({
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
      // Loga o objeto de erro completo para debugar (não retorna detalhes ao cliente).
      console.error("[pedidos] Erro ao registrar pedido:", error);
      throw new Error("Não foi possível registrar o pedido.");
    }

    return { ok: true };
  });
