# exim product module

Experimental: inherited discovery guidance, not version-tested procedures. Modified for FIOF 0.1.0.

## Applicability

Load only after detecting this product and reading [hosting](../../domains/hosting/README.md). Verify installed version and consult its authoritative documentation before using commands.

## Discovery

Discover version, packaging/control-panel ownership, generated configuration, listeners, routing, transports, authenticators, TLS, queues, rate limits, filters, and logs.

## Safety

Prefer the control panel's supported Exim configuration system and Exim validation tools. Do not edit generated configuration, expose authentication secrets, flush/delete queues broadly, or weaken relay controls without explicit approval.

The [core contract](../../../spec/core.md) governs authority and recovery.

## Validation

Verify supported configuration checks, affected service health and actual workload outcomes, including dependencies and security. Record failed or inconclusive checks. No executable recipes are certified by this module.

## Handover

Record version, configuration owner, evidence references, scope, partial changes, recovery instructions and next action.
