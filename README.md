# Portfolio

Personal site built with Hugo, containerized and deployed via GitOps.

**[mrembiasz.pl](https://mrembiasz.pl)**

## Stack

- Hugo static site generator
- Nginx Alpine
- GitHub Actions → GHCR → ArgoCD ([gitops](https://github.com/kerbatek/gitops))

## Local dev

```
hugo server
```

```
docker build -t portfolio . && docker run -p 8080:80 portfolio
```
