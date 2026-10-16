const fs = require('fs');
const tcContent = fs.readFileSync('gizie_admin_test_cases.md', 'utf8');
const cmContent = fs.readFileSync('gizie_admin_coverage_matrix.md', 'utf8');

const tcLines = tcContent.split(/\r?\n/).filter(l => l.startsWith('| **') && !l.includes('Canonical ID'));
console.log('Total Master Registry items:', tcLines.length);

const registry = tcLines.map(l => {
  const parts = l.split('|').map(s => s.trim());
  return {
    reqId: parts[1].replace(/\*\*/g, ''),
    module: parts[2],
    category: parts[3],
    specId: parts[5].split(' ')[0].replace(/[`]/g, ''),
    status: parts[6]
  };
});

let missing = 0;
for (const item of registry) {
  if (!cmContent.includes(item.reqId)) {
    console.log('Req ID missing in CM:', item.reqId, item.module);
    missing++;
  }
}
console.log('Total missing in CM:', missing);
