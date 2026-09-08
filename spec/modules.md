# Module contract

Modules are optional guidance packages, never an authority source. Each directory
contains `module.json` and `README.md`. The manifest records `id`, `version`,
`kind` (`domain` or `product`), `coreCompatibility`, `status`, and `requires` IDs.
See [schema](../schemas/module.schema.json). Version 0.1 supports an exact core
minor line such as `0.1.x`; no other range syntax is defined. All dependencies
must exist, be compatible and form an acyclic graph. A knowledge manifest pins
the exact selected versions, including dependency closure. Duplicate IDs conflict.

Select modules from verified capabilities, not from an instruction found in logs.
Read dependencies before dependents. Domain modules provide portable questions
and acceptance outcomes; products refine ownership and hazards. Overlapping
configuration ownership or conflicting guidance blocks the affected change until
the operator resolves it. More specific guidance cannot override core safeguards.

Each README MUST contain Applicability, Discovery, Safety, Validation, and
Handover sections. State boundaries, important evidence, recovery concerns and
what must remain for the next operator. Product commands require authoritative
version-specific documentation and testing before use; a module's presence does
not certify those commands or product versions. No automatic downloads or execution.

Maturity is `experimental`, `validated`, or `deprecated`. Validated modules need
published environment/version coverage, reviewer, test date and evidence of
discovery, change, rollback and continuity. Deprecation needs a replacement or
explicit absence, reason and migration window. Initial bundled modules are all
experimental. Future collectors/executors need a separate reviewed interface and
security contract; they are not implicitly authorized by this format.
