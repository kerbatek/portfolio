# ADR-0001: Migrate from Hugo to React SPA

## Status

Accepted

## Context

The portfolio was originally built with Hugo using a customised version of the Risotto theme. Hugo works well for static content but the setup had accumulated friction:

- Theme templates were partially overridden, making upgrades error-prone and the actual rendering logic hard to follow
- Adding interactivity (Mermaid diagrams, theme toggle, animated elements) required JavaScript workarounds bolted onto a template system not designed for it
- The build output was a collection of fully server-rendered HTML pages with no shared client-side state, making future features like search or filtering awkward to add
- The deployment target is already a Kubernetes cluster running a containerised app — the operational complexity of Hugo vs a Node build step is identical

The goal was a codebase where every rendering decision is explicit, the component model is familiar, and the path to adding dynamic features is straightforward.

## Decision

We will rewrite the frontend as a React single-page application built with Vite. React Router handles client-side navigation. Markdown is rendered at runtime with `react-markdown` (+ `remark-gfm`, `rehype-raw`) and Mermaid diagrams are processed client-side via a custom `markdownComponents` map.

Hugo, the Risotto theme, and all Go template files are removed entirely. The existing markdown content files are kept as-is.

The design system (Geist + JetBrains Mono, warm stone palette, light/dark mode via `data-theme`) is re-implemented in a single `style.css` without any CSS framework.

## Consequences

- Component boundaries and data flow are explicit; no hidden template inheritance
- Mermaid diagrams and the theme toggle are first-class React components rather than JS patches
- The initial page load requires executing a JS bundle; Hugo's pre-rendered HTML had no such requirement — acceptable given the target audience (technical readers)
- Adding new interactive features (search, tag filtering, reading progress) requires no architectural change
- Hugo's incremental build speed is lost; Vite's dev server HMR is a reasonable substitute during development
- Content is still bundled at build time via `import.meta.glob`, meaning a new post requires a frontend rebuild (addressed in ADR-0002)
