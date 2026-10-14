import { ReactNode, useEffect } from "react";
import { Link } from "react-router-dom";
import "@/styles/v2.css";
import { CNPJ, INSTAGRAM_URL, LINKEDIN_URL, isExternal, whatsapp } from "./content";

type Props = {
  title: string;
  description: string;
  /** "site" = menu completo e rodapé completo (home). "lp" = só logo + 1 botão (landing pages). */
  variant?: "site" | "lp";
  /** Nome do produto exibido no lugar de "multibrain" (ex.: SacOnline). */
  productName?: string;
  ctaLabel: string;
  ctaHref: string;
  children: ReactNode;
};

/** O v2 virou a home do site: as páginas são indexadas normalmente. */
const NOINDEX = false;

const FONTS_HREF =
  "https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500&family=IBM+Plex+Sans:wght@400;500;600;700&display=swap";

const useV2Fonts = () => {
  useEffect(() => {
    if (document.head.querySelector(`link[href="${FONTS_HREF}"]`)) return;
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = FONTS_HREF;
    document.head.appendChild(link);
  }, []);
};

const usePageMeta = (title: string, description: string) => {
  useEffect(() => {
    const prevTitle = document.title;
    document.title = title;

    const setMeta = (name: string, content: string) => {
      let tag = document.head.querySelector<HTMLMetaElement>(`meta[name="${name}"]`);
      const created = !tag;
      if (!tag) {
        tag = document.createElement("meta");
        tag.name = name;
        document.head.appendChild(tag);
      }
      const prev = tag.content;
      tag.content = content;
      return () => {
        if (created) tag?.remove();
        else if (tag) tag.content = prev;
      };
    };

    const restoreDesc = setMeta("description", description);
    const restoreRobots = NOINDEX ? setMeta("robots", "noindex, nofollow") : () => {};
    window.scrollTo(0, 0);

    return () => {
      document.title = prevTitle;
      restoreDesc();
      restoreRobots();
    };
  }, [title, description]);
};

export const SmartLink = ({ href, className, children }: { href: string; className?: string; children: ReactNode }) =>
  isExternal(href) || href.startsWith("#") ? (
    <a href={href} className={className} {...(isExternal(href) ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
      {children}
    </a>
  ) : (
    <Link to={href} className={className}>
      {children}
    </Link>
  );

const Brand = ({ productName }: { productName?: string }) => (
  <Link to="/" className="v2-brand" aria-label="Multibrain, página inicial">
    <img src="/logo-cerebro-dark.png" alt="" width={34} height={34} />
    {productName ? (
      <>
        <span className="v2-brand__name">{productName}</span>
        <span className="v2-brand__by">por multibrain</span>
      </>
    ) : (
      <span className="v2-brand__name">multibrain</span>
    )}
  </Link>
);

const V2Layout = ({ title, description, variant = "lp", productName, ctaLabel, ctaHref, children }: Props) => {
  usePageMeta(title, description);
  useV2Fonts();
  const year = new Date().getFullYear();

  return (
    <div className="v2">
      <header className="v2-header">
        <div className="v2-wrap v2-header__inner">
          <Brand productName={productName} />
          <nav className="v2-nav" aria-label="Principal">
            {variant === "site" && (
              <>
                <a href="#solucoes">Soluções</a>
                <a href="#produtos">Produtos</a>
                <a href="#cases">Cases</a>
                <a href="#como">Como trabalhamos</a>
              </>
            )}
            <SmartLink href={ctaHref} className="v2-btn v2-btn--primary v2-btn--sm">
              {ctaLabel}
            </SmartLink>
          </nav>
        </div>
      </header>

      <main>{children}</main>

      {variant === "site" ? (
        <footer className="v2-footer">
          <div className="v2-wrap v2-footer__inner">
            <div style={{ flex: "1 1 280px", minWidth: 0 }}>
              <div className="v2-brand__name">multibrain</div>
              <p className="v2-body" style={{ marginTop: 10, maxWidth: 320 }}>
                Construímos, operamos e investimos em tecnologia.
              </p>
              <p className="v2-source" style={{ marginTop: 18 }}>
                © {year} Multibrain{CNPJ ? ` · CNPJ ${CNPJ}` : ""}
              </p>
            </div>
            <div className="v2-footer__cols">
              <div className="v2-footer__col">
                <span className="v2-footer__label">EMPRESA</span>
                <a href="#solucoes">Soluções</a>
                <a href="#produtos">Produtos</a>
                <a href="#cases">Cases</a>
              </div>
              <div className="v2-footer__col">
                <span className="v2-footer__label">PÁGINAS</span>
                <Link to="/v2/sistema-30-dias">Sistema em 30 dias</Link>
                <Link to="/v2/saconline">SacOnline</Link>
                <Link to="/v2/diagnostico">Diagnóstico Estratégico</Link>
                <Link to="/club">Multibrain Club</Link>
              </div>
              <div className="v2-footer__col">
                <span className="v2-footer__label">CONTATO</span>
                <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer">Instagram</a>
                {LINKEDIN_URL && (
                  <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer">LinkedIn</a>
                )}
                <a href={whatsapp("Olá! Vim pelo site da Multibrain.")} target="_blank" rel="noopener noreferrer">
                  WhatsApp
                </a>
              </div>
            </div>
          </div>
        </footer>
      ) : (
        <footer className="v2-footer v2-footer--slim" style={{ padding: "32px 0" }}>
          <div className="v2-wrap v2-footer__inner">
            <span>
              {productName ? `${productName} é um produto Multibrain` : `© ${year} Multibrain`}
              {CNPJ ? ` · CNPJ ${CNPJ}` : ""}
            </span>
            <Link to="/">multibrain.com.br</Link>
          </div>
        </footer>
      )}
    </div>
  );
};

export default V2Layout;
