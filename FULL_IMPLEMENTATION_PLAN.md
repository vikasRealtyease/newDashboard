# Full Enterprise Implementation Plan
## RealtyEaseAI - Subscription + AI Credits Wallet System

**Last Updated**: 2025-11-27
**Implementation Model**: Option 2 - Full Enterprise Architecture (5 Weeks)
**Billing Model**: Subscription Plans + Pay-As-You-Go AI Credits

---

## 🎯 Business Model Overview

### Monetization Strategy

**Hybrid Model: Subscriptions + AI Credits**

```
┌─────────────────────────────────────────────────────────────┐
│                     SUBSCRIPTION PLANS                       │
│                                                              │
│  ┌─────────────┐  ┌──────────────┐  ┌──────────────────┐  │
│  │   STARTER   │  │ PROFESSIONAL │  │   ENTERPRISE     │  │
│  │   $29/mo    │  │   $99/mo     │  │   $299/mo        │  │
│  │             │  │              │  │                  │  │
│  │ 5 Projects  │  │ 50 Projects  │  │ Unlimited        │  │
│  │ 2 Team      │  │ 10 Team      │  │ Unlimited Team   │  │
│  │ 1 VA        │  │ 5 VAs        │  │ Unlimited VAs    │  │
│  │ 10GB Storage│  │ 100GB Storage│  │ 1TB Storage      │  │
│  │             │  │              │  │                  │  │
│  │ 0 AI Credits│  │ 500 Credits  │  │ 2000 Credits     │  │
│  │ (buy as     │  │ /month       │  │ /month           │  │
│  │  needed)    │  │              │  │                  │  │
│  └─────────────┘  └──────────────┘  └──────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                             ↓
┌─────────────────────────────────────────────────────────────┐
│                    AI CREDITS WALLET                         │
│                                                              │
│  💰 Pay-as-you-go AI Tool Access                           │
│                                                              │
│  Purchase Options:                                           │
│  • $10 = 1,000 credits                                      │
│  • $50 = 6,000 credits (+20% bonus)                        │
│  • $100 = 15,000 credits (+50% bonus)                      │
│                                                              │
│  Tool Costs (per use):                                       │
│  • GPT-4 Chat: 50-200 credits                               │
│  • Document Analysis: 100-500 credits                       │
│  • Image Generation: 300 credits                            │
│  • Code Assistant: 75-150 credits                           │
│  • Web Research: 200 credits                                │
│                                                              │
│  Features:                                                   │
│  ✓ Credits never expire                                     │
│  ✓ Top-up automatically when low                           │
│  ✓ Usage dashboard with analytics                          │
│  ✓ Credit transaction history                              │
└─────────────────────────────────────────────────────────────┘
```

### Access Control Model

```
┌──────────────────────────────────────────────────────────┐
│  FEATURE ACCESS = Subscription + AI Credits               │
└──────────────────────────────────────────────────────────┘
                          ↓
┌──────────────────────────────────────────────────────────┐
│  BASE FEATURES (Subscription Required)                    │
│  ├─ Projects & Tasks                                      │
│  ├─ Team Management                                       │
│  ├─ VA Hiring                                             │
│  ├─ File Storage                                          │
│  ├─ Messaging                                             │
│  └─ Time Tracking                                         │
└──────────────────────────────────────────────────────────┘
                          ↓
┌──────────────────────────────────────────────────────────┐
│  AI TOOLS (Requires AI Credits)                          │
│  ├─ GPT-4 Chat Assistant                                  │
│  ├─ Document Summarization                                │
│  ├─ Code Generation                                       │
│  ├─ Image Generation                                      │
│  ├─ Web Research                                          │
│  ├─ Data Analysis                                         │
│  └─ Voice Synthesis                                       │
│                                                            │
│  Access Logic:                                             │
│  if (user.subscription.isActive) {                        │
│    if (user.aiWallet.balance >= toolCost) {              │
│      allowAccess()                                         │
│    } else {                                                │
│      showTopUpPrompt()                                     │
│    }                                                       │
│  } else {                                                  │
│    showSubscriptionPrompt()                                │
│  }                                                         │
└──────────────────────────────────────────────────────────┘
```

---

## 📋 Complete Implementation Checklist

### ✅ COMPLETED (Before Implementation Starts)

- [x] Prisma schema with 25+ models
- [x] Subscription & billing models
- [x] AI Credits wallet system
- [x] Invoice & payment models
- [x] MongoDB schemas (Message, File, AILog, ActivityLog)
- [x] Comprehensive documentation
- [x] All dashboard UIs
- [x] Monorepo structure

---

## 🚀 5-Week Implementation Roadmap

### **WEEK 1: Foundation & Database** (40 hours)

#### Day 1: Environment & Dependencies (8h)
```bash
# Install pnpm if not already installed
npm install -g pnpm

# Install all dependencies
pnpm install

# Set up environment variables
cp .env.example .env
```

**Tasks:**
- [ ] Configure .env with database URLs
- [ ] Set up MongoDB Atlas account (free tier)
- [ ] Set up Supabase project (free tier)
- [ ] Configure PayPal sandbox account
- [ ] Set up Cloudinary account
- [ ] Install all package dependencies

**Deliverable:** All services configured and accessible

---

#### Day 2: Database Migrations (8h)

```bash
cd packages/database
npx prisma migrate dev --name initial_schema
npx prisma generate
```

**Tasks:**
- [ ] Generate Prisma migrations
- [ ] Run migrations on development database
- [ ] Test database connection
- [ ] Create database indexes
- [ ] Verify all relationships work

**Deliverable:** PostgreSQL database fully migrated

---

#### Day 3-4: Seed Data & Subscription Plans (16h)

Create `packages/database/prisma/seed.ts`:

```typescript
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  // Create subscription plans
  const starterPlan = await prisma.subscriptionPlan.create({
    data: {
      name: 'Starter',
      slug: 'starter',
      description: 'Perfect for individuals and small teams',
      price: 29.00,
      billingInterval: 'MONTHLY',
      maxProjects: 5,
      maxTasks: 50,
      maxTeamMembers: 2,
      maxVAs: 1,
      maxStorageGB: 10,
      includedAICredits: 0, // Buy as needed
      hasMessaging: true,
      hasAdvancedAnalytics: false,
      hasCustomBranding: false,
      hasPrioritySupport: false,
      hasAPIAccess: false,
      hasWhiteLabel: false,
      isActive: true,
      isPublic: true,
      sortOrder: 1
    }
  });

  const professionalPlan = await prisma.subscriptionPlan.create({
    data: {
      name: 'Professional',
      slug: 'professional',
      description: 'For growing businesses and teams',
      price: 99.00,
      billingInterval: 'MONTHLY',
      maxProjects: 50,
      maxTasks: 500,
      maxTeamMembers: 10,
      maxVAs: 5,
      maxStorageGB: 100,
      includedAICredits: 500, // 500 credits/month
      hasMessaging: true,
      hasAdvancedAnalytics: true,
      hasCustomBranding: false,
      hasPrioritySupport: true,
      hasAPIAccess: true,
      hasWhiteLabel: false,
      isActive: true,
      isPublic: true,
      sortOrder: 2
    }
  });

  const enterprisePlan = await prisma.subscriptionPlan.create({
    data: {
      name: 'Enterprise',
      slug: 'enterprise',
      description: 'For large organizations',
      price: 299.00,
      billingInterval: 'MONTHLY',
      maxProjects: null, // Unlimited
      maxTasks: null,
      maxTeamMembers: null,
      maxVAs: null,
      maxStorageGB: 1024,
      includedAICredits: 2000, // 2000 credits/month
      hasMessaging: true,
      hasAdvancedAnalytics: true,
      hasCustomBranding: true,
      hasPrioritySupport: true,
      hasAPIAccess: true,
      hasWhiteLabel: true,
      isActive: true,
      isPublic: true,
      sortOrder: 3
    }
  });

  // Create admin user
  const adminPassword = await bcrypt.hash('Admin@12345', 12);
  const adminUser = await prisma.user.create({
    data: {
      email: 'admin@realtyease.ai',
      password: adminPassword,
      name: 'System Admin',
      emailVerified: new Date(),
      isActive: true,
      roles: {
        create: {
          role: 'ADMIN',
          isPrimary: true
        }
      },
      profile: {
        create: {
          firstName: 'System',
          lastName: 'Admin'
        }
      }
    }
  });

  // Create AI wallet for admin
  await prisma.aICreditsWallet.create({
    data: {
      userId: adminUser.id,
      balance: 10000, // 10,000 credits for testing
      lifetimeAdded: 10000
    }
  });

  console.log('✅ Seed data created successfully!');
  console.log('📧 Admin email: admin@realtyease.ai');
  console.log('🔑 Admin password: Admin@12345');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
```

**Tasks:**
- [ ] Create seed script
- [ ] Seed subscription plans
- [ ] Create test admin user
- [ ] Create AI wallet for admin
- [ ] Test seed data integrity

**Deliverable:** Database fully seeded with plans and admin user

---

#### Day 5: MongoDB Connection Test (8h)

**Tasks:**
- [ ] Test MongoDB connection from API routes
- [ ] Test all 4 MongoDB schemas
- [ ] Create test documents
- [ ] Verify indexes work
- [ ] Test model methods

**Deliverable:** MongoDB fully functional with all models

**Week 1 Complete:** Database layer 100% ready

---

### **WEEK 2: Authentication & Permissions** (40 hours)

#### Day 1-2: Complete NextAuth Setup (16h)

Create `packages/auth/src/auth.ts`:

```typescript
import NextAuth from 'next-auth';
import { PrismaAdapter } from '@auth/prisma-adapter';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import { prisma } from '@realtyeaseai/database';

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: 'jwt' },
  secret: process.env.NEXTAUTH_SECRET,

  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),

    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Invalid credentials');
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email as string },
          include: {
            roles: true,
            profile: true,
            subscription: {
              include: { plan: true },
              where: { status: 'ACTIVE' }
            },
            aiWallet: true
          }
        });

        if (!user || !user.password) {
          throw new Error('User not found');
        }

        const isValid = await bcrypt.compare(
          credentials.password as string,
          user.password
        );

        if (!isValid) {
          throw new Error('Invalid password');
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          image: user.image,
          roles: user.roles,
          subscription: user.subscription[0],
          aiWallet: user.aiWallet
        };
      }
    })
  ],

  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (user) {
        token.id = user.id;
        token.roles = user.roles;
        token.subscription = user.subscription;
        token.aiWallet = user.aiWallet;
      }

      // Refresh session data
      if (trigger === 'update' && session) {
        const freshUser = await prisma.user.findUnique({
          where: { id: token.id as string },
          include: {
            roles: true,
            subscription: {
              include: { plan: true },
              where: { status: 'ACTIVE' }
            },
            aiWallet: true
          }
        });

        if (freshUser) {
          token.subscription = freshUser.subscription[0];
          token.aiWallet = freshUser.aiWallet;
        }
      }

      return token;
    },

    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string;
        session.user.roles = token.roles as any[];
        session.user.subscription = token.subscription as any;
        session.user.aiWallet = token.aiWallet as any;
      }

      return session;
    }
  },

  pages: {
    signIn: '/login',
    error: '/auth/error',
  },

  events: {
    async signIn({ user }) {
      // Update last login time
      await prisma.user.update({
        where: { id: user.id },
        data: { lastLoginAt: new Date() }
      });
    }
  }
});
```

**Tasks:**
- [ ] Complete auth.ts implementation
- [ ] Add Google OAuth provider
- [ ] Test email/password login
- [ ] Test Google OAuth flow
- [ ] Add password reset functionality
- [ ] Add email verification

**Deliverable:** Full authentication working

---

#### Day 3-4: Permission System (16h)

Create `packages/permissions/src/index.ts`:

```typescript
import { Role } from '@realtyeaseai/database';

export type Permission =
  | 'create'
  | 'read'
  | 'update'
  | 'delete'
  | 'manage'
  | 'assign'
  | 'approve'
  | 'view_analytics';

export type Resource =
  | 'users'
  | 'projects'
  | 'tasks'
  | 'billing'
  | 'settings'
  | 'ai_tools'
  | 'analytics'
  | 'subscriptions';

export type FeatureFlag =
  | 'messaging'
  | 'advanced_analytics'
  | 'custom_branding'
  | 'priority_support'
  | 'api_access'
  | 'white_label';

// Role-based permissions
const rolePermissions: Record<Role, Record<Resource, Permission[]>> = {
  ADMIN: {
    users: ['create', 'read', 'update', 'delete', 'manage'],
    projects: ['create', 'read', 'update', 'delete', 'manage'],
    tasks: ['create', 'read', 'update', 'delete', 'manage', 'assign'],
    billing: ['create', 'read', 'update', 'delete', 'manage'],
    settings: ['manage'],
    ai_tools: ['create', 'read', 'update', 'delete', 'manage'],
    analytics: ['read', 'view_analytics'],
    subscriptions: ['create', 'read', 'update', 'delete', 'manage']
  },
  MANAGER: {
    users: ['read', 'update'],
    projects: ['create', 'read', 'update', 'assign'],
    tasks: ['create', 'read', 'update', 'assign'],
    billing: ['read'],
    settings: [],
    ai_tools: ['read'],
    analytics: ['read', 'view_analytics'],
    subscriptions: ['read']
  },
  CLIENT: {
    users: ['read'],
    projects: ['create', 'read', 'update'],
    tasks: ['create', 'read'],
    billing: ['read'],
    settings: [],
    ai_tools: ['read'], // Can use if credits available
    analytics: ['read'],
    subscriptions: ['read', 'update']
  },
  VA: {
    users: [],
    projects: ['read'],
    tasks: ['read', 'update'],
    billing: [],
    settings: [],
    ai_tools: [],
    analytics: [],
    subscriptions: []
  }
};

export function hasPermission(
  role: Role,
  resource: Resource,
  permission: Permission
): boolean {
  const permissions = rolePermissions[role]?.[resource] || [];
  return permissions.includes(permission);
}

export function hasFeatureAccess(
  subscription: any,
  feature: FeatureFlag
): boolean {
  if (!subscription || subscription.status !== 'ACTIVE') {
    return false;
  }

  const plan = subscription.plan;

  switch (feature) {
    case 'messaging':
      return plan.hasMessaging;
    case 'advanced_analytics':
      return plan.hasAdvancedAnalytics;
    case 'custom_branding':
      return plan.hasCustomBranding;
    case 'priority_support':
      return plan.hasPrioritySupport;
    case 'api_access':
      return plan.hasAPIAccess;
    case 'white_label':
      return plan.hasWhiteLabel;
    default:
      return false;
  }
}

export function canUseAITool(
  subscription: any,
  aiWallet: any,
  toolCost: number
): { allowed: boolean; reason?: string } {
  // Must have active subscription
  if (!subscription || subscription.status !== 'ACTIVE') {
    return {
      allowed: false,
      reason: 'active_subscription_required'
    };
  }

  // Must have enough credits
  if (!aiWallet || aiWallet.balance < toolCost) {
    return {
      allowed: false,
      reason: 'insufficient_credits'
    };
  }

  return { allowed: true };
}

export function canCreateResource(
  subscription: any,
  resourceType: 'project' | 'task' | 'team_member',
  currentCount: number
): { allowed: boolean; reason?: string; limit?: number } {
  if (!subscription || subscription.status !== 'ACTIVE') {
    return {
      allowed: false,
      reason: 'active_subscription_required'
    };
  }

  const plan = subscription.plan;
  let limit: number | null = null;

  switch (resourceType) {
    case 'project':
      limit = plan.maxProjects;
      break;
    case 'task':
      limit = plan.maxTasks;
      break;
    case 'team_member':
      limit = plan.maxTeamMembers;
      break;
  }

  // null = unlimited
  if (limit === null) {
    return { allowed: true };
  }

  if (currentCount >= limit) {
    return {
      allowed: false,
      reason: 'plan_limit_reached',
      limit
    };
  }

  return { allowed: true, limit };
}
```

**Tasks:**
- [ ] Implement permission checking
- [ ] Add feature flag system
- [ ] Create AI tool access control
- [ ] Add resource limit checking
- [ ] Test all permission scenarios

**Deliverable:** Complete permission system

---

#### Day 5: Testing & Documentation (8h)

**Tasks:**
- [ ] Test all auth flows
- [ ] Test permission system
- [ ] Document API authentication
- [ ] Create permission usage examples
- [ ] Write tests for auth

**Week 2 Complete:** Auth & permissions fully functional

---

### **WEEK 3: API Routes & Payment Integration** (40 hours)

*Due to length, I'll create a separate detailed implementation document for Weeks 3-5*

---

## 📊 Progress Tracking

### Overall Progress
- [x] **Week 0:** Planning & Schema Design (100%)
- [ ] **Week 1:** Database Foundation (0%)
- [ ] **Week 2:** Auth & Permissions (0%)
- [ ] **Week 3:** API & Payments (0%)
- [ ] **Week 4:** AI Credits & Integration (0%)
- [ ] **Week 5:** Testing & Deployment (0%)

---

## 🎯 Next Immediate Steps

1. **Install dependencies**: `pnpm install`
2. **Configure .env**: Add all service credentials
3. **Generate migrations**: `npx prisma migrate dev`
4. **Run seed script**: `npx prisma db seed`
5. **Test database**: Verify connections work

**Ready to start?** Let's begin with Week 1, Day 1! 🚀
