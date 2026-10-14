// Dados compartilhados das páginas /v2.
// Para trocar o link de agendamento (ex.: Calendly), preencha SCHEDULE_URL.
// Enquanto estiver vazio, os botões de agendamento abrem o WhatsApp com mensagem pronta.

export const WHATSAPP_NUMBER = "5551993410110";
export const SCHEDULE_URL = "";
// Página de agendamento do Diagnóstico Estratégico. Enquanto vazio, usa SCHEDULE_URL (ou o WhatsApp).
export const DIAGNOSTICO_URL = ""; // [preencher]
export const INSTAGRAM_URL = "https://instagram.com/multibrain.company";
export const LINKEDIN_URL = ""; // [preencher]
export const CNPJ = ""; // [preencher]

export const whatsapp = (message: string) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

export const scheduleLink = (fallbackMessage: string) =>
  SCHEDULE_URL || whatsapp(fallbackMessage);

export const isExternal = (href: string) => /^https?:\/\//.test(href);

export const PLATFORM_SOURCE = "Fonte: painel da plataforma AutoStacker, fevereiro de 2026.";

export const PLATFORM_STATS = [
  { value: "445", label: "clientes ativos na plataforma" },
  { value: "309", label: "servidores gerenciados" },
  { value: "1.100", label: "aplicações implantadas" },
  { value: "2.000+", label: "clientes atendidos desde a origem" },
];

export const PRODUCTS = [
  {
    tag: "Infraestrutura",
    name: "AutoStacker",
    url: "https://autostacker.app",
    desc: "Implante aplicações empresariais em minutos, em qualquer nuvem ou servidor. Multi-tenant e white-label.",
  },
  {
    tag: "Atendimento",
    name: "SacOnline",
    url: "https://saconline.app",
    desc: "CRM omnicanal: WhatsApp, Instagram, e-mail e chat numa só caixa, com automação e mini-ERP.",
  },
  {
    tag: "Construção",
    name: "LinkObras",
    url: "https://linkobras.com.br",
    desc: "Gestão de obras e construção: cronograma, equipes, custos e acompanhamento em um só lugar.",
  },
  {
    tag: "Setor público",
    name: "LinkLicita",
    url: "https://linklicita.com.br",
    desc: "Gestão de licitações públicas: editais, prazos, documentação e propostas sob controle.",
  },
  {
    tag: "Benefícios e pagamentos",
    name: "RealCredPay",
    url: "https://realcredpay.com.br",
    desc: "Conta digital, cartão, Pix, telemedicina e clube de descontos para trabalhadores de serviços e as empresas que os empregam.",
  },
  {
    tag: "Serviços",
    name: "Taskii",
    url: "https://taskii.com.br",
    desc: "Plataforma que conecta empresas e clientes a profissionais de limpeza, com contratação simples e rápida.",
  },
];

export const PORTFOLIO_DOMAINS = [
  "autostacker.app",
  "saconline.app",
  "linkobras.com.br",
  "linklicita.com.br",
  "realcredpay.com.br",
  "taskii.com.br",
  "qtokquadros.com.br",
];

export const CASES = {
  qtok: {
    label: "E-commerce · Qtok Quadros",
    value: "~30 min",
    text: "para cadastrar 1.000 produtos com imagens geradas por IA (vs. 250 h no processo manual).",
  },
  documerge: {
    label: "RH · Grupo com 1.000+ colaboradores",
    value: "15 dias",
    text: "para entregar a automação que o ERP do cliente não resolveu: 960 h/ano de trabalho manual viraram 3 h.",
  },
  ensino: {
    label: "Grande rede de ensino",
    value: "R$ 50 mi+",
    text: "sob gestão com governança, em cinco sistemas integrados com acesso único.",
  },
};
