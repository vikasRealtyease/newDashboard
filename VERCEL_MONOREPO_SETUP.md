# Vercel Monorepo Deployment Guide
## Deploy All 5 Apps Automatically from One Repository

---

## 🎯 The Problem You're Facing

When you import your monorepo to Vercel and select the root directory, Vercel tries to deploy only one app (admin in your case) and fails because:

1. **Missing Dependencies**: The build can't find packages like `@realtyeaseai/auth` because it's not installing the entire workspace
2. **Wrong Build Context**: It's trying to build from the app directory instead of the monorepo root
3. **Single App Deployment**: Vercel doesn't automatically deploy all 5 apps from one import

---

## ✅ The Solution: Deploy Each App Separately

You need to create **5 separate Vercel projects**, each pointing to the same GitHub repository but configured for different apps.

---

## 📋 Step-by-Step Deployment

### Step 1: Commit the Vercel Configuration Files

I've created `vercel.json` files for each app. Let's commit and push them:

```bash
cd "C:\Users\Home\Documents\AI Dashboard for SaaS\monorepo"
git add apps/*/vercel.json
git commit -m "Add Vercel configuration for all apps"
git push origin main
```

---

### Step 2: Deploy Web App (Marketing Site)

1. **Go to Vercel Dashboard**: https://vercel.com/new

2. **Import Repository**:
   - Click "Add New..." → "Project"
   - Select your GitHub repository: `realtyeaseai-monorepo`
   - Click "Import"

3. **Configure Project**:
   ```
   Project Name: realtyeaseai-web
   Framework Preset: Next.js
   Root Directory: apps/web
   ```
   
   **IMPORTANT**: Click "Edit" next to Root Directory and select `apps/web`

4. **Build Settings** (Vercel should auto-detect from vercel.json):
   ```
   Build Command: cd ../.. && pnpm install && pnpm build --filter=@realtyeaseai/web
   Output Directory: .next
   Install Command: pnpm install --frozen-lockfile
   ```

5. **Environment Variables**:
   Add all your environment variables from `.env`:
   
   ```env
   # Database
   DATABASE_URL=your-postgresql-url
   MONGODB_URI=your-mongodb-url
   
   # Supabase
   NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   SUPABASE_SERVICE_ROLE_KEY=your-service-key
   
   # Auth
   NEXTAUTH_SECRET=your-secret-key
   NEXTAUTH_URL=https://realtyease.ai
   
   # PayPal
   PAYPAL_MODE=sandbox
   PAYPAL_CLIENT_ID=your-client-id
   PAYPAL_CLIENT_SECRET=your-client-secret
   NEXT_PUBLIC_PAYPAL_CLIENT_ID=your-client-id
   
   # Cloudinary
   CLOUDINARY_CLOUD_NAME=your-cloud-name
   CLOUDINARY_API_KEY=your-api-key
   CLOUDINARY_API_SECRET=your-api-secret
   
   # App URLs
   NEXT_PUBLIC_WEB_URL=https://realtyease.ai
   NEXT_PUBLIC_CLIENT_URL=https://app.realtyease.ai
   NEXT_PUBLIC_ADMIN_URL=https://admin.realtyease.ai
   NEXT_PUBLIC_MANAGER_URL=https://manage.realtyease.ai
   NEXT_PUBLIC_VA_URL=https://va.realtyease.ai
   ```

6. **Click "Deploy"**

---

### Step 3: Deploy Admin App

1. **Add New Project**:
   - Vercel Dashboard → "Add New..." → "Project"
   - Select the **same repository** again

2. **Configure Project**:
   ```
   Project Name: realtyeaseai-admin
   Framework Preset: Next.js
   Root Directory: apps/admin
   ```

3. **Environment Variables**:
   - Copy all variables from the web app
   - **Update**: `NEXTAUTH_URL=https://admin.realtyease.ai`

4. **Click "Deploy"**

---

### Step 4: Deploy Client App

1. **Add New Project**:
   ```
   Project Name: realtyeaseai-client
   Root Directory: apps/client
   ```

2. **Environment Variables**:
   - Copy all variables
   - **Update**: `NEXTAUTH_URL=https://app.realtyease.ai`

3. **Click "Deploy"**

---

### Step 5: Deploy Manager App

1. **Add New Project**:
   ```
   Project Name: realtyeaseai-manager
   Root Directory: apps/manager
   ```

2. **Environment Variables**:
   - Copy all variables
   - **Update**: `NEXTAUTH_URL=https://manage.realtyease.ai`

3. **Click "Deploy"**

---

### Step 6: Deploy VA App

1. **Add New Project**:
   ```
   Project Name: realtyeaseai-va
   Root Directory: apps/va
   ```

2. **Environment Variables**:
   - Copy all variables
   - **Update**: `NEXTAUTH_URL=https://va.realtyease.ai`

3. **Click "Deploy"**

---

## 🎉 Result

After completing all steps, you'll have:

- ✅ **5 Vercel Projects** (one for each app)
- ✅ **5 Deployment URLs**:
  - `realtyeaseai-web.vercel.app`
  - `realtyeaseai-admin.vercel.app`
  - `realtyeaseai-client.vercel.app`
  - `realtyeaseai-manager.vercel.app`
  - `realtyeaseai-va.vercel.app`

---

## 🔄 Automatic Deployments

Once set up, **every push to GitHub** will automatically:

1. Trigger builds for all 5 apps
2. Deploy them in parallel
3. Update all live sites

You don't need to do anything manually!

---

## 🌐 Adding Custom Domains (Optional)

After successful deployment, you can add custom domains:

### For Web App (realtyeaseai-web):
- Go to Project Settings → Domains
- Add: `realtyease.ai` and `www.realtyease.ai`

### For Admin App (realtyeaseai-admin):
- Add: `admin.realtyease.ai`

### For Client App (realtyeaseai-client):
- Add: `app.realtyease.ai`

### For Manager App (realtyeaseai-manager):
- Add: `manage.realtyease.ai`

### For VA App (realtyeaseai-va):
- Add: `va.realtyease.ai`

Vercel will provide DNS records to add to your domain provider.

---

## 🐛 Troubleshooting

### Issue: Build Still Fails with "Cannot find module"

**Solution**: Make sure the build command includes `pnpm install`:

```json
{
  "buildCommand": "cd ../.. && pnpm install && pnpm build --filter=@realtyeaseai/[APP_NAME]"
}
```

The `cd ../..` is crucial - it goes to the monorepo root before running commands.

---

### Issue: "ELIFECYCLE Command failed"

**Possible causes**:
1. Missing environment variables
2. TypeScript errors in your code
3. Missing dependencies

**Solution**:
1. Check Vercel build logs for specific errors
2. Test the build locally first:
   ```bash
   pnpm build --filter=@realtyeaseai/admin
   ```
3. Fix any TypeScript or build errors before deploying

---

### Issue: Environment Variables Not Working

**Solution**:
1. Make sure variables are added to the correct project
2. Redeploy after adding new variables
3. Use `NEXT_PUBLIC_` prefix for client-side variables

---

### Issue: "Root Directory not found"

**Solution**:
1. In Vercel project settings, make sure Root Directory is set correctly
2. It should be `apps/web`, `apps/admin`, etc. (not just `web` or `admin`)

---

## 📊 Vercel Pricing

### Free Tier:
- ✅ Unlimited projects
- ✅ 100GB bandwidth/month
- ✅ Automatic HTTPS
- ❌ Limited to 3 team members
- ❌ Limited concurrent builds

### Pro Tier ($20/month):
- ✅ Everything in Free
- ✅ 1TB bandwidth/month
- ✅ Unlimited team members
- ✅ Concurrent builds (all 5 apps build at once)
- ✅ Advanced analytics

**Recommendation**: Start with Free tier. Upgrade to Pro when you need:
- More than 3 team members
- Faster builds (concurrent)
- More bandwidth

---

## 🎯 Quick Reference

### Build Commands for Each App:

```bash
# Web
cd ../.. && pnpm install && pnpm build --filter=@realtyeaseai/web

# Admin
cd ../.. && pnpm install && pnpm build --filter=@realtyeaseai/admin

# Client
cd ../.. && pnpm install && pnpm build --filter=@realtyeaseai/client

# Manager
cd ../.. && pnpm install && pnpm build --filter=@realtyeaseai/manager

# VA
cd ../.. && pnpm install && pnpm build --filter=@realtyeaseai/va
```

### Test Builds Locally:

```bash
# Test individual app
pnpm build --filter=@realtyeaseai/admin

# Test all apps
pnpm build
```

---

## 📝 Checklist

Before deploying, make sure:

- [ ] All code is committed and pushed to GitHub
- [ ] `vercel.json` files are in each app directory
- [ ] Local builds work: `pnpm build`
- [ ] All environment variables are ready
- [ ] Database is accessible from the internet (not localhost)

After deploying:

- [ ] All 5 projects created in Vercel
- [ ] All deployments successful
- [ ] Environment variables set for each project
- [ ] Test each deployed URL
- [ ] (Optional) Custom domains configured

---

## 🚀 Next Steps

1. **Commit the vercel.json files** (see Step 1)
2. **Deploy each app** following Steps 2-6
3. **Test all deployments**
4. **(Optional) Add custom domains**

---

## 💡 Pro Tips

1. **Use Preview Deployments**: Every PR automatically gets a preview URL
2. **Environment-Specific Variables**: Set different values for Production vs Preview
3. **Monitor Builds**: Check Vercel dashboard for build status and logs
4. **Rollback Feature**: Instantly rollback to previous deployment if something breaks
5. **Analytics**: Enable Vercel Analytics to track performance

---

## 🆘 Need Help?

If you encounter issues:

1. **Check Build Logs**: Vercel Dashboard → Project → Deployments → Click on failed deployment
2. **Test Locally**: Run `pnpm build --filter=@realtyeaseai/[app]` to see if it builds locally
3. **Verify Environment Variables**: Make sure all required variables are set
4. **Check GitHub**: Ensure all code is pushed and up to date

---

**Ready to deploy? Start with Step 1!** 🚀
