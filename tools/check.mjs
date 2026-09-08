import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const read = p => fs.readFileSync(path.join(root, p), 'utf8');
const parse = p => JSON.parse(read(p));
const ignored = new Set(['.git', '.local-backups', '.fiof-local', 'node_modules']);
function walk(dir = '') {
  return fs.readdirSync(path.join(root, dir), { withFileTypes: true }).flatMap(entry => {
    if (ignored.has(entry.name)) return [];
    assert(!entry.isSymbolicLink(), 'Repository links are not supported: ' + entry.name);
    const p = path.posix.join(dir, entry.name);
    return entry.isDirectory() ? walk(p) : [p];
  });
}

// Deliberately limited to the schema vocabulary bundled with this repository.
export function validate(schema, value, label = 'value') {
  const allowed = ['$schema', 'title', 'type', 'additionalProperties', 'required', 'properties', 'pattern', 'enum', 'const', 'uniqueItems', 'items'];
  for (const key of Object.keys(schema)) assert(allowed.includes(key), 'Unsupported schema keyword ' + key);
  if ('const' in schema) assert.deepEqual(value, schema.const, label);
  if (schema.enum) assert(schema.enum.includes(value), label + ' enum');
  if (schema.type) {
    const type = Array.isArray(value) ? 'array' : value === null ? 'null' : typeof value;
    assert.equal(type, schema.type, label + ' type');
  }
  if (schema.pattern) assert(new RegExp(schema.pattern).test(value), label + ' pattern');
  if (schema.type === 'object') {
    for (const key of schema.required ?? []) assert(Object.hasOwn(value, key), label + ' missing ' + key);
    for (const [key, item] of Object.entries(value)) {
      if (schema.additionalProperties === false) assert(Object.hasOwn(schema.properties, key), label + ' unknown ' + key);
      if (schema.properties?.[key]) validate(schema.properties[key], item, label + '.' + key);
    }
  }
  if (schema.type === 'array') {
    if (schema.uniqueItems) assert.equal(new Set(value.map(v => JSON.stringify(v))).size, value.length, label + ' duplicate item');
    value.forEach((v, i) => validate(schema.items, v, label + '[' + i + ']'));
  }
}

export function checkRepository() {
  const files = walk();
  const version = read('VERSION').trim();
  assert.equal(parse('package.json').version, version, 'Package version drift');
  assert.match(version, /^0\.1\.(0|[1-9][0-9]*)$/);
  const moduleSchema = parse('schemas/module.schema.json');
  const knowledgeSchema = parse('schemas/knowledge.schema.json');
  const modules = new Map();
  for (const file of files.filter(f => f.endsWith('/module.json'))) {
    const m = parse(file);
    validate(moduleSchema, m, file);
    assert(m.id.startsWith(m.kind + '.'), 'Module kind mismatch');
    assert(!modules.has(m.id), 'Duplicate module ID');
    const expected = 'modules/' + (m.kind === 'domain' ? 'domains' : 'products') + '/' + m.id.split('.')[1] + '/module.json';
    assert.equal(file, expected, 'Module path mismatch');
    const guide = read(path.posix.join(path.posix.dirname(file), 'README.md'));
    for (const section of ['Applicability', 'Discovery', 'Safety', 'Validation', 'Handover']) assert(guide.includes('## ' + section), file + ' missing ' + section);
    modules.set(m.id, m);
  }
  const complete = new Set();
  function visit(id, active = new Set()) {
    assert(modules.has(id), 'Missing dependency ' + id);
    assert(!active.has(id), 'Dependency cycle ' + id);
    if (complete.has(id)) return;
    active.add(id);
    for (const dep of modules.get(id).requires) visit(dep, active);
    active.delete(id); complete.add(id);
  }
  for (const id of modules.keys()) visit(id);
  for (const domain of ['linux','windows','containers','virtualisation','cloud','hosting','networking','databases']) assert(modules.has('domain.' + domain), 'Missing domain ' + domain);
  const manifest = parse('examples/knowledge-manifest.json');
  validate(knowledgeSchema, manifest);
  const selected = new Set();
  for (const item of manifest.modules) {
    assert(!selected.has(item.id), 'Duplicate selected module ID');
    selected.add(item.id);
    assert.equal(modules.get(item.id)?.version, item.version, 'Unknown module pin');
  }
  for (const id of selected) for (const dep of modules.get(id).requires) assert(selected.has(dep), 'Unselected dependency');
  let linkCount = 0;
  for (const file of files.filter(f => f.endsWith('.md'))) {
    const content = read(file);
    // Build forbidden names from fragments to keep the check itself neutral.
    if (!file.startsWith('examples/')) {
      for (const word of ['Chat' + 'GPT', 'Clau' + 'de', 'Gemi' + 'ni', 'Aba' + 'cus', 'Co' + 'dex']) assert(!new RegExp('\\b' + word + '\\b','i').test(content), 'Non-neutral naming in ' + file);
      const retiredNames = [String.fromCharCode(110,101,118,101,114,109,111,114,101), String.fromCharCode(78,73,83)];
      for (const name of retiredNames) assert(!new RegExp('\\b' + name + '\\b', 'i').test(content), 'Retired branding in ' + file);
    }
    for (const match of content.matchAll(/\[[^\]]*\]\(([^)]+)\)/g)) {
      const target = match[1];
      if (/^(https?:|mailto:|#)/.test(target)) continue;
      const local = decodeURIComponent(target.split('#')[0]);
      assert(fs.existsSync(path.resolve(root, path.dirname(file), local)), file + ': broken link ' + target);
      linkCount++;
    }
  }
  assert(read('LICENSE').includes('END OF TERMS AND CONDITIONS'), 'Missing license');
  assert(read('LICENSE').length > 10000, 'License appears abridged');
  console.log(`Checked ${files.length} files, ${modules.size} modules and ${linkCount} local links.`);
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) checkRepository();
