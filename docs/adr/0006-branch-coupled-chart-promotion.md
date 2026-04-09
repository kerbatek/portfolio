# ADR-0006: Branch-Coupled Chart Promotion

## Status

Accepted

## Context

After moving the Helm chart into the `portfolio` repository (ADR-0005), we still needed to decide how a branch becomes a deployable release.

The project now has two environment branches with different purposes:

- `testing` is used to validate application and deployment changes before they are promoted further
- `main` is used to represent the production-ready application state

We wanted a release flow with these properties:

- The application code, image tag, and Helm chart revision stay coupled in the same repository
- Testing can follow `testing` without requiring changes in the production branch
- Production can follow `main` without depending on Argo CD Image Updater or a write-back commit into the `gitops` repository
- Environment-specific concerns such as ingress hosts, replica counts, and TLS settings remain in `gitops`

## Decision

We will use a branch-coupled release flow in the `portfolio` repository.

For each push to `testing` or `main`:

- GitHub Actions builds and pushes the frontend and backend images tagged with `sha-<short-commit>`
- A follow-up workflow step updates `deploy/helm/portfolio/Chart.yaml` `appVersion` and `deploy/helm/portfolio/values.yaml` `global.imageTag`
- That chart bump is committed back to the same branch that triggered the workflow

The corresponding Argo CD Applications in `gitops` track matching branches:

- Testing tracks `portfolio/testing`
- Production tracks `portfolio/main`

The Helm chart remains environment-neutral. Branch-specific image promotion lives in `portfolio`, while environment-specific overrides remain in `gitops`.

## Consequences

- Each environment branch is self-contained: code, chart, and image tag move together
- Testing can validate a branch-specific release before the same change set is promoted to `main`
- The branch head becomes a bot-generated chart bump commit after each application push
- Argo CD reacts to normal Git revision changes on the tracked branch; no separate image updater is required for this application
- The workflow is simple to reason about, but it does create branch-local release commits that must be considered during rebases or cherry-picks
