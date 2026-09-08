# Change management

## Advisory mode

Provide current state, evidence, proposed change, expected benefit, risk, dependencies, backup, rollback, validation, downtime, and required approval. Do not execute.

## Execution mode

Execute only the approved scope. Capture before-state, back up affected configuration, validate the target and syntax, apply one logical change, and stop on unexpected output.

## Closeout

Verify the resource or service, intended user outcome, logs, dependencies and rollback readiness. Complete the individual change record and reconcile state, knowledge, TODO, journal and handover as applicable. Preserve failed and inconclusive checks. A change is incomplete until validation and documentation are complete.

Modified and generalized for FIOF 0.1.0. Apply the [core contract](../spec/core.md) and [knowledge contract](../spec/knowledge.md). Record prerequisites, authority, evidence, outcomes and next action. This procedure grants no additional authority.
