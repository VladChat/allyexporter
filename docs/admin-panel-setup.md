# AllyExporter Admin Panel Setup

This document describes how to enable the `/admin` panel securely with Supabase.

## 1) Create admin auth user (no public signup)

In Supabase Dashboard:

1. Go to **Authentication → Users**.
2. Create one user manually with email:
   - `allyexporter@gmail.com`
3. Set password for this user.

Do **not** expose signup/registration UI in the website.

## 2) Run SQL setup

Run the SQL script:

- `docs/admin-panel-supabase.sql`

This script:

- ensures `contact_messages` has `id` and `created_at`
- creates `site_settings`
- enables RLS
- adds policies so only `allyexporter@gmail.com` can read/delete messages and update settings
- keeps anonymous insert for contact form submissions

## 3) Confirm environment variables

Project requires:

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

These are used for both public contact form write and admin auth/data operations.

## 4) Admin route behavior

- `/admin` shows login page.
- Only authenticated user with email `allyexporter@gmail.com` can proceed.
- Authenticated non-admin email is blocked and signed out.
- Protected admin UI is at `/admin/dashboard`.

## 5) What admin can do

Admin dashboard has two sections:

1. **Messages**
   - Read from `contact_messages`
   - Delete message rows

2. **Settings**
   - Edit and save:
     - `phone`
     - `email`
     - `address`
   - Data is stored in `site_settings`

## 6) Public site dynamic settings

Public pages read contact details from `site_settings`.

Fallback behavior:

- If settings table has no row (or query fails), site falls back to default values from `company.ts`.

## 7) Contact form safety

Existing contact form insert flow remains active and should not be broken:

- form writes to `contact_messages`
- anonymous insert stays enabled via RLS policy
