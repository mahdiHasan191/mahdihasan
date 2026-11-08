-- Safe to run more than once in Supabase SQL Editor.
-- Public buckets allow anyone to read uploaded website media; writes are restricted to each authenticated user's own UID folder.

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values
  ('portfolio-images', 'portfolio-images', true, 10485760, array['image/jpeg','image/png','image/webp','image/gif','image/avif']),
  ('resumes', 'resumes', true, 10485760, null)
on conflict (id) do update set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

-- Remove older broad policies and the initial UI-generated portfolio-images policy names.
drop policy if exists "Public view portfolio images" on storage.objects;
drop policy if exists "Admin manage portfolio images" on storage.objects;
drop policy if exists "Authenticated UID folder image access 1pgxdi5_0" on storage.objects;
drop policy if exists "Authenticated UID folder image access 1pgxdi5_1" on storage.objects;
drop policy if exists "Authenticated UID folder image access 1pgxdi5_2" on storage.objects;

drop policy if exists "Authenticated read own portfolio media" on storage.objects;
create policy "Authenticated read own portfolio media"
on storage.objects for select to authenticated
using (
  bucket_id in ('portfolio-images', 'resumes')
  and (select auth.uid()::text) = (storage.foldername(name))[1]
);

drop policy if exists "Authenticated upload own portfolio media" on storage.objects;
create policy "Authenticated upload own portfolio media"
on storage.objects for insert to authenticated
with check (
  bucket_id in ('portfolio-images', 'resumes')
  and (select auth.uid()::text) = (storage.foldername(name))[1]
);

drop policy if exists "Authenticated update own portfolio media" on storage.objects;
create policy "Authenticated update own portfolio media"
on storage.objects for update to authenticated
using (
  bucket_id in ('portfolio-images', 'resumes')
  and (select auth.uid()::text) = (storage.foldername(name))[1]
)
with check (
  bucket_id in ('portfolio-images', 'resumes')
  and (select auth.uid()::text) = (storage.foldername(name))[1]
);
