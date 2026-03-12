-- AllyExporter admin panel SQL setup
-- Run in Supabase SQL Editor

-- 1) Ensure contact_messages has primary key + created_at for admin listing/deletion.
alter table if exists public.contact_messages
  add column if not exists id uuid primary key default gen_random_uuid();

alter table if exists public.contact_messages
  add column if not exists created_at timestamptz not null default now();

-- 2) Create site_settings table for dynamic public contact details.
create table if not exists public.site_settings (
  id uuid primary key default gen_random_uuid(),
  phone text not null,
  email text not null,
  address text not null,
  updated_at timestamptz not null default now()
);

-- 3) Enable RLS.
alter table public.contact_messages enable row level security;
alter table public.site_settings enable row level security;

-- 4) Remove old potentially conflicting policies (safe to rerun).
drop policy if exists "contact_messages_insert_public" on public.contact_messages;
drop policy if exists "contact_messages_select_admin_only" on public.contact_messages;
drop policy if exists "contact_messages_delete_admin_only" on public.contact_messages;

drop policy if exists "site_settings_select_public" on public.site_settings;
drop policy if exists "site_settings_insert_admin_only" on public.site_settings;
drop policy if exists "site_settings_update_admin_only" on public.site_settings;
drop policy if exists "site_settings_delete_admin_only" on public.site_settings;

-- 5) contact_messages policies
-- Keep existing public form inserts working.
create policy "contact_messages_insert_public"
  on public.contact_messages
  for insert
  to anon, authenticated
  with check (true);

-- Only admin email can read messages.
create policy "contact_messages_select_admin_only"
  on public.contact_messages
  for select
  to authenticated
  using (lower(auth.jwt() ->> 'email') = 'allyexporter@gmail.com');

-- Only admin email can delete messages.
create policy "contact_messages_delete_admin_only"
  on public.contact_messages
  for delete
  to authenticated
  using (lower(auth.jwt() ->> 'email') = 'allyexporter@gmail.com');

-- 6) site_settings policies
-- Public read allowed because these values are shown on the public website.
create policy "site_settings_select_public"
  on public.site_settings
  for select
  to anon, authenticated
  using (true);

-- Only admin can insert/update/delete settings.
create policy "site_settings_insert_admin_only"
  on public.site_settings
  for insert
  to authenticated
  with check (lower(auth.jwt() ->> 'email') = 'allyexporter@gmail.com');

create policy "site_settings_update_admin_only"
  on public.site_settings
  for update
  to authenticated
  using (lower(auth.jwt() ->> 'email') = 'allyexporter@gmail.com')
  with check (lower(auth.jwt() ->> 'email') = 'allyexporter@gmail.com');

create policy "site_settings_delete_admin_only"
  on public.site_settings
  for delete
  to authenticated
  using (lower(auth.jwt() ->> 'email') = 'allyexporter@gmail.com');

-- 7) Seed single settings row if table empty.
insert into public.site_settings (phone, email, address)
select '(224) 532-9236', 'contact@allyexporter.com', '130 Old Oak Drive, Apt 247, Buffalo Grove, IL 60089, USA'
where not exists (select 1 from public.site_settings);
