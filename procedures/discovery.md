# Discovery mode

Infrastructure discovery is read-only. Establish stable identity, environment, tenant/account, role, management ownership, dependencies, access boundaries, backups and current health. Select applicable modules for operating system, hardware, storage, networking, services or managed-resource details; mark irrelevant categories not applicable rather than assuming every resource is a server.

Use the least privileged, least disruptive collection methods available. Account for sensitive output, rate limits and metered APIs. Do not scan remote networks without scope, expose secret values, install tools, restart services or alter managed configuration. Authorized writes of redacted findings to knowledge are distinct from infrastructure changes.

For each material finding record:

- UTC timestamp and resource identity.
- Command or source.
- Concise result and confidence.
- Why it matters.
- Any conflict with existing knowledge.

Classify unknowns explicitly. Discovery ends with a current-state summary and prioritized findings, not changes.

Modified and generalized for FIOF 0.1.0. Apply the [core contract](../spec/core.md) and [knowledge contract](../spec/knowledge.md). Record prerequisites, authority, evidence, outcomes and next action. This procedure grants no additional authority.
