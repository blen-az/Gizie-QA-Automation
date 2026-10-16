const fs = require('fs');

const testCasesContent = fs.readFileSync('gizie_admin_test_cases.md', 'utf8');
const coverageContent = fs.readFileSync('gizie_admin_coverage_matrix.md', 'utf8');
const executionContent = fs.readFileSync('gizie_admin_execution_report.md', 'utf8');

// 1. Parse test cases
const tcRegex = /###\s+([A-Z0-9_\-]+):\s+([^\n]+)/g;
let match;
const testCases = [];
while ((match = tcRegex.exec(testCasesContent)) !== null) {
  const id = match[1];
  const title = match[2];
  // find following lines until next ### or end
  const nextIdx = testCasesContent.indexOf('###', match.index + match[0].length);
  const block = testCasesContent.substring(match.index, nextIdx !== -1 ? nextIdx : undefined);
  const isBlocked = /Status:\s*Blocked/i.test(block) || /Blocked/i.test(title);
  const isAutomated = /Automated:\s*Yes/i.test(block) || /Status:\s*Automated/i.test(block) || /Automated/i.test(block);
  testCases.push({ id, title, isBlocked, isAutomated, block });
}

console.log('Total test cases in gizie_admin_test_cases.md:', testCases.length);

const blockedTC = testCases.filter(t => t.isBlocked);
console.log('Blocked test cases in test cases doc:', blockedTC.length, blockedTC.map(t => t.id));

const automatedTC = testCases.filter(t => !t.isBlocked);
console.log('Non-blocked test cases in test cases doc:', automatedTC.length);

// Check duplicate IDs in testCases
const idCounts = {};
testCases.forEach(t => { idCounts[t.id] = (idCounts[t.id] || 0) + 1; });
const duplicates = Object.keys(idCounts).filter(id => idCounts[id] > 1);
console.log('Duplicate IDs in gizie_admin_test_cases.md:', duplicates);

// Check coverage matrix
const covRegex = /\|\s*([A-Z0-9_\-]+)\s*\|\s*([^|]+)\|\s*([^|]+)\|\s*([^|]+)\|\s*([^|]+)\|/g;
const coverageEntries = [];
while ((match = covRegex.exec(coverageContent)) !== null) {
  const id = match[1].trim();
  if (id === 'Test ID' || id.startsWith('---')) continue;
  coverageEntries.push({
    id,
    module: match[2].trim(),
    category: match[3].trim(),
    type: match[4].trim(),
    status: match[5].trim()
  });
}
console.log('Total entries in coverage matrix:', coverageEntries.length);
const covBlocked = coverageEntries.filter(c => /Blocked/i.test(c.status) || /Manual/i.test(c.status));
console.log('Blocked/Manual in coverage matrix:', covBlocked.length, covBlocked.map(c => c.id));
const covAutomated = coverageEntries.filter(c => /Automated/i.test(c.status));
console.log('Automated in coverage matrix:', covAutomated.length);

// Check IDs in spec files
const auditScript = fs.readFileSync('audit_tests.js', 'utf8');
// Let us load the 65 spec test titles
const specTests = [];
const specRegex = /\[(tests\\[^:]+:\d+)\]\s+([A-Z0-9_\-]+)(?:\[[^\]]+\])?:?\s*(.*)/g;
// We can run node audit_tests.js and capture output
