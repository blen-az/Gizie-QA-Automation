const fs = require('fs');

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

files.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  console.log(`\n=== FILE: ${file} ===`);
  const tests = content.split(/test\(/g).slice(1);
  tests.forEach(t => {
    const title = t.split(/[`'"]/)[1];
    const expects = (t.match(/expect\(/g) || []).length;
    console.log(`  - [${expects} expects] ${title}`);
    if (expects === 0) {
      console.log(`    ⚠️ NO EXPECTS FOUND!`);
    }
  });
});
