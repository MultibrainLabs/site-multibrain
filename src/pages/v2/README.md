# Site v2 (em teste)

Rotas novas, sem alterar a home atual:

| Rota | Página |
| --- | --- |
| `/v2` | Nova home institucional |
| `/v2/sistema-30-dias` | LP-1 — Sistema próprio em 30 dias |
| `/v2/saconline` | LP-2 — SacOnline |
| `/v2/diagnostico` | LP-3 — Diagnóstico Estratégico |

## Onde editar

- **Contatos, produtos, números e cases:** `content.ts`
  - `SCHEDULE_URL`: link do Calendly. Enquanto vazio, os botões de agendamento abrem o WhatsApp.
  - `DIAGNOSTICO_URL`: página de agendamento do Diagnóstico Estratégico (botões da LP-3). Enquanto vazio, usa `SCHEDULE_URL`.
  - `LINKEDIN_URL` e `CNPJ`: aparecem no rodapé quando preenchidos.
- **Cabeçalho, rodapé, título e meta tags:** `V2Layout.tsx`
- **Visual (cores, fontes, espaçamentos):** `src/styles/v2.css`, tudo escopado em `.v2`

## Pendências de conteúdo

Marcadas com `[...]` nas páginas: modelo de propriedade do sistema (LP-1), limites, prazo e preço do SacOnline (LP-2),
prazo de entrega do mapa de soluções e se o diagnóstico é gratuito (LP-3).

## Para migrar para a home

1. Em `V2Layout.tsx`, mude `NOINDEX` para `false`.
2. Em `src/App.tsx`, aponte `/` para `HomeV2` e, se quiser, mova as LPs para fora de `/v2`
   (ex.: `/sistema-30-dias`), mantendo redirects das rotas `/v2/...`.
3. Atualize `index.html` (título e description) com o novo posicionamento.
