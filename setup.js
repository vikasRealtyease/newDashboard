#!/usr/bin/env node

/**
 * Setup script for RealtyEase AI Monorepo
 * Run this after cloning the repository
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

console.log('🚀 Setting up RealtyEase AI Monorepo...\n');

// Step 1: Check for .env file
const envPath = path.join(__dirname, '.env');
const envExamplePath = path.join(__dirname, '.env.example');

if (!fs.existsSync(envPath)) {
    console.log('📝 Creating .env file from .env.example...');

    let envContent = fs.readFileSync(envExamplePath, 'utf8');

    // Generate NEXTAUTH_SECRET
    const secret = crypto.randomBytes(32).toString('base64');
    envContent = envContent.replace(
        'NEXTAUTH_SECRET="your-secret-key-here-generate-with-openssl"',
        `NEXTAUTH_SECRET="${secret}"`
    );

    fs.writeFileSync(envPath, envContent);
    console.log('✅ .env file created with generated NEXTAUTH_SECRET\n');
    console.log('⚠️  IMPORTANT: Update DATABASE_URL in .env with your PostgreSQL connection string\n');
} else {
    console.log('✅ .env file already exists\n');
}

// Step 2: Install dependencies
console.log('📦 Installing dependencies with pnpm...');
try {
    execSync('pnpm install', { stdio: 'inherit' });
    console.log('✅ Dependencies installed\n');
} catch (error) {
    console.error('❌ Failed to install dependencies');
    process.exit(1);
}

// Step 3: Check if DATABASE_URL is set
const envFileContent = fs.readFileSync(envPath, 'utf8');
const hasRealDatabaseUrl = envFileContent.includes('DATABASE_URL=') &&
    !envFileContent.includes('DATABASE_URL="postgresql://user:password@host:5432/database');

if (hasRealDatabaseUrl) {
    console.log('🗄️  Generating Prisma Client...');
    try {
        execSync('pnpm --filter @realtyeaseai/database db:generate', { stdio: 'inherit' });
        console.log('✅ Prisma Client generated\n');

        console.log('📊 Pushing database schema...');
        execSync('pnpm --filter @realtyeaseai/database db:push', { stdio: 'inherit' });
        console.log('✅ Database schema pushed\n');
    } catch (error) {
        console.error('⚠️  Database setup failed. Make sure DATABASE_URL is correct in .env');
    }
} else {
    console.log('⚠️  DATABASE_URL not configured. Skipping database setup.');
    console.log('   Update .env with your PostgreSQL URL and run:');
    console.log('   pnpm --filter @realtyeaseai/database db:generate');
    console.log('   pnpm --filter @realtyeaseai/database db:push\n');
}

// Step 4: Success message
console.log('✨ Setup complete!\n');
console.log('📚 Next steps:');
console.log('   1. Update .env with your DATABASE_URL (if not done)');
console.log('   2. Run: pnpm dev (starts both apps)');
console.log('   3. Visit: http://localhost:4000 (web) and http://localhost:4001 (app)\n');
console.log('📖 Read README.md for more information');
