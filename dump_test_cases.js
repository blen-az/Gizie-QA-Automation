const fs = require('fs');
const tcContent = fs.readFileSync('gizie_admin_test_cases.md', 'utf8');
const lines = tcContent.split(/\r?\n/).filter(l => l.startsWith('| **') && !l.includes('Canonical ID'));

console.log('Count:', lines.length);
const rows = lines.map(l => {
  const parts = l.split('|').map(s => s.trim());
  const reqId = parts[1].replace(/\*\*/g, '').trim();
  const module = parts[2];
  const cat = parts[3];
  const specField = parts[5];
  const status = parts[6];
  return { reqId, module, cat, specField, status };
});

fs.writeFileSync('parsed_test_cases.json', JSON.stringify(rows, null, 2));
console.log('Saved parsed_test_cases.json successfully');
