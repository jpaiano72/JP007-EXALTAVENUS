import { createFileRoute } from "@tanstack/react-router";
import stars from "@/assets/stars.jpg";

export const Route = createFileRoute("/politica-de-privacidade")({
  head: () => ({
    meta: [
      { title: "Política de Privacidade | EXALTAVENUS" },
      {
        name: "description",
        content:
          "Política de Privacidade da EXALTAVENUS: como os dados pessoais são utilizados na elaboração e entrega do Mapa Natal.",
      },
    ],
    links: [{ rel: "canonical", href: "https://exaltavenus.lovable.app/politica-de-privacidade" }],
  }),
  component: PoliticaDePrivacidade,
});

function PoliticaDePrivacidade() {
  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-10 bg-cover bg-center opacity-70"
        style={{ backgroundImage: `url(${stars})` }}
      />

      <section className="mx-auto max-w-3xl px-6 py-16">
        <p className="eyebrow">Privacidade</p>
        <h1 className="mt-3 text-3xl sm:text-4xl">Política de Privacidade</h1>
        <p className="mt-2 text-xs text-muted-foreground/80">
          Última atualização: 24 de setembro de 2026
        </p>

        <div className="mt-8 space-y-8 text-sm leading-relaxed text-muted-foreground">
          <p>
            A Exalta Venus respeita a privacidade das pessoas que acessam o site e solicitam seus
            serviços. Esta Política explica como os dados pessoais são utilizados na elaboração e
            entrega do relatório de Mapa Natal e no atendimento aos clientes.
          </p>

          <div>
            <h2 className="text-xl text-foreground">1. Quem é responsável pelos dados</h2>
            <p className="mt-2">
              A responsável pelo tratamento dos dados é Luciana Cartaxo, pessoa física, que atua sob
              o nome Exalta Venus. Para dúvidas ou solicitações sobre seus dados, entre em contato
              pelo e-mail exaltadavenus@gmail.com ou pelo WhatsApp (11) 99116-4433.
            </p>
          </div>

          <div>
            <h2 className="text-xl text-foreground">2. Quais dados são coletados</h2>
            <p className="mt-2">
              Ao solicitar o Mapa Natal, coletamos nome, data e horário de nascimento, cidade,
              estado e país de nascimento e os dados de contato escolhidos para comunicação e
              entrega (e-mail, WhatsApp ou ambos). Também são tratados dados relativos ao pedido e à
              confirmação do pagamento, bem como mensagens que você enviar durante o atendimento.
              Não solicitamos CPF, gênero nem uma descrição dos seus objetivos pessoais no
              formulário de compra.
            </p>
            <p className="mt-2">
              O site poderá tratar informações técnicas necessárias ao seu funcionamento e à
              segurança da navegação, conforme os serviços efetivamente configurados.
            </p>
          </div>

          <div>
            <h2 className="text-xl text-foreground">3. Para que os dados são utilizados</h2>
            <p className="mt-2">
              Utilizamos seus dados para calcular e interpretar o mapa natal, elaborar o relatório
              individual, receber e conferir o pagamento, confirmar e acompanhar o pedido, entregar
              o PDF pelo canal escolhido, atender solicitações e cumprir obrigações legais
              aplicáveis. Os dados fornecidos para o pedido não serão usados para publicidade ou
              divulgação de depoimentos sem autorização específica.
            </p>
          </div>

          <div>
            <h2 className="text-xl text-foreground">4. Fundamentos do tratamento</h2>
            <p className="mt-2">
              Os dados necessários à contratação e à entrega do relatório são tratados para a
              execução do contrato ou de procedimentos relacionados à contratação. Informações
              poderão ser conservadas ou utilizadas para o cumprimento de obrigações legais e para o
              exercício regular de direitos, quando aplicável. Quando uma finalidade exigir
              consentimento específico, ele será solicitado separadamente.
            </p>
          </div>

          <div>
            <h2 className="text-xl text-foreground">5. Armazenamento e compartilhamento</h2>
            <p className="mt-2">
              Os dados dos pedidos serão armazenados na infraestrutura utilizada pelo site
              desenvolvido no Lovable. O atendimento e a entrega poderão envolver os serviços de
              e-mail e WhatsApp escolhidos pelo cliente. Os dados poderão ser acessados por
              prestadores técnicos estritamente necessários ao funcionamento do site e desses
              canais, nos limites de suas atividades. Não vendemos dados pessoais nem tornamos
              pedidos e relatórios publicamente acessíveis.
            </p>
          </div>

          <div>
            <h2 className="text-xl text-foreground">6. Por quanto tempo os dados são mantidos</h2>
            <p className="mt-2">
              Os dados serão mantidos pelo tempo necessário para elaborar e entregar o relatório,
              prestar atendimento, cumprir obrigações legais e resguardar direitos relacionados à
              contratação. Encerradas essas finalidades, serão eliminados ou anonimizados quando
              cabível, observadas as hipóteses legais de conservação.
            </p>
          </div>

          <div>
            <h2 className="text-xl text-foreground">7. Segurança</h2>
            <p className="mt-2">
              Adotamos medidas técnicas e administrativas proporcionais à operação para reduzir
              riscos de acesso não autorizado, perda, alteração ou divulgação indevida dos dados. O
              acesso aos pedidos e relatórios será restrito à responsável e aos prestadores técnicos
              necessários. Nenhum ambiente digital é inteiramente livre de riscos.
            </p>
          </div>

          <div>
            <h2 className="text-xl text-foreground">8. Seus direitos</h2>
            <p className="mt-2">
              Você pode solicitar informações sobre o tratamento dos seus dados e exercer os
              direitos previstos na Lei Geral de Proteção de Dados Pessoais (LGPD), conforme
              aplicáveis ao caso, incluindo confirmação de tratamento, acesso, correção, eliminação
              e informações sobre compartilhamento. Envie sua solicitação para
              exaltadavenus@gmail.com. Poderemos solicitar informações necessárias para verificar a
              identidade de quem faz o pedido.
            </p>
          </div>

          <div>
            <h2 className="text-xl text-foreground">9. Alterações desta política</h2>
            <p className="mt-2">
              Esta Política poderá ser atualizada para refletir mudanças na operação ou nas
              exigências legais. A versão vigente estará disponível no site, com a data de
              atualização.
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
