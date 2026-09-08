# Migration

Inventory source and destination resources, owners, compatibility, dependencies and acceptance criteria. Plan capacity, protected backups, consistency/freeze or delta strategy, cutover, rollback window and stakeholder communication. Verify authority separately for both endpoints.

Pilot a bounded workload. Preserve current behaviour before modernization. Validate data integrity, application behaviour, identities, access, network paths, scheduled work and recovery on the destination. Document irreversible writes and how rollback handles divergence. Do not decommission the source until acceptance and retention requirements are met.

Modified and generalized for FIOF 0.1.0. Apply the [core contract](../spec/core.md) and [knowledge contract](../spec/knowledge.md). Record prerequisites, authority, evidence, outcomes and next action. This procedure grants no additional authority.
