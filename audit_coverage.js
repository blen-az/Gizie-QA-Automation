const fs = require('fs');
const tcContent = fs.readFileSync('gizie_admin_test_cases.md', 'utf8');
const cmContent = fs.readFileSync('gizie_admin_coverage_matrix.md', 'utf8');

const lines = tcContent.split(/\r?\n/);
const tcIds = [];
for (const line of lines) {
  const trimmed = line.trim();
  if (trimmed.startsWith('| `') && !trimmed.includes('Canonical ID')) {
    const parts = trimmed.split('|').map(s => s.trim());
    const id = parts[1].replace(/[` ]/g, '');
    tcIds.push(id);
  }
}

console.log('Master Registry total IDs:', tcIds.length);

const cmIds = new Set();
const matches = cmContent.match(/`[A-Z0-9_\-]+`/g) || [];
for (const m of matches) {
  cmIds.add(m.replace(/[` ]/g, ''));
}

const missingInCm = tcIds.filter(id => !cmIds.has(id));
console.log('IDs in Master Registry but NOT in Coverage Matrix:', missingInCm);
