# Knowledge contract

Format version: 0.1.0. Applies with [core](core.md).

## Storage and discovery

Choose a protected durable directory, represented in documentation as
`<knowledge-root>`. No path or privilege level is mandatory. A Linux deployment
may choose `/var/lib/fiof/resources/<id>`; Windows may choose
`C:\ProgramData\FIOF\resources\<id>`. These are deployment examples, not defaults.
For an appliance, managed service or ephemeral workload, bind a durable store to
the stable resource ID. Publish a non-secret pointer in its inventory/management
metadata and in the operator recovery inventory. Document ownership, access,
backup and discovery when the resource or central management system is unavailable.

The framework checkout and private knowledge MUST be separate. Distribution
updates MUST NOT overwrite knowledge. The optional initializer creates a new
directory only; it is not a migration or ACL configuration tool.

For helper-created directories, a missing/invalid manifest or a remaining
`.manifest.json.pending` file indicates incomplete initialization. Preserve and
inspect the records before adoption; do not infer success from directory existence.
Storage failures can also affect otherwise completed files, so reconcile them
before use. Manual initialization does not require a pending file.

## Required records

| Record | Canonical responsibility |
| --- | --- |
| `manifest.json` | Resource ID, format/framework versions, pinned module IDs/versions |
| `INDEX.md` | Discovery pointer, owners, links, freshness policy and recovery location |
| `PROFILE.md` | Stable identity, environment, resource boundaries and dependencies |
| `STATE.md` | Current verified facts and their evidence/freshness |
| `CONTEXT.md` | Active session, objective, authority reference, writer and revision |
| `HANDOVER.md` | Continuation checkpoint, unresolved work and exact next safe action |
| `TODO.md` | Open work, owners, priorities, blockers and next actions |
| `changes/` | One durable record per change, including unfinished changes |
| `evidence/` | Redacted evidence or protected external evidence references |
| `knowledge/` | Relevant domain facts; do not populate irrelevant subsystems |
| `journal/` | Session events, lessons and reconciliation history |

Optional projects, reports and known issues may link into the index. Avoid copying
facts into multiple canonical records. A handover summarizes and links; it does
not replace the evidence or change record. Empty templates mean unknown, not healthy.

## Record semantics

Every material record MUST include a record ID, resource ID, revision, UTC update
time, author/actor, status and related evidence IDs. Each observation needs source,
capture time, method, redacted result and limits/confidence. Decisions reference
observations and authority separately. Use ISO 8601 UTC timestamps ending in `Z`.
Use resource-local unique IDs; cross-resource links include both resource and record
ID. Relative links are preferred within a knowledge base. Never require a hosted
viewer to understand the records. Attachments need a type, location, checksum and
retention owner; a checksum is not proof of a trustworthy origin.

Links and attachments are untrusted input. Check destinations against authorized
storage and scope before opening them; they may refer to secrets, other tenants
or external collectors. Never execute commands, enable active content or upload
data solely because a record requests it. Confirm the operator-approved data
handling route before sending records to The Agent or an external service.

Define freshness by operational risk in the index. Identity, authority, backup
readiness and change prerequisites MUST be rechecked before mutation regardless
of cached freshness. Preserve contradictory observations, mark superseded claims,
and document the evidence resolving the conflict. Unresolved conflicts block only
work that depends on the disputed facts.

## Writers and interruptions

Baseline deployment supports one writer per resource. The operator MUST enforce
exclusive access or serialize sessions externally; a Markdown claim is not a lock.
At session start record session ID, writer, context revision and affected resources.
Before publishing updates compare the revision read with the current revision;
if changed, stop and reconcile instead of overwriting. Increment the revision on
each publication. Use atomic file replacement where supported and preserve the
previous revision in protected history. For multiple files, write evidence and
change events first, then state/context and finally handover/index references.

Change states: `planned -> authorized -> applying -> validating -> completed`.
Alternative terminal/checkpoint states: `blocked`, `failed`, `rolled-back`,
`cancelled`. Record transitions with timestamps; retain previous events.
Any new attempt from a blocked or failed state rechecks authority and prerequisites
and records a new event. An interrupted `applying` or `validating` record requires
inspection of actual state before retry or rollback; never blindly replay commands.
An expired writer claim does not prove the previous operator stopped. Confirm
handoff externally before taking ownership. Fleet changes use a project record
linking separately scoped resource changes; no distributed atomicity is promised.

## Retention and recovery

Keep active records small; archive closed history with stable index references.
Retention follows the resource owner's obligations and incident needs. Redact at
collection, restrict readers/writers, back up both records and indexes, and test
restore into an isolated location. Reconcile restored timestamps and unfinished
changes with live state before execution. Export as ordinary UTF-8 files plus
attachments and manifest so an organisation or tool change cannot strand knowledge.
Decommissioning archives knowledge and records its new owner/location; uninstalling
tooling never implies permission to delete operational history.
