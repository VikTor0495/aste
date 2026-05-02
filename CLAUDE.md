# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Static marketing site (Italian) for **ASTE — Residenza Protetta per Anziani** in Terni. Home is single-page with anchor-linked sections (Home, Chi siamo, Struttura, Servizi, Camere, Lavora con noi, Testimonianze, Contatti). Four standalone gallery pages (`struttura.html`, `camere.html`, `attivita.html`, `giardino.html`) reachable from the "Galleria" dropdown in the nav.

No build system, no package manager, no framework. Shared assets: `style.css`, `script.js`, `logo.png`. Images live in `images/<categoria>/` (`struttura/`, `camere/`, `animazione/`, `giardino/`, `servizi/`).

## Running locally

There is no dev server config. Open `index.html` directly, or serve the directory with any static server, e.g.:

```sh
python3 -m http.server 8000
```

Then visit `http://localhost:8000`. The Google Maps embed and Google Fonts require network access.

## Architecture notes

- **CSS design tokens.** `style.css` defines the entire visual system as CSS custom properties at `:root` (`--green-*`, `--yellow-*`, `--ink-*` for the palette; `--font-display` / `--font-body`; `--radius-*`, `--shadow-*`, `--t-*`). Change tokens here rather than hard-coding colors / spacings in section rules. Typography pairs Playfair Display (headings) with Inter (body), loaded via Google Fonts in `index.html`.
- **JS is a single IIFE** in `script.js` wired up on `DOMContentLoaded`. Independent initializers: `initYear`, `initMobileMenu`, `initStickyHeader`, `initScrollSpy`, `initRevealOnScroll`, `initContactForm`, `initCarousels`, `initNavDropdowns`, `initLightbox`. Each is null-safe (returns early if its target element is missing), so removing a section from the HTML won't break the rest.
- **Carousel component.** Markup: `.carousel > .carousel-track > .carousel-slide*N`, plus `.carousel-arrow.prev/.next`, `.carousel-dots` (populated by JS), and optional `.carousel-cta` for the "Vedi tutte le foto" link. Track uses CSS `scroll-snap-type: x mandatory` so swipe is fully native. Opt-in autoplay via `data-autoplay="true"` + `data-interval="5000"` on `.carousel`; pauses on hover/focus/touch and when the tab is hidden. Honors `prefers-reduced-motion`.
- **Lightbox.** Any element with `data-lightbox="<group>"` opens an overlay; siblings sharing the group form the slideshow. JS injects the overlay markup into `<body>` at boot. Image source is read from `data-full` (fallback: nested `<img src>` or the anchor `href`). Keyboard: `Esc` closes, `←/→` navigate. Touch: horizontal swipe navigates, vertical swipe-down closes.
- **Nav dropdown ("Galleria").** Submenu items are inside `.has-dropdown > .nav-dropdown`. Toggled by hover on desktop and by tap on mobile (JS adds `.open` to `.has-dropdown`). The mobile accordion lives inside the existing burger menu — no separate component.
- **Reveal-on-scroll contract.** Any element with class `reveal` is observed by `IntersectionObserver` and gets `.visible` added when it enters the viewport. Add `reveal-delay` for a staggered second column. Without JS / IO support, all `.reveal` elements fall back to visible.
- **Scroll spy contract.** `.nav-link` hrefs (`#section-id`) drive the active-state highlight; the link is matched to the `<section id="...">` with the same id. Keep nav hrefs and section ids in sync when adding/renaming sections.
- **Sticky header.** `#header` gets `.scrolled` past 20px of scroll — style transitions (background, shadow, padding) hang off that class.
- **Contact form is client-only.** `initContactForm` validates name/email/phone/message/privacy and *simulates* submission with a `setTimeout`. There is no backend. To wire real delivery, replace the `setTimeout` block in `script.js` with a `fetch` to FormSpree / Netlify Forms / a custom endpoint — the comment in the code calls this out.
- **Mobile menu.** `#menuToggle` toggles `.open` on `#nav`; closes on link click or outside click. Breakpoint behavior lives in `style.css` media queries.

## Content & SEO

- Site language is Italian (`<html lang="it">`). Keep copy in Italian unless explicitly asked otherwise.
- `<meta description>` and `<meta keywords>` in `index.html` are tuned for local SEO ("casa di riposo Terni", etc.) — preserve when editing the head.
- Phone / email / address appear in multiple places (topbar, header CTA, contatti section, footer, floating call button). Update all occurrences together.
