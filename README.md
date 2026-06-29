# NC DHHS Phase 0 Assessment Dashboard (Prototype)

This repository contains a **Phase 0** (prototype) implementation of the NC DHHS Assessment Dashboard as an **executive-facing, six-tab React dashboard**.

## Phase 0 scope (what this is)

- **Frontend-only React prototype** running in the browser.
- Uses a **single-file dashboard artifact** (the main UI is implemented in `frontend/src/App.tsx`).
- Uses **Recharts** for charts.
- Uses **inline CSS** in the dashboard implementation plus the existing base theme stylesheet(s) used by the Vite app.
- Uses **static local JSON / in-file objects only** as its data source (no runtime fetching).

## Phase 0 non-goals (what this is not)

This prototype explicitly does **not** include:

- **No Next.js migration** (or any server-rendered architecture).
- **No live data pipelines** and **no backend APIs** powering the visuals.
- **No Presidio** and **no custom NER**.
- **No production hosting** as part of this task.
- **No authentication/authorization** and **no multi-user workflows**.

Also out of scope for Phase 0:

- Making RHIF allocation decisions automatically—this dashboard **supports insight and discussion** using static data.

## Tabs (prototype UI)

The dashboard presents the following six tabs:

1. **Overview**
2. **ROOTS Hub Regional Disparities**
3. **Provider Readiness Detail**
4. **Vendor Evaluations**
5. **AI Governance Risks**
6. **Audit/Provenance**

## Provenance / audit context in the prototype data

Because this is a static prototype, provenance is represented **as data fields alongside each metric/story element**. In practice, the dashboard surfaces:

- **Where a value came from** (e.g., the static dataset source label)
- **What selection/scope it corresponds to** (e.g., initiative/budget framing such as Initiative 6 / RHIF context)
- **A traceable reference** that the user can view in the **Audit/Provenance** tab

This is intended to let reviewers understand the **source context** for what they see, even though there is no live backend.

## Run the frontend preview

This project uses **Vite** for the React preview.

### Prerequisites

- Node.js (LTS recommended)
- npm (or yarn/pnpm)

### Steps

From the repository root:

```bash
cd frontend
npm install
npm run dev
```

Then open the URL printed by Vite (typically `http://localhost:5173`).

> Note: Vite requires an `index.html` next to `package.json` (or in a location configured as the Vite root). If the preview fails with `Could not resolve entry module`, ensure an `index.html` is present for the preview entry.

## Productionization guidance (how to think about Phase 0 vs future)

Use this README as a clear boundary: the Phase 0 dashboard is **intentionally not** wired for production concerns such as:

- live pipelines/backends
- auth/workflows
- NLP/NER (Presidio/custom NER)
- production hosting

Future architecture should be separate from this prototype so the dashboard can evolve without mixing concerns.
