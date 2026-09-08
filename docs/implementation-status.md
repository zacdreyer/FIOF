# Implementation and handover

Updated 2026-09-08. Framework 0.1.0 is an experimental foundation following the
[pre-implementation review](architecture-review.md).

## Delivered

- Resource-scoped core, knowledge, module and conformance contracts.
- Eight generic domains and thirteen optional product modules, all experimental.
- Reusable procedures, minimal continuity templates, metadata schemas and examples.
- Offline new-directory initializer with preservation and path-safety tests.
- Structural checks and a Linux/Windows CI matrix; no package dependencies.
- Migration, threat model, governance and public-release gates.
- Official Apache 2.0 text. Contributor attribution uses the current FIOF name.

## Verification and limits

Repository checks and initializer tests passed locally on Windows using Node.js
24.15.0 through `npm.cmd test`. Tests cover successful initialization, preservation
on rerun, invalid inputs, existing files, junction/link ancestors, dangling links,
unsupported metadata and partial-write failure. Structural checks cover local
Markdown file links, neutral naming, module manifests, dependency cycles and
example pins. They do not certify a platform, prove record truth, validate hosted
URLs/Markdown anchors, configure ACLs or enforce operational authority.

The Linux/Windows CI configuration is supplied but has not run in hosted CI.
No live infrastructure was commissioned or changed. No public release, tag or
initial commit was created. The supplied checkout had no commits; the ignored
`.local-backups/prototype-20260908` directory retains all 67 prototype files locally
and must not be published as framework content. At the owner's request, branding
in these backup copies was normalized to FIOF; they are not byte-identical originals.

## Next work

Run the CI matrix and operational pilots from [conformance](../spec/conformance.md),
starting with a fresh-operator handoff and interrupted-change recovery on Linux,
Windows and a resource without local storage. Assign maintainers and configure
private reporting channels before public release. Follow [release gates](releases.md)
before promoting maturity or declaring stable support.
