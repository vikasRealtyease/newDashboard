@echo off
echo ============================================
echo  RealtyEaseAI Database Setup
echo ============================================
echo.

echo Step 1: Generating Prisma Client...
npx prisma generate --schema=./packages/database/prisma/schema.prisma
if errorlevel 1 (
    echo ERROR: Failed to generate Prisma client
    echo Make sure the dev server is STOPPED before running this script
    pause
    exit /b 1
)
echo ✓ Prisma client generated successfully
echo.

echo Step 2: Running database migrations...
npx prisma migrate deploy --schema=./packages/database/prisma/schema.prisma
if errorlevel 1 (
    echo ERROR: Failed to run migrations
    echo Make sure your DATABASE_URL in .env is correct
    pause
    exit /b 1
)
echo ✓ Database migrations completed
echo.

echo ============================================
echo  Setup Complete!
echo ============================================
echo.
echo Next steps:
echo 1. Start your dev server: cd apps\web ^&^& npm run dev
echo 2. Try signing up at http://localhost:4000/signup
echo.
pause
