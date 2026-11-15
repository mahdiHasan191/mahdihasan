-- Shared image storage for the public portfolio.
-- Safe to run repeatedly; it does not delete application rows.
BEGIN;

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values
  ('portfolio-images', 'portfolio-images', true, 10485760,
    array['image/jpeg','image/png','image/webp','image/gif','image/avif']),
  ('resumes', 'resumes', true, 10485760, null)
on conflict (id) do update set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

-- Public visitors can read portfolio images; only authenticated admins can write.
drop policy if exists "Public view portfolio images" on storage.objects;
drop policy if exists "Admin manage portfolio images" on storage.objects;
drop policy if exists "Public read portfolio images" on storage.objects;
drop policy if exists "Admin upload portfolio images" on storage.objects;
drop policy if exists "Admin update portfolio images" on storage.objects;
drop policy if exists "Admin delete portfolio images" on storage.objects;
drop policy if exists "Authenticated read own portfolio media" on storage.objects;
drop policy if exists "Authenticated upload own portfolio media" on storage.objects;
drop policy if exists "Authenticated update own portfolio media" on storage.objects;
drop policy if exists "Authenticated delete own portfolio media" on storage.objects;

create policy "Public read portfolio images"
on storage.objects for select to anon, authenticated
using (bucket_id = 'portfolio-images');

create policy "Admin upload portfolio images"
on storage.objects for insert to authenticated
with check (
  bucket_id in ('portfolio-images', 'resumes')
  and (select auth.uid()::text) = (storage.foldername(name))[1]
);

create policy "Admin update portfolio images"
on storage.objects for update to authenticated
using (
  bucket_id in ('portfolio-images', 'resumes')
  and (select auth.uid()::text) = (storage.foldername(name))[1]
)
with check (
  bucket_id in ('portfolio-images', 'resumes')
  and (select auth.uid()::text) = (storage.foldername(name))[1]
);

create policy "Admin delete portfolio images"
on storage.objects for delete to authenticated
using (
  bucket_id in ('portfolio-images', 'resumes')
  and (select auth.uid()::text) = (storage.foldername(name))[1]
);

create table if not exists public.achievements (
  id text primary key,
  title text not null,
  category text not null,
  date text not null,
  description text not null,
  image_url text not null,
  display_order int not null default 0,
  is_published boolean not null default true,
  created_at timestamptz default now()
);

alter table public.achievements enable row level security;
drop policy if exists "Public achievements read" on public.achievements;
drop policy if exists "Admin full achievements" on public.achievements;
create policy "Public achievements read"
  on public.achievements for select to anon, authenticated
  using (is_published = true);
create policy "Admin full achievements"
  on public.achievements for all to authenticated
  using (true) with check (true);
grant select on public.achievements to anon, authenticated;
grant insert, update, delete on public.achievements to authenticated;

COMMIT;
