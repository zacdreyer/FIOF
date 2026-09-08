# Versions, roadmap and release readiness

FIOF 0.1.0 is an experimental foundation. Framework version is in VERSION; knowledge format is in manifest.json and its schema; modules are independently versioned. Pin all three.

The public contract includes requirements, required records, module fields, compatibility and documented tool arguments/exit behaviour. Follow [Semantic Versioning](https://semver.org/spec/v2.0.0.html): after 1.0, incompatible contracts require a major release, compatible additions minor, compatible corrections patch. During 0.x, incompatible work requires a minor increment and migration notes. Never silently rewrite published versions.

Framework 0.1.x supports knowledge format 0.1.0 and module coreCompatibility 0.1.x. Unsupported formats must not be automatically modified. Module changes require review and exact repinning.

## Roadmap

- 0.1: portable contracts, generic modules, offline initializer and structural checks.
- 0.2 target: Linux/Windows and remote-resource pilots with restore, interruption and competing-writer evidence; revise from findings.
- Later 0.x: reviewed collectors/migrations with security boundaries, compatibility fixtures and release provenance.
- 1.0: stable contracts, independent review, repeatable conformance evidence and tested recovery.
- Long term: federated indexes and organisation policy packs preserving offline reading and resource ownership.

## Public release gates

- Run tests on Linux and Windows; archive results.
- Review example data, attribution, license and normative changes.
- Name maintainers, enable/test a private security channel and designate a private conduct contact.
- Publish compatibility/migration notes, limitations and module maturity.
- For stable releases, publish [operational conformance](../spec/conformance.md) evidence. Structural CI is insufficient.
- Tag reviewed artifacts with checksums/provenance and preserve them.

Hosting configuration, public publication and platform pilots are not performed by this scaffolding. This checkout is preparation for release until reporting contacts and evidence exist.
