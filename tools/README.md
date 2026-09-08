# Optional tools

Node.js 22 or later; no third-party dependencies or network access. Manual use of
the framework does not require Node.js.

`node tools/init.mjs --target <absolute-new-directory> --resource <stable-id>`
creates only a new knowledge directory under an existing protected parent.
Success exits 0; invalid arguments or failure exit 1. Existing paths, link/junction
ancestors, invalid IDs, filesystem roots and the framework checkout are refused.
No automatic downloads, root requirement, upgrades, deletion or permission repair.
The manifest is written last. On partial failure inspect and preserve the directory;
retry at a new destination after resolving the cause and reconciling records.

The tool sets restrictive POSIX creation modes. On Windows, provision and verify
the parent ACL first; inherited ACLs govern access. It cannot defend against a
privileged attacker or hostile concurrent changes to the parent. Never run under
an untrusted shared parent. See [threat model](../docs/threat-model.md).

`npm test` checks repository links, naming, metadata schemas, module graph and
initializer preservation/failure cases. It does not validate live resource state,
permissions, authority, record truth or operational conformance. The initializer
does not select modules or fill observed facts. No live knowledge writer is supplied.

On Windows PowerShell hosts that block the npm script shim, use `npm.cmd test`.
