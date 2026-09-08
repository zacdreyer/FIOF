# Virtualisation domain

Experimental guidance; no product/version certification. Applies with [module contract](../../../spec/modules.md).

## Applicability

Select when verified resource capabilities include virtualisation. Record the exact resource and management boundary.

## Discovery

Record host/guest boundary, resource pools, clusters, quorum, storage, networks, guests and recovery access. Cite sources, UTC times and unknowns.

## Safety

Guest access grants no host authority. Snapshots alone do not prove application-consistent recovery. Assess shared storage and quorum effects. Follow the core authority, backup and writer requirements.

## Validation

Guest and host health within scope, storage consistency, network reachability and recovery evidence. Define measurable acceptance criteria before execution and record pass, fail or inconclusive evidence.

## Handover

Persist identity, ownership, dependency references, current evidence, unfinished changes, recovery location and the exact next safe action.
