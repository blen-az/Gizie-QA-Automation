const fs = require('fs');

const raw = fs.readFileSync('test-results/test-results.json', 'utf8');
const data = JSON.parse(raw);

const executed = [];
function extractTests(suite) {
  if (suite.specs) {
    suite.specs.forEach(spec => {
      spec.tests.forEach(test => {
        executed.push({
          title: spec.title,
          file: spec.file,
          projectName: test.projectName,
          status: test.results[0] ? test.results[0].status : 'unknown'
        });
      });
    });
  }
  if (suite.suites) {
    suite.suites.forEach(extractTests);
  }
}

extractTests(data.suites[0]); // or loop data.suites
data.suites.forEach(extractTests);

const uniqueExecuted = [];
const seen = new Set();
executed.forEach(e => {
  const key = `${e.projectName} :: ${e.file} :: ${e.title}`;
  if (!seen.has(key)) {
    seen.add(key);
    uniqueExecuted.push(e);
  }
});

console.log('Total executed in test-results.json:', uniqueExecuted.length);

// Compare with inventory from files
const auditScript = require('./audit_tests.js');
// Let's print which files were in uniqueExecuted
const fileCounts = {};
uniqueExecuted.forEach(e => {
  fileCounts[e.file] = (fileCounts[e.file] || 0) + 1;
});

console.log('File counts in executed results:');
console.log(fileCounts);
