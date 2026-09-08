import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const repo = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const within = (base, target) => {
  const rel = path.relative(base, target);
  return rel === '' || (!rel.startsWith('..' + path.sep) && rel !== '..' && !path.isAbsolute(rel));
};

export function initialize(target, resourceId) {
  if (typeof target !== 'string' || !path.isAbsolute(target)) throw Error('Target must be an absolute path');
  if (typeof resourceId !== 'string' || !/^[A-Za-z0-9][A-Za-z0-9._-]{0,127}$/.test(resourceId)) throw Error('Invalid resource ID');
  const dest = path.resolve(target);
  if (within(repo, dest) || within(dest, repo)) throw Error('Target must be separate from the framework checkout');
  // Reject dangling links as well as existing files/directories. Never follow them.
  try { fs.lstatSync(dest); throw Error('Target already exists; no changes made'); }
  catch (error) { if (error.code !== 'ENOENT') throw error; }
  const parent = path.dirname(dest);
  for (let current = parent; ; current = path.dirname(current)) {
    const stat = fs.lstatSync(current);
    if (stat.isSymbolicLink() || !stat.isDirectory()) throw Error('Parent chain must contain only existing real directories');
    if (path.dirname(current) === current) break;
  }
  if (within(repo, fs.realpathSync(parent))) throw Error('Resolved parent is inside framework checkout');
  // Preload and validate all inputs before creating the destination.
  const version = fs.readFileSync(path.join(repo, 'VERSION'), 'utf8').trim();
  if (!/^0\.1\.(0|[1-9][0-9]*)$/.test(version)) throw Error('Unsupported framework version');
  const names = ['INDEX', 'PROFILE', 'STATE', 'CONTEXT', 'HANDOVER', 'TODO'];
  const records = names.map(name => [name + '.md', fs.readFileSync(path.join(repo, 'templates', 'knowledge', name + '.md'), 'utf8')
    .replace('- Resource ID: UNKNOWN', '- Resource ID: ' + resourceId)]);
  fs.mkdirSync(dest, { mode: 0o700 }); // Exclusive; no recursive merge or overwrite.
  try {
    for (const directory of ['changes', 'evidence', 'knowledge', 'journal']) fs.mkdirSync(path.join(dest, directory), { mode: 0o700 });
    for (const [name, content] of records) fs.writeFileSync(path.join(dest, name), content, { flag: 'wx', mode: 0o600 });
    // Manifest last: absence indicates an incomplete initialization.
    fs.writeFileSync(path.join(dest, 'manifest.json'), JSON.stringify({
      formatVersion: '0.1.0', frameworkVersion: version, resourceId, modules: []
    }, null, 2) + '\n', { flag: 'wx', mode: 0o600 });
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
