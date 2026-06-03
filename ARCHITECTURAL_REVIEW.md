# Architectural Review & Refactoring Report

This document outlines the architectural improvements made to the CRM application to ensure scalability, maintainability, and adherence to SOLID principles without introducing unnecessary complexity.

---

### 1. Issue: Duplicated Lookup Logic (Shared Data Sources)
**Issue:** Multiple controllers and repositories were implementing identical methods like `customersForForm()`, `usersForSelect()`, and `requirementsForSelect()`.
**Why It Matters:** Any change to how these lists are fetched (e.g., adding a status filter) required updates in multiple files, leading to bugs and inconsistency.
**Recommended Refactor:** Implement a centralized `LookupService` to handle all data retrieval for dropdowns and forms.
**Priority:** High
**Status:** Resolved (See `app/Services/LookupService.php`)

---

### 2. Issue: Business Logic in Repositories
**Issue:** `UserRepository` was handling file system operations (saving/deleting signature images), and `SaleRepository` was handling complex filtering that belonged in a service or scope.
**Why It Matters:** Repositories should strictly handle database I/O. Mixing file logic makes them harder to test and violates SRP.
**Recommended Refactor:** Move file handling to `UserService`. Ensure repositories only return Query Builders or Collections.
**Priority:** Medium
**Status:** Resolved (Moved signature logic to `UserService`)

---

### 3. Issue: Export and Print Logic in Controllers
**Issue:** `CustomerController` and `RequirementController` contained logic for formatting Excel exports and HTML print views.
**Why It Matters:** This bloated controllers and made the export logic non-reusable.
**Recommended Refactor:** Extract export logic into a dedicated `ExportService`.
**Priority:** Medium
**Status:** Resolved (See `app/Services/ExportService.php`)

---

### 4. Issue: PDF Generation in Controllers
**Issue:** `RequirementController` was directly handling DOMPDF initialization and stream generation.
**Why It Matters:** PDF generation is a secondary concern. Controllers should only trigger the action and return the response.
**Recommended Refactor:** Move PDF generation logic to `RequirementService`.
**Priority:** Medium
**Status:** Resolved (Moved `downloadQuotation` logic to `RequirementService`)

---

### 5. Issue: Duplicate Activity Filtering Logic
**Issue:** `MeetingRepository` and `FollowUpRepository` had separate but similar logic for filtering by "today", "upcoming", and "overdue".
**Why It Matters:** Redundant code in the repository layer.
**Recommended Refactor:** Standardize filtering parameters and use unified scopes.
**Priority:** Low
**Status:** Resolved (Unified `period` parameter handling)

---

### 6. Issue: Case Sensitivity in Inertia Renders
**Issue:** Component paths in `Inertia::render` were inconsistently cased (e.g., `customers/index` vs `Customers/Index`), causing issues on case-sensitive filesystems (Linux/Vite).
**Why It Matters:** Prevents successful production builds and causes intermittent runtime errors.
**Recommended Refactor:** Enforce PascalCase for all directory and file names in `resources/js/Pages` and update all controller references.
**Priority:** High
**Status:** Resolved (Standardized to PascalCase project-wide)

---

### 7. Performance: N+1 Queries
**Issue:** List views for Requirements and Sales were missing eager loading for relationships like `customer`, `assignedRepresentative`, and `products`.
**Why It Matters:** Increases database load significantly as the record count grows.
**Recommended Refactor:** Add explicit `with()` calls in Repository index methods.
**Priority:** Medium
**Status:** Verified and updated across all primary repositories.

---

### 8. Over-Engineering Check
**Note:** We avoided introducing DTOs, CQRS, or complex DDD patterns. The current Service-Repository pattern is sufficient for this CRM's scale. The introduction of `LookupService` and `ExportService` provides the most "bang for buck" in terms of maintenance without adding architectural overhead.
