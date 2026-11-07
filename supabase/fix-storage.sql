-- Safe to run more than once in Supabase SQL Editor.
-- Buckets are public so website visitors can read uploaded media; writes remain authenticated-only.

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values
  ('portfolio-images', 'portfolio-images', true, 10485760, array['image/jpeg','image/png','image/webp','image/gif','image/avif']),
  ('resumes', 'resumes', true, 10485760, null)
on conflict (id) do update set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "Public view portfolio images" on storage.objects;
create policy "Public view portfolio images"
on storage.objects for select
using (bucket_id in ('portfolio-images', 'resumes'));

drop policy if exists "Admin manage portfolio images" on storage.objects;
create policy "Admin manage portfolio images"
on storage.objects for all
to authenticated
using (bucket_id in ('portfolio-images', 'resumes'))
with check (bucket_id in ('portfolio-images', 'resumes'));
