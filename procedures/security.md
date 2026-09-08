# Security standard

Use least privilege, named administrator accounts, strong authentication, layered access controls, supported cryptography, timely security updates, auditable changes, and protected backups.

Never expose secrets in commands that will be logged when safer input methods exist. Redact tokens, passwords, private keys, hashes, customer addresses, and sensitive configuration values in records.

Before firewall, SSH, authentication, or authorization changes, preserve an active recovery path and verify console or alternate access. Do not disable a security control merely to suppress an error.

Security findings must include affected asset, evidence, likelihood, impact, remediation, rollback, and urgency. Suspected compromise requires evidence preservation and incident escalation.

Modified and generalized for FIOF 0.1.0. Apply the [core contract](../spec/core.md) and [knowledge contract](../spec/knowledge.md). Record prerequisites, authority, evidence, outcomes and next action. This procedure grants no additional authority.
