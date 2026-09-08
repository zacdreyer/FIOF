# Deploying FIOF with enforceable controls

FIOF is an operating contract, not an access-control product. Begin with a
non-production, discovery-only pilot. Demonstrate the controls below before
authorizing mutations. A contract review or green repository test run is not
approval for a particular production environment.

| Boundary | Deployment control | Evidence to retain |
| --- | --- | --- |
| Authority | Verify issuer, action scope, target, constraints and validity through a trusted channel | Approval reference and verification time, never credentials |
| Infrastructure access | Separate discovery credentials from mutation credentials; least privilege, short validity, controlled revocation | Negative tests showing forbidden actions are denied |
| Data disclosure | Approve agent/tool destinations; minimize output and redact before context, logging or upload | Sanitized collection test and destination policy reference |
| Framework integrity | Reviewed pinned checkout, read-only to the operational session; changes reviewed separately | Release/commit identity and integrity check |
| Knowledge access | Resource-bound persistent store, verified ACLs, serialized writer and protected history | Access tests for authorized and unauthorized identities |
| Change safety | Scoped intent, before-state backup, restore evidence, acceptance criteria and stop conditions | Linked change/evidence records |
| Recovery | Independent recovery copy and trusted access route | Isolated restore and fresh-operator continuation results |
| Execution containment | Approved tools/endpoints, resource limits and external audit capture | Denied out-of-scope requests and stop/revocation tests |

## Before enabling changes

1. Verify the resource ID against the actual environment/account and endpoint.
2. Confirm approved data handling, including whether an external agent may receive
   infrastructure details. Shell read permission is not export permission.
3. Have another operator review the permission scope and recovery path where
   practical. Keep credentials out of prompts, records, process arguments and logs.
4. Test discovery with no mutation permission. Verify that documentation writes
   are possible only in the designated knowledge store.
5. Run the [conformance scenarios](../spec/conformance.md) in an isolated pilot.
   Include denied changes, malicious instructions in evidence, interruption,
   authority revocation and restored knowledge reconciliation.
6. Authorize a bounded reversible change only after required controls and backup
   evidence pass. Record failures and inconclusive results; do not waive them by
   claiming the framework is secure.

## Repository and CI administration

These settings require repository-owner configuration and are not enabled by
committing files: private vulnerability reporting, protected branches, required
independent reviews/status checks, restricted workflow permissions and credential
scanning/push protection where available. Verify their actual state before release.
Do not execute untrusted pull requests on infrastructure-connected self-hosted
runners or expose production secrets to repository checks.

Bundled CI uses hosted runners, read-only repository permissions, full commit pins,
no persisted checkout credentials, no dependency cache and a time limit. Weekly
dependency update configuration proposes action updates; maintainers must review
them. It does not automatically merge or prove upstream code trustworthy.
This follows [GitHub's secure-use guidance](https://docs.github.com/en/actions/reference/security/secure-use).

## Explicit limitations

Windows ACL verification is operator-owned. POSIX mode checks do not replace ACL
review. The optional initializer needs a trusted parent and hard-link-capable
filesystem; it is not a secure writer for an adversarial shared directory. No
included tool implements runtime approval enforcement, distributed locks, backup
services, record signatures or a general data-loss-prevention system.
