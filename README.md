# Portfolio

Personal site built with React + Go, containerized and deployed via Argo CD.

**[mrembiasz.pl](https://mrembiasz.pl)**

## Stack

- React SPA (Vite) — frontend
- Go + Gin — content API backend
- Nginx Alpine — serves the frontend bundle
- Helm chart in `deploy/helm/portfolio`
- GitHub Actions → GHCR → Argo CD

See `docs/adr/` for architectural decisions.

## Release Flow

- Push to `testing` builds new images, bumps `deploy/helm/portfolio` to the same SHA tag on `testing`, and drives the testing deployment
- Push to `main` does the same on `main` and drives the production deployment
- `gitops` keeps environment-specific Argo CD overrides such as ingress hosts, TLS settings, and replica counts

## Local dev

```
# backend (port 8080)
cd backend && go run .

# frontend (port 5173, proxies /api to 8080)
cd frontend && npm run dev
```

## Local compose

```bash
docker compose up -d --build
```

- App: `http://localhost:8080`
- Backend API: `http://localhost:8081`

The compose setup is intentionally simple and production-like:

- frontend builds from `frontend/Dockerfile`
- backend builds from `backend/Dockerfile`
- compose mounts a local nginx template override so frontend proxies `/api` to the backend container

For source-mounted hot reload, keep using the raw `go run .` and `npm run dev` flow above for now.
