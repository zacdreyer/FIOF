import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { initialize } from '../tools/init.mjs';
import { validate } from '../tools/check.mjs';

const schema = JSON.parse(fs.readFileSync(new URL('../schemas/knowledge.schema.json', import.meta.url)));
function fixture(t) {
  const parent = fs.mkdtempSync(path.join(os.tmpdir(), 'fiof-test-'));
  t.after(() => {
    const resolved = path.resolve(parent);
    assert.equal(path.dirname(resolved), path.resolve(os.tmpdir()));
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
