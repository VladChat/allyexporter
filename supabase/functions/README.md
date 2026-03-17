# Supabase Edge Function Secrets

Add these secrets to GitHub repository settings:
https://github.com/VladChat/allyexporter/settings/secrets/actions

## Required Secrets for Edge Function Deployment

| Secret Name | Description | Where to get |
|-------------|-------------|--------------|
| `SUPABASE_ACCESS_TOKEN` | Supabase personal access token | https://supabase.com/dashboard/account/tokens |
| `SUPABASE_DB_PASSWORD` | Database password for migrations | Your Supabase project database password |

## Required Secrets for Edge Function Runtime

Add these in Supabase Dashboard → Edge Functions → contact-submit → Secrets:

| Secret Name | Description |
|-------------|-------------|
| `SUPABASE_URL` | Your Supabase project URL (https://lwlbjrwvijgndidqxcqp.supabase.co) |
| `SUPABASE_SERVICE_ROLE_KEY` | Service role key (NOT anon key) |
| `CONTACT_CAPTCHA_SECRET` | Cloudflare Turnstile secret (optional) |
| `CONTACT_CAPTCHA_VERIFY_URL` | Cloudflare Turnstile verify URL (optional, default: https://challenges.cloudflare.com/turnstile/v0/siteverify) |

## Setup Steps

1. **Add GitHub Secrets:**
   - Go to https://github.com/VladChat/allyexporter/settings/secrets/actions
   - Add `SUPABASE_ACCESS_TOKEN` and `SUPABASE_DB_PASSWORD`

2. **Add Edge Function Secrets in Supabase:**
   - Go to https://supabase.com/dashboard/project/lwlbjrwvijgndidqxcqp/functions
   - Click on `contact-submit` function
   - Go to "Secrets" tab
   - Add `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, and optional captcha secrets

3. **Deploy:**
   - Push to main branch (triggers automatic deploy)
   - Or manually run workflow from Actions tab
