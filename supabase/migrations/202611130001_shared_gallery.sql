-- Restore the shared gallery table missing from the live Supabase project.
-- This migration is additive and preserves any existing rows.
BEGIN;

CREATE TABLE IF NOT EXISTS public.achievements (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  date TEXT NOT NULL,
  description TEXT NOT NULL,
  image_url TEXT NOT NULL,
  display_order INT NOT NULL DEFAULT 0,
  is_published BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.achievements ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public achievements read" ON public.achievements;
DROP POLICY IF EXISTS "Admin full achievements" ON public.achievements;
CREATE POLICY "Public achievements read"
  ON public.achievements FOR SELECT
  USING (is_published = TRUE);
CREATE POLICY "Admin full achievements"
  ON public.achievements FOR ALL TO authenticated
  USING (TRUE) WITH CHECK (TRUE);

GRANT SELECT ON public.achievements TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.achievements TO authenticated;

COMMIT;
