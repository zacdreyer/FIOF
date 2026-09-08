# plesk product module

Experimental: inherited discovery guidance, not version-tested procedures. Modified for FIOF 0.1.0.

## Applicability

Load only after detecting this product and reading [hosting](../../domains/hosting/README.md). Verify installed version and consult its authoritative documentation before using commands.

## Discovery

Detect with supported Plesk utilities and record version, license state, components, extensions, subscriptions, service plans, handlers, mail, DNS, firewall, Fail2Ban, backups, updates, and repair status.

## Safety

Prefer `plesk` CLI, supported panel interfaces, and documented extension tools. Identify generated Apache, Nginx, PHP, mail, and DNS files; do not edit them directly when Plesk provides a supported override or reconfiguration command. Avoid direct `psa` database edits.

The [core contract](../../../spec/core.md) governs authority and recovery.

## Validation

Verify supported configuration checks, affected service health and actual workload outcomes, including dependencies and security. Record failed or inconclusive checks. No executable recipes are certified by this module.

## Handover

Record version, configuration owner, evidence references, scope, partial changes, recovery instructions and next action.
