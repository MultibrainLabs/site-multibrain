import { useState } from "react";

const PASSWORD = "@Aguiar@2026";

export default function ValuationAguiar() {
  const [input, setInput] = useState("");
  const [unlocked, setUnlocked] = useState(false);
  const [error, setError] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (input === PASSWORD) {
      setUnlocked(true);
    } else {
      setError(true);
      setInput("");
    }
  }

  if (unlocked) {
    return (
      <iframe
        src="/valuation-aguiar-2026.html"
        style={{ width: "100%", height: "100vh", border: "none", display: "block" }}
        title="Valuation — Aguiar 2026"
      />
    );
  }

  return (
    <div style={{
      minHeight: "100vh",
      background: "#0a0a0f",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}>
      <div style={{
        background: "#12121a",
        border: "1px solid rgba(255,255,255,0.07)",
        borderRadius: 16,
        padding: "2.5rem 2rem",
        width: "100%",
        maxWidth: 380,
        textAlign: "center",
        boxSizing: "border-box",
        margin: "1rem",
      }}>
        <div style={{
          fontWeight: 700,
          fontSize: "1.25rem",
          color: "#8B3CF7",
          marginBottom: "0.25rem",
          letterSpacing: "-0.02em",
        }}>
          MultiBrain <span style={{ color: "rgba(240,240,248,0.4)", fontWeight: 400 }}>·</span> Valuation
        </div>
        <p style={{ color: "#7a7a9a", fontSize: "0.85rem", margin: "0.25rem 0 2rem" }}>
          Área restrita — insira a senha para continuar
        </p>

        <form onSubmit={handleSubmit} style={{ textAlign: "left" }}>
          <label style={{ display: "block", fontSize: 13, color: "#7a7a9a", marginBottom: 6 }}>
            Senha de acesso
          </label>
          <input
            type="password"
            value={input}
            onChange={e => { setInput(e.target.value); setError(false); }}
            placeholder="••••••••••"
            autoFocus
            style={{
              width: "100%",
              background: "#1a1a26",
              border: `1px solid ${error ? "#ff4d6d" : "rgba(255,255,255,0.07)"}`,
              borderRadius: 8,
              color: "#f0f0f8",
              fontSize: 14,
              padding: "10px 14px",
              outline: "none",
              marginBottom: error ? "0.4rem" : "1rem",
              boxSizing: "border-box",
              transition: "border-color .2s",
            }}
          />
          {error && (
            <p style={{ color: "#ff4d6d", fontSize: 12, marginBottom: "1rem", marginTop: 0 }}>
              Senha incorreta. Tente novamente.
            </p>
          )}
          <button
            type="submit"
            style={{
              width: "100%",
              background: "#8B3CF7",
              color: "#fff",
              border: "none",
              borderRadius: 8,
              fontWeight: 700,
              fontSize: 14,
              padding: "11px 22px",
              cursor: "pointer",
              letterSpacing: "-0.01em",
            }}
          >
            Entrar →
          </button>
        </form>

        <p style={{ color: "#4a4a6a", fontSize: 11, marginTop: "1.75rem", marginBottom: 0 }}>
          MultiBrain · Documento Confidencial
        </p>
      </div>
    </div>
  );
}
