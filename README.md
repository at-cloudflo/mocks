# Data Souq — UI Mockups

High-fidelity desktop mockups for **Data Souq**, the internal Qatar Airways data marketplace, implemented as a static HTML/CSS site — no build step, no JavaScript framework.

## Screens

| Page | Screen |
|---|---|
| `index.html` | **1a** Home — search, browse by business function, bookmarked assets |
| `finance.html` | **1b** Function landing — Finance → domains |
| `product.html` | **1c** Data product detail — Summary tab, plain-language data quality |
| `product-sample.html` | **2a** Data product detail — Sample Dataset tab (masked preview) |
| `search.html` | **2b** Search results — function / domain / asset-type filters |
| `requests.html` | **2c** Requests — my requests + approvals queue |

Pages are fully interlinked: sidebar navigation, breadcrumbs, function/domain tiles, product tabs, search results and request rows all link to their target screens.

## Run locally

1. Clone the repo:
   ```
   git clone https://github.com/at-cloudflo/mocks.git
   cd mocks
   ```
2. Open `index.html` directly, or serve the folder over HTTP:
   ```
   # Python 3
   python -m http.server 8080
   # or Node
   npx serve .
   ```
3. Open http://localhost:8080/ in Chrome or Edge.

Requires an internet connection for Google Fonts (Public Sans, Noto Kufi Arabic).

## Files

| File | Purpose |
|---|---|
| `index.html` … `requests.html` | The six implemented screens |
| `assets/css/style.css` | Shared stylesheet — all design tokens and components |
| `design/Data Souq Mockups.dc.html` | Original design-canvas source (all six screens on one canvas) |
| `design/image-slot.js` | Canvas drag-and-drop image placeholder (hero photos) |
| `design/support.js` | Canvas runtime (auto-generated — do not edit) |

The original design canvas lives in the Claude Design project
[UI mockups request](https://claude.ai/design/p/89f03e16-0d26-46f6-ba79-b95d9768d3e4), which also holds the reference
screenshots of the current portal (`uploads/`).

## Design tokens (for the Angular + Bootstrap build)

All tokens are defined as CSS custom properties at the top of `assets/css/style.css` and map 1:1 into an SCSS theme.

| Token | Value |
|---|---|
| Primary (Qatar burgundy) | `#5C0632` |
| Primary dark / hover | `#3F0422` |
| Sidebar gradient | `#4E0527 → #360419` |
| Page background | `#F7F5F2` |
| Card border | `#EAE4DE` |
| Text | `#241A1E` |
| Muted text | `#8A7C80` |
| Tint (icon circles, chips) | `#F6EEE9` |
| Success | `#1F6B45` / `#E6F2EB` |
| Warning | `#8A4B00` / `#FBEFDD` |
| Danger | `#B3261E` / `#F9E7E5` |
| Fonts | Public Sans (UI), Noto Kufi Arabic (Arabic labels) |

The production build targets **Angular + Bootstrap 5** (or pure CSS); these pages use plain semantic HTML and one shared stylesheet so every component maps directly onto that stack.
