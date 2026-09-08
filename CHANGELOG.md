# Changelog

## Unreleased

- Harden initializer source/destination checks and exclusive manifest publication;
  flush writes and preserve pending records on failure.
- Fix schema validation of absent fields and object-order-independent uniqueness.
- Constrain local references, add limited credential detection and expand negative tests.
- Pin and update CI actions, disable persisted credentials/caching, add macOS and
  two runtime versions, and configure reviewed dependency update proposals.
- Clarify pre-context data redaction, external disclosure authority, framework
  integrity, incident credential recovery and enforceable deployment controls.

Before releasing these changes, review compatibility: the optional helper now
requires a hard-link-capable filesystem and a private POSIX parent. Existing
knowledge is unchanged; manual setup remains available. No release tag is implied.

## 0.1.0 - 2026-09-08

Initial FIOF experimental foundation, redesigned from the supplied prototype. It does not claim compatibility with prototype 1.0.0.

- Consolidated operating rules into resource-scoped neutral contracts.
- Added durable knowledge, module, compatibility and conformance requirements.
- Added generic domains and retained optional product guidance as experimental.
- Replaced privileged shell lifecycle scripts with new-directory-only offline tooling.
- Added migration, threat model, tests, governance and release gates.
- Restored official Apache 2.0 license text and retained attribution.

The supplied prototype carried version 1.0.0 dated 2026-07-24. Preserve historical knowledge independently during [migration](docs/migration.md).
