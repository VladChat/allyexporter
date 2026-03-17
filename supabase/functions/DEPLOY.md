# Deploying Supabase Edge Function

## Manual Deployment (Recommended)

Since GitHub Actions deployment may require additional setup, you can deploy the function manually:

### Option 1: Via Supabase Dashboard

1. Go to https://supabase.com/dashboard/project/lwlbjrwvijgndidqxcqp/functions
2. Click "New Function" or select `contact-submit` if it exists
3. Copy the code from `supabase/functions/contact-submit/index.ts`
4. Paste into the Supabase editor
5. Click "Deploy"

### Option 2: Via Supabase CLI (Local)

```bash
# Install Supabase CLI
npm install -g supabase

# Login
supabase login

# Link to your project
supabase link --project-ref lwlbjrwvijgndidqxcqp

# Deploy the function
supabase functions deploy contact-submit
```

### Option 3: Via GitHub Actions

Ensure these GitHub Secrets are set:
- `SUPABASE_ACCESS_TOKEN` - Get from https://supabase.com/dashboard/account/tokens
- `SUPABASE_DB_PASSWORD` - Your database password

Then trigger the workflow from Actions tab.

## Required Function Secrets (in Supabase Dashboard)

After deploying, go to:
**Supabase Dashboard → Edge Functions → contact-submit → Secrets**

Add these secrets:

| Secret | Value |
|--------|-------|
| `SUPABASE_URL` | `https://lwlbjrwvijgndidqxcqp.supabase.co` |
| `SUPABASE_SERVICE_ROLE_KEY` | Get from Settings → API → Service Role Key |

## Verify Deployment

Test the function endpoint:
```bash
curl -X POST https://lwlbjrwvijgndidqxcqp.supabase.co/functions/v1/contact-submit \
  -H "Content-Type: application/json" \
  -H "apikey: YOUR_ANON_KEY" \
  -d '{"name":"Test","email":"test@example.com","subject":"Test","message":"This is a test message with 30+ characters"}'
```

Expected response: `{"success":true}` or error message with details.
