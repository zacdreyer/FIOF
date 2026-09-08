# Troubleshooting

Define the symptom, impact, start time, affected scope, and last known good state. Separate facts from hypotheses.

Preserve evidence before intervention. Correlate service state, configuration, resource pressure, logs, recent changes, networking, dependencies, and client-side behaviour. Prefer tests that isolate one layer.

Do not confuse correlation with cause. Use the smallest reversible intervention that tests the leading hypothesis. If service is restored, still document root cause confidence, residual risk, and follow-up work.

Avoid broad upgrades, cleanup, tuning, or refactoring during diagnosis unless separately approved.

Modified and generalized for FIOF 0.1.0. Apply the [core contract](../spec/core.md) and [knowledge contract](../spec/knowledge.md). Record prerequisites, authority, evidence, outcomes and next action. This procedure grants no additional authority.
