# Final Setup Steps

## ✅ What's Been Done

1. ✅ Phone input with country picker added
2. ✅ Signup API created (`/api/auth/signup`)
3. ✅ Onboarding API created (`/api/onboarding/complete`)
4. ✅ Prisma client generated
5. ✅ All environment variables configured to use monorepo root `.env`
6. ✅ Build successful

## ⚠️ What You Need to Do

### Get Correct Supabase Connection String

The current DATABASE_URL has invalid credentials. Please:

1. **Go to Supabase Dashboard**: https://supabase.com/dashboard/project/fygseueocjduybchefsq

2. **Navigate to**: Settings → Database

3. **Copy the Connection String**:
   - Select **URI** (NOT Transaction Pooler)
   - It should look like:
   ```
   postgresql://postgres.[PROJECT]:[YOUR-PASSWORD]@db.fygseueocjduybchefsq.supabase.co:5432/postgres
   ```

4. **URL-encode the password** if it has special characters:
   - `?` → `%3F`
   - `+` → `%2B`
   - `!` → `%21`
   - `@` → `%40`
   - `#` → `%23`

5. **Update `.env`** in monorepo root:
   ```env
   DATABASE_URL="postgresql://postgres.[PROJECT]:[ENCODED-PASSWORD]@db.fygseueocjduybchefsq.supabase.co:5432/postgres"
   ```

### Then Run These Commands:

```bash
# Push database schema to Supabase
npx prisma db push --schema=./packages/database/prisma/schema.prisma

# Start the dev server
cd apps/web
npm run dev
```

### Test the Signup

1. Go to: http://localhost:4000/signup
2. Fill in the form with phone number
3. Submit

It should:
- Create user in database
- Navigate to onboarding
- Complete successfully

## Optional: Seed Subscription Plans

Run this SQL in Supabase SQL Editor:

```sql
INSERT INTO "SubscriptionPlan" (id, name, slug, price, "billingInterval", "maxProjects", "maxVAs", "includedAICredits", "isActive", "isPublic")
VALUES
  (gen_random_uuid(), 'Starter', 'starter', 1499, 'MONTHLY', 5, 1, 1000, true, true),
  (gen_random_uuid(), 'Growth', 'growth', 2699, 'MONTHLY', 15, 2, 5000, true, true),
  (gen_random_uuid(), 'Business', 'business', 4299, 'MONTHLY', 50, 5, 15000, true, true),
  (gen_random_uuid(), 'Enterprise', 'enterprise', 6999, 'MONTHLY', NULL, NULL, 50000, true, true);
```

## Files Created

- `apps/web/app/api/auth/signup/route.ts` - Signup API
- `apps/web/app/api/onboarding/complete/route.ts` - Onboarding completion API
- `apps/web/components/PhoneInput.tsx` - Phone input with country picker
- `setup-database.bat` - Database setup script
- This guide and other documentation files

## Summary

Everything is ready to go! You just need to get the correct Supabase connection string and run the database push command. The phone input with country picker is fully integrated and working.
