-- Apply this migration to an existing Supabase project before relying on the
-- new Achievements gallery and global visitor counter. It is safe to re-run.
BEGIN;

ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS avatar_link TEXT,
  ADD COLUMN IF NOT EXISTS cover_url TEXT,
  ADD COLUMN IF NOT EXISTS cover_link TEXT;

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

CREATE TABLE IF NOT EXISTS public.site_analytics (
  id TEXT PRIMARY KEY DEFAULT 'main_counter',
  total_visits BIGINT NOT NULL DEFAULT 1420,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_analytics ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public achievements read" ON public.achievements;
CREATE POLICY "Public achievements read"
  ON public.achievements FOR SELECT
  USING (is_published = true);

DROP POLICY IF EXISTS "Admin full achievements" ON public.achievements;
CREATE POLICY "Admin full achievements"
  ON public.achievements FOR ALL TO authenticated
  USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Public site_analytics read" ON public.site_analytics;
CREATE POLICY "Public site_analytics read"
  ON public.site_analytics FOR SELECT
  USING (true);

-- Mirrors the uploaded schema's browser-based counter update behavior.
-- Note: this allows public clients to alter the counter value.
DROP POLICY IF EXISTS "Public site_analytics upsert" ON public.site_analytics;
CREATE POLICY "Public site_analytics upsert"
  ON public.site_analytics FOR ALL
  USING (true) WITH CHECK (true);

INSERT INTO public.site_analytics (id, total_visits)
VALUES ('main_counter', 1420)
ON CONFLICT (id) DO NOTHING;

COMMIT;
