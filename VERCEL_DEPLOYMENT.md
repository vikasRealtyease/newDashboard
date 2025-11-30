# Vercel Deployment Configuration for Monorepo

## Current Setup

You're deploying the **`@realtyeaseai/web`** app from a monorepo structure.

## Vercel Project Settings

### Required Settings in Vercel Dashboard

1. **Framework Preset:** Next.js
2. **Root Directory:** `apps/web`
3. **Build Command:** `turbo build --filter=@realtyeaseai/web`
4. **Output Directory:** `.next`
5. **Install Command:** `pnpm install --frozen-lockfile`

### Environment Variables

Make sure to add any required environment variables in the Vercel project settings:

```
DATABASE_URL=<your-database-url>
NEXTAUTH_SECRET=<your-secret>
NEXTAUTH_URL=<your-production-url>
```

## Configuration Files

### `apps/web/vercel.json`

This file is configured for optimal monorepo deployment:

```json
{
    "buildCommand": "turbo build --filter=@realtyeaseai/web",
    "installCommand": "pnpm install --frozen-lockfile",
    "framework": "nextjs",
    "outputDirectory": ".next",
    "env": {
        "NEXT_TELEMETRY_DISABLED": "1"
    }
}
```

### Why This Works

1. **`turbo build --filter=`** - Uses Turborepo to build only the web app and its dependencies
2. **`--frozen-lockfile`** - Ensures consistent installs in CI/CD
3. **Root Directory set to `apps/web`** - Vercel knows where to find the app
4. **Turborepo** - Automatically handles monorepo dependencies

## Deployment Steps

### First Time Setup

1. Go to Vercel Dashboard → Your Project → Settings
2. **General Tab:**
   - Framework Preset: `Next.js`
   - Root Directory: `apps/web`
3. **Build & Development Settings:**
   - Build Command: `turbo build --filter=@realtyeaseai/web`
   - Output Directory: `.next`
   - Install Command: `pnpm install --frozen-lockfile`

### Deploy

Push to your connected Git branch and Vercel will automatically deploy.

## Troubleshooting

### If Build Fails

1. **Check Build Logs** - Look for specific error messages
2. **Verify Dependencies** - Make sure all packages are in the correct `package.json` files
3. **Check Root Directory** - Ensure it's set to `apps/web` in Vercel settings
4. **Verify Turbo** - Make sure `turbo` is installed in root `devDependencies`

### Common Issues

- ❌ **"turbo: command not found"** → Ensure `turbo` is in root `package.json` devDependencies
- ❌ **CSS import errors** → Make sure Tailwind CSS packages are in devDependencies
- ❌ **Module not found** → Check that all dependencies are properly listed

## Current Package Versions

- **Next.js:** 16.0.5
- **React:** 19.0.0
- **Tailwind CSS:** 4.1.17
- **Turbo:** 2.6.1
- **pnpm:** 8.15.0

---

Last Updated: November 30, 2024
