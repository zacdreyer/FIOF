# docker product module

Experimental: inherited discovery guidance, not version-tested procedures. Modified for FIOF 0.1.0.

## Applicability

Load only after detecting this product and reading [containers](../../domains/containers/README.md). Verify installed version and consult its authoritative documentation before using commands.

## Discovery

Discover Engine and Compose versions, daemon configuration, contexts, containers, images, networks, volumes, bind mounts, registries, restart policies, health checks, resource limits, logging, and backup coverage.

## Safety

Do not expose secrets from environment variables or inspect output. Prefer declarative Compose or the workload's supported deployment method. Do not prune, recreate, pull, restart, or remove containers, images, networks, or volumes without explicit scope and rollback.

The [core contract](../../../spec/core.md) governs authority and recovery.

## Validation

Verify supported configuration checks, affected service health and actual workload outcomes, including dependencies and security. Record failed or inconclusive checks. No executable recipes are certified by this module.

## Handover

Record version, configuration owner, evidence references, scope, partial changes, recovery instructions and next action.
