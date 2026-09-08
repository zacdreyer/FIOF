# Metadata schemas

JSON Schema 2020-12 describes [module](module.schema.json) and
[knowledge](knowledge.schema.json) manifests. Schemas are offline contracts, not
network endpoints. Module dependencies, kind/ID agreement, version availability
and duplicate module IDs also require semantic checks.

The dependency-free repository checker implements only the schema keywords used
in these files and fails on unknown keywords. It is not a general JSON Schema
implementation. External integrations may use a conforming 2020-12 validator plus
the semantic rules in [the module contract](../spec/modules.md).
