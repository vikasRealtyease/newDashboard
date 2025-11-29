# Database Connection Fix

## Issue
The current DATABASE_URL is using Supabase pooler which might be causing connection timeout issues.

## Solution

1. Go to your Supabase dashboard: https://supabase.com/dashboard
2. Select your project
3. Go to **Settings** → **Database**
4. Under **Connection string**, select **URI** (not Transaction pooler)
5. Copy the connection string

It should look like:
```
postgresql://postgres.[PROJECT-REF]:[PASSWORD]@aws-0-ap-southeast-2.pooler.supabase.com:5432/postgres
```

6. Update your `.env` file in the monorepo root:

```env
DATABASE_URL="postgresql://postgres.fygseueocjduybchefsq:[YOUR-PASSWORD-URL-ENCODED]@db.fygseueocjduybchefsq.supabase.co:5432/postgres"
```

**Important**: URL-encode special characters in your password:
- `?` → `%3F`
- `+` → `%2B`
- `!` → `%21`
- `@` → `%40`
- `#` → `%23`
- `$` → `%24`
- `%` → `%25`
- `&` → `%26`

## Then Run:

```bash
# Generate Prisma client
npx prisma generate --schema=./packages/database/prisma/schema.prisma

# Push schema to database
npx prisma db push --schema=./packages/database/prisma/schema.prisma

# Start dev server
cd apps/web
npm run dev
```

## Current Password
Your current password: `B?QkY+!8jX9m4TF`
URL-encoded: `B%3FQkY%2B%218jX9m4TF`
