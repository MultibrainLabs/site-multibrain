import V2Layout, { SmartLink } from "./V2Layout";
import { CASES, PLATFORM_SOURCE, PLATFORM_STATS, PORTFOLIO_DOMAINS, PRODUCTS, scheduleLink, whatsapp } from "./content";

const SCHEDULE = scheduleLink("Olá! Quero agendar um diagnóstico gratuito com a Multibrain.");

const SOLUTIONS = [
  {
    title: "Sistemas sob medida",
    desc: "Transformamos processos que rodam em planilha, papel ou WhatsApp em sistemas próprios — com escopo fechado e prazo definido.",
    items: ["Diagnóstico do processo", "MVP em ciclos curtos", "Integração com o que você já usa"],
  },
  {
    title: "Automação e agentes de IA",
    desc: "Tarefas repetitivas que rodam sozinhas: IA que lê documentos, cruza dados, gera conteúdo e prepara a decisão para o seu time aprovar.",
    items: ["Leitura e conferência de documentos em massa", "Geração de imagens e catálogo com IA", "Revisão humana onde a IA não tem certeza"],
  },
  {
    title: "Produtos SaaS prontos",
    desc: "Plataformas próprias já em produção para atendimento, obras, licitações e infraestrutura. Assine e comece a usar.",
    items: ["Implantação rápida", "Opção white-label", "Suporte do time que construiu"],
  },
  {
    title: "Infraestrutura gerenciada",
    desc: "Servidores, deploy e manutenção das suas aplicações em qualquer nuvem ou servidor local — você usa, nós operamos.",
    items: ["AWS, Azure, GCP, OCI e VMware", "Monitoramento e backups", "Escala sob demanda"],
  },
  {
    title: "Outsourcing",
    desc: "Profissionais e squads de tecnologia alocados no seu projeto, com a gestão e o padrão de entrega da Multibrain.",
    items: ["Desenvolvimento, QA, DevOps e cloud", "Squads completos ou profissionais avulsos", "Contratação flexível por demanda"],
  },
  {
    title: "Consultoria",
    desc: "Apoio estratégico para decidir o que construir, comprar ou automatizar — e como transformar operação em produto digital.",
    items: ["Diagnóstico de processos e tecnologia", "Arquitetura e escolha de soluções", "Estruturação de novos negócios digitais"],
  },
];

const ENSINO_SYSTEMS = [
  ["SIAP", "Acompanhamento de Projetos"],
  ["SICCE", "Ciclo de Controle Estratégico"],
  ["SCP", "Controle de Patrimônio"],
  ["CRM", "Gerenciamento de Leads e Atendimentos"],
  ["SVR", "Vida Religiosa"],
];

const QTOK_STEPS = [
  ["01", "Drive: leitura automática das artes"],
  ["02", "Curadoria: nome e categoria sugeridos"],
  ["03", "Aprovação em lote, sem editar item a item"],
  ["04", "IA: geração automática de mockups"],
  ["05", "Loja: exportação estruturada para o site"],
];

const DOCUMERGE_STEPS = [
  ["ANTES", "Imprimir, recortar, casar e escanear holerite + comprovante de cada colaborador"],
  ["PRAZO", "3 a 5 dias por mês, com 2 a 3 pessoas dedicadas só a isso"],
  ["RISCO", "Sem o documento, os contratos com prefeituras não são pagos"],
  ["DEPOIS", "620 documentos casados em 4min31s; 76% sozinhos, o resto vai para revisão humana"],
];

const HOW = [
  ["Diagnóstico", "Uma conversa gratuita para entender o processo, o gargalo e o que vale automatizar."],
  ["Proposta", "Escopo fechado, prazo e investimento definidos antes de começar."],
  ["Construção", "Entregas em ciclos curtos, com versões que você testa desde a primeira semana."],
  ["Operação", "Hospedamos, monitoramos e evoluímos o sistema depois que ele entra no ar."],
];

const SECTORS = [
  "E-commerce",
  "RH e departamento pessoal",
  "Construção civil",
  "Setor público e licitações",
  "Atendimento e vendas",
  "Agências e infoprodutores",
  "Instituições e terceiro setor",
];

const HomeV2 = () => (
  <V2Layout
    variant="site"
    title="Multibrain — Sistemas, SaaS e infraestrutura"
    description="Construímos e operamos os sistemas que sua empresa precisa. Do processo manual ao sistema em produção em dias, não meses."
    ctaLabel="Agendar diagnóstico"
    ctaHref="#contato"
  >
    {/* HERO */}
    <section className="v2-wrap" style={{ padding: "88px 24px 72px" }}>
      <div className="v2-split">
        <div style={{ flex: "1 1 520px" }}>
          <p className="v2-eyebrow" style={{ marginBottom: 20 }}>Sistemas · SaaS · Infraestrutura</p>
          <h1 className="v2-h1">
            Construímos e operamos <span className="v2-hl">os sistemas que sua empresa precisa.</span>
          </h1>
          <p className="v2-lead">
            Do processo manual ao sistema em produção em dias, não meses. Desenvolvemos, hospedamos e mantemos — com
            produtos próprios rodando para centenas de clientes.
          </p>
          <div className="v2-actions">
            <a href="#contato" className="v2-btn v2-btn--primary">Agendar diagnóstico gratuito</a>
            <a href="#produtos" className="v2-btn v2-btn--ghost">Ver produtos</a>
          </div>
        </div>
        <div className="v2-panel" style={{ flex: "1 1 420px" }}>
          <div className="v2-panel__head">
            <span>portfólio / em produção</span>
            <span>{PORTFOLIO_DOMAINS.length} projetos</span>
          </div>
          <div className="v2-mono" style={{ fontSize: 14 }}>
            {PORTFOLIO_DOMAINS.map((d) => (
              <div className="v2-row" key={d} style={{ justifyContent: "space-between", padding: "14px 20px" }}>
                <span>{d}</span>
                <span className="v2-status">● produção</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>

    {/* NUMBERS */}
    <section aria-label="Números" className="v2-band">
      <div className="v2-wrap">
        <div className="v2-stats">
          {PLATFORM_STATS.map((s) => (
            <div className="v2-stat" key={s.label}>
              <div className="v2-stat__value">{s.value}</div>
              <div className="v2-stat__label">{s.label}</div>
            </div>
          ))}
        </div>
        <p className="v2-source" style={{ paddingBottom: 20 }}>{PLATFORM_SOURCE}</p>
      </div>
    </section>

    {/* SOLUTIONS */}
    <section id="solucoes" className="v2-wrap v2-section">
      <p className="v2-eyebrow">O que fazemos</p>
      <h2 className="v2-h2">Seis formas de colocar tecnologia para trabalhar no seu negócio.</h2>
      <div className="v2-grid" style={{ marginTop: 56, gap: 24 }}>
        {SOLUTIONS.map((s, i) => (
          <article className="v2-card v2-card--col" key={s.title}>
            <span className="v2-num">{String(i + 1).padStart(2, "0")}</span>
            <h3 className="v2-h3" style={{ fontSize: 24 }}>{s.title}</h3>
            <p className="v2-body">{s.desc}</p>
            <ul className="v2-list">
              {s.items.map((it) => <li key={it}>{it}</li>)}
            </ul>
          </article>
        ))}
      </div>
    </section>

    {/* PRODUCTS */}
    <section id="produtos" className="v2-band v2-band--deep">
      <div className="v2-wrap v2-section">
        <p className="v2-eyebrow">Produtos</p>
        <h2 className="v2-h2">Software que construímos, operamos e usamos todos os dias.</h2>
        <div className="v2-tiles">
          {PRODUCTS.map((p) => (
            <a key={p.name} href={p.url} target="_blank" rel="noopener noreferrer" className="v2-tile">
              <span className="v2-tile__tag">{p.tag.toUpperCase()}</span>
              <span className="v2-tile__name">{p.name}</span>
              <span className="v2-tile__desc">{p.desc}</span>
              <span className="v2-tile__link">{p.url.replace("https://", "")} →</span>
            </a>
          ))}
        </div>
      </div>
    </section>

    {/* CASES */}
    <section id="cases" className="v2-wrap v2-section v2-stack-lg" style={{ marginTop: 0 }}>
      <div className="v2-split v2-split--top">
        <div>
          <p className="v2-eyebrow">Case</p>
          <h2 className="v2-h2">Um ecossistema de gestão completo para uma grande rede de ensino.</h2>
          <p className="v2-lead" style={{ fontSize: 18, marginTop: 24 }}>
            Uma das maiores redes de ensino do Brasil precisava unificar projetos, estratégia, patrimônio, relacionamento
            e gestão de pessoas. Entregamos cinco sistemas integrados, com acesso único.
          </p>
          <div className="v2-metrics">
            <div>
              <div className="v2-metric__value">5</div>
              <div className="v2-metric__label">sistemas integrados</div>
            </div>
            <div>
              <div className="v2-metric__value">{CASES.ensino.value}</div>
              <div className="v2-metric__label">sob gestão com governança</div>
            </div>
          </div>
        </div>
        <div className="v2-panel">
          <div className="v2-panel__head" style={{ justifyContent: "flex-start", padding: "14px 24px" }}>
            <span style={{ width: 72 }}>SIGLA</span>
            <span>SISTEMA</span>
          </div>
          {ENSINO_SYSTEMS.map(([k, v]) => (
            <div className="v2-row" key={k} style={{ padding: "18px 24px" }}>
              <span className="v2-row__key">{k}</span>
              <span>{v}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="v2-split v2-split--top">
        <div>
          <p className="v2-eyebrow">Case · E-commerce</p>
          <h2 className="v2-h2">Qtok Quadros: a loja e o motor de imagens com IA.</h2>
          <p className="v2-lead" style={{ fontSize: 18, marginTop: 24 }}>
            Criamos o e-commerce completo da Qtok Quadros e todo o motor de imagens com IA que alimenta o catálogo de
            quadros decorativos. Cada produto exigia 7 imagens e 112 campos preenchidos à mão; hoje a arte sai do Drive
            e chega à loja num único fluxo.
          </p>
          <div className="v2-metrics">
            <div>
              <div className="v2-metric__value">{CASES.qtok.value}</div>
              <div className="v2-metric__label">para 1.000 produtos (vs. 250 h manual)</div>
            </div>
            <div>
              <div className="v2-metric__value">−86%</div>
              <div className="v2-metric__label">no tempo de cadastro</div>
            </div>
          </div>
          <a href="https://qtokquadros.com.br" target="_blank" rel="noopener noreferrer"
            style={{ display: "inline-block", marginTop: 28, fontWeight: 500 }}>
            qtokquadros.com.br →
          </a>
        </div>
        <div className="v2-panel">
          <div className="v2-panel__head" style={{ justifyContent: "flex-start", padding: "14px 24px" }}>
            <span style={{ width: 72 }}>ETAPA</span>
            <span>O QUE ENTREGAMOS</span>
          </div>
          {QTOK_STEPS.map(([k, v]) => (
            <div className="v2-row" key={k} style={{ padding: "18px 24px" }}>
              <span className="v2-row__key">{k}</span>
              <span>{v}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="v2-split v2-split--top">
        <div>
          <p className="v2-eyebrow">Case · RH e departamento pessoal</p>
          <h2 className="v2-h2">Quando o ERP de 16 mil clientes não resolveu, entregamos em {CASES.documerge.value}.</h2>
          <p className="v2-lead" style={{ fontSize: 18, marginTop: 24 }}>
            Um grupo de empresas com mais de 1.000 colaboradores precisava juntar, todo mês, o holerite e o comprovante de
            pagamento de cada pessoa para receber dos contratos com prefeituras. O fornecedor do ERP mandou consultores e não
            conseguiu. Construímos o DocuMerge: a IA lê os documentos, casa cada par e separa o que precisa de revisão humana.
          </p>
          <div className="v2-metrics">
            <div>
              <div className="v2-metric__value">−99,7%</div>
              <div className="v2-metric__label">de horas-homem por ano (960 h → 3 h)</div>
            </div>
            <div>
              <div className="v2-metric__value">4min31s</div>
              <div className="v2-metric__label">para processar 620 documentos</div>
            </div>
          </div>
        </div>
        <div className="v2-panel">
          <div className="v2-panel__head" style={{ justifyContent: "flex-start", padding: "14px 24px" }}>
            <span style={{ width: 72 }}>ETAPA</span>
            <span>O QUE MUDOU</span>
          </div>
          {DOCUMERGE_STEPS.map(([k, v]) => (
            <div className="v2-row" key={k} style={{ padding: "18px 24px" }}>
              <span className="v2-row__key">{k}</span>
              <span>{v}</span>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* HOW WE WORK */}
    <section id="como" style={{ borderTop: "1px solid var(--v2-line)" }}>
      <div className="v2-wrap v2-section">
        <p className="v2-eyebrow">Como trabalhamos</p>
        <h2 className="v2-h2">Escopo claro, entregas curtas e o mesmo time do início ao fim.</h2>
        <ol className="v2-steps">
          {HOW.map(([t, d], i) => (
            <li className="v2-step" key={t}>
              <div className="v2-num">{String(i + 1).padStart(2, "0")}</div>
              <h3>{t}</h3>
              <p className="v2-body">{d}</p>
            </li>
          ))}
        </ol>
        <div className="v2-sectors">
          <span className="v2-eyebrow" style={{ margin: 0, color: "var(--v2-low)" }}>Setores</span>
          {SECTORS.map((s) => <span key={s}>{s}</span>)}
        </div>
      </div>
    </section>

    {/* CTA */}
    <section id="contato" className="v2-band">
      <div className="v2-wrap" style={{ padding: "96px 24px" }}>
        <div className="v2-split" style={{ justifyContent: "space-between" }}>
          <div style={{ flex: "1 1 560px" }}>
            <h2 className="v2-h2" style={{ fontSize: "clamp(30px, 3.6vw, 48px)", lineHeight: 1.1 }}>
              Tem um processo que ainda roda manualmente ou em planilha?
            </h2>
            <p className="v2-lead" style={{ fontSize: 18, marginTop: 18, maxWidth: 600 }}>
              Conte para a gente em 15 minutos. Se fizer sentido virar sistema, você sai da conversa com um caminho e uma
              estimativa.
            </p>
          </div>
          <div className="v2-actions" style={{ marginTop: 0, flex: "0 1 auto" }}>
            <SmartLink href={SCHEDULE} className="v2-btn v2-btn--primary v2-btn--lg">Agendar diagnóstico</SmartLink>
            <a href={whatsapp("Olá! Vim pelo site da Multibrain e quero conversar.")}
              target="_blank" rel="noopener noreferrer" className="v2-btn v2-btn--ghost v2-btn--lg">
              Falar no WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  </V2Layout>
);

export default HomeV2;
