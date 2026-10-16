# Gizie Admin — Test Coverage & Traceability Matrix

**Target Application:** Gizie Admin Console (`https://admin.gizie.et/`)  
**Version:** 2.0  
**Testing Framework:** Playwright Test (TypeScript)  
**Execution Environment:** Production / Live Read-Only  

---

## 1. Feature Coverage & Traceability

| Module | Identified Feature / Requirement | Mapped Test Case(s) | Testing Categories Covered | Automation Status | Execution Status | Remaining Gaps / Blockers |
|---|---|---|---|---|---|---|
| **0. Auth & Session** | Login page structure & branding | `AUTH-FN-01` | Functional, UI | Automated | ✅ Passed | None |
| | Empty form submission client validation | `AUTH-NEG-01` | Negative | Automated | ✅ Passed | None |
| | Malformed email formatting rejection | `AUTH-NEG-02` | Negative, Boundary | Automated | ✅ Passed | None |
| | Forgot password navigation & validation | `AUTH-FN-02` | Functional, Negative | Automated | ✅ Passed | Password reset email receipt requires disposable inbox |
| | Deep-link route security & redirect guards | `AUTH-SEC-01` | Security | Automated | ✅ Passed | None |
| | Session termination & back-button security | `AUTH-SEC-02` | Security, Session | Automated | ✅ Passed | None |
| | Token storage format & safety | `AUTH-SEC-03` | Security | Automated | ✅ Passed | None |
| **1. Dashboard** | Executive metrics display (4 cards) | `DASH-FN-01`, `DASH-FN-02` | Functional, POS | Automated | ✅ Passed | None |
| | Requires attention queue & popover | `DASH-FN-03` | Functional, UI | Automated | ✅ Passed | None |
| | Dynamic time period switching | `DASH-FN-04` | Functional, Integration | Automated | ✅ Passed | None |
| | Revenue trend & booking outcomes charts | `DASH-FN-05` | Functional, Data-Display | Automated | ✅ Passed | Historical data seeding in staging |
| **2. Businesses** | Business directory table & column structure | `BIZ-FN-01` | Functional | Automated | ✅ Passed | None |
| | Status tabs filtering | `BIZ-FN-02` | Functional | Automated | ✅ Passed | None |
| | Dynamic search & clear restoration | `BIZ-FN-03` | Functional, POS | Automated | ✅ Passed | None |
| | Non-existent search query empty state | `BIZ-EDG-01` | Edge Case | Automated | ✅ Passed | None |
| | Special characters input resilience | `BIZ-EDG-02` | Edge Case | Automated | ✅ Passed | None |
| | Script injection handling & backend response | `BIZ-NEG-01` | Negative, Security | Automated | ✅ Passed (Bug Confirmed) | Defect BUG-GZ-001 documented |
| | Business profile review & suspension modal | `BIZ-SEC-01` | Security, UI | Automated | ✅ Passed | Mutating live business status blocked |
| **3. Suspension Appeals** | Appeals queue empty state & data grid | `APP-FN-01` | Functional, UI | Automated | ✅ Passed | None |
| | Reinstatement approval/rejection decision | `APP-WF-01` | Workflow, Mutation | Documented | ⚠️ Blocked | Requires disposable suspended test business |
| **4. KYC Verification** | Document queue and document type badges | `KYC-FN-01` | Functional | Automated | ✅ Passed | None |
| | Verification status tabs filtering | `KYC-FN-02` | Functional | Automated | ✅ Passed | None |
| | KYC business search | `KYC-FN-03` | Functional | Automated | ✅ Passed | None |
| | Document approval/rejection decision | `KYC-WF-01` | Workflow, Mutation | Documented | ⚠️ Blocked | Approving live business docs blocked in prod |
| **5. Branch KYC** | Branch verification queue & locations | `BKYC-FN-01` | Functional | Automated | ✅ Passed | None |
| | Branch status tabs filtering | `BKYC-FN-02` | Functional | Automated | ✅ Passed | None |
| | Bulk selection of branch records | `BKYC-FN-03` | Functional, UI | Automated | ✅ Passed | None |
| **6. Bookings** | Bookings table & pricing display (ETB) | `BKG-FN-01` | Functional | Automated | ✅ Passed | None |
| | Lifecycle state filtering | `BKG-FN-02` | Functional | Automated | ✅ Passed | None |
| | Search by booking code prefix & non-existent | `BKG-FN-03` | Functional, POS, NEG | Automated | ✅ Passed | None |
| | Multi-page pagination navigation | `BKG-FN-04` | Functional, Boundary | Automated | ✅ Passed | None |
| | Booking cancellation & fee deduction | `BKG-WF-01` | Workflow, Integration | Documented | ⚠️ Blocked | Cancelling live bookings blocked in prod |
| **7. Withdrawals** | Payout request table & beneficiary details | `WTH-FN-01` | Functional | Automated | ✅ Passed | None |
| | Withdrawal status filtering | `WTH-FN-02` | Functional | Automated | ✅ Passed | None |
| | Payout execution & transfer processing | `WTH-WF-01` | Workflow, Financial | Documented | ⚠️ Blocked | Triggering live bank transfers blocked |
| **8. Clients** | Registered customer table & auth provider | `CLI-FN-01` | Functional | Automated | ✅ Passed | None |
| | Client search and restoration | `CLI-FN-02` | Functional | Automated | ✅ Passed | None |
| **9. Review Moderation** | Abuse reports queue and status tabs | `REV-FN-01` | Functional, UI | Automated | ✅ Passed | None |
| | Review hide / dismiss action | `REV-WF-01` | Workflow, Moderation | Documented | ⚠️ Blocked | Moderating real reviews requires test data |
| **10. Account Deletions** | Deletion compliance queue & tabs | `DEL-FN-01` | Functional | Automated | ✅ Passed | None |
| | Account deletion decision execution | `DEL-WF-01` | Compliance, Mutation | Documented | ⚠️ Blocked | Hard deletion of live accounts blocked |
| **11. Fraud Alerts** | Velocity rule alerts & severity badges | `FRD-FN-01` | Functional | Automated | ✅ Passed | None |
| | Alert status resolution tabs | `FRD-FN-02` | Functional | Automated | ✅ Passed | None |
| | Severity dropdown filter | `FRD-FN-03` | Functional | Automated | ✅ Passed | None |
| | Alert review & dismissal action | `FRD-WF-01` | Workflow, Risk | Documented | ⚠️ Blocked | Dismissing live fraud alerts blocked |
| **12. Users & Roles** | Console accounts & verification badges | `USR-FN-01` | Functional | Automated | ✅ Passed | None |
| | Search console user accounts | `USR-FN-02` | Functional | Automated | ✅ Passed | None |
| | Admin role account immutability protection | `USR-SEC-01` | Security | Automated | ✅ Passed | None |
| **13. Notifications** | Inbox & Send announcement navigation | `NOTIF-FN-01` | Functional | Automated | ✅ Passed | None |
| | Broadcast announcement form fields | `NOTIF-FN-02` | Functional, UI | Automated | ✅ Passed | None |
| | Character length boundaries (120/500) | `NOTIF-BND-01` | Boundary | Automated | ✅ Passed | None |
| | Real-time push notification broadcast | `NOTIF-WF-01` | Workflow, Push | Documented | ⚠️ Blocked | Broadcasting to live users blocked |
| **14. Platform Fees** | Rate cards (Customer 5%, Provider 10%) | `FEE-FN-01` | Functional | Automated | ✅ Passed | None |
| | Commission calculation formula consistency | `FEE-INT-01`, `INT-02` | Integration, Math | Automated | ✅ Passed | None |
| | Edit commission percentage rates | `FEE-WF-01` | Workflow, Financial | Documented | ⚠️ Blocked | Changing live marketplace fees blocked |
| **15. Booking Rules** | Cancellation cutoff window display (0d, 0h) | `RULE-FN-01` | Functional | Automated | ✅ Passed | None |
| | Edit cutoff parameters | `RULE-WF-01` | Workflow | Documented | ⚠️ Blocked | Changing live cancellation rules blocked |
| **16. Payout Banks** | Configured financial channels & wallets | `BNK-FN-01`, `INT-03` | Functional, Integration | Automated | ✅ Passed | None |
| **17. Catalog** | Business types & Categories sub-tabs | `CAT-FN-01`, `INT-04` | Functional, Integration | Automated | ✅ Passed | None |
| | Create new category / edit types | `CAT-WF-01` | Workflow, Catalog | Documented | ⚠️ Blocked | Altering live catalog taxonomy blocked |
| **18. Terms & Conditions**| Versioned policy card & published terms | `TRM-FN-01` | Functional | Automated | ✅ Passed | None |
| | Publish new terms version | `TRM-WF-01` | Workflow, Legal | Documented | ⚠️ Blocked | Forcing platform re-acceptance blocked |
| **19. Audit Log** | Immutable events data grid | `AUD-FN-01` | Functional | Automated | ✅ Passed | None |
| | Category dropdown filter | `AUD-FN-02` | Functional | Automated | ✅ Passed | None |
| | Action search filter | `AUD-FN-03` | Functional | Automated | ✅ Passed | None |
| | Multi-page pagination cycling | `AUD-FN-04` | Functional, Boundary | Automated | ✅ Passed | None |
| **Cross-Cutting: A11Y** | WCAG 2.2 AA core automated scan | `A11Y-01` | Accessibility | Automated | ✅ Passed | Screen-reader auditory verification |
| | Accessible names on form controls | `A11Y-02` | Accessibility | Automated | ✅ Passed | None |
| | Keyboard Tab focus order | `A11Y-03` | Accessibility | Automated | ✅ Passed | None |
| **Cross-Cutting: UI/UX** | Multi-viewport responsive adaptivity | `UI-01` | UI/UX, Responsive | Automated | ✅ Passed | Physical mobile device validation |
| | Sidebar collapse/expand toggle | `UI-02` | UI/UX | Automated | ✅ Passed | None |
| | Inactive queue empty states consistency | `UI-03` | UI/UX | Automated | ✅ Passed | None |
| **Cross-Cutting: PRF** | Navigation latency (<3500ms) | `PRF-01` | Performance | Automated | ✅ Passed | Network bandwidth throttling (3G/4G) |
| | Zero unhandled JS runtime exceptions | `PRF-02` | Performance, Stability | Automated | ✅ Passed | None |
| **Cross-Cutting: SEC** | XSS sanitization across search fields | `SEC-04` | Security | Automated | ✅ Passed | Penetration testing requires sandbox |

---

## 2. Category Breakdown & Health Summary

| Testing Category | Implemented & Executed | Blocked (Live Safety) | Coverage Health |
|---|---|---|---|
| **Functional & Positive** | 35 Scenarios | 0 | 100% of read-only functionality covered |
| **Negative & Validation** | 6 Scenarios | 0 | 100% of client-side validation rules tested |
| **Boundary Value** | 4 Scenarios | 0 | Character limits (120/500) & fee rate boundaries verified |
| **Edge Cases** | 5 Scenarios | 0 | Special characters, non-existent queries, and empty states tested |
| **Integration** | 4 Scenarios | 0 | Fee formulas, bank mapping, catalog categories, queue badge consistency verified |
| **Security** | 5 Scenarios | 0 | Unauthorized routes, session revocation, token safety, XSS sanitization verified |
| **Accessibility & A11Y** | 3 Scenarios | 0 | WCAG 2.2 AA automated scan, accessible names, focus sequence verified |
| **UI/UX & Responsive** | 3 Scenarios | 0 | Desktop (1440), Tablet (768), Mobile (375), and sidebar toggle tested |
| **Performance & Health** | 2 Scenarios | 0 | Navigation latency (<3500ms) and zero JS runtime errors verified |
| **State-Changing Workflows** | 0 Executed | 11 Documented | Safely isolated pending staging environment & disposable data |
