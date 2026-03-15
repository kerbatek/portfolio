# ADR-0004: Split Frontend and Backend into Separate Docker Images

## Status

Accepted

## Context

Before the Go backend was introduced (ADR-0002), the CI pipeline built a single Docker image containing the Nginx-served React bundle. With a backend service added, the build needs to produce two independently deployable artefacts.

Options considered:

1. **Single image** — run both Nginx and the Go server in one container, managed by a process supervisor
2. **Two images, one CI job** — build both sequentially in a single job
3. **Two images, matrix CI job** — build each component in a parallel matrix strategy

## Decision

We will split the CI pipeline into a matrix build with two components — `frontend` and `backend` — each producing its own image tagged `latest` and `sha-<short-sha>`:

```
ghcr.io/kerbatek/portfolio-frontend
ghcr.io/kerbatek/portfolio-backend
```

In Kubernetes, each image maps to its own Deployment. A single Ingress routes traffic:
- `/api/` → `portfolio-backend` service (port 8080)
- `/` → `portfolio-frontend` service (port 80)

ArgoCD Image Updater watches both Deployments independently, so a content-only change to the backend triggers a rollout of the backend only — the frontend is untouched.

## Consequences

- Frontend and backend can be deployed, scaled, and rolled back independently
- A change to a blog post does not cause a frontend pod restart
- The Kubernetes manifests (in the gitops repo) require a second Deployment and Service, and the Ingress needs a path-based routing rule
- Each push to `main` now builds two images in parallel — CI time is similar to before since they run concurrently
- The single-image simplicity is lost; operators must know which image to inspect when debugging
