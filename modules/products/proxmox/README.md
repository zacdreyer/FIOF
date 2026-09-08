# proxmox product module

Experimental: inherited discovery guidance, not version-tested procedures. Modified for FIOF 0.1.0.

## Applicability

Load only after detecting this product and reading [virtualisation](../../domains/virtualisation/README.md). Verify installed version and consult its authoritative documentation before using commands.

## Discovery

Determine whether the current machine is a Proxmox host or guest. For a host, discover version, cluster membership, storage, guests, networking, firewall, backup jobs, replication, and quorum. For a guest, document only locally verifiable virtualization facts.

## Safety

Prefer supported Proxmox CLI/API and configuration. Never assume hypervisor access from a guest. Do not change cluster, quorum, storage, bridges, guest state, snapshots, or firewall rules without explicit target verification and approval.

The [core contract](../../../spec/core.md) governs authority and recovery.

## Validation

Verify supported configuration checks, affected service health and actual workload outcomes, including dependencies and security. Record failed or inconclusive checks. No executable recipes are certified by this module.

## Handover

Record version, configuration owner, evidence references, scope, partial changes, recovery instructions and next action.
