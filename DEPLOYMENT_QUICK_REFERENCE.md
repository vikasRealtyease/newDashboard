# Deployment Quick Reference
## One-Page Guide for GitHub + Vercel Setup

---

## 🚀 Complete Deployment Flow

```
Local Development
    ↓
Git Push to GitHub
    ↓
GitHub Actions CI/CD
    ↓
Vercel Auto-Deploy
    ↓
Production Live! 🎉
```

---

## 📋 Prerequisites Checklist

- [ ] GitHub account created
- [ ] Vercel Pro account ($20/month)
- [ ] Domain purchased (realtyease.ai)
- [ ] Supabase project ready
- [ ] MongoDB Atlas ready
- [ ] All environment variables prepared

---

## ⚡ Quick Setup (30 Minutes)

### 1. GitHub Setup (5 min)

```bash
# Initialize git
cd "C:\Users\Home\Documents\AI Dashboard for SaaS\monorepo"
git init

# Create .github directory
mkdir -p .github/workflows

# Add all files
git add .

# Initial commit
git commit -m "Initial commit: Enterprise VA Platform"

# Add GitHub remote
git remote add origin https://github.com/YOUR_USERNAME/realtyeaseai-monorepo.git

# Push to GitHub
git branch -M main
git push -u origin main
```

### 2. Vercel Deployment (20 min)

**For Each App (web, client, admin, manager, va):**

1. Vercel Dashboard → Add New Project
2. Import `realtyeaseai-monorepo`
3. Configure:
   ```
   Project Name: realtyeaseai-{APP_NAME}
   Root Directory: apps/{APP_NAME}
   Build Command: cd ../.. && pnpm build --filter=@realtyeaseai/{APP_NAME}
   Install Command: pnpm install
   ```
4. Add environment variables (copy from .env)
5. Deploy!

### 3. Domain Configuration (5 min)

**DNS Records to Add:**

```
Type: A      Name: @       Value: 76.76.21.21
Type: CNAME  Name: www     Value: cname.vercel-dns.com
Type: CNAME  Name: app     Value: cname.vercel-dns.com
Type: CNAME  Name: admin   Value: cname.vercel-dns.com
Type: CNAME  Name: manage  Value: cname.vercel-dns.com
Type: CNAME  Name: va      Value: cname.vercel-dns.com
```

**Add in Vercel:**
- `realtyeaseai-web` → Domain: `realtyease.ai`
- `realtyeaseai-client` → Domain: `app.realtyease.ai`
- `realtyeaseai-admin` → Domain: `admin.realtyease.ai`
- `realtyeaseai-manager` → Domain: `manage.realtyease.ai`
- `realtyeaseai-va` → Domain: `va.realtyease.ai`

---

## 🔑 Environment Variables Template

**Copy this for each Vercel project:**

```env
# Database
DATABASE_URL=postgresql://...
MONGODB_URI=mongodb+srv://...

# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGci...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGci...

# Auth (UPDATE NEXTAUTH_URL FOR EACH APP!)
NEXTAUTH_SECRET=your-secret-here
NEXTAUTH_URL=https://realtyease.ai  # ← Change per app!

# PayPal (LIVE for production)
PAYPAL_MODE=live
PAYPAL_CLIENT_ID=live-client-id
PAYPAL_CLIENT_SECRET=live-secret
NEXT_PUBLIC_PAYPAL_CLIENT_ID=live-client-id

# Cloudinary
CLOUDINARY_CLOUD_NAME=your-cloud
CLOUDINARY_API_KEY=123456
CLOUDINARY_API_SECRET=secret

# App URLs
NEXT_PUBLIC_WEB_URL=https://realtyease.ai
NEXT_PUBLIC_CLIENT_URL=https://app.realtyease.ai
NEXT_PUBLIC_ADMIN_URL=https://admin.realtyease.ai
NEXT_PUBLIC_MANAGER_URL=https://manage.realtyease.ai
NEXT_PUBLIC_VA_URL=https://va.realtyease.ai

# Optional but recommended
SENTRY_DSN=https://...
NEXT_PUBLIC_SENTRY_DSN=https://...
```

**CRITICAL:** Update `NEXTAUTH_URL` for each app:
- Web: `https://realtyease.ai`
- Client: `https://app.realtyease.ai`
- Admin: `https://admin.realtyease.ai`
- Manager: `https://manage.realtyease.ai`
- VA: `https://va.realtyease.ai`

---

## 🎯 Deployment URLs

| App | Vercel Project Name | Custom Domain | Purpose |
|-----|---------------------|---------------|---------|
| Web | realtyeaseai-web | realtyease.ai | Marketing |
| Client | realtyeaseai-client | app.realtyease.ai | Client Dashboard |
| Admin | realtyeaseai-admin | admin.realtyease.ai | Admin Panel |
| Manager | realtyeaseai-manager | manage.realtyease.ai | Manager Dashboard |
| VA | realtyeaseai-va | va.realtyease.ai | VA Workspace |

---

## 🔄 CI/CD Workflow

**Automatic Deployments:**

```
Push to main → Production Deployment
Push to develop → Preview Deployment
Create PR → Preview with unique URL
```

**Manual Deploy:**
```bash
git add .
git commit -m "feat: add new feature"
git push origin main
# Vercel auto-deploys!
```

---

## ✅ Post-Deployment Checklist

### Immediately After Deploy:

- [ ] All 5 apps accessible via URLs
- [ ] HTTPS working (🔒 in browser)
- [ ] DNS propagated (check with nslookup)
- [ ] SSL certificates active
- [ ] Environment variables set correctly

### Test Critical Flows:

- [ ] User signup/login works
- [ ] OAuth login (Google) works
- [ ] Database connections working
- [ ] API routes responding
- [ ] Payment flow working (test mode first!)
- [ ] File uploads working
- [ ] Navigation between apps working

### Monitoring Setup:

- [ ] Vercel Analytics enabled
- [ ] Sentry error tracking configured
- [ ] Database monitoring active
- [ ] Uptime monitoring configured
- [ ] Alert notifications set up

---

## 🐛 Common Issues & Quick Fixes

### Build Fails

```bash
# Issue: Cannot find module
# Fix: Check pnpm-workspace.yaml exists in root
# Ensure Build Command uses: cd ../.. && pnpm build --filter=...
```

### Environment Variables Not Working

```bash
# Issue: Variables undefined in app
# Fix:
1. Check variable names (case-sensitive!)
2. Use NEXT_PUBLIC_ prefix for client-side vars
3. Redeploy after adding variables
```

### Domain Not Connecting

```bash
# Issue: Domain shows "DNS not configured"
# Fix:
1. Check DNS with: nslookup app.realtyease.ai
2. Wait 24-48 hours for propagation
3. Verify CNAME points to cname.vercel-dns.com
```

### SSL Certificate Not Provisioning

```bash
# Issue: "Certificate pending"
# Fix:
1. Wait for DNS to fully propagate (24-48hrs)
2. Remove and re-add domain in Vercel
3. Check for conflicting DNS records
```

---

## 📊 GitHub Actions Status

**Workflows Created:**
- ✅ `.github/workflows/ci.yml` - Main CI pipeline
- ✅ `.github/PULL_REQUEST_TEMPLATE.md` - PR template
- ✅ `.github/dependabot.yml` - Dependency updates

**What CI Does:**
1. Lint code
2. Type check
3. Build all 5 apps
4. Run tests
5. Security audit

**View Status:**
- GitHub → Actions tab
- Look for ✅ (passing) or ❌ (failing)

---

## 🔐 Security Configuration

### GitHub Secrets to Add:

Go to: Repository → Settings → Secrets → Actions

```
DATABASE_URL
MONGODB_URI
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY
NEXTAUTH_SECRET
NEXTAUTH_URL
PAYPAL_CLIENT_ID
PAYPAL_CLIENT_SECRET
CLOUDINARY_CLOUD_NAME
CLOUDINARY_API_KEY
CLOUDINARY_API_SECRET
```

### Vercel Deployment Protection:

1. Project → Settings → Deployment Protection
2. Enable:
   - ✅ Vercel Authentication (for previews)
   - ✅ Password Protection (for staging)

---

## 💰 Cost Summary

| Service | Plan | Cost | Purpose |
|---------|------|------|---------|
| Vercel | Pro | $20/month | Hosting (5 apps) |
| Supabase | Free | $0 | PostgreSQL database |
| MongoDB Atlas | Free | $0 | MongoDB database |
| Domain | - | ~$15/year | realtyease.ai |
| **Total** | - | **~$20-25/month** | - |

**Additional Costs (if needed):**
- Vercel bandwidth overage: $40/TB (after 1TB)
- Supabase Pro: $25/month (if >500MB data)
- MongoDB upgrade: $57/month (if >512MB data)

---

## 🎓 Common Commands

### Git Commands:

```bash
# Create feature branch
git checkout -b feature/new-feature

# Commit changes
git add .
git commit -m "feat: add new feature"

# Push to GitHub (triggers Vercel deploy)
git push origin main

# Create PR
git push -u origin feature/new-feature
# Then create PR on GitHub
```

### Deployment Commands:

```bash
# Build locally before pushing
pnpm build

# Build specific app
pnpm --filter=@realtyeaseai/web build

# Run all apps locally
pnpm dev

# Check types
pnpm type-check

# Run linter
pnpm lint
```

### Vercel CLI (Optional):

```bash
# Install Vercel CLI
pnpm add -g vercel

# Login
vercel login

# Deploy from CLI
vercel --prod

# Check deployment status
vercel ls

# View logs
vercel logs
```

---

## 📈 Monitoring & Analytics

### Vercel Dashboard:

**For Each Project:**
1. Go to project → Analytics
2. View:
   - Page views
   - Visitors
   - Top pages
   - Performance metrics

### Setup Alerts:

1. Vercel → Integrations
2. Add Slack or Discord
3. Get notified on:
   - Deployment success/failure
   - Build errors
   - Performance issues

---

## 🚦 Traffic Flow

```
User visits realtyease.ai
    ↓
DNS resolves to Vercel
    ↓
Vercel Edge Network (CDN)
    ↓
Next.js App (apps/web)
    ↓
API Routes (serverless functions)
    ↓
Databases (Supabase + MongoDB)
    ↓
Response back to user
```

**Latency:**
- Static pages: ~50ms (CDN cached)
- API routes: ~200ms (serverless)
- Database queries: ~100ms (pooled)

---

## 📞 Support Resources

**Vercel:**
- Docs: https://vercel.com/docs
- Support: https://vercel.com/support
- Community: https://github.com/vercel/next.js/discussions

**GitHub:**
- Actions Docs: https://docs.github.com/actions
- Status: https://www.githubstatus.com

**DNS:**
- Checker: https://dnschecker.org
- Propagation: https://www.whatsmydns.net

---

## 🎯 Final Checklist

### Before Going Live:

- [ ] All 5 apps deployed ✅
- [ ] Custom domains working ✅
- [ ] HTTPS enabled ✅
- [ ] Environment variables set ✅
- [ ] Database migrations run ✅
- [ ] Payment integration tested ✅
- [ ] Monitoring enabled ✅
- [ ] Backups configured ✅
- [ ] Team access granted ✅
- [ ] Documentation updated ✅

### After Going Live:

- [ ] Monitor for first 24 hours
- [ ] Check error rates
- [ ] Verify analytics tracking
- [ ] Test all critical flows
- [ ] Announce launch! 🎉

---

## 🚀 Ready to Deploy?

**Follow these guides in order:**

1. **GITHUB_SETUP.md** - Set up GitHub repository (15 min)
2. **VERCEL_DEPLOYMENT.md** - Deploy all apps (30 min)
3. **This file** - Quick reference for common tasks

**After deployment:**
- Monitor Vercel dashboard
- Check GitHub Actions
- Test production thoroughly
- Celebrate! 🎉

---

**Your Enterprise VA Platform is Live! 🚀**

**Production URLs:**
- 🌐 https://realtyease.ai
- 👤 https://app.realtyease.ai
- ⚙️ https://admin.realtyease.ai
- 📊 https://manage.realtyease.ai
- 💼 https://va.realtyease.ai
