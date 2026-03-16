# ADR-0003: Embed Markdown Content in the Go Binary

## Status

Accepted

## Context

The Go backend (ADR-0002) needs to read the markdown content files at runtime. The deployment target is a Kubernetes cluster where the backend runs as a container. Options considered for making the content available to the process:

1. **Embed at compile time** (`//go:embed`) — content is baked into the binary
2. **Mount a Kubernetes ConfigMap or PVC** — content lives outside the binary and is mounted into the container
3. **Store content in a database** — content is loaded from PostgreSQL/SQLite at startup

The content changes infrequently (new post every few weeks) and is version-controlled in the same Git repository as the server code.

## Decision

We will use Go's `//go:embed` directive to embed the `content/` directory directly into the compiled binary. The `backend/content/` directory is the single source of truth; it is committed to the repository and compiled in on every `go build`.

The final Docker image uses `FROM scratch` with CGO disabled, producing a self-contained binary with no external dependencies.

## Consequences

- The backend image is fully self-contained — no volume mounts, ConfigMaps, or init containers are needed
- Publishing new content requires building and pushing a new backend image (the same trigger as any other code change)
- The `FROM scratch` image has no shell, package manager, or debugging tools; `kubectl exec` is not useful for troubleshooting — logs and metrics must be the primary observability surface
- Content and server code share the same release cycle, which is acceptable given they live in the same repository
- If content volume grows significantly (many large images embedded), binary size will increase — at current scale (a few markdown files) this is not a concern
- A future migration to external storage (e.g. a headless CMS) would require replacing `//go:embed` with an HTTP client, but the `content.Store` interface would remain unchanged
