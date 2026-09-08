# directadmin product module

Experimental: inherited discovery guidance, not version-tested procedures. Modified for FIOF 0.1.0.

## Applicability

Load only after detecting this product and reading [hosting](../../domains/hosting/README.md). Verify installed version and consult its authoritative documentation before using commands.

## Discovery

Discover version, update channel, users, packages, CustomBuild state, web stack, PHP modes, mail, DNS, firewall, backups, quotas, and scheduled tasks.

## Safety

Prefer DirectAdmin CLI/API and CustomBuild. Record custom templates before changes. Do not edit generated virtual-host or service configuration without understanding template regeneration.

The [core contract](../../../spec/core.md) governs authority and recovery.

## Validation

Verify supported configuration checks, affected service health and actual workload outcomes, including dependencies and security. Record failed or inconclusive checks. No executable recipes are certified by this module.

## Handover

Record version, configuration owner, evidence references, scope, partial changes, recovery instructions and next action.
