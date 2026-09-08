import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

test('CI retains immutable actions, restricted token access and bounded hosted execution', () => {
  // A guard for this deliberately small workflow, not a general YAML auditor.
  const workflow = fs.readFileSync(new URL('../.github/workflows/check.yml', import.meta.url), 'utf8');
  const actions = [...workflow.matchAll(/^\s*- uses:\s+(\S+)/gm)].map(m => m[1]);
  assert.equal(actions.length, 2);
  for (const action of actions) assert.match(action, /^actions\/(checkout|setup-node)@[a-f0-9]{40}$/);
  assert.match(workflow, /^on: \[push, pull_request\]$/m);
  assert.match(workflow, /^permissions:\r?\n  contents: read\r?$/m);
  assert.match(workflow, /persist-credentials: false/);
  assert.match(workflow, /package-manager-cache: false/);
  assert.match(workflow, /timeout-minutes: 10/);
  assert(!/pull_request_target|workflow_run|self-hosted|secrets\.|write-all|contents: write/.test(workflow));
  for (const platform of ['ubuntu-latest','windows-latest','macos-latest']) assert(workflow.includes(platform));
});
