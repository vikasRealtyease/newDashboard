# Deployment Guide

## Quick Deploy to Vercel

### Prerequisites
- Vercel account
- PostgreSQL database (Supabase recommended)
- Domain configured (e.g., realtyeaseai.com)

### Step 1: Deploy Web App

```bash
cd apps/web
vercel --prod
```

**Configure Domain**: `realtyeaseai.com`

**Environment Variables**:
```
DATABASE_URL=postgresql://...
NEXTAUTH_SECRET=<generate-with-openssl-rand-base64-32>
NEXTAUTH_URL=https://realtyeaseai.com
NEXT_PUBLIC_WEB_URL=https://realtyeaseai.com
NEXT_PUBLIC_APP_URL=https://app.realtyeaseai.com
COOKIE_DOMAIN=.realtyeaseai.com
NODE_ENV=production
```

### Step 2: Deploy App

```bash
cd apps/app
vercel --prod
```

**Configure Domain**: `app.realtyeaseai.com`

**Environment Variables**: Same as web app

### Step 3: Database Migration

```bash
# From your local machine with DATABASE_URL set
pnpm --filter @realtyeaseai/database db:migrate
```

### Step 4: Test Cross-Domain Auth

1. Visit `https://app.realtyeaseai.com` (should redirect to login)
2. Login at `https://realtyeaseai.com/login`
3. Should redirect to `https://app.realtyeaseai.com/dashboard`

## Alternative: Docker Deployment

### Build Images

```dockerfile
# apps/web/Dockerfile
FROM node:18-alpine AS base
RUN npm install -g pnpm@8.15.0

FROM base AS deps
WORKDIR /app
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY apps/web/package.json ./apps/web/
COPY packages/*/package.json ./packages/*/
RUN pnpm install --frozen-lockfile

FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN pnpm --filter @realtyeaseai/web build

FROM base AS runner
WORKDIR /app
ENV NODE_ENV production
COPY --from=builder /app/apps/web/.next ./apps/web/.next
COPY --from=builder /app/apps/web/public ./apps/web/public
COPY --from=builder /app/apps/web/package.json ./apps/web/
COPY --from=deps /app/node_modules ./node_modules

EXPOSE 3000
CMD ["pnpm", "--filter", "@realtyeaseai/web", "start"]
```

### Docker Compose

```yaml
version: '3.8'

services:
  web:
    build:
      context: .
      dockerfile: apps/web/Dockerfile
    ports:
      - "3000:3000"
    environment:
      - DATABASE_URL=${DATABASE_URL}
      - NEXTAUTH_SECRET=${NEXTAUTH_SECRET}
      - NEXTAUTH_URL=https://realtyeaseai.com
      - NEXT_PUBLIC_WEB_URL=https://realtyeaseai.com
      - NEXT_PUBLIC_APP_URL=https://app.realtyeaseai.com
      - COOKIE_DOMAIN=.realtyeaseai.com

  app:
    build:
      context: .
      dockerfile: apps/app/Dockerfile
    ports:
      - "3001:3000"
    environment:
      - DATABASE_URL=${DATABASE_URL}
      - NEXTAUTH_SECRET=${NEXTAUTH_SECRET}
      - NEXTAUTH_URL=https://realtyeaseai.com
      - NEXT_PUBLIC_WEB_URL=https://realtyeaseai.com
      - NEXT_PUBLIC_APP_URL=https://app.realtyeaseai.com
      - COOKIE_DOMAIN=.realtyeaseai.com
```

## Environment Variables Reference

| Variable | Description | Example |
|----------|-------------|---------|
| `DATABASE_URL` | PostgreSQL connection string | `postgresql://user:pass@host:5432/db` |
| `NEXTAUTH_SECRET` | Secret for JWT signing | Generate with `openssl rand -base64 32` |
| `NEXTAUTH_URL` | Base URL for auth (web app) | `https://realtyeaseai.com` |
| `NEXT_PUBLIC_WEB_URL` | Public web app URL | `https://realtyeaseai.com` |
| `NEXT_PUBLIC_APP_URL` | Public dashboard URL | `https://app.realtyeaseai.com` |
| `COOKIE_DOMAIN` | Cookie sharing domain | `.realtyeaseai.com` (production only) |

## Troubleshooting

### Issue: Cookies not shared between domains

**Solution**: Ensure `COOKIE_DOMAIN` is set to `.yourdomain.com` (with leading dot)

### Issue: CORS errors

**Solution**: Verify `NEXT_PUBLIC_WEB_URL` and `NEXT_PUBLIC_APP_URL` are correctly set

### Issue: Redirect loop

**Solution**: Check that `NEXTAUTH_URL` points to the web app (where auth API routes are)

### Issue: Database connection failed

**Solution**: Verify `DATABASE_URL` is accessible from deployment environment
