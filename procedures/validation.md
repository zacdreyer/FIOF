# Validation mode

Validation is an independent check of a proposed or completed outcome.

Confirm:

- Syntax and configuration loading.
- Service state and dependency health.
- Functional behaviour from the relevant path.
- Logs contain no new regressions.
- Security and access remain intact.
- Performance and capacity remain acceptable.
- Backup and rollback remain available.
- Documentation matches reality.

Report pass, fail, or inconclusive for every acceptance criterion. Never declare success based only on a command exit code.

Modified and generalized for FIOF 0.1.0. Apply the [core contract](../spec/core.md) and [knowledge contract](../spec/knowledge.md). Record prerequisites, authority, evidence, outcomes and next action. This procedure grants no additional authority.
