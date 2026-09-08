# Linux container verification

Recorded 2026-09-08 following the [security review](../security-review.md).
Docker Desktop Linux engine 29.6.2 ran the existing suite on both supported runtime
lines. No source-code changes were needed after these runs.

| Runtime | Base image | Tests | Failed | Skipped | Raw output |
| --- | --- | --- | --- | --- | --- |
| Node.js 22.23.2 | Official node:22-bookworm-slim | 22 passed | 0 | 0 | [Node 22](linux-node-22.txt) |
| Node.js 24.20.0 | Official node:24-bookworm-slim | 22 passed | 0 | 0 | [Node 24](linux-node-24.txt) |

Both runs also passed structural checks for the 113 files, 21 modules and 184 local
references present before this evidence was added. The POSIX parent-permission
test ran successfully on both versions, as did restrictive creation modes,
symlink handling, exclusive manifest publication, failed writes and CLI tests.

## Reproduction and isolation

The image digests used were:

- Node 22: `node@sha256:83f487e0a63425e5b4d146fb5e5be574bcbe1b7b843d3ebafdd95eaf7767a7e5`
- Node 24: `node@sha256:ba849c60be29959425b8734d57b8b4b7d56f98edd9504c9af091d5281095a71e`

Run this command for each digest, replacing the absolute project path and image
placeholder. It uses Docker's command syntax; keep the mount argument quoted.

```text
docker run --rm --network none --read-only --user 1000:1000 --cap-drop ALL --security-opt no-new-privileges --pids-limit 128 --memory 512m --cpus 2 --tmpfs /tmp:rw,nosuid,nodev,noexec,size=128m --mount "type=bind,source=<absolute-project-path>,target=/workspace,readonly" --workdir /workspace <image-at-digest> sh -c "node --version && npm test"
```

Images were downloaded before execution. Test containers had no network, no added
capabilities, no privilege escalation and a read-only root filesystem and project
mount. Temporary test records were created in the container's disposable `/tmp`
filesystem. No host credentials or Docker socket were mounted. Containers were
automatically removed on exit; the downloaded images remain cached locally.

## Limits

This verifies the helper on Linux in these containers, including tmpfs filesystem
semantics. It does not test every Linux distribution, persistent disk/network
filesystem, power-loss recovery, macOS, hosted CI action execution or live agent
conformance. Windows results and the remaining operational acceptance gates are
recorded in the [implementation handover](../implementation-status.md) and
[security review](../security-review.md).
