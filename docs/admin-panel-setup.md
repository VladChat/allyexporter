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
- creates helper function `public.is_admin_user()` for stable admin checks
- adds policies so only `allyexporter@gmail.com` can read/delete messages and update settings
<<<<<<< HEAD
- blocks direct anonymous/public inserts into `contact_messages`
- keeps admin-only insert/read/delete access for `contact_messages`
=======
- keeps anonymous insert for contact form submissions
>>>>>>> 78a7ca0b2c834bbd6134a5676134b58b36ef8d4b

If you see this error in the admin panel:

- `Could not find table public.site_settings in the schema cache`

or this error:

- `Could not find the 'updated_at' column of 'site_settings' in the schema cache`

or this error variant:

- `column site_settings.updated_at does not exist`

run the SQL script again in the **same Supabase project** and make sure the final line executes:

- `notify pgrst, 'reload schema';`

If `site_settings` already existed before this setup, ensure this migration is applied:

```sql
alter table if exists public.site_settings
  add column if not exists updated_at timestamptz not null default now();

notify pgrst, 'reload schema';
```

If admin dashboard shows:

- `No messages found.`

even after sending contact form submissions, it usually means `contact_messages` RLS policies are missing/outdated in this project.

1. Rerun `docs/admin-panel-supabase.sql` in the **same Supabase project**.
2. Sign out and sign in again as `allyexporter@gmail.com`.
3. Verify rows and policies in SQL Editor:

```sql
select id, created_at, name, email, subject
from public.contact_messages
order by created_at desc
limit 20;

select policyname, cmd, qual, with_check
from pg_policies
where schemaname = 'public'
  and tablename = 'contact_messages'
order by policyname;
```

Why this can happen even when rows exist:

- old policies may depend on JWT claims that are not present in your current token shape
- latest setup uses `public.is_admin_user()` (checks `auth.users` by `auth.uid()`) to avoid JWT-claim mismatch

## 3) Confirm environment variables

Project requires:

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

For this project, `VITE_SUPABASE_URL` must be:

- `https://lwlbjrwvijgndidqxcqp.supabase.co`

These are used for both public contact form write and admin auth/data operations.

<<<<<<< HEAD
For secure contact submissions via server function, also make sure the function runtime has:

- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`

Optional anti-spam captcha verification variables:

- `CONTACT_CAPTCHA_SECRET` (if set, captcha token verification is required)
- `CONTACT_CAPTCHA_VERIFY_URL` (optional override; defaults to Cloudflare Turnstile verify URL)

=======
>>>>>>> 78a7ca0b2c834bbd6134a5676134b58b36ef8d4b
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

<<<<<<< HEAD
Contact form submission should go through the server-side function `contact-submit`:

- public forms call `POST /functions/v1/contact-submit`
- function performs server-side validation and anti-spam checks
- function writes into `contact_messages` using service role key

Direct browser-to-table insert is intentionally disabled by RLS for `contact_messages`.

Default anti-spam checks in `contact-submit` include:

- strict server-side length + format validation
- trimming/normalization
- honeypot field rejection (`website`)
- basic IP-based rate limiting
- optional captcha verification (when `CONTACT_CAPTCHA_SECRET` is configured)
=======
Existing contact form insert flow remains active and should not be broken:

- form writes to `contact_messages`
- anonymous insert stays enabled via RLS policy
>>>>>>> 78a7ca0b2c834bbd6134a5676134b58b36ef8d4b
