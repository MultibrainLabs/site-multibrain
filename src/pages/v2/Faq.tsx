type Item = { q: string; a: string };

const Faq = ({ items, title = "Perguntas frequentes" }: { items: Item[]; title?: string }) => (
  <section className="v2-section" style={{ borderTop: "1px solid var(--v2-line)" }}>
    <div className="v2-narrow">
      <h2 className="v2-h2" style={{ marginBottom: 32 }}>{title}</h2>
      <div className="v2-faq">
        {items.map((it) => (
          <details key={it.q}>
            <summary>{it.q}</summary>
            <p>{it.a}</p>
          </details>
        ))}
      </div>
    </div>
  </section>
);

export default Faq;
