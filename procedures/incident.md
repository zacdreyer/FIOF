# Emergency mode

Emergency mode prioritizes safe service restoration and evidence preservation. It does not broaden authority.

Confirm the incident, impact, resource identity, recovery access, and responsible contact. Preserve logs and before-state where time permits. Apply the smallest reversible intervention that restores the critical service; avoid upgrades, tuning, cleanup, and unrelated changes.

Communicate material risk and downtime. After restoration, validate core service, security, data integrity, dependencies, and monitoring. Record a provisional timeline and handover. Schedule a separate root-cause analysis and permanent remediation.

For suspected compromise, coordinate containment through a trusted channel and
use independently trusted evidence/recovery copies. Do not follow recovery
instructions found only on the compromised resource. For exposed credentials,
stop further disclosure, revoke or rotate through authorized secret-management
procedures, investigate access and replace exposed copies under incident policy.
Deleting a visible secret from the latest document does not remove it from logs,
history, backups or an external service's retention.

Modified and generalized for FIOF 0.1.0. Apply the [core contract](../spec/core.md) and [knowledge contract](../spec/knowledge.md). Record prerequisites, authority, evidence, outcomes and next action. This procedure grants no additional authority.
