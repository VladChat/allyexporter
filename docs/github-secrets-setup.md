# GitHub Secrets Setup for Production

This document explains how to configure GitHub Secrets for the allyexporter production deployment.

## Required Secrets

Navigate to your GitHub repository settings:
**GitHub → VladChat/allyexporter → Settings → Secrets and variables → Actions**

Add the following secrets:

| Secret Name | Description | Example Value |
|-------------|-------------|---------------|
| `VITE_SUPABASE_URL` | Your Supabase project URL | `https://lwlbjrwvijgndidqxcqp.supabase.co` |
| `VITE_SUPABASE_ANON_KEY` | Your Supabase anonymous/public key | `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...` |

## How to Add Secrets

1. Go to https://github.com/VladChat/allyexporter/settings/secrets/actions
2. Click **"New repository secret"**
3. Enter the secret name and value
4. Click **"Add secret"**
5. Repeat for each secret

## How It Works

The GitHub Actions workflow (`.github/workflows/static.yml`) uses these secrets during the build process:

```yaml
- name: Build
  env:
    VITE_SUPABASE_URL: ${{ secrets.VITE_SUPABASE_URL }}
    VITE_SUPABASE_ANON_KEY: ${{ secrets.VITE_SUPABASE_ANON_KEY }}
  run: npm run build
```

The secrets are:
- ✅ Injected at build time on GitHub Actions
- ✅ Never stored in the repository
- ✅ Not exposed in logs or build artifacts
- ✅ Used to compile the Vite app with correct environment variables

## Local Development

For local development, create a `.env` file (gitignored) with the same variables:

```bash
cp .env.example .env
# Edit .env with your actual Supabase credentials
```

## Security Notes

- ⚠️ **Never commit `.env`** - it's in `.gitignore` for a reason
- ⚠️ **Rotate keys if exposed** - if credentials were leaked, regenerate them in Supabase
- ✅ The `.env` file was removed from git history in commit `1740e76`
- ✅ Production now relies solely on GitHub Secrets

## Verification

After setting up secrets, verify the workflow:

1. Push a commit to `main` branch
2. Check **Actions** tab for the "Build and Deploy to GitHub Pages" workflow
3. Ensure the build completes without errors related to missing environment variables
