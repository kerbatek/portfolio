# Portfolio

Personal site built with React + Go, containerized and deployed via GitOps.

**[mrembiasz.pl](https://mrembiasz.pl)**

## Stack

- React SPA (Vite) — frontend
- Go + Gin — content API backend
- Nginx Alpine — serves the frontend bundle
- GitHub Actions → GHCR → ArgoCD ([gitops](https://github.com/kerbatek/gitops))

See `docs/adr/` for architectural decisions.

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
