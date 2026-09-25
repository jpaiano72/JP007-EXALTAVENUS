import { createFileRoute } from "@tanstack/react-router";
import stars from "@/assets/stars.jpg";

export const Route = createFileRoute("/condicoes-de-compra")({
  head: () => ({
    meta: [
      { title: "Condições de Compra | EXALTAVENUS" },
      {
        name: "description",
        content:
          "Condições de Compra da EXALTAVENUS: informações sobre produto, preço, pagamento, entrega, cancelamento e reembolso do Mapa Natal.",
      },
    ],
    links: [{ rel: "canonical", href: "https://exaltavenus.lovable.app/condicoes-de-compra" }],
  }),
  component: CondicoesDeCompra,
});

function CondicoesDeCompra() {
  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-10 bg-cover bg-center opacity-70"
        style={{ backgroundImage: `url(${stars})` }}
      />

      <section className="mx-auto max-w-3xl px-6 py-16">
        <p className="eyebrow">Condições de Compra</p>
        <h1 className="mt-3 text-3xl sm:text-4xl">Condições de Compra</h1>
        <p className="mt-2 text-xs text-muted-foreground/80">
          Última atualização: 24 de setembro de 2026
        </p>

        <div className="mt-8 space-y-8 text-sm leading-relaxed text-muted-foreground">
          <p>
            Estas condições apresentam as informações para contratação do relatório de Mapa Natal da
            Exalta Venus, elaborado individualmente por Luciana Cartaxo. Leia-as antes de finalizar
            seu pedido.
          </p>

          <div>
            <h2 className="text-xl text-foreground">1. Produto e conteúdo</h2>
            <p className="mt-2">
              O Mapa Natal é um relatório individual de interpretação astrológica, entregue em
              formato PDF. O material é organizado em cinco seções: Seu mapa em poucas palavras;
              Suas energias primordiais; Sua personalidade; Seus desafios e recursos; e Seus
              chamados de desenvolvimento. A leitura tem caráter reflexivo e é voltada ao
              desenvolvimento pessoal, não prevê acontecimentos futuros nem substitui serviços
              médicos, psicológicos, jurídicos ou financeiros.
            </p>
          </div>

          <div>
            <h2 className="text-xl text-foreground">2. Preço e contratação</h2>
            <p className="mt-2">
              O investimento no relatório é de R$ 220,00. Para solicitar o serviço, preencha o
              formulário com seu nome, data, horário e local de nascimento, além do contato para
              confirmação e entrega. Confira as informações antes de enviar: o horário de nascimento
              é necessário para a análise. A Exalta Venus não oferece retificação de horário de
              nascimento.
            </p>
          </div>

          <div>
            <h2 className="text-xl text-foreground">3. Pagamento por Pix</h2>
            <p className="mt-2">
              O pagamento é realizado por Pix, conforme as instruções apresentadas após o envio do
              pedido. O envio do formulário ou de um comprovante não equivale à confirmação do
              pagamento. A compra será confirmada após a identificação do crédito na conta indicada.
              Em caso de dúvida sobre a identificação do pagamento, entre em contato pelos canais
              informados abaixo.
            </p>
          </div>

          <div>
            <h2 className="text-xl text-foreground">4. Prazo e entrega</h2>
            <p className="mt-2">
              O relatório será entregue em até 7 dias úteis, contados a partir da confirmação do
              pagamento e do recebimento de todos os dados necessários. O arquivo PDF será enviado
              por e-mail, WhatsApp ou ambos, conforme a preferência informada na compra. Se for
              necessário corrigir ou completar informações, o prazo começará quando os dados
              estiverem completos.
            </p>
          </div>

          <div>
            <h2 className="text-xl text-foreground">5. Atendimento individual opcional</h2>
            <p className="mt-2">
              Após receber o relatório, você poderá contratar separadamente um atendimento
              individual de 1h30, presencial ou virtual, para esclarecer dúvidas e aprofundar temas
              da leitura. O valor desse atendimento é de R$ 220,00. O agendamento e o pagamento são
              combinados diretamente pelo WhatsApp, o atendimento não está incluído no preço do
              relatório.
            </p>
          </div>

          <div>
            <h2 className="text-xl text-foreground">6. Cancelamento, arrependimento e reembolso</h2>
            <p className="mt-2">
              Para solicitar cancelamento ou exercer o direito de arrependimento, entre em contato
              pelo e-mail exaltadavenus@gmail.com ou WhatsApp (11) 99116-4433. Nas contratações
              realizadas fora do estabelecimento comercial, aplica-se o direito de arrependimento
              previsto no art. 49 do Código de Defesa do Consumidor, observadas as circunstâncias do
              caso e a legislação aplicável. As solicitações serão analisadas de acordo com os
              direitos do consumidor, não há renúncia automática ao direito de arrependimento pelo
              fato de o relatório ser individualizado ou de sua elaboração ter sido iniciada.
            </p>
            <p className="mt-2">
              Se houver erro de entrega, arquivo inacessível ou divergência relevante entre o
              serviço contratado e o entregue, entre em contato para que a situação seja verificada
              e resolvida conforme a legislação aplicável.
            </p>
          </div>

          <div>
            <h2 className="text-xl text-foreground">7. Uso do relatório</h2>
            <p className="mt-2">
              O relatório é destinado ao uso pessoal de quem o contratou. É permitido guardar o
              arquivo e consultá-lo novamente. A reprodução, comercialização ou divulgação integral
              do conteúdo a terceiros depende de autorização da Exalta Venus, respeitados os
              direitos legalmente assegurados.
            </p>
          </div>

          <div>
            <h2 className="text-xl text-foreground">8. Atendimento e contato</h2>
            <p className="mt-2">
              Para dúvidas sobre compra, pagamento, entrega ou exercício de direitos, entre em
              contato pelo e-mail exaltadavenus@gmail.com ou pelo WhatsApp (11) 99116-4433.
              Responsável: Luciana Cartaxo, Exalta Venus.
            </p>
          </div>
        </div>

        <a
          href="/"
          className="mt-12 inline-flex w-fit items-center justify-center rounded-full bg-gradient-to-r from-gold-soft to-gold px-9 py-3.5 text-sm font-medium tracking-wide text-primary-foreground shadow-[var(--shadow-halo)] transition-transform hover:scale-[1.03]"
        >
          Voltar ao site
        </a>
      </section>
    </div>
  );
}
