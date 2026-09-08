# Databases domain

Experimental guidance; no product/version certification. Applies with [module contract](../../../spec/modules.md).

## Applicability

Select when verified resource capabilities include databases. Record the exact resource and management boundary.

## Discovery

Record engine/instances, data ownership, roles without secrets, configuration hierarchy, replication, backups and recovery objectives. Cite sources, UTC times and unknowns.

## Safety

Separate service health from data correctness. Protect consistent backups and recovery logs; never infer permission to delete data or promote replicas. Follow the core authority, backup and writer requirements.

## Validation

Application queries, integrity, replication and restore evidence without exposing customer data. Define measurable acceptance criteria before execution and record pass, fail or inconclusive evidence.

## Handover

Persist identity, ownership, dependency references, current evidence, unfinished changes, recovery location and the exact next safe action.
