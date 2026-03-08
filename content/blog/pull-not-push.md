---
title: "Pull, Not Push"
date: 2026-03-08T19:30:00
description: "How I replaced my CI-driven image tag bumping with ArgoCD Image Updater."
tags: ["gitops", "argocd", "ci-cd"]
---

Up until today, every time my portfolio app built a new container image, the CI pipeline would clone the gitops repo, update the image tag in the ArgoCD Application manifest, and push the commit. A classic push model.

It worked fine for one app. But I started thinking about what happens when I add a second, third, fifth one. Every app repo would need:

- a PAT with write access to the gitops repo
- knowledge of the exact file path and YAML structure to update
- a `yq` command that breaks the moment I refactor anything

And if two pipelines push at the same time? `non-fast-forward`. Race conditions on `main` :/

So I switched to a pull model using [ArgoCD Image Updater](https://argocd-image-updater.readthedocs.io/).

### How it worked before

```
App CI → build image → push to GHCR
       → clone gitops repo
       → yq -i '.spec.source.helm.valuesObject.image.tag = "sha-abc123"'
       → commit + push to main
       → ArgoCD detects → syncs
```

The app repo had to know too much. It was tightly coupled to the gitops repo's internal structure, and it needed a secret (`GITOPS_TOKEN`) to write to a repo it shouldn't really care about.

### How it works now

```
App CI → build image → push to GHCR → done.

Image Updater (running in-cluster)
  → polls GHCR every 2 minutes
  → finds new tag matching ^sha-[a-f0-9]+$
  → commits .argocd-source-portfolio.yaml to gitops repo
  → ArgoCD detects → syncs
```

The app repo's only job is to build and push an image. It doesn't know the gitops repo exists :)

### The app-of-apps catch

One thing I almost missed: my root Application has `selfHeal: true`. Without git write-back, the Image Updater would patch the Application CR in-cluster, and then the root app would immediately revert it because it doesn't match what's in git. They'd fight each other forever :P

Git write-back solves this. The updater commits a small override file (`.argocd-source-portfolio.yaml`) to the chart directory, so git stays the source of truth and self-heal has nothing to complain about.

### What it took

- One new ArgoCD Application for the Image Updater itself
- Five annotations on the portfolio Application
- Two secrets (`ghcr-creds` for registry read, `git-creds` for write-back)
- Deleting the "update image tag in gitops" step from the portfolio CI

The best part: adding the next app is just annotations. No new CI wiring, no new secrets, no new PATs. ;)
