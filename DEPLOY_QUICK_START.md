# Quick Start: Deploy Your Monorepo to Vercel

## 🎯 What You Need to Know

Your monorepo contains **5 separate apps** that need to be deployed as **5 separate Vercel projects**.

```
Your Monorepo (1 GitHub Repo)
│
├── apps/web      → Vercel Project #1 (realtyeaseai-web)
├── apps/admin    → Vercel Project #2 (realtyeaseai-admin)
├── apps/client   → Vercel Project #3 (realtyeaseai-client)
├── apps/manager  → Vercel Project #4 (realtyeaseai-manager)
└── apps/va       → Vercel Project #5 (realtyeaseai-va)
```

---

## ⚡ Quick Deploy (5 minutes per app)

### For Each App, Do This:

1. **Go to**: https://vercel.com/new

2. **Import your repository** (same repo for all 5 apps)

3. **Set Root Directory**:
   - Click "Edit" next to Root Directory
   - Select the app folder:
     - `apps/web` for web
     - `apps/admin` for admin
     - `apps/client` for client
     - `apps/manager` for manager
     - `apps/va` for va

4. **Add Environment Variables**:
   - Copy from your `.env` file
   - **Important**: Update `NEXTAUTH_URL` for each app:
     - Web: `https://realtyease.ai`
     - Admin: `https://admin.realtyease.ai`
     - Client: `https://app.realtyease.ai`
     - Manager: `https://manage.realtyease.ai`
     - VA: `https://va.realtyease.ai`

5. **Click Deploy**

6. **Repeat for all 5 apps**

---

## 📋 Environment Variables Template

Copy this for each app and update the URLs:

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
NEXTAUTH_URL=https://[UPDATE-THIS-FOR-EACH-APP]

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

---

## ✅ Deployment Checklist

- [ ] **Step 1**: Deploy Web App (Root: `apps/web`)
- [ ] **Step 2**: Deploy Admin App (Root: `apps/admin`)
- [ ] **Step 3**: Deploy Client App (Root: `apps/client`)
- [ ] **Step 4**: Deploy Manager App (Root: `apps/manager`)
- [ ] **Step 5**: Deploy VA App (Root: `apps/va`)

---

## 🎉 After Deployment

You'll get 5 URLs:
- `realtyeaseai-web.vercel.app`
- `realtyeaseai-admin.vercel.app`
- `realtyeaseai-client.vercel.app`
- `realtyeaseai-manager.vercel.app`
- `realtyeaseai-va.vercel.app`

Test each one to make sure they work!

---

## 🔄 Automatic Updates

From now on, every time you push to GitHub:
- All 5 apps will automatically rebuild and redeploy
- No manual work needed!

---

## 🆘 Troubleshooting

**Build fails?**
1. Check the build logs in Vercel
2. Make sure all environment variables are set
3. Verify the Root Directory is correct (`apps/[app-name]`)

**Need more help?**
See the full guide: `VERCEL_MONOREPO_SETUP.md`

---

**Ready? Start deploying!** 🚀
