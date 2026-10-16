const fs = require('fs');

const testCasesContent = fs.readFileSync('gizie_admin_test_cases.md', 'utf8');
const coverageContent = fs.readFileSync('gizie_admin_coverage_matrix.md', 'utf8');

// Parse markdown table rows in test cases
const tcLines = testCasesContent.split('\n');
const parsedTC = [];
let currentModule = '';

tcLines.forEach(line => {
  if (line.startsWith('### ')) {
    currentModule = line.replace('### ', '').trim();
  }
  const match = line.match(/^\|\s*\*\*([A-Z0-9_\-]+)\*\*\s*\|\s*([^|]+)\|\s*([^|]+)\|\s*([^|]+)\|\s*([^|]+)\|\s*([^|]+)\|\s*([^|]+)\|/);
  if (match) {
    parsedTC.push({
      module: currentModule,
      id: match[1].trim(),
      category: match[2].trim(),
      title: match[3].trim(),
      preconditions: match[4].trim(),
      steps: match[5].trim(),
      expectedResult: match[6].trim(),
      status: match[7].trim()
    });
  }
});

console.log('Parsed test cases count:', parsedTC.length);
const tcBlocked = parsedTC.filter(t => /Blocked/i.test(t.status));
const tcAutomated = parsedTC.filter(t => /Automated/i.test(t.status));
console.log('Blocked count in test cases:', tcBlocked.length, tcBlocked.map(t => t.id));
console.log('Automated count in test cases:', tcAutomated.length);

// Parse coverage matrix rows
const covLines = coverageContent.split('\n');
const parsedCov = [];
let currentCovModule = '';

covLines.forEach(line => {
  const parts = line.split('|').map(s => s.trim());
  if (parts.length >= 8 && parts[1] !== '' && !parts[1].startsWith('---') && parts[1] !== 'Module') {
    if (parts[1]) currentCovModule = parts[1];
    const testIds = parts[3].split(',').map(s => s.replace(/`/g, '').trim()).filter(Boolean);
    parsedCov.push({
      module: currentCovModule,
      feature: parts[2],
      testIds: testIds,
      category: parts[4],
      autoStatus: parts[5],
      execStatus: parts[6],
      blockers: parts[7]
    });
  } else if (parts.length >= 8 && parts[1] === '' && parts[2] !== '' && !parts[2].startsWith('---')) {
    // subrow
    const testIds = parts[3].split(',').map(s => s.replace(/`/g, '').trim()).filter(Boolean);
    parsedCov.push({
      module: currentCovModule,
      feature: parts[2],
      testIds: testIds,
      category: parts[4],
      autoStatus: parts[5],
      execStatus: parts[6],
      blockers: parts[7]
    });
  }
});

console.log('Parsed coverage entries count:', parsedCov.length);
const covAllIds = [];
parsedCov.forEach(c => covAllIds.push(...c.testIds));
console.log('Total test IDs referenced in coverage matrix:', covAllIds.length);

const covBlocked = parsedCov.filter(c => /Blocked/i.test(c.autoStatus) || /Blocked/i.test(c.execStatus));
console.log('Blocked in coverage matrix:', covBlocked.length, covBlocked.map(c => c.testIds.join(', ')));

// Check which test IDs in test cases are not in coverage, or vice versa
const tcIds = parsedTC.map(t => t.id);
const diff1 = tcIds.filter(id => !covAllIds.includes(id));
const diff2 = covAllIds.filter(id => !tcIds.includes(id));
console.log('In test cases but not in coverage:', diff1);
console.log('In coverage but not in test cases:', diff2);
