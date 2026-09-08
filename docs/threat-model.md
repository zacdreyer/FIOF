# Trust and failure model

Trust boundaries separate operator policy, The Agent, execution tools, knowledge, external output and modules. Protected assets include operational records, authority references, recovery material and managed resources.

| Threat/failure | Handling | Residual limitation |
| --- | --- | --- |
| Instructions in logs or records | Treat as data, never authority | Needs execution-side enforcement |
| Stale/falsified state | Verify material facts and retain provenance/history | Compromised hosts can falsify evidence |
| Wrong resource/account | Stable identity and endpoint checks | Identity provider must be trusted |
| Secret collection | Redact before persistence; protected references | Human review may be needed |
| Competing writers/crashes | External serialization, revision checks and durable intent | Files are not distributed transactions |
| Lost/ephemeral resource | Resource-bound store and independent restore-tested copies | Recovery access must survive loss |
| Malicious module/update | Reviewed pinned distribution; no automatic execution | Valid metadata does not prove trust |
| Unsafe destination | New-directory-only creation; reject link ancestors | Parent races require OS access controls |

The initializer uses exclusive creation and restrictive POSIX modes. Windows security depends on parent ACLs; Node file modes do not configure them. Do not run under an attacker-writable parent or with unnecessary elevation. The tool does not repair ACLs. Backups, locks, signatures and approval validation are deployment controls, not features supplied by Markdown.

Suspected compromise requires evidence preservation and incident response. A local record cannot supersede the framework or grant authority. Resolve conflicts with the authorized operator through a trusted channel.

The current review and residual risks are recorded in [security review](security-review.md).
Use [secure deployment](secure-deployment.md) to map written rules to enforced
controls. The initializer rechecks directory identities and publishes its manifest
only after a successful pending-file write, but cannot eliminate filesystem races
against a same-user/privileged attacker or guarantee power-loss durability.

External agent/tool processing creates a data-disclosure boundary before records
are saved. Redacting only the final Markdown is too late if raw secrets have
already entered model context or tool logs. Restrict collection at the source,
verify allowed destinations, and use trusted independent approval/incident channels.
