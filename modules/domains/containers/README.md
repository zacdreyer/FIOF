# Containers domain

Experimental guidance; no product/version certification. Applies with [module contract](../../../spec/modules.md).

## Applicability

Select when verified resource capabilities include containers. Record the exact resource and management boundary.

## Discovery

Record runtime/orchestrator, cluster and namespace, workload identity, desired state, images, volumes, networks and secrets references. Cite sources, UTC times and unknowns.

## Safety

Container identity is ephemeral. Persist knowledge with the workload; reconcile through its owner/controller and protect durable volumes. Follow the core authority, backup and writer requirements.

## Validation

Desired and observed state, readiness, traffic, volume integrity and rollout recovery. Define measurable acceptance criteria before execution and record pass, fail or inconclusive evidence.

## Handover

Persist identity, ownership, dependency references, current evidence, unfinished changes, recovery location and the exact next safe action.
