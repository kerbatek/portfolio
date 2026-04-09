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

```
# build both images
docker build -t portfolio-frontend ./frontend
docker build -t portfolio-backend  ./backend
```
