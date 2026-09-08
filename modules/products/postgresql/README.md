# postgresql product module

Experimental: inherited discovery guidance, not version-tested procedures. Modified for FIOF 0.1.0.

## Applicability

Load only after detecting this product and reading [databases](../../domains/databases/README.md). Verify installed version and consult its authoritative documentation before using commands.

## Discovery

Discover versions, clusters, packaging, ports, data paths, configuration hierarchy, roles without secrets, databases, extensions, replication, WAL/archive policy, backups, connections, and logs.

## Safety

Prefer `psql`, cluster tools, and supported configuration. Never expose role passwords, edit catalog tables, delete WAL, promote replicas, run major upgrades, or restart without explicit approval and recovery planning.

The [core contract](../../../spec/core.md) governs authority and recovery.

## Validation

Verify supported configuration checks, affected service health and actual workload outcomes, including dependencies and security. Record failed or inconclusive checks. No executable recipes are certified by this module.

## Handover

Record version, configuration owner, evidence references, scope, partial changes, recovery instructions and next action.
