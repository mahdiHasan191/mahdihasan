# Fixing shared image uploads and contact email alerts

## Why the current behavior fails

The Supabase project connected to the site currently has no Storage buckets. The old upload helper silently converted failed uploads into a browser-local `data:` URL. That URL is not a durable shared file, and the profile/project record could still be written to per-device local storage. The old contact form also treated failed database writes as success and never sent an email; it only attempted to save an inquiry.

The code now refuses local-only image fallback, checks that cloud profile writes succeed, and only confirms a form submission after Supabase saved it. It also invokes a Supabase Edge Function for an email alert.

## 1. Set Cloudflare Pages build environment

In Cloudflare Dashboard → Workers & Pages → your Pages project → Settings → Environment variables, set these for **Production** (and Preview if you use it):

- `VITE_SUPABASE_URL` = `https://mqxkytdyvzdolbihbdjg.supabase.co`
- `VITE_SUPABASE_ANON_KEY` = the project's publishable/anon key from Supabase → Project Settings → API Keys

These are public client-side values, not service-role secrets. Never put a service-role key in the website. The app's admin setup form saves credentials only in the current browser's localStorage; that does not configure other devices.

## 2. Provision the Storage buckets

Open Supabase → SQL Editor → New query, paste `supabase/fix-storage.sql`, and Run. This creates public-read buckets (`portfolio-images`, `resumes`) with authenticated writes. Public means uploaded media URLs can be viewed by anyone; do not store private documents in these buckets.

Also ensure the main database schema in `supabase/schema.sql` has been run, and add the authorized administrator under Supabase Authentication if not already configured. The SQL script creates tables and policies; it does not create an Auth account.

## 3. Enable email notifications

The contact form stores the inquiry first, then calls the `send-contact-notification` Edge Function. Outbound email needs a sender service; the function uses Resend's API. Supabase and Cloudflare Pages can remain on their free tiers for low-volume personal use, subject to their current quotas.

1. Create a Resend account and obtain an API key. Resend's testing sender may only deliver to verified recipients; for reliable production delivery, verify a sending domain (a custom domain may have a cost). Do not put the Resend key in frontend code.
2. Install/login to the Supabase CLI on a trusted computer, link project `mqxkytdyvzdolbihbdjg`, and deploy the function:

   ```sh
   supabase login
   supabase link --project-ref mqxkytdyvzdolbihbdjg
   supabase functions deploy send-contact-notification --no-verify-jwt
   supabase secrets set RESEND_API_KEY=re_xxx CONTACT_TO_EMAIL=mhmasum7619@gmail.com CONTACT_FROM_EMAIL="Mahdi Hasan Website <onboarding@resend.dev>" SITE_ORIGIN=https://mahdihasan.pages.dev
   ```

   Use an authorized sender address/domain in `CONTACT_FROM_EMAIL` according to Resend's verification rules. `--no-verify-jwt` is required because this is an unauthenticated public contact form; the function validates and bounds its inputs and sends only to the fixed `CONTACT_TO_EMAIL`. Never accept a recipient address from the browser.

3. Submit a real but harmless test inquiry and confirm it appears in the Supabase inquiry table and your mailbox.

If email delivery isn't configured, the form will tell visitors the inquiry is saved but the email alert failed. Existing submissions are retained in the Supabase inquiry table/admin inbox.
