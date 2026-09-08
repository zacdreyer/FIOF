# nginx-apache product module

Experimental: inherited discovery guidance, not version-tested procedures. Modified for FIOF 0.1.0.

## Applicability

Load only after detecting this product and reading [hosting](../../domains/hosting/README.md). Verify installed version and consult its authoritative documentation before using commands.

## Discovery

Discover versions, package sources, listener/proxy topology, modules, MPM, virtual hosts, TLS, includes, generated-file ownership, runtime handlers, logs, and configuration tests.

## Safety

Prefer panel-supported templates or drop-ins. Run native syntax tests before reload. Do not edit generated vhosts, change global worker limits, disable security controls, or restart both layers together without a scoped reason and validation.

The [core contract](../../../spec/core.md) governs authority and recovery.

## Validation

Verify supported configuration checks, affected service health and actual workload outcomes, including dependencies and security. Record failed or inconclusive checks. No executable recipes are certified by this module.

## Handover

Record version, configuration owner, evidence references, scope, partial changes, recovery instructions and next action.
