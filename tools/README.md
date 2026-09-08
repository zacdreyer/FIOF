# Optional tools

Node.js 22 or later; no third-party dependencies or network access. Manual use of
the framework does not require Node.js.

`node tools/init.mjs --target <absolute-new-directory> --resource <stable-id>`
creates only a new knowledge directory under an existing protected parent.
Success exits 0; invalid arguments or failure exit 1. Existing paths, link/junction
ancestors, invalid IDs, filesystem roots and the framework checkout are refused.
No automatic downloads, root requirement, upgrades, operational record deletion or permission repair.
The manifest is written last. On partial failure inspect and preserve the directory;
retry at a new destination after resolving the cause and reconciling records.

The tool sets restrictive POSIX creation modes. On Windows, provision and verify
the parent ACL first; inherited ACLs govern access. It cannot defend against a
privileged attacker or hostile concurrent changes to the parent. Never run under
an untrusted shared parent. See [threat model](../docs/threat-model.md).

POSIX parents must be owned by the current user or root and must not be group or
world writable. Use a private directory beneath a shared temporary root. ACLs can
grant rights not captured by these mode checks; the operator must still verify
them. Directory identity is rechecked around writes, but this does not eliminate
every time-of-check/time-of-use race or protect against a malicious same-user or
privileged process. Framework inputs must be regular files under real directories.

The helper flushes file contents and writes `.manifest.json.pending` before
publishing the complete `manifest.json` through an exclusive hard link, then
removes the pending name. The filesystem must support hard links. Unsupported
storage fails without a fallback that overwrites records; use reviewed manual
setup instead. A pending file or missing/invalid manifest requires inspection.
This protocol avoids publishing a short write as the final manifest, but is not
a power-loss transaction: directory metadata durability is filesystem-dependent.

`npm test` checks repository links, naming, metadata schemas, module graph and
initializer preservation/failure cases. It does not validate live resource state,
permissions, authority, record truth or operational conformance. The initializer
does not select modules or fill observed facts. No live knowledge writer is supplied.

The checker also flags common credential filenames/signatures and confines local
file/image references to enumerated public files. It never fetches linked URLs.
Secret detection is deliberately limited and is not a comprehensive secret scan;
private operational records belong outside the checkout. Run tests only from a
trusted copy in an isolated environment without infrastructure credentials: tests
are executable code and a modified contribution can replace them.

On Windows PowerShell hosts that block the npm script shim, use `npm.cmd test`.
