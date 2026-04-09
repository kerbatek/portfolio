# ADR-0005: Application Chart Owned by the Portfolio Repository

## Status

Accepted

## Context

The portfolio deployment currently spans two repositories:

- The `portfolio` repository owns the application source code, Dockerfiles, and CI pipeline that builds and pushes the frontend and backend images
- The `gitops` repository owns the Helm chart and the Argo CD `Application` that deploy the workload to the cluster

That split worked while the portfolio was a small two-service application, but it creates an awkward ownership model as the project grows:

- The deployable shape of the application is no longer defined where the application code lives
- Application version changes and deployment changes are reviewed and released in different repositories
- Adding more app-owned services (for example, additional APIs or workers) requires cross-repo coordination even when the change is purely application-scoped
- The current Argo CD Image Updater flow writes image tag changes back to the `gitops` repository, which weakens the coupling between an application revision and the deployment definition that should run it

At the same time, the cluster still needs a separate GitOps control plane repository for environment-specific configuration such as production vs testing domains, replica overrides, sync policy, and shared platform resources.

## Decision

We will move the portfolio Helm chart from the `gitops` repository into the `portfolio` repository and treat it as part of the application's release artifact.

The ownership boundary is:

- The `portfolio` repository owns the application chart, image references, and the topology of app-owned services such as the frontend, backend, and future stateless microservices
- The `gitops` repository continues to own the Argo CD `Application` resource, environment-specific overrides, cluster-level secrets, and shared infrastructure

For runtime dependencies, we distinguish between app-owned services and platform services:

- Stateless services that are versioned with the application belong in the portfolio chart
- Stateful infrastructure such as databases and Redis should remain external by default and be consumed by configuration, not embedded as mandatory parts of the main app release

The Argo CD source of truth changes accordingly:

- Argo CD in `gitops` will reference the chart path from the `portfolio` repository instead of a local chart in `gitops`
- Environment-specific values will stay in `gitops`
- Image tag updates will be driven by the application repository's release flow rather than by Argo CD Image Updater writing back to `gitops`

## Consequences

- The application code, chart, and image versions are reviewed and released together, which makes the deployed version easier to reason about
- The project demonstrates a cleaner separation of concerns: app repo for app release definition, GitOps repo for environment orchestration
- Adding new application services does not require editing the chart in a separate repository
- The `gitops` repository remains the control plane for cluster state and environment policy, which preserves the GitOps story instead of turning the app repo into cluster infrastructure
- The Argo CD configuration becomes slightly more complex because it must reference a chart from another repository and keep environment-specific overrides separate
- The existing Argo CD Image Updater setup for portfolio should be removed or replaced, since external write-back to `gitops` conflicts with the goal of coupling deployment definition to the application version
- If a future runtime dependency is tightly coupled but operationally stateful, an explicit decision will still be needed on whether it belongs as an optional chart dependency or as separately managed platform infrastructure
