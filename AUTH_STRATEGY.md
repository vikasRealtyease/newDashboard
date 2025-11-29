# Authentication Strategy - Multi-Role SaaS Platform

**Last Updated**: 2025-11-27  
**Your Decisions:**
- ✅ Hybrid Database (MongoDB + PostgreSQL/Supabase)
- ✅ No separate backend (Next.js API Routes)
- ✅ Monorepo with Turborepo
- ✅ Deployment: Vercel via GitHub

---

## 🎯 Authentication Requirements

### **Your Needs:**
1. **Multi-role support** (Admin, Manager, Client, VA)
2. **Single Sign-On** (one login, access multiple dashboards)
3. **Role switching** (users can have multiple roles)
4. **Secure** (JWT tokens, session management)
5. **Easy to implement** (minimal code)
6. **FREE** (no additional costs)

---

## 📊 Authentication Options Comparison

### **Option 1: NextAuth.js (Auth.js v5)** ⭐ RECOMMENDED

**What it is:**
- Official authentication library for Next.js
- Supports multiple providers (email, Google, GitHub, etc.)
- Built-in session management
- Works perfectly with PostgreSQL (Prisma adapter)

**Pros:**
- ✅ **FREE** (open source)
- ✅ **Easy to implement** (minimal code)
- ✅ **Multi-provider** (email, OAuth, credentials)
- ✅ **Works with Prisma** (your PostgreSQL setup)
- ✅ **Session management** (JWT or database sessions)
- ✅ **Role-based access** (custom callbacks)
- ✅ **Secure** (industry standard)
- ✅ **Well documented**

**Cons:**
- ⚠️ Requires some configuration
- ⚠️ Learning curve for advanced features

**Cost:** **FREE**

---

### **Option 2: Supabase Auth**

**What it is:**
- Built-in authentication from Supabase
- Handles users, sessions, OAuth
- Integrated with Supabase database

**Pros:**
- ✅ **FREE** (included with Supabase)
- ✅ **Zero config** (works out of the box)
- ✅ **OAuth providers** (Google, GitHub, etc.)
- ✅ **Email verification** (built-in)
- ✅ **Row-level security** (RLS)

**Cons:**
- ❌ **Locked to Supabase** (vendor lock-in)
- ❌ **Less flexible** than NextAuth
- ❌ **Harder to customize** for multi-role

**Cost:** **FREE**

---

### **Option 3: Clerk**

**What it is:**
- Managed authentication service
- Beautiful pre-built UI components
- Handles everything for you

**Pros:**
- ✅ **Beautiful UI** (pre-built components)
- ✅ **Easy setup** (5 minutes)
- ✅ **Multi-tenancy** (organizations)
- ✅ **User management** (dashboard)

**Cons:**
- ❌ **NOT FREE** ($25/month for production)
- ❌ **Vendor lock-in**
- ❌ **Overkill** for your use case

**Cost:** **$25/month** (not ideal)

---

### **Option 4: Auth0**

**What it is:**
- Enterprise authentication service
- Very powerful, very complex

**Pros:**
- ✅ **Enterprise-grade**
- ✅ **Many features**

**Cons:**
- ❌ **Expensive** ($35+/month)
- ❌ **Overkill** for your use case
- ❌ **Complex setup**

**Cost:** **$35+/month** (too expensive)

---

## 🏆 **Recommended: NextAuth.js (Auth.js v5)**

### **Why NextAuth.js is Best for You:**

1. **✅ FREE** (no monthly costs)
2. **✅ Multi-role support** (perfect for Admin, Manager, Client, VA)
3. **✅ Works with your stack** (Next.js + Prisma + PostgreSQL)
4. **✅ Flexible** (easy to customize)
5. **✅ Secure** (JWT tokens, CSRF protection)
6. **✅ OAuth support** (Google, GitHub, etc.)
7. **✅ Email/Password** (credentials provider)

---

## 🔧 Implementation Plan

### **Architecture:**

```
User Login
    ↓
NextAuth.js (handles authentication)
    ↓
Check credentials in PostgreSQL (Supabase)
    ↓
Generate JWT token
    ↓
Store session in database
    ↓
Return user + roles
    ↓
Redirect to appropriate dashboard based on primary role
```

---

## 📝 **NextAuth.js Setup**

### **1. Database Schema (Prisma)**

```prisma
// packages/database/prisma/schema.prisma

// NextAuth.js required tables
model Account {
  id                String  @id @default(uuid())
  userId            String
  type              String
  provider          String
  providerAccountId String
  refresh_token     String?
  access_token      String?
  expires_at        Int?
  token_type        String?
  scope             String?
  id_token          String?
  session_state     String?

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@unique([provider, providerAccountId])
}

model Session {
  id           String   @id @default(uuid())
  sessionToken String   @unique
  userId       String
  expires      DateTime
  user         User     @relation(fields: [userId], references: [id], onDelete: Cascade)
}

model User {
  id            String    @id @default(uuid())
  name          String?
  email         String    @unique
  emailVerified DateTime?
  image         String?
  password      String?   // For credentials login
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt

  accounts      Account[]
  sessions      Session[]
  roles         UserRole[]
  profile       UserProfile?
}

model UserRole {
  id        String   @id @default(uuid())
  userId    String
  role      Role
  isPrimary Boolean  @default(false)
  createdAt DateTime @default(now())

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@unique([userId, role])
}

model UserProfile {
  id        String  @id @default(uuid())
  userId    String  @unique
  firstName String
  lastName  String
  avatar    String?
  phone     String?

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)
}

model VerificationToken {
  identifier String
  token      String   @unique
  expires    DateTime

  @@unique([identifier, token])
}

enum Role {
  ADMIN
  MANAGER
  CLIENT
  VA
}
```

---

### **2. NextAuth Configuration**

```typescript
// packages/auth/src/auth.config.ts
import { NextAuthConfig } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import Google from 'next-auth/providers/google';
import { prisma } from '@virtualassist/database';
import bcrypt from 'bcryptjs';

export const authConfig: NextAuthConfig = {
  providers: [
    // Email/Password login
    Credentials({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email as string },
          include: {
            roles: true,
            profile: true,
          },
        });

        if (!user || !user.password) {
          return null;
        }

        const isValid = await bcrypt.compare(
          credentials.password as string,
          user.password
        );

        if (!isValid) {
          return null;
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          image: user.image,
          roles: user.roles,
        };
      },
    }),

    // Google OAuth
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],

  callbacks: {
    async jwt({ token, user, trigger, session }) {
      // Add user roles to token
      if (user) {
        token.id = user.id;
        token.roles = user.roles;
      }

      // Handle session update
      if (trigger === 'update' && session) {
        token = { ...token, ...session };
      }

      return token;
    },

    async session({ session, token }) {
      // Add user info to session
      if (token) {
        session.user.id = token.id as string;
        session.user.roles = token.roles as any[];
      }

      return session;
    },

    async redirect({ url, baseUrl }) {
      // Redirect to appropriate dashboard based on primary role
      if (url.startsWith('/')) return `${baseUrl}${url}`;
      if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    },
  },

  pages: {
    signIn: '/auth/login',
    signOut: '/auth/logout',
    error: '/auth/error',
    verifyRequest: '/auth/verify',
  },

  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },

  secret: process.env.NEXTAUTH_SECRET,
};
```

---

### **3. Auth Helper Functions**

```typescript
// packages/auth/src/utils/auth.ts
import { getServerSession } from 'next-auth';
import { authConfig } from '../auth.config';
import { Role } from '@virtualassist/database';

export async function getCurrentUser() {
  const session = await getServerSession(authConfig);
  return session?.user;
}

export async function requireAuth() {
  const user = await getCurrentUser();
  if (!user) {
    throw new Error('Unauthorized');
  }
  return user;
}

export async function requireRole(role: Role) {
  const user = await requireAuth();
  const hasRole = user.roles?.some((r: any) => r.role === role);
  
  if (!hasRole) {
    throw new Error('Forbidden');
  }
  
  return user;
}

export function getPrimaryRole(user: any): Role {
  const primaryRole = user.roles?.find((r: any) => r.isPrimary);
  return primaryRole?.role || user.roles?.[0]?.role || Role.CLIENT;
}

export function getDashboardUrl(role: Role): string {
  const dashboardUrls = {
    [Role.ADMIN]: 'https://admin.virtualassist.ai',
    [Role.MANAGER]: 'https://manager.virtualassist.ai',
    [Role.CLIENT]: 'https://app.virtualassist.ai',
    [Role.VA]: 'https://va.virtualassist.ai',
  };
  
  return dashboardUrls[role] || dashboardUrls[Role.CLIENT];
}
```

---

### **4. Protected API Routes**

```typescript
// Example: apps/client/app/api/projects/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { requireRole } from '@virtualassist/auth';
import { Role, prisma } from '@virtualassist/database';

export async function GET(request: NextRequest) {
  try {
    // Require CLIENT or ADMIN role
    const user = await requireRole(Role.CLIENT);

    const projects = await prisma.project.findMany({
      where: { clientId: user.id },
    });

    return NextResponse.json({ projects });
  } catch (error) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
}
```

---

### **5. Client-Side Auth Hooks**

```typescript
// packages/auth/src/hooks/useAuth.ts
'use client';

import { useSession } from 'next-auth/react';
import { Role } from '@virtualassist/database';

export function useAuth() {
  const { data: session, status } = useSession();

  return {
    user: session?.user,
    isLoading: status === 'loading',
    isAuthenticated: status === 'authenticated',
  };
}

export function useRole(role: Role) {
  const { user } = useAuth();
  
  const hasRole = user?.roles?.some((r: any) => r.role === role);
  
  return { hasRole };
}
```

---

### **6. Login/Signup Pages**

```typescript
// apps/client/app/auth/login/page.tsx
'use client';

import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { Button } from '@virtualassist/ui';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const result = await signIn('credentials', {
      email,
      password,
      redirect: false,
    });

    if (result?.ok) {
      window.location.href = '/dashboard';
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4">
        <h1 className="text-2xl font-bold">Login</h1>
        
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-2 border rounded"
        />
        
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-2 border rounded"
        />
        
        <Button type="submit" className="w-full">
          Login
        </Button>

        <Button
          type="button"
          variant="outline"
          onClick={() => signIn('google')}
          className="w-full"
        >
          Login with Google
        </Button>
      </form>
    </div>
  );
}
```

---

## 🔐 **Security Features**

### **1. Password Hashing**
```typescript
import bcrypt from 'bcryptjs';

// Hash password on signup
const hashedPassword = await bcrypt.hash(password, 10);

// Verify password on login
const isValid = await bcrypt.compare(password, user.password);
```

### **2. CSRF Protection**
- ✅ Built-in with NextAuth.js

### **3. JWT Tokens**
- ✅ Signed and encrypted
- ✅ 30-day expiration
- ✅ Refresh on activity

### **4. Role-Based Access Control**
```typescript
// Middleware to protect routes
export async function middleware(request: NextRequest) {
  const user = await getCurrentUser();
  
  if (!user) {
    return NextResponse.redirect('/auth/login');
  }
  
  // Check role
  const hasAccess = user.roles?.some(r => r.role === 'ADMIN');
  if (!hasAccess) {
    return NextResponse.redirect('/unauthorized');
  }
}
```

---

## 💰 **Cost Comparison**

| Solution | Setup Time | Monthly Cost | Features |
|----------|------------|--------------|----------|
| **NextAuth.js** ⭐ | 2-3 hours | **$0** | Full control, multi-role |
| **Supabase Auth** | 1 hour | **$0** | Easy, less flexible |
| **Clerk** | 30 min | **$25** | Beautiful UI, managed |
| **Auth0** | 2 hours | **$35+** | Enterprise, overkill |

---

## ✅ **Final Recommendation**

**Use NextAuth.js (Auth.js v5)**

**Why:**
- ✅ **FREE** (perfect for your budget)
- ✅ **Multi-role support** (Admin, Manager, Client, VA)
- ✅ **Works with your stack** (Next.js + Prisma + PostgreSQL)
- ✅ **Flexible** (easy to customize)
- ✅ **Secure** (industry standard)
- ✅ **OAuth support** (Google, GitHub)

**Your Auth Stack:**
```
NextAuth.js (Authentication)
  + Prisma (User storage in PostgreSQL)
  + JWT (Session tokens)
  + bcrypt (Password hashing)
  = Secure, FREE, Scalable! 🚀
```

---

## 🚀 **Next Steps**

1. **Install NextAuth.js**
   ```bash
   pnpm add next-auth@beta bcryptjs
   pnpm add -D @types/bcryptjs
   ```

2. **Setup Prisma schema** (user tables)

3. **Configure NextAuth** (providers, callbacks)

4. **Create login/signup pages**

5. **Protect API routes** (role-based access)

6. **Test authentication flow**

---

**Ready to implement?** I can help you set up NextAuth.js step by step! 🎯
