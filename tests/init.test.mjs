import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { initialize } from '../tools/init.mjs';
import { validate, localReference, checkPublicFile } from '../tools/check.mjs';

const schema = JSON.parse(fs.readFileSync(new URL('../schemas/knowledge.schema.json', import.meta.url)));
function fixture(t) {
  const tempRoot = fs.realpathSync(os.tmpdir());
  const parent = fs.mkdtempSync(path.join(tempRoot, 'fiof-test-'));
  t.after(() => {
    const resolved = path.resolve(parent);
    assert.equal(path.dirname(resolved), tempRoot);
    assert(path.basename(resolved).startsWith('fiof-test-'));
    fs.rmSync(resolved, { recursive: true, force: true });
  });
  return parent;
}

test('creates valid unverified scaffold and preserves it on repeated initialization', t => {
  const target = path.join(fixture(t), 'resource');
  initialize(target, 'example-01');
  validate(schema, JSON.parse(fs.readFileSync(path.join(target, 'manifest.json'))));
  const state = path.join(target, 'STATE.md');
  fs.writeFileSync(state, 'operator-authored record');
  assert.throws(() => initialize(target, 'example-01'), /already exists/);
  assert.equal(fs.readFileSync(state, 'utf8'), 'operator-authored record');
  assert(fs.readFileSync(path.join(target, 'PROFILE.md'), 'utf8').includes('Resource ID: example-01'));
  if (process.platform !== 'win32') {
    assert.equal(fs.statSync(target).mode & 0o777, 0o700);
    assert.equal(fs.statSync(path.join(target, 'manifest.json')).mode & 0o777, 0o600);
  }
});

test('rejects invalid IDs, relative paths, missing parents and checkout destinations', t => {
  const parent = fixture(t);
  assert.throws(() => initialize('relative', 'valid'), /absolute/);
  for (const id of ['../escape', '', 'with space', 'x'.repeat(129)]) assert.throws(() => initialize(path.join(parent, 'new'), id), /Invalid/);
  assert.throws(() => initialize(path.join(parent, 'missing', 'new'), 'valid'));
  assert.throws(() => initialize(path.resolve('new-knowledge'), 'valid'), /checkout/);
  assert.equal(fs.readdirSync(parent).length, 0);
});

test('rejects existing files and link ancestors without modifying referenced content', t => {
  const parent = fixture(t);
  const target = path.join(parent, 'existing');
  fs.writeFileSync(target, 'preserve');
  assert.throws(() => initialize(target, 'valid'), /already exists/);
  assert.equal(fs.readFileSync(target, 'utf8'), 'preserve');
  const real = path.join(parent, 'real'); fs.mkdirSync(real);
  const link = path.join(parent, 'link');
  fs.symlinkSync(real, link, process.platform === 'win32' ? 'junction' : 'dir');
  assert.throws(() => initialize(link, 'valid'), /already exists/);
  assert.throws(() => initialize(path.join(link, 'new'), 'valid'), /real directories/);
  assert.deepEqual(fs.readdirSync(real), []);
});

test('refuses dangling destination links', t => {
  const parent = fixture(t);
  const link = path.join(parent, 'dangling');
  fs.symlinkSync(path.join(parent, 'absent'), link, process.platform === 'win32' ? 'junction' : 'dir');
  assert.throws(() => initialize(link, 'valid'), /already exists/);
  assert(!fs.existsSync(path.join(parent, 'absent')));
});

test('schema rejects unsupported formats, extra fields and invalid module pins', () => {
  const base = {formatVersion:'0.1.0',frameworkVersion:'0.1.0',resourceId:'example-01',modules:[]};
  validate(schema, base);
  assert.throws(() => validate(schema, {...base,formatVersion:'9.0.0'}));
  assert.throws(() => validate(schema, {...base,unexpected:true}));
  assert.throws(() => validate(schema, {...base,modules:[{id:'wrong',version:'latest'}]}));
  assert.throws(() => validate({type:'string',unknownKeyword:true}, 'value'));
});

test('partial write failure leaves inspectable records without a completion manifest', t => {
  const target = path.join(fixture(t), 'partial');
  const original = fs.writeFileSync;
  t.mock.method(fs, 'writeFileSync', function (file, ...args) {
    if (path.basename(file) === 'STATE.md') throw Error('simulated storage failure');
    return original.call(fs, file, ...args);
  });
  assert.throws(() => initialize(target, 'example-01'), /Initialization incomplete/);
  assert(fs.existsSync(path.join(target, 'INDEX.md')));
  assert(!fs.existsSync(path.join(target, 'manifest.json')));
  assert.throws(() => initialize(target, 'example-01'), /already exists/);
});

test('rejects trailing line breaks in resource IDs before creating files', t => {
  const parent = fixture(t);
  for (const suffix of ['\n', '\r', '\r\n', '\u2028', '\u2029']) {
    assert.throws(() => initialize(path.join(parent, 'new'), 'example-01' + suffix), /Invalid resource ID/);
  }
  assert.deepEqual(fs.readdirSync(parent), []);
});

test('failed final manifest write never publishes a corrupt completion manifest', t => {
  const target = path.join(fixture(t), 'partial-manifest');
  const original = fs.writeFileSync;
  t.mock.method(fs, 'writeFileSync', function (file, content, ...args) {
    if (String(file).includes('manifest.json')) {
      original.call(fs, file, '{', ...args);
      throw Error('simulated short write');
    }
    return original.call(fs, file, content, ...args);
  });
  assert.throws(() => initialize(target, 'example-01'), /Initialization incomplete/);
  assert(!fs.existsSync(path.join(target, 'manifest.json')));
});

test('schema inspects unsupported keywords even in absent optional fields', () => {
  assert.throws(() => validate({type:'object',properties:{optional:{type:'string',minLength:1}}}, {}), /Unsupported schema keyword/);
});

test('schema uniqueness compares object contents regardless of property order', () => {
  const item = {type:'object',properties:{a:{type:'string'},b:{type:'string'}}};
  assert.throws(() => validate({type:'array',uniqueItems:true,items:item}, [{a:'x',b:'y'}, {b:'y',a:'x'}]), /duplicate item/);
});

test('metadata rejects trailing line breaks in identifiers and versions', () => {
  const base = {formatVersion:'0.1.0',frameworkVersion:'0.1.0',resourceId:'example-01',modules:[]};
  for (const suffix of ['\n','\r','\r\n','\u2028','\u2029']) {
    assert.throws(() => validate(schema, {...base,resourceId:'example-01'+suffix}));
    assert.throws(() => validate(schema, {...base,frameworkVersion:'0.1.0'+suffix}));
  }
});

test('refuses linked framework inputs before destination creation', t => {
  const target = path.join(fixture(t), 'new');
  const original = fs.lstatSync;
  t.mock.method(fs, 'lstatSync', function (file, ...args) {
    if (String(file).endsWith('VERSION')) return {isFile: () => false, isSymbolicLink: () => true};
    return original.call(fs, file, ...args);
  });
  assert.throws(() => initialize(target, 'valid'), /regular file/);
  assert(!fs.existsSync(target));
});

test('source read failure creates no destination', t => {
  const target = path.join(fixture(t), 'new');
  const original = fs.readFileSync;
  t.mock.method(fs, 'readFileSync', function (file, ...args) {
    if (String(file).endsWith('STATE.md')) throw Error('simulated unreadable source');
    return original.call(fs, file, ...args);
  });
  assert.throws(() => initialize(target, 'valid'), /unreadable source/);
  assert(!fs.existsSync(target));
});

test('CLI has truthful exit codes and rejects unknown options without mutation', t => {
  const parent = fixture(t);
  const script = fileURLToPath(new URL('../tools/init.mjs', import.meta.url));
  const target = path.join(parent, 'cli');
  const args = [script, '--target', target, '--resource', 'example-01'];
  const run = argv => spawnSync(process.execPath, argv, {encoding:'utf8',timeout:10000});
  const success = run(args);
  assert.equal(success.status, 0, success.stderr);
  assert.equal(run(args).status, 1);
  assert.equal(run([...args, '--overwrite']).status, 1);
  assert.equal(run([script]).status, 1);
  assert(fs.existsSync(path.join(target, 'manifest.json')));
  assert(!fs.existsSync(path.join(target, '.manifest.json.pending')));
  assert.throws(() => initialize(path.join(parent, 'bad\npath'), 'valid'), /control characters/);
});

test('a destination created by another writer is never merged', t => {
  const target = path.join(fixture(t), 'race');
  const original = fs.mkdirSync;
  t.mock.method(fs, 'mkdirSync', function (file, ...args) {
    if (file === target) {
      original.call(fs, file, ...args);
      fs.writeFileSync(path.join(file, 'sentinel'), 'other writer');
    }
    return original.call(fs, file, ...args);
  });
  assert.throws(() => initialize(target, 'valid'), {code:'EEXIST'});
  assert.deepEqual(fs.readdirSync(target), ['sentinel']);
});

test('detects parent replacement during source preflight without writing through a junction', t => {
  const base = fixture(t);
  const parent = path.join(base, 'parent'); fs.mkdirSync(parent);
  const other = path.join(base, 'other'); fs.mkdirSync(other);
  const original = fs.readFileSync;
  let swapped = false;
  t.mock.method(fs, 'readFileSync', function (file, ...args) {
    const result = original.call(fs, file, ...args);
    if (!swapped && String(file).endsWith('TODO.md')) {
      swapped = true;
      fs.renameSync(parent, path.join(base, 'previous'));
      fs.symlinkSync(other, parent, process.platform === 'win32' ? 'junction' : 'dir');
    }
    return result;
  });
  assert.throws(() => initialize(path.join(parent, 'new'), 'valid'), /identity changed/);
  assert.deepEqual(fs.readdirSync(other), []);
});

test('exclusive manifest publication cannot overwrite a competing manifest', t => {
  const target = path.join(fixture(t), 'race-manifest');
  const original = fs.linkSync;
  t.mock.method(fs, 'linkSync', function (source, destination) {
    fs.writeFileSync(destination, 'other writer', {flag:'wx'});
    return original.call(fs, source, destination);
  });
  assert.throws(() => initialize(target, 'valid'), /Initialization incomplete/);
  assert.equal(fs.readFileSync(path.join(target, 'manifest.json'), 'utf8'), 'other writer');
  assert(fs.existsSync(path.join(target, '.manifest.json.pending')));
});

test('publication failure preserves pending records for inspection', t => {
  const target = path.join(fixture(t), 'unsupported-filesystem');
  t.mock.method(fs, 'linkSync', () => { throw Error('hard links unavailable'); });
  assert.throws(() => initialize(target, 'valid'), /Initialization incomplete/);
  assert(!fs.existsSync(path.join(target, 'manifest.json')));
  validate(schema, JSON.parse(fs.readFileSync(path.join(target, '.manifest.json.pending'))));
});

test('rejects group or world writable POSIX parent', {skip:process.platform === 'win32'}, t => {
  const parent = fixture(t);
  fs.chmodSync(parent, 0o777);
  try {
    assert.throws(() => initialize(path.join(parent, 'new'), 'valid'), /not group\/world writable/);
    assert.deepEqual(fs.readdirSync(parent), []);
  } finally { fs.chmodSync(parent, 0o700); }
});

test('local links cannot escape the checkout or access network/drive paths', () => {
  const base = path.resolve('example-root');
  assert.equal(localReference(base, 'docs/guide.md', '../README.md'), path.join(base, 'README.md'));
  for (const target of ['../../outside', '/etc/passwd', '//host/share', '\\\\host\\share', 'C:/private', 'file:///private', '%2e%2e/%2e%2e/private', 'bad%00path']) {
    assert.throws(() => localReference(base, 'docs/guide.md', target));
  }
});

test('common credential signatures are rejected without printing their values', () => {
  const values = ['ghp_' + 'A'.repeat(36), 'AKIA' + 'A'.repeat(16), '-----BEGIN ' + 'PRIVATE KEY-----'];
  for (const value of values) {
    assert.throws(() => checkPublicFile('sample.txt', value), error => !error.message.includes(value) && /Potential secret/.test(error.message));
  }
  assert.throws(() => checkPublicFile('.env', ''));
  assert.throws(() => checkPublicFile('private.pem', ''));
  checkPublicFile('example.md', 'Use a protected secret reference.');
});
