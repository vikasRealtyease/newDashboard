# Environment Variables Setup Guide
## Complete Guide for Development and Production

---

## 📋 Quick Summary

You have **ONE main .env file** in the monorepo root that all apps share.

```
monorepo/
├── .env                    ← Main environment file (all apps use this)
├── .env.example            ← Template with all variables
├── .env.local              ← Local overrides (gitignored)
├── .env.development        ← Development-specific (optional)
└── .env.production         ← Production-specific (optional)
```

---

## 🚀 Quick Setup (5 Minutes)

### Step 1: Copy the Example File

```bash
# In monorepo root
cp .env.example .env
```

### Step 2: Fill in MINIMUM Required Variables

Open `.env` and add these **essential** variables first:

```env
# ============================================
# MINIMUM REQUIRED FOR DEVELOPMENT
# ============================================

# PostgreSQL (Supabase)
DATABASE_URL="postgresql://postgres.xxxxx:password@aws-0-us-west-1.pooler.supabase.com:5432/postgres"

# MongoDB
MONGODB_URI="mongodb+srv://user:password@cluster0.xxxxx.mongodb.net/realtyeaseai-dev?retryWrites=true&w=majority"

# Supabase
NEXT_PUBLIC_SUPABASE_URL="https://xxxxx.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="eyJhbGci..."

# NextAuth
NEXTAUTH_SECRET="run: openssl rand -base64 32"
NEXTAUTH_URL="http://localhost:3000"
```

### Step 3: Generate Secrets

```bash
# Generate NEXTAUTH_SECRET (Mac/Linux)
openssl rand -base64 32

# Generate NEXTAUTH_SECRET (Windows PowerShell)
[Convert]::ToBase64String((1..32|%{Get-Random -Maximum 256}))
```

### Step 4: Test It

```bash
# Install dependencies
pnpm install

# Test database connection
cd packages/database
npx prisma db pull

# Should see: "Introspecting based on your schema.prisma..."
```

---

## 📦 Environment File Structure

### Production vs Development Strategy

**Option 1: Single .env with Comments (Recommended for simplicity)**
```env
# Development
DATABASE_URL="postgres://dev..."

# Production (commented out)
# DATABASE_URL="postgres://prod..."
```

**Option 2: Separate Files (Recommended for teams)**
```
.env                    ← Shared variables
.env.development        ← Dev-only variables
.env.production         ← Prod-only variables
.env.local              ← Personal overrides (gitignored)
```

---

## 🔑 Variable Categories & Priority

### 1. CRITICAL (Must Have to Run)

```env
# Databases
DATABASE_URL="..."              # PostgreSQL
MONGODB_URI="..."               # MongoDB

# Auth
NEXTAUTH_SECRET="..."           # Session encryption
NEXTAUTH_URL="..."              # App URL
```

### 2. ESSENTIAL (Need for Core Features)

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL="..."
NEXT_PUBLIC_SUPABASE_ANON_KEY="..."

# Google OAuth (for social login)
GOOGLE_CLIENT_ID="..."
GOOGLE_CLIENT_SECRET="..."
```

### 3. IMPORTANT (Need for Full Functionality)

```env
# PayPal (for payments)
PAYPAL_CLIENT_ID="..."
PAYPAL_CLIENT_SECRET="..."
NEXT_PUBLIC_PAYPAL_CLIENT_ID="..."

# Cloudinary (for file uploads)
CLOUDINARY_CLOUD_NAME="..."
CLOUDINARY_API_KEY="..."
CLOUDINARY_API_SECRET="..."

# Email (for notifications)
RESEND_API_KEY="..."
```

### 4. OPTIONAL (Advanced Features)

```env
# AI Services
OPENAI_API_KEY="..."            # AI tools

# Rate Limiting
UPSTASH_REDIS_REST_URL="..."    # Rate limiting

# Analytics
NEXT_PUBLIC_GA_MEASUREMENT_ID="..."
SENTRY_DSN="..."

# Real-time
PUSHER_APP_ID="..."
```

---

## 🎯 Development Setup

### Minimal .env for Development

```env
# ============================================
# DEVELOPMENT ENVIRONMENT
# ============================================

NODE_ENV="development"

# Databases
DATABASE_URL="postgresql://postgres.abcdef:devpassword@aws-0-us-west-1.pooler.supabase.com:5432/postgres"
MONGODB_URI="mongodb+srv://devuser:devpass@cluster0-dev.xxxxx.mongodb.net/realtyease-dev?retryWrites=true&w=majority"

# Supabase
NEXT_PUBLIC_SUPABASE_URL="https://abcdef.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="eyJhbGciOiJI..."
SUPABASE_SERVICE_ROLE_KEY="eyJhbGciOiJI..."

# Auth
NEXTAUTH_SECRET="your-generated-secret-here"
NEXTAUTH_URL="http://localhost:3000"

# Google OAuth (get from Google Cloud Console)
GOOGLE_CLIENT_ID="123456789.apps.googleusercontent.com"
GOOGLE_CLIENT_SECRET="GOCSPX-abc123"

# PayPal Sandbox
PAYPAL_MODE="sandbox"
PAYPAL_CLIENT_ID="sandbox-client-id"
PAYPAL_CLIENT_SECRET="sandbox-secret"
NEXT_PUBLIC_PAYPAL_CLIENT_ID="sandbox-client-id"

# Cloudinary (optional for now)
CLOUDINARY_CLOUD_NAME="dev-cloud"
CLOUDINARY_API_KEY="123456"
CLOUDINARY_API_SECRET="abc123"

# App URLs
NEXT_PUBLIC_WEB_URL="http://localhost:3000"
NEXT_PUBLIC_CLIENT_URL="http://localhost:3005"
NEXT_PUBLIC_ADMIN_URL="http://localhost:3002"
```

---

## 🏭 Production Setup

### Production .env

```env
# ============================================
# PRODUCTION ENVIRONMENT
# ============================================

NODE_ENV="production"

# Databases (SEPARATE from dev!)
DATABASE_URL="postgresql://postgres.prodref:strongProdPassword@aws-0-us-west-1.pooler.supabase.com:5432/postgres"
MONGODB_URI="mongodb+srv://produser:strongpass@cluster0-prod.xxxxx.mongodb.net/realtyease?retryWrites=true&w=majority"

# Supabase Production Project
NEXT_PUBLIC_SUPABASE_URL="https://prodref.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="eyJhbGciOiJI...prod-key"
SUPABASE_SERVICE_ROLE_KEY="eyJhbGciOiJI...prod-service-key"

# Auth
NEXTAUTH_SECRET="different-secret-for-production"
NEXTAUTH_URL="https://realtyease.ai"

# Google OAuth (same app, different redirect URLs)
GOOGLE_CLIENT_ID="123456789.apps.googleusercontent.com"
GOOGLE_CLIENT_SECRET="GOCSPX-abc123"

# PayPal LIVE
PAYPAL_MODE="live"
PAYPAL_CLIENT_ID="live-client-id"
PAYPAL_CLIENT_SECRET="live-secret"
NEXT_PUBLIC_PAYPAL_CLIENT_ID="live-client-id"
PAYPAL_BUSINESS_EMAIL="business@realtyease.ai"

# Cloudinary Production
CLOUDINARY_CLOUD_NAME="prod-cloud"
CLOUDINARY_API_KEY="prod-key"
CLOUDINARY_API_SECRET="prod-secret"

# Production URLs
NEXT_PUBLIC_WEB_URL="https://realtyease.ai"
NEXT_PUBLIC_CLIENT_URL="https://app.realtyease.ai"
NEXT_PUBLIC_ADMIN_URL="https://admin.realtyease.ai"

# Security (production only)
SESSION_COOKIE_SECURE="true"
ENABLE_DEBUG_MODE="false"

# Analytics & Monitoring
NEXT_PUBLIC_GA_MEASUREMENT_ID="G-XXXXXXXXXX"
SENTRY_DSN="https://your-sentry-dsn@sentry.io/123456"
```

---

## 🔒 Security Best Practices

### DO ✅

1. **Use Different Credentials for Dev/Prod**
   ```env
   # Dev
   DATABASE_URL="...dev-database..."

   # Prod (different database!)
   DATABASE_URL="...prod-database..."
   ```

2. **Generate Strong Secrets**
   ```bash
   # Use openssl or secure random generators
   openssl rand -base64 32
   ```

3. **Keep .env in .gitignore**
   ```bash
   # Check .gitignore contains:
   .env
   .env.local
   .env.*.local
   ```

4. **Use Environment Variables in Vercel**
   - Don't commit .env.production
   - Add in Vercel dashboard → Settings → Environment Variables

### DON'T ❌

1. **Never Commit .env Files**
   ```bash
   # Bad - NEVER do this
   git add .env
   ```

2. **Don't Share Secrets in Chat/Email**
   - Use password managers
   - Use secret sharing tools (1Password, LastPass)

3. **Don't Use Same Passwords**
   ```env
   # Bad - same password everywhere
   DATABASE_PASSWORD="same123"
   MONGODB_PASSWORD="same123"
   ```

4. **Don't Hardcode Secrets in Code**
   ```typescript
   // Bad
   const apiKey = "sk-abc123..."

   // Good
   const apiKey = process.env.OPENAI_API_KEY
   ```

---

## 🎓 Environment Variable Types

### 1. Public Variables (NEXT_PUBLIC_*)

Can be safely exposed to browser:

```env
NEXT_PUBLIC_SUPABASE_URL="https://xxx.supabase.co"
NEXT_PUBLIC_PAYPAL_CLIENT_ID="sandbox-xxx"
NEXT_PUBLIC_GA_MEASUREMENT_ID="G-XXX"
```

**Rules:**
- ✅ Safe to expose in client-side code
- ✅ Available in browser JavaScript
- ❌ Don't put secrets here

### 2. Private Variables (No Prefix)

Server-side only, NEVER exposed to browser:

```env
DATABASE_URL="postgresql://..."
PAYPAL_CLIENT_SECRET="secret-xxx"
OPENAI_API_KEY="sk-xxx"
SUPABASE_SERVICE_ROLE_KEY="xxx"
```

**Rules:**
- ✅ Only accessible in API routes
- ✅ Keep secrets here
- ❌ Never use in client components

---

## 📝 Verification Checklist

Before running your app, verify:

### Development
- [ ] .env file exists in root
- [ ] DATABASE_URL is set
- [ ] MONGODB_URI is set
- [ ] NEXTAUTH_SECRET is generated (32+ chars)
- [ ] NEXTAUTH_URL matches your dev URL
- [ ] Supabase keys are added
- [ ] Google OAuth is configured (if using social login)
- [ ] PayPal is in sandbox mode

### Production
- [ ] Separate production database
- [ ] Different NEXTAUTH_SECRET
- [ ] Production URLs set correctly
- [ ] PayPal in live mode
- [ ] SESSION_COOKIE_SECURE="true"
- [ ] All secrets rotated (different from dev)
- [ ] Environment variables set in Vercel dashboard
- [ ] Analytics/monitoring configured

---

## 🐛 Common Issues

### Issue 1: "Environment variable not found"

**Cause:** .env not in correct location

**Fix:**
```bash
# .env must be in monorepo ROOT
ls -la .env

# Should show:
# C:\Users\Home\Documents\AI Dashboard for SaaS\monorepo\.env
```

### Issue 2: "Invalid database URL"

**Cause:** Wrong format or special characters

**Fix:**
```env
# Encode special characters
# @ → %40
# : → %3A
# / → %2F

# Wrong
PASSWORD=my@pass:word

# Right
PASSWORD=my%40pass%3Aword
```

### Issue 3: "NEXTAUTH_SECRET must be set"

**Cause:** Missing or empty secret

**Fix:**
```bash
# Generate new secret
openssl rand -base64 32

# Add to .env
NEXTAUTH_SECRET="generated-secret-here"
```

### Issue 4: Variables not updating

**Cause:** Need to restart dev server

**Fix:**
```bash
# Kill server (Ctrl+C)
# Restart
pnpm dev
```

---

## 🎯 Setup Order

### Day 1: Minimum Setup
1. Copy .env.example to .env
2. Add DATABASE_URL (Supabase)
3. Add MONGODB_URI (Atlas)
4. Generate NEXTAUTH_SECRET
5. Add Supabase keys
6. Test: `npx prisma db pull`

### Day 2: OAuth Setup
1. Create Google OAuth app
2. Add GOOGLE_CLIENT_ID
3. Add GOOGLE_CLIENT_SECRET
4. Test social login

### Day 3: Payments
1. Create PayPal sandbox account
2. Add PayPal credentials
3. Test in sandbox mode

### Week 2: Production
1. Create production databases (separate!)
2. Create production OAuth apps
3. Get PayPal live credentials
4. Set up in Vercel dashboard

---

## 📊 Complete Variable Reference

See `.env.example` for:
- ✅ All 100+ variables documented
- ✅ Where to get each value
- ✅ Development vs production examples
- ✅ Optional vs required markers
- ✅ Default values where applicable

---

## 🚀 Ready to Start?

**Minimal setup (5 min):**
```bash
cp .env.example .env
# Fill in: DATABASE_URL, MONGODB_URI, NEXTAUTH_SECRET
pnpm install
npx prisma migrate dev
```

**Full setup (30 min):**
Follow QUICK_START_GUIDE.md step by step

---

**Environment configured! Ready to build! 🎉**
