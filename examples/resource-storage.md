# Resource-bound continuity examples

Fictional designs, not verified installations.

| Resource | Stable identity | Knowledge placement and discovery |
| --- | --- | --- |
| Windows service host | example-prod-service-01 | Protected directory on durable storage; location in recovery inventory; hostname is an attribute |
| Ephemeral container workload | example-prod-checkout | Durable workload-owned volume/store, linked by workload inventory; instance IDs recorded as observations |
| Managed cloud database | example-prod-orders-db | Protected exportable store bound to account/region/resource ID; non-secret pointer in management inventory |
| Network appliance | example-edge-01 | Protected management-side knowledge copy with inventory pointer and independent recovery copy |

Each owner defines writer serialization, ACLs, backup retention and a tested
recovery route that survives loss of the resource and primary management tool.
Dependencies have separate identities and authority; inventory links do not grant
permission to act on them. A fresh operator verifies the live identity before use.
