# NewComCRM — Crystal Solutions CRM

A full-stack CRM and sales-operations platform built for **Crystal Solutions**, covering the complete customer journey — from lead intake and requirement gathering, through meetings and follow-ups, to sales, quotations, and post-sale installation tracking.

![Laravel](https://img.shields.io/badge/Laravel-12-FF2D20?logo=laravel&logoColor=white)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178C6?logo=typescript&logoColor=white)
![Inertia.js](https://img.shields.io/badge/Inertia.js-2.0-9553E9?logo=inertia&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-4479A1?logo=mysql&logoColor=white)
![Pest](https://img.shields.io/badge/Tested_with-Pest-FF6B6B)
![Status](https://img.shields.io/badge/Status-Completed-2ea44f)

## Overview

NewComCRM is a custom-built CRM delivered as a client engagement (build time: **45 days**), now completed and live in production. It replaces spreadsheet-based tracking with a single system where staff can manage customers, companies, products, suppliers, requirements, meetings, follow-ups, and sales — with role-based access, Excel import/export, printable/PDF documents, and dashboard analytics.

- **Live application:** [crystalvisionsolutions.us](https://crystalvisionsolutions.us/)
- **Demo instance:** [crm.client.againtheme.com](https://crm.client.againtheme.com/)

## Key Features

**Experience**
- Light/dark mode
- Inline status changes (no page reloads for status updates)
- Modal-based record creation across modules
- Dashboard with charts and KPIs (Recharts)

**Customer & Sales Workflow**
- Customer management — CRUD, status updates, bulk delete, Excel import/export, print view
- Company and Unit management
- Product and Supplier management, linked to requirements and sales
- Requirements module — items, accessories, and installation tracking per requirement, with PDF quote/download and status workflow
- Meetings — calendar view, scheduling, and status tracking
- Follow-ups — status tracking and a dedicated "complete" workflow
- Sales tracking with dedicated reports (sales, follow-ups, customers)

**Administration**
- Role-based access control (Super Admin vs. staff-level permissions)
- User management
- Global application settings panel
- Secure authentication via Laravel Fortify (login, registration, password reset, email verification)

## Tech Stack

| Layer | Technology |
|---|---|
| Backend | Laravel 12, PHP 8.2+ |
| Frontend | React 19, TypeScript, Inertia.js 2 |
| Styling / UI | Tailwind CSS 4, Radix UI primitives, shadcn-style components, Lucide icons |
| Data visualization | Recharts |
| Database | MySQL (SQLite supported for local development) |
| Auth | Laravel Fortify |
| Import / Export | Maatwebsite Excel, barryvdh/laravel-dompdf |
| Testing | Pest, PHPUnit |
| Tooling | Vite, ESLint, Prettier, Laravel Pint |

## Architecture

The backend follows a layered structure rather than fat controllers:

```
app/
├── Actions/          # Single-purpose, invokable business actions
├── Http/Controllers/ # Thin controllers (Customers, Products, Requirements, Meetings, FollowUps, Sales, Companies, Units, Suppliers, Users, Reports, Admin/Settings)
├── Models/            # Company, Customer, FollowUp, Meeting, Product, Requirement
│                       #   (+ RequirementItem, RequirementAccessory, RequirementInstallation),
│                       #   Sale, Setting, Supplier, Unit, User
├── Policies/          # Authorization per resource
├── Observers/          # Model lifecycle hooks
├── Repositories/       # Data access layer
├── Services/            # Business/domain logic
├── Exports/ & Imports/ # Excel import/export (Maatwebsite Excel)
├── Concerns/ & Traits/  # Shared, composable behavior
└── Helpers/             # Global settings helper
```

The frontend mirrors this by domain, with an Inertia + React page per module (`resources/js/pages/Customers`, `Products`, `Requirements`, `Meetings`, `FollowUps`, `Sales`, `Companies`, `Units`, `Suppliers`, `Reports`, `Admin/Settings`, `users`, `auth`, `settings`), shared UI in `components/`, and cross-cutting logic in `hooks/`, `contexts/`, and `layouts/`.

## Getting Started

**Requirements:** PHP 8.2+, Composer, Node.js, and MySQL (or SQLite for local dev).

```bash
# Clone the repository
git clone https://github.com/sahosmia/NewComCRM.git
cd NewComCRM

# Backend setup
composer install
cp .env.example .env
php artisan key:generate

# Configure your database in .env, then run migrations
php artisan migrate

# Frontend dependencies
npm install

# Run the app (server + queue worker + Vite, concurrently)
composer run dev
```

The app will be available at the URL configured in `APP_URL` (default `http://localhost:8000`).

## Testing

```bash
composer test        # Pint (style) + Laravel test suite (Pest)
php artisan test      # Run tests only
```

## Roles & Permissions

Access is split between a **Super Admin** role — with exclusive access to user management and global admin settings — and standard staff users, who work within the core CRM modules (customers, products, requirements, meetings, follow-ups, sales).

## About This Project

Built end-to-end as a solo developer engagement: requirements gathering, database design, backend API, frontend UI, testing, and deployment.

## Author

**Sahos Mia**
Full-Stack Developer (Laravel · React · TypeScript)

- GitHub: [@sahosmia](https://github.com/sahosmia)
- LinkedIn: [linkedin.com/in/sahosmia](https://www.linkedin.com/in/sahosmia/)

## License

This is a proprietary application built for a client engagement. All rights reserved; not licensed for reuse without permission.
