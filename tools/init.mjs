import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const repo = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const within = (base, target) => {
  const rel = path.relative(base, target);
  return rel === '' || (!rel.startsWith('..' + path.sep) && rel !== '..' && !path.isAbsolute(rel));
};

function directories(directory) {
  const snapshot = [];
  for (let current = directory; ; current = path.dirname(current)) {
    const stat = fs.lstatSync(current);
    if (stat.isSymbolicLink() || !stat.isDirectory()) throw Error('Parent chain must contain only existing real directories');
    snapshot.push([current, stat.dev, stat.ino]);
    if (path.dirname(current) === current) return snapshot;
  }
}

function unchanged(snapshot) {
  for (const [file, dev, ino] of snapshot) {
    const stat = fs.lstatSync(file);
    if (stat.isSymbolicLink() || !stat.isDirectory() || stat.dev !== dev || stat.ino !== ino) {
      throw Error('Directory identity changed; refusing further writes');
    }
  }
}

function source(relative) {
  const file = path.join(repo, relative);
  directories(path.dirname(file));
  const stat = fs.lstatSync(file);
  if (!stat.isFile() || stat.isSymbolicLink()) throw Error('Framework input must be a regular file');
  return fs.readFileSync(file, 'utf8');
}

export function initialize(target, resourceId) {
  if (typeof target !== 'string' || !path.isAbsolute(target) || /[\x00-\x1f\x7f]/.test(target)) throw Error('Target must be an absolute path without control characters');
  if (typeof resourceId !== 'string' || !/^[A-Za-z0-9][A-Za-z0-9._-]{0,127}$/.test(resourceId)) throw Error('Invalid resource ID');
  const dest = path.resolve(target);
  if (within(repo, dest) || within(dest, repo)) throw Error('Target must be separate from the framework checkout');
  // Reject dangling links as well as existing files/directories. Never follow them.
  try { fs.lstatSync(dest); throw Error('Target already exists; no changes made'); }
  catch (error) { if (error.code !== 'ENOENT') throw error; }
  const parent = path.dirname(dest);
  const parentSnapshot = directories(parent);
  if (process.platform !== 'win32') {
    const stat = fs.statSync(parent);
    if ((stat.mode & 0o022) !== 0 || (stat.uid !== process.getuid() && stat.uid !== 0)) {
      throw Error('Parent must be owned by the current user or root and not group/world writable');
    }
  }
  if (within(repo, fs.realpathSync(parent))) throw Error('Resolved parent is inside framework checkout');
  // Preload and validate all inputs before creating the destination.
  const version = source('VERSION').trim();
  if (!/^0\.1\.(0|[1-9][0-9]*)$/.test(version)) throw Error('Unsupported framework version');
  const names = ['INDEX', 'PROFILE', 'STATE', 'CONTEXT', 'HANDOVER', 'TODO'];
  const records = names.map(name => [name + '.md', source(path.join('templates', 'knowledge', name + '.md'))
    .replace('- Resource ID: UNKNOWN', '- Resource ID: ' + resourceId)]);
  unchanged(parentSnapshot);
  fs.mkdirSync(dest, { mode: 0o700 }); // Exclusive; no recursive merge or overwrite.
  try {
    unchanged(parentSnapshot);
    const snapshot = directories(dest);
    for (const directory of ['changes', 'evidence', 'knowledge', 'journal']) {
      unchanged(snapshot);
      fs.mkdirSync(path.join(dest, directory), { mode: 0o700 });
    }
    for (const [name, content] of records) {
      unchanged(snapshot);
      fs.writeFileSync(path.join(dest, name), content, { flag: 'wx', mode: 0o600, flush: true });
    }
    // Publish only a fully written manifest. A hard link provides no-replace
    // publication (rename can overwrite on some platforms). No fallback to merge.
    const pending = path.join(dest, '.manifest.json.pending');
    unchanged(snapshot);
    fs.writeFileSync(pending, JSON.stringify({
      formatVersion: '0.1.0', frameworkVersion: version, resourceId, modules: []
    }, null, 2) + '\n', { flag: 'wx', mode: 0o600, flush: true });
    unchanged(snapshot);
    fs.linkSync(pending, path.join(dest, 'manifest.json'));
    unchanged(snapshot);
    fs.unlinkSync(pending);
  } catch (error) {
    throw Error('Initialization incomplete; preserve and inspect ' + dest + '. No cleanup was attempted. ' + error.message);
  }
  return dest;
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try {
    const args = process.argv.slice(2);
    if (args.length !== 4 || args[0] !== '--target' || args[2] !== '--resource') throw Error('Usage: node tools/init.mjs --target <absolute-new-directory> --resource <stable-id>');
    console.log('Created unverified knowledge scaffolding at ' + initialize(args[1], args[3]));
    console.log('Verify storage access controls, resource identity and authority; follow docs/getting-started.md.');
  } catch (error) { console.error(error.message); process.exitCode = 1; }
}
