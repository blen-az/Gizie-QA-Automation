const fs = require('fs');

const auditOutput = fs.readFileSync('audit_tests.js', 'utf8');

// Let's get the 65 spec tests
const files = [
  'tests/01-auth/auth.spec.ts',
  'tests/02-overview/dashboard.spec.ts',
  'tests/03-operations/account-deletions.spec.ts',
  'tests/03-operations/bookings.spec.ts',
  'tests/03-operations/branch-kyc.spec.ts',
  'tests/03-operations/businesses.spec.ts',
  'tests/03-operations/clients.spec.ts',
  'tests/03-operations/kyc.spec.ts',
  'tests/03-operations/review-moderation.spec.ts',
  'tests/03-operations/suspension-appeals.spec.ts',
  'tests/03-operations/withdrawals.spec.ts',
  'tests/04-risk/fraud.spec.ts',
  'tests/05-system/audit.spec.ts',
  'tests/05-system/booking-rules.spec.ts',
  'tests/05-system/catalog.spec.ts',
  'tests/05-system/notifications.spec.ts',
  'tests/05-system/payout-banks.spec.ts',
  'tests/05-system/platform-fees.spec.ts',
  'tests/05-system/terms.spec.ts',
  'tests/05-system/users.spec.ts',
  'tests/06-integration/cross-module-consistency.spec.ts',
  'tests/07-security/security-and-auth.spec.ts',
  'tests/08-accessibility/accessibility-wcag.spec.ts',
  'tests/09-ui-ux-responsive/responsive-and-ui.spec.ts',
  'tests/10-performance/performance-benchmarks.spec.ts'
];

const specTests = [];
files.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  const lines = content.split('\n');
  lines.forEach((line, idx) => {
    const match = line.match(/^\s*(?:test|test\.only|test\.skip)\s*\(\s*[`'"]([^`'"]+)[`'"]/);
    if (match) {
      const fullTitle = match[1];
      // extract ID prefix
      const idMatch = fullTitle.match(/^([A-Z0-9_\-]+(?:\[[^\]]+\])?):?\s*(.*)/);
      specTests.push({
        file,
        line: idx + 1,
        fullTitle,
        id: idMatch ? idMatch[1] : 'NO_ID',
        description: idMatch ? idMatch[2] : fullTitle
      });
    }
  });
});

console.log('Total spec tests:', specTests.length);
specTests.forEach((t, i) => {
  console.log(`${i+1}. [${t.id}] in ${t.file}:${t.line} -> ${t.description}`);
});
