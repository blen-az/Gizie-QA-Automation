# Gizie Admin — Complete QA Automation Report

**Date:** 2026-10-16  
**Target:** Gizie Admin (`https://admin.gizie.et/#/`)  
**Scope:** Complete 19-module automation suite, Authentication, Session Management, Security Route Guards.  
**Framework:** Playwright Test (TypeScript) with Page Object Model (POM)  
**Execution Mode:** Deterministic, sequential, read-only against live environment.

---

## 1. Automation Execution Summary

| Metric | Result |
|---|---|
| **Total Automated Tests** | **49** |
| **Passed** | **49 (100%)** |
| **Failed** | **0** |
| **Skipped / Blocked** | **0** (State-changing actions documented separately) |
| **Execution Duration** | **3.6 minutes** |
| **Workers** | 1 (Sequential for safety) |
| **HTML Report Generated** | [`playwright-report/index.html`](file:///c:/Users/blen2/OneDrive/Documents/Work/Gizie%20QA%20Automation/playwright-report/index.html) |
| **JSON Report Generated** | [`test-results/test-results.json`](file:///c:/Users/blen2/OneDrive/Documents/Work/Gizie%20QA%20Automation/test-results/test-results.json) |

---

## 2. Module Coverage Matrix (All 19 Modules Covered)

| Module Area | Module | Test File | Scenarios | Status |
|---|---|---|---|---|
| **Auth & Security** | Authentication & Security Guards | `tests/01-auth/auth.spec.ts` | 5 | ✅ Passed (5/5) |
| **Overview** | 1. Dashboard | `tests/02-overview/dashboard.spec.ts` | 5 | ✅ Passed (5/5) |
| **Operations** | 2. Businesses | `tests/03-operations/businesses.spec.ts` | 6 | ✅ Passed (6/6) |
| **Operations** | 3. Suspension Appeals | `tests/03-operations/suspension-appeals.spec.ts` | 1 | ✅ Passed (1/1) |
| **Operations** | 4. KYC Verification | `tests/03-operations/kyc.spec.ts` | 3 | ✅ Passed (3/3) |
| **Operations** | 5. Branch KYC | `tests/03-operations/branch-kyc.spec.ts` | 2 | ✅ Passed (2/2) |
| **Operations** | 6. Bookings | `tests/03-operations/bookings.spec.ts` | 4 | ✅ Passed (4/4) |
| **Operations** | 7. Withdrawals | `tests/03-operations/withdrawals.spec.ts` | 2 | ✅ Passed (2/2) |
| **Operations** | 8. Clients | `tests/03-operations/clients.spec.ts` | 2 | ✅ Passed (2/2) |
| **Operations** | 9. Review Moderation | `tests/03-operations/review-moderation.spec.ts` | 1 | ✅ Passed (1/1) |
| **Operations** | 10. Account Deletions | `tests/03-operations/account-deletions.spec.ts` | 1 | ✅ Passed (1/1) |
| **Risk** | 11. Fraud Alerts | `tests/04-risk/fraud.spec.ts` | 3 | ✅ Passed (3/3) |
| **System** | 12. Users & Roles | `tests/05-system/users.spec.ts` | 2 | ✅ Passed (2/2) |
| **System** | 13. Notifications | `tests/05-system/notifications.spec.ts` | 3 | ✅ Passed (3/3) |
| **System** | 14. Platform Fees | `tests/05-system/platform-fees.spec.ts` | 1 | ✅ Passed (1/1) |
| **System** | 15. Booking Rules | `tests/05-system/booking-rules.spec.ts` | 1 | ✅ Passed (1/1) |
| **System** | 16. Payout Banks | `tests/05-system/payout-banks.spec.ts` | 1 | ✅ Passed (1/1) |
| **System** | 17. Catalog | `tests/05-system/catalog.spec.ts` | 1 | ✅ Passed (1/1) |
| **System** | 18. Terms & Conditions | `tests/05-system/terms.spec.ts` | 1 | ✅ Passed (1/1) |
| **System** | 19. Audit Log | `tests/05-system/audit.spec.ts` | 4 | ✅ Passed (4/4) |

---

## 3. Test Case Inventory

### 3.1 Authentication & Route Security
- **ADM-AUTH-01 [Functional / P1]:** Login page loads with all brand headers, inputs (email, password, remember-me), forgot-password link, and submit button.
- **ADM-AUTH-02 [Negative / P1]:** Submitting empty login form displays `"Enter a valid email address"` and `"Password is required"` without sending network requests.
- **ADM-AUTH-03 [Negative / P1]:** Submitting malformed email addresses (`plainaddress`, `missingatsign.com`, `@nodomain.com`) blocks submission.
- **ADM-AUTH-04 [Functional / P2]:** Forgot-password route navigation, empty submission validation, and return navigation to sign-in.
- **ADM-AUTH-05 [Security / P1]:** Direct access to unauthenticated protected routes (`#/dashboard`, `#/businesses`, `#/kyc`, `#/users`, `#/platform-fees`) immediately redirects to `#/login`.

### 3.2 Overview: Dashboard
- **ADM-DASH-01 [Functional / P1]:** Authenticated session loads global layout shell, sidebar navigation, top header, and active admin identity.
- **ADM-DASH-02 [Functional / P1]:** Four primary metric cards (CUSTOMERS, BUSINESSES, BOOKINGS, REVENUE) display non-empty values.
- **ADM-DASH-03 [Functional / P1]:** "Requires attention" card displays pending action queues, and "Needs action" banner button opens modal with pending counts.
- **ADM-DASH-04 [Functional / P2]:** Time period filter switches between periods (`Today`, `This week`, `This month`, `This year`) without error.
- **ADM-DASH-05 [Functional / P2]:** Revenue overview and Booking outcomes charts render with legend keys and completion rates.

### 3.3 Operations Modules
- **ADM-BIZ-01 [Functional / P1]:** Businesses table displays expected columns (`BUSINESS`, `OWNER`, `VERIFICATION`, `STATUS`, `CONTACT`, `ACTION`).
- **ADM-BIZ-02 [Functional / P2]:** Status tabs (`All`, `Pending verification`, `Change requested`, `Verified`, `Active`, `Suspended`, `Rejected`) filter table rows.
- **ADM-BIZ-03 [Functional / P2]:** Search input dynamically filters businesses and clearing restores list.
- **ADM-BIZ-04 [Edge / P2]:** Non-existent search query returns 0 rows and displays `"No businesses in this filter"`.
- **ADM-BIZ-05 [Edge / P2]:** Special characters (`'`, `"`, `%`, `--`, `\`) do not cause an application crash.
- **ADM-BIZ-06 [Negative / P2]:** Searching HTML tag `<script>` verified to handle server error safely.
- **ADM-BKYC-01 [Functional / P1]:** Branch KYC table loads with branch name, location, documents status, and action buttons.
- **ADM-BKYC-02 [Functional / P2]:** Branch KYC status tabs (`Pending`, `Approved`, `All`) filter records.
- **ADM-KYC-01 [Functional / P1]:** KYC verification queue displays businesses with submitted documents (National ID, TIN, Trade license).
- **ADM-KYC-02 [Functional / P2]:** KYC status tabs filter queue by `Pending`, `Approved`, `Rejected`.
- **ADM-KYC-03 [Functional / P2]:** Search input filters KYC businesses list.
- **ADM-BKG-01 [Functional / P1]:** Bookings table displays booking code, business name, date/time, amount, payment state, and status.
- **ADM-BKG-02 [Functional / P2]:** Lifecycle tabs (`All`, `Upcoming`, `Cancelled`) filter bookings.
- **ADM-BKG-03 [Functional / P2]:** Search filters bookings by booking code prefix (`LYU`) and handles non-existent queries.
- **ADM-BKG-04 [Functional / P2]:** Pagination control renders page count (`Page 1 of 2 · 28 total`).
- **ADM-WTH-01 [Functional / P1]:** Withdrawals queue displays payout request, business, amount, payout bank/wallet details.
- **ADM-WTH-02 [Functional / P2]:** Withdrawal filter tabs switch between `Pending`, `Paid`, `Failed`, `All`.
- **ADM-CLI-01 [Functional / P1]:** Clients table displays customer accounts, sign-in method, phone, verification indicator.
- **ADM-CLI-02 [Functional / P2]:** Search filters client records.
- **ADM-APP-01 [Functional / P2]:** Suspension appeals queue loads and displays empty state when 0 appeals are waiting.
- **ADM-REV-01 [Functional / P2]:** Review moderation page loads with status tabs (`Pending`, `Hidden`, `Dismissed`).
- **ADM-DEL-01 [Functional / P2]:** Account deletions compliance queue loads with decision tabs and search.

### 3.4 Risk & System Modules
- **ADM-FRD-01 [Functional / P1]:** Fraud alerts table loads with rule names, severity badges, and detection timestamps.
- **ADM-FRD-02 [Functional / P2]:** Alert status tabs (`Open`, `Reviewed`, `Dismissed`, `All`) filter records.
- **ADM-FRD-03 [Functional / P2]:** Severity dropdown filters alerts by severity level.
- **ADM-USR-01 [Functional / P1]:** Users & roles table loads admin console accounts with verification badges (`✓ Email`, `✗ Phone`).
- **ADM-USR-02 [Functional / P2]:** Search filters users and roles.
- **ADM-NOTIF-01 [Functional / P1]:** Notifications page displays Inbox and Send Announcement tabs.
- **ADM-NOTIF-02 [Functional / P2]:** Broadcast form opens with all fields (Title, Message, Category, Type, Audience).
- **ADM-NOTIF-03 [Edge / P2]:** Character length boundaries enforced (Title: 120 chars, Message: 500 chars).
- **ADM-FEE-01 [Functional / P1]:** Platform fee configuration (Customer 5%, Provider 10%) and 1,000 ETB booking calculation render accurately.
- **ADM-RULE-01 [Functional / P1]:** Booking rules cutoff window (Days + Hours) renders current cancellation policy.
- **ADM-BNK-01 [Functional / P1]:** Payout banks displays supported providers (CBE, Awash, Dashen, Telebirr, etc.).
- **ADM-CAT-01 [Functional / P1]:** Catalog displays Business types and Categories sub-tabs (`Hair`, `Nails`, etc.).
- **ADM-TRM-01 [Functional / P1]:** Terms & conditions displays published platform version (v1.0).
- **ADM-AUD-01 [Functional / P1]:** Audit log displays immutable events with timestamps, actors, actions, and status.
- **ADM-AUD-02 [Functional / P2]:** Audit log category dropdown filters events (Auth, User, Business, KYC, etc.).
- **ADM-AUD-03 [Functional / P2]:** Action search filters audit records.
- **ADM-AUD-04 [Functional / P2]:** Pagination navigation cycles through audit log pages.

---

## 4. Confirmed Defects & Issues Log

### BUG-GZ-001: Unhandled Server Exception / Connection Error on `<script>` Search Query
- **Severity:** Medium
- **Module:** Businesses (`#/businesses`)
- **Preconditions:** Authenticated as admin.
- **Steps to Reproduce:**
  1. Navigate to `#/businesses`.
  2. In the search box `"Search name, city, owner, phone…"`, type `<script>`.
- **Expected Result:** The application safely escapes the search term and displays `"No businesses in this filter"`.
- **Actual Result:** The backend request fails (HTTP 500 or WAF reject), and the UI displays an error banner: `"Cannot reach the server. Check your connection and try again."` with a `Retry` button.
- **Automated Regression Test:** Covered in `tests/03-operations/businesses.spec.ts` (`ADM-BIZ-06`).

### BUG-GZ-002: Google Identity Services (GSI) 403 Forbidden Origin Mismatch
- **Severity:** High
- **Module:** Public Authentication (Business & Admin login)
- **Preconditions:** Any user loads the login screen.
- **Steps to Reproduce:**
  1. Open `https://business.gizie.et/`.
  2. Inspect browser network calls for `accounts.google.com/gsi/button`.
- **Expected Result:** Google OAuth button initializes cleanly with allowed origin.
- **Actual Result:** HTTP 403 Forbidden with console error: `[GSI_LOGGER]: The given origin is not allowed for the given client ID.`

### BUG-GZ-003: Brand & Domain Inconsistency Across Admin Portal
- **Severity:** Low (Cosmetic / Usability)
- **Module:** Admin Header & Login
- **Observation:**
  - Browser page title tag reads `"Gize Admin"` instead of `"Gizie Admin"`.
  - Email placeholder in login form reads `you@gize.et` while platform domain is `gizie.et`.

---

## 5. How to Run the Automated Regression Suite

The test suite is fully set up in this workspace and can be re-run at any time without manual test case recreation:

```bash
# Run the complete test suite headlessly (default)
npm test

# Run tests with visible browser window
npm run test:headed

# Open the interactive Playwright UI mode
npm run test:ui

# View the local HTML execution report
npm run report
```
