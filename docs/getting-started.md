# Onboarding a resource

FIOF can be used manually by an engineer or The Agent. No model, control panel, privileged account or FRITZ service is required.

No programming runtime is required. The [README quick start](../README.md#quick-start)
provides manual setup, a minimal manifest and optional Linux, Windows and macOS
helper commands. Node.js is only used by the optional helper and repository checks;
it is not needed by the framework or on every managed resource. See the
[questions and answers](../README.md#questions-and-answers) for deployment and agent-use details.

1. Obtain a reviewed release and record its version. Read [core](../spec/core.md), [knowledge](../spec/knowledge.md) and [module selection](../spec/modules.md).
2. Verify objective, stable resource ID, environment/tenant, endpoint and authority. Tool access does not grant change authority.
3. Locate existing knowledge using the resource inventory or local pointer. Read manifest, index, profile, state, context, handover and open changes. Preserve existing records; use [migration](migration.md) for prototype adoption.
4. If knowledge is absent, choose a durable directory separate from the framework checkout. Protect its parent with operator-approved POSIX permissions or Windows ACLs. Define how records will be found and restored after resource loss.
5. Copy templates/knowledge into a new directory, create a manifest following the [schema](../schemas/knowledge.schema.json), and create changes, evidence, knowledge and journal directories. Alternatively run:

~~~text
node tools/init.mjs --target <absolute-new-directory> --resource <stable-id>
~~~

IDs use letters, digits, dots, underscores or hyphens, start with a letter/digit, and contain at most 128 characters. They must be unique in the operator inventory and survive renames. See the fictional [manifest](../examples/knowledge-manifest.json).

6. Select modules from verified capabilities. Record exact versions including dependencies in manifest.json. An empty selection means none assessed, not universal coverage. Resolve conflicting configuration ownership before action.
7. Populate identity and discovery/recovery pointers. Conduct scoped discovery, redact evidence and mark unknowns. Record authority and externally serialized writer ownership in context. Documentation writes do not authorize infrastructure changes.
8. Follow a [procedure](../procedures/README.md), record intent before mutation, verify outcomes and write handover.

For resumption, repeat identity/authority checks and relevant reading, not initialization. Inspect partially applied changes before retry. Test continuation using [conformance scenarios](../spec/conformance.md).
