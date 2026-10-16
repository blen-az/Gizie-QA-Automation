# Gizie Admin — Comprehensive Defect & Quality Investigation Report

**Target Application:** Gizie Admin Console (`https://admin.gizie.et/`)  
**Reporting Period:** 2026-10-16  
**Document Version:** 2.0  
**Prepared by:** Senior QA Automation Engineer / QA Lead  

---

## 1. Defect Summary Dashboard

| Bug ID | Title | Module | Severity | Priority | Status |
|---|---|---|---|---|---|
| **BUG-GZ-001** | Unhandled Server Exception / Connection Drop on `<script>` Search Query | Businesses (`#/businesses`) | **Medium** | High | Confirmed Defect |
| **BUG-GZ-002** | Google Identity Services (GSI) OAuth 403 Forbidden Origin Mismatch | Public Authentication (`#/login`) | **High** | Critical | Confirmed Defect |
| **BUG-GZ-003** | Brand Name and Domain Inconsistency Across Admin Console | Global Layout & Login | **Low** | Medium | Confirmed Defect |
| **BUG-GZ-004** | Empty Queue Layout Shift & Missing Skeleton Loading Indicator | Review Moderation & Appeals | **Low** | Low | Confirmed UI/UX Issue |

---

## 2. Detailed Bug Reports

### BUG-GZ-001: Unhandled Server Exception / Connection Drop on `<script>` Search Query

- **Bug ID:** `BUG-GZ-001`
- **Application Module:** Operations — Businesses (`#/businesses`)
- **Severity:** Medium (Input sanitization / Unhandled error handling)
- **Priority:** High (Potential application stability / security perception)
- **Reproducibility:** 100% (Deterministic)
- **Preconditions:** Authenticated as an administrator with access to `#/businesses`.

#### Steps to Reproduce:
1. Open the Gizie Admin portal and authenticate.
2. Navigate to the **Businesses** directory (`#/businesses`).
3. Click inside the search input: `Search name, city, owner, phone…`.
4. Type `<script>`.
5. Observe the table area.

#### Expected Result:
The frontend or backend search query handler should sanitize or escape HTML tags, query the database safely, and display the standard empty-filter message:  
`"No businesses in this filter. Nothing to action here. Switch filters or clear the search to see the rest of the marketplace."`

#### Actual Result:
The backend API call fails abruptly (HTTP 500 or Web Application Firewall drop). The business table vanishes completely and is replaced by an alert banner:  
`"Cannot reach the server. Check your connection and try again."` with a `Retry` button.

#### Evidence:
- **Captured DOM Snapshot:**
  ```yaml
  - searchbox "Search name, city, owner, phone…": "<script>"
  - alert:
    - text: "Cannot reach the server. Check your connection and try again."
    - button "Retry"
  ```
- **Automated Regression Spec:** Verified in [`tests/03-operations/businesses.spec.ts`](file:///c:/Users/blen2/OneDrive/Documents/Work/Gizie%20QA%20Automation/tests/03-operations/businesses.spec.ts) under test case `ADM-BIZ-06 [DEFECT-CHECK]`.

#### Root Cause Analysis:
The backend search endpoint does not properly sanitize or parameterized-strip raw HTML/XML tags, causing the database query or API gateway WAF rule to reject the request with an unhandled exception rather than returning an empty array `[]`.

---

### BUG-GZ-002: Google Identity Services (GSI) OAuth 403 Forbidden Origin Mismatch

- **Bug ID:** `BUG-GZ-002`
- **Application Module:** Public Authentication & Single Sign-On
- **Severity:** High (SSO Feature Completely Broken)
- **Priority:** Critical
- **Reproducibility:** 100% (Deterministic)
- **Preconditions:** User visits the public sign-in page.

#### Steps to Reproduce:
1. Open Google Chrome.
2. Navigate to `https://business.gizie.et/` or `https://admin.gizie.et/#/login`.
3. Open Developer Tools (F12) -> Network & Console tabs.
4. Observe the Google Identity Services iframe and button initialization request.

#### Expected Result:
The Google Identity Services client loads cleanly and renders an active Google Single Sign-On button.

#### Actual Result:
The request to `https://accounts.google.com/gsi/button?client_id=709930606912-o0ue582cn56lu3clmq1na48p2dk43rgd.apps.googleusercontent.com` returns **HTTP 403 Forbidden**.  
Console emits:
```
[ERROR] Failed to load resource: the server responded with a status of 403 () @ accounts.google.com/gsi/button
[ERROR] [GSI_LOGGER]: The given origin is not allowed for the given client ID.
```

#### Root Cause Analysis:
In the Google Cloud Console for OAuth 2.0 Client ID `709930606912-o0ue582cn56lu3clmq1na48p2dk43rgd`, the domain `https://business.gizie.et` (and/or `https://admin.gizie.et`) is not listed under **Authorized JavaScript Origins**. Google blocks the client ID from initializing on this origin.

---

### BUG-GZ-003: Brand Name and Domain Inconsistency Across Admin Console

- **Bug ID:** `BUG-GZ-003`
- **Application Module:** Global Layout & Sign-In
- **Severity:** Low (Cosmetic & Professionalism)
- **Priority:** Medium
- **Reproducibility:** 100%

#### Observed Inconsistencies:
1. **Page Title Tag:** The HTML `<title>` tag on `#/login` and all internal admin modules is set to:
   ```html
   <title>Gize Admin</title>
   ```
   *Expected:* `<title>Gizie Admin</title>` to match the official marketplace brand **Gizie**.
2. **Email Placeholder:** On the Admin login form (`#/login`), the email field placeholder is:
   ```html
   placeholder="you@gize.et"
   ```
   *Expected:* `placeholder="you@gizie.et"` or generic `you@company.et` matching the official platform domain `gizie.et`.

---

### BUG-GZ-004: Missing Skeleton Loading Indicator on Asynchronous Empty Queues

- **Bug ID:** `BUG-GZ-004`
- **Application Module:** Operations — Review Moderation (`#/review-reports`) & Suspension Appeals (`#/suspension-appeals`)
- **Severity:** Low (UX Polish)
- **Priority:** Low
- **Reproducibility:** 100%

#### Observations:
When navigating to Review Moderation or Suspension Appeals, the `Refresh` button immediately disables while data is fetched over the network. However, no skeleton loader or spinner is displayed in the main content container. The container stays completely blank for 400–1200ms before suddenly snapping into the "No reports waiting" / "No appeals waiting" card, causing an abrupt layout shift (Cumulative Layout Shift).
