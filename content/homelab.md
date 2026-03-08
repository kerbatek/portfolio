---
title: "Homelab"
description: "Single-node Proxmox setup running a Kubernetes cluster, networking stack, and self-hosted services."
---

<p class="section-label">Topology</p>
<pre class="diagram">
Internet
  │
RB5009 ─── router / firewall
  │
CRS309-1G-8S+ ─── 10G core switch
  ├── Proxmox Node (2x 10G SFP+)
  │     ├── Talos Linux K8s Cluster
  │     │     ├── ArgoCD
  │     │     ├── Ingress-NGINX
  │     │     ├── Cert-Manager
  │     │     ├── MetalLB (BGP → RB5009)
  │     │     ├── Longhorn Storage
  │     │     └── Portfolio
  │     ├── Docker Compose VMs
  │     │     ├── Technitium DNS
  │     │     ├── Vaultwarden
  │     │     ├── Uptime Kuma
  │     │     ├── ddclient
  │     │     └── Caddy (reverse proxy)
  │     └── Minecraft Server VM
  │
CSS318-16G-2S+ ─── 1G distribution
  └── Clients
</pre>

<p class="section-label">Compute</p>
<div class="spec-group">
<div class="spec-card">
<p class="spec-title">Primary Node</p>
<table class="spec-table">
<tr><td>Platform</td><td>Supermicro X10SRL-F</td></tr>
<tr><td>CPU</td><td>Xeon E5-2680 v4 (14C/28T)</td></tr>
<tr><td>Memory</td><td>128 GB DDR4 ECC</td></tr>
<tr><td>Network</td><td>2x 10GbE SFP+</td></tr>
<tr><td>Storage</td><td>2x 1.92 TB Samsung PM863a (ZFS mirror)</td></tr>
<tr><td>Case</td><td>4U rackmount</td></tr>
<tr><td>Hypervisor</td><td>Proxmox VE</td></tr>
</table>
</div>
<div class="spec-card">
<p class="spec-title">Power</p>
<table class="spec-table">
<tr><td>UPS</td><td>APC Back-UPS Pro 1200VA</td></tr>
</table>
</div>
</div>

<p class="section-label">Networking</p>
<div class="spec-group">
<div class="spec-card">
<table class="spec-table">
<tr><td>Router</td><td>MikroTik RB5009</td></tr>
<tr><td>Core switch</td><td>MikroTik CRS309-1G-8S+ (10G)</td></tr>
<tr><td>Distribution</td><td>MikroTik CSS318-16G-2S+ (1G)</td></tr>
<tr><td>Load balancing</td><td>MetalLB via BGP (ASN 64512 ↔ 64513)</td></tr>
<tr><td>IP pool</td><td>10.0.216.0/26</td></tr>
</table>
</div>
</div>

<p class="section-label">Kubernetes Cluster</p>
<p class="section-note">Talos Linux 1.12.2 / Kubernetes 1.32.0, provisioned with Terraform, managed via ArgoCD</p>
<div class="spec-group">
<div class="spec-card">
<p class="spec-title">Control Plane (3 nodes)</p>
<table class="spec-table">
<tr><td>CPU</td><td>2 cores per node</td></tr>
<tr><td>Memory</td><td>4 GB per node</td></tr>
<tr><td>Disk</td><td>30 GB per node</td></tr>
<tr><td>HA VIP</td><td>10.0.215.5</td></tr>
</table>
</div>
<div class="spec-card">
<p class="spec-title">Workers (5 nodes)</p>
<table class="spec-table">
<tr><td>CPU</td><td>4 cores per node (20 total)</td></tr>
<tr><td>Memory</td><td>8 GB per node (40 GB total)</td></tr>
<tr><td>Disk</td><td>50 GB per node (250 GB total)</td></tr>
<tr><td>VLAN</td><td>215</td></tr>
</table>
</div>
<div class="spec-card">
<p class="spec-title">Infrastructure</p>
<table class="spec-table">
<tr><td>ArgoCD</td><td>GitOps continuous delivery</td></tr>
<tr><td>Ingress-NGINX</td><td>Ingress controller (DaemonSet)</td></tr>
<tr><td>Cert-Manager</td><td>Let's Encrypt TLS automation</td></tr>
<tr><td>MetalLB</td><td>Bare-metal load balancer (BGP mode)</td></tr>
<tr><td>Longhorn</td><td>Distributed block storage (3 replicas)</td></tr>
</table>
</div>
<div class="spec-card">
<p class="spec-title">Workloads</p>
<table class="spec-table">
<tr><td>Portfolio</td><td>This site (3 replicas)</td></tr>
</table>
</div>
</div>

<p class="section-label">Docker Compose VMs</p>
<p class="section-note">Running on Debian VMs, migrating to Kubernetes</p>
<div class="spec-group">
<div class="spec-card">
<table class="spec-table">
<tr><td>Technitium</td><td>DNS server</td></tr>
<tr><td>Vaultwarden</td><td>Password manager</td></tr>
<tr><td>Uptime Kuma</td><td>Service monitoring</td></tr>
<tr><td>ddclient</td><td>Dynamic DNS updates</td></tr>
<tr><td>Caddy</td><td>Internal reverse proxy</td></tr>
</table>
</div>
</div>

<p class="section-label">Other VMs</p>
<div class="spec-group">
<div class="spec-card">
<table class="spec-table">
<tr><td>Minecraft</td><td>Modded server</td></tr>
</table>
</div>
</div>

<p class="section-label">Next up</p>
<ul class="plan-list">
<li>Add a comprehensive monitoring stack to the cluster (Prometheus, Grafana, Loki)</li>
<li>Migrate Docker Compose services to Kubernetes</li>
</ul>
