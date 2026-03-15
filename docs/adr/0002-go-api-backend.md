# ADR-0002: Go API Backend for Content Serving

## Status

Accepted

## Context

After the Hugo→React migration (ADR-0001), content was loaded at build time using Vite's `import.meta.glob`. This meant:

- Publishing a new blog post required rebuilding and redeploying the frontend image
- The frontend and content had a hard coupling that would make future features (full-text search, view counts, RSS feed, related posts) difficult to add without further bundling hacks
- There was no server-side representation of the content model — all parsing happened in the browser on every page load

The project already runs in Kubernetes and the deployment pipeline (ArgoCD Image Updater) handles rolling out new images automatically. Adding a second service is operationally cheap.

## Decision

We will introduce a Go HTTP API server (`backend/`) that owns the content and exposes it over a REST API:

```
GET /api/posts          → list of post metadata (no content body)
GET /api/posts/:slug    → single post with full content
GET /api/tags           → sorted list of unique tags
GET /api/pages/:slug    → static page (about, homelab)
```

The frontend fetches from `/api/*` at runtime. Vite's dev server proxies `/api` to `localhost:8080` during development. In production, a single Kubernetes Ingress routes `/api/` to the backend service and `/` to the frontend service.

Gin is used as the HTTP framework — it is lightweight, has no opinions on project structure, and is idiomatic for this kind of JSON API.

The frontend's `import.meta.glob` content loading, `posts.js`, and `frontmatter.js` are deleted. A `useFetch` hook and an `api.js` module replace them.

## Consequences

- Publishing a new post only requires rebuilding the backend image, not the frontend
- The content model is defined once in Go and shared across all current and future consumers
- A second process must be running locally during development (`go run .` alongside `npm run dev`)
- The Kubernetes deployment gains a second Deployment and Service; the Ingress gains a second path rule (see ADR-0004)
- All pages now have a loading state on first render; previously content was synchronously available from the bundle
- The Go binary embeds the markdown files (ADR-0003), so no external volume or database is required
