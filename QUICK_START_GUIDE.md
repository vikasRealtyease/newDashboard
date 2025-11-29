# Quick Start Guide
## Get Your Enterprise Platform Running in 1 Hour

**Goal:** Get database connected, migrations run, and see your first API response

---

## ⚡ Super Fast Setup (30 minutes)

### Step 1: Install Dependencies (5 min)

```bash
# Navigate to monorepo root
cd "C:\Users\Home\Documents\AI Dashboard for SaaS\monorepo"

# Install pnpm globally if needed
npm install -g pnpm

# Install all dependencies
pnpm install
```

---

### Step 2: Set Up Services (10 min)

#### A. MongoDB Atlas (Free - 5 min)
1. Go to https://www.mongodb.com/cloud/atlas
2. Create account → Create free cluster (M0)
3. Create database user
4. Whitelist IP: `0.0.0.0/0` (allow from anywhere)
5. Get connection string

#### B. Supabase (Free - 5 min)
1. Go to https://supabase.com
2. Create project
3. Go to Settings → Database → Connection string
4. Copy URI mode connection string
5. Copy anon key from Settings → API

---

### Step 3: Configure Environment (5 min)

Create `.env` in root:

```bash
# Copy example
cp .env.example .env

# Edit .env and add:
```

```env
# PostgreSQL (Supabase)
DATABASE_URL="postgresql://postgres.[your-project-ref]:[your-password]@aws-0-us-west-1.pooler.supabase.com:5432/postgres"

# MongoDB Atlas
MONGODB_URI="mongodb+srv://[username]:[password]@cluster0.xxxxx.mongodb.net/realtyeaseai"

# NextAuth
NEXTAUTH_SECRET="[run: openssl rand -base64 32]"
NEXTAUTH_URL="http://localhost:3000"

# Google OAuth (Optional for now)
GOOGLE_CLIENT_ID=""
GOOGLE_CLIENT_SECRET=""

# Supabase
NEXT_PUBLIC_SUPABASE_URL="https://[your-project-ref].supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="[your-anon-key]"

# PayPal (Use sandbox for testing)
PAYPAL_CLIENT_ID="[sandbox-client-id]"
PAYPAL_CLIENT_SECRET="[sandbox-secret]"
NEXT_PUBLIC_PAYPAL_CLIENT_ID="[sandbox-client-id]"

# Cloudinary (Optional for now)
CLOUDINARY_CLOUD_NAME=""
CLOUDINARY_API_KEY=""
CLOUDINARY_API_SECRET=""
```

**Generate NEXTAUTH_SECRET:**
```bash
# On Windows PowerShell
[Convert]::ToBase64String((1..32|%{Get-Random -Maximum 256}))

# On Mac/Linux
openssl rand -base64 32
```

---

### Step 4: Database Setup (10 min)

```bash
# Navigate to database package
cd packages/database

# Generate Prisma client
npx prisma generate

# Create and run migrations
npx prisma migrate dev --name initial_setup

# Seed the database
npx prisma db seed
```

**Expected Output:**
```
✅ Database migrations completed
✅ Prisma client generated
✅ Seed data created successfully!
📧 Admin email: admin@realtyease.ai
🔑 Admin password: Admin@12345
💰 3 subscription plans created
```

---

### Step 5: Test Everything (5 min)

```bash
# Go back to root
cd ../..

# Start development server
pnpm dev
```

**Open browser:**
- Web app: http://localhost:3000
- Admin: http://localhost:3002
- Client: http://localhost:3005
- Manager: http://localhost:3003
- VA: http://localhost:3004

**Test Login:**
- Email: `admin@realtyease.ai`
- Password: `Admin@12345`

---

## 🎯 What You Have Now

After these steps, you have:

✅ **Database:** PostgreSQL with 25+ tables migrated
✅ **MongoDB:** Connected and ready for messages/files
✅ **Auth:** NextAuth configured (email/password working)
✅ **Plans:** 3 subscription plans in database
✅ **Admin User:** Ready to test with
✅ **AI Wallet:** Admin has 10,000 test credits
✅ **All Apps:** Running on different ports

---

## 🚀 Next Steps (Choose Your Path)

### Option A: Build API Routes (Recommended)
**Time:** 2-3 hours
**Impact:** Backend functional

Create your first API endpoint:

```typescript
// apps/client/app/api/subscriptions/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@realtyeaseai/auth';
import { prisma } from '@realtyeaseai/database';

export async function GET(request: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get user's active subscription
    const subscription = await prisma.subscription.findFirst({
      where: {
        userId: session.user.id,
        status: 'ACTIVE'
      },
      include: {
        plan: true
      }
    });

    // Get AI wallet balance
    const wallet = await prisma.aICreditsWallet.findUnique({
      where: { userId: session.user.id }
    });

    return NextResponse.json({
      subscription,
      aiWallet: wallet
    });
  } catch (error) {
    console.error('Subscription fetch error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
```

Test it: http://localhost:3005/api/subscriptions

---

### Option B: Connect Dashboard to Data
**Time:** 3-4 hours
**Impact:** UI shows real data

Update dashboard to show subscription info:

```typescript
// apps/client/app/dashboard/page.tsx
'use client';

import { useEffect, useState } from 'react';

export default function DashboardPage() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    fetch('/api/subscriptions')
      .then(res => res.json())
      .then(setData);
  }, []);

  if (!data) return <div>Loading...</div>;

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>

      {/* Subscription Card */}
      <div className="bg-white p-6 rounded-lg shadow mb-6">
        <h2 className="text-xl font-semibold mb-4">Your Plan</h2>
        <p className="text-2xl font-bold text-blue-600">
          {data.subscription?.plan?.name || 'No Active Plan'}
        </p>
        <p className="text-gray-600">
          ${data.subscription?.plan?.price}/month
        </p>
      </div>

      {/* AI Credits Card */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">AI Credits</h2>
        <p className="text-2xl font-bold text-green-600">
          {data.aiWallet?.balance?.toLocaleString() || 0} credits
        </p>
        <button className="mt-4 bg-blue-500 text-white px-6 py-2 rounded">
          Buy More Credits
        </button>
      </div>
    </div>
  );
}
```

---

### Option C: Add Payment Integration
**Time:** 4-5 hours
**Impact:** Users can buy subscriptions

Follow FULL_IMPLEMENTATION_PLAN.md Week 3 for PayPal integration

---

## 📚 Reference Documents

Now that you're set up, refer to these documents:

1. **FULL_IMPLEMENTATION_PLAN.md** - Complete 5-week roadmap
2. **ENTERPRISE_SECURITY_IMPLEMENTATION.md** - Security features
3. **COMPLETE_GAP_ANALYSIS.md** - What's missing and why
4. **DATABASE_STRATEGY.md** - Database architecture
5. **AUTH_STRATEGY.md** - Authentication details

---

## 🐛 Troubleshooting

### Database Connection Error
```
Error: Can't reach database server
```
**Fix:** Check DATABASE_URL format, ensure Supabase allows connections

### MongoDB Connection Error
```
MongoServerError: Authentication failed
```
**Fix:** Check MONGODB_URI, verify username/password

### Prisma Migration Error
```
Error: Environment variable not found: DATABASE_URL
```
**Fix:** Ensure .env file is in root directory

### Port Already in Use
```
Error: Port 3000 is already in use
```
**Fix:** Kill the process or change port in package.json

---

## 💡 Pro Tips

1. **Use Database GUI:**
   - PostgreSQL: Download Supabase Studio or PgAdmin
   - MongoDB: Use MongoDB Compass

2. **Check Logs:**
   - Browser console for frontend errors
   - Terminal for backend errors

3. **Test APIs:**
   - Use Postman or Thunder Client
   - Or browser DevTools Network tab

4. **Hot Reload:**
   - Changes auto-reload in dev mode
   - If stuck, restart with Ctrl+C and `pnpm dev`

---

## 🎉 You're Ready!

You now have:
- ✅ All databases connected
- ✅ Schema migrated
- ✅ Seed data loaded
- ✅ Apps running
- ✅ Authentication working

**Next:** Start building API routes or connecting dashboards to real data!

Need help? Check the detailed implementation plan or security guide.

---

**Happy Coding! 🚀**
