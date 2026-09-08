# Cloud domain

Experimental guidance; no product/version certification. Applies with [module contract](../../../spec/modules.md).

## Applicability

Select when verified resource capabilities include cloud. Record the exact resource and management boundary.

## Discovery

Record provider/account, tenant, region, resource IDs, resource groups/projects, identity policies, quotas, billing scope and state owner. Cite sources, UTC times and unknowns.

## Safety

Verify account and region before each change. Reads may incur costs. Preserve declarative ownership, state locking and dependency boundaries. Follow the core authority, backup and writer requirements.

## Validation

Provider state plus workload outcome, access, cost/quota effects and recovery readiness. Define measurable acceptance criteria before execution and record pass, fail or inconclusive evidence.

## Handover

Persist identity, ownership, dependency references, current evidence, unfinished changes, recovery location and the exact next safe action.
