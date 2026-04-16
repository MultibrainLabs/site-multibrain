import { useState, useEffect } from "react";
import "@/styles/multibrain-home.css";

type Lang = "pt" | "en" | "es";
type Theme = "light" | "dark";

const t = {
  pt: {
    navServices: "Serviços",
    navProducts: "Produtos",
    navCases: "Cases",
    navFounders: "Fundadores",
    navCta: "Fale Conosco →",
    navCtaHref: "https://wa.me/5551993410110?text=Ol%C3%A1%2C%20Charles!%20Gostaria%20de%20conversar%20sobre%20uma%20oportunidade%20com%20a%20Multibrain.",
    heroTag: "Multibrain — HUB de Inovação & Investimento",
    heroH1a: "Aceleramos negócios.",
    heroH1b: "Construímos o futuro.",
    heroSub: "Consultoria executiva de alto impacto, desenvolvimento de software e smart money para organizações que buscam crescimento sustentável e inovação estruturada.",
    heroCta1: "Resultados Comprovados →",
    heroCta2: "Portfólio de Produtos",
    stat1Label: "Anos de experiência executiva combinada",
    stat2Label: "Produtos SaaS proprietários ativos",
    stat3Label: "Novas unidades de negócio estruturadas",
    stat4Label: "Verticais de mercado atendidas",
    partnersLabel: "Portfólio de plataformas do ecossistema",
    servicesTag: "Engajamento",
    servicesH2a: "Três modalidades de",
    servicesH2b: "engajamento estratégico",
    s1Num: "01", s1Title: "Consultoria Executiva", s1Desc: "Diagnóstico profundo do negócio, identificação de novas fontes de receita, integração de equipes e estruturação de operações para alta performance.",
    s1t1: "Diagnóstico", s1t2: "Business Units", s1t3: "Go-to-Market",
    s2Num: "02", s2Title: "Desenvolvimento de Software", s2Desc: "Produtos digitais sob medida, do MVP à escala enterprise. Especialidade em SaaS, BaaS e automação de processos com IA.",
    s2t1: "SaaS/BaaS", s2t2: "AI/IA", s2t3: "White-label",
    s3Num: "03", s3Title: "Smart Money & Investimento", s3Desc: "Participação como sócio/co-founder em empresas com potencial escalável. Além do capital: rede e capacidade operacional.",
    s3t1: "Capital", s3t2: "SmartMoney", s3t3: "Co-Founding",
    productsTag: "Produtos",
    productsH2a: "6 plataformas SaaS.",
    productsH2b: "8 verticais de mercado.",
    productsLink: "Saiba mais →",
    p1Title: "AutoStacker", p1Desc: "Infraestrutura multi-tenant white-label e automação. Deploy de apps enterprise em minutos em qualquer nuvem.",
    p2Title: "SacOnline", p2Desc: "CRM omnichannel com IA integrada. Centraliza WhatsApp, Instagram, Telegram em uma plataforma.",
    p3Title: "LinkObras", p3Desc: "Gestão integrada de obras e construção civil. Do edital ao acompanhamento com controle financeiro em tempo real.",
    p4Title: "LinkLicita", p4Desc: "Gestão estratégica de licitações públicas. Monitoramento, análise de oportunidades e participação em pregões.",
    p5Title: "FocusQuest", p5Desc: "Produtividade gamificada para equipes. Transforma metas em missões estruturadas e aumenta engajamento.",
    p6Title: "ViralTrend", p6Desc: "Inteligência de tendências digitais para marcas e criadores. Antecipe movimentos de mercado.",
    casesTag: "Cases",
    casesH2a: "Engajamentos que",
    casesH2b: "construíram negócios reais",
    methodTag: "Metodologia",
    methodH2a: "Nossa abordagem",
    methodH2b: "de execução",
    m1Num: "01", m1Title: "Diagnóstico", m1Desc: "Análise aprofundada do negócio para mapear dores operacionais, oportunidades inexploradas e alavancas de crescimento.",
    m2Num: "02", m2Title: "Construção", m2Desc: "Desenvolvimento da solução com velocidade e rigor técnico. Do MVP à entrega final com equipe especializada.",
    m3Num: "03", m3Title: "Validação", m3Desc: "Testes com clientes reais e ciclos rápidos de ajuste. Tração comprovada antes de escalar o investimento.",
    m4Num: "04", m4Title: "Escala", m4Desc: "Com modelo validado, estruturamos capital, parcerias estratégicas e distribuição. Crescimento acelerado e sustentável.",
    foundersTag: "Fundadores",
    foundersH2a: "Os fundadores por",
    foundersH2b: "trás do ecossistema",
    f1Badge: "CEO & Co-Founder",
    f1Name: "Charles Lucca",
    f1Title: "Estratégia, Produto & Operações",
    f1Bio: "20+ anos em grandes corporações (Oracle, ADP, HCL, Santander, Boticário). Liderança de Produto, Dev, QA, DevOps, Cloud. Especialista em aceleração de negócios digitais e criação de novas unidades de receita.",
    f1Tags: ["PSM", "ITIL", "COBIT", "SAFe", "BR · MX · USA"],
    f2Badge: "CFO & Co-Founder",
    f2Name: "Rafael Gall",
    f2Title: "Finanças, Serviços & Licitações",
    f2Bio: "20+ anos em finanças, serviços e compras públicas. Especialista em alocação estratégica de capital e estruturação de novos negócios.",
    f2Tags: ["Finanças", "Licitações", "Investimentos"],
    ctaH2: "Pronto para fazer acontecer?",
    ctaSub: "Seja como consultoria estratégica, parceiro tecnológico, co-founder ou investidor — encontramos o modelo de colaboração ideal para o seu negócio.",
    ctaBtn: "Falar com a Multibrain →",
    ctaHref: "https://wa.me/5551993410110?text=Ol%C3%A1%2C%20Charles!%20Gostaria%20de%20conversar%20sobre%20uma%20oportunidade%20com%20a%20Multibrain.",
    footerDesc: "Innovation & Investment HUB. Desenvolvemos software, aceleramos negócios e investimos em fundadores com potencial de impacto real.",
    footerProd: "Produtos",
    footerEco: "Ecossistema",
    footerCo: "Empresa",
    footerServices: "Serviços",
    footerCases: "Cases",
    footerFounders: "Liderança",
    footerContact: "Contato",
    footerCopy: "© 2026 Multibrain Ecosystem. Todos os direitos reservados.",
    caseItems: [
      { num: "01 / Fintech", title: "RealCredPay", url: "realcredpay.com.br", desc: "Criação de nova unidade de negócio financeira. Plataforma de crédito e pagamentos digitais lançada sem expertise prévia no setor.", badge: "Consultoria Estratégica" },
      { num: "02 / E-commerce", title: "Qtok Quadros", url: "qtok.com.br", desc: "Estruturação de canal digital de vendas. E-commerce, logística integrada e marketing digital em tempo recorde.", badge: "Software + GTM" },
      { num: "03 / Construtech", title: "LinkObras — House Flipping", url: "linkobras.com.br", desc: "Estruturação de operação de investimento imobiliário via house flipping. Integração de capital, tecnologia e execução.", badge: "Smart Money" },
      { num: "04 / GovTech", title: "LinkLicita", url: "linklicita.com.br", desc: "Estruturação de operação de licitações e pregões públicos. Tecnologia, estratégia e capacitação para o mercado governamental.", badge: "Software + Ops" },
      { num: "05 / Multi-Vertical", title: "Expert Franquias", url: "expertfranquias.com.br", desc: "Três novas BUs lançadas: pregões públicos, crédito para construção civil e serviços para condomínios.", badge: "Business Units" },
      { num: "06 / CloudTech · LATAM", title: "AutoStacker — Expansão Internacional", url: "autostacker.app", desc: "Braço comercial estabelecido no México e EUA. Dois deals ativos com operadoras de telecom mexicanas.", badge: "Internacional" },
    ],
  },
  en: {
    navServices: "Services",
    navProducts: "Products",
    navCases: "Cases",
    navFounders: "Founders",
    navCta: "Contact Us →",
    navCtaHref: "https://wa.me/5551993410110?text=Hello%2C%20Charles!%20I'd%20like%20to%20talk%20about%20an%20opportunity%20with%20Multibrain.",
    heroTag: "Multibrain — Innovation & Investment HUB",
    heroH1a: "We accelerate businesses.",
    heroH1b: "We build the future.",
    heroSub: "High-impact executive consulting, software development and smart money for organizations seeking sustainable growth and structured innovation.",
    heroCta1: "Proven Results →",
    heroCta2: "Product Portfolio",
    stat1Label: "Years of combined executive experience",
    stat2Label: "Proprietary SaaS products active",
    stat3Label: "New business units structured",
    stat4Label: "Market verticals served",
    partnersLabel: "Ecosystem platform portfolio",
    servicesTag: "Engagement",
    servicesH2a: "Three modalities of",
    servicesH2b: "strategic engagement",
    s1Num: "01", s1Title: "Executive Consulting", s1Desc: "In-depth business diagnosis, identification of new revenue streams, team integration and operations structuring for high performance.",
    s1t1: "Diagnosis", s1t2: "Business Units", s1t3: "Go-to-Market",
    s2Num: "02", s2Title: "Software Development", s2Desc: "Custom digital products from MVP to enterprise scale. Expertise in SaaS, BaaS and AI-powered process automation.",
    s2t1: "SaaS/BaaS", s2t2: "AI", s2t3: "White-label",
    s3Num: "03", s3Title: "Smart Money & Investment", s3Desc: "Partnership/co-founder participation in scalable companies. Beyond capital: network and operational capacity.",
    s3t1: "Capital", s3t2: "SmartMoney", s3t3: "Co-Founding",
    productsTag: "Products",
    productsH2a: "6 SaaS platforms.",
    productsH2b: "8 market verticals.",
    productsLink: "Learn more →",
    p1Title: "AutoStacker", p1Desc: "White-label multi-tenant infrastructure and automation. Enterprise app deployment in minutes on any cloud.",
    p2Title: "SacOnline", p2Desc: "Omnichannel CRM with integrated AI. Centralizes WhatsApp, Instagram, Telegram in one platform.",
    p3Title: "LinkObras", p3Desc: "Integrated construction management. From bidding to project tracking with real-time financial control.",
    p4Title: "LinkLicita", p4Desc: "Strategic public tender management. Monitoring, opportunity analysis, efficient bid participation.",
    p5Title: "FocusQuest", p5Desc: "Gamified productivity for teams. Transforms goals into structured missions, boosts engagement.",
    p6Title: "ViralTrend", p6Desc: "Digital trend intelligence for brands and creators. Anticipate market movements.",
    casesTag: "Cases",
    casesH2a: "Consulting engagements",
    casesH2b: "that built real businesses",
    methodTag: "Methodology",
    methodH2a: "Our execution",
    methodH2b: "approach",
    m1Num: "01", m1Title: "Diagnosis", m1Desc: "In-depth business analysis to map operational pain points, unexplored opportunities, growth levers.",
    m2Num: "02", m2Title: "Building", m2Desc: "Solution development with speed and technical rigor. From MVP to final delivery with specialized team.",
    m3Num: "03", m3Title: "Validation", m3Desc: "Testing with real clients and rapid adjustment cycles. Traction proven before scaling investment.",
    m4Num: "04", m4Title: "Scale", m4Desc: "With validated model, structure capital, strategic partnerships, distribution. Accelerated, sustainable growth.",
    foundersTag: "Founders",
    foundersH2a: "The founders behind",
    foundersH2b: "the ecosystem",
    f1Badge: "CEO & Co-Founder",
    f1Name: "Charles Lucca",
    f1Title: "Strategy, Product & Operations",
    f1Bio: "20+ years in major corporations (Oracle, ADP, HCL, Santander, Boticário). Leadership in Product, Dev, QA, DevOps, Cloud. Expert in digital business acceleration and new revenue unit creation.",
    f1Tags: ["PSM", "ITIL", "COBIT", "SAFe", "BR · MX · USA"],
    f2Badge: "CFO & Co-Founder",
    f2Name: "Rafael Gall",
    f2Title: "Finance, Services & Public Tenders",
    f2Bio: "20+ years in finance, services, and public procurement. Specialist in strategic capital allocation and new business structuring.",
    f2Tags: ["Finance", "Tenders", "Investments"],
    ctaH2: "Ready to make it happen?",
    ctaSub: "Whether as strategic consulting, technology partner, co-founder or investor — we find the best collaboration model for your business.",
    ctaBtn: "Talk to Multibrain →",
    ctaHref: "https://wa.me/5551993410110?text=Hello%2C%20Charles!%20I'd%20like%20to%20talk%20about%20an%20opportunity%20with%20Multibrain.",
    footerDesc: "Innovation & Investment HUB. We develop software, accelerate businesses and invest in founders with real impact potential.",
    footerProd: "Products",
    footerEco: "Ecosystem",
    footerCo: "Company",
    footerServices: "Services",
    footerCases: "Cases",
    footerFounders: "Leadership",
    footerContact: "Contact",
    footerCopy: "© 2026 Multibrain Ecosystem. All rights reserved.",
    caseItems: [
      { num: "01 / Fintech", title: "RealCredPay", url: "realcredpay.com.br", desc: "New financial business unit creation. Digital credit and payments platform launched without prior sector expertise.", badge: "Strategic Consulting" },
      { num: "02 / E-commerce", title: "Qtok Quadros", url: "qtok.com.br", desc: "Digital sales channel structuring. E-commerce, integrated logistics, digital marketing in record time.", badge: "Software + GTM" },
      { num: "03 / Construtech", title: "LinkObras — House Flipping", url: "linkobras.com.br", desc: "Real estate investment operation structuring via house flipping. Integration of capital, technology, and execution.", badge: "Smart Money" },
      { num: "04 / GovTech", title: "LinkLicita", url: "linklicita.com.br", desc: "Public tender and auction operations structuring. Technology, strategy, and training for government market entry.", badge: "Software + Ops" },
      { num: "05 / Multi-Vertical", title: "Expert Franquias", url: "expertfranquias.com.br", desc: "Three new Business Units launched: public tenders, construction credit, condominium services.", badge: "Business Units" },
      { num: "06 / CloudTech · LATAM", title: "AutoStacker — International", url: "autostacker.app", desc: "Commercial arm in Mexico and USA. Two active deals with Mexican telecom companies and MVNOs.", badge: "International" },
    ],
  },
  es: {
    navServices: "Servicios",
    navProducts: "Productos",
    navCases: "Cases",
    navFounders: "Fundadores",
    navCta: "Contáctenos →",
    navCtaHref: "https://wa.me/5551993410110?text=Hola%2C%20Charles!%20Me%20gustar%C3%ADa%20conversar%20sobre%20una%20oportunidad%20con%20Multibrain.",
    heroTag: "Multibrain — HUB de Innovación e Inversión",
    heroH1a: "Aceleramos negocios.",
    heroH1b: "Construimos el futuro.",
    heroSub: "Consultoría ejecutiva de alto impacto, desarrollo de software y smart money para organizaciones que buscan crecimiento sostenible e innovación estructurada.",
    heroCta1: "Resultados Comprobados →",
    heroCta2: "Portafolio de Productos",
    stat1Label: "Años de experiencia ejecutiva combinada",
    stat2Label: "Productos SaaS propietarios activos",
    stat3Label: "Nuevas unidades de negocio estructuradas",
    stat4Label: "Verticales de mercado atendidas",
    partnersLabel: "Portafolio de plataformas del ecosistema",
    servicesTag: "Compromiso",
    servicesH2a: "Tres modalidades de",
    servicesH2b: "compromiso estratégico",
    s1Num: "01", s1Title: "Consultoría Ejecutiva", s1Desc: "Diagnóstico profundo del negocio, identificación de nuevas fuentes de ingresos, integración de equipos y estructuración de operaciones.",
    s1t1: "Diagnóstico", s1t2: "Business Units", s1t3: "Go-to-Market",
    s2Num: "02", s2Title: "Desarrollo de Software", s2Desc: "Productos digitales a medida, del MVP a la escala enterprise. Especialidad en SaaS, BaaS y automatización con IA.",
    s2t1: "SaaS/BaaS", s2t2: "AI/IA", s2t3: "White-label",
    s3Num: "03", s3Title: "Smart Money & Inversión", s3Desc: "Participación como socio/co-founder en empresas escalables. Más allá del capital: red y capacidad operacional.",
    s3t1: "Capital", s3t2: "SmartMoney", s3t3: "Co-Founding",
    productsTag: "Productos",
    productsH2a: "6 plataformas SaaS.",
    productsH2b: "8 verticales de mercado.",
    productsLink: "Saber más →",
    p1Title: "AutoStacker", p1Desc: "Infraestructura multi-tenant white-label y automatización. Deploy de apps enterprise en minutos en cualquier nube.",
    p2Title: "SacOnline", p2Desc: "CRM omnicanal con IA integrada. Centraliza WhatsApp, Instagram, Telegram en una plataforma.",
    p3Title: "LinkObras", p3Desc: "Gestión integrada de obras. Del licitación al seguimiento con control financiero en tiempo real.",
    p4Title: "LinkLicita", p4Desc: "Gestión estratégica de licitaciones públicas. Monitoreo, análisis de oportunidades y participación eficiente.",
    p5Title: "FocusQuest", p5Desc: "Productividad gamificada para equipos. Transforma metas en misiones estructuradas.",
    p6Title: "ViralTrend", p6Desc: "Inteligencia de tendencias digitales para marcas y creadores. Anticipa movimientos de mercado.",
    casesTag: "Cases",
    casesH2a: "Compromisos que",
    casesH2b: "construyeron negocios reales",
    methodTag: "Metodología",
    methodH2a: "Nuestro enfoque",
    methodH2b: "de ejecución",
    m1Num: "01", m1Title: "Diagnóstico", m1Desc: "Análisis profundo del negocio para mapear dolores operacionales, oportunidades inexploradas y palancas de crecimiento.",
    m2Num: "02", m2Title: "Construcción", m2Desc: "Desarrollo de la solución con velocidad y rigor técnico. Del MVP a la entrega final con equipo especializado.",
    m3Num: "03", m3Title: "Validación", m3Desc: "Pruebas con clientes reales y ciclos rápidos de ajuste. Tracción comprobada antes de escalar la inversión.",
    m4Num: "04", m4Title: "Escala", m4Desc: "Con modelo validado, estructuramos capital, alianzas estratégicas y distribución. Crecimiento acelerado y sostenible.",
    foundersTag: "Fundadores",
    foundersH2a: "Los fundadores detrás",
    foundersH2b: "del ecosistema",
    f1Badge: "CEO & Co-Founder",
    f1Name: "Charles Lucca",
    f1Title: "Estrategia, Producto & Operaciones",
    f1Bio: "20+ años en grandes corporaciones (Oracle, ADP, HCL, Santander, Boticário). Liderazgo en Producto, Dev, QA, DevOps, Cloud. Experto en aceleración de negocios digitales.",
    f1Tags: ["PSM", "ITIL", "COBIT", "SAFe", "BR · MX · USA"],
    f2Badge: "CFO & Co-Founder",
    f2Name: "Rafael Gall",
    f2Title: "Finanzas, Servicios & Licitaciones",
    f2Bio: "20+ años en finanzas, servicios y compras públicas. Especialista en asignación estratégica de capital y estructuración de nuevos negocios.",
    f2Tags: ["Finanzas", "Licitaciones", "Inversiones"],
    ctaH2: "¿Listo para hacerlo realidad?",
    ctaSub: "Ya sea como consultoría estratégica, socio tecnológico, co-founder o inversor — encontramos el modelo de colaboración ideal para tu negocio.",
    ctaBtn: "Hablar con Multibrain →",
    ctaHref: "https://wa.me/5551993410110?text=Hola%2C%20Charles!%20Me%20gustar%C3%ADa%20conversar%20sobre%20una%20oportunidad%20con%20Multibrain.",
    footerDesc: "Innovation & Investment HUB. Desarrollamos software, aceleramos negocios e invertimos en fundadores con potencial de impacto real.",
    footerProd: "Productos",
    footerEco: "Ecosistema",
    footerCo: "Empresa",
    footerServices: "Servicios",
    footerCases: "Cases",
    footerFounders: "Liderazgo",
    footerContact: "Contacto",
    footerCopy: "© 2026 Multibrain Ecosystem. Todos los derechos reservados.",
    caseItems: [
      { num: "01 / Fintech", title: "RealCredPay", url: "realcredpay.com.br", desc: "Creación de nueva unidad de negocio financiera. Plataforma de crédito y pagos digitales lanzada sin experiencia previa en el sector.", badge: "Consultoría Estratégica" },
      { num: "02 / E-commerce", title: "Qtok Quadros", url: "qtok.com.br", desc: "Estructuración de canal digital de ventas. E-commerce, logística integrada y marketing digital en tiempo récord.", badge: "Software + GTM" },
      { num: "03 / Construtech", title: "LinkObras — House Flipping", url: "linkobras.com.br", desc: "Estructuración de operación de inversión inmobiliaria via house flipping. Integración de capital, tecnología y ejecución.", badge: "Smart Money" },
      { num: "04 / GovTech", title: "LinkLicita", url: "linklicita.com.br", desc: "Estructuración de operación de licitaciones públicas. Tecnología, estrategia y capacitación para el mercado gubernamental.", badge: "Software + Ops" },
      { num: "05 / Multi-Vertical", title: "Expert Franquias", url: "expertfranquias.com.br", desc: "Tres nuevas BUs lanzadas: licitaciones públicas, crédito construcción, servicios para condominios.", badge: "Business Units" },
      { num: "06 / CloudTech · LATAM", title: "AutoStacker — Internacional", url: "autostacker.app", desc: "Brazo comercial en México y EUA. Dos deals activos con operadoras de telecom mexicanas.", badge: "Internacional" },
    ],
  },
};

const partners = [
  { name: "AutoStacker", href: "https://autostacker.app" },
  { name: "SacOnline", href: "https://saconline.app" },
  { name: "LinkObras", href: "https://linkobras.com.br" },
  { name: "LinkLicita", href: "https://linklicita.com.br" },
  { name: "FocusQuest", href: "https://focusquest.online" },
  { name: "ViralTrend", href: "https://viraltrend.app" },
  { name: "RealCredPay", href: "https://realcredpay.com.br" },
  { name: "ExpertFranquias", href: "https://expertfranquias.com.br" },
];

const productIcons = ["⚡", "💬", "🏗️", "📋", "🏆", "📊"];
const productLinks = [
  "https://autostacker.app",
  "https://saconline.app",
  "https://linkobras.com.br",
  "https://linklicita.com.br",
  "https://focusquest.online",
  "https://viraltrend.app",
];

const Home = () => {
  const [lang, setLangState] = useState<Lang>("pt");
  const [theme, setThemeState] = useState<Theme>("light");

  useEffect(() => {
    const savedLang = (localStorage.getItem("mb-lang") as Lang) || "pt";
    const savedTheme = (localStorage.getItem("mb-theme") as Theme) || "light";
    setLangState(savedLang);
    setThemeState(savedTheme);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("data-mb-theme", theme);
  }, [theme]);

  const setLang = (l: Lang) => {
    setLangState(l);
    localStorage.setItem("mb-lang", l);
  };

  const toggleTheme = () => {
    const next: Theme = theme === "dark" ? "light" : "dark";
    setThemeState(next);
    localStorage.setItem("mb-theme", next);
  };

  const tx = t[lang];

  const products = [
    { title: tx.p1Title, desc: tx.p1Desc, href: productLinks[0] },
    { title: tx.p2Title, desc: tx.p2Desc, href: productLinks[1] },
    { title: tx.p3Title, desc: tx.p3Desc, href: productLinks[2] },
    { title: tx.p4Title, desc: tx.p4Desc, href: productLinks[3] },
    { title: tx.p5Title, desc: tx.p5Desc, href: productLinks[4] },
    { title: tx.p6Title, desc: tx.p6Desc, href: productLinks[5] },
  ];

  return (
    <div className="mb-root" data-mb-theme={theme}>

      {/* NAV */}
      <nav className="mb-nav">
        <a href="#" className="mb-nav-logo">
          <img src="/logo-cerebro-light.png" alt="Multibrain" className="mb-logo-light" />
          <img src="/logo-cerebro-dark.png" alt="Multibrain" className="mb-logo-dark" />
          <span className="mb-nav-brand">MultiBrain</span>
        </a>
        <ul className="mb-nav-links">
          <li><a href="#mb-servicos">{tx.navServices}</a></li>
          <li><a href="#mb-produtos">{tx.navProducts}</a></li>
          <li><a href="#mb-cases">{tx.navCases}</a></li>
          <li><a href="#mb-fundadores">{tx.navFounders}</a></li>
        </ul>
        <div className="mb-nav-right">
          <div className="mb-controls">
            <div className="mb-lang-switcher">
              {(["pt", "en", "es"] as Lang[]).map((l) => (
                <button
                  key={l}
                  className={`mb-lang-btn${lang === l ? " active" : ""}`}
                  onClick={() => setLang(l)}
                >
                  {l.toUpperCase()}
                </button>
              ))}
            </div>
            <button className="mb-theme-toggle" onClick={toggleTheme} title="Toggle theme">
              {theme === "dark" ? "☀️" : "🌙"}
            </button>
          </div>
          <a className="mb-nav-cta" href={tx.navCtaHref} target="_blank" rel="noreferrer">
            {tx.navCta}
          </a>
        </div>
      </nav>

      {/* HERO */}
      <section className="mb-hero">
        <div className="mb-hero-grid" />
        <div className="mb-hero-blob" />
        <div className="mb-hero-tag">{tx.heroTag}</div>
        <h1>
          {tx.heroH1a}<br />
          <em>{tx.heroH1b}</em>
        </h1>
        <p className="mb-hero-sub">{tx.heroSub}</p>
        <div className="mb-hero-actions">
          <a href="#mb-cases" className="mb-btn-primary">{tx.heroCta1}</a>
          <a href="#mb-produtos" className="mb-btn-secondary">{tx.heroCta2}</a>
        </div>
      </section>

      {/* STATS */}
      <div className="mb-stats-bar">
        <div className="mb-stat"><div className="mb-stat-num"><span>20</span>+</div><div className="mb-stat-label">{tx.stat1Label}</div></div>
        <div className="mb-stat"><div className="mb-stat-num"><span>6</span></div><div className="mb-stat-label">{tx.stat2Label}</div></div>
        <div className="mb-stat"><div className="mb-stat-num"><span>5</span>+</div><div className="mb-stat-label">{tx.stat3Label}</div></div>
        <div className="mb-stat"><div className="mb-stat-num"><span>8</span></div><div className="mb-stat-label">{tx.stat4Label}</div></div>
      </div>

      {/* PARTNERS */}
      <div className="mb-partners-section">
        <p className="mb-partners-label">{tx.partnersLabel}</p>
        <div className="mb-partners-track">
          {partners.map((p) => (
            <a key={p.name} href={p.href} className="mb-partner-logo" target="_blank" rel="noreferrer">
              {p.name}
            </a>
          ))}
        </div>
      </div>

      {/* SERVICES */}
      <section id="mb-servicos" className="mb-section">
        <div className="mb-section-tag">{tx.servicesTag}</div>
        <h2>{tx.servicesH2a} <em>{tx.servicesH2b}</em></h2>
        <div className="mb-services-grid">
          {[
            { num: tx.s1Num, title: tx.s1Title, desc: tx.s1Desc, tags: [tx.s1t1, tx.s1t2, tx.s1t3] },
            { num: tx.s2Num, title: tx.s2Title, desc: tx.s2Desc, tags: [tx.s2t1, tx.s2t2, tx.s2t3] },
            { num: tx.s3Num, title: tx.s3Title, desc: tx.s3Desc, tags: [tx.s3t1, tx.s3t2, tx.s3t3] },
          ].map((s) => (
            <div key={s.num} className="mb-service-card">
              <div className="mb-service-num">{s.num}</div>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
              <div className="mb-tag-list">
                {s.tags.map((tag) => <span key={tag} className="mb-tag-pill">{tag}</span>)}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* PRODUCTS */}
      <section id="mb-produtos" className="mb-section mb-products-section">
        <div className="mb-products-header">
          <div>
            <div className="mb-section-tag">{tx.productsTag}</div>
            <h2>{tx.productsH2a} <em>{tx.productsH2b}</em></h2>
          </div>
        </div>
        <div className="mb-products-grid">
          {products.map((p, i) => (
            <div key={p.title} className="mb-product-card">
              <div className="mb-product-icon">{productIcons[i]}</div>
              <h3>{p.title}</h3>
              <p>{p.desc}</p>
              <a href={p.href} className="mb-product-link" target="_blank" rel="noreferrer">
                {tx.productsLink}
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* CASES */}
      <section id="mb-cases" className="mb-section">
        <div className="mb-section-tag">{tx.casesTag}</div>
        <h2>{tx.casesH2a} <em>{tx.casesH2b}</em></h2>
        <div className="mb-cases-list">
          {tx.caseItems.map((c) => (
            <div key={c.title} className="mb-case-item">
              <div>
                <div className="mb-case-num">{c.num}</div>
                <div className="mb-case-title">{c.title}</div>
                <div className="mb-case-url">{c.url}</div>
              </div>
              <div className="mb-case-desc">{c.desc}</div>
              <span className="mb-case-badge">{c.badge}</span>
            </div>
          ))}
        </div>
      </section>

      {/* METHODOLOGY */}
      <section className="mb-section mb-method-section">
        <div className="mb-section-tag">{tx.methodTag}</div>
        <h2>{tx.methodH2a} <em>{tx.methodH2b}</em></h2>
        <div className="mb-method-grid">
          {[
            { num: tx.m1Num, title: tx.m1Title, desc: tx.m1Desc },
            { num: tx.m2Num, title: tx.m2Title, desc: tx.m2Desc },
            { num: tx.m3Num, title: tx.m3Title, desc: tx.m3Desc },
            { num: tx.m4Num, title: tx.m4Title, desc: tx.m4Desc },
          ].map((m) => (
            <div key={m.num} className="mb-method-step">
              <div className="mb-step-num">{m.num}</div>
              <h3>{m.title}</h3>
              <p>{m.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FOUNDERS */}
      <section id="mb-fundadores" className="mb-section mb-founders-section">
        <div className="mb-section-tag">{tx.foundersTag}</div>
        <h2>{tx.foundersH2a} <em>{tx.foundersH2b}</em></h2>
        <div className="mb-founders-grid">
          {/* Charles */}
          <div className="mb-founder-card">
            <div className="mb-founder-photo">
              <img src="/charles-removebg-1.png" alt="Charles Lucca"
                onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                style={{ objectFit: "contain", width: "100%", height: "100%" }} />
              <div className="mb-founder-avatar">CL</div>
            </div>
            <div>
              <span className="mb-founder-badge">{tx.f1Badge}</span>
              <div className="mb-founder-name">{tx.f1Name}</div>
              <div className="mb-founder-title">{tx.f1Title}</div>
              <p className="mb-founder-bio">{tx.f1Bio}</p>
              <div className="mb-founder-tags">
                {tx.f1Tags.map((tag) => <span key={tag} className="mb-founder-tag">{tag}</span>)}
              </div>
            </div>
          </div>
          {/* Rafael */}
          <div className="mb-founder-card">
            <div className="mb-founder-photo">
              <img src="/rafael_gall-removebg-1.png" alt="Rafael Gall"
                onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                style={{ objectFit: "contain", width: "100%", height: "100%" }} />
              <div className="mb-founder-avatar">RG</div>
            </div>
            <div>
              <span className="mb-founder-badge">{tx.f2Badge}</span>
              <div className="mb-founder-name">{tx.f2Name}</div>
              <div className="mb-founder-title">{tx.f2Title}</div>
              <p className="mb-founder-bio">{tx.f2Bio}</p>
              <div className="mb-founder-tags">
                {tx.f2Tags.map((tag) => <span key={tag} className="mb-founder-tag">{tag}</span>)}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mb-cta-section">
        <div className="mb-section-tag">{tx.servicesTag}</div>
        <h2>{tx.ctaH2}</h2>
        <p className="mb-cta-sub">{tx.ctaSub}</p>
        <a href={tx.ctaHref} className="mb-btn-primary" target="_blank" rel="noreferrer">
          {tx.ctaBtn}
        </a>
      </section>

      {/* FOOTER */}
      <footer className="mb-footer">
        <div className="mb-footer-top">
          <div className="mb-footer-brand">
            <img src="/logo-cerebro-dark.png" alt="Multibrain" style={{ height: 48, marginBottom: 8 }} />
          <div style={{ color: "#fff", fontFamily: "var(--mb-ff-display)", fontWeight: 800, fontSize: 18, letterSpacing: "-0.02em", marginBottom: 12 }}>MultiBrain</div>
            <p>{tx.footerDesc}</p>
          </div>
          <div className="mb-footer-col">
            <div className="mb-footer-col-title">{tx.footerProd}</div>
            <a href="https://autostacker.app" target="_blank" rel="noreferrer">AutoStacker</a>
            <a href="https://saconline.app" target="_blank" rel="noreferrer">SacOnline</a>
            <a href="https://linkobras.com.br" target="_blank" rel="noreferrer">LinkObras</a>
            <a href="https://linklicita.com.br" target="_blank" rel="noreferrer">LinkLicita</a>
            <a href="https://focusquest.online" target="_blank" rel="noreferrer">FocusQuest</a>
            <a href="https://viraltrend.app" target="_blank" rel="noreferrer">ViralTrend</a>
          </div>
          <div className="mb-footer-col">
            <div className="mb-footer-col-title">{tx.footerEco}</div>
            <a href="#">Multibrain Hold</a>
            <a href="https://realcredpay.com.br" target="_blank" rel="noreferrer">RealCredPay</a>
            <a href="https://expertfranquias.com.br" target="_blank" rel="noreferrer">ExpertFranquias</a>
            <a href="#">Qtok Quadros</a>
          </div>
          <div className="mb-footer-col">
            <div className="mb-footer-col-title">{tx.footerCo}</div>
            <a href="#mb-servicos">{tx.footerServices}</a>
            <a href="#mb-cases">{tx.footerCases}</a>
            <a href="#mb-fundadores">{tx.footerFounders}</a>
            <a href={tx.navCtaHref} target="_blank" rel="noreferrer">{tx.footerContact}</a>
          </div>
        </div>
        <div className="mb-footer-bottom">
          <span>{tx.footerCopy}</span>
          <span>multibrain.com.br</span>
        </div>
      </footer>

    </div>
  );
};

export default Home;
