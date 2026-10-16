const fs = require('fs');
const path = require('path');

function getFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) {
      results = results.concat(getFiles(fullPath));
    } else if (file.endsWith('.spec.ts')) {
      results.push(fullPath);
    }
  });
  return results;
}

const files = getFiles('tests');
let totalTests = 0;
const inventory = [];

files.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  const lines = content.split('\n');
  lines.forEach((line, idx) => {
    const match = line.match(/^\s*(?:test|test\.only|test\.skip)\s*\(\s*[`'"]([^`'"]+)[`'"]/);
    if (match) {
      totalTests++;
      inventory.push({ file: path.relative(process.cwd(), file), line: idx + 1, title: match[1] });
    }
  });
});

console.log('Total tests found in .spec.ts files:', totalTests);
inventory.forEach((t, i) => console.log(`${i+1}. [${t.file}:${t.line}] ${t.title}`));
