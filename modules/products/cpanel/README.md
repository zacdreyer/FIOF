# cpanel product module

Experimental: inherited discovery guidance, not version-tested procedures. Modified for FIOF 0.1.0.

## Applicability

Load only after detecting this product and reading [hosting](../../domains/hosting/README.md). Verify installed version and consult its authoritative documentation before using commands.

## Discovery

Record cPanel version, update tier, accounts, packages, EasyApache profile, MultiPHP handlers, Exim, Dovecot, DNS, firewall integrations, backups, quotas, and transfer state.

## Safety

Prefer WHM, UAPI, WHM API, and supported `/usr/local/cpanel/scripts` tools. Treat generated service configuration as panel-owned. Do not edit cPanel databases or generated files directly unless vendor guidance explicitly requires it.

The [core contract](../../../spec/core.md) governs authority and recovery.

## Validation

Verify supported configuration checks, affected service health and actual workload outcomes, including dependencies and security. Record failed or inconclusive checks. No executable recipes are certified by this module.

## Handover

Record version, configuration owner, evidence references, scope, partial changes, recovery instructions and next action.
