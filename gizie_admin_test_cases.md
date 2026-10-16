# Gizie Admin — Authoritative Unified Test Registry & Scenario Matrix

**Target Application:** Gizie Admin Console (`https://admin.gizie.et/`)  
**Audited & Verified Date:** 2026-10-16  
**Automation Framework:** Playwright Test (TypeScript)  
**Execution Profile:** Google Chrome (Headless), Single Worker, Live Read-Only Mode  
**Registry Scope:** 77 Total Managed Scenarios (65 Automated & Machine-Verified, 12 Blocked State-Changing Workflows)

---

## 1. Registry Architecture & Reconciliation Summary

This authoritative registry establishes a 1-to-1 canonical mapping between high-level QA requirements and concrete automated Playwright specs. 

### Reconciled Metrics:
- **Total Test Scenarios Defined:** **77**
- **Automated & Verified Executable Tests:** **65**
- **State-Changing / Destructive Scenarios Blocked for Staging:** **12**
- **Discrepancy Resolution:**
  - Resolved `playwright.config.ts` regex defect where `testIgnore: /.*auth\.spec\.ts/` unintentionally excluded the 4 security tests in `tests/07-security/security-and-auth.spec.ts` (61 executed vs 65 documented).
  - Resolved documentation omission where 4 blocked workflows (`BKG-WF-01`, `REV-WF-01`, `FRD-WF-01`, `TRM-WF-01`) and 3 integration tests (`INT-02`, `INT-03`, `INT-04`) were present in the coverage matrix but omitted from the test case matrix (72 vs 77).
  - Established canonical ID format mapping requirement codes (`AUTH-FN-01`) to executable spec titles (`ADM-AUTH-01`).

---

## 2. Master Test Registry Table

| Canonical ID | Module | Category | Description & Expected Result | Playwright Spec & Location | Execution Status | Evidence / Verification Method |
|---|---|---|---|---|---|---|
| **AUTH-FN-01** | Authentication | Functional | Login page renders logo, inputs, checkboxes, and buttons | `ADM-AUTH-01` (`tests/01-auth/auth.spec.ts:5`) | Passed | DOM visibility assertions on all form elements |
| **AUTH-NEG-01** | Authentication | Negative | Submitting empty login form displays client validation alerts without network calls | `ADM-AUTH-02` (`tests/01-auth/auth.spec.ts:18`) | Passed | Form validation alert locators + request listener |
| **AUTH-NEG-02** | Authentication | Negative / Boundary | Malformed email strings rejected with format alert | `ADM-AUTH-03` (`tests/01-auth/auth.spec.ts:36`) | Passed | Iterative submit with 4 malformed email patterns |
| **AUTH-FN-02** | Authentication | Functional | Forgot password flow navigates and validates empty submission | `ADM-AUTH-04` (`tests/01-auth/auth.spec.ts:48`) | Passed | Route check `#/forgot-password` and validation |
| **AUTH-SEC-01** | Authentication | Security | Direct access to protected routes redirects to `#/login` | `ADM-AUTH-05` (`tests/01-auth/auth.spec.ts:69`) | Passed | Unauthenticated URL navigation assertions |
| **AUTH-SEC-02** | Authentication | Security / Session | Admin accounts cannot be suspended, banned, or deleted | `SEC-01` (`tests/07-security/security-and-auth.spec.ts:4`) | Passed | UI policy text check + button count === 0 |
| **AUTH-SEC-03** | Authentication | Security | LocalStorage tokens conform to valid 3-part base64 JWT format | `SEC-02` (`tests/07-security/security-and-auth.spec.ts:18`) | Passed | LocalStorage extraction and part count verification |
| **AUTH-SEC-04** | Authentication | Security / UI | Sign out click opens confirmation modal; Cancel safely preserves session | `SEC-03` (`tests/07-security/security-and-auth.spec.ts:43`) | Passed | Modal rendering, warning copy check, cancel click |
| **AUTH-SEC-05** | Authentication | Security / XSS | XSS payload in search input is sanitized and does not execute script | `SEC-04` (`tests/07-security/security-and-auth.spec.ts:68`) | Passed | Dialog listener + DOM injection count === 0 |
| **DASH-FN-01** | Overview | Functional | Dashboard loads shell, navigation sidebar, and user identity | `ADM-DASH-01` (`tests/02-overview/dashboard.spec.ts:5`) | Passed | Heading, logo, user email `admin@gize.com` |
| **DASH-FN-02** | Overview | Functional | Key metric cards display valid structure and data | `ADM-DASH-02` (`tests/02-overview/dashboard.spec.ts:14`) | Passed | Numerical checks on 4 core metric cards |
| **DASH-FN-03** | Overview | Functional | Requires attention queue & Needs Action popover display properly | `ADM-DASH-03` (`tests/02-overview/dashboard.spec.ts:26`) | Passed | Popover trigger, sub-item queue breakdown |
| **DASH-FN-04** | Overview | Functional | Time period filters (Today, This week, This month, This year) switch state | `ADM-DASH-04` (`tests/02-overview/dashboard.spec.ts:42`) | Passed | Active class toggling and stable re-render |
| **DASH-FN-05** | Overview | Functional | Revenue trend chart & booking outcomes donut render | `ADM-DASH-05` (`tests/02-overview/dashboard.spec.ts:56`) | Passed | SVG / canvas chart element visibility |
| **DEL-FN-01** | Operations | Functional | Account deletions page loads with decision tabs and search | `ADM-DEL-01` (`tests/03-operations/account-deletions.spec.ts:4`) | Passed | Pending/Approved/Rejected tabs, table, search |
| **DEL-WF-01** | Operations | Workflow / Mutation | Permanent deletion of client/business account execution | *Blocked* | Blocked ⚠️ | Requires disposable deletion candidate |
| **BKG-FN-01** | Operations | Functional | Bookings table loads with column structure and active records | `ADM-BKG-01` (`tests/03-operations/bookings.spec.ts:5`) | Passed | Table headers (BOOKING, BUSINESS, AMOUNT, STATUS) |
| **BKG-FN-02** | Operations | Functional | Booking lifecycle status tabs filter table views | `ADM-BKG-02` (`tests/03-operations/bookings.spec.ts:27`) | Passed | Tab switching (Upcoming, Completed, Cancelled) |
| **BKG-FN-03** | Operations | Functional / Search | Search query filters bookings by booking code or customer | `ADM-BKG-03` (`tests/03-operations/bookings.spec.ts:47`) | Passed | Dynamic filtering + non-existent 0 count |
| **BKG-FN-04** | Operations | Functional / Boundary| Pagination controls exist and display page numbers | `ADM-BKG-04` (`tests/03-operations/bookings.spec.ts:64`) | Passed | Pagination indicators and disabled state check |
| **BKG-WF-01** | Operations | Workflow / Mutation | Booking cancellation and refund calculation workflow | *Blocked* | Blocked ⚠️ | Cancelling live customer booking blocked |
| **BKYC-FN-01** | Operations | Functional | Branch KYC table loads with verification statuses and controls | `ADM-BKYC-01` (`tests/03-operations/branch-kyc.spec.ts:4`) | Passed | Headers (BRANCH, LOCATION, DOCUMENTS, STATUS) |
| **BKYC-FN-02** | Operations | Functional | Branch KYC filter tabs switch views and update counts | `ADM-BKYC-02` (`tests/03-operations/branch-kyc.spec.ts:25`) | Passed | Tab badge parsing + auto-waited table row counts |
| **BIZ-FN-01** | Operations | Functional | Businesses table loads with expected columns and controls | `ADM-BIZ-01` (`tests/03-operations/businesses.spec.ts:5`) | Passed | Table headers (BUSINESS, OWNER, VERIFICATION, STATUS) |
| **BIZ-FN-02** | Operations | Functional | Status tabs filter the businesses list | `ADM-BIZ-02` (`tests/03-operations/businesses.spec.ts:26`) | Passed | Status tabs (Pending, Verified, Active, All) |
| **BIZ-FN-03** | Operations | Functional / Search | Dynamic search filters businesses and clearing restores list | `ADM-BIZ-03` (`tests/03-operations/businesses.spec.ts:43`) | Passed | Query filter + restore original count |
| **BIZ-EDG-01** | Operations | Edge Case | Non-existent search query returns 0 rows or empty message | `ADM-BIZ-04` (`tests/03-operations/businesses.spec.ts:61`) | Passed | Row count === 0 or empty message card |
| **BIZ-EDG-02** | Operations | Edge Case | Special characters in search do not trigger application crash | `ADM-BIZ-05` (`tests/03-operations/businesses.spec.ts:72`) | Passed | Special characters query + locator.or() wait |
| **BIZ-NEG-01** | Operations | Negative / Defect | Searching HTML `<script>` tag handles input gracefully | `ADM-BIZ-06` (`tests/03-operations/businesses.spec.ts:88`) | Expected Fail (XFAIL) | Confirms BUG-GZ-001 (Server drops connection) |
| **APP-FN-01** | Operations | Functional | Suspension appeals queue loads with empty state / indicator | `ADM-APP-01` (`tests/03-operations/suspension-appeals.spec.ts:4`) | Passed | Empty state card + Refresh button |
| **APP-WF-01** | Operations | Workflow / Mutation | Reviewing and approving/rejecting a business suspension appeal | *Blocked* | Blocked ⚠️ | Requires suspended business appeal record |
| **CLI-FN-01** | Operations | Functional | Clients table loads with customer records and login method | `ADM-CLI-01` (`tests/03-operations/clients.spec.ts:4`) | Passed | Column headers (CLIENT, CONTACT, JOINED, STATUS) |
| **CLI-FN-02** | Operations | Functional / Search | Search filters client records dynamically | `ADM-CLI-02` (`tests/03-operations/clients.spec.ts:25`) | Passed | Search input filter + non-existent query test |
| **KYC-FN-01** | Operations | Functional | KYC queue loads with columns, document badges, and actions | `ADM-KYC-01` (`tests/03-operations/kyc.spec.ts:5`) | Passed | Headers, document badges, Review action links |
| **KYC-FN-02** | Operations | Functional | Status tabs filter the KYC queue dynamically | `ADM-KYC-02` (`tests/03-operations/kyc.spec.ts:25`) | Passed | Tab badge parsing + auto-waited table row counts |
| **KYC-FN-03** | Operations | Functional / Search | Search filters KYC submissions dynamically | `ADM-KYC-03` (`tests/03-operations/kyc.spec.ts:54`) | Passed | Search query + clear restoration auto-wait |
| **KYC-WF-01** | Operations | Workflow / Mutation | Approving or rejecting submitted KYC identity documents | *Blocked* | Blocked ⚠️ | Mutating live business KYC compliance blocked |
| **REV-FN-01** | Operations | Functional | Review moderation page loads with status tabs and controls | `ADM-REV-01` (`tests/03-operations/review-moderation.spec.ts:4`) | Passed | Pending/Approved/Removed tabs |
| **REV-WF-01** | Operations | Workflow / Mutation | Hiding or dismissing reported customer review | *Blocked* | Blocked ⚠️ | Moderating live user reviews blocked |
| **WTH-FN-01** | Operations | Functional | Withdrawals page loads with filter tabs and request table | `ADM-WTH-01` (`tests/03-operations/withdrawals.spec.ts:4`) | Passed | Headers (REQUEST, BUSINESS, AMOUNT, PAY TO, STATUS) |
| **WTH-FN-02** | Operations | Functional | Withdrawal filter tabs switch active status and filter data | `ADM-WTH-02` (`tests/03-operations/withdrawals.spec.ts:24`) | Passed | Tab counts + status column cell verification |
| **WTH-WF-01** | Operations | Workflow / Financial | Approving and executing withdrawal payout transaction | *Blocked* | Blocked ⚠️ | Processing live 5,000 ETB payout blocked |
| **FRD-FN-01** | Risk | Functional | Fraud alerts table loads with rules, severity, and status | `ADM-FRD-01` (`tests/04-risk/fraud.spec.ts:5`) | Passed | Table structure, rule names, severity badges |
| **FRD-FN-02** | Risk | Functional | Status tabs switch between alert resolution states | `ADM-FRD-02` (`tests/04-risk/fraud.spec.ts:25`) | Passed | Open, Investigating, Dismissed, Resolved tabs |
| **FRD-FN-03** | Risk | Functional | Filter by severity dropdown filters alert records | `ADM-FRD-03` (`tests/04-risk/fraud.spec.ts:45`) | Passed | Severity select options + auto-waited row counts |
| **FRD-WF-01** | Risk | Workflow / Mutation | Dismissing or escalating a live fraud velocity alert | *Blocked* | Blocked ⚠️ | Modifying operational fraud alerts blocked |
| **AUD-FN-01** | System | Functional | Audit log loads with records, timestamps, and details | `ADM-AUD-01` (`tests/05-system/audit.spec.ts:5`) | Passed | Headers (TIMESTAMP, ACTOR, ACTION, TARGET, IP) |
| **AUD-FN-02** | System | Functional | Category dropdown filters audit events | `ADM-AUD-02` (`tests/05-system/audit.spec.ts:25`) | Passed | Category select (Auth, KYC, Financial, Settings) |
| **AUD-FN-03** | System | Functional / Search | Action search input filters audit log records | `ADM-AUD-03` (`tests/05-system/audit.spec.ts:42`) | Passed | Action search query + non-existent test |
| **AUD-FN-04** | System | Functional / Boundary| Pagination navigation cycles pages and updates indicator | `ADM-AUD-04` (`tests/05-system/audit.spec.ts:59`) | Passed | Page next/prev buttons + page index validation |
| **RULE-FN-01**| System | Functional | Booking rules page displays cutoff window and cancellation | `ADM-RULE-01` (`tests/05-system/booking-rules.spec.ts:4`) | Passed | Cutoff window inputs, active cancellation policy |
| **RULE-WF-01**| System | Workflow / Mutation | Modifying platform booking cancellation cutoff parameters | *Blocked* | Blocked ⚠️ | Mutating global marketplace policy blocked |
| **CAT-FN-01** | System | Functional | Catalog displays business types and categories tabs | `ADM-CAT-01` (`tests/05-system/catalog.spec.ts:4`) | Passed | Category list, business types, slug structure |
| **CAT-WF-01** | System | Workflow / Mutation | Creating or deleting business categories or service types | *Blocked* | Blocked ⚠️ | Modifying live marketplace catalog blocked |
| **NOTIF-FN-01**| System | Functional | Notifications page loads with Inbox and Send controls | `ADM-NOTIF-01` (`tests/05-system/notifications.spec.ts:5`) | Passed | Inbox table, Send button, status tabs |
| **NOTIF-FN-02**| System | Functional | Broadcast Announcement form opens with all fields | `ADM-NOTIF-02` (`tests/05-system/notifications.spec.ts:15`) | Passed | Title, body, target audience selector, priority |
| **NOTIF-BND-01**| System | Boundary | Character length boundaries on notification fields | `ADM-NOTIF-03` (`tests/05-system/notifications.spec.ts:29`) | Passed | Maxlength attribute checks on title & body |
| **NOTIF-WF-01**| System | Workflow / Mutation | Broadcasting push announcement to all customers/providers | *Blocked* | Blocked ⚠️ | Sending broadcast messages blocked in prod |
| **BNK-FN-01**  | System | Functional | Payout banks page displays configured banks and wallets list | `ADM-BNK-01` (`tests/05-system/payout-banks.spec.ts:4`) | Passed | CBE, Awash, Dashen, Abyssinia, Telebirr |
| **FEE-FN-01**  | System | Functional | Platform fee rates and mock 1,000 ETB calculation render | `ADM-FEE-01` (`tests/05-system/platform-fees.spec.ts:5`) | Passed | Customer Fee (5%), Provider Fee (10%), Breakdown |
| **FEE-WF-01**  | System | Workflow / Mutation | Modifying global platform customer or provider fee rates | *Blocked* | Blocked ⚠️ | Adjusting marketplace commission fees blocked |
| **TRM-FN-01**  | System | Functional | Terms and conditions page displays published version & controls| `ADM-TRM-01` (`tests/05-system/terms.spec.ts:4`) | Passed | Version metadata, view editor action |
| **TRM-WF-01**  | System | Workflow / Mutation | Publishing new terms and conditions revision | *Blocked* | Blocked ⚠️ | Modifying legal terms blocked in prod |
| **USR-FN-01**  | System | Functional | Users table loads with accounts, roles, and status indicators| `ADM-USR-01` (`tests/05-system/users.spec.ts:4`) | Passed | Account, Role, Verified, Status columns |
| **USR-FN-02**  | System | Functional / Search | Search filters console user accounts dynamically | `ADM-USR-02` (`tests/05-system/users.spec.ts:24`) | Passed | Search input filter + non-existent query test |
| **INT-01**     | Integration | Consistency | Needs Action popover badges match KYC and Withdrawal counts | `INT-01` (`tests/06-integration/cross-module-consistency.spec.ts:4`) | Passed | Banner badge === sum of pending KYC & withdrawals |
| **INT-02**     | Integration | Calculation | Platform fee calculation model is mathematically consistent | `INT-02` (`tests/06-integration/cross-module-consistency.spec.ts:50`) | Passed | 1,000 ETB math: 1,050 paid, 900 payout, 150 net |
| **INT-03**     | Integration | Consistency | Payout banks configured in System match withdrawal accounts | `INT-03` (`tests/06-integration/cross-module-consistency.spec.ts:76`) | Passed | Supported bank list cross-checked against queues |
| **INT-04**     | Integration | Consistency | Catalog categories match Booking service categories | `INT-04` (`tests/06-integration/cross-module-consistency.spec.ts:96`) | Passed | Service categories matched to catalog taxonomy |
| **A11Y-01**    | Accessibility | Standard | Dashboard automated accessibility scan (Axe Core) | `A11Y-01` (`tests/08-accessibility/accessibility-wcag.spec.ts:5`) | Passed | Zero critical violations with color-contrast disabled |
| **A11Y-02**    | Accessibility | Standard | Form controls and interactive buttons have accessible names | `A11Y-02` (`tests/08-accessibility/accessibility-wcag.spec.ts:19`) | Passed | Input labels, aria-labels, and placeholder audit |
| **A11Y-03**    | Accessibility | Standard | Keyboard navigation and focus order across banner actions | `A11Y-03` (`tests/08-accessibility/accessibility-wcag.spec.ts:40`) | Passed | Tab key focus cycle through header interactive nodes |
| **UI-01**      | UI/UX | Responsive | Responsive adaptivity across viewports (1440x900, 768x1024, 375x667) | `UI-01` (`tests/09-ui-ux-responsive/responsive-and-ui.spec.ts:4`) | Passed | Header/navigation rendering across 3 device viewports |
| **UI-02**      | UI/UX | Layout | Sidebar collapse and expand functionality | `UI-02` (`tests/09-ui-ux-responsive/responsive-and-ui.spec.ts:22`) | Passed | Collapse button toggle + expanded aria state |
| **UI-03**      | UI/UX | Consistency | Empty state UI consistency across inactive operational queues | `UI-03` (`tests/09-ui-ux-responsive/responsive-and-ui.spec.ts:35`) | Passed | Card, heading, and description consistency |
| **PERF-01**    | Performance | Latency | Key administrative module navigation completes under threshold | `PERF-01` (`tests/10-performance/performance-benchmarks.spec.ts:4`) | Passed | Navigation duration < 3500ms across 5 core routes |
| **PERF-02**    | Performance | Client Health | Console health check confirms zero unhandled runtime errors | `PERF-02` (`tests/10-performance/performance-benchmarks.spec.ts:24`) | Passed | Zero application JS errors (excluding external GSI 403) |
