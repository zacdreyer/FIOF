# Prototype adoption and upgrades

FIOF 0.1.0 replaces the prototype contract. There is no in-place migration, automatic update or uninstall command. Distribution updates and knowledge-format migrations are separate operations.

1. Locate the actual prototype records; do not infer their location from a default path. Record owner, permissions and resource identity.
2. Serialize writers; take a protected backup including metadata/permissions and verify an isolated restore.
3. Create a separate protected FIOF directory; keep source records unchanged.
4. Map SERVER-PROFILE to PROFILE, SERVER-STATE to STATE, current context to CONTEXT and handover/TODO to their new records. Add IDs, revisions and provenance. Missing evidence stays unknown.
5. Index journal, changelog, memory, projects and known issues as preserved history. Extract open changes into individual records; narrative is not proof of approval. Retain relevant subsystem records.
6. Create a manifest with verified versions. Compare inventories and record counts, check contents and evidence links, reconcile current state and test a fresh-reader handover.
7. After acceptance, switch the discovery pointer and record why/when. Retain the original backup under retention policy. On failure restore the old pointer and reconcile any intervening changes.

The shell scripts were retired because they could change permissions on unrelated records or remove edited templates. Do not use them for FIOF.

For future upgrades, review compatibility and migration notes before adoption. Keep the old pinned distribution until acceptance. Never overwrite knowledge from new templates or rewrite version markers merely because files were downloaded. Unknown formats block automated writes. Format migrations require mapping, backup, verification, rollback and operator acceptance. Removing tooling never implies permission to delete operational knowledge.
