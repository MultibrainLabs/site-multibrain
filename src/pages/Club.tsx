import { useState, useEffect } from "react";

/* ============================================================
   CONFIG — preencher antes de publicar em hub.multibrain.com.br
   ============================================================
   1) FORM_WEBHOOK_URL → URL do n8n/Apps Script/Zapier que vai
      receber os cadastros de evento. Enquanto ficar vazio, o
      formulário funciona mas SÓ mostra a confirmação na tela
      (não salva em lugar nenhum) — dá pra publicar assim, mas
      lembre de voltar aqui assim que decidir o destino.
   2) CONTACT_WHATSAPP → número (com DDI+DDD, só dígitos, ex:
      "5511999999999") pros botões "Falar com..." abrirem o
      WhatsApp direto. Se ficar vazio, esses botões levam a
      pessoa pro formulário de eventos, que já funciona.
   3) Links "#" espalhados no arquivo (MultiLead, Taski, QTok
      Quadros, RealCredPay, Curso Hotmart, QPartners) → trocar
      pelas URLs reais de cada produto. Busque por `link: "#"`.
   4) PRIVACY_POLICY_URL → link da política de privacidade
      (LGPD). O formulário já pede consentimento; falta a página.
   ============================================================ */
const FORM_WEBHOOK_URL = ""; // ex: "https://seu-n8n.com/webhook/inscricao-evento"
const CONTACT_WHATSAPP = ""; // ex: "5511999999999"
const PRIVACY_POLICY_URL = ""; // ex: "https://multibrain.com.br/privacidade"

const pillars = [
  {
    id: "inovacao",
    icon: "✦",
    tag: "Inovação",
    featured: true,
    title: "Stack de Inovação & IA para Negócios",
    color: "#6366F1",
    accent: "#A5B4FC",
    description: "Como usar IA, vibe code e ferramentas de gestão para fazer mais com menos. Do empresário que não sabe programar ao CTO que quer acelerar. E se quiser ir além: a Multibrain Labs está aqui.",
    topics: [
      "IA aplicada ao seu negócio — por onde começar",
      "Vibe coding: crie ferramentas sem saber programar",
      "Automação com N8N, Make e Zapier na prática",
      "Gestão de projetos com IA — Notion, Linear, Asana",
      "Como montar sua stack de ferramentas por R$ 0",
      "Prompts avançados para founders e gestores",
      "Como contratar tech sem ser enganado",
      "Da ideia ao MVP em 2 semanas — método Multibrain",
    ],
    services: [
      { label: "Consultoria Multibrain Labs", desc: "Diagnóstico do seu negócio e stack ideal" },
      { label: "Desenvolvimento de Software", desc: "Apps, SaaS, automações e integrações" },
      { label: "DaaS — Director as a Service", desc: "Diretor estratégico alocado no seu negócio, sem C-Level fixo" },
      { label: "MaaS — Manager as a Service", desc: "Gerente de projetos, produto ou operações sob demanda" },
      { label: "Especialistas sob demanda", desc: "Dev, IA Engineer, Product Manager, especialista de nicho" },
    ],
    products: [
      { label: "AutoStacker", link: "https://autostacker.app", badge: "Ativo" },
      { label: "SaaS Pronto", link: "https://saaspronto.online", badge: "Ativo" },
      { label: "Multibrain Labs", link: "https://multibrain.com.br", badge: "Consultoria" },
    ],
    expert: "Alberto Godinho (CTO) & Multibrain Labs",
  },
  {
    id: "empreendedorismo",
    icon: "🚀",
    tag: "Fundação",
    title: "Empreendedorismo & Negócios",
    color: "#2563EB",
    accent: "#60A5FA",
    description: "Como começar, validar e escalar negócios do zero. A base para quem está começando ou quer reinventar o que já tem.",
    topics: [
      "Como validar uma ideia de negócio",
      "Modelo de negócio e precificação",
      "Vendas e closers — como fechar mais",
      "Gestão financeira básica para empreendedores",
      "Como montar um time e delegar",
      "Sócios: quando ter, como formalizar",
    ],
    services: [],
    products: [
      { label: "MultiLead", link: "#", badge: "Acesso Club" },
    ],
    expert: "Charles Lucca & equipe Multibrain",
  },
  {
    id: "energia",
    icon: "🧠",
    tag: "Mente & Energia",
    title: "Evolução Espiritual & Energética",
    color: "#7C3AED",
    accent: "#A78BFA",
    description: "Linha Joe Dispenza. Mente, energia e reprogramação de crenças. A base interna para quem quer resultados reais externos.",
    topics: [
      "Programação mental e crenças limitantes",
      "Meditação e foco — método Joe Dispenza",
      "Energia, frequência e manifestação",
      "Livros recomendados e trilha de leitura",
      "Encontros ao vivo — círculos de evolução",
      "Práticas diárias de alta performance",
    ],
    services: [],
    products: [
      { label: "Livros Joe Dispenza", link: "#", badge: "Afiliado" },
    ],
    expert: "Equipe Multibrain + convidados",
  },
  {
    id: "tech",
    icon: "⚙️",
    tag: "CloudTech",
    title: "AutoStacker & Infraestrutura Cloud",
    color: "#059669",
    accent: "#34D399",
    description: "Deploy de software em minutos. SaaS, BaaS, CRM, ERP — sem programar. Para quem quer montar ou vender tecnologia sem complicação.",
    topics: [
      "O que é SaaS, BaaS e como monetizar",
      "Como criar seu próprio micro-SaaS",
      "AutoStacker: deploy em 5 minutos",
      "Infraestrutura cloud para leigos",
      "White-label: venda software com sua marca",
      "Automação de negócios com N8N e IA",
    ],
    services: [
      { label: "Setup AutoStacker", desc: "A Multibrain Labs configura tudo para você" },
    ],
    products: [
      { label: "AutoStacker", link: "https://autostacker.app", badge: "Ativo" },
      { label: "SaaS Pronto", link: "https://saaspronto.online", badge: "Ativo" },
    ],
    expert: "Alberto Godinho — CTO & Founder",
  },
  {
    id: "crm",
    icon: "💬",
    tag: "MarTech",
    title: "SAC Online & Atendimento com IA",
    color: "#0891B2",
    accent: "#22D3EE",
    description: "CRM omnicanal com IA integrada. WhatsApp, Instagram, e-mail, chatbots — tudo em um lugar. Para quem quer escalar o atendimento sem contratar mais.",
    topics: [
      "Como estruturar seu atendimento digital",
      "WhatsApp Business API — o guia completo",
      "Chatbots e automação de vendas",
      "CRM: pipeline, follow-up e conversão",
      "IA no atendimento — GPT-4 na prática",
      "Como vender SAC Online para clientes",
    ],
    services: [
      { label: "Implantação SAC Online", desc: "Setup completo feito pela Multibrain Labs" },
    ],
    products: [
      { label: "SAC Online", link: "https://saconline.app", badge: "Ativo" },
      { label: "MultiLead", link: "#", badge: "Acesso Club" },
    ],
    expert: "Sonja Bitencourte — CMO",
  },
  {
    id: "qpartners",
    icon: "🎤",
    tag: "Growth",
    title: "QPartners — Influenciadores & Marketing de Criadores",
    color: "#DB2777",
    accent: "#F9A8D4",
    description: "Como usar influenciadores e criadores de conteúdo pra vender de verdade. Curadoria de criadores, precificação, contratos e ativação de campanha — do briefing ao resultado.",
    topics: [
      "Como escolher o influenciador certo pro seu negócio",
      "Media kit e como negociar cachê sem se ferrar",
      "Contrato de publi: cláusulas que protegem sua marca",
      "UGC vs. influenciador: quando usar cada um",
      "Como medir ROI de campanha com criador",
      "Performance + influência: campanhas com conversão",
      "Como virar criador pago dentro do seu nicho",
      "Cases reais de campanhas do ecossistema QPartners",
    ],
    services: [
      { label: "Curadoria QPartners", desc: "Seleção de criadores verificados por nicho e orçamento" },
      { label: "Gestão de Campanha", desc: "Do briefing à entrega, com relatório de performance" },
      { label: "Media Kit & Precificação", desc: "Estruturação de tabela de preços pra criadores" },
      { label: "Parcerias de Marca", desc: "Conexão direta entre empresário e criador, sem intermediário perdido" },
    ],
    products: [
      { label: "QPartners", link: "#", badge: "Acesso Club" },
    ],
    expert: "Equipe QPartners",
  },
  {
    id: "construtech",
    icon: "🏗️",
    tag: "Construtech",
    title: "Obras, Licitações & Contratos",
    color: "#D97706",
    accent: "#FCD34D",
    description: "Do edital à execução. Gestão de obras, licitações públicas e contratos. Para construtoras, engenheiros, arquitetos e empreendedores do setor.",
    topics: [
      "Como participar de licitações públicas",
      "Gestão de obras do zero",
      "Como montar uma empresa de construção",
      "Contratos: cláusulas essenciais e armadilhas",
      "Como ganhar licitações — estratégia de lance",
      "Orçamento de obras e BDI na prática",
    ],
    services: [],
    products: [
      { label: "LinkObras", link: "https://linkobras.com.br", badge: "Ativo" },
      { label: "LinkLicita", link: "https://linklicita.com.br", badge: "Ativo" },
      { label: "MultiLead", link: "#", badge: "Novo" },
    ],
    expert: "Carlos (Duda) & Jayme Lemos",
  },
  {
    id: "baas",
    icon: "🏦",
    tag: "FinTech",
    title: "RealCredPay & Banking as a Service",
    color: "#BE185D",
    accent: "#F472B6",
    description: "Como lançar um banco digital ou wallet de pagamentos sobre infraestrutura própria. BaaS para empresas que querem entrar no mercado financeiro.",
    topics: [
      "O que é BaaS e como funciona",
      "Como lançar uma fintech em semanas",
      "Wallets, pagamentos e compliance",
      "Open Banking e o futuro do dinheiro",
      "White-label bancário: produto próprio sem banco",
      "Regulação: o que você precisa saber",
    ],
    services: [
      { label: "Consultoria BaaS", desc: "Avaliação e estruturação do seu projeto fintech" },
    ],
    products: [
      { label: "RealCredPay", link: "#", badge: "Em breve" },
    ],
    expert: "Charles Lucca & equipe",
  },
  {
    id: "leilao",
    icon: "🏠",
    tag: "Imóveis",
    title: "Leilão — Compra, Reforma & Venda",
    color: "#0F766E",
    accent: "#2DD4BF",
    description: "Como comprar imóveis em leilão abaixo do mercado, reformar estrategicamente e vender com lucro. Do arrematante ao investidor profissional.",
    topics: [
      "Como funciona um leilão judicial e extrajudicial",
      "Análise de matrícula e due diligence",
      "Como calcular o lucro antes de arrematar",
      "Financiamento CEF para leilão — passo a passo",
      "Reforma para revenda: o que valoriza de verdade",
      "Gestão de portfólio de imóveis",
    ],
    services: [
      { label: "Consultoria de Leilão", desc: "Análise e acompanhamento de arrematação" },
    ],
    products: [],
    expert: "Especialista Multibrain + convidados",
  },
  {
    id: "quadros",
    icon: "🖼️",
    tag: "E-commerce",
    title: "QTok Quadros — Produto Físico & E-commerce",
    color: "#9333EA",
    accent: "#C084FC",
    description: "Como montar, escalar e automatizar um e-commerce de produtos físicos. Case real: fábrica de quadros, produção sob demanda e vendas online.",
    topics: [
      "Como criar um produto físico com margem alta",
      "E-commerce do zero ao primeiro R$10k",
      "Produção sob demanda: como funciona",
      "Tráfego pago para e-commerce — Meta Ads",
      "Logística e fulfillment sem dor de cabeça",
      "Como criar sua própria marca de produtos",
    ],
    services: [],
    products: [
      { label: "QTok Quadros", link: "#", badge: "Ativo" },
    ],
    expert: "Equipe Multibrain + operação QTok",
  },
  {
    id: "taski",
    icon: "🧹",
    tag: "Serviços",
    title: "Taski — Gestão de Faxinas & Reparos",
    color: "#65A30D",
    accent: "#A3E635",
    description: "Software e modelo de negócio para quem quer escalar serviços domésticos e de manutenção. Marketplace + gestão + agenda automática.",
    topics: [
      "Como montar uma empresa de serviços domésticos",
      "Marketplace de serviços: modelo de negócio",
      "Agendamento, pagamento e avaliação — automação",
      "Como atrair e fidelizar prestadores",
      "Precificação de serviços por demanda",
      "Escalar de freelancer para empresa",
    ],
    services: [
      { label: "Taski para seu negócio", desc: "Use o Taski na sua operação de serviços" },
    ],
    products: [
      { label: "Taski", link: "#", badge: "Novo" },
    ],
    expert: "Equipe Multibrain",
  },
  {
    id: "cripto",
    icon: "₿",
    tag: "Web3",
    title: "Criptomoedas & Web3",
    color: "#B45309",
    accent: "#F59E0B",
    description: "Do básico ao avançado. Como investir, guardar e usar criptomoedas com segurança. DeFi, tokenização e o futuro da economia digital.",
    topics: [
      "Bitcoin e Ethereum — o guia do iniciante",
      "Como custodiar suas cripto com segurança",
      "DeFi: como o dinheiro funciona sem banco",
      "Tokenização de ativos reais (RWA)",
      "Web3: o que muda para negócios",
      "Tributação de cripto no Brasil — o que saber",
    ],
    services: [],
    products: [],
    expert: "Especialistas Web3 convidados",
  },
  {
    id: "carreira",
    icon: "🎯",
    tag: "Carreiras",
    title: "Carreira & Recolocação Profissional",
    color: "#1D4ED8",
    accent: "#93C5FD",
    description: "Para quem quer mudar de carreira, subir de nível ou entrar em tech. Curso já disponível no Hotmart. Mentoria, portfólio e estratégia de recolocação.",
    topics: [
      "Como montar um LinkedIn magnético",
      "Portfólio: o que realmente importa",
      "Como se preparar para entrevistas técnicas",
      "Carreira em tech sem faculdade",
      "Como negociar salário com confiança",
      "De CLT a PJ: como fazer a transição",
    ],
    services: [],
    products: [
      { label: "Curso Hotmart", link: "#", badge: "Disponível" },
    ],
    expert: "Equipe Multibrain + mentores convidados",
  },
  {
    id: "consorcio",
    icon: "📋",
    tag: "Investimentos",
    title: "Consórcios — Estratégia & Investimento",
    color: "#166534",
    accent: "#4ADE80",
    description: "Como usar consórcios como ferramenta de investimento. Estratégia de lance, cartas contempladas e arbitragem — com especialista ativo que opera mais de 15 cartas.",
    topics: [
      "Como funciona um consórcio de verdade",
      "Lance embutido vs. lance livre — quando usar",
      "Como comprar cartas contempladas com desconto",
      "Consórcio de imóvel como estratégia de portfólio",
      "Consórcio de veículos e maquinário",
      "Como vender consultoria de consórcio",
    ],
    services: [
      { label: "Consultoria HS Consórcios", desc: "Estratégia personalizada com especialista" },
      { label: "Acesso a cartas contempladas", desc: "+15 cartas ativas disponíveis" },
    ],
    products: [],
    expert: "Especialista HS — 15+ cartas ativas",
  },
];

const labs_services = [
  { icon: "🔬", title: "Consultoria & Diagnóstico", desc: "Mapeamos sua stack, seus gargalos e o que dá pra automatizar. Entregamos um plano de ação real." },
  { icon: "💻", title: "Desenvolvimento de Software", desc: "Apps, SaaS, APIs, automações, integrações. Do MVP ao produto escalável." },
  { icon: "👤", title: "DaaS — Director as a Service", desc: "Diretor estratégico alocado no seu negócio. Liderança executiva sem o custo de um C-Level fixo." },
  { icon: "📦", title: "MaaS — Manager as a Service", desc: "Gerente de projetos, produto ou operações sob demanda. Liderança tática sem contratar full-time." },
  { icon: "🤖", title: "IA & Automação", desc: "Agentes de IA, automações com N8N/Make, chatbots, fluxos inteligentes para seu negócio." },
  { icon: "🎓", title: "Treinamento de Times", desc: "Capacitamos o time do cliente em ferramentas, gestão ágil e cultura de inovação." },
];

const qpartners_services = [
  { icon: "🔎", title: "Curadoria de Criadores", desc: "Selecionamos influenciadores verificados por nicho, audiência real e fit com sua marca." },
  { icon: "📋", title: "Gestão de Campanha", desc: "Briefing, negociação, cronograma e acompanhamento de entrega ponta a ponta." },
  { icon: "💰", title: "Media Kit & Precificação", desc: "Ajudamos criadores a precificar certo e marcas a negociar com segurança." },
  { icon: "📈", title: "Performance & Relatório", desc: "Métricas reais de alcance, engajamento e conversão — não só vaidade." },
  { icon: "🤝", title: "Parcerias de Marca", desc: "Conexão direta entre empresário do Club e criador, com desconto exclusivo de assinante." },
];

const membershipTiers = [
  {
    name: "Club",
    price: "R$ 97",
    period: "/mês",
    description: "Acesso à comunidade e conteúdos base",
    features: [
      "Grupos WhatsApp por pilar temático",
      "Biblioteca de conteúdos gravados (trilhas gratuitas)",
      "Lives mensais com founders",
      "Acesso à plataforma de comunidade",
      "Acesso à vitrine QPartners e Labs (sem desconto)",
    ],
    cta: "Entrar no Club",
    highlight: false,
  },
  {
    name: "Pro",
    price: "R$ 297",
    period: "/mês",
    description: "Club + mentorias e desconto em QPartners e Labs",
    features: [
      "Tudo do Club",
      "Trilhas e workshops pagos inclusos",
      "Mentorias em grupo mensais",
      "Desconto exclusivo em campanhas QPartners",
      "Desconto exclusivo em serviços Multibrain Labs",
      "Acesso antecipado a novos produtos",
      "Sessão trimestral de diagnóstico",
    ],
    cta: "Quero o Pro",
    highlight: true,
  },
  {
    name: "Spartan",
    price: "Sob consulta",
    period: "",
    description: "Para founders que querem crescer dentro do ecossistema",
    features: [
      "Tudo do Pro",
      "Co-fundação ou investimento Multibrain",
      "Acesso direto ao C-Level",
      "Prioridade máxima em QPartners e Labs",
      "Deal flow do ecossistema",
      "Participação em equity de projetos",
    ],
    cta: "Falar com o time",
    highlight: false,
  },
];

const events = [
  {
    id: "jantar-01",
    date: "2026-09-16",
    day: "16",
    month: "SET",
    weekday: "Quarta",
    time: "19h30",
    title: "Jantar de Lançamento — Multibrain Club",
    type: "Jantar",
    location: "Assado Raiz — próximo à Praça da Encol",
    locationNote: "Mezanino reservado exclusivo pro grupo",
    instagramUrl: "https://www.instagram.com/assado.raiz?igsh=eXQ0M2JjdnNlNGs2",
    vagasTotal: 35,
    vagasConfirmadas: 30,
    description: "O primeiro encontro presencial dos fundadores. Aqui nasce oficialmente o Club — mesa reservada, só pra quem confirmar.",
    highlight: true,
    symplaUrl: "",
  },
  {
    id: "live-01",
    date: "2026-08-26",
    day: "26",
    month: "AGO",
    weekday: "Quarta",
    time: "19h30",
    title: "Live — Stack de IA para Negócios",
    type: "Online",
    location: "Live no grupo",
    description: "Primeira live da trilha de Inovação, com Alberto Godinho (CTO).",
    highlight: false,
    symplaUrl: "",
  },
  {
    id: "jantar-02",
    date: "2026-10-14",
    day: "14",
    month: "OUT",
    weekday: "Quarta",
    time: "19h30",
    title: "Jantar Mensal — Networking & Deal Flow",
    type: "Jantar",
    location: "A definir",
    description: "Segundo jantar do Club. Apresentação de novos membros e oportunidades em aberto.",
    highlight: false,
    symplaUrl: "",
  },
];

const allTags = ["todos", ...Array.from(new Set(pillars.map((p) => p.tag)))];

export default function MultibrainClub() {
  const [activeTab, setActiveTab] = useState("todos");
  const [expanded, setExpanded] = useState(null);
  const [section, setSection] = useState("trilhas"); // trilhas | labs | planos | eventos
  const [form, setForm] = useState({ nome: "", empresa: "", whatsapp: "", email: "", interesse: "", indicadoPor: "" });
  const [submitted, setSubmitted] = useState(null); // null | event title just submitted
  const [selectedEvent, setSelectedEvent] = useState(events.find(e => e.highlight)?.id || events[0]?.id);
  const [consent, setConsent] = useState(false);
  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState(false);

  useEffect(() => {
    document.title = "Multibrain Club — Comunidade de Empresários";
    let meta = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    if (!meta) {
      meta = document.createElement("meta");
      meta.name = "description";
      document.head.appendChild(meta);
    }
    meta.content = "A comunidade que reúne empresários, builders e investidores num só ecossistema — trilhas, jantares e execução real com Multibrain Labs e QPartners.";
  }, []);

  const handleFormChange = (field, value) => setForm(f => ({ ...f, [field]: value }));

  const goToContact = () => {
    if (CONTACT_WHATSAPP) {
      window.open(`https://wa.me/${CONTACT_WHATSAPP}`, "_blank");
    } else {
      setSection("eventos");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.nome || !form.whatsapp || !consent) return;
    const ev = events.find(e => e.id === selectedEvent);

    // IMPORTANTE: o link do grupo do WhatsApp NÃO fica hardcoded aqui de propósito.
    // Ele só deve ser enviado manualmente (ou por automação no backend) depois que
    // a inscrição for aprovada — colocar o link direto no código do site o expõe
    // pra qualquer pessoa que inspecionar a página, o que quebra o controle de acesso.

    if (FORM_WEBHOOK_URL) {
      setSending(true);
      setSendError(false);
      try {
        await fetch(FORM_WEBHOOK_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...form, eventId: selectedEvent, eventTitle: ev?.title, submittedAt: new Date().toISOString() }),
        });
      } catch (err) {
        setSendError(true);
        setSending(false);
        return;
      }
      setSending(false);
    } else {
      console.warn("FORM_WEBHOOK_URL não configurado — inscrição não foi salva em lugar nenhum, só exibida na tela.");
    }

    setSubmitted(ev ? ev.title : "o evento");
    setForm({ nome: "", empresa: "", whatsapp: "", email: "", interesse: "", indicadoPor: "" });
    setConsent(false);
  };

  const filtered =
    activeTab === "todos"
      ? pillars
      : pillars.filter((p) => p.tag === activeTab);

  return (
    <div style={{ fontFamily: "'Inter','Segoe UI',sans-serif", background: "#0a0f1e", minHeight: "100vh", color: "#e2e8f0" }}>

      {/* HERO */}
      <div style={{ background: "linear-gradient(135deg,#0a0f1e 0%,#0d1b3e 60%,#0a0f1e 100%)", padding: "56px 24px 40px", textAlign: "center", borderBottom: "1px solid #1e293b" }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#1e293b", borderRadius: 20, padding: "6px 16px", marginBottom: 20, fontSize: 13, color: "#A5B4FC" }}>
          🧠 Multibrain Ecosystem 2026
        </div>
        <h1 style={{ fontSize: "clamp(30px,6vw,60px)", fontWeight: 900, margin: "0 0 14px", lineHeight: 1.1, letterSpacing: "-1px" }}>
          Multibrain{" "}
          <span style={{ background: "linear-gradient(90deg,#6366F1,#2563EB)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Club</span>
        </h1>
        <p style={{ fontSize: "clamp(14px,2vw,18px)", color: "#94a3b8", maxWidth: 580, margin: "0 auto 28px", lineHeight: 1.7 }}>
          A comunidade que reúne empresários, builders e investidores num só ecossistema — com trilhas, execução real e desconto exclusivo em cada produto por trás delas. Entre antes que as vagas do próximo jantar fechem.
        </p>
        <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap", marginBottom: 24 }}>
          {["14 Trilhas", "Produtos Reais", "Founders & Experts", "Multibrain Labs & QPartners"].map((t) => (
            <span key={t} style={{ background: "#1e293b", border: "1px solid #334155", borderRadius: 8, padding: "5px 13px", fontSize: 12, color: "#cbd5e1" }}>{t}</span>
          ))}
        </div>

        <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap", marginBottom: 32 }}>
          <button onClick={() => setSection("planos")} style={{ padding: "13px 30px", borderRadius: 10, border: "none", background: "linear-gradient(90deg,#6366F1,#2563EB)", color: "#fff", fontWeight: 700, fontSize: 14, cursor: "pointer" }}>
            Quero entrar no Club →
          </button>
          <button onClick={() => setSection("eventos")} style={{ padding: "13px 30px", borderRadius: 10, border: "1px solid #334155", background: "transparent", color: "#e2e8f0", fontWeight: 700, fontSize: 14, cursor: "pointer" }}>
            Ver próximo jantar
          </button>
        </div>

        {/* NAV */}
        <div style={{ display: "flex", gap: 8, justifyContent: "center" }}>
          {[["trilhas", "📚 Trilhas"], ["eventos", "📅 Eventos"], ["labs", "🔬 Multibrain Labs"], ["qpartners", "🎤 QPartners"], ["planos", "💳 Planos"]].map(([key, label]) => (
            <button key={key} onClick={() => setSection(key)} style={{ padding: "9px 20px", borderRadius: 10, border: "1px solid", borderColor: section === key ? "#6366F1" : "#334155", background: section === key ? "#6366F1" : "transparent", color: section === key ? "#fff" : "#94a3b8", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* ── TRILHAS ── */}
      {section === "trilhas" && (
        <div style={{ padding: "32px 24px", maxWidth: 1100, margin: "0 auto" }}>

          {/* Featured — Inovação */}
          {activeTab === "todos" && (() => {
            const p = pillars.find(x => x.featured);
            return (
              <div
                onClick={() => setExpanded(expanded === p.id ? null : p.id)}
                style={{ background: "linear-gradient(135deg,#1e1b4b,#312e81)", border: "1px solid #4F46E5", borderRadius: 20, padding: "32px 28px", marginBottom: 28, cursor: "pointer", position: "relative", overflow: "hidden" }}
              >
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 4, background: "linear-gradient(90deg,#6366F1,#2563EB)" }} />
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 16 }}>
                  <div style={{ flex: 1, minWidth: 260 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                      <span style={{ fontSize: 28, color: "#A5B4FC" }}>✦</span>
                      <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1.5, color: "#A5B4FC", textTransform: "uppercase" }}>Pilar Central — Inovação</span>
                    </div>
                    <h2 style={{ fontSize: "clamp(18px,3vw,26px)", fontWeight: 800, margin: "0 0 10px" }}>{p.title}</h2>
                    <p style={{ fontSize: 14, color: "#a5b4fc", lineHeight: 1.7, margin: "0 0 16px", maxWidth: 600 }}>{p.description}</p>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                      {p.products.map(prod => (
                        <a key={prod.label} href={prod.link} target="_blank" rel="noreferrer" onClick={e => e.stopPropagation()}
                          style={{ fontSize: 11, padding: "4px 12px", borderRadius: 6, background: "#312e81", color: "#A5B4FC", border: "1px solid #4F46E5", textDecoration: "none", display: "flex", alignItems: "center", gap: 5 }}>
                          {prod.label} <span style={{ fontSize: 10, background: "#6366F1", color: "#fff", borderRadius: 4, padding: "1px 5px" }}>{prod.badge}</span>
                        </a>
                      ))}
                    </div>
                  </div>
                  <div style={{ minWidth: 180 }}>
                    <p style={{ fontSize: 11, color: "#6366F1", textTransform: "uppercase", letterSpacing: 1, marginBottom: 10, fontWeight: 700 }}>Serviços Multibrain Labs</p>
                    {p.services.map(s => (
                      <div key={s.label} style={{ marginBottom: 8, background: "#1e1b4b", borderRadius: 8, padding: "8px 12px", border: "1px solid #4338CA33" }}>
                        <div style={{ fontSize: 12, fontWeight: 700, color: "#e2e8f0" }}>{s.label}</div>
                        <div style={{ fontSize: 11, color: "#94a3b8" }}>{s.desc}</div>
                      </div>
                    ))}
                  </div>
                </div>
                {expanded === p.id && (
                  <div style={{ marginTop: 24, borderTop: "1px solid #4F46E544", paddingTop: 20 }}>
                    <p style={{ fontSize: 11, color: "#6366F1", textTransform: "uppercase", letterSpacing: 1, marginBottom: 12, fontWeight: 700 }}>Conteúdos da trilha</p>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(240px,1fr))", gap: 8 }}>
                      {p.topics.map((t, i) => (
                        <div key={i} style={{ display: "flex", gap: 8, fontSize: 13, color: "#cbd5e1", background: "#1e1b4b", borderRadius: 8, padding: "8px 12px" }}>
                          <span style={{ color: "#A5B4FC", flexShrink: 0 }}>→</span> {t}
                        </div>
                      ))}
                    </div>
                    <div style={{ marginTop: 16, fontSize: 12, color: "#64748b" }}>👤 {p.expert}</div>
                  </div>
                )}
                <div style={{ marginTop: 14, fontSize: 12, color: "#A5B4FC", textAlign: "right" }}>{expanded === p.id ? "▲ fechar" : "▼ ver trilha completa"}</div>
              </div>
            );
          })()}

          {/* Tag filter */}
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 24 }}>
            {allTags.filter(t => t !== "Inovação").map(tag => (
              <button key={tag} onClick={() => setActiveTab(tag)}
                style={{ padding: "6px 14px", borderRadius: 20, border: "1px solid", borderColor: activeTab === tag ? "#2563EB" : "#334155", background: activeTab === tag ? "#2563EB" : "transparent", color: activeTab === tag ? "#fff" : "#94a3b8", fontSize: 12, cursor: "pointer", textTransform: "capitalize" }}>
                {tag}
              </button>
            ))}
          </div>

          {/* Cards grid */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(290px,1fr))", gap: 18 }}>
            {filtered.filter(p => !p.featured).map(p => (
              <div key={p.id} onClick={() => setExpanded(expanded === p.id ? null : p.id)}
                style={{ background: "#0d1b3e", border: `1px solid ${expanded === p.id ? p.color : "#1e293b"}`, borderRadius: 16, padding: 22, cursor: "pointer", position: "relative", overflow: "hidden", transition: "border-color .2s" }}>
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: p.color, borderRadius: "16px 16px 0 0" }} />
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
                  <span style={{ fontSize: 28 }}>{p.icon}</span>
                  <span style={{ fontSize: 10, color: p.accent, background: `${p.color}22`, border: `1px solid ${p.color}44`, borderRadius: 6, padding: "3px 8px", fontWeight: 600 }}>{p.tag}</span>
                </div>
                <h3 style={{ fontSize: 15, fontWeight: 700, margin: "0 0 7px", color: "#f1f5f9" }}>{p.title}</h3>
                <p style={{ fontSize: 12, color: "#94a3b8", lineHeight: 1.6, margin: "0 0 14px" }}>{p.description}</p>

                {p.products.length > 0 && (
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 5, marginBottom: 10 }}>
                    {p.products.map(prod => (
                      <a key={prod.label} href={prod.link} target="_blank" rel="noreferrer" onClick={e => e.stopPropagation()}
                        style={{ fontSize: 10, padding: "3px 9px", borderRadius: 6, background: "#1e293b", color: p.accent, border: `1px solid ${p.color}44`, textDecoration: "none", display: "flex", alignItems: "center", gap: 4 }}>
                        {prod.label} <span style={{ fontSize: 9, background: p.color, color: "#fff", borderRadius: 3, padding: "1px 4px" }}>{prod.badge}</span>
                      </a>
                    ))}
                  </div>
                )}

                {p.services.length > 0 && (
                  <div style={{ marginBottom: 10 }}>
                    {p.services.map(s => (
                      <div key={s.label} style={{ fontSize: 11, color: "#64748b", display: "flex", gap: 5, marginBottom: 4 }}>
                        <span style={{ color: p.accent }}>Labs →</span> {s.label}
                      </div>
                    ))}
                  </div>
                )}

                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: 10, color: "#475569" }}>👤 {p.expert}</span>
                  <span style={{ fontSize: 11, color: p.accent }}>{expanded === p.id ? "▲" : "▼ trilha"}</span>
                </div>

                {expanded === p.id && (
                  <div style={{ marginTop: 14, borderTop: `1px solid ${p.color}33`, paddingTop: 14 }}>
                    <p style={{ fontSize: 10, color: "#475569", textTransform: "uppercase", letterSpacing: 1, marginBottom: 8, fontWeight: 700 }}>Conteúdos</p>
                    {p.topics.map((t, i) => (
                      <div key={i} style={{ display: "flex", gap: 7, marginBottom: 6, fontSize: 12, color: "#cbd5e1" }}>
                        <span style={{ color: p.accent, flexShrink: 0 }}>→</span> {t}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── EVENTOS ── */}
      {section === "eventos" && (
        <div style={{ padding: "40px 24px", maxWidth: 960, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <div style={{ display: "inline-block", background: "#1e293b", border: "1px solid #334155", borderRadius: 10, padding: "6px 16px", fontSize: 12, color: "#94a3b8", marginBottom: 16, fontWeight: 600 }}>
              📅 Calendário do Club
            </div>
            <h2 style={{ fontSize: "clamp(22px,4vw,38px)", fontWeight: 800, margin: "0 0 12px" }}>
              As vagas são limitadas. A mesa não é pra todo mundo.
            </h2>
            <p style={{ color: "#94a3b8", maxWidth: 560, margin: "0 auto", lineHeight: 1.7, fontSize: 15 }}>
              Cada jantar reúne um grupo fechado de empresários prontos pra fazer negócio. Escolha seu encontro e garanta sua cadeira antes que ela feche.
            </p>
          </div>

          {/* Lista de eventos */}
          <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 48 }}>
            {events.map(ev => (
              <div key={ev.id} onClick={() => setSelectedEvent(ev.id)}
                style={{
                  display: "flex", gap: 18, alignItems: "center", background: ev.highlight ? "linear-gradient(135deg,#1e1b4b,#312e81)" : "#0d1b3e",
                  border: `1px solid ${selectedEvent === ev.id ? "#6366F1" : ev.highlight ? "#4F46E5" : "#1e293b"}`,
                  borderRadius: 14, padding: "18px 20px", cursor: "pointer", transition: "border-color .2s"
                }}>
                <div style={{ textAlign: "center", minWidth: 56 }}>
                  <div style={{ fontSize: 10, color: ev.highlight ? "#A5B4FC" : "#64748b", fontWeight: 700, letterSpacing: 1 }}>{ev.month}</div>
                  <div style={{ fontSize: 26, fontWeight: 900, lineHeight: 1, color: "#f1f5f9" }}>{ev.day}</div>
                  <div style={{ fontSize: 9, color: "#64748b" }}>{ev.weekday}</div>
                </div>
                <div style={{ width: 1, alignSelf: "stretch", background: "#1e293b" }} />
                <div style={{ flex: 1, minWidth: 180 }}>
                  <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 4, flexWrap: "wrap" }}>
                    <span style={{ fontSize: 15, fontWeight: 700, color: "#f1f5f9" }}>{ev.title}</span>
                    <span style={{ fontSize: 10, padding: "2px 8px", borderRadius: 6, background: ev.type === "Online" ? "#0891B222" : "#6366F122", color: ev.type === "Online" ? "#22D3EE" : "#A5B4FC", border: "1px solid #33415544", fontWeight: 600 }}>{ev.type}</span>
                    {ev.vagasTotal && (
                      <span style={{ fontSize: 10, padding: "2px 8px", borderRadius: 6, background: "#7F1D1D33", color: "#FCA5A5", border: "1px solid #7F1D1D55", fontWeight: 700 }}>
                        🔥 Só {ev.vagasTotal - ev.vagasConfirmadas} vagas restantes
                      </span>
                    )}
                  </div>
                  <p style={{ fontSize: 12, color: "#94a3b8", margin: "0 0 4px", lineHeight: 1.5 }}>{ev.description}</p>
                  <div style={{ fontSize: 11, color: "#64748b" }}>
                    🕗 {ev.time} · 📍 {ev.instagramUrl
                      ? <a href={ev.instagramUrl} target="_blank" rel="noreferrer" onClick={e => e.stopPropagation()} style={{ color: "#A5B4FC", textDecoration: "underline" }}>{ev.location}</a>
                      : ev.location}
                  </div>
                  {ev.locationNote && <div style={{ fontSize: 11, color: "#64748b", marginTop: 2 }}>📌 {ev.locationNote}</div>}
                </div>
                <div style={{ fontSize: 18, color: selectedEvent === ev.id ? "#6366F1" : "#334155" }}>{selectedEvent === ev.id ? "●" : "○"}</div>
              </div>
            ))}
          </div>

          {/* Formulário de cadastro */}
          <div style={{ background: "#060d1a", border: "1px solid #1e293b", borderRadius: 16, padding: "28px 24px" }}>
            <h3 style={{ fontWeight: 700, marginBottom: 4, fontSize: 18 }}>Garanta sua cadeira 👇</h3>
            <p style={{ fontSize: 12, color: "#94a3b8", marginBottom: 22 }}>
              Inscrição para: <span style={{ color: "#A5B4FC", fontWeight: 600 }}>{events.find(e => e.id === selectedEvent)?.title}</span>
            </p>

            {submitted ? (
              <div style={{ textAlign: "center", padding: "32px 12px" }}>
                <div style={{ fontSize: 34, marginBottom: 10 }}>✅</div>
                <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 6 }}>Inscrição recebida!</div>
                <p style={{ fontSize: 12, color: "#94a3b8", marginBottom: 18 }}>Sua vaga em {submitted} está em análise. Assim que for aprovada, você recebe o link do grupo e os detalhes por WhatsApp.</p>
                <button onClick={() => setSubmitted(null)} style={{ padding: "9px 20px", borderRadius: 10, border: "1px solid #334155", background: "transparent", color: "#94a3b8", fontSize: 12, cursor: "pointer" }}>
                  Cadastrar outra pessoa
                </button>
              </div>
            ) : (
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: 14 }}>
                <label style={{ display: "flex", flexDirection: "column", gap: 6, fontSize: 12, color: "#94a3b8" }}>
                  Nome *
                  <input value={form.nome} onChange={e => handleFormChange("nome", e.target.value)} placeholder="Seu nome completo"
                    style={{ background: "#0d1b3e", border: "1px solid #1e293b", borderRadius: 8, padding: "10px 12px", color: "#e2e8f0", fontSize: 13 }} />
                </label>
                <label style={{ display: "flex", flexDirection: "column", gap: 6, fontSize: 12, color: "#94a3b8" }}>
                  Empresa
                  <input value={form.empresa} onChange={e => handleFormChange("empresa", e.target.value)} placeholder="Nome da empresa"
                    style={{ background: "#0d1b3e", border: "1px solid #1e293b", borderRadius: 8, padding: "10px 12px", color: "#e2e8f0", fontSize: 13 }} />
                </label>
                <label style={{ display: "flex", flexDirection: "column", gap: 6, fontSize: 12, color: "#94a3b8" }}>
                  WhatsApp *
                  <input value={form.whatsapp} onChange={e => handleFormChange("whatsapp", e.target.value)} placeholder="(11) 99999-9999"
                    style={{ background: "#0d1b3e", border: "1px solid #1e293b", borderRadius: 8, padding: "10px 12px", color: "#e2e8f0", fontSize: 13 }} />
                </label>
                <label style={{ display: "flex", flexDirection: "column", gap: 6, fontSize: 12, color: "#94a3b8" }}>
                  E-mail
                  <input value={form.email} onChange={e => handleFormChange("email", e.target.value)} placeholder="voce@empresa.com"
                    style={{ background: "#0d1b3e", border: "1px solid #1e293b", borderRadius: 8, padding: "10px 12px", color: "#e2e8f0", fontSize: 13 }} />
                </label>
                <label style={{ display: "flex", flexDirection: "column", gap: 6, fontSize: 12, color: "#94a3b8" }}>
                  Quem te indicou? (opcional)
                  <input value={form.indicadoPor} onChange={e => handleFormChange("indicadoPor", e.target.value)} placeholder="Nome de quem te convidou"
                    style={{ background: "#0d1b3e", border: "1px solid #1e293b", borderRadius: 8, padding: "10px 12px", color: "#e2e8f0", fontSize: 13 }} />
                </label>
                <label style={{ display: "flex", flexDirection: "column", gap: 6, fontSize: 12, color: "#94a3b8" }}>
                  O que você busca no Club? (opcional)
                  <input value={form.interesse} onChange={e => handleFormChange("interesse", e.target.value)} placeholder="Ex: networking, dev de software, influenciadores..."
                    style={{ background: "#0d1b3e", border: "1px solid #1e293b", borderRadius: 8, padding: "10px 12px", color: "#e2e8f0", fontSize: 13 }} />
                </label>
                <label style={{ display: "flex", gap: 8, alignItems: "flex-start", gridColumn: "1 / -1", fontSize: 11, color: "#64748b", cursor: "pointer" }}>
                  <input type="checkbox" checked={consent} onChange={e => setConsent(e.target.checked)}
                    style={{ marginTop: 2, accentColor: "#6366F1" }} />
                  <span>
                    Concordo em ser contatado por WhatsApp/e-mail sobre este evento e o Multibrain Club.
                    {PRIVACY_POLICY_URL
                      ? <> Veja a <a href={PRIVACY_POLICY_URL} target="_blank" rel="noreferrer" style={{ color: "#6366F1" }}>política de privacidade</a>.</>
                      : null}
                  </span>
                </label>
                {sendError && (
                  <div style={{ gridColumn: "1 / -1", fontSize: 12, color: "#FCA5A5", background: "#7F1D1D22", border: "1px solid #7F1D1D55", borderRadius: 8, padding: "8px 12px" }}>
                    Não conseguimos enviar sua inscrição agora. Tenta de novo em alguns segundos.
                  </div>
                )}
                <button onClick={handleSubmit} disabled={!form.nome || !form.whatsapp || !consent || sending}
                  style={{ gridColumn: "1 / -1", marginTop: 6, padding: "12px", borderRadius: 10, border: "none", background: (!form.nome || !form.whatsapp || !consent || sending) ? "#334155" : "#6366F1", color: "#fff", fontWeight: 700, fontSize: 14, cursor: (!form.nome || !form.whatsapp || !consent || sending) ? "not-allowed" : "pointer" }}>
                  {sending ? "Enviando..." : "Confirmar presença →"}
                </button>
              </div>
            )}
          </div>

          <p style={{ fontSize: 11, color: "#334155", textAlign: "center", marginTop: 16 }}>
            Prefere se inscrever pelo Sympla? {events.find(e => e.id === selectedEvent)?.symplaUrl
              ? <a href={events.find(e => e.id === selectedEvent)?.symplaUrl} target="_blank" rel="noreferrer" style={{ color: "#6366F1" }}>Abrir no Sympla →</a>
              : "Em breve."}
          </p>
        </div>
      )}

      {/* ── QPARTNERS ── */}
      {section === "qpartners" && (
        <div style={{ padding: "40px 24px", maxWidth: 960, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <div style={{ display: "inline-block", background: "#500724", border: "1px solid #DB2777", borderRadius: 10, padding: "6px 16px", fontSize: 12, color: "#F9A8D4", marginBottom: 16, fontWeight: 600 }}>
              🎤 QPartners
            </div>
            <h2 style={{ fontSize: "clamp(22px,4vw,38px)", fontWeight: 800, margin: "0 0 12px" }}>
              Sua marca na mão de quem —{" "}
              <span style={{ color: "#DB2777" }}>já tem audiência que compra</span>
            </h2>
            <p style={{ color: "#94a3b8", maxWidth: 560, margin: "0 auto", lineHeight: 1.7, fontSize: 15 }}>
              Chega de perder tempo garimpando influenciador no Instagram. A QPartners entrega criador verificado, contrato pronto e campanha rodando — com desconto exclusivo pra quem é do Club.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(260px,1fr))", gap: 20, marginBottom: 48 }}>
            {qpartners_services.map(s => (
              <div key={s.title} style={{ background: "#1a0a14", border: "1px solid #4c0519", borderRadius: 14, padding: 24 }}>
                <div style={{ fontSize: 28, marginBottom: 12 }}>{s.icon}</div>
                <div style={{ fontWeight: 700, marginBottom: 8, fontSize: 15 }}>{s.title}</div>
                <div style={{ fontSize: 13, color: "#94a3b8", lineHeight: 1.6 }}>{s.desc}</div>
              </div>
            ))}
          </div>

          <div style={{ background: "linear-gradient(135deg,#500724,#831843)", border: "1px solid #DB2777", borderRadius: 16, padding: "32px 28px", textAlign: "center" }}>
            <h3 style={{ fontSize: 22, fontWeight: 800, marginBottom: 10 }}>Todo empresário do Club vira cliente em potencial da QPartners</h3>
            <p style={{ color: "#F9A8D4", fontSize: 14, lineHeight: 1.7, maxWidth: 560, margin: "0 auto 24px" }}>
              Quem precisa de influenciador não sai do ecossistema. A demanda nasce no jantar, passa pela trilha, e vira campanha com desconto de assinante — tudo dentro de casa.
            </p>
            <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
              {["Club aprende → QPartners executa", "Criador valida → Club ensina", "Ecossistema cresce junto"].map(t => (
                <span key={t} style={{ fontSize: 12, background: "#831843", border: "1px solid #DB277744", borderRadius: 8, padding: "6px 14px", color: "#F9A8D4" }}>{t}</span>
              ))}
            </div>
            <button onClick={goToContact} style={{ marginTop: 24, padding: "12px 32px", borderRadius: 10, border: "none", background: "#DB2777", color: "#fff", fontWeight: 700, fontSize: 14, cursor: "pointer" }}>
              Falar com a QPartners →
            </button>
          </div>
        </div>
      )}

      {/* ── MULTIBRAIN LABS ── */}
      {section === "labs" && (
        <div style={{ padding: "40px 24px", maxWidth: 960, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <div style={{ display: "inline-block", background: "#1e1b4b", border: "1px solid #4F46E5", borderRadius: 10, padding: "6px 16px", fontSize: 12, color: "#A5B4FC", marginBottom: 16, fontWeight: 600 }}>
              🔬 Multibrain Labs
            </div>
            <h2 style={{ fontSize: "clamp(22px,4vw,38px)", fontWeight: 800, margin: "0 0 12px" }}>
              Pare de contratar tech errado —{" "}
              <span style={{ color: "#6366F1" }}>deixa a gente executar</span>
            </h2>
            <p style={{ color: "#94a3b8", maxWidth: 560, margin: "0 auto", lineHeight: 1.7, fontSize: 15 }}>
              Software, automação, diretor ou gerente sob demanda — tudo que você aprende na trilha, a Multibrain Labs entrega pronto, com desconto exclusivo pra quem é do Club.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(260px,1fr))", gap: 20, marginBottom: 48 }}>
            {labs_services.map(s => (
              <div key={s.title} style={{ background: "#0d1b3e", border: "1px solid #1e293b", borderRadius: 14, padding: 24 }}>
                <div style={{ fontSize: 28, marginBottom: 12 }}>{s.icon}</div>
                <div style={{ fontWeight: 700, marginBottom: 8, fontSize: 15 }}>{s.title}</div>
                <div style={{ fontSize: 13, color: "#94a3b8", lineHeight: 1.6 }}>{s.desc}</div>
              </div>
            ))}
          </div>

          <div style={{ background: "linear-gradient(135deg,#1e1b4b,#312e81)", border: "1px solid #4F46E5", borderRadius: 16, padding: "32px 28px", textAlign: "center" }}>
            <h3 style={{ fontSize: 22, fontWeight: 800, marginBottom: 10 }}>Cada trilha do Club é um funil para a Labs</h3>
            <p style={{ color: "#a5b4fc", fontSize: 14, lineHeight: 1.7, maxWidth: 560, margin: "0 auto 24px" }}>
              Você aprende a fazer. Quando precisar de execução — com velocidade, qualidade e quem já fez antes — a Multibrain Labs entra em campo.
            </p>
            <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
              {["Club aprende → Labs executa", "Labs valida → Club ensina", "Ecossistema cresce junto"].map(t => (
                <span key={t} style={{ fontSize: 12, background: "#312e81", border: "1px solid #4F46E544", borderRadius: 8, padding: "6px 14px", color: "#A5B4FC" }}>{t}</span>
              ))}
            </div>
            <button onClick={goToContact} style={{ marginTop: 24, padding: "12px 32px", borderRadius: 10, border: "none", background: "#6366F1", color: "#fff", fontWeight: 700, fontSize: 14, cursor: "pointer" }}>
              Falar com a Multibrain Labs →
            </button>
          </div>
        </div>
      )}

      {/* ── PLANOS ── */}
      {section === "planos" && (
        <div style={{ padding: "40px 24px", maxWidth: 960, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <h2 style={{ fontSize: "clamp(22px,4vw,36px)", fontWeight: 800, marginBottom: 10 }}>Entre pro grupo que já está fazendo acontecer</h2>
            <p style={{ color: "#94a3b8" }}>Escolha seu nível de acesso e comece a colher os benefícios do ecossistema ainda essa semana</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: 24, marginBottom: 48 }}>
            {membershipTiers.map(tier => (
              <div key={tier.name} style={{ background: tier.highlight ? "linear-gradient(135deg,#1e3a8a,#1d4ed8)" : "#0d1b3e", border: `1px solid ${tier.highlight ? "#3b82f6" : "#1e293b"}`, borderRadius: 16, padding: 28, position: "relative" }}>
                {tier.highlight && (
                  <div style={{ position: "absolute", top: -12, left: "50%", transform: "translateX(-50%)", background: "#2563EB", color: "#fff", fontSize: 10, fontWeight: 700, padding: "4px 14px", borderRadius: 20, whiteSpace: "nowrap" }}>MAIS POPULAR</div>
                )}
                <div style={{ fontSize: 18, fontWeight: 800, marginBottom: 4 }}>{tier.name}</div>
                <div style={{ display: "flex", alignItems: "baseline", gap: 4, marginBottom: 8 }}>
                  <span style={{ fontSize: 30, fontWeight: 900 }}>{tier.price}</span>
                  <span style={{ color: "#94a3b8", fontSize: 13 }}>{tier.period}</span>
                </div>
                <p style={{ fontSize: 12, color: "#94a3b8", marginBottom: 18 }}>{tier.description}</p>
                {tier.features.map(f => (
                  <div key={f} style={{ display: "flex", gap: 8, marginBottom: 9, fontSize: 13, color: "#cbd5e1" }}>
                    <span style={{ color: "#34D399", flexShrink: 0 }}>✓</span> {f}
                  </div>
                ))}
                <button onClick={() => tier.name === "Spartan" ? goToContact() : setSection("eventos")} style={{ marginTop: 20, width: "100%", padding: "11px", borderRadius: 10, border: "none", background: tier.highlight ? "#fff" : "#1e293b", color: tier.highlight ? "#1d4ed8" : "#e2e8f0", fontWeight: 700, fontSize: 13, cursor: "pointer" }}>
                  {tier.cta}
                </button>
              </div>
            ))}
          </div>

          {/* O que está dentro */}
          <div style={{ background: "#060d1a", border: "1px solid #1e293b", borderRadius: 16, padding: "28px 24px" }}>
            <h3 style={{ fontWeight: 700, marginBottom: 20, fontSize: 16 }}>Dentro de qualquer plano você acessa</h3>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(200px,1fr))", gap: 10 }}>
              {[
                "📚 14 trilhas de conteúdo",
                "💬 Grupos por pilar no WhatsApp",
                "🎥 Lives com founders",
                "🔬 Acesso à vitrine Multibrain Labs",
                "🎤 Acesso à vitrine QPartners",
                "🏗️ Cases reais do ecossistema",
                "🤝 Networking de empreendedores",
                "🛍️ Descontos nos produtos (Pro+)",
                "🚀 Deal flow e oportunidades",
              ].map(item => (
                <div key={item} style={{ fontSize: 13, color: "#94a3b8", padding: "8px 12px", background: "#0d1b3e", borderRadius: 8, border: "1px solid #1e293b" }}>{item}</div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* FOOTER */}
      <div style={{ background: "#060d1a", padding: "28px 24px", textAlign: "center", borderTop: "1px solid #1e293b", marginTop: 20 }}>
        <div style={{ fontSize: 20, fontWeight: 800, marginBottom: 6 }}>🧠 Multibrain</div>
        <p style={{ color: "#475569", fontSize: 12 }}>
          multibrain.com.br · qpartners.com.br · autostacker.app · saconline.app · linkobras.com.br · linklicita.com.br · saaspronto.online · multilead
        </p>
        <p style={{ color: "#334155", fontSize: 11, marginTop: 8 }}>"Fazemos acontecer" — Multibrain Ecosystem 2026</p>
      </div>
    </div>
  );
}
