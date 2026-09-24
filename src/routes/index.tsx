import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState, type FormEvent } from "react";
import stars from "@/assets/stars.jpg";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { UFS, validarPedido, type ErroValidacao } from "@/lib/pedido-schema";
import { registrarPedido } from "@/lib/pedidos.functions";

// Mantenha em sincronia com "version" em package.json.
const SITE_VERSION = "1.5.2";

// Número de destino dos pedidos (formato internacional, só dígitos).
// Trocar aqui quando migrar para o número da Luciana.
const WHATSAPP_NUMERO = "5511991164433";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "exaltavenus | Mapa astral personalizado, feito à mão" },
      {
        name: "description",
        content:
          "Leituras de mapa astral interpretadas à mão, uma a uma. Solicite seu Mapa Astral Completo com a astróloga do @exaltavenus.",
      },
      {
        property: "og:title",
        content: "exaltavenus | Mapa astral personalizado, feito à mão",
      },
      {
        property: "og:description",
        content:
          "Leituras de mapa astral interpretadas à mão, uma a uma. Solicite a sua com a astróloga do @exaltavenus.",
      },
      { property: "og:url", content: "https://exaltavenus.lovable.app/" },
      { property: "og:image", content: "https://exaltavenus.lovable.app/og-image.jpg" },
      { name: "twitter:title", content: "exaltavenus | Mapa astral personalizado, feito à mão" },
      {
        name: "twitter:description",
        content:
          "Leituras de mapa astral interpretadas à mão, uma a uma. Solicite a sua com a astróloga do @exaltavenus.",
      },
      { name: "twitter:image", content: "https://exaltavenus.lovable.app/og-image.jpg" },
    ],
    links: [{ rel: "canonical", href: "https://exaltavenus.lovable.app/" }],
  }),
  component: Index,
});

const servicos = [
  {
    nome: "Caminho de Marte",
    preco: "Valor a definir",
    descricao:
      "A cada dois anos, Marte volta à posição exata em que estava quando você nasceu. Esse retorno abre um novo ciclo e mostra qual área da sua vida entra em movimento. Leitura personalizada do seu ciclo de Marte, com os marcos do período.",
    destaque: true,
  },
  {
    nome: "Mapa Astral Completo",
    preco: "R$ 300",
    descricao:
      "Leitura completa do seu mapa natal: Sol, Lua, Ascendente, casas, planetas e aspectos. Você recebe o material interpretado à mão e uma consulta ao vivo para conversarmos sobre ele.",
    destaque: false,
  },
  {
    nome: "Revolução Solar",
    preco: "Valor a definir",
    descricao:
      "A leitura do seu ano astrológico, de aniversário a aniversário: os temas em destaque, os ciclos que se abrem e os melhores momentos para agir.",
    destaque: false,
  },
  {
    nome: "Sinastria / Mapa do Casal",
    preco: "Valor a definir",
    descricao:
      "A comparação entre dois mapas: encontros, atritos e potenciais da relação. Ideal para casais e também para parcerias de trabalho.",
    destaque: false,
  },
];

const passos = [
  {
    titulo: "Escolha sua leitura",
    texto:
      "Solicite seu Mapa Natal e preencha os dados de nascimento necessários para a análise.",
  },
  {
    titulo: "Confirme sua compra",
    texto:
      "Faça o pagamento por Pix. Após a confirmação, entrarei em contato para confirmar o recebimento do pedido e o início da elaboração do seu relatório.",
  },
  {
    titulo: "Receba seu relatório",
    texto:
      "Seu mapa será analisado individualmente e você receberá o relatório em PDF, em até 7 dias úteis, por e-mail, WhatsApp ou ambos, conforme sua preferência.",
  },
  {
    titulo: "Se quiser, podemos conversar",
    texto:
      "Depois de receber o relatório, você poderá contratar um atendimento individual para esclarecer dúvidas e aprofundar os temas que mais despertaram seu interesse.",
  },
];

const perguntasFrequentes = [
  {
    pergunta: "Preciso entender de astrologia para aproveitar a leitura?",
    resposta:
      "Não. O relatório é escrito em linguagem clara e acessível, mesmo para quem nunca teve contato com a astrologia. Os conceitos astrológicos são apresentados de forma contextualizada, para que você possa compreender a interpretação e relacioná-la às suas próprias experiências.",
  },
  {
    pergunta: "Quais informações preciso fornecer?",
    resposta:
      "Seu nome, data, horário e cidade de nascimento, além de um contato, WhatsApp ou e-mail, para que eu possa confirmar seu pedido e encaminhar o relatório. Essas informações são necessárias para calcular e interpretar seu mapa natal e realizar a entrega.",
  },
  {
    pergunta: "E se eu não souber meu horário de nascimento?",
    resposta:
      "O horário é essencial para determinar o Ascendente e a posição das casas astrológicas, elementos importantes da análise. Por isso, não realizo a leitura sem essa informação. Se você não souber seu horário, vale consultar sua certidão de nascimento ou buscar essa informação com familiares. Existem também astrólogos especializados em retificação do horário de nascimento, serviço que não ofereço atualmente.",
  },
  {
    pergunta: "Como receberei meu relatório?",
    resposta:
      "Você receberá um arquivo PDF por e-mail, WhatsApp ou ambos, conforme sua preferência informada no momento da compra.",
  },
  {
    pergunta: "Qual é o prazo de entrega?",
    resposta:
      "O relatório será entregue em até 7 dias úteis, contados a partir da confirmação do pagamento e do recebimento de todos os dados necessários.",
  },
  {
    pergunta: "O relatório inclui previsões sobre o futuro?",
    resposta:
      "Não. A leitura do Mapa Natal tem uma abordagem voltada ao autoconhecimento. Ela explora características da personalidade, desafios, recursos e possibilidades de desenvolvimento, sem prever acontecimentos futuros.",
  },
  {
    pergunta: "O atendimento individual está incluído no valor do relatório?",
    resposta:
      "Não. O relatório é um produto independente. Após recebê-lo, você poderá contratar um atendimento individual de 1h30, presencial ou virtual, para esclarecer dúvidas ou aprofundar temas específicos. O atendimento é opcional e custa R$ 220,00.",
  },
  {
    pergunta: "Como faço o pagamento?",
    resposta:
      "O pagamento é realizado por Pix, após o preenchimento dos dados necessários para a elaboração do relatório. Seu pedido será confirmado após a identificação do pagamento.",
  },
];

function Index() {
  const [enviado, setEnviado] = useState(false);
  const [horaDesconhecida, setHoraDesconhecida] = useState(false);
  const [nome, setNome] = useState("");
  const [linkWhatsapp, setLinkWhatsapp] = useState("");
  const [registroFalhou, setRegistroFalhou] = useState(false);
  const [erroEnvio, setErroEnvio] = useState(false);
  const [errosValidacao, setErrosValidacao] = useState<ErroValidacao[]>([]);
  const enviandoRef = useRef(false);
  const [enviando, setEnviando] = useState(false);

  useEffect(() => {
    const primeiroCampo = errosValidacao.find((erro) => erro.campo)?.campo;
    if (!primeiroCampo) return;

    const campo = document.getElementById(primeiroCampo);
    if (!(campo instanceof HTMLElement)) return;

    requestAnimationFrame(() => {
      campo.scrollIntoView({ behavior: "smooth", block: "center" });
      campo.focus({ preventScroll: true });
    });
  }, [errosValidacao]);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const dados = new FormData(e.currentTarget);

    // Honeypot: campo invisível para humanos, mas preenchido por bots simples.
    if (String(dados.get("empresa") || "").trim() !== "") {
      return;
    }

    // Trava de submissão: o ref bloqueia um segundo disparo no mesmo tick,
    // caso em que o setState assíncrono ainda não teria atualizado `enviando`.
    if (enviandoRef.current) return;

    const pedido = {
      nome: String(dados.get("nome") || "").trim(),
      genero: String(dados.get("genero") || "").trim(),
      email: String(dados.get("email") || "").trim(),
      whatsapp: String(dados.get("whatsapp") || "").trim(),
      nascimento: String(dados.get("nascimento") || "").trim(),
      hora: horaDesconhecida ? null : String(dados.get("hora") || "").trim(),
      horaDesconhecida,
      cidade: String(dados.get("cidade") || "").trim(),
      estado: String(dados.get("estado") || "").trim(),
      tipo: String(dados.get("tipo") || "").trim(),
      mensagem: String(dados.get("mensagem") || "").trim(),
      enviadoEm: new Date().toISOString(),
    };

    // Valida com o mesmo schema do servidor, já sobre os valores com trim.
    // Pega o que o navegador deixa passar (ex.: campo só com espaços) e mostra
    // a mensagem do campo em vez de deixar o servidor recusar depois.
    const problemas = validarPedido(pedido);
    if (problemas.length > 0) {
      setErrosValidacao(problemas);
      return;
    }

    enviandoRef.current = true;
    setEnviando(true);
    setRegistroFalhou(false);
    setErroEnvio(false);
    setErrosValidacao([]);

    const janelaWhatsapp = window.open("", "_blank");

    try {
      // Salva no banco (Lovable Cloud) para ter um registro confiável do pedido.
      // O pedido só conta como registrado quando o servidor confirma `ok`.
      try {
        const resultado = await registrarPedido({ data: pedido });
        if (!resultado?.ok) {
          throw new Error("Registro do pedido não confirmado pelo servidor.");
        }
      } catch (err) {
        console.error("[pedidos] Falha ao registrar pedido:", err);
        setRegistroFalhou(true);
      }

      const mensagemWhatsapp = [
        "Olá! Vim pelo site e quero meu mapa astral.",
        "",
        `Nome: ${pedido.nome}`,
        `Gênero: ${pedido.genero}`,
        `E-mail: ${pedido.email}`,
        `WhatsApp: ${pedido.whatsapp}`,
        `Data de nascimento: ${pedido.nascimento}`,
        `Hora de nascimento: ${pedido.hora || "não sei a hora"}`,
        `Cidade/Estado: ${pedido.cidade} - ${pedido.estado}`,
        `Tipo de leitura: ${pedido.tipo}`,
        pedido.mensagem ? `Observações: ${pedido.mensagem}` : null,
      ]
        .filter((linha) => linha !== null)
        .join("\n");

      const url = `https://api.whatsapp.com/send?phone=${WHATSAPP_NUMERO}&text=${encodeURIComponent(mensagemWhatsapp)}`;
      setLinkWhatsapp(url);
      window.open(url, "_blank", "noopener,noreferrer");
      janelaWhatsapp?.close();

      setNome(pedido.nome.split(" ")[0] ?? "");
      setEnviado(true);
      window.scrollTo({
        top: document.getElementById("formulario")?.offsetTop ?? 0,
        behavior: "smooth",
      });
    } catch {
      janelaWhatsapp?.close();
      setErroEnvio(true);
    } finally {
      enviandoRef.current = false;
      setEnviando(false);
    }
  }

  const inputClass =
    "w-full rounded-md border border-input bg-secondary/50 px-3 py-2.5 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-gold focus:ring-1 focus:ring-ring";
  const labelClass = "mb-1.5 block text-xs uppercase tracking-[0.18em] text-muted-foreground";
  const campoComErro = (campo: string) =>
    errosValidacao.some((erro) => erro.campo === campo);

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <p className="absolute left-3 top-3 text-[10px] text-gold/80">v{SITE_VERSION}</p>
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-10 bg-cover bg-center opacity-70"
        style={{ backgroundImage: `url(${stars})` }}
      />

      {/* Hero */}
      <header className="mx-auto flex min-h-[70vh] max-w-3xl flex-col items-center justify-center px-6 py-16 text-center">
        <p className="text-gradient-gold text-xs font-medium uppercase tracking-[0.35em]">
          exaltavenus
        </p>
        <h1 className="mt-6 text-4xl leading-[1.1] sm:text-6xl">
          Seu mapa é único. Sua leitura também.
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-[15px] leading-relaxed text-muted-foreground">
          A astrologia oferece uma maneira de compreender quem somos, reconhecer nossos recursos e
          olhar com mais consciência para nossos caminhos de desenvolvimento. Na Exalta Venus, cada
          mapa é analisado individualmente, com profundidade e sensibilidade, e traduzido em uma
          linguagem clara, para que você possa reconhecer a sua própria história na leitura.
        </p>
        <a
          href="#formulario"
          className="mt-8 inline-flex w-fit items-center justify-center rounded-full bg-gradient-to-r from-gold-soft to-gold px-9 py-3.5 text-sm font-medium tracking-wide text-primary-foreground shadow-[var(--shadow-halo)] transition-transform hover:scale-[1.03]"
        >
          Conheça seu Mapa Natal
        </a>
      </header>

      {/* Mapa Natal */}
      <section className="mx-auto max-w-3xl px-6 py-16">
        <p className="eyebrow">Mapa Natal</p>
        <h2 className="mt-3 text-3xl sm:text-4xl">
          Um olhar sobre quem você é e sobre o que pode desenvolver.
        </h2>
        <div className="mt-6 space-y-4 text-[15px] leading-relaxed text-muted-foreground">
          <p>
            O mapa natal é um retrato simbólico do céu no momento do seu nascimento. Sua
            interpretação permite explorar características da personalidade, compreender padrões de
            comportamento e reconhecer recursos e desafios que fazem parte da sua maneira de viver.
          </p>
          <p>
            Nesta leitura, vamos além das características de cada signo. A análise considera as
            relações entre os diferentes elementos do seu mapa para construir uma visão integrada e
            individualizada.
          </p>
          <p>
            O resultado é um relatório que convida você a olhar para si com mais clareza, reconhecer
            suas potencialidades e refletir sobre seus próprios caminhos de desenvolvimento.
          </p>
        </div>
        <div className="panel mt-8 rounded-xl p-6 sm:p-8">
          <p className="text-[15px] leading-relaxed text-muted-foreground">
            <span className="text-foreground">O que você recebe:</span> um relatório individual em
            PDF, organizado em cinco seções: Seu mapa em poucas palavras; Suas energias primordiais;
            Sua personalidade; Seus desafios e recursos; Seus chamados de desenvolvimento.
          </p>
          <p className="mt-4 text-[15px] leading-relaxed text-muted-foreground">
            <span className="text-gold">Investimento:</span> R$ 220,00.{" "}
            <span className="text-gold">Prazo de entrega:</span> até 7 dias úteis.{" "}
            <span className="text-gold">Formato:</span> relatório escrito em PDF, enviado por
            e-mail, WhatsApp ou ambos. O atendimento individual para conversar sobre a leitura pode
            ser contratado separadamente.
          </p>
        </div>
      </section>

      {/* Sobre */}
      <section className="mx-auto max-w-3xl px-6 py-16">
        <p className="eyebrow">Sobre</p>
        <h2 className="mt-3 text-3xl sm:text-4xl">Quem lê o seu mapa</h2>
        <div className="mt-6 space-y-4 text-[15px] leading-relaxed text-muted-foreground">
          <p>
            Sou Luciana Cartaxo. Minha trajetória profissional começou com aulas de inglês depois do
            intercâmbio, passou por mais de vinte anos de carreira executiva em multinacionais e, ao
            longo do tempo, encontrou novos caminhos no estudo da filosofia e da astrologia.
          </p>
          <p>
            À primeira vista, são áreas bastante diferentes. Para mim, elas se encontram no interesse
            por compreender como as coisas funcionam, reconhecer padrões e estabelecer relações entre
            elementos que, isoladamente, nem sempre fazem sentido.
          </p>
          <p>
            Sempre gostei de investigar, organizar ideias e transformar complexidade em clareza. Na
            astrologia, encontrei uma linguagem especialmente rica para exercitar esse olhar sobre a
            experiência humana.
          </p>
          <p>
            Meu interesse pelo autoconhecimento também foi se transformando ao longo dos anos. Hoje,
            acredito menos na busca por uma versão ideal de nós mesmos e mais na possibilidade de
            compreender quem somos, reconhecer nossos recursos e fazer escolhas conscientes a partir
            da vida que estamos vivendo. É essa perspectiva que orienta meu trabalho.
          </p>
          <p>
            Cada mapa é analisado individualmente, com atenção às particularidades de sua configuração.
            Procuro integrar o conhecimento astrológico a uma interpretação clara, sensível e
            fundamentada, que ajude a reconhecer características, compreender tensões e identificar
            possibilidades de desenvolvimento.
          </p>
          <p>
            Não vejo o mapa como uma definição de quem alguém é ou de quem deverá se tornar. Vejo nele
            uma ferramenta de investigação e reflexão, capaz de ampliar nossa compreensão sobre nós
            mesmos.
          </p>
          <p>
            Meu propósito é oferecer uma leitura que faça sentido para quem a recebe, não apenas
            durante a leitura, mas também nos momentos em que a vida convida a olhar para si novamente.
          </p>
        </div>
      </section>

      {/* Como funciona */}
      <section className="mx-auto max-w-4xl px-6 py-16">
        <p className="eyebrow">Como funciona</p>
        <h2 className="mt-3 text-3xl sm:text-4xl">Do pedido à consulta</h2>
        <ol className="mt-10 grid gap-5 sm:grid-cols-2">
          {passos.map((p, i) => (
            <li key={p.titulo} className="panel rounded-xl p-6">
              <span className="font-display text-3xl text-gold/70">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-2 text-xl">{p.titulo}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.texto}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* Atendimento pós-relatório */}
      <section className="mx-auto max-w-3xl px-6 py-16">
        <p className="eyebrow">Atendimento pós-relatório</p>
        <h2 className="mt-3 text-3xl sm:text-4xl">Quer conversar sobre sua leitura?</h2>
        <div className="mt-6 space-y-4 text-[15px] leading-relaxed text-muted-foreground">
          <p>
            Seu relatório reúne uma análise individualizada do seu mapa natal. Mas algumas reflexões
            podem despertar novas perguntas ou trazer à tona temas que você gostaria de explorar com
            mais profundidade.
          </p>
          <p>
            Se sentir vontade de conversar sobre o que encontrou no seu mapa, podemos agendar um
            atendimento individual.
          </p>
          <p>
            Será um espaço para esclarecer dúvidas, aprofundar questões específicas e relacionar a
            interpretação astrológica às suas próprias experiências.
          </p>
        </div>
        <div className="panel mt-8 rounded-xl p-6 sm:p-8">
          <p className="text-[15px] leading-relaxed text-muted-foreground">
            <span className="text-foreground">Atendimento individual, R$ 220,00.</span>{" "}
            <span className="text-gold">Duração:</span> 1h30.{" "}
            <span className="text-gold">Modalidade:</span> presencial ou virtual. Contratação
            opcional, após o recebimento do relatório.
          </p>
        </div>
        <a
          href={`https://api.whatsapp.com/send?phone=${WHATSAPP_NUMERO}&text=${encodeURIComponent(
            "Olá, Luciana! Recebi meu relatório de Mapa Natal e gostaria de saber sobre o atendimento individual.",
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 inline-flex w-fit items-center justify-center rounded-full bg-gradient-to-r from-gold-soft to-gold px-9 py-3.5 text-sm font-medium tracking-wide text-primary-foreground shadow-[var(--shadow-halo)] transition-transform hover:scale-[1.03]"
        >
          Quero agendar uma conversa
        </a>
      </section>

      {/* Perguntas frequentes */}
      <section className="mx-auto max-w-3xl px-6 py-16">
        <p className="eyebrow">Perguntas frequentes</p>
        <h2 className="mt-3 text-3xl sm:text-4xl">Dúvidas comuns</h2>
        <Accordion type="single" collapsible className="panel mt-8 rounded-xl px-6 sm:px-8">
          {perguntasFrequentes.map((item, indice) => (
            <AccordionItem
              key={item.pergunta}
              value={`pergunta-${indice + 1}`}
              className="border-gold/20 last:border-b-0"
            >
              <AccordionTrigger className="py-5 text-left text-base text-foreground hover:text-gold hover:no-underline sm:text-lg">
                {item.pergunta}
              </AccordionTrigger>
              <AccordionContent className="pb-5 pr-6 text-sm leading-relaxed text-muted-foreground sm:text-[15px]">
                {item.resposta}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      {/* Formulário */}
      <section id="formulario" className="mx-auto max-w-2xl scroll-mt-8 px-6 py-16">
        <p className="eyebrow">Solicitação</p>
        <h2 className="mt-3 text-3xl sm:text-4xl">Peça sua leitura</h2>

        {enviado ? (
          <div className="panel mt-8 rounded-xl p-8 text-center" role="status" aria-live="polite">
            <p className="font-display text-3xl text-gold">
              {registroFalhou
                ? `Quase lá${nome ? `, ${nome}` : ""}!`
                : `Recebi seu pedido${nome ? `, ${nome}` : ""}!`}
            </p>
            {registroFalhou && (
              <p className="mt-4 text-sm leading-relaxed text-gold-soft">
                O pedido foi preparado, mas não consegui confirmar o registro. Envie a mensagem
                pelo WhatsApp para garantir o atendimento.
              </p>
            )}
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              {linkWhatsapp ? "Abrimos o WhatsApp para você enviar seu pedido. Se não abriu, " : ""}
              {linkWhatsapp && (
                <a
                  href={linkWhatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gold underline-offset-4 hover:underline"
                >
                  toque aqui
                </a>
              )}
            </p>
            <button
              type="button"
              onClick={() => setEnviado(false)}
              className="mt-6 text-sm text-gold underline-offset-4 hover:underline"
            >
              Enviar outra solicitação
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="panel mt-8 space-y-5 rounded-xl p-6 sm:p-8">
            {erroEnvio && (
              <p
                className="rounded-md border border-destructive/40 bg-destructive/10 p-3 text-sm text-destructive-foreground"
                role="alert"
              >
                Não foi possível preparar seu pedido. Confira os dados e tente novamente.
              </p>
            )}

            <div className="absolute -left-[9999px]" aria-hidden="true">
              <label htmlFor="empresa">Empresa</label>
              <input id="empresa" name="empresa" type="text" tabIndex={-1} autoComplete="off" />
            </div>

            <div>
              <label className={labelClass} htmlFor="nome">
                Nome completo
              </label>
              <input
                id="nome"
                name="nome"
                required
                minLength={3}
                maxLength={120}
                className={inputClass}
                placeholder="Como está no documento"
                aria-invalid={campoComErro("nome")}
              />
            </div>

            <div>
              <label className={labelClass} htmlFor="genero">
                Gênero
              </label>
              <select
                id="genero"
                name="genero"
                defaultValue="Prefiro não informar"
                className={inputClass}
                aria-invalid={campoComErro("genero")}
              >
                <option value="Prefiro não informar" className="bg-card">
                  Prefiro não informar
                </option>
                <option value="Não binário" className="bg-card">
                  Não binário
                </option>
                <option value="Outro" className="bg-card">
                  Outro
                </option>
                <option value="Masculino" className="bg-card">
                  Masculino
                </option>
                <option value="Feminino" className="bg-card">
                  Feminino
                </option>
              </select>
            </div>

            <p
              id="dados-aviso"
              className="rounded-md border border-gold/25 bg-secondary/40 p-3 text-xs leading-relaxed text-muted-foreground"
            >
              Usaremos seus dados de nascimento e contato apenas para preparar sua leitura e falar
              com você sobre o pedido. Ao continuar, eles serão registrados no sistema de
              atendimento e enviados ao WhatsApp informado. Consulte a{" "}
              <a href="#privacidade" className="text-gold underline-offset-4 hover:underline">
                política de privacidade
              </a>
              .
            </p>

            <div>
              <label className={labelClass} htmlFor="email">
                E-mail
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                maxLength={160}
                pattern="[^@\s]+@[^@\s]+\.[A-Za-z]{2,}"
                title="Informe um e-mail válido, com domínio completo (ex.: voce@email.com)."
                className={inputClass}
                placeholder="voce@email.com"
                aria-describedby="dados-aviso"
                aria-invalid={campoComErro("email")}
              />
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label className={labelClass} htmlFor="whatsapp">
                  WhatsApp
                </label>
                <input
                  id="whatsapp"
                  name="whatsapp"
                  required
                  maxLength={25}
                  className={inputClass}
                  placeholder="(11) 90000-0000"
                  aria-describedby="dados-aviso"
                  aria-invalid={campoComErro("whatsapp")}
                />
              </div>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label className={labelClass} htmlFor="nascimento">
                  Data de nascimento
                </label>
                <input
                  id="nascimento"
                  name="nascimento"
                  type="date"
                  required
                  className={inputClass}
                  aria-invalid={campoComErro("nascimento")}
                />
              </div>
              <div>
                <label className={labelClass} htmlFor="hora">
                  Hora exata de nascimento
                </label>
                <input
                  id="hora"
                  name="hora"
                  type="time"
                  required={!horaDesconhecida}
                  disabled={horaDesconhecida}
                  className={`${inputClass} disabled:opacity-40`}
                  aria-invalid={campoComErro("hora")}
                />
              </div>
            </div>

            <label className="flex items-start gap-2 text-sm text-muted-foreground">
              <input
                type="checkbox"
                name="horaDesconhecida"
                checked={horaDesconhecida}
                onChange={(e) => setHoraDesconhecida(e.target.checked)}
                className="mt-1 h-4 w-4 accent-[var(--gold)]"
              />
              Não sei a hora exata do meu nascimento
            </label>
            <p className="rounded-md border border-gold/25 bg-secondary/40 p-3 text-xs leading-relaxed text-muted-foreground">
              ✦ A hora exata é essencial para a precisão do mapa: ela define o Ascendente e as
              casas. Você encontra esse dado na certidão de nascimento ou na declaração de nascido
              vivo do hospital. Se não souber, seguimos com uma leitura adaptada.
            </p>

            <div className="grid gap-5 sm:grid-cols-[minmax(0,1fr)_120px]">
              <div className="min-w-0">
                <label className={labelClass} htmlFor="cidade">
                  Cidade de nascimento
                </label>
                <input
                  id="cidade"
                  name="cidade"
                  required
                  minLength={2}
                  maxLength={80}
                  className={inputClass}
                  placeholder="São Paulo"
                  aria-invalid={campoComErro("cidade")}
                />
              </div>
              <div>
                <label className={labelClass} htmlFor="estado">
                  Estado
                </label>
                <select
                  id="estado"
                  name="estado"
                  required
                  defaultValue=""
                  className={inputClass}
                  aria-invalid={campoComErro("estado")}
                >
                  <option value="" disabled className="bg-card">
                    UF
                  </option>
                  {UFS.map((uf) => (
                    <option key={uf} value={uf} className="bg-card">
                      {uf}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className={labelClass} htmlFor="tipo">
                Tipo de leitura desejada
              </label>
              <select
                id="tipo"
                name="tipo"
                required
                defaultValue="Mapa Astral Completo"
                className={inputClass}
                aria-invalid={campoComErro("tipo")}
              >
                {servicos.map((s) => (
                  <option key={s.nome} value={s.nome} className="bg-card">
                    {s.nome}
                  </option>
                ))}
                <option value="Ainda não sei" className="bg-card">
                  Ainda não sei
                </option>
              </select>
            </div>

            <div>
              <label className={labelClass} htmlFor="mensagem">
                O que você busca nesta leitura?
              </label>
              <textarea
                id="mensagem"
                name="mensagem"
                rows={4}
                maxLength={1000}
                className={inputClass}
                placeholder="Conte um pouco do seu momento, dúvidas ou temas que gostaria de olhar com mais cuidado."
                aria-invalid={campoComErro("mensagem")}
              />
            </div>

            <label className="flex items-start gap-2 text-sm leading-relaxed text-muted-foreground">
              <input
                type="checkbox"
                name="consentimento"
                required
                className="mt-1 h-4 w-4 accent-[var(--gold)]"
              />
              <span>
                Li e concordo com a{" "}
                <a href="#privacidade" className="text-gold underline-offset-4 hover:underline">
                  política de privacidade
                </a>
                .
              </span>
            </label>

            {errosValidacao.length > 0 && (
              <div
                className="rounded-md border border-destructive/40 bg-destructive/10 p-3 text-sm text-destructive-foreground"
                role="alert"
              >
                <p>Confira estes pontos antes de enviar:</p>
                <ul className="mt-2 list-disc space-y-1 pl-5">
                  {errosValidacao.map((erro, index) => (
                    <li key={`${erro.campo ?? "form"}-${index}`}>{erro.mensagem}</li>
                  ))}
                </ul>
              </div>
            )}

            <button
              type="submit"
              disabled={enviando}
              className="w-full rounded-full bg-gradient-to-r from-gold-soft to-gold px-8 py-3.5 text-sm font-medium tracking-wide text-primary-foreground shadow-[var(--shadow-halo)] transition-transform hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-60"
            >
              Enviar solicitação
            </button>
          </form>
        )}
      </section>

      {/* Privacidade */}
      <section id="privacidade" className="mx-auto max-w-3xl scroll-mt-8 px-6 py-16">
        <p className="eyebrow">Privacidade</p>
        <h2 className="mt-3 text-3xl sm:text-4xl">Como cuidamos dos seus dados</h2>
        <div className="mt-6 space-y-5 text-sm leading-relaxed text-muted-foreground">
          <div>
            <h3 className="text-xl text-foreground">Quais dados coletamos</h3>
            <p className="mt-2">
              Coletamos os dados que você informa no formulário: nome, contato, data e local de
              nascimento, horário de nascimento, tipo de leitura e observações sobre o seu pedido.
            </p>
          </div>
          <div>
            <h3 className="text-xl text-foreground">Para que usamos</h3>
            <p className="mt-2">
              Usamos essas informações para entender sua solicitação, preparar a leitura, entrar
              em contato e enviar a mensagem inicial pelo WhatsApp. Não usamos os dados para venda
              de listas ou publicidade de terceiros.
            </p>
          </div>
          <div>
            <h3 className="text-xl text-foreground">Onde os dados ficam</h3>
            <p className="mt-2">
              O pedido é enviado ao Supabase/Lovable Cloud para registro interno e os dados
              necessários ao atendimento são compartilhados com o WhatsApp quando você prossegue
              pelo botão de contato. O acesso ao registro é restrito à operação da exaltavenus.
            </p>
          </div>
          <div>
            <h3 className="text-xl text-foreground">Retenção e seus direitos</h3>
            <p className="mt-2">
              Mantemos os dados pelo tempo necessário para atender o pedido e cumprir obrigações
              aplicáveis. Você pode solicitar confirmação de uso, acesso, correção ou exclusão dos
              seus dados entrando em contato pelo Instagram{" "}
              <a
                href="https://instagram.com/exaltavenus"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gold underline-offset-4 hover:underline"
              >
                @exaltavenus
              </a>
              .
            </p>
          </div>
          <p className="text-xs text-muted-foreground/80">
            Esta política pode ser atualizada quando houver mudanças no atendimento, nas ferramentas
            utilizadas ou nas exigências legais aplicáveis.
          </p>
        </div>
      </section>

      {/* Rodapé */}
      <footer className="mt-10 border-t border-border/60 px-6 py-10 text-center">
        <p className="font-display text-2xl text-gradient-gold">exaltavenus</p>
        <a
          href="https://instagram.com/exaltavenus"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 inline-block text-sm tracking-wide text-muted-foreground underline-offset-4 hover:text-gold hover:underline"
        >
          @exaltavenus no Instagram
        </a>
        <p className="mt-4 text-xs text-muted-foreground/70">
          Leituras astrológicas feitas à mão · Todos os direitos reservados
        </p>
      </footer>
    </div>
  );
}
