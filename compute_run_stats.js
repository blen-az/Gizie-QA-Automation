const fs = require('fs');
const r1 = JSON.parse(fs.readFileSync('reports/runs/run-1.json', 'utf8'));
const r2 = JSON.parse(fs.readFileSync('reports/runs/run-2.json', 'utf8'));
const r3 = JSON.parse(fs.readFileSync('reports/runs/run-3.json', 'utf8'));

function extractSuites(report) {
  const suites = [];
  function recurse(suite, file) {
    const curFile = suite.file || file;
    if (suite.specs && suite.specs.length > 0) {
      for (const spec of suite.specs) {
        for (const test of spec.tests) {
          const result = test.results[0] || {};
          suites.push({
            file: curFile,
            title: spec.title,
            status: test.status,
            expectedStatus: test.expectedStatus,
            duration: result.duration || 0
          });
        }
      }
    }
    if (suite.suites) {
      for (const s of suite.suites) {
        recurse(s, curFile);
      }
    }
  }
  for (const s of report.suites) recurse(s);
  return suites;
}

const s1 = extractSuites(r1);
const s2 = extractSuites(r2);
const s3 = extractSuites(r3);

console.log('Total tests extracted:', s1.length, s2.length, s3.length);

// Group by spec file
const fileMap = {};
s1.forEach((t, i) => {
  const f = t.file;
  if (!fileMap[f]) {
    fileMap[f] = {
      file: f,
      tests: [],
      d1: 0,
      d2: 0,
      d3: 0,
      passed: 0,
      xfail: 0
    };
  }
  fileMap[f].tests.push(t.title);
  fileMap[f].d1 += t.duration;
  fileMap[f].d2 += s2[i].duration;
  fileMap[f].d3 += s3[i].duration;
  if (t.status === 'expected') fileMap[f].passed++;
  else if (t.status === 'unexpected' && t.expectedStatus === 'failed') fileMap[f].xfail++;
});

console.log('Files breakdown:');
for (const [f, d] of Object.entries(fileMap)) {
  console.log(`${f}: ${d.tests.length} tests, avg dur: ${((d.d1+d.d2+d.d3)/3/1000).toFixed(1)}s, passed: ${d.passed}`);
}
