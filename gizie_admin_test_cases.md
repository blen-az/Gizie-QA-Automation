# Gizie Admin — Comprehensive Test Case Matrix

**Target Application:** Gizie Admin Console (`https://admin.gizie.et/`)  
**Document Version:** 2.0  
**Framework:** Playwright Test (TypeScript)  
**Author:** QA Automation Lead / Senior QA Engineer  

---

## 1. Overview & Categorization Methodology

This test matrix structures test scenarios across 10 QA categories:
1. **Functional (FN):** Core features and workflow validity.
2. **Positive (POS):** Happy-path flows with valid data.
3. **Negative (NEG):** Validation rules, error handling, invalid inputs, and bad formats.
4. **Boundary Value (BND):** Minimum/maximum constraints, character limits, rate boundaries.
5. **Edge Case (EDG):** Special characters, empty states, rapid interactions, multi-tab.
6. **Integration (INT):** Cross-module data consistency and calculation logic.
7. **Security (SEC):** Route authorization, session revocation, token safety, XSS protection.
8. **UI/UX (UI):** Responsiveness, layout adaptivity, modal mechanics, state transitions.
9. **Performance (PRF):** Page navigation latency (<3500ms), search debounce (<1500ms), 0 JS runtime exceptions.
10. **Accessibility & Compatibility (A11Y):** WCAG 2.2 AA standards, accessible names, keyboard focus order.

---

## 2. Test Cases by Module

### 2.0 Global Navigation, Shell & Authentication

| Test ID | Category | Title | Preconditions | Steps | Expected Result | Status |
|---|---|---|---|---|---|---|
| **AUTH-FN-01** | Functional | Login form structure & brand headers | Unauthenticated | 1. Navigate to `#/login` | Logo, heading, email/password inputs, remember me, forgot password, and submit button visible | Automated ✅ |
| **AUTH-NEG-01** | Negative | Submitting empty login form | Unauthenticated | 1. Navigate to `#/login`<br>2. Click Sign In empty | Displays "Enter a valid email address" and "Password is required". No network request sent. | Automated ✅ |
| **AUTH-NEG-02** | Negative | Malformed email formatting | Unauthenticated | 1. Enter `plainaddress`, `missingatsign.com`, `@nodomain.com`<br>2. Submit | Format alert displayed; form submission blocked client-side | Automated ✅ |
| **AUTH-FN-02** | Functional | Forgot password navigation & validation | Unauthenticated | 1. Click Forgot Password link<br>2. Submit empty email<br>3. Click Back to Sign In | Navigates to `#/forgot-password`, displays email validation alert on empty submit, returns to `#/login` | Automated ✅ |
| **AUTH-SEC-01** | Security | Protected route unauthorized access | Unauthenticated | 1. Directly open `#/dashboard`, `#/businesses`, `#/kyc`, `#/users`, `#/platform-fees` | URL immediately redirects to `#/login`; no protected data flashed or leaked | Automated ✅ |
| **AUTH-SEC-02** | Security | Session sign out & back-button security | Authenticated | 1. Click Sign Out<br>2. Press browser back button | Storage tokens scrubbed; redirects to `#/login`; back button cannot restore authenticated session | Automated ✅ |
| **AUTH-SEC-03** | Security | Token format and storage safety | Authenticated | 1. Read `gize.admin.access_token` and `refresh_token` in localStorage | Valid JWT structure (3 base64 segments); not exposed in URL parameters | Automated ✅ |

---

### 2.1 Overview: Dashboard (`#/dashboard`)

| Test ID | Category | Title | Preconditions | Steps | Expected Result | Status |
|---|---|---|---|---|---|---|
| **DASH-FN-01** | Functional | Dashboard shell & admin identity | Authenticated | 1. Navigate to `#/dashboard` | Brand logo, top header, collapse button, sidebar, and logged in user `admin@gize.com` visible | Automated ✅ |
| **DASH-FN-02** | Functional | Core metric cards structure | Authenticated | 1. Inspect metric cards | CUSTOMERS, BUSINESSES, BOOKINGS, and REVENUE cards render with non-empty numerical values | Automated ✅ |
| **DASH-FN-03** | Functional | Requires attention queue & Needs Action popover | Authenticated | 1. Check Requires Attention card<br>2. Click Needs Action header button | Displays KYC pending count, Suspended count; popover opens with sub-item breakdown; dismissible with Escape | Automated ✅ |
| **DASH-FN-04** | Functional | Time filter switching | Authenticated | 1. Switch between Today, This week, This month, This year | Active filter button highlights; charts and statistics re-aggregate without crash | Automated ✅ |
| **DASH-FN-05** | Functional | Revenue trend and booking outcome charts | Authenticated | 1. Inspect chart components | SVG revenue trend graph renders; booking outcome donut chart displays completed/upcoming/cancelled breakdown | Automated ✅ |

---

### 2.2 Operations: Businesses (`#/businesses`)

| Test ID | Category | Title | Preconditions | Steps | Expected Result | Status |
|---|---|---|---|---|---|---|
| **BIZ-FN-01** | Functional | Businesses data grid headers & records | Authenticated | 1. Open `#/businesses` | Columns BUSINESS, OWNER, VERIFICATION, STATUS, CONTACT, ACTION render with live rows | Automated ✅ |
| **BIZ-FN-02** | Functional | Status tabs filtering | Authenticated | 1. Click Pending verification<br>2. Click Verified<br>3. Click Active<br>4. Click All | Filtered views update table records dynamically; All restores full list | Automated ✅ |
| **BIZ-FN-03** | Functional | Search filtering & clear restoration | Authenticated | 1. Search existing term `a`<br>2. Clear search input | Table filters dynamically; clearing restores original row count | Automated ✅ |
| **BIZ-EDG-01** | Edge Case | Non-existent search query handling | Authenticated | 1. Search `__NON_EXISTENT_BUSINESS_99999__` | 0 rows rendered; clean empty state message "No businesses in this filter" displayed | Automated ✅ |
| **BIZ-EDG-02** | Edge Case | Special character search stability | Authenticated | 1. Search `'`, `"`, `%`, `--`, `\` | Application remains stable; renders either matches or empty state without crash | Automated ✅ |
| **BIZ-NEG-01** | Negative | Script injection in search input | Authenticated | 1. Search `<script>` in searchbox | Server rejects or frontend handles error; documented as BUG-GZ-001 | Automated ✅ |
| **BIZ-SEC-01** | Security | Suspend business action modal | Authenticated | 1. Click Suspend button on active business | Modal opens requesting confirmation and suspension reason; cancel dismisses without modification | Automated (Safe read-only check) ✅ |

---

### 2.3 Operations: Suspension Appeals (`#/suspension-appeals`)

| Test ID | Category | Title | Preconditions | Steps | Expected Result | Status |
|---|---|---|---|---|---|---|
| **APP-FN-01** | Functional | Suspension appeals queue state | Authenticated | 1. Open `#/suspension-appeals` | Refresh button visible; empty state card "No appeals waiting" renders when queue is empty | Automated ✅ |
| **APP-WF-01** | Workflow | Reinstatement decision approval/rejection | Authenticated | 1. Select pending appeal<br>2. Approve/reject reinstatement | **Blocked:** Requires active suspended business with submitted appeal | Blocked (Requires Staging) ⚠️ |

---

### 2.4 Operations: KYC Verification (`#/kyc`)

| Test ID | Category | Title | Preconditions | Steps | Expected Result | Status |
|---|---|---|---|---|---|---|
| **KYC-FN-01** | Functional | KYC verification queue columns & documents | Authenticated | 1. Open `#/kyc` | Columns BUSINESS, DOCUMENTS, SUBMITTED, STATUS, ACTION visible with document badges | Automated ✅ |
| **KYC-FN-02** | Functional | KYC status tabs filtering | Authenticated | 1. Switch Pending, Approved, Rejected, All | Queue filters accurately by verification state | Automated ✅ |
| **KYC-FN-03** | Functional | Search businesses in KYC queue | Authenticated | 1. Search non-existent business<br>2. Clear search | 0 results displayed on non-match; restored on clear | Automated ✅ |
| **KYC-WF-01** | Workflow | Document approval/rejection decision | Authenticated | 1. Open document review<br>2. Approve/reject document | **Blocked:** Modifying live KYC documents prohibited in production | Blocked (Requires Staging) ⚠️ |

---

### 2.5 Operations: Branch KYC (`#/branch-kyc`)

| Test ID | Category | Title | Preconditions | Steps | Expected Result | Status |
|---|---|---|---|---|---|---|
| **BKYC-FN-01** | Functional | Branch KYC queue data grid & locations | Authenticated | 1. Open `#/branch-kyc` | Columns BRANCH, LOCATION, DOCUMENTS, VERIFICATION, STATUS, ACTION visible | Automated ✅ |
| **BKYC-FN-02** | Functional | Status tabs filtering | Authenticated | 1. Click Pending, Approved, All | Filters branch records accurately | Automated ✅ |
| **BKYC-FN-03** | Functional | Bulk selection checkbox | Authenticated | 1. Click "Select all branches" checkbox | Checkbox toggles selection state across all branch records | Automated ✅ |

---

### 2.6 Operations: Bookings (`#/bookings`)

| Test ID | Category | Title | Preconditions | Steps | Expected Result | Status |
|---|---|---|---|---|---|---|
| **BKG-FN-01** | Functional | Bookings grid data display & pricing | Authenticated | 1. Open `#/bookings` | Columns BOOKING, BUSINESS, STAFF, WHEN, AMOUNT, PAYMENT, STATUS render with currency `ETB` | Automated ✅ |
| **BKG-FN-02** | Functional | Lifecycle tabs switching | Authenticated | 1. Click Upcoming, Cancelled, All | Filters bookings by appointment status | Automated ✅ |
| **BKG-FN-03** | Functional | Search by booking code prefix | Authenticated | 1. Search `LYU`<br>2. Search non-existent code | Positive match returns matching bookings; non-existent returns 0 rows | Automated ✅ |
| **BKG-FN-04** | Functional | Pagination controls & record counts | Authenticated | 1. Verify pagination text | Displays format `Page X of Y · Z total` with functional Next/Previous controls | Automated ✅ |

---

### 2.7 Operations: Withdrawals (`#/withdrawals`)

| Test ID | Category | Title | Preconditions | Steps | Expected Result | Status |
|---|---|---|---|---|---|---|
| **WTH-FN-01** | Functional | Withdrawals queue & financial amounts | Authenticated | 1. Open `#/withdrawals` | Columns REQUEST, BUSINESS, AMOUNT, PAY TO, STATUS, ACTIONS render | Automated ✅ |
| **WTH-FN-02** | Functional | Status tabs switching | Authenticated | 1. Click Pending, Paid, Failed, Cancelled, All | Filters payout requests by status | Automated ✅ |
| **WTH-WF-01** | Workflow | Payout processing execution | Authenticated | 1. Click Process on pending payout | **Blocked:** Executing actual financial payout transfer blocked in live environment | Blocked (Requires Staging) ⚠️ |

---

### 2.8 Operations: Clients (`#/clients`)

| Test ID | Category | Title | Preconditions | Steps | Expected Result | Status |
|---|---|---|---|---|---|---|
| **CLI-FN-01** | Functional | Clients table & sign-in provider info | Authenticated | 1. Open `#/clients` | Columns ACCOUNT, SIGNS IN WITH, PHONE, VERIFIED, LAST SEEN, STATUS visible | Automated ✅ |
| **CLI-FN-02** | Functional | Client search and restoration | Authenticated | 1. Search non-existent client<br>2. Clear search | 0 results on non-match; restored on clear | Automated ✅ |

---

### 2.9 Operations: Review Moderation (`#/review-reports`)

| Test ID | Category | Title | Preconditions | Steps | Expected Result | Status |
|---|---|---|---|---|---|---|
| **REV-FN-01** | Functional | Review reports queue & tabs | Authenticated | 1. Open `#/review-reports` | Tabs Pending, Hidden, Dismissed visible; displays "No reports waiting" when 0 reports exist | Automated ✅ |

---

### 2.10 Operations: Account Deletions (`#/account-deletions`)

| Test ID | Category | Title | Preconditions | Steps | Expected Result | Status |
|---|---|---|---|---|---|---|
| **DEL-FN-01** | Functional | Deletions queue tabs & searchbox | Authenticated | 1. Open `#/account-deletions` | Tabs Pending, Approved, Rejected, Withdrawn, All and searchbox visible; empty state card displayed | Automated ✅ |
| **DEL-WF-01** | Workflow | Deletion approval/rejection | Authenticated | 1. Select pending account deletion<br>2. Approve deletion | **Blocked:** Account hard deletion blocked on live production system | Blocked (Requires Staging) ⚠️ |

---

### 2.11 Risk: Fraud Alerts (`#/fraud`)

| Test ID | Category | Title | Preconditions | Steps | Expected Result | Status |
|---|---|---|---|---|---|---|
| **FRD-FN-01** | Functional | Fraud alerts table & rule indicators | Authenticated | 1. Open `#/fraud` | Columns ALERT, RULE, SEVERITY, SUBJECT, DETECTED, STATUS, ACTION visible | Automated ✅ |
| **FRD-FN-02** | Functional | Alert resolution tabs | Authenticated | 1. Click Open, Reviewed, Dismissed, All | Filters alerts by status | Automated ✅ |
| **FRD-FN-03** | Functional | Severity dropdown filter | Authenticated | 1. Filter by severity level | Updates table by selected severity | Automated ✅ |

---

### 2.12 System: Users & Roles (`#/users`)

| Test ID | Category | Title | Preconditions | Steps | Expected Result | Status |
|---|---|---|---|---|---|---|
| **USR-FN-01** | Functional | Console accounts & verification badges | Authenticated | 1. Open `#/users` | Columns ACCOUNT, ROLE, PHONE, VERIFIED, LAST SEEN, STATUS visible with `✓ Email`, `✗ Phone` badges | Automated ✅ |
| **USR-FN-02** | Functional | Search admin accounts | Authenticated | 1. Search `admin`<br>2. Search non-existent | Positive match returns accounts; non-match returns 0 rows | Automated ✅ |
| **USR-SEC-01** | Security | Admin account protection policy | Authenticated | 1. Check UI policy text & row actions | Confirms admin accounts cannot be suspended, banned, or deleted; no destructive buttons rendered | Automated ✅ |

---

### 2.13 System: Notifications (`#/notifications`)

| Test ID | Category | Title | Preconditions | Steps | Expected Result | Status |
|---|---|---|---|---|---|---|
| **NOTIF-FN-01** | Functional | Inbox & Send tabs navigation | Authenticated | 1. Open `#/notifications` | Inbox list, type filters, and Send announcement buttons visible | Automated ✅ |
| **NOTIF-FN-02** | Functional | Broadcast announcement form fields | Authenticated | 1. Click Send | Form renders Title, Message, Category, Type, Audience fields and Review & Send button | Automated ✅ |
| **NOTIF-BND-01** | Boundary | Character length boundary validation | Authenticated | 1. Inspect input attributes | Title maxlength enforced at 120 chars; Message textarea maxlength enforced at 500 chars | Automated ✅ |
| **NOTIF-WF-01** | Workflow | Actual push notification broadcast | Authenticated | 1. Fill broadcast form<br>2. Click Review & Send | **Blocked:** Sending live broadcast notifications to real marketplace users prohibited | Blocked (Requires Staging) ⚠️ |

---

### 2.14 System: Platform Fees (`#/platform-fees`)

| Test ID | Category | Title | Preconditions | Steps | Expected Result | Status |
|---|---|---|---|---|---|---|
| **FEE-FN-01** | Functional | Fee rate cards and 1,000 ETB model | Authenticated | 1. Open `#/platform-fees` | Customer fee (5%) and Provider fee (10%) cards visible; mock 1,000 ETB booking breakdown displayed | Automated ✅ |
| **FEE-INT-01** | Integration | Mathematical precision calculation | Authenticated | 1. Verify breakdown formula | Customer pays 1,050 ETB, Provider receives 900 ETB, Gizie keeps 150 ETB accurately verified | Automated ✅ |
| **FEE-WF-01** | Workflow | Update fee rates | Authenticated | 1. Click Edit rates<br>2. Save new rates | **Blocked:** Modifying production financial commission rates prohibited | Blocked (Requires Staging) ⚠️ |

---

### 2.15 System: Booking Rules (`#/booking-rules`)

| Test ID | Category | Title | Preconditions | Steps | Expected Result | Status |
|---|---|---|---|---|---|---|
| **RULE-FN-01** | Functional | Cutoff window & active cancellation policy | Authenticated | 1. Open `#/booking-rules` | Days before (0d), Hours before (0h), and active cancellation policy statement rendered | Automated ✅ |
| **RULE-WF-01** | Workflow | Edit cutoff values | Authenticated | 1. Click Edit cutoff<br>2. Save changes | **Blocked:** Altering platform-wide booking cancellation windows prohibited | Blocked (Requires Staging) ⚠️ |

---

### 2.16 System: Payout Banks (`#/payout-banks`)

| Test ID | Category | Title | Preconditions | Steps | Expected Result | Status |
|---|---|---|---|---|---|---|
| **BNK-FN-01** | Functional | Configured payout banks list | Authenticated | 1. Open `#/payout-banks` | CBE, Awash, Dashen, Abyssinia, Wegagen, Telebirr, and Other listed in defined order | Automated ✅ |

---

### 2.17 System: Catalog (`#/catalog`)

| Test ID | Category | Title | Preconditions | Steps | Expected Result | Status |
|---|---|---|---|---|---|---|
| **CAT-FN-01** | Functional | Business types & Categories sub-tabs | Authenticated | 1. Open `#/catalog`<br>2. Switch to Categories | Sub-tabs toggle properly; URL routes to `#/catalog/categories`; known categories (Hair, Nails, etc.) visible | Automated ✅ |
| **CAT-WF-01** | Workflow | Create new category / edit type | Authenticated | 1. Click New category<br>2. Save category | **Blocked:** Mutating live marketplace catalog taxonomy prohibited | Blocked (Requires Staging) ⚠️ |

---

### 2.18 System: Terms & Conditions (`#/terms`)

| Test ID | Category | Title | Preconditions | Steps | Expected Result | Status |
|---|---|---|---|---|---|---|
| **TRM-FN-01** | Functional | Published policy version & rules | Authenticated | 1. Open `#/terms` | Displays Published badge, Platform Terms & Conditions v1.0, and 4 cancellation policy rules | Automated ✅ |

---

### 2.19 System: Audit Log (`#/audit`)

| Test ID | Category | Title | Preconditions | Steps | Expected Result | Status |
|---|---|---|---|---|---|---|
| **AUD-FN-01** | Functional | Immutable audit records data grid | Authenticated | 1. Open `#/audit` | Columns TIME, ACTOR, ACTION, TARGET, STATUS render with populated entries | Automated ✅ |
| **AUD-FN-02** | Functional | Category select filter | Authenticated | 1. Select Auth<br>2. Select All categories | Filters records by selected category; restores on All | Automated ✅ |
| **AUD-FN-03** | Functional | Action search input | Authenticated | 1. Search action name | Filters audit table dynamically | Automated ✅ |
| **AUD-FN-04** | Functional | Multi-page pagination navigation | Authenticated | 1. Click Next<br>2. Click Previous | Page indicator transitions from Page 1 to Page 2 and back cleanly | Automated ✅ |

---

### 2.20 Cross-Cutting: Accessibility, Performance & UI/UX

| Test ID | Category | Title | Preconditions | Steps | Expected Result | Status |
|---|---|---|---|---|---|---|
| **A11Y-01** | Accessibility | Dashboard WCAG 2.2 AA scan | Authenticated | 1. Scan `#/dashboard` with AxeBuilder | Zero critical WCAG violations | Automated ✅ |
| **A11Y-02** | Accessibility | Accessible names on form controls | Authenticated | 1. Inspect broadcast form controls | All inputs, selects, and textareas have accessible names/labels | Automated ✅ |
| **A11Y-03** | Accessibility | Keyboard focus sequence | Authenticated | 1. Tab through header controls | Focus order moves through interactive elements without keyboard traps | Automated ✅ |
| **UI-01** | UI/UX | Responsive viewports adaptivity | Authenticated | 1. Test 1440x900, 768x1024, 375x667 | Layout adapts gracefully without horizontal scroll or broken headers | Automated ✅ |
| **UI-02** | UI/UX | Sidebar collapse toggle | Authenticated | 1. Click Collapse sidebar button | Sidebar collapses to icon mode; main workspace expands | Automated ✅ |
| **UI-03** | UI/UX | Empty state UI consistency | Authenticated | 1. Visit appeals, moderation, deletions | Consistent empty queue iconography and descriptive guidance rendered | Automated ✅ |
| **PRF-01** | Performance | Module navigation benchmark (<3500ms) | Authenticated | 1. Measure load time across 5 core routes | All 5 routes complete navigation and rendering within 3500ms | Automated ✅ |
| **PRF-02** | Performance | Zero client-side JavaScript runtime exceptions | Authenticated | 1. Monitor console during traversal | 0 unhandled application errors detected | Automated ✅ |
| **SEC-04** | Security | XSS injection sanitization in search | Authenticated | 1. Search `<img src=x onerror=alert('XSS')>` | No script execution; no unescaped tags inserted in DOM | Automated ✅ |
