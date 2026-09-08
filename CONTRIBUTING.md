# Contributing to FIOF

Start with [architecture](docs/architecture-review.md) and [core](spec/core.md). Propose changes around an operational problem and measurable continuity outcome. Use The Agent as the generic actor; named AI providers belong only in examples. Keep FRITZ integration optional.

Contract proposals need the problem, alternatives, trust implications, compatibility, migration and acceptance evidence. Maintainers record decisions and rationale. Safety-sensitive changes require another reviewer before release.

Modules follow [their contract](spec/modules.md), including dependencies, maturity and validation evidence. Keep untested guidance experimental. Never submit private operational knowledge, secrets or customer data.

Run npm test with Node.js 22 or later; there are no dependencies to install. Structural tests do not certify platforms: operational claims need [conformance evidence](spec/conformance.md). Pull requests should explain behaviour, risks, compatibility and validation. Contributions use the repository Apache License 2.0 unless explicitly agreed otherwise. Preserve attribution.
