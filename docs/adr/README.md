# Architecture Decision Records

This directory contains Architecture Decision Records (ADRs) for the portfolio repository. ADRs capture the key architectural decisions made during the development of the site, along with the context and consequences of each decision.

## ADR Index

| ADR | Title | Status |
|-----|-------|--------|
| [ADR-0001](0001-migrate-hugo-to-react-spa.md) | Migrate from Hugo to React SPA | Accepted |
| [ADR-0002](0002-go-api-backend.md) | Go API Backend for Content Serving | Accepted |
| [ADR-0003](0003-embed-content-in-binary.md) | Embed Markdown Content in the Go Binary | Accepted |
| [ADR-0004](0004-split-frontend-backend-images.md) | Split Frontend and Backend into Separate Docker Images | Accepted |
| [ADR-0005](0005-application-chart-owned-by-portfolio-repo.md) | Application Chart Owned by the Portfolio Repository | Accepted |
| [ADR-0006](0006-branch-coupled-chart-promotion.md) | Branch-Coupled Chart Promotion | Accepted |

## Creating a New ADR

1. Copy the [template](template.md) to a new file: `NNNN-short-title.md`
2. Use the next available number (zero-padded to 4 digits)
3. Fill in all sections: Status, Context, Decision, Consequences
4. Add the new ADR to the index table above
5. Submit via pull request for review
