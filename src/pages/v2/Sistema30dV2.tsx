import V2Layout, { SmartLink } from "./V2Layout";
import Faq from "./Faq";
import { CASES, scheduleLink } from "./content";

const SCHEDULE = scheduleLink("Olá! Vi a página do Sistema em 30 dias e quero agendar um diagnóstico gratuito.");

const PAINS = [
  ["Paga caro e usa pouco", "Assinaturas que crescem a cada usuário novo, para usar 20% das funções."],
  ["Adapta a empresa ao software", "O time contorna a ferramenta em vez de a ferramenta seguir o seu processo."],
  ["Vive de planilha e retrabalho", "Dados copiados à mão entre sistemas, erros e horas perdidas toda semana."],
  ["Já tentou e travou", "Orçou desenvolvimento e ouviu \"seis meses\". Ou começou e nunca terminou."],
];

const WEEKS = [
  ["Semana 1", "Diagnóstico e escopo", "Mapeamos o processo, definimos o que entra e fechamos prazo e investimento."],
  ["Semana 2", "Protótipo navegável", "Você vê e clica nas telas antes da primeira linha de código definitiva."],
  ["Semana 3", "Construção e integrações", "Sistema funcionando e conectado ao que você já usa: WhatsApp, e-mail, ERP, planilhas."],
  ["Semana 4", "Testes, treinamento e go-live", "Seu time treinado, dados migrados e o sistema em produção."],
];

const INCLUDED = [
  "Sistema desenhado para o seu processo",
  "Hospedagem e infraestrutura gerenciadas",
  "Integrações com suas ferramentas",
  "Treinamento da equipe",
  "Suporte e evolução contínua",
  "Sem cobrança por usuário [confirmar]",
];

const FAQ = [
  { q: "Quanto custa?", a: "Depende do escopo. Você sai do diagnóstico com valor e prazo fechados, antes de qualquer compromisso." },
  { q: "30 dias é realista?", a: "Para o escopo definido no diagnóstico, sim. Trabalhamos com uma base de componentes e infraestrutura própria já em produção, o que elimina meses de trabalho repetido." },
  { q: "Funciona com as ferramentas que já uso?", a: "Sim. Integramos com WhatsApp, e-mail, ERPs, planilhas e outras ferramentas via API." },
  { q: "Quem mantém o sistema depois?", a: "Nós. Hospedamos, monitoramos e evoluímos o sistema conforme o seu negócio muda." },
  { q: "O sistema é meu?", a: "[Explicar o modelo de propriedade: código, dados e licença.]" },
];

const Sistema30dV2 = () => (
  <V2Layout
    title="Multibrain — Sistema próprio em 30 dias"
    description="Pare de pagar por software que não foi feito para a sua empresa. Um sistema único, sob medida, em produção em até 30 dias."
    ctaLabel="Agendar diagnóstico"
    ctaHref={SCHEDULE}
  >
    {/* HERO */}
    <section className="v2-wrap" style={{ padding: "80px 24px 88px" }}>
      <div className="v2-split">
        <div style={{ flex: "1 1 520px" }}>
          <span className="v2-pill">Sistema próprio em 30 dias</span>
          <h1 className="v2-h1" style={{ fontSize: "clamp(38px, 5vw, 64px)" }}>
            Pare de pagar por software <span className="v2-hl">que não foi feito para a sua empresa.</span>
          </h1>
          <p className="v2-lead">
            Trocamos as assinaturas, planilhas e gambiarras do seu dia a dia por um sistema único, desenhado para o seu
            processo e em produção em até 30 dias.
          </p>
          <div className="v2-actions">
            <SmartLink href={SCHEDULE} className="v2-btn v2-btn--primary v2-btn--lg">Agendar diagnóstico gratuito</SmartLink>
            <span className="v2-small">30 minutos · online · sem compromisso</span>
          </div>
        </div>
        <div style={{ flex: "1 1 400px", display: "flex", flexDirection: "column", gap: 16 }}>
          <div className="v2-card" style={{ padding: 24 }}>
            <div className="v2-num" style={{ fontSize: 12, letterSpacing: "0.06em" }}>HOJE</div>
            <div className="v2-chips">
              {["CRM genérico", "Planilhas", "ERP engessado", "WhatsApp manual", "Licença por usuário"].map((c) => (
                <span className="v2-chip" key={c}>{c}</span>
              ))}
            </div>
            <p className="v2-small" style={{ marginTop: 14, color: "var(--v2-low)" }}>
              Várias ferramentas, nenhuma conversa com a outra.
            </p>
          </div>
          <div className="v2-card v2-card--deep" style={{ padding: 24, borderColor: "var(--v2-accent)" }}>
            <div className="v2-num v2-num--accent" style={{ fontSize: 12, letterSpacing: "0.06em" }}>EM 30 DIAS</div>
            <div style={{ marginTop: 12, fontSize: 24, fontWeight: 600, letterSpacing: "-0.01em" }}>
              Um sistema. Seus dados. Suas regras.
            </div>
            <p className="v2-body" style={{ marginTop: 10, fontSize: 15 }}>
              Feito para o seu processo, integrado ao que você já usa e operado por quem construiu.
            </p>
          </div>
        </div>
      </div>
    </section>

    {/* PAIN */}
    <section className="v2-band">
      <div className="v2-wrap v2-section--tight">
        <h2 className="v2-h2" style={{ maxWidth: 720 }}>
          Se você se reconhece em pelo menos um destes, essa conversa é para você.
        </h2>
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

    {/* 30 DAYS */}
    <section className="v2-wrap v2-section">
      <p className="v2-eyebrow">Como funciona</p>
      <h2 className="v2-h2" style={{ maxWidth: 720 }}>Do diagnóstico ao sistema no ar, semana a semana.</h2>
      <ol className="v2-grid v2-grid--4" style={{ listStyle: "none", padding: 0, marginTop: 48, gap: 16 }}>
        {WEEKS.map(([w, t, d]) => (
          <li className="v2-card" style={{ padding: 26 }} key={w}>
            <div className="v2-num v2-num--accent" style={{ fontSize: 13 }}>{w.toUpperCase()}</div>
            <h3 className="v2-h3" style={{ fontSize: 20, margin: "10px 0 8px" }}>{t}</h3>
            <p className="v2-body">{d}</p>
          </li>
        ))}
      </ol>
      <div className="v2-card v2-included">
        <span className="v2-num v2-included__label" style={{ fontSize: 13, letterSpacing: "0.06em" }}>O QUE ESTÁ INCLUÍDO</span>
        {INCLUDED.map((i) => <span className="v2-check" key={i}>{i}</span>)}
      </div>
    </section>

    {/* PROOF */}
    <section className="v2-band v2-band--deep">
      <div className="v2-wrap v2-section">
        <p className="v2-eyebrow">Resultados</p>
        <h2 className="v2-h2" style={{ maxWidth: 720 }}>Não é promessa. É o que já está rodando.</h2>
        <div className="v2-grid v2-grid--4" style={{ marginTop: 48 }}>
          <div className="v2-card v2-card--flat" style={{ borderColor: "var(--v2-line-strong)", padding: 28 }}>
            <div className="v2-num" style={{ fontSize: 12 }}>{CASES.qtok.label.toUpperCase()}</div>
            <div className="v2-big" style={{ marginTop: 14 }}>{CASES.qtok.value}</div>
            <p className="v2-body" style={{ marginTop: 8 }}>{CASES.qtok.text}</p>
          </div>
          <div className="v2-card v2-card--flat" style={{ borderColor: "var(--v2-line-strong)", padding: 28 }}>
            <div className="v2-num" style={{ fontSize: 12 }}>{CASES.documerge.label.toUpperCase()}</div>
            <div className="v2-big" style={{ marginTop: 14 }}>{CASES.documerge.value}</div>
            <p className="v2-body" style={{ marginTop: 8 }}>{CASES.documerge.text}</p>
          </div>
          <div className="v2-card v2-card--flat" style={{ borderColor: "var(--v2-line-strong)", padding: 28 }}>
            <div className="v2-num" style={{ fontSize: 12 }}>{CASES.ensino.label.toUpperCase()}</div>
            <div className="v2-big" style={{ marginTop: 14 }}>{CASES.ensino.value}</div>
            <p className="v2-body" style={{ marginTop: 8 }}>{CASES.ensino.text}</p>
          </div>
          <div className="v2-card v2-card--flat" style={{ borderColor: "var(--v2-line-strong)", padding: 28 }}>
            <div className="v2-num" style={{ fontSize: 12 }}>AUTOSTACKER</div>
            <div className="v2-big" style={{ marginTop: 14 }}>1.100 apps</div>
            <p className="v2-body" style={{ marginTop: 8 }}>
              implantados para 445 clientes ativos em 309 servidores gerenciados (fev/2026).
            </p>
          </div>
        </div>
      </div>
    </section>

    {/* FOR WHOM */}
    <section className="v2-wrap v2-section">
      <div className="v2-split v2-split--top" style={{ gap: 24 }}>
        <div className="v2-card" style={{ flex: "1 1 420px" }}>
          <h2 className="v2-h3" style={{ fontSize: 26, marginBottom: 18 }}>É para você se…</h2>
          <ul className="v2-list" style={{ lineHeight: 2 }}>
            <li>Sua empresa tem um processo que é o coração do negócio</li>
            <li>Você paga várias ferramentas que não se conversam</li>
            <li>Quer dados e regras sob seu controle</li>
            <li>Precisa de resultado em semanas, não em semestres</li>
          </ul>
        </div>
        <div className="v2-card v2-card--flat" style={{ flex: "1 1 420px" }}>
          <h2 className="v2-h3" style={{ fontSize: 26, marginBottom: 18 }}>Não é para você se…</h2>
          <ul className="v2-list v2-body" style={{ lineHeight: 2 }}>
            <li>Uma ferramenta pronta já resolve 100% do seu caso</li>
            <li>Você busca o menor preço, não o melhor resultado</li>
            <li>Não tem ninguém para validar o sistema com a gente</li>
          </ul>
        </div>
      </div>
    </section>

    <Faq items={FAQ} />

    {/* FINAL CTA */}
    <section className="v2-band" style={{ borderBottom: 0 }}>
      <div className="v2-narrow v2-center" style={{ padding: "96px 24px" }}>
        <h2 className="v2-h2" style={{ fontSize: "clamp(30px, 3.8vw, 50px)", lineHeight: 1.08, maxWidth: "none" }}>
          Daqui a 30 dias, sua empresa pode estar rodando no próprio sistema.
        </h2>
        <p className="v2-lead" style={{ fontSize: 18, marginTop: 18 }}>
          Agende 30 minutos com nosso time. Você sai com um diagnóstico do seu processo, mesmo que não feche com a gente.
        </p>
        <div className="v2-actions" style={{ marginTop: 32 }}>
          <SmartLink href={SCHEDULE} className="v2-btn v2-btn--primary v2-btn--lg">Agendar diagnóstico gratuito</SmartLink>
        </div>
        <p className="v2-small" style={{ marginTop: 14, color: "var(--v2-low)" }}>Vagas limitadas por mês para garantir o prazo.</p>
      </div>
    </section>
  </V2Layout>
);

export default Sistema30dV2;
