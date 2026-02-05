# AGENTS.md — Zerno Very (Зерно Веры)

## Project Overview

Static landing page for "Zerno Very" (Grain of Faith) — an Orthodox Christian family
center in Krasnodar, Russia. Built with plain HTML, CSS, and vanilla JavaScript.
No frameworks, no bundlers, no package manager, no external JS dependencies.

**Language**: Russian (all user-facing content is in Russian, `<html lang="ru">`)

## File Structure

```
index.html          Single-page HTML (semantic HTML5, ~411 lines)
styles.css          All styles (~896 lines), CSS Custom Properties for design tokens
script.js           All JavaScript (~333 lines), ES6 class + standalone functions
design-tokens.json  W3C Design Tokens format — source of truth for colors/spacing/type
optimized/          Optimized logo images (logo-en.jpg, logo-ru.jpg, logo-icon.jpg)
photos/             Placeholder directory for client-supplied photos
```

## Build / Lint / Test Commands

**There are none.** This project has no build system, no linter, no test runner,
no `package.json`, and no CI/CD pipeline.

- **To preview**: Open `index.html` directly in a browser, or use any local server:
  ```
  python3 -m http.server 8000
  npx serve .
  ```
- **No build step**: Files are served as-is.
- **No linting**: No ESLint, Prettier, Stylelint, or equivalent is configured.
- **No tests**: No test files or test framework exists.
- **Utility script**: `replace-placeholders.sh` is a Bash script that replaces
  placeholder image URLs in `index.html` with real photo paths. Run with `bash replace-placeholders.sh`.

## Code Style Guidelines

### HTML (`index.html`)

- Semantic HTML5: use `<section>`, `<footer>`, `<blockquote>`, `<form>`, etc.
- Each major section has a numbered comment marker:
  ```html
  <!-- 1. Hero Section -->
  <!-- 2. Carousel Section -->
  ```
- Section IDs use kebab-case: `id="hero"`, `id="for-parents"`, `id="cta"`
- Use `aria-label` on interactive elements (buttons, controls)
- Forms use native validation (`required`, proper `type` attributes)
- Emoji are used as icons throughout (no icon font or SVG icon library)
- External resources: Google Fonts via CDN `<link>`, images from `optimized/`

### CSS (`styles.css`)

- **Single-file architecture** — all styles in one file
- **Section-based organization** with comment separators:
  ```css
  /* ============================================
     SECTION NAME
     ============================================ */
  ```
- Sections follow the same order as HTML sections
- **CSS Custom Properties** defined in `:root` for all design tokens:
  - Colors: `--color-bg-primary`, `--color-olive`, `--color-cta`, etc.
  - Typography: `--font-heading`, `--font-body`
  - Spacing: `--space-xs` through `--space-3xl`
  - Borders: `--radius-sm`, `--radius-md`, `--radius-lg`
  - Shadows: `--shadow-sm`, `--shadow-md`, `--shadow-lg`
- Always use CSS Custom Properties instead of raw hex/px values
- **Class naming**: kebab-case, section-scoped: `{section}-{element}`
  - Examples: `hero-title`, `carousel-track`, `program-card`, `cta-form`
  - Button modifiers: `btn-primary`, `btn-secondary`
  - Not strict BEM — no `__` or `--` notation
- **Layout**: CSS Grid and Flexbox; responsive grids use `auto-fit` with `minmax()`
- **Responsive**: Desktop-first with `@media` overrides at `768px` and `480px`
- **Transitions**: `transition: all 0.3s ease` on interactive elements

### JavaScript (`script.js`)

- **Vanilla ES6+** — no modules, no imports/exports, no bundler
- Loaded via `<script>` tag at end of `<body>`
- All code in a single file, organized by comment-separated sections

#### Naming Conventions
- **Classes**: PascalCase — `Carousel`
- **Functions**: camelCase with prefixes:
  - `init*` for initialization: `initSmoothScroll`, `initForms`, `initHeaderScroll`
  - `handle*` for event handlers: `handleTourSubmit`, `handleDonationSubmit`
  - `format*` for formatters: `formatPhoneNumber`
- **Variables**: camelCase — `carouselElement`, `touchStartX`, `formData`, `selectedAmount`
- **Class properties**: `this.currentIndex`, `this.autoplayInterval`, `this.dotsContainer`

#### Patterns
- Entry point: `document.addEventListener('DOMContentLoaded', () => { ... })`
- Null-check DOM elements before use:
  ```javascript
  if (tourForm) {
      tourForm.addEventListener('submit', handleTourSubmit);
  }
  ```
- Early returns for missing elements: `if (!amountButtons.length || !customAmountInput) return;`
- `FormData` API for reading form values
- `IntersectionObserver` for scroll-triggered animations
- Touch events for mobile swipe support
- No try/catch — no async operations or error-prone code currently
- `console.log()` for debugging; `alert()` for user feedback (temporary, pending backend)
- Arrow functions for callbacks; `function` declarations for named standalone functions

#### Error Handling
- Defensive null checks on all DOM queries before attaching listeners
- No try/catch blocks (no async/network operations yet)
- Backend integration is TODO — forms log to console, marked with comments:
  ```javascript
  // Here you would normally send data to a server
  ```

### Design Tokens (`design-tokens.json`)

- Follows W3C Design Tokens Community Group spec
- Source of truth for colors, spacing, typography, shadows, breakpoints, grid
- CSS Custom Properties in `styles.css` should stay in sync with this file

### File Naming

- Source files: kebab-case — `script.js`, `styles.css`, `design-tokens.json`
- Documentation: kebab-case or UPPERCASE — `README.md`, `CHANGELOG.md`
- Images: kebab-case — `logo-en.jpg`, `logo-icon.jpg`

## Important Notes

- **Placeholder images**: The site uses `placehold.co` URLs for photos. These will
  be replaced with real client photos. Use `replace-placeholders.sh` or manually
  update `<img src="...">` attributes in `index.html`.
- **Not a Git repository**: There is no `.git/` directory.
- **No external dependencies**: Do not introduce npm, node_modules, or build tools
  unless explicitly requested. Keep the project simple and static.
- **Russian content**: All user-facing strings, alt text, form labels, and comments
  in HTML are in Russian. Code comments in JS/CSS may be in English or Russian.
- **Two DOMContentLoaded listeners**: One at line 278 (main init) and one at line 327
  (phone formatting). When adding new initialization code, add it to the main
  listener at line 278.
- **Pending integrations**: Payment gateway (YuMoney/Sberbank), form backend
  (Telegram/Email), real photos, and hosting deployment are all TODO.
