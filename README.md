# RealtyEase AI - SaaS Platform Monorepo

> **Professional AI-powered SaaS platform for real estate management with multi-tenant architecture**

## 🏗️ Architecture Overview

This is a **pnpm monorepo** with two Next.js applications sharing common packages:

```
monorepo/
├── apps/
│   ├── web/          # Marketing site + Auth (localhost:4000 | realtyeaseai.com)
│   └── app/          # Dashboard application (localhost:4001 | app.realtyeaseai.com)
├── packages/
│   ├── auth/         # Shared NextAuth configuration
│   ├── database/     # Prisma schema + client
│   ├── ui/           # Shared React components
│   ├── types/        # TypeScript type definitions
│   └── utils/        # Shared utilities
```

### **Cross-Domain Authentication Flow**

```
┌─────────────────────────────────────────────────────────────┐
│  Development:                                                │
│  • web:  http://localhost:4000  (Login/Marketing)           │
│  • app:  http://localhost:4001  (Dashboard)                 │
│                                                              │
│  Production:                                                 │
│  • web:  https://realtyeaseai.com  (Login/Marketing)        │
│  • app:  https://app.realtyeaseai.com  (Dashboard)          │
└─────────────────────────────────────────────────────────────┘

Flow:
1. User visits app.realtyeaseai.com (unauthenticated)
   → Redirects to realtyeaseai.com/login

2. User logs in at realtyeaseai.com/login
   → Session cookie set with domain: .realtyeaseai.com (production)
   → Redirects to app.realtyeaseai.com/dashboard

3. Cookie is shared across subdomains via domain attribute
```

## 🚀 Quick Start

### Prerequisites
- **Node.js** 18+ 
- **pnpm** 8.15.0+
- **PostgreSQL** database (Supabase recommended)

### Installation

```bash
# Install dependencies
pnpm install

# Setup environment variables
cp .env.example .env
# Edit .env with your database URL and secrets

# Generate Prisma client
pnpm --filter @realtyeaseai/database db:generate

# Push database schema
pnpm --filter @realtyeaseai/database db:push

# Run both apps in development
pnpm dev

# Or run individually
pnpm dev:web   # Port 4000
pnpm dev:app   # Port 4001
```

## 🔐 Environment Variables

Create a `.env` file in the root:

```env
# Database
DATABASE_URL="postgresql://user:password@host:5432/database"

# NextAuth
NEXTAUTH_SECRET="generate-with-openssl-rand-base64-32"
NEXTAUTH_URL="http://localhost:4000"  # Dev: web app URL

# App URLs (for cross-domain redirects)
NEXT_PUBLIC_WEB_URL="http://localhost:4000"   # Production: https://realtyeaseai.com
NEXT_PUBLIC_APP_URL="http://localhost:4001"   # Production: https://app.realtyeaseai.com

# Cookie Domain (production only)
COOKIE_DOMAIN=".realtyeaseai.com"  # Leave empty for development

# Node
NODE_ENV="development"
```

### Generate NEXTAUTH_SECRET

```bash
openssl rand -base64 32
```

## 📦 Package Management

This project uses **pnpm** for superior monorepo performance:

### Why pnpm?
- **Disk efficiency**: Single global store with symlinks (saves GBs)
- **Speed**: 2-3x faster than npm
- **Strict**: No phantom dependencies
- **Workspace protocol**: `workspace:*` for internal packages

### Common Commands

```bash
# Install package to specific app
pnpm --filter @realtyeaseai/web add <package>
pnpm --filter @realtyeaseai/app add <package>

# Install to shared package
pnpm --filter @realtyeaseai/ui add <package>

# Run command in all workspaces
pnpm -r <command>

# Clean everything
pnpm clean
rm -rf node_modules
pnpm install
```

## 🗄️ Database

### Technology
- **ORM**: Prisma
- **Database**: PostgreSQL (Supabase)
- **Schema**: `packages/database/prisma/schema.prisma`

### Commands

```bash
# Generate Prisma Client
pnpm --filter @realtyeaseai/database db:generate

# Push schema to database (dev)
pnpm --filter @realtyeaseai/database db:push

# Create migration (production)
pnpm --filter @realtyeaseai/database db:migrate

# Open Prisma Studio
pnpm --filter @realtyeaseai/database db:studio
```

### Schema Highlights
- **Multi-role system**: SUPERADMIN, ADMIN, MANAGER, CLIENT, VA
- **Subscription management**: Plans, invoices, usage tracking
- **AI credits wallet**: Pay-per-use AI features
- **Project & task management**: Full PM system
- **Real-time messaging**: Conversation metadata (messages in MongoDB)

## 🎨 Tech Stack

### Frontend
- **Framework**: Next.js 16 (App Router)
- **React**: 19.0.0
- **Styling**: Tailwind CSS v4
- **UI Components**: Custom component library (`@realtyeaseai/ui`)
- **Animations**: Framer Motion

### Backend
- **API**: Next.js API Routes
- **Auth**: NextAuth.js v5 (beta)
- **Database**: Prisma + PostgreSQL
- **Validation**: Zod

### DevOps
- **Monorepo**: Turborepo
- **Package Manager**: pnpm
- **Deployment**: Vercel (recommended)

## 🔒 Authentication & Authorization

### NextAuth Configuration

**Centralized in**: `packages/auth/src/`

- `auth.ts` - Main NextAuth config
- `auth.config.ts` - Shared config (redirects, callbacks)
- `types.ts` - TypeScript types
- `utils.ts` - Helper functions

### Role-Based Access Control (RBAC)

```typescript
// User roles (from Prisma schema)
enum Role {
  SUPERADMIN  // Full system access
  ADMIN       // Tenant admin
  MANAGER     // Project manager
  CLIENT      // Customer
  VA          // Virtual assistant
}
```

### Middleware Protection

Each app has its own middleware for route protection:

**apps/web/middleware.ts** - Protects admin routes
**apps/app/middleware.ts** - Protects entire dashboard

## 🌐 Deployment

### Vercel (Recommended)

#### Deploy Web App (realtyeaseai.com)

```bash
cd apps/web
vercel --prod
```

**Environment Variables**:
```
DATABASE_URL=<your-postgres-url>
NEXTAUTH_SECRET=<your-secret>
NEXTAUTH_URL=https://realtyeaseai.com
NEXT_PUBLIC_WEB_URL=https://realtyeaseai.com
NEXT_PUBLIC_APP_URL=https://app.realtyeaseai.com
COOKIE_DOMAIN=.realtyeaseai.com
```

#### Deploy App (app.realtyeaseai.com)

```bash
cd apps/app
vercel --prod
```

**Environment Variables**: Same as above

### CORS & Cookies

Production setup ensures:
- ✅ Cookies shared via `domain: .realtyeaseai.com`
- ✅ CORS headers allow cross-subdomain requests
- ✅ Secure cookies (`httpOnly`, `secure`, `sameSite: lax`)

## 📁 Project Structure

```
monorepo/
├── apps/
│   ├── web/                    # Marketing + Auth app (Port 4000)
│   │   ├── app/
│   │   │   ├── api/auth/[...nextauth]/  # NextAuth API route
│   │   │   ├── login/          # Login page
│   │   │   ├── signup/         # Signup page
│   │   │   └── page.tsx        # Landing page
│   │   ├── components/         # Web-specific components
│   │   ├── next.config.mjs
│   │   └── package.json
│   │
│   └── app/                    # Dashboard app (Port 4001)
│       ├── app/
│       │   ├── dashboard/      # Main dashboard
│       │   └── api/            # App-specific APIs
│       ├── next.config.mjs
│       └── package.json
│
├── packages/
│   ├── auth/                   # Shared authentication
│   │   └── src/
│   │       ├── auth.ts         # NextAuth setup
│   │       ├── auth.config.ts  # Auth configuration
│   │       └── types.ts
│   │
│   ├── database/               # Prisma ORM
│   │   ├── prisma/
│   │   │   └── schema.prisma   # Database schema
│   │   └── src/
│   │       └── index.ts        # Prisma client export
│   │
│   ├── ui/                     # Shared UI components
│   │   └── src/
│   │       ├── components/     # React components
│   │       └── styles/         # Global styles
│   │
│   ├── types/                  # Shared TypeScript types
│   └── utils/                  # Shared utilities
│
├── .env                        # Environment variables (gitignored)
├── package.json                # Root package.json
├── pnpm-workspace.yaml         # pnpm workspace config
├── turbo.json                  # Turborepo config
└── tsconfig.json               # Base TypeScript config
```

## 🧪 Development Workflow

### 1. Start Development Servers

```bash
# Terminal 1: Run both apps
pnpm dev

# Or separately:
# Terminal 1
pnpm dev:web

# Terminal 2
pnpm dev:app
```

### 2. Access Applications

- **Web**: http://localhost:4000
- **App**: http://localhost:4001

### 3. Test Cross-Domain Auth

1. Go to http://localhost:4001 (should redirect to login)
2. Login at http://localhost:4000/login
3. Should redirect back to http://localhost:4001/dashboard

### 4. Database Changes

```bash
# 1. Edit schema.prisma
# 2. Generate client
pnpm --filter @realtyeaseai/database db:generate

# 3. Push to database
pnpm --filter @realtyeaseai/database db:push
```

## 🐛 Troubleshooting

### Issue: "MissingSecret" error

**Solution**: Add `NEXTAUTH_SECRET` to `.env`

```bash
openssl rand -base64 32
```

### Issue: Prisma client not found

**Solution**: Regenerate Prisma client

```bash
pnpm --filter @realtyeaseai/database db:generate
```

### Issue: Port already in use

**Solution**: Kill existing Node processes

```bash
# Windows
Get-Process -Name node | Stop-Process -Force

# macOS/Linux
killall node
```

### Issue: Cookie not shared between apps

**Solution**: Check cookie domain configuration

- **Development**: `domain` should be `undefined` (same-origin)
- **Production**: `domain` should be `.realtyeaseai.com`

### Issue: CORS errors

**Solution**: Verify allowed origins in `apps/web/app/api/auth/[...nextauth]/route.ts`

## 📚 Key Concepts

### Workspace Protocol

Internal packages use `workspace:*`:

```json
{
  "dependencies": {
    "@realtyeaseai/auth": "workspace:*",
    "@realtyeaseai/ui": "workspace:*"
  }
}
```

This tells pnpm to link local packages instead of fetching from npm.

### Turborepo Caching

Turborepo caches build outputs for speed:

```bash
# Clear cache
rm -rf .turbo
pnpm turbo clean
```

### Environment Variables

- **Root `.env`**: Shared across all apps (via `turbo.json` globalEnv)
- **App-specific**: Can override in `apps/web/.env.local`

## 🤝 Contributing

### Code Style

- **TypeScript**: Strict mode enabled
- **Formatting**: Prettier (run `pnpm format`)
- **Linting**: ESLint (run `pnpm lint`)

### Commit Convention

```
feat: Add new feature
fix: Bug fix
docs: Documentation update
refactor: Code refactoring
chore: Maintenance tasks
```

## 📄 License

Proprietary - All rights reserved

## 🔗 Links

- **Production**: https://realtyeaseai.com
- **Dashboard**: https://app.realtyeaseai.com
- **Documentation**: (Coming soon)

---

**Built with ❤️ using Next.js, Prisma, and pnpm**
