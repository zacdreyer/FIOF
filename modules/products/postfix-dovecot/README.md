# postfix-dovecot product module

Experimental: inherited discovery guidance, not version-tested procedures. Modified for FIOF 0.1.0.

## Applicability

Load only after detecting this product and reading [hosting](../../domains/hosting/README.md). Verify installed version and consult its authoritative documentation before using commands.

## Discovery

Discover hostname and banner, listeners, routing, relay restrictions, authentication, TLS, queues, mailbox storage, IMAP/POP capabilities, quotas, anti-abuse controls, logs, certificates, and SPF/DKIM/DMARC/PTR assumptions.

## Safety

Use `postconf`, `doveconf`, and panel-supported tooling. Test configuration before reload. Never create an open relay, weaken authentication/TLS to make a client connect, disclose mailbox data, or assume migrated passwords were preserved.

The [core contract](../../../spec/core.md) governs authority and recovery.

## Validation

Verify supported configuration checks, affected service health and actual workload outcomes, including dependencies and security. Record failed or inconclusive checks. No executable recipes are certified by this module.

## Handover

Record version, configuration owner, evidence references, scope, partial changes, recovery instructions and next action.
