import { createFileRoute } from "@tanstack/react-router";
import { useRef, useState, type FormEvent } from "react";
import stars from "@/assets/stars.jpg";
import { registrarPedido } from "@/lib/pedidos.functions";

// Mantenha em sincronia com "version" em package.json.
const SITE_VERSION = "1.3.2";

// Número de destino dos pedidos (formato internacional, só dígitos).
// Trocar aqui quando migrar para o número da Luciana.
const WHATSAPP_NUMERO = "5511988592179";

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
    titulo: "Preencha o formulário",
    texto: "Envie seus dados de nascimento e conte o que você busca nesta leitura.",
  },
  {
    titulo: "Confirme o pagamento",
    texto: "Entro em contato pelo WhatsApp com as formas de pagamento e agendamos a consulta.",
  },
  {
    titulo: "Faço sua leitura à mão",
    texto: "Nada é gerado automaticamente: eu estudo o seu mapa e escrevo a interpretação.",
  },
  {
    titulo: "Você recebe o material",
    texto: "Envio o material completo e conversamos ao vivo para tirar todas as dúvidas.",
  },
];

function Index() {
  const [enviado, setEnviado] = useState(false);
  const [horaDesconhecida, setHoraDesconhecida] = useState(false);
  const [nome, setNome] = useState("");
  const [linkWhatsapp, setLinkWhatsapp] = useState("");
  const [registroFalhou, setRegistroFalhou] = useState(false);
  const [erroEnvio, setErroEnvio] = useState(false);
  const enviandoRef = useRef(false);
  const [enviando, setEnviando] = useState(false);

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
    enviandoRef.current = true;
    setEnviando(true);
    setRegistroFalhou(false);
    setErroEnvio(false);

    const janelaWhatsapp = window.open("", "_blank");

    try {
      const pedido = {
        nome: String(dados.get("nome") || "").trim(),
        genero: String(dados.get("genero") || "").trim(),
        email: String(dados.get("email") || "").trim(),
        whatsapp: String(dados.get("whatsapp") || "").trim(),
        nascimento: String(dados.get("nascimento") || "").trim(),
        hora: horaDesconhecida ? null : String(dados.get("hora") || "").trim(),
        cidade: String(dados.get("cidade") || "").trim(),
        estado: String(dados.get("estado") || "").trim(),
        tipo: String(dados.get("tipo") || "").trim(),
        mensagem: String(dados.get("mensagem") || "").trim(),
        enviadoEm: new Date().toISOString(),
      };

      // Salva no banco (Lovable Cloud) para ter um registro confiável do pedido.
      try {
        await registrarPedido({ data: pedido });
      } catch {
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

      const url = `https://wa.me/${WHATSAPP_NUMERO}?text=${encodeURIComponent(mensagemWhatsapp)}`;
      setLinkWhatsapp(url);
      if (janelaWhatsapp) {
        janelaWhatsapp.location.href = url;
      }

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

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <p className="absolute left-3 top-3 text-[10px] text-gold/80">v{SITE_VERSION}</p>
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-10 bg-cover bg-center opacity-40"
        style={{ backgroundImage: `url(${stars})` }}
      />

      {/* Hero */}
      <header className="mx-auto flex min-h-[92vh] max-w-3xl flex-col items-center justify-center px-6 py-20 text-center">
        <p className="eyebrow">Astrologia · leituras autorais</p>
        <h1 className="mt-6 text-5xl leading-[1.05] sm:text-7xl">
          <span className="text-gradient-gold">exaltavenus</span>
        </h1>
        <p className="mx-auto mt-6 max-w-xl font-display text-xl italic leading-relaxed text-foreground/90 sm:text-2xl">
          O céu do instante em que você nasceu guarda um mapa. Ler esse mapa é começar a se
          reconhecer.
        </p>
        <p className="mt-5 max-w-md text-sm leading-relaxed text-muted-foreground">
          Cada leitura é interpretada à mão, uma a uma. Nada de textos automáticos: é o seu mapa,
          estudado com tempo e atenção.
        </p>
        <a
          href="#formulario"
          className="mt-10 inline-flex items-center justify-center rounded-full bg-gradient-to-r from-gold-soft to-gold px-9 py-3.5 text-sm font-medium tracking-wide text-primary-foreground shadow-[var(--shadow-halo)] transition-transform hover:scale-[1.03]"
        >
          Quero meu mapa
        </a>
      </header>

      {/* Sobre */}
      <section className="mx-auto max-w-3xl px-6 py-16">
        <p className="eyebrow">Sobre</p>
        <h2 className="mt-3 text-3xl sm:text-4xl">Quem lê o seu mapa</h2>
        <div className="mt-6 space-y-4 text-[15px] leading-relaxed text-muted-foreground">
          <p>
            [Texto de exemplo — substitua pelo seu.] Sou astróloga e estudo o céu há alguns anos,
            com formação em astrologia tradicional e contemporânea. Meu trabalho nasce da vontade de
            traduzir o simbolismo dos astros em algo concreto, que caiba na vida real de quem me
            procura.
          </p>
          <p>
            Não trabalho com relatórios prontos nem com interpretações geradas por programas. Cada
            mapa é calculado, estudado e escrito por mim, respeitando a história de quem está do
            outro lado. Por isso atendo poucas pessoas por vez.
          </p>
          <p className="text-foreground/80">
            — Astróloga responsável, <span className="text-gold">@exaltavenus</span>
          </p>
        </div>
      </section>

      {/* Serviços */}
      <section className="mx-auto max-w-5xl px-6 py-16">
        <p className="eyebrow">Serviços</p>
        <h2 className="mt-3 text-3xl sm:text-4xl">Tipos de leitura</h2>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {servicos.map((s) => (
            <article
              key={s.nome}
              className={`panel flex flex-col rounded-xl p-6 ${
                s.destaque ? "border-gold/60 shadow-[var(--shadow-halo)]" : ""
              }`}
            >
              {s.destaque && (
                <span className="mb-3 w-fit rounded-full border border-gold/50 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-gold">
                  Mais pedido
                </span>
              )}
              <h3 className="text-2xl">{s.nome}</h3>
              <p className="mt-2 font-display text-xl text-gold">{s.preco}</p>
              <p className="mt-4 flex-1 text-sm leading-relaxed text-muted-foreground">
                {s.descricao}
              </p>
              <a
                href="#formulario"
                className="mt-6 inline-flex w-fit items-center text-sm tracking-wide text-gold underline-offset-4 hover:underline"
              >
                Solicitar leitura →
              </a>
            </article>
          ))}
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

      {/* Formulário */}
      <section id="formulario" className="mx-auto max-w-2xl scroll-mt-8 px-6 py-16">
        <p className="eyebrow">Solicitação</p>
        <h2 className="mt-3 text-3xl sm:text-4xl">Peça sua leitura</h2>

        {enviado ? (
          <div className="panel mt-8 rounded-xl p-8 text-center" role="status" aria-live="polite">
            <p className="font-display text-3xl text-gold">
              Recebi seu pedido{nome ? `, ${nome}` : ""}!
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
                maxLength={120}
                className={inputClass}
                placeholder="Como está no documento"
              />
            </div>

            <div>
              <label className={labelClass} htmlFor="genero">
                Gênero (opcional)
              </label>
              <select
                id="genero"
                name="genero"
                defaultValue="Prefiro não informar"
                className={inputClass}
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
              com você sobre o pedido. Ao continuar, eles serão enviados ao WhatsApp informado.
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
                className={inputClass}
                placeholder="voce@email.com"
                aria-describedby="dados-aviso"
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
                  maxLength={80}
                  className={inputClass}
                  placeholder="São Paulo"
                />
              </div>
              <div>
                <label className={labelClass} htmlFor="estado">
                  Estado
                </label>
                <input
                  id="estado"
                  name="estado"
                  required
                  maxLength={40}
                  className={inputClass}
                  placeholder="SP"
                />
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
              />
            </div>

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
