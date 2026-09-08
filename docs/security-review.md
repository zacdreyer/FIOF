# Security review and assurance record

Date: 2026-09-08. Baseline: initial commit `ed88ff5`, FIOF 0.1.0.
Disposition: hardened experimental foundation; **not a security certification or
approval for unattended production mutation**. No finite review can establish
100% security. The useful assurance claim is limited to stated controls, tests
and the environments in which they were exercised.

## Scope and method

Reviewed the 109 baseline public files: operating and knowledge contracts,
procedures, all eight domain and thirteen product modules, templates, schemas,
examples, governance/release/security documents, README, optional tooling, tests,
CI, package metadata, license/attribution and branding asset references. The logo
is a static PNG, not executable application code; no image-decoder audit was
performed. Ignored prototype backups are not release artifacts and were not
executed. Baseline code is recoverable from the initial commit.

The review traced input paths and filesystem mutations, compared documented
guarantees to implementation, examined authority and disclosure boundaries,
checked CI supply-chain controls, and added adversarial regression cases. Three
new regression tests failed against the baseline and passed after fixes. Other
negative tests confirm existing protections and guard new hardening.

There are no declared third-party npm dependencies, automatic infrastructure
commands or runtime network calls in the included helpers. This reduces the
attack surface but does not establish freedom from defects. CI actions, runtimes,
operating systems and the chosen agent/execution service remain dependencies.
Their complete transitive implementation was not audited in this review.

## Findings and disposition

Severity here describes the plausible local consequence, not a published
vulnerability score. No live exploitation or compromise was observed.

| ID | Finding | Impact and severity | Change / evidence |
| --- | --- | --- | --- |
| SEC-01 | The final manifest was written directly; a short write left a corrupt completion file | Medium: ambiguous initialization after storage failure | Reproduced failure. Flush pending file, publish exclusively by hard link, retain pending state on failure; tests cover short write, failed publication and competing manifest |
| SEC-02 | Directory checks happened only before source loading | Medium hardening gap: parent replacement could redirect subsequent writes under unsafe shared access | Snapshot and recheck directory identities around mutations; reject linked inputs and unsafe POSIX parents. Junction-swap test confirms detected replacement stops writes; races are not completely eliminated |
| SEC-03 | Schema rules in absent fields were not inspected; uniqueness depended on object field order | Low: false structural validation for future schemas/manifests | Both failures reproduced. Inspect nested schemas independently and compare object contents; regression tests added |
| SEC-04 | CI used movable major action tags and default persisted checkout credentials | Medium supply-chain exposure | Pin verified upstream release commits, disable credential persistence and caching, retain read-only token, bound runtime; add dependency update proposals and workflow guard test |
| SEC-05 | Local link checks could probe paths outside the repository, including network-style paths | Low/medium depending on execution credentials: unintended filesystem/network reference checks | Reject schemes, drive/network paths, controls and traversal before access; references must resolve to enumerated public files; add negative tests |
| SEC-06 | Redaction guidance focused on saved records, leaving external agent/tool transmission insufficiently explicit | High operational impact if secrets are disclosed; documentation/enforcement gap | Clarify pre-context minimization, authorized destinations, untrusted evidence links and independently enforced authority; add deployment and conformance scenarios |
| SEC-07 | Accidental credential inclusion had no repository guard | Medium preventive gap | Ignore common credential files and flag selected key/token signatures without printing values. This is limited detection, not comprehensive scanning |
| SEC-08 | Six baseline tests did not cover important failure boundaries or macOS CI | Assurance gap | Expand fault injection, CLI, metadata, credential and reference tests; include Linux/Windows/macOS with runtime 22/24 in CI. Unrun matrix results are not claimed |

## Verified locally

`npm.cmd test` on Windows with Node.js 24.15.0 runs structural checks and the
regression suite. The final result is recorded in the implementation handover.
Tests exercise fresh initialization, existing-record preservation, invalid IDs
and paths, dangling links/junctions, preflight source failures, directory replacement,
competing creation, short writes, failed manifest publication, CLI exit status,
schema rejection, local-reference confinement, selected credential signatures and
CI guard conditions. The POSIX permission test is skipped on Windows explicitly.

After Docker became available, the same suite passed all 22 tests with no skips
on Linux using Node.js 22.23.2 and 24.20.0, including the POSIX permission checks.
See [container verification](testing/linux-verification.md) for raw output, image
digests, isolation settings and filesystem limitations. No code fixes were needed.

The included signature scan reported no matches in public project files. It does
not cover arbitrary secret formats, encrypted/binary payloads or remote history.
`git diff --check` checks whitespace, not security. No infrastructure or external
account configuration was changed, and no test result proves agent conformance.

## Residual risks and acceptance gates

| Remaining item | Required evidence / owner | Current status |
| --- | --- | --- |
| Cross-platform helper behaviour | Maintainers run the full hosted OS/runtime matrix and investigate skips/failures | Windows local and Linux container evidence for runtime 22/24; macOS and hosted CI execution remain unverified |
| Infrastructure safety and agent behaviour | Operators perform denied-action, malicious-evidence, recovery and interruption pilots from the conformance contract | Not executed against live infrastructure |
| ACLs, authority, egress and writer serialization | Resource owner verifies external enforcement using positive and negative access tests | Deployment-specific, not implemented by FIOF |
| Same-user/privileged filesystem races | Trusted parent/source checkout, controlled writer identity and OS isolation | Residual risk; repeated path checks are not an atomic filesystem sandbox |
| Power-loss/storage semantics | Restore tests and filesystem-specific validation | File flushes and exclusive publication are not a multi-file durable transaction |
| Secret detection and external retention | Approved data routes, collection filtering, independent scanning and incident rotation procedures | Limited local signature checks only |
| Repository governance | Owner configures private reporting, branch protection and required independent reviews; confirms actual settings | Not verified or configured by this repository review |
| Upstream supply chain | Review pinned action updates and runtime advisories; maintain release provenance | Release identities verified; complete upstream audit not performed |
| Independent review | Qualified second reviewer evaluates contracts, implementation and operational evidence | This review is not independent of the implementation author |

Do not promote experimental modules to validated or claim production assurance
until their environment-specific gates pass. Use [secure deployment](secure-deployment.md)
and [conformance](../spec/conformance.md) to gather evidence. Manual onboarding
remains available if the optional initializer cannot meet the storage assumptions.

## Source references

- [GitHub secure-use guidance](https://docs.github.com/en/actions/reference/security/secure-use): immutable action pins, least-privilege tokens and untrusted workflow boundaries.
- [Pinned checkout release commit](https://github.com/actions/checkout/commit/3d3c42e5aac5ba805825da76410c181273ba90b1): release v7.0.1.
- [Pinned runtime setup release commit](https://github.com/actions/setup-node/commit/820762786026740c76f36085b0efc47a31fe5020): release v7.0.0.
- [Node.js filesystem documentation](https://nodejs.org/api/fs.html): exclusive writes, flushing and filesystem API limitations.
