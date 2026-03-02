# Portfolio

Personal site - static HTML served via Nginx, containerized and deployed through GitOps.

**[mrembiasz.pl](https://mrembiasz.pl)**

## Stack

- HTML / CSS / vanilla JS
- Nginx Alpine
- GitHub Actions CI
- ArgoCD deployment via [gitops](https://github.com/kerbatek/gitops)

## Local dev

```
docker build -t portfolio .
docker run -p 8080:80 portfolio
```
