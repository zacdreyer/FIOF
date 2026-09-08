# mariadb product module

Experimental: inherited discovery guidance, not version-tested procedures. Modified for FIOF 0.1.0.

## Applicability

Load only after detecting this product and reading [databases](../../domains/databases/README.md). Verify installed version and consult its authoritative documentation before using commands.

## Discovery

Discover version, packaging source, instances, configuration include order, data/log paths, authentication, databases, replication, backups, memory settings, connections, slow logging, and current status.

## Safety

Prefer supported SQL and configuration drop-ins. Never edit system tables, move data files, change redo/replication settings, run upgrades, or restart during active migrations without approval, backup, and validation. Tune from measured workload, not generic ratios.

The [core contract](../../../spec/core.md) governs authority and recovery.

## Validation

Verify supported configuration checks, affected service health and actual workload outcomes, including dependencies and security. Record failed or inconclusive checks. No executable recipes are certified by this module.

## Handover

Record version, configuration owner, evidence references, scope, partial changes, recovery instructions and next action.
