import V2Layout, { SmartLink } from "./V2Layout";
import Faq from "./Faq";
import { scheduleLink } from "./content";

const SCHEDULE = scheduleLink("Olá! Quero agendar uma demonstração do SacOnline.");

const INBOX = [
  ["WHATSAPP", "wa", "Quero saber do meu pedido", "Ana"],
  ["INSTAGRAM", "ig", "Tem esse modelo em azul?", "IA"],
  ["E-MAIL", "mail", "Segunda via do boleto", "Bruno"],
  ["CHAT SITE", "site", "Vocês entregam em Curitiba?", "IA"],
  ["FACEBOOK", "fb", "Gostaria de um orçamento", "Fila"],
];

const PAINS = [
  ["Um celular para todos", "O WhatsApp da empresa passa de mão em mão e ninguém sabe quem respondeu o quê."],
  ["Mensagens sem resposta", "Direct, Messenger e e-mail ficam para depois. O cliente compra do concorrente."],
  ["Histórico perdido", "Quando o atendente sai, a conversa e o contexto do cliente vão junto."],
  ["Gestão no escuro", "Sem saber tempo de resposta, volume por canal ou desempenho do time."],
];

const CHANNELS = [
  ["WhatsApp", "API oficial (Cloud API) ou conexão por QR code"],
  ["Instagram", "Mensagens diretas"],
  ["Facebook", "Messenger"],
  ["E-mail", "Qualquer provedor via IMAP"],
  ["Telegram", "Bot integrado"],
  ["Chat do site", "Widget para o seu site"],
  ["SMS", "Envio em massa"],
  ["Bots", "Fluxos automáticos 24/7"],
];

const FEATURES = [
  ["Multiusuário", "Vários atendentes, um número", "Filas, distribuição de conversas, transferência entre atendentes e permissões por perfil."],
  ["IA e automação", "Respostas 24 horas por dia", "IA generativa e bots personalizáveis resolvem o repetitivo e passam para um humano quando precisa."],
  ["CRM", "Funil de vendas visual", "Cada conversa vira oportunidade, com histórico completo do cliente em todos os canais."],
  ["Mini-ERP", "Pedidos e estoque", "Registre pedidos e acompanhe o estoque sem sair da tela de atendimento."],
  ["Gestão", "Relatórios e SLAs", "Tempo de resposta, volume por canal e desempenho de cada atendente."],
  ["White-label", "Com a sua marca", "Agências e revendas podem oferecer o SacOnline aos próprios clientes."],
];

const FAQ = [
  { q: "Quantos atendentes posso ter?", a: "[Explicar limites por plano.]" },
  { q: "Preciso trocar meu número de WhatsApp?", a: "Não. Conectamos o número que você já usa, pela API oficial ou por QR code." },
  { q: "Quanto tempo leva para começar?", a: "[Prazo de implantação.] Nosso time configura os canais e treina sua equipe." },
  { q: "Quanto custa?", a: "[Planos a partir de R$ X/mês.]" },
];

const SacOnlineV2 = () => (
  <V2Layout
    productName="SacOnline"
    title="SacOnline — Atendimento multicanal e multiusuário"
    description="WhatsApp, Instagram, Facebook, e-mail, Telegram e chat do site em uma única tela, com vários atendentes no mesmo número, CRM e IA."
    ctaLabel="Agendar demonstração"
    ctaHref={SCHEDULE}
  >
    {/* HERO */}
    <section className="v2-wrap" style={{ padding: "80px 24px 88px" }}>
      <div className="v2-split">
        <div style={{ flex: "1 1 500px" }}>
          <span className="v2-pill">Atendimento multicanal e multiusuário</span>
          <h1 className="v2-h1" style={{ fontSize: "clamp(38px, 5vw, 62px)" }}>
            Todos os canais numa caixa só. <span className="v2-hl">Todo o seu time no mesmo lugar.</span>
          </h1>
          <p className="v2-lead">
            WhatsApp, Instagram, Facebook, e-mail, Telegram e chat do site em uma única tela, com vários atendentes no
            mesmo número, CRM integrado e automação com IA.
          </p>
          <div className="v2-actions">
            <SmartLink href={SCHEDULE} className="v2-btn v2-btn--primary v2-btn--lg">Agendar demonstração</SmartLink>
            <a href="https://saconline.app" target="_blank" rel="noopener noreferrer" style={{ fontWeight: 500 }}>
              Conhecer o produto →
            </a>
          </div>
        </div>
        <div className="v2-panel" style={{ flex: "1 1 440px" }} aria-label="Exemplo da caixa de entrada unificada">
          <div className="v2-panel__head"><span>CAIXA DE ENTRADA</span><span>4 ATENDENTES ONLINE</span></div>
          {INBOX.map(([ch, cls, msg, who]) => (
            <div className="v2-row" key={msg} style={{ gap: 14, padding: "14px 20px" }}>
              <span className={`v2-chan v2-chan--${cls}`}>{ch}</span>
              <span className="v2-row__grow">{msg}</span>
              <span className="v2-small" style={{ fontSize: 13, color: "var(--v2-low)" }}>{who}</span>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* PAIN */}
    <section className="v2-band">
      <div className="v2-wrap v2-section--tight">
        <h2 className="v2-h2" style={{ maxWidth: 720 }}>Atendimento espalhado é venda perdida.</h2>
        <div className="v2-grid v2-grid--4" style={{ marginTop: 48 }}>
          {PAINS.map(([t, d]) => (
            <div className="v2-step" key={t}>
              <h3 style={{ marginTop: 0, fontSize: 19 }}>{t}</h3>
              <p className="v2-body">{d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* CHANNELS */}
    <section className="v2-wrap v2-section">
      <p className="v2-eyebrow">Canais integrados</p>
      <h2 className="v2-h2" style={{ maxWidth: 720 }}>Seu cliente escolhe o canal. Você responde de um lugar só.</h2>
      <div className="v2-tiles" style={{ marginTop: 44, gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 230px), 1fr))" }}>
        {CHANNELS.map(([n, d]) => (
          <div className="v2-tile" key={n} style={{ padding: 24, background: "var(--v2-surface)" }}>
            <span style={{ fontWeight: 600, fontSize: 18 }}>{n}</span>
            <span className="v2-tile__desc" style={{ fontSize: 15 }}>{d}</span>
          </div>
        ))}
      </div>
    </section>

    {/* FEATURES */}
    <section className="v2-band v2-band--deep">
      <div className="v2-wrap v2-section">
        <p className="v2-eyebrow">Muito além de uma caixa de mensagens</p>
        <h2 className="v2-h2">Atendimento, vendas e operação na mesma plataforma.</h2>
        <div className="v2-grid" style={{ marginTop: 48 }}>
          {FEATURES.map(([tag, t, d], i) => (
            <div className="v2-card v2-card--flat" key={t} style={{ borderColor: "var(--v2-line-strong)", padding: 28 }}>
              <div className="v2-num" style={{ fontSize: 12 }}>{String(i + 1).padStart(2, "0")} · {tag.toUpperCase()}</div>
              <h3 className="v2-h3" style={{ fontSize: 21, margin: "12px 0 8px" }}>{t}</h3>
              <p className="v2-body">{d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* PROOF */}
    <section className="v2-wrap v2-section">
      <div className="v2-split" style={{ gap: 48 }}>
        <div style={{ flex: "1 1 300px" }}>
          <div style={{ fontSize: "clamp(56px, 7vw, 88px)", fontWeight: 700, letterSpacing: "-0.04em", color: "var(--v2-accent-hi)" }}>
            28,4%
          </div>
        </div>
        <div style={{ flex: "2 1 480px" }}>
          <h2 className="v2-h2" style={{ fontSize: "clamp(26px, 2.8vw, 36px)", lineHeight: 1.15 }}>
            O aplicativo mais implantado na plataforma Multibrain.
          </h2>
          <p className="v2-body" style={{ marginTop: 14, fontSize: 17 }}>
            Entre as aplicações de negócio instaladas pelos 445 clientes ativos da plataforma, o SacOnline é a escolha
            número um.
          </p>
          <p className="v2-source" style={{ marginTop: 10 }}>Fonte: painel AutoStacker, fevereiro de 2026.</p>
        </div>
      </div>
    </section>

    <Faq items={FAQ} />

    {/* FINAL CTA */}
    <section className="v2-band" style={{ borderBottom: 0 }}>
      <div className="v2-narrow v2-center" style={{ padding: "96px 24px" }}>
        <h2 className="v2-h2" style={{ fontSize: "clamp(30px, 3.8vw, 50px)", lineHeight: 1.08, maxWidth: "none" }}>
          Veja seu atendimento funcionando em um lugar só.
        </h2>
        <p className="v2-lead" style={{ fontSize: 18, marginTop: 18 }}>
          Uma demonstração de 30 minutos, com os seus canais e o seu fluxo de atendimento.
        </p>
        <div className="v2-actions" style={{ marginTop: 32 }}>
          <SmartLink href={SCHEDULE} className="v2-btn v2-btn--primary v2-btn--lg">Agendar demonstração</SmartLink>
        </div>
      </div>
    </section>
  </V2Layout>
);

export default SacOnlineV2;
