# Gizie Admin — Comprehensive Defect & Quality Investigation Report

**Target Application:** Gizie Admin Console (`https://admin.gizie.et/`)  
**Reporting Period:** 2026-10-16  
**Document Version:** 2.1 (Audited & Evidence-Verified)  
**QA Assessment:** Rigorous Separation of Verified Machine Telemetry vs. Suspected Technical Hypotheses  

---

## 1. Defect Summary Dashboard

| Bug ID | Title | Module | Severity | Priority | Verification Status | Automation Test Mapping |
|---|---|---|---|---|---|---|
| **BUG-GZ-001** | Unhandled Connection Error on `<script>` Search Query | Businesses (`#/businesses`) | **Medium** | High | Confirmed via Automated Spec | `ADM-BIZ-06` (XFAIL) |
| **BUG-GZ-002** | Google Identity Services (GSI) OAuth 403 Forbidden Origin Mismatch | Public Authentication (`#/login`) | **High** | Critical | Confirmed via Network Telemetry | Console & Network Logs |
| **BUG-GZ-003** | Brand Name and Domain Inconsistency Across Admin Console | Global Layout & Login | **Low** | Medium | Confirmed via DOM Inspection | `ADM-AUTH-01` |
| **BUG-GZ-004** | Empty Queue Layout Shift & Missing Skeleton Loading Indicator | Review Moderation & Appeals | **Low** | Low | Confirmed via UI Observation | `ADM-APP-01`, `ADM-REV-01` |

---

## 2. Detailed Bug Reports

### BUG-GZ-001: Unhandled Connection Error on `<script>` Search Query

- **Bug ID:** `BUG-GZ-001`
- **Application Module:** Operations — Businesses (`#/businesses`)
- **Severity:** Medium (Input Handling / Server Error Resilience)
- **Priority:** High
- **Reproducibility:** 100% (Verified across all 3 automated test executions)
- **Test Automation Status:** **Expected Failure (XFAIL)** in `ADM-BIZ-06` (`tests/03-operations/businesses.spec.ts`).  
  *(Note: The test suite explicitly fails the test when the connection error appears to avoid false-positive passes)*

#### Steps to Reproduce:
1. Open the Gizie Admin portal and authenticate with active session.
2. Navigate to the **Businesses** directory (`#/businesses`).
3. Click inside the search input: `Search name, city, owner, phone…`.
4. Enter the string: `<script>`.
5. Observe the table container.

#### Expected Functional Behavior:
The application should sanitize or escape HTML/script tags, query the catalog safely, and display the standard empty-filter message:  
> *"No businesses in this filter. Nothing to action here. Switch filters or clear the search to see the rest of the marketplace."*

#### Actual Observed Behavior:
The request fails to complete normally. The business table disappears and is replaced by an alert banner:  
> *"Cannot reach the server. Check your connection and try again."* with a **Retry** button.

#### Verified Empirical Evidence:
- **DOM Snapshot:**
  ```yaml
  - searchbox "Search name, city, owner, phone…": "<script>"
  - alert:
    - text: "Cannot reach the server. Check your connection and try again."
    - button "Retry"
  ```
- **Execution Telemetry:** Verified in Playwright test `ADM-BIZ-06`. When `<script>` is submitted, `page.getByRole('alert')` becomes visible within 350ms, while benign strings (e.g. ` Addis ` or `NonExistentBusiness123XYZ`) return valid table rows or clean empty-filter states without server connection alerts.

#### Technical Analysis & Hypotheses:
- **Verified Facts:** The client network layer encounters a communication failure when sending raw `<script>` in the search parameter; the UI renders its generic connection error alert.
- **Suspected Root Causes (Unverified Hypotheses requiring backend log inspection):**
  1. *WAF / Reverse Proxy Rule:* Cloudflare, AWS WAF, or an Nginx rule may be actively dropping or resetting TCP connections upon detecting what it classifies as a Cross-Site Scripting (XSS) payload.
  2. *API Gateway / Controller Crash:* The backend search query parser may throw an unhandled exception or unescaped string syntax error when constructing an SQL/NoSQL query with unescaped angle brackets, resulting in an HTTP 500 error or closed socket.

---

### BUG-GZ-002: Google Identity Services (GSI) OAuth 403 Forbidden Origin Mismatch

- **Bug ID:** `BUG-GZ-002`
- **Application Module:** Public Authentication (`#/login`)
- **Severity:** High (Single Sign-On Authentication Blocked)
- **Priority:** Critical
- **Reproducibility:** 100% (Deterministic)

#### Steps to Reproduce:
1. Navigate to `https://admin.gizie.et/#/login` or `https://business.gizie.et/`.
2. Inspect the browser Network and Console tabs during page initialization.
3. Observe the Google Identity Services request to `accounts.google.com`.

#### Expected Functional Behavior:
The Google Identity Services SDK initializes cleanly and renders an operational "Sign in with Google" button.

#### Actual Observed Behavior:
The Google OAuth iframe fails to initialize. The network request fails with HTTP 403 Forbidden, and the browser console logs an origin security error.

#### Verified Empirical Evidence:
- **Network Response:**
  - Request URL: `https://accounts.google.com/gsi/button?client_id=709930606912-o0ue582cn56lu3clmq1na48p2dk43rgd.apps.googleusercontent.com`
  - HTTP Status: `403 Forbidden`
- **Browser Console Log:**
  ```
  [ERROR] Failed to load resource: the server responded with a status of 403 () @ accounts.google.com/gsi/button
  [ERROR] [GSI_LOGGER]: The given origin is not allowed for the given client ID.
  ```

#### Technical Analysis & Hypotheses:
- **Verified Facts:** Google Identity Services rejects origin `https://admin.gizie.et` and `https://business.gizie.et` for Google OAuth Client ID `709930606912-o0ue582cn56lu3clmq1na48p2dk43rgd.apps.googleusercontent.com` with HTTP 403.
- **Suspected Root Cause (Hypothesis):** The Google Cloud Console configuration for this OAuth Client ID lacks `https://admin.gizie.et` and `https://business.gizie.et` in its **Authorized JavaScript Origins** list. (Likely configured originally for `localhost` or an earlier staging domain).

---

### BUG-GZ-003: Brand Name and Domain Inconsistency Across Admin Console

- **Bug ID:** `BUG-GZ-003`
- **Application Module:** Global Layout & Sign-In (`#/login`)
- **Severity:** Low (Brand Identity & Polish)
- **Priority:** Medium
- **Reproducibility:** 100%

#### Observed Empirical Inconsistencies:
1. **Document Title Tag:**
   - *Actual DOM:* `<title>Gize Admin</title>` (Missing the letter "i").
   - *Expected:* `<title>Gizie Admin</title>` to match the official corporate identity **Gizie**.
2. **Login Input Placeholder:**
   - *Actual DOM:* `<input placeholder="you@gize.et" />`
   - *Expected:* `<input placeholder="you@gizie.et" />` matching the official application domain `gizie.et`.

#### Technical Analysis & Hypotheses:
- **Verified Facts:** The static strings in `index.html` and the login view template contain `Gize` and `gize.et`.
- **Suspected Root Cause (Hypothesis):** Legacy branding strings preserved from an earlier iteration of the project prior to securing the `gizie.et` domain.

---

### BUG-GZ-004: Empty Queue Layout Shift & Missing Skeleton Loading Indicator

- **Bug ID:** `BUG-GZ-004`
- **Application Module:** Operations — Review Moderation (`#/review-reports`) & Suspension Appeals (`#/suspension-appeals`)
- **Severity:** Low (UX Polish & Layout Stability)
- **Priority:** Low
- **Reproducibility:** 100%

#### Observed Empirical Behavior:
When navigating to Review Moderation or Suspension Appeals, the `Refresh` button immediately enters a disabled state (`disabled=""`) while API requests are pending. However, no skeleton loader or spinner placeholder is rendered in the table container. The view area remains blank for 400–1100ms before suddenly rendering the empty state card, creating Cumulative Layout Shift (CLS).

#### Technical Analysis & Hypotheses:
- **Verified Facts:** The DOM contains no loading spinner or skeleton elements during the disabled refresh interval.
- **Suspected Root Cause (Hypothesis):** The component conditionally renders the empty card only when `items.length === 0 && !loading`, but lacks a fallback placeholder component for the `loading === true` state.
