# Vercel Deployment Guide
## Deploy Multi-App Monorepo with Custom Domains & Subdomains

**Time Required:** 30 minutes
**Cost:** Vercel Pro ($20/month) - **Required for 5 apps**

---

## 🎯 Deployment Architecture

```
Domain Structure:
├── realtyease.ai                    → apps/web (Marketing site)
├── app.realtyease.ai                → apps/client (Client dashboard)
├── admin.realtyease.ai              → apps/admin (Admin dashboard)
├── manage.realtyease.ai             → apps/manager (Manager dashboard)
└── va.realtyease.ai                 → apps/va (VA dashboard)
```

**Each app gets:**
- ✅ Independent deployment
- ✅ Custom subdomain
- ✅ Automatic HTTPS
- ✅ Edge caching
- ✅ Serverless functions

---

## 📋 Prerequisites

### 1. Vercel Account Setup

1. **Go to:** https://vercel.com/signup
2. **Sign up with GitHub** (recommended)
3. **Choose plan:** Vercel Pro ($20/month)
   - **Why Pro?** Free tier limits:
     - 3 team members max
     - 100GB bandwidth/month
     - Limited concurrent builds
   - **Pro benefits:**
     - Unlimited team members
     - 1TB bandwidth/month
     - Concurrent builds
     - Custom domains (5+)
     - Advanced analytics

### 2. Domain Purchase

**Option 1: Buy from Vercel** (easiest)
- Go to Vercel → Domains
- Search for your domain
- Purchase (~$15-20/year)

**Option 2: Use Existing Domain**
- You can use domains from GoDaddy, Namecheap, etc.
- You'll update DNS settings to point to Vercel

---

## 🚀 Step-by-Step Deployment

### Step 1: Connect GitHub Repository (5 min)

1. **Go to:** https://vercel.com/new

2. **Import Git Repository:**
   - Click "Import Project"
   - Select "Import Git Repository"
   - Choose your GitHub account
   - Search for `realtyeaseai-monorepo`
   - Click "Import"

3. **Configure Build Settings:**
   - Vercel will auto-detect it's a monorepo
   - Don't deploy yet - we need to configure each app separately

---

### Step 2: Deploy Web App (Main Domain) (5 min)

1. **In Vercel Dashboard:**
   - Click "Add New..." → "Project"
   - Import your monorepo again
   - This time, configure for the web app

2. **Project Settings:**
   ```
   Project Name: realtyeaseai-web
   Framework Preset: Next.js
   Root Directory: apps/web
   Build Command: cd ../.. && pnpm build --filter=@realtyeaseai/web
   Output Directory: .next
   Install Command: pnpm install
   ```

3. **Environment Variables:**
   Click "Environment Variables" and add all from your `.env`:

   ```env
   # Database
   DATABASE_URL=postgresql://...
   MONGODB_URI=mongodb+srv://...

   # Supabase
   NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGci...
   SUPABASE_SERVICE_ROLE_KEY=eyJhbGci...

   # Auth
   NEXTAUTH_SECRET=your-secret
   NEXTAUTH_URL=https://realtyease.ai

   # PayPal (LIVE mode for production)
   PAYPAL_MODE=live
   PAYPAL_CLIENT_ID=live-client-id
   PAYPAL_CLIENT_SECRET=live-secret
   NEXT_PUBLIC_PAYPAL_CLIENT_ID=live-client-id

   # Cloudinary
   CLOUDINARY_CLOUD_NAME=your-cloud
   CLOUDINARY_API_KEY=123456
   CLOUDINARY_API_SECRET=secret

   # URLs
   NEXT_PUBLIC_WEB_URL=https://realtyease.ai
   NEXT_PUBLIC_CLIENT_URL=https://app.realtyease.ai
   NEXT_PUBLIC_ADMIN_URL=https://admin.realtyease.ai
   NEXT_PUBLIC_MANAGER_URL=https://manage.realtyease.ai
   NEXT_PUBLIC_VA_URL=https://va.realtyease.ai

   # Optional
   SENTRY_DSN=https://...
   NEXT_PUBLIC_SENTRY_DSN=https://...
   ```

4. **Click "Deploy"**
   - Wait 2-3 minutes for build
   - You'll get a URL like: `realtyeaseai-web.vercel.app`

---

### Step 3: Deploy Client App (app.realtyease.ai) (5 min)

1. **Add New Project:**
   - Vercel Dashboard → "Add New..." → "Project"
   - Import same repository

2. **Project Settings:**
   ```
   Project Name: realtyeaseai-client
   Framework Preset: Next.js
   Root Directory: apps/client
   Build Command: cd ../.. && pnpm build --filter=@realtyeaseai/client
   Output Directory: .next
   Install Command: pnpm install
   ```

3. **Environment Variables:**
   - Copy all variables from web app
   - Update `NEXTAUTH_URL=https://app.realtyease.ai`

4. **Click "Deploy"**

---

### Step 4: Deploy Admin App (admin.realtyease.ai) (5 min)

1. **Add New Project:**
   ```
   Project Name: realtyeaseai-admin
   Root Directory: apps/admin
   Build Command: cd ../.. && pnpm build --filter=@realtyeaseai/admin
   ```

2. **Environment Variables:**
   - Copy all variables
   - Update `NEXTAUTH_URL=https://admin.realtyease.ai`

3. **Click "Deploy"**

---

### Step 5: Deploy Manager App (manage.realtyease.ai) (5 min)

1. **Add New Project:**
   ```
   Project Name: realtyeaseai-manager
   Root Directory: apps/manager
   Build Command: cd ../.. && pnpm build --filter=@realtyeaseai/manager
   ```

2. **Environment Variables:**
   - Copy all variables
   - Update `NEXTAUTH_URL=https://manage.realtyease.ai`

3. **Click "Deploy"**

---

### Step 6: Deploy VA App (va.realtyease.ai) (5 min)

1. **Add New Project:**
   ```
   Project Name: realtyeaseai-va
   Root Directory: apps/va
   Build Command: cd ../.. && pnpm build --filter=@realtyeaseai/va
   ```

2. **Environment Variables:**
   - Copy all variables
   - Update `NEXTAUTH_URL=https://va.realtyease.ai`

3. **Click "Deploy"**

---

## 🌐 Domain & Subdomain Configuration

### Step 7: Add Custom Domain to Web App (3 min)

1. **Go to:** `realtyeaseai-web` project → Settings → Domains

2. **Add Domain:**
   ```
   Domain: realtyease.ai
   ```

3. **Vercel will provide DNS records:**
   ```
   Type: A
   Name: @
   Value: 76.76.21.21

   Type: CNAME
   Name: www
   Value: cname.vercel-dns.com
   ```

4. **Add these to your domain provider's DNS settings**

---

### Step 8: Add Subdomains to Other Apps (10 min)

#### For Client App:

1. **Go to:** `realtyeaseai-client` → Settings → Domains
2. **Add Domain:** `app.realtyease.ai`
3. **Vercel provides:**
   ```
   Type: CNAME
   Name: app
   Value: cname.vercel-dns.com
   ```

#### For Admin App:

1. **Go to:** `realtyeaseai-admin` → Settings → Domains
2. **Add Domain:** `admin.realtyease.ai`
3. **Vercel provides:**
   ```
   Type: CNAME
   Name: admin
   Value: cname.vercel-dns.com
   ```

#### For Manager App:

1. **Go to:** `realtyeaseai-manager` → Settings → Domains
2. **Add Domain:** `manage.realtyease.ai`
3. **Vercel provides:**
   ```
   Type: CNAME
   Name: manage
   Value: cname.vercel-dns.com
   ```

#### For VA App:

1. **Go to:** `realtyeaseai-va` → Settings → Domains
2. **Add Domain:** `va.realtyease.ai`
3. **Vercel provides:**
   ```
   Type: CNAME
   Name: va
   Value: cname.vercel-dns.com
   ```

---

## 🔧 DNS Configuration Guide

### If Using GoDaddy:

1. **Login to GoDaddy**
2. **My Products → Domains → DNS**
3. **Add/Edit DNS Records:**

   ```
   # Main domain (web app)
   Type: A
   Name: @
   Value: 76.76.21.21
   TTL: 600

   # WWW redirect
   Type: CNAME
   Name: www
   Value: cname.vercel-dns.com
   TTL: 600

   # Client subdomain
   Type: CNAME
   Name: app
   Value: cname.vercel-dns.com
   TTL: 600

   # Admin subdomain
   Type: CNAME
   Name: admin
   Value: cname.vercel-dns.com
   TTL: 600

   # Manager subdomain
   Type: CNAME
   Name: manage
   Value: cname.vercel-dns.com
   TTL: 600

   # VA subdomain
   Type: CNAME
   Name: va
   Value: cname.vercel-dns.com
   TTL: 600
   ```

4. **Save Changes**
5. **Wait 5-10 minutes for DNS propagation**

---

### If Using Namecheap:

1. **Login to Namecheap**
2. **Domain List → Manage → Advanced DNS**
3. **Add Records:** (same as GoDaddy above)

---

### If Using Cloudflare:

1. **Login to Cloudflare**
2. **Select Domain → DNS → Records**
3. **Add Records:** (same values)
4. **Set Proxy Status:** DNS only (gray cloud) for initial setup
5. **After working, enable proxy (orange cloud) for CDN**

---

## ✅ Verification Checklist

### DNS Propagation Check:

```bash
# Check main domain
nslookup realtyease.ai

# Check subdomains
nslookup app.realtyease.ai
nslookup admin.realtyease.ai
nslookup manage.realtyease.ai
nslookup va.realtyease.ai

# Or use online tool:
# https://dnschecker.org
```

### SSL Certificate Check:

After DNS propagates (5-30 minutes):
1. Visit each domain
2. Vercel automatically provisions SSL certificates
3. All domains should show 🔒 HTTPS

---

## 🎯 Vercel Project Configuration

### Build & Development Settings

For each app, configure in Vercel → Settings:

#### Build Settings:
```
Framework Preset: Next.js
Node.js Version: 20.x
Build Command: cd ../.. && pnpm build --filter=@realtyeaseai/{APP_NAME}
Output Directory: .next
Install Command: pnpm install
Development Command: pnpm dev
```

#### Root Directory:
```
apps/web → Root: apps/web
apps/client → Root: apps/client
apps/admin → Root: apps/admin
apps/manager → Root: apps/manager
apps/va → Root: apps/va
```

---

## 🔐 Security Configuration

### 1. Environment Variables

**Production vs Preview:**

In Vercel, you can set different values for:
- **Production:** Used when deploying to main branch
- **Preview:** Used for PR previews
- **Development:** Used locally

Example:
```
Environment: Production
PAYPAL_MODE=live

Environment: Preview
PAYPAL_MODE=sandbox

Environment: Development
PAYPAL_MODE=sandbox
```

### 2. Deployment Protection

**Go to:** Project → Settings → Deployment Protection

Enable:
- ✅ **Vercel Authentication** - Require login to view preview deployments
- ✅ **Password Protection** - Add password for staging
- ✅ **Trusted IPs** - Whitelist specific IPs (optional)

### 3. CORS Configuration

Add to your API routes:

```typescript
// apps/*/src/middleware.ts
export function middleware(request: NextRequest) {
  const origin = request.headers.get('origin');

  const allowedOrigins = [
    'https://realtyease.ai',
    'https://www.realtyease.ai',
    'https://app.realtyease.ai',
    'https://admin.realtyease.ai',
    'https://manage.realtyease.ai',
    'https://va.realtyease.ai',
  ];

  if (origin && allowedOrigins.includes(origin)) {
    return NextResponse.next({
      headers: {
        'Access-Control-Allow-Origin': origin,
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
    });
  }

  return NextResponse.next();
}
```

---

## 🚀 Continuous Deployment

### Automatic Deployments

Vercel automatically deploys when you:
- ✅ Push to `main` branch → Production deployment
- ✅ Push to `develop` branch → Preview deployment
- ✅ Create Pull Request → Preview deployment with unique URL

### Deployment Workflow:

```
git push origin main
  ↓
GitHub triggers Vercel
  ↓
Vercel builds all 5 apps in parallel
  ↓
Deploy to production domains
  ↓
Automatic HTTPS certificates
  ↓
CDN cache invalidation
  ↓
Deployment complete! 🎉
```

---

## 📊 Monitoring & Analytics

### Vercel Analytics

Enable in each project:
1. **Go to:** Project → Analytics
2. **Click "Enable"**
3. **View:**
   - Page views
   - Unique visitors
   - Top pages
   - Real User Monitoring (RUM)

### Custom Analytics Integration

Add to each app:

```typescript
// apps/*/src/app/layout.tsx
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
```

Install dependencies:
```bash
pnpm add @vercel/analytics @vercel/speed-insights
```

---

## 🎛️ Advanced Configuration

### 1. Vercel Configuration File

Create `vercel.json` in each app directory:

```json
// apps/web/vercel.json
{
  "buildCommand": "cd ../.. && pnpm build --filter=@realtyeaseai/web",
  "devCommand": "pnpm dev",
  "installCommand": "pnpm install",
  "framework": "nextjs",
  "outputDirectory": ".next",
  "regions": ["iad1"],
  "env": {
    "NEXT_PUBLIC_APP_URL": "https://realtyease.ai"
  },
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-XSS-Protection",
          "value": "1; mode=block"
        }
      ]
    }
  ]
}
```

### 2. Redirects & Rewrites

```json
// apps/web/vercel.json (continued)
{
  "redirects": [
    {
      "source": "/home",
      "destination": "/",
      "permanent": true
    }
  ],
  "rewrites": [
    {
      "source": "/api/:path*",
      "destination": "/api/:path*"
    }
  ]
}
```

### 3. Edge Functions (Optional)

For ultra-fast global responses:

```typescript
// apps/*/src/middleware.ts
export const config = {
  matcher: ['/api/:path*'],
};

export default async function middleware(req: NextRequest) {
  // Runs on Vercel Edge Network (globally)
  // Ultra-low latency
}
```

---

## 💰 Cost Breakdown

### Vercel Pro Plan: $20/month

Includes:
- ✅ 5 concurrent projects (perfect for your 5 apps)
- ✅ 1TB bandwidth
- ✅ Unlimited team members
- ✅ Custom domains (unlimited)
- ✅ Analytics
- ✅ Speed Insights
- ✅ Priority support

### Additional Costs:

- Domain: ~$15/year (realtyease.ai)
- Overage (if >1TB bandwidth): $40/TB
- Functions (serverless): 1M executions free, then $2/M

**Typical monthly cost:** $20-30 total

---

## 🐛 Troubleshooting

### Issue 1: Build Fails

**Error:** `Cannot find module '@realtyeaseai/ui'`

**Fix:**
```json
// Ensure pnpm-workspace.yaml is in root
{
  "installCommand": "pnpm install --frozen-lockfile"
}
```

---

### Issue 2: Environment Variables Not Working

**Fix:**
1. Check variable names (case-sensitive)
2. Redeploy after adding variables
3. Use `NEXT_PUBLIC_` prefix for client-side vars

---

### Issue 3: Domain Not Connecting

**Fix:**
1. Check DNS records with `nslookup`
2. Wait 24-48 hours for full propagation
3. Verify no conflicting CNAME/A records
4. Check Vercel domain status

---

### Issue 4: SSL Certificate Not Provisioning

**Fix:**
1. Ensure DNS is fully propagated
2. Remove and re-add domain in Vercel
3. Check for CAA DNS records blocking Vercel
4. Contact Vercel support if >48 hours

---

## 📈 Performance Optimization

### 1. Enable Edge Caching

```typescript
// apps/*/src/app/api/*/route.ts
export const runtime = 'edge'; // Enable edge runtime
export const revalidate = 3600; // Cache for 1 hour
```

### 2. Image Optimization

```typescript
// Use Next.js Image component
import Image from 'next/image';

<Image
  src="/hero.jpg"
  width={1200}
  height={600}
  alt="Hero"
  priority
/>
```

### 3. Static Page Generation

```typescript
// apps/web/src/app/page.tsx
export const revalidate = 60; // Regenerate every 60s

export default async function Page() {
  // Fetch data at build time
}
```

---

## 🎯 Deployment Checklist

### Before Going Live:

- [ ] All 5 apps deployed to Vercel
- [ ] Custom domains configured
- [ ] DNS records added (wait 24-48hrs)
- [ ] SSL certificates active (🔒 HTTPS)
- [ ] Environment variables set for production
- [ ] NEXTAUTH_URL updated for each app
- [ ] PayPal switched to LIVE mode
- [ ] Database migrations run on production DB
- [ ] Monitoring enabled (Sentry, Vercel Analytics)
- [ ] Test all apps in production
- [ ] Test authentication flows
- [ ] Test payment integration
- [ ] Set up alerts (Vercel → Integrations → Slack)

---

## 🎓 Best Practices

### DO ✅

1. **Use Preview Deployments**
   - Test changes before merging to main
   - Share preview URLs with team
   - Automatic for every PR

2. **Set Up Staging Environment**
   - Use `develop` branch for staging
   - Separate database for staging
   - Test integrations before production

3. **Monitor Performance**
   - Use Vercel Analytics
   - Set up Sentry for errors
   - Monitor API response times

4. **Implement Rollbacks**
   - Keep production-ready branches
   - Use Vercel instant rollback feature
   - Test rollback process

5. **Use Environment-Specific Configs**
   - Development: localhost URLs, sandbox payments
   - Preview: preview URLs, sandbox payments
   - Production: custom domains, live payments

### DON'T ❌

1. **Don't Commit Secrets to Git**
   - Use Vercel environment variables
   - Never commit `.env` files

2. **Don't Deploy Untested Code to Production**
   - Always test in preview first
   - Use PR reviews
   - Run automated tests

3. **Don't Ignore Build Warnings**
   - Fix TypeScript errors
   - Optimize bundle size
   - Remove unused dependencies

4. **Don't Skip Database Migrations**
   - Run migrations before deploying
   - Test migrations on staging first
   - Have rollback plan

---

## 🚦 Post-Deployment

### 1. Verify All Apps

```bash
# Check each domain
curl -I https://realtyease.ai
curl -I https://app.realtyease.ai
curl -I https://admin.realtyease.ai
curl -I https://manage.realtyease.ai
curl -I https://va.realtyease.ai

# All should return: HTTP/2 200
```

### 2. Test Critical Flows

- [ ] User signup/login
- [ ] Password reset
- [ ] OAuth login (Google)
- [ ] Subscription purchase
- [ ] AI credits purchase
- [ ] Payment processing
- [ ] File uploads
- [ ] Real-time messaging

### 3. Monitor for 24 Hours

- Check Vercel deployment logs
- Monitor error rates in Sentry
- Watch for failed payments
- Review API response times

---

## 📞 Support Resources

**Vercel Support:**
- Documentation: https://vercel.com/docs
- Community: https://github.com/vercel/next.js/discussions
- Support: https://vercel.com/support

**DNS Help:**
- DNS Checker: https://dnschecker.org
- What's My DNS: https://www.whatsmydns.net

---

## 🎯 Next Steps

1. ✅ All 5 apps deployed to Vercel
2. ✅ Custom domains configured
3. ✅ DNS records added
4. ⏩ **Next:** Run database migrations in production
5. ⏩ **Then:** Test all features end-to-end
6. ⏩ **Finally:** Launch! 🚀

---

**All Apps Deployed! Your Platform is LIVE! 🎉**

**Production URLs:**
- 🌐 **Marketing:** https://realtyease.ai
- 👤 **Client Portal:** https://app.realtyease.ai
- ⚙️ **Admin Panel:** https://admin.realtyease.ai
- 📊 **Manager Dashboard:** https://manage.realtyease.ai
- 💼 **VA Workspace:** https://va.realtyease.ai
