# Data Souq — Angular + Bootstrap 5

The Qatar Airways internal data marketplace, built with **Angular 20** (standalone components, signals, zoneless change detection, lazy routes) and **Bootstrap 5** themed with the Data Souq design tokens.

Dependencies are kept to the bare minimum: the five core Angular packages (+ their required `rxjs`/`tslib` peers) and Bootstrap — no zone.js, no forms library, no test harness, no other third-party packages. All state is signals, all forms are native inputs, all icons are inline SVG.

## Run

```
npm install
npm start        # dev server on http://localhost:4200
npm run build    # production build into dist/data-souq
```

Requires Node 24 and an internet connection for Google Fonts (Public Sans, Noto Kufi Arabic).

## Architecture

| Path | Purpose |
|---|---|
| `src/styles.scss` | Bootstrap 5 with Qatar Airways variable overrides + all Data Souq component styles |
| `src/app/auth.service.ts` | Mock authentication — session persisted in `localStorage`, any credentials sign in |
| `src/app/auth.guard.ts` | Route guard — redirects to `/login` (with `returnUrl`) when signed out |
| `src/app/catalog.service.ts` | Mock data: functions, domains, products, requests, approvals, collections, glossary |
| `src/app/models.ts` | Typed models for the whole catalog |
| `src/app/icon.component.ts` | Inline SVG icon set from the mockups |
| `src/app/sidebar.component.ts` | Sidebar navigation with router-aware active states |
| `src/app/app.routes.ts` | All routes, lazy-loaded per screen |
| `src/app/pages/` | One standalone component per screen |
| `src/app/pages/product-tabs/` | The six routed product-detail tabs |

All screens are fully interlinked: sidebar, breadcrumbs, tiles, tabs, search results and request rows navigate via the Angular router. Search filters, request status chips and the glossary A–Z/search are functional against the mock data. Bootstrap JS powers the FAQ accordion and the Request Access modal.

## Screens

Sign in · Home · Business Functions index · Function landing · Domain detail · Product detail (Summary, Sample Dataset, Data Profiling, Lineage, Data Contract, Discussions) · Search results · Requests (My Requests, Approvals) · Favorites · Collections · Data Glossary · Help & Support.
