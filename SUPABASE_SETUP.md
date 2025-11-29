# Supabase Setup Guide
## Complete Step-by-Step Instructions

**Time Required:** 10 minutes
**Cost:** FREE (500MB database, enough for development and small production)

---

## 🎯 What You Need from Supabase

You need **3 things** from Supabase:

1. **DATABASE_URL** - PostgreSQL connection string (for Prisma)
2. **NEXT_PUBLIC_SUPABASE_URL** - Your project URL
3. **NEXT_PUBLIC_SUPABASE_ANON_KEY** - Public API key

---

## 📝 Step-by-Step Setup

### Step 1: Create Supabase Account (2 min)

1. Go to **https://supabase.com**
2. Click **"Start your project"**
3. Sign up with:
   - GitHub (recommended) OR
   - Email/password

---

### Step 2: Create New Project (3 min)

1. After login, click **"New Project"**

2. Fill in project details:
   ```
   Name: realtyeaseai
   Database Password: [Generate a strong password - SAVE THIS!]
   Region: Choose closest to you (e.g., "US West" or "Europe")
   Pricing Plan: Free
   ```

3. Click **"Create new project"**

4. **Wait 2-3 minutes** while Supabase provisions your database
   - You'll see a loading screen
   - Don't close the browser

---

### Step 3: Get Your Credentials (5 min)

#### A. Get DATABASE_URL (for Prisma)

1. In your Supabase dashboard, go to:
   ```
   Settings (left sidebar) → Database
   ```

2. Scroll down to **"Connection string"**

3. Select the **"URI"** tab (not "Session mode" or "Transaction mode")

4. You'll see something like:
   ```
   postgresql://postgres.[PROJECT_REF]:[YOUR_PASSWORD]@aws-0-us-west-1.pooler.supabase.com:5432/postgres
   ```

5. **IMPORTANT:** Replace `[YOUR_PASSWORD]` with the password you created in Step 2

6. **Copy this entire string** - this is your `DATABASE_URL`

---

#### B. Get Project URL and Anon Key

1. In Supabase dashboard, go to:
   ```
   Settings → API
   ```

2. You'll see:

   **Project URL:**
   ```
   https://[your-project-ref].supabase.co
   ```
   Copy this - this is `NEXT_PUBLIC_SUPABASE_URL`

   **Project API keys:**
   ```
   anon public: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   ```
   Copy the "anon public" key - this is `NEXT_PUBLIC_SUPABASE_ANON_KEY`

   **(Optional) Service Role Key:**
   ```
   service_role: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   ```
   Copy this too (keep it SECRET!) - this is `SUPABASE_SERVICE_ROLE_KEY`

---

### Step 4: Add to Your .env File

Open your `.env` file in the monorepo root and add:

```env
# ============================================
# SUPABASE (PostgreSQL)
# ============================================

# Database connection for Prisma
DATABASE_URL="postgresql://postgres.[YOUR_PROJECT_REF]:[YOUR_PASSWORD]@aws-0-us-west-1.pooler.supabase.com:5432/postgres"

# Supabase project details
NEXT_PUBLIC_SUPABASE_URL="https://[your-project-ref].supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."

# Service role key (KEEP SECRET - for server-side only)
SUPABASE_SERVICE_ROLE_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

**Replace:**
- `[YOUR_PROJECT_REF]` - Your actual project reference
- `[YOUR_PASSWORD]` - The password you created
- `eyJhbGciOi...` - Your actual keys

---

### Step 5: Test Connection (1 min)

```bash
# Navigate to database package
cd packages/database

# Test if Prisma can connect
npx prisma db pull

# Should show: "Introspecting based on your schema.prisma..."
# If you see errors, check your DATABASE_URL
```

---

## ✅ Verification Checklist

After setup, verify you have:

- [ ] Supabase project created
- [ ] Database password saved somewhere safe
- [ ] DATABASE_URL in .env file
- [ ] NEXT_PUBLIC_SUPABASE_URL in .env file
- [ ] NEXT_PUBLIC_SUPABASE_ANON_KEY in .env file
- [ ] SUPABASE_SERVICE_ROLE_KEY in .env file (optional but recommended)
- [ ] `npx prisma db pull` command works without errors

---

## 🔍 Finding Your Info Later

If you lose your credentials:

**Database URL:**
```
Settings → Database → Connection string → URI tab
```

**Project URL & Keys:**
```
Settings → API
```

**Reset Database Password:**
```
Settings → Database → Database password → Reset
```

---

## 🎯 Example .env File

Here's what your complete .env should look like:

```env
# ============================================
# DATABASE (PostgreSQL - Supabase)
# ============================================
DATABASE_URL="postgresql://postgres.abcdefghijklmnop:MySecurePassword123!@aws-0-us-west-1.pooler.supabase.com:5432/postgres"

# ============================================
# SUPABASE
# ============================================
NEXT_PUBLIC_SUPABASE_URL="https://abcdefghijklmnop.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFiY2RlZmdoaWprbG1ub3AiLCJyb2xlIjoiYW5vbiIsImlhdCI6MTYyMzQ1Njc4OSwiZXhwIjoxOTM5MDMyNzg5fQ.abcdefghijklmnopqrstuvwxyz1234567890"
SUPABASE_SERVICE_ROLE_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFiY2RlZmdoaWprbG1ub3AiLCJyb2xlIjoic2VydmljZV9yb2xlIiwiaWF0IjoxNjIzNDU2Nzg5LCJleHAiOjE5MzkwMzI3ODl9.1234567890abcdefghijklmnopqrstuvwxyz"
```

---

## 🐛 Common Issues & Fixes

### Issue 1: "Can't reach database server"

**Cause:** Wrong DATABASE_URL or password

**Fix:**
1. Go to Supabase Settings → Database
2. Copy the URI connection string again
3. Make sure you replaced `[YOUR_PASSWORD]` with actual password
4. Password should NOT have brackets

---

### Issue 2: "Environment variable not found: DATABASE_URL"

**Cause:** .env file not in the right location

**Fix:**
1. Ensure .env is in **monorepo root directory**
2. Not in packages/database - in the ROOT
3. Path should be: `C:\Users\Home\Documents\AI Dashboard for SaaS\monorepo\.env`

---

### Issue 3: Prisma can't connect

**Cause:** Connection pooler issue

**Fix:** Use the **Session mode** connection string instead:

```
Settings → Database → Connection string → Session mode (6543)
```

Update DATABASE_URL to use port `6543` instead of `5432`:
```env
DATABASE_URL="postgresql://postgres.[REF]:[PASSWORD]@aws-0-us-west-1.pooler.supabase.com:6543/postgres"
```

---

### Issue 4: "Password authentication failed"

**Cause:** Wrong password in connection string

**Fix:**
1. Reset your database password in Supabase
2. Settings → Database → Database password → Reset password
3. Save the new password
4. Update DATABASE_URL in .env

---

## 💡 Pro Tips

### 1. Use Environment-Specific URLs

For production, create a separate Supabase project:

```env
# Development (.env.local)
DATABASE_URL="postgresql://postgres.dev-ref:password@..."

# Production (.env.production)
DATABASE_URL="postgresql://postgres.prod-ref:password@..."
```

### 2. Enable Connection Pooling

Already enabled by default in the URI! The pooler endpoint optimizes connections.

### 3. Check Database Health

Go to Supabase Dashboard → Database → Reports to see:
- Connection count
- Query performance
- Storage usage

### 4. Backup Your Database

Supabase automatically backs up:
- Free plan: Daily backups (7 days retention)
- You can also manually backup via Dashboard

---

## 🔒 Security Best Practices

### DO:
✅ Use the **ANON KEY** for client-side (it's safe, designed for public use)
✅ Use **SERVICE ROLE KEY** only server-side (never expose in browser)
✅ Use different passwords for dev and production
✅ Enable Row Level Security (RLS) in Supabase for extra security

### DON'T:
❌ Don't commit .env to git (it's in .gitignore)
❌ Don't share your service role key
❌ Don't use production credentials in development

---

## 🎓 Understanding the Keys

**ANON KEY (Public - Safe to use in browser):**
- Used for client-side Supabase queries
- Has limited permissions (read public data only)
- Can't bypass Row Level Security
- Safe to expose in your Next.js app

**SERVICE ROLE KEY (Private - Server-side only):**
- Full admin access to database
- Bypasses all security rules
- Use ONLY in API routes (server-side)
- Never send to browser

---

## 📊 What You Can Do Now

With Supabase connected, you can:

✅ Run Prisma migrations
✅ Seed your database
✅ Query from API routes
✅ Use Supabase client for real-time features
✅ Access database via Supabase Studio (GUI)

---

## 🎯 Next Steps

1. ✅ Supabase account created
2. ✅ Credentials added to .env
3. ⏩ **Next:** Run migrations
   ```bash
   cd packages/database
   npx prisma migrate dev --name init
   ```

4. ⏩ **Then:** Seed the database
   ```bash
   npx prisma db seed
   ```

---

## 📞 Still Stuck?

If you're having issues:

1. **Check Supabase status:** https://status.supabase.com
2. **Verify credentials:** Copy them again fresh from dashboard
3. **Check .env location:** Must be in monorepo root
4. **Test with Prisma Studio:** `npx prisma studio`

---

**That's it! You're connected to Supabase! 🎉**

**Next:** Follow QUICK_START_GUIDE.md Step 4 (Database Setup)
