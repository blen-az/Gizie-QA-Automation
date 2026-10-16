# Gizie Admin — Test Coverage & Traceability Matrix

**Target Application:** Gizie Admin Console (`https://admin.gizie.et/`)  
**Version:** 2.0 (Audited & Reconciled)  
**Testing Framework:** Playwright Test (TypeScript)  
**Execution Environment:** Production / Live Read-Only  
**Audit Status:** Reconciled & Machine-Verified (Run 1, Run 2, Run 3)

---

## 1. Executive Reconciliation Summary

| Metric | Previous Unverified Report | Machine-Verified & Audited Count | Reconciliation Delta & Root Cause |
|---|---|---|---|
| **Total Test Scenarios** | 72 / 76 | **77** | +5 (Omitted integration tests `INT-02`..`04` and blocked workflows `BKG-WF-01`..`TRM-WF-01` restored) |
| **Automated Executable Tests** | 61 / 65 | **65** | +4 (Fixed `playwright.config.ts` `testIgnore` regex that excluded `07-security/security-and-auth.spec.ts`) |
| **Executed & Passing** | 60 | **64** | Clean pass across 3 consecutive regression runs |
| **Known Defect Tests (XFAIL)** | 1 (counted as pass) | **1** | `ADM-BIZ-06` explicitly marked `test.fail()` to track `BUG-GZ-001` without false positives |
| **Unexpected Failures** | 0 | **0** | Deterministic 100% pass rate across all 3 execution runs |
| **State-Changing Blocked** | 11 | **12** | Reconciled count of safety-blocked live mutation workflows |
| **Test Flakiness Rate** | Not measured | **0.0%** | Zero flaky tests across 195 test executions (3 runs × 65 tests) |

---

## 2. Feature-to-Test Traceability Matrix (77 Scenarios)

| # | Canonical ID | Module | Feature / Requirement Under Test | Category | Playwright Spec Mapping | Execution Status | Live Environment Notes / Blocker |
|---|---|---|---|---|---|---|---|
| 1 | `AUTH-FN-01` | Authentication | Login page renders logo, inputs, checkboxes, and buttons | Functional | `ADM-AUTH-01` (`tests/01-auth/auth.spec.ts:5`) | ✅ Passed | Verified in 3 consecutive runs |
| 2 | `AUTH-NEG-01` | Authentication | Submitting empty login form displays client validation alerts without network calls | Negative | `ADM-AUTH-02` (`tests/01-auth/auth.spec.ts:18`) | ✅ Passed | Verified in 3 consecutive runs |
| 3 | `AUTH-NEG-02` | Authentication | Malformed email strings rejected with format alert | Negative / Boundary | `ADM-AUTH-03` (`tests/01-auth/auth.spec.ts:36`) | ✅ Passed | Verified in 3 consecutive runs |
| 4 | `AUTH-FN-02` | Authentication | Forgot password flow navigates and validates empty submission | Functional | `ADM-AUTH-04` (`tests/01-auth/auth.spec.ts:48`) | ✅ Passed | Verified in 3 consecutive runs |
| 5 | `AUTH-SEC-01` | Authentication | Direct access to protected routes redirects to `#/login` | Security | `ADM-AUTH-05` (`tests/01-auth/auth.spec.ts:69`) | ✅ Passed | Verified in 3 consecutive runs |
| 6 | `AUTH-SEC-02` | Authentication | Admin accounts cannot be suspended, banned, or deleted | Security / Session | `SEC-01` (`tests/07-security/security-and-auth.spec.ts:4`) | ✅ Passed | Verified in 3 consecutive runs |
| 7 | `AUTH-SEC-03` | Authentication | LocalStorage tokens conform to valid 3-part base64 JWT format | Security | `SEC-02` (`tests/07-security/security-and-auth.spec.ts:18`) | ✅ Passed | Verified in 3 consecutive runs |
| 8 | `AUTH-SEC-04` | Authentication | Sign out click opens confirmation modal; Cancel safely preserves session | Security / UI | `SEC-03` (`tests/07-security/security-and-auth.spec.ts:43`) | ✅ Passed | Verified in 3 consecutive runs |
| 9 | `AUTH-SEC-05` | Authentication | XSS payload in search input is sanitized and does not execute script | Security / XSS | `SEC-04` (`tests/07-security/security-and-auth.spec.ts:68`) | ✅ Passed | Verified in 3 consecutive runs |
| 10 | `DASH-FN-01` | Overview | Dashboard loads shell, navigation sidebar, and user identity | Functional | `ADM-DASH-01` (`tests/02-overview/dashboard.spec.ts:5`) | ✅ Passed | Verified in 3 consecutive runs |
| 11 | `DASH-FN-02` | Overview | Key metric cards display valid structure and data | Functional | `ADM-DASH-02` (`tests/02-overview/dashboard.spec.ts:14`) | ✅ Passed | Verified in 3 consecutive runs |
| 12 | `DASH-FN-03` | Overview | Requires attention queue & Needs Action popover display properly | Functional | `ADM-DASH-03` (`tests/02-overview/dashboard.spec.ts:26`) | ✅ Passed | Verified in 3 consecutive runs |
| 13 | `DASH-FN-04` | Overview | Time period filters (Today, This week, This month, This year) switch state | Functional | `ADM-DASH-04` (`tests/02-overview/dashboard.spec.ts:42`) | ✅ Passed | Verified in 3 consecutive runs |
| 14 | `DASH-FN-05` | Overview | Revenue trend chart & booking outcomes donut render | Functional | `ADM-DASH-05` (`tests/02-overview/dashboard.spec.ts:56`) | ✅ Passed | Verified in 3 consecutive runs |
| 15 | `DEL-FN-01` | Operations | Account deletions page loads with decision tabs and search | Functional | `ADM-DEL-01` (`tests/03-operations/account-deletions.spec.ts:4`) | ✅ Passed | Verified in 3 consecutive runs |
| 16 | `DEL-WF-01` | Operations | Permanent deletion of client/business account execution | Workflow / Mutation | *Blocked* | 🔒 Blocked (Safety) | Destructive/State-changing; safely isolated until staging environment is provisioned |
| 17 | `BKG-FN-01` | Operations | Bookings table loads with column structure and active records | Functional | `ADM-BKG-01` (`tests/03-operations/bookings.spec.ts:5`) | ✅ Passed | Verified in 3 consecutive runs |
| 18 | `BKG-FN-02` | Operations | Booking lifecycle status tabs filter table views | Functional | `ADM-BKG-02` (`tests/03-operations/bookings.spec.ts:27`) | ✅ Passed | Verified in 3 consecutive runs |
| 19 | `BKG-FN-03` | Operations | Search query filters bookings by booking code or customer | Functional / Search | `ADM-BKG-03` (`tests/03-operations/bookings.spec.ts:47`) | ✅ Passed | Verified in 3 consecutive runs |
| 20 | `BKG-FN-04` | Operations | Pagination controls exist and display page numbers | Functional / Boundary | `ADM-BKG-04` (`tests/03-operations/bookings.spec.ts:64`) | ✅ Passed | Verified in 3 consecutive runs |
| 21 | `BKG-WF-01` | Operations | Booking cancellation and refund calculation workflow | Workflow / Mutation | *Blocked* | 🔒 Blocked (Safety) | Destructive/State-changing; safely isolated until staging environment is provisioned |
| 22 | `BKYC-FN-01` | Operations | Branch KYC table loads with verification statuses and controls | Functional | `ADM-BKYC-01` (`tests/03-operations/branch-kyc.spec.ts:4`) | ✅ Passed | Verified in 3 consecutive runs |
| 23 | `BKYC-FN-02` | Operations | Branch KYC filter tabs switch views and update counts | Functional | `ADM-BKYC-02` (`tests/03-operations/branch-kyc.spec.ts:25`) | ✅ Passed | Verified in 3 consecutive runs |
| 24 | `BIZ-FN-01` | Operations | Businesses table loads with expected columns and controls | Functional | `ADM-BIZ-01` (`tests/03-operations/businesses.spec.ts:5`) | ✅ Passed | Verified in 3 consecutive runs |
| 25 | `BIZ-FN-02` | Operations | Status tabs filter the businesses list | Functional | `ADM-BIZ-02` (`tests/03-operations/businesses.spec.ts:26`) | ✅ Passed | Verified in 3 consecutive runs |
| 26 | `BIZ-FN-03` | Operations | Dynamic search filters businesses and clearing restores list | Functional / Search | `ADM-BIZ-03` (`tests/03-operations/businesses.spec.ts:43`) | ✅ Passed | Verified in 3 consecutive runs |
| 27 | `BIZ-EDG-01` | Operations | Non-existent search query returns 0 rows or empty message | Edge Case | `ADM-BIZ-04` (`tests/03-operations/businesses.spec.ts:61`) | ✅ Passed | Verified in 3 consecutive runs |
| 28 | `BIZ-EDG-02` | Operations | Special characters in search do not trigger application crash | Edge Case | `ADM-BIZ-05` (`tests/03-operations/businesses.spec.ts:72`) | ✅ Passed | Verified in 3 consecutive runs |
| 29 | `BIZ-NEG-01` | Operations | Searching HTML `<script>` tag handles input gracefully | Negative / Defect | `ADM-BIZ-06` (`tests/03-operations/businesses.spec.ts:88`) | ⚠️ Expected Fail (XFAIL) | Tracks BUG-GZ-001 (Backend drops connection on `<script>`) |
| 30 | `APP-FN-01` | Operations | Suspension appeals queue loads with empty state / indicator | Functional | `ADM-APP-01` (`tests/03-operations/suspension-appeals.spec.ts:4`) | ✅ Passed | Verified in 3 consecutive runs |
| 31 | `APP-WF-01` | Operations | Reviewing and approving/rejecting a business suspension appeal | Workflow / Mutation | *Blocked* | 🔒 Blocked (Safety) | Destructive/State-changing; safely isolated until staging environment is provisioned |
| 32 | `CLI-FN-01` | Operations | Clients table loads with customer records and login method | Functional | `ADM-CLI-01` (`tests/03-operations/clients.spec.ts:4`) | ✅ Passed | Verified in 3 consecutive runs |
| 33 | `CLI-FN-02` | Operations | Search filters client records dynamically | Functional / Search | `ADM-CLI-02` (`tests/03-operations/clients.spec.ts:25`) | ✅ Passed | Verified in 3 consecutive runs |
| 34 | `KYC-FN-01` | Operations | KYC queue loads with columns, document badges, and actions | Functional | `ADM-KYC-01` (`tests/03-operations/kyc.spec.ts:5`) | ✅ Passed | Verified in 3 consecutive runs |
| 35 | `KYC-FN-02` | Operations | Status tabs filter the KYC queue dynamically | Functional | `ADM-KYC-02` (`tests/03-operations/kyc.spec.ts:25`) | ✅ Passed | Verified in 3 consecutive runs |
| 36 | `KYC-FN-03` | Operations | Search filters KYC submissions dynamically | Functional / Search | `ADM-KYC-03` (`tests/03-operations/kyc.spec.ts:54`) | ✅ Passed | Verified in 3 consecutive runs |
| 37 | `KYC-WF-01` | Operations | Approving or rejecting submitted KYC identity documents | Workflow / Mutation | *Blocked* | 🔒 Blocked (Safety) | Destructive/State-changing; safely isolated until staging environment is provisioned |
| 38 | `REV-FN-01` | Operations | Review moderation page loads with status tabs and controls | Functional | `ADM-REV-01` (`tests/03-operations/review-moderation.spec.ts:4`) | ✅ Passed | Verified in 3 consecutive runs |
| 39 | `REV-WF-01` | Operations | Hiding or dismissing reported customer review | Workflow / Mutation | *Blocked* | 🔒 Blocked (Safety) | Destructive/State-changing; safely isolated until staging environment is provisioned |
| 40 | `WTH-FN-01` | Operations | Withdrawals page loads with filter tabs and request table | Functional | `ADM-WTH-01` (`tests/03-operations/withdrawals.spec.ts:4`) | ✅ Passed | Verified in 3 consecutive runs |
| 41 | `WTH-FN-02` | Operations | Withdrawal filter tabs switch active status and filter data | Functional | `ADM-WTH-02` (`tests/03-operations/withdrawals.spec.ts:24`) | ✅ Passed | Verified in 3 consecutive runs |
| 42 | `WTH-WF-01` | Operations | Approving and executing withdrawal payout transaction | Workflow / Financial | *Blocked* | 🔒 Blocked (Safety) | Destructive/State-changing; safely isolated until staging environment is provisioned |
| 43 | `FRD-FN-01` | Risk | Fraud alerts table loads with rules, severity, and status | Functional | `ADM-FRD-01` (`tests/04-risk/fraud.spec.ts:5`) | ✅ Passed | Verified in 3 consecutive runs |
| 44 | `FRD-FN-02` | Risk | Status tabs switch between alert resolution states | Functional | `ADM-FRD-02` (`tests/04-risk/fraud.spec.ts:25`) | ✅ Passed | Verified in 3 consecutive runs |
| 45 | `FRD-FN-03` | Risk | Filter by severity dropdown filters alert records | Functional | `ADM-FRD-03` (`tests/04-risk/fraud.spec.ts:45`) | ✅ Passed | Verified in 3 consecutive runs |
| 46 | `FRD-WF-01` | Risk | Dismissing or escalating a live fraud velocity alert | Workflow / Mutation | *Blocked* | 🔒 Blocked (Safety) | Destructive/State-changing; safely isolated until staging environment is provisioned |
| 47 | `AUD-FN-01` | System | Audit log loads with records, timestamps, and details | Functional | `ADM-AUD-01` (`tests/05-system/audit.spec.ts:5`) | ✅ Passed | Verified in 3 consecutive runs |
| 48 | `AUD-FN-02` | System | Category dropdown filters audit events | Functional | `ADM-AUD-02` (`tests/05-system/audit.spec.ts:25`) | ✅ Passed | Verified in 3 consecutive runs |
| 49 | `AUD-FN-03` | System | Action search input filters audit log records | Functional / Search | `ADM-AUD-03` (`tests/05-system/audit.spec.ts:42`) | ✅ Passed | Verified in 3 consecutive runs |
| 50 | `AUD-FN-04` | System | Pagination navigation cycles pages and updates indicator | Functional / Boundary | `ADM-AUD-04` (`tests/05-system/audit.spec.ts:59`) | ✅ Passed | Verified in 3 consecutive runs |
| 51 | `RULE-FN-01` | System | Booking rules page displays cutoff window and cancellation | Functional | `ADM-RULE-01` (`tests/05-system/booking-rules.spec.ts:4`) | ✅ Passed | Verified in 3 consecutive runs |
| 52 | `RULE-WF-01` | System | Modifying platform booking cancellation cutoff parameters | Workflow / Mutation | *Blocked* | 🔒 Blocked (Safety) | Destructive/State-changing; safely isolated until staging environment is provisioned |
| 53 | `CAT-FN-01` | System | Catalog displays business types and categories tabs | Functional | `ADM-CAT-01` (`tests/05-system/catalog.spec.ts:4`) | ✅ Passed | Verified in 3 consecutive runs |
| 54 | `CAT-WF-01` | System | Creating or deleting business categories or service types | Workflow / Mutation | *Blocked* | 🔒 Blocked (Safety) | Destructive/State-changing; safely isolated until staging environment is provisioned |
| 55 | `NOTIF-FN-01` | System | Notifications page loads with Inbox and Send controls | Functional | `ADM-NOTIF-01` (`tests/05-system/notifications.spec.ts:5`) | ✅ Passed | Verified in 3 consecutive runs |
| 56 | `NOTIF-FN-02` | System | Broadcast Announcement form opens with all fields | Functional | `ADM-NOTIF-02` (`tests/05-system/notifications.spec.ts:15`) | ✅ Passed | Verified in 3 consecutive runs |
| 57 | `NOTIF-BND-01` | System | Character length boundaries on notification fields | Boundary | `ADM-NOTIF-03` (`tests/05-system/notifications.spec.ts:29`) | ✅ Passed | Verified in 3 consecutive runs |
| 58 | `NOTIF-WF-01` | System | Broadcasting push announcement to all customers/providers | Workflow / Mutation | *Blocked* | 🔒 Blocked (Safety) | Destructive/State-changing; safely isolated until staging environment is provisioned |
| 59 | `BNK-FN-01` | System | Payout banks page displays configured banks and wallets list | Functional | `ADM-BNK-01` (`tests/05-system/payout-banks.spec.ts:4`) | ✅ Passed | Verified in 3 consecutive runs |
| 60 | `FEE-FN-01` | System | Platform fee rates and mock 1,000 ETB calculation render | Functional | `ADM-FEE-01` (`tests/05-system/platform-fees.spec.ts:5`) | ✅ Passed | Verified in 3 consecutive runs |
| 61 | `FEE-WF-01` | System | Modifying global platform customer or provider fee rates | Workflow / Mutation | *Blocked* | 🔒 Blocked (Safety) | Destructive/State-changing; safely isolated until staging environment is provisioned |
| 62 | `TRM-FN-01` | System | Terms and conditions page displays published version & controls | Functional | `ADM-TRM-01` (`tests/05-system/terms.spec.ts:4`) | ✅ Passed | Verified in 3 consecutive runs |
| 63 | `TRM-WF-01` | System | Publishing new terms and conditions revision | Workflow / Mutation | *Blocked* | 🔒 Blocked (Safety) | Destructive/State-changing; safely isolated until staging environment is provisioned |
| 64 | `USR-FN-01` | System | Users table loads with accounts, roles, and status indicators | Functional | `ADM-USR-01` (`tests/05-system/users.spec.ts:4`) | ✅ Passed | Verified in 3 consecutive runs |
| 65 | `USR-FN-02` | System | Search filters console user accounts dynamically | Functional / Search | `ADM-USR-02` (`tests/05-system/users.spec.ts:24`) | ✅ Passed | Verified in 3 consecutive runs |
| 66 | `INT-01` | Integration | Needs Action popover badges match KYC and Withdrawal counts | Consistency | `INT-01` (`tests/06-integration/cross-module-consistency.spec.ts:4`) | ✅ Passed | Verified in 3 consecutive runs |
| 67 | `INT-02` | Integration | Platform fee calculation model is mathematically consistent | Calculation | `INT-02` (`tests/06-integration/cross-module-consistency.spec.ts:50`) | ✅ Passed | Verified in 3 consecutive runs |
| 68 | `INT-03` | Integration | Payout banks configured in System match withdrawal accounts | Consistency | `INT-03` (`tests/06-integration/cross-module-consistency.spec.ts:76`) | ✅ Passed | Verified in 3 consecutive runs |
| 69 | `INT-04` | Integration | Catalog categories match Booking service categories | Consistency | `INT-04` (`tests/06-integration/cross-module-consistency.spec.ts:96`) | ✅ Passed | Verified in 3 consecutive runs |
| 70 | `A11Y-01` | Accessibility | Dashboard automated accessibility scan (Axe Core) | Standard | `A11Y-01` (`tests/08-accessibility/accessibility-wcag.spec.ts:5`) | ✅ Passed | Critical impact violations verified clean; color-contrast disabled in scan |
| 71 | `A11Y-02` | Accessibility | Form controls and interactive buttons have accessible names | Standard | `A11Y-02` (`tests/08-accessibility/accessibility-wcag.spec.ts:19`) | ✅ Passed | Verified in 3 consecutive runs |
| 72 | `A11Y-03` | Accessibility | Keyboard navigation and focus order across banner actions | Standard | `A11Y-03` (`tests/08-accessibility/accessibility-wcag.spec.ts:40`) | ✅ Passed | Verified in 3 consecutive runs |
| 73 | `UI-01` | UI/UX | Responsive adaptivity across viewports (1440x900, 768x1024, 375x667) | Responsive | `UI-01` (`tests/09-ui-ux-responsive/responsive-and-ui.spec.ts:4`) | ✅ Passed | Verified in 3 consecutive runs |
| 74 | `UI-02` | UI/UX | Sidebar collapse and expand functionality | Layout | `UI-02` (`tests/09-ui-ux-responsive/responsive-and-ui.spec.ts:22`) | ✅ Passed | Verified in 3 consecutive runs |
| 75 | `UI-03` | UI/UX | Empty state UI consistency across inactive operational queues | Consistency | `UI-03` (`tests/09-ui-ux-responsive/responsive-and-ui.spec.ts:35`) | ✅ Passed | Verified in 3 consecutive runs |
| 76 | `PERF-01` | Performance | Key administrative module navigation completes under threshold | Latency | `PERF-01` (`tests/10-performance/performance-benchmarks.spec.ts:4`) | ✅ Passed | Verified in 3 consecutive runs |
| 77 | `PERF-02` | Performance | Console health check confirms zero unhandled runtime errors | Client Health | `PERF-02` (`tests/10-performance/performance-benchmarks.spec.ts:24`) | ✅ Passed | Verified in 3 consecutive runs |

---

## 3. Category Breakdown & Health Summary

| Testing Category | Total Defined Scenarios | Automated & Executed | Blocked (Live Safety) | Status / Health Evaluation |
|---|---|---|---|---|
| **Functional & Positive** | 42 | 42 | 0 | **100%** of documented read-only operations verified |
| **Negative & Validation** | 3 | 3 | 0 | Form validation alerts & `BUG-GZ-001` XFAIL tracking |
| **Boundary Value** | 1 | 1 | 0 | Notification character limits (120/500) enforced |
| **Edge Cases** | 2 | 2 | 0 | Special characters & non-existent query handling |
| **Integration & Cross-Module** | 5 | 5 | 0 | Commission formula, bank codes, catalog, queue badge consistency |
| **Security & Session** | 5 | 5 | 0 | Route guards, token format, sign-out modal, XSS input resilience |
| **Accessibility (A11Y)** | 3 | 3 | 0 | Critical WCAG violations scanned, ARIA labels, tab order |
| **UI/UX & Responsiveness** | 2 | 2 | 0 | Desktop (1440), Tablet (768), Mobile (375), and sidebar toggle |
| **Performance & Client Health** | 2 | 2 | 0 | Latency <3500ms and zero unhandled console runtime exceptions |
| **State-Changing Workflows** | 12 | 0 | 12 | **100%** safely blocked pending isolated staging environment |
| **TOTAL** | **77** | **65** | **12** | **100% Deterministic Execution (64 Passed, 1 XFAIL, 0 Flaky)** |

---

## 4. Operational Sign-off Prerequisites

To achieve 100% test automation execution across all 77 scenarios, the following infrastructure must be provisioned:
1. **Isolated Staging Environment:** Dedicated sandbox mirroring production schema without real business impacts.
2. **Disposable Test Data Seeding:** Scripted creation and cleanup of test businesses, pending KYC submissions, mock booking records, and withdrawal requests.
3. **SMS / Email Gateway Virtualization:** In-memory inbox or webhook sinks to safely receive verification codes, password resets, and user notifications.
