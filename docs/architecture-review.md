# Architecture review: prototype to FIOF

Review completed on 2026-09-08 before implementation. Scope: all 67 supplied files,
including 19 operating documents, 14 overlays, 20 templates, five examples,
three shell scripts, and six project metadata/governance files. The checkout
had no commits and every supplied file was untracked. A local ignored snapshot
was taken before restructuring. This document records decisions, not platform
certification.

## Vision and strengths

Fritz Infrastructure Operating Framework (FIOF) is the infrastructure operations
module of FRITZ. It is independently usable without FRITZ services, an account,
a particular model, or a control panel. Infrastructure should retain operational
continuity across people and tools. Preserve the prototype's evidence-first
practice, scoped authority, backup-before-change discipline, validation,
separation of facts from hypotheses, and durable handover.

## Weaknesses and concrete defects

The README and identity contract scope everything to one server and a privileged
Linux directory. This excludes managed cloud resources, appliances, Windows and
ephemeral workloads. The cold-start document requires reading all Markdown;
this becomes unbounded and treats examples too much like mandatory policy.
Operating rules repeat across numbered documents, inviting policy drift.
Templates have timestamps but no stable resource identity, revision protocol,
or explicit relationship between evidence, decisions, and authority.

`bootstrap/bootstrap.sh` requires root, recursively changes permissions on
existing content and writes an installation version without a compatibility
check. Its existence check does not reject dangling symbolic links.
`bootstrap/update.sh` inherits these behaviours. `bootstrap/uninstall.sh` deletes
the complete local templates directory without checking ownership or edits.
These scripts must be retired, not renamed. There are no executable checks.
The license is an abridgement, and security/conduct reporting channels are
assumed rather than configured. Public release needs an explicit readiness gate.

## Scalability and trust

Replace universal reading with a bounded index and task-relevant evidence.
Stable IDs must survive renames and distinguish tenants and environments.
Multi-resource operations require explicit target sets and dependency edges;
access to one resource grants no authority over its dependencies.
Resource-owned knowledge is authoritative for continuity, not inherently true
or trusted as executable instructions. Stale or malicious records need provenance,
freshness checks and reconciliation. Read-only discovery can still expose data
or incur cloud charges: collection must be scoped and appropriately privileged.

A single local disk cannot meet continuity goals after total loss. Use local
persistent storage when possible; otherwise bind a durable store to the resource
lifecycle and document how to find and restore it. Keep protected recovery copies
outside the same failure domain. A central dashboard may index knowledge but
must not become the only way to read it.

## Architecture and layout

1. `spec/`: small normative core, knowledge contract, module contract, conformance.
2. `templates/` and `schemas/`: readable records and portable metadata.
3. `procedures/`: reusable operational workflows referencing core requirements.
4. `modules/`: generic domains and optional product overlays, explicitly selected.
5. `tools/` and `tests/`: optional scaffolding and repository checks, not an executor.

`docs/` holds architecture, onboarding, threat model, migration and release policy.
`examples/` contains fictional evidence and continuation examples.
Top-level files cover purpose, license, contribution, governance and security.
Separate distributed framework content from private resource knowledge.

## Disposition of the prototype

| Source | Decision | Destination |
| --- | --- | --- |
| 00 cold start, 01 identity | Redesign as bounded onboarding and resource scope | docs/getting-started.md, spec/core.md |
| 02 philosophy, 03 rules, 15 standards, 16 lifecycle | Consolidate invariants and session protocol | spec/core.md |
| 05 knowledge, 13 reporting, 14 handover | Redesign identity, provenance and continuity | spec/knowledge.md, templates/ |
| 04 discovery, 06 changes, 07 troubleshooting, 08 maintenance | Preserve and generalize procedures | procedures/ |
| 09 security, 10 backups, 11 migrations, 12 validation, 18 emergency | Preserve safeguards; expand beyond hosting | procedures/, docs/threat-model.md |
| 17 panel discovery | Move out of core into hosting domain | modules/domains/hosting/ |
| 14 product/platform overlays | Retain useful guidance under explicit module contracts | modules/domains/, modules/products/ |
| 20 templates | Retain subsystem knowledge; replace server-only active records | templates/ |
| Five examples | Rewrite onboarding and add resource/incident examples | examples/ |
| Three shell scripts | Remove unsafe lifecycle operations; no compatibility wrappers | tools/init.mjs, docs/migration.md |
| Metadata and governance | Rewrite for honest experimental status and release gates | root, docs/releases.md |

## Version and module strategy

Start at framework 0.1.0, knowledge format 0.1.0 and module versions 0.1.0.
The prototype's 1.0.0 does not imply FIOF stability. During 0.x, incompatible
contracts require a minor increment and migration notes; after 1.0 they require
a major increment. Patch releases do not alter required behaviour or formats.
Module manifests pin the supported core minor line and dependencies by ID.
No implicit module discovery, downloads or script execution. Domain modules
describe capabilities; product modules refine them without weakening core policy.
All initial modules are experimental guidance, not verified platform support.

## Missing components addressed and deferred

This redesign introduces scope/authority records, revision checks, interrupted
session recovery, evidence provenance, format and module contracts, generic
platform coverage, offline initialization, conformance scenarios and CI.
It deliberately does not introduce an agent runtime, privileged installer,
central service, plugin execution engine or automatic migration.
Manual conformance must be distinguished from automated structural checks.

## Roadmap and stable-release gates

1. Foundation: coherent contracts, readable templates, safe offline tooling and checks.
2. Pilots: Linux and Windows continuity handoffs, appliance/cloud stores, restore
   drills, interruption and competing-writer scenarios; publish redacted results.
3. Adapters: least-privilege, separately tested collectors, explicit migrations,
   signed release provenance and compatibility fixtures.
4. Stable 1.0: repeatable cross-platform evidence, independent review, named
   maintainers/reporting channels, documented support matrix and recovery tests.
5. Later: federated indexes, organisation policy packs, richer evidence formats
   and externally enforced distributed coordination. Preserve offline readability.

Success means an unfamiliar engineer or The Agent can locate knowledge, verify
identity, reconstruct an interrupted change and continue safely without chat
history. Documentation volume and module count are not success measures.

## References

- [Semantic Versioning](https://semver.org/spec/v2.0.0.html)
- [Official Apache License 2.0](https://www.apache.org/licenses/LICENSE-2.0.txt)
- [JSON Schema 2020-12](https://json-schema.org/draft/2020-12/json-schema-core)
