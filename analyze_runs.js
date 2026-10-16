const fs = require('fs');

function analyzeRun(filePath) {
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  const tests = [];

  function extract(suite) {
    if (suite.specs) {
      suite.specs.forEach(s => {
        s.tests.forEach(t => {
          const r = t.results[0];
          tests.push({
            title: s.title,
            file: s.file,
            status: r ? r.status : 'unknown',
            duration: r ? r.duration : 0
          });
        });
      });
    }
    if (suite.suites) {
      suite.suites.forEach(extract);
    }
  }

  data.suites.forEach(extract);
  return {
    total: tests.length,
    passed: tests.filter(t => t.status === 'passed' || t.status === 'expected').length,
    failed: tests.filter(t => t.status === 'failed' || t.status === 'unexpected').length,
    totalDuration: tests.reduce((acc, t) => acc + t.duration, 0),
    tests
  };
}

const run1 = analyzeRun('reports/runs/run-1.json');
const run2 = analyzeRun('reports/runs/run-2.json');
const run3 = analyzeRun('reports/runs/run-3.json');

console.log('Run 1:', { total: run1.total, passed: run1.passed, failed: run1.failed, durationMs: run1.totalDuration });
console.log('Run 2:', { total: run2.total, passed: run2.passed, failed: run2.failed, durationMs: run2.totalDuration });
console.log('Run 3:', { total: run3.total, passed: run3.passed, failed: run3.failed, durationMs: run3.totalDuration });

// Check test-by-test consistency
const inconsistencies = [];
for (let i = 0; i < run1.tests.length; i++) {
  const t1 = run1.tests[i];
  const t2 = run2.tests.find(t => t.title === t1.title);
  const t3 = run3.tests.find(t => t.title === t1.title);
  if (!t2 || !t3 || t1.status !== t2.status || t1.status !== t3.status) {
    inconsistencies.push({ title: t1.title, r1: t1.status, r2: t2?.status, r3: t3?.status });
  }
}

console.log('Inconsistent tests count:', inconsistencies.length);
if (inconsistencies.length > 0) console.log(inconsistencies);
