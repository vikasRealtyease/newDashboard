# RealtyEaseAI Web App - Setup Guide

## Database Setup

### 1. Create PostgreSQL Database

```bash
# Using local PostgreSQL
createdb realtyeaseai

# Or using Docker
docker run --name realtyeaseai-postgres -e POSTGRES_PASSWORD=yourpassword -e POSTGRES_DB=realtyeaseai -p 5432:5432 -d postgres
```

### 2. Configure Environment Variables

Copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

Update the `DATABASE_URL` in `.env.local`:

```
DATABASE_URL="postgresql://username:password@localhost:5432/realtyeaseai?schema=public"
```

### 3. Run Prisma Migrations

```bash
# Navigate to the database package
cd ../../packages/database

# Generate Prisma Client
npx prisma generate

# Run migrations
npx prisma migrate dev --name init

# (Optional) Seed the database with initial data
npx prisma db seed
```

### 4. Create Subscription Plans

You need to seed subscription plans in your database. Run this SQL or create a seed script:

```sql
INSERT INTO "SubscriptionPlan" (id, name, slug, price, "billingInterval", "maxProjects", "maxVAs", "includedAICredits", "isActive", "isPublic")
VALUES
  (gen_random_uuid(), 'Starter', 'starter', 1499, 'MONTHLY', 5, 1, 1000, true, true),
  (gen_random_uuid(), 'Growth', 'growth', 2699, 'MONTHLY', 15, 2, 5000, true, true),
  (gen_random_uuid(), 'Business', 'business', 4299, 'MONTHLY', 50, 5, 15000, true, true),
  (gen_random_uuid(), 'Enterprise', 'enterprise', 6999, 'MONTHLY', NULL, NULL, 50000, true, true);
```

## Signup & Onboarding Flow

### How It Works

1. **Signup** (`/signup`)
   - User enters: Full Name, Email, Phone, Password
   - API creates user in database with:
     - User account
     - User profile (firstName, lastName, phone)
     - CLIENT role
     - AI Credits Wallet (initialized at 0)

2. **Onboarding** (`/onboarding`)
   - **Step 1: Business Info** - Company name and industry
   - **Step 2: Select Plan** - Choose subscription plan
   - **Step 3: VA Preferences** - Select services needed

3. **Completion**
   - Creates subscription with 14-day trial
   - Adds trial AI credits to wallet
   - Creates welcome notification
   - Redirects to results page

### API Endpoints

- `POST /api/auth/signup` - Create new user account
- `POST /api/onboarding/complete` - Complete onboarding and setup subscription

## Running the App

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

The app will be available at `http://localhost:4000`

## Features Implemented

✅ User signup with validation
✅ Phone number field in signup
✅ Password hashing with bcryptjs
✅ Database integration with Prisma
✅ 3-step onboarding flow (reduced from 4)
✅ Plan selection with trial period
✅ AI credits wallet initialization
✅ User profile creation
✅ Role-based access control (CLIENT role)
✅ Welcome notifications

## Next Steps

- [ ] Implement authentication (NextAuth.js or similar)
- [ ] Add Google OAuth signup
- [ ] Create login functionality
- [ ] Add session management
- [ ] Implement protected routes
- [ ] Add email verification
- [ ] Connect to MongoDB for messaging/AI logs
- [ ] Implement PayPal subscription integration
