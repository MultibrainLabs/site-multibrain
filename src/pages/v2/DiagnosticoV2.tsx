import { FormEvent, useState } from "react";
import V2Layout from "./V2Layout";
import Faq from "./Faq";
import { CASES, whatsapp } from "./content";

const DORES = [
  "O crescimento travou e não sei onde está o gargalo.",
  "Meu time vive de planilha e retrabalho.",
  "Pago caro em softwares que não se conversam.",
  "Não tenho visão clara dos números do negócio.",
  "Sei que preciso de IA, mas não sei por onde começar.",
  "Tenho uma ideia de novo negócio digital e não sei como tirar do papel.",
];

const LEVELS = [
  {
    tag: "01 · Estratégico",
    title: "Onde a tecnologia gera vantagem",
    lead: "A visão de para onde levar o negócio.",
    items: ["Prioridades de negócio x tecnologia", "Oportunidades de novas receitas e produtos digitais", "Onde a IA faz sentido (e onde não faz)"],
    highlight: true,
  },
  {
    tag: "02 · Tático",
    title: "O caminho dos próximos meses",
    lead: "O plano para sair do diagnóstico e chegar ao resultado.",
    items: ["O que construir, comprar ou automatizar", "Roadmap com etapas e prazos", "Investimento estimado e indicadores de sucesso"],
  },
  {
    tag: "03 · Operacional",
    title: "O que dá para fazer já",
    lead: "Ganhos rápidos para aplicar na próxima semana.",
    items: ["Processos que podem ser automatizados", "Ferramentas e integrações recomendadas", "Quem faz o quê na sua equipe"],
  },
];

const STEPS = [
  ["Você responde 5 perguntas", "Um formulário rápido para chegarmos na reunião já entendendo o seu contexto."],
  ["Reunião de 60 minutos", "Você apresenta as dores. Nós fazemos as perguntas certas e desenhamos as soluções ao vivo."],
  ["Você recebe o mapa de soluções", "Um documento com os três níveis de resposta, entregue em até [X] dias úteis."],
];

const FAQ = [
  { q: "O diagnóstico é gratuito?", a: "[Confirmar: gratuito ou pago, e se o valor é abatido em caso de contratação.]" },
  { q: "É uma reunião de vendas disfarçada?", a: "Não. O foco é o seu problema. Se fizer sentido trabalharmos juntos, apresentamos uma proposta depois, e só se você pedir." },
  { q: "Quem da minha empresa deve participar?", a: "Quem decide e quem conhece a operação. Geralmente o dono ou diretor e um gestor da área com mais dor." },
  { q: "Minhas informações ficam seguras?", a: "Sim. Tudo o que você compartilhar é confidencial, e assinamos NDA se preferir." },
  { q: "Atendem empresas de qual porte e setor?", a: "De pequenas e médias empresas a grandes corporações, em setores como educação, construção, varejo, serviços e setor público." },
];

const SIZES = ["Até 10", "11 a 50", "51 a 200", "Mais de 200"];

const DiagnosticoForm = () => {
  const [sent, setSent] = useState(false);

  // Sem backend por enquanto: o formulário monta uma mensagem e abre o WhatsApp do time.
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const msg = [
      "Olá! Quero agendar o Diagnóstico Estratégico.",
      `Nome: ${f.get("nome")}`,
      `Empresa e cargo: ${f.get("empresa")}`,
      `WhatsApp: ${f.get("whatsapp")}`,
      `Colaboradores: ${f.get("porte")}`,
      `Maior problema hoje: ${f.get("problema")}`,
    ].join("\n");
    window.open(whatsapp(msg), "_blank", "noopener,noreferrer");
    setSent(true);
  };

  return (
    <form className="v2-card v2-form" onSubmit={onSubmit} style={{ flex: "1 1 460px" }}>
      <label className="v2-field">Nome<input name="nome" type="text" autoComplete="name" required /></label>
      <label className="v2-field">Empresa e cargo<input name="empresa" type="text" autoComplete="organization" required /></label>
      <label className="v2-field">WhatsApp<input name="whatsapp" type="tel" autoComplete="tel" required /></label>
      <label className="v2-field">
        Número de colaboradores
        <select name="porte" defaultValue={SIZES[0]}>
          {SIZES.map((s) => <option key={s}>{s}</option>)}
        </select>
      </label>
      <label className="v2-field">
        Qual é o maior problema da sua empresa hoje?
        <textarea name="problema" rows={4} required />
      </label>
      <button type="submit" className="v2-btn v2-btn--primary v2-btn--lg">Quero meu diagnóstico</button>
      {sent && (
        <p className="v2-small" role="status">
          Abrimos o WhatsApp com suas respostas. É só enviar a mensagem para confirmar.
        </p>
      )}
    </form>
  );
};

const DiagnosticoV2 = () => (
  <V2Layout
    title="Multibrain — Diagnóstico Estratégico"
    description="Traga os problemas da sua empresa e saia com um plano para resolvê-los com tecnologia e inovação, nos níveis estratégico, tático e operacional."
    ctaLabel="Agendar diagnóstico"
    ctaHref="#agendar"
  >
    {/* HERO */}
    <section className="v2-wrap" style={{ padding: "88px 24px 96px" }}>
      <span className="v2-pill">Diagnóstico Estratégico</span>
      <h1 className="v2-h1" style={{ fontSize: "clamp(40px, 5.6vw, 72px)", lineHeight: 1.03, maxWidth: 960 }}>
        Traga os problemas da sua empresa. <span className="v2-hl">Saia com um plano para resolvê-los.</span>
      </h1>
      <p className="v2-lead" style={{ fontSize: 20, maxWidth: 720, marginTop: 28 }}>
        Uma reunião com executivos de tecnologia e negócios. Você apresenta as dores atuais e nós mostramos como
        resolvê-las com tecnologia e inovação, nos níveis estratégico, tático e operacional.
      </p>
      <div className="v2-actions">
        <a href="#agendar" className="v2-btn v2-btn--primary v2-btn--lg">Quero meu diagnóstico</a>
        <span className="v2-small">60 minutos · online ou presencial · confidencial</span>
      </div>
    </section>

    {/* WHAT YOU BRING */}
    <section className="v2-band">
      <div className="v2-wrap v2-section--tight">
        <p className="v2-eyebrow">O que você traz</p>
        <h2 className="v2-h2">As dores que tiram o seu sono. Sem filtro.</h2>
        <div className="v2-quotes">
          {DORES.map((d) => <div className="v2-quote" key={d}>"{d}"</div>)}
        </div>
      </div>
    </section>

    {/* WHAT YOU TAKE */}
    <section className="v2-wrap v2-section">
      <p className="v2-eyebrow">O que você leva</p>
      <h2 className="v2-h2">Cada problema respondido em três níveis.</h2>
      <div className="v2-grid" style={{ marginTop: 48 }}>
        {LEVELS.map((l) => (
          <article
            key={l.tag}
            className={`v2-card v2-card--col ${l.highlight ? "v2-card--deep" : ""}`}
            style={l.highlight ? { borderColor: "var(--v2-accent)" } : undefined}
          >
            <div className="v2-num v2-num--accent" style={{ fontSize: 13 }}>{l.tag.toUpperCase()}</div>
            <h3 className="v2-h3" style={{ fontSize: 24 }}>{l.title}</h3>
            <p className="v2-body">{l.lead}</p>
            <ul className="v2-list">{l.items.map((i) => <li key={i}>{i}</li>)}</ul>
          </article>
        ))}
      </div>
    </section>

    {/* HOW */}
    <section style={{ borderTop: "1px solid var(--v2-line)" }}>
      <div className="v2-wrap v2-section">
        <p className="v2-eyebrow">Como funciona</p>
        <h2 className="v2-h2">Três passos, sem enrolação.</h2>
        <ol className="v2-steps" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 280px), 1fr))" }}>
          {STEPS.map(([t, d], i) => (
            <li className="v2-step" key={t}>
              <div className="v2-num">{String(i + 1).padStart(2, "0")}</div>
              <h3>{t}</h3>
              <p className="v2-body">{d}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>

    {/* WHO + PROOF */}
    <section className="v2-band v2-band--deep">
      <div className="v2-wrap v2-section">
        <div className="v2-split v2-split--top">
          <div>
            <p className="v2-eyebrow">Quem conduz</p>
            <h2 className="v2-h2" style={{ fontSize: "clamp(28px, 3.2vw, 40px)", lineHeight: 1.15 }}>
              Executivos que já operaram tecnologia em grandes empresas.
            </h2>
            <p className="v2-body" style={{ marginTop: 20, fontSize: 17, lineHeight: 1.7 }}>
              Mais de 20 anos em multinacionais, liderando produto, desenvolvimento, cloud e operações. Hoje construímos e
              operamos nossos próprios produtos, então falamos do que funciona na prática.
            </p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {[
              [CASES.qtok.value, "para cadastrar 1.000 produtos em um e-commerce com IA (vs. 250 h manual)."],
              ["−99,7%", "de horas-homem em RH: holerites de 1.000+ colaboradores casados pela IA."],
              [CASES.ensino.value, "sob gestão com governança em uma grande rede de ensino."],
              ["445 clientes", "ativos nas nossas plataformas."],
            ].map(([v, t]) => (
              <div className="v2-card v2-card--flat" key={v} style={{ borderColor: "var(--v2-line-strong)", padding: 24 }}>
                <div style={{ fontSize: 32, fontWeight: 700 }}>{v}</div>
                <p className="v2-body" style={{ marginTop: 6 }}>{t}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>

    {/* FORM */}
    <section id="agendar" className="v2-wrap v2-section">
      <div className="v2-split v2-split--top">
        <div style={{ flex: "1 1 380px" }}>
          <h2 className="v2-h2" style={{ fontSize: "clamp(30px, 3.6vw, 46px)", lineHeight: 1.08 }}>
            Agende seu Diagnóstico Estratégico.
          </h2>
          <p className="v2-lead" style={{ fontSize: 18, marginTop: 18 }}>
            Você sai da reunião com clareza sobre o que fazer, mesmo que decida não contratar a gente.
          </p>
          <p className="v2-small" style={{ marginTop: 18, color: "var(--v2-low)", fontSize: 15 }}>
            Vagas limitadas por semana. Assinamos acordo de confidencialidade se você preferir.
          </p>
        </div>
        <DiagnosticoForm />
      </div>
    </section>

    <Faq items={FAQ} />
  </V2Layout>
);

export default DiagnosticoV2;
