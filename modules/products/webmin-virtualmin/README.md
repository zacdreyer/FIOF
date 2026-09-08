# webmin-virtualmin product module

Experimental: inherited discovery guidance, not version-tested procedures. Modified for FIOF 0.1.0.

## Applicability

Load only after detecting this product and reading [hosting](../../domains/hosting/README.md). Verify installed version and consult its authoritative documentation before using commands.

## Discovery

Discover Webmin and Virtualmin versions, repositories, virtual servers, feature modules, web/mail/DNS/database services, firewall, backups, and scheduled jobs.

## Safety

Prefer supported Webmin/Virtualmin interfaces and CLI tools. Determine whether a file is module-managed before editing it. Avoid changing module databases or generated virtual-server configuration directly.

The [core contract](../../../spec/core.md) governs authority and recovery.

## Validation

Verify supported configuration checks, affected service health and actual workload outcomes, including dependencies and security. Record failed or inconclusive checks. No executable recipes are certified by this module.

## Handover

Record version, configuration owner, evidence references, scope, partial changes, recovery instructions and next action.
