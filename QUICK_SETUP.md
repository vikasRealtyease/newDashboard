# Quick Database Setup Guide

## Option 1: Using Docker (Recommended)

```bash
# Start PostgreSQL with Docker
docker run --name realtyease-postgres \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_PASSWORD=password \
  -e POSTGRES_DB=realtyeaseai \
  -p 5432:5432 \
  -d postgres:16

# Verify it's running
docker ps
```

## Option 2: Using Local PostgreSQL

If you have PostgreSQL installed locally:

```bash
# Create database
createdb realtyeaseai

# Or using psql
psql -U postgres -c "CREATE DATABASE realtyeaseai;"
```

## Setup Steps

### 1. Update Environment Variables

The `.env.local` file has been created in `apps/web/.env.local`

**If using Docker (recommended):**
```env
DATABASE_URL="postgresql://postgres:password@localhost:5432/realtyeaseai?schema=public"
```

**If using local PostgreSQL with different credentials:**
```env
DATABASE_URL="postgresql://YOUR_USERNAME:YOUR_PASSWORD@localhost:5432/realtyeaseai?schema=public"
```

### 2. Generate Prisma Client & Run Migrations

```bash
# Navigate to database package
cd packages/database

# Generate Prisma Client
npx prisma generate

# Run migrations
npx prisma migrate dev --name init

# This will create all the tables in your database
```

### 3. Seed Initial Data (Optional)

Create subscription plans:

```bash
# Navigate to database package
cd packages/database

# Create a seed file
npx prisma db seed
```

Or manually run this SQL:

```sql
INSERT INTO "SubscriptionPlan" (id, name, slug, price, "billingInterval", "maxProjects", "maxVAs", "includedAICredits", "isActive", "isPublic")
VALUES
  (gen_random_uuid(), 'Starter', 'starter', 1499, 'MONTHLY', 5, 1, 1000, true, true),
  (gen_random_uuid(), 'Growth', 'growth', 2699, 'MONTHLY', 15, 2, 5000, true, true),
  (gen_random_uuid(), 'Business', 'business', 4299, 'MONTHLY', 50, 5, 15000, true, true),
  (gen_random_uuid(), 'Enterprise', 'enterprise', 6999, 'MONTHLY', NULL, NULL, 50000, true, true);
```

### 4. Restart Dev Server

```bash
# Stop the current server (Ctrl+C)
# Then restart
cd apps/web
npm run dev
```

## Troubleshooting

### Error: "Environment variable not found: DATABASE_URL"
- Make sure `.env.local` exists in `apps/web/`
- Restart your dev server after creating the file

### Error: "Can't reach database server"
- Make sure PostgreSQL is running (check with `docker ps` or `pg_isready`)
- Verify the connection string matches your database credentials

### Error: "Relation does not exist"
- Run migrations: `cd packages/database && npx prisma migrate dev`

### Check Database Connection

```bash
# Using psql
psql -U postgres -d realtyeaseai -c "SELECT version();"

# Or using Docker
docker exec -it realtyease-postgres psql -U postgres -d realtyeaseai -c "SELECT version();"
```

## Quick Test

After setup, test the signup API:

```bash
curl -X POST http://localhost:4000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": "John Doe",
    "email": "john@example.com",
    "phone": "+15551234567",
    "password": "password123"
  }'
```

Should return:
```json
{
  "success": true,
  "user": { ... },
  "message": "Account created successfully"
}
```
