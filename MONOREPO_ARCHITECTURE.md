# Monorepo Architecture Strategy
## VirtualAssist AI - Multi-Dashboard Platform

**Last Updated**: 2025-11-27  
**Version**: 1.0.0

---

## Executive Summary

This document outlines the recommended architecture for the VirtualAssist AI monorepo, which includes:
- **Marketing Website** (main domain)
- **Admin Dashboard** (admin.virtualassist.ai)
- **Client Dashboard** (app.virtualassist.ai)
- **VA Dashboard** (va.virtualassist.ai)

### Recommended Approach: **Hybrid Strategy**
- **Shared**: Core UI components, types, utilities, API clients
- **Separate**: Dashboard-specific components, layouts, and business logic

---

## 🏗️ Current vs Recommended Structure

### Current Structure
```
monorepo/
├── apps/
│   └── web/                    # Marketing website
└── packages/                   # (empty)
```

### Recommended Structure
```
monorepo/
├── apps/
│   ├── web/                    # Marketing website (virtualassist.ai)
│   ├── admin/                  # Admin dashboard (admin.virtualassist.ai)
│   ├── client/                 # Client dashboard (app.virtualassist.ai)
│   └── va/                     # VA dashboard (va.virtualassist.ai)
│
├── packages/
│   ├── ui/                     # Shared UI components
│   ├── types/                  # TypeScript types & interfaces
│   ├── utils/                  # Shared utilities
│   ├── api/                    # API client & hooks
│   ├── config/                 # Shared configuration
│   └── auth/                   # Authentication logic
│
└── package.json
```

---

## 📊 Architecture Comparison

### Option 1: Fully Shared UI (Not Recommended)

**Pros:**
- ✅ Maximum code reuse
- ✅ Consistent design across all apps
- ✅ Single source of truth for components
- ✅ Easier to maintain design system

**Cons:**
- ❌ Less flexibility for dashboard-specific needs
- ❌ Admin might need different UX than client
- ❌ Harder to customize per role
- ❌ Potential for bloated components with too many variants
- ❌ Coupling between different user experiences

**Use Case:** When all dashboards need identical UX (rare)

---

### Option 2: Fully Separate UI (Not Recommended)

**Pros:**
- ✅ Complete customization freedom
- ✅ No coupling between apps
- ✅ Easier to optimize per use case
- ✅ Independent deployment & updates

**Cons:**
- ❌ Massive code duplication
- ❌ Inconsistent design system
- ❌ Hard to maintain
- ❌ Slower development
- ❌ Bug fixes need to be applied multiple times

**Use Case:** When dashboards are completely different products

---

### Option 3: Hybrid Approach (✅ RECOMMENDED)

**Pros:**
- ✅ Best of both worlds
- ✅ Shared foundation, custom experiences
- ✅ Consistent core, flexible UI
- ✅ Maintainable and scalable
- ✅ Fast development with customization

**Cons:**
- ⚠️ Requires good architecture planning
- ⚠️ Need clear boundaries between shared/custom

**Use Case:** Multi-dashboard SaaS platforms (your scenario)

---

## 🎯 Recommended Hybrid Strategy

### What to Share

#### 1. **Core UI Components** (`packages/ui`)
```
packages/ui/
├── components/
│   ├── Button/
│   ├── Input/
│   ├── Card/
│   ├── Modal/
│   ├── Table/
│   ├── Badge/
│   └── ...
├── hooks/
│   ├── useMediaQuery.ts
│   ├── useLocalStorage.ts
│   └── ...
└── styles/
    ├── globals.css
    └── theme.ts
```

**Why Share:**
- Consistent brand colors, typography, spacing
- Reusable form elements
- Common patterns (modals, tooltips, etc.)
- Design system tokens

**Examples:**
- `<Button variant="primary" size="lg">`
- `<Input type="email" label="Email">`
- `<Card elevated>`

---

#### 2. **TypeScript Types** (`packages/types`)
```
packages/types/
├── models/
│   ├── User.ts
│   ├── Client.ts
│   ├── VA.ts
│   ├── Task.ts
│   └── Project.ts
├── api/
│   ├── requests.ts
│   └── responses.ts
└── enums/
    ├── UserRole.ts
    └── TaskStatus.ts
```

**Why Share:**
- Type safety across all apps
- Single source of truth for data models
- Easier refactoring
- Consistent API contracts

**Example:**
```typescript
// packages/types/models/User.ts
export interface User {
  id: string;
  email: string;
  role: UserRole;
  profile: UserProfile;
}

export enum UserRole {
  ADMIN = 'admin',
  CLIENT = 'client',
  VA = 'va'
}
```

---

#### 3. **Utilities** (`packages/utils`)
```
packages/utils/
├── formatters/
│   ├── date.ts
│   ├── currency.ts
│   └── number.ts
├── validators/
│   ├── email.ts
│   └── phone.ts
├── helpers/
│   ├── string.ts
│   └── array.ts
└── constants/
    └── index.ts
```

**Why Share:**
- Consistent data formatting
- Reusable validation logic
- Common helper functions
- Shared constants

---

#### 4. **API Client** (`packages/api`)
```
packages/api/
├── client/
│   ├── axios.ts
│   └── fetch.ts
├── hooks/
│   ├── useUsers.ts
│   ├── useTasks.ts
│   └── useProjects.ts
└── services/
    ├── auth.ts
    ├── users.ts
    └── tasks.ts
```

**Why Share:**
- Consistent API communication
- Reusable React Query hooks
- Centralized error handling
- Type-safe API calls

---

#### 5. **Authentication** (`packages/auth`)
```
packages/auth/
├── providers/
│   └── AuthProvider.tsx
├── hooks/
│   ├── useAuth.ts
│   └── usePermissions.ts
├── utils/
│   ├── token.ts
│   └── session.ts
└── guards/
    └── ProtectedRoute.tsx
```

**Why Share:**
- Single authentication flow
- Consistent session management
- Reusable auth hooks
- Centralized security logic

---

### What to Keep Separate

#### 1. **Dashboard-Specific Components**

**Admin Dashboard** (`apps/admin/components/`)
```
apps/admin/components/
├── UserManagement/
├── Analytics/
├── SystemSettings/
├── VAApproval/
└── BillingOverview/
```

**Client Dashboard** (`apps/client/components/`)
```
apps/client/components/
├── TaskBoard/
├── VASelection/
├── ProjectManager/
├── InvoiceView/
└── SupportTickets/
```

**VA Dashboard** (`apps/va/components/`)
```
apps/va/components/
├── TaskQueue/
├── TimeTracker/
├── ClientCommunication/
├── SkillsProfile/
└── EarningsTracker/
```

**Why Separate:**
- Different user needs
- Different workflows
- Different permissions
- Custom UX per role

---

#### 2. **Layouts**

Each app has its own layout structure:

**Admin Layout:**
- Full sidebar with admin navigation
- System status indicators
- Quick actions panel

**Client Layout:**
- Simplified sidebar
- Project switcher
- Notification center

**VA Layout:**
- Task-focused layout
- Time tracking widget
- Client communication panel

---

#### 3. **Pages & Routes**

Each dashboard has completely different pages:
- Admin: Users, Analytics, Settings, Approvals
- Client: Projects, Tasks, VAs, Billing
- VA: Tasks, Schedule, Earnings, Profile

---

#### 4. **Business Logic**

Dashboard-specific logic stays in each app:
- Admin: User management, system configuration
- Client: Project creation, VA hiring
- VA: Task completion, time tracking

---

## 🚀 Implementation Plan

### Phase 1: Setup Shared Packages (Week 1-2)

1. **Create Package Structure**
```bash
mkdir -p packages/{ui,types,utils,api,auth,config}
```

2. **Setup TypeScript Configs**
```json
// packages/types/package.json
{
  "name": "@virtualassist/types",
  "version": "1.0.0",
  "main": "./dist/index.js",
  "types": "./dist/index.d.ts"
}
```

3. **Configure Turborepo**
```json
// turbo.json
{
  "pipeline": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": ["dist/**", ".next/**"]
    },
    "dev": {
      "cache": false
    }
  }
}
```

---

### Phase 2: Extract Shared Code (Week 3-4)

1. **Move UI Components to `packages/ui`**
   - Extract Button, Input, Card, etc.
   - Setup Storybook for component documentation
   - Create design tokens

2. **Define Types in `packages/types`**
   - User models
   - API interfaces
   - Enums and constants

3. **Create Utilities in `packages/utils`**
   - Date formatters
   - Validators
   - Helper functions

---

### Phase 3: Build Dashboard Apps (Week 5-8)

1. **Create Admin Dashboard** (`apps/admin`)
   ```bash
   npx create-next-app@latest apps/admin
   ```

2. **Create Client Dashboard** (`apps/client`)
   ```bash
   npx create-next-app@latest apps/client
   ```

3. **Create VA Dashboard** (`apps/va`)
   ```bash
   npx create-next-app@latest apps/va
   ```

4. **Import Shared Packages**
   ```typescript
   import { Button } from '@virtualassist/ui';
   import { User } from '@virtualassist/types';
   import { formatDate } from '@virtualassist/utils';
   ```

---

### Phase 4: Setup Deployment (Week 9-10)

1. **Configure Domains**
   - `virtualassist.ai` → apps/web
   - `admin.virtualassist.ai` → apps/admin
   - `app.virtualassist.ai` → apps/client
   - `va.virtualassist.ai` → apps/va

2. **Setup Vercel/Netlify**
   - Separate deployments per app
   - Shared environment variables
   - Preview deployments

---

## 📁 Detailed Package Structure

### `packages/ui` - Shared UI Components

```
packages/ui/
├── src/
│   ├── components/
│   │   ├── Button/
│   │   │   ├── Button.tsx
│   │   │   ├── Button.stories.tsx
│   │   │   ├── Button.test.tsx
│   │   │   └── index.ts
│   │   ├── Input/
│   │   ├── Card/
│   │   ├── Modal/
│   │   ├── Table/
│   │   ├── Badge/
│   │   ├── Avatar/
│   │   ├── Dropdown/
│   │   └── ...
│   ├── hooks/
│   │   ├── useMediaQuery.ts
│   │   ├── useLocalStorage.ts
│   │   ├── useDebounce.ts
│   │   └── ...
│   ├── styles/
│   │   ├── globals.css
│   │   ├── theme.ts
│   │   └── tokens.ts
│   └── index.ts
├── package.json
├── tsconfig.json
└── README.md
```

**Key Features:**
- Tailwind CSS for styling
- Framer Motion for animations
- Storybook for documentation
- Jest for testing
- Fully typed with TypeScript

---

### `packages/types` - TypeScript Definitions

```
packages/types/
├── src/
│   ├── models/
│   │   ├── User.ts
│   │   ├── Client.ts
│   │   ├── VA.ts
│   │   ├── Admin.ts
│   │   ├── Task.ts
│   │   ├── Project.ts
│   │   ├── Invoice.ts
│   │   └── Timesheet.ts
│   ├── api/
│   │   ├── requests/
│   │   │   ├── auth.ts
│   │   │   ├── users.ts
│   │   │   └── tasks.ts
│   │   └── responses/
│   │       ├── auth.ts
│   │       ├── users.ts
│   │       └── tasks.ts
│   ├── enums/
│   │   ├── UserRole.ts
│   │   ├── TaskStatus.ts
│   │   ├── ProjectStatus.ts
│   │   └── PaymentStatus.ts
│   └── index.ts
├── package.json
└── tsconfig.json
```

**Example Types:**
```typescript
// src/models/User.ts
export interface User {
  id: string;
  email: string;
  role: UserRole;
  profile: UserProfile;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserProfile {
  firstName: string;
  lastName: string;
  avatar?: string;
  phone?: string;
}

// src/enums/UserRole.ts
export enum UserRole {
  ADMIN = 'admin',
  CLIENT = 'client',
  VA = 'va'
}
```

---

### `packages/api` - API Client

```
packages/api/
├── src/
│   ├── client/
│   │   ├── axios.ts
│   │   ├── config.ts
│   │   └── interceptors.ts
│   ├── hooks/
│   │   ├── useAuth.ts
│   │   ├── useUsers.ts
│   │   ├── useTasks.ts
│   │   ├── useProjects.ts
│   │   └── useInvoices.ts
│   ├── services/
│   │   ├── auth.service.ts
│   │   ├── users.service.ts
│   │   ├── tasks.service.ts
│   │   └── projects.service.ts
│   └── index.ts
├── package.json
└── tsconfig.json
```

**Example Hook:**
```typescript
// src/hooks/useTasks.ts
import { useQuery, useMutation } from '@tanstack/react-query';
import { Task } from '@virtualassist/types';
import { tasksService } from '../services/tasks.service';

export function useTasks() {
  return useQuery({
    queryKey: ['tasks'],
    queryFn: () => tasksService.getAll()
  });
}

export function useCreateTask() {
  return useMutation({
    mutationFn: (task: Partial<Task>) => tasksService.create(task)
  });
}
```

---

## 🎨 Design System Strategy

### Shared Design Tokens

```typescript
// packages/ui/src/styles/tokens.ts
export const tokens = {
  colors: {
    brand: {
      50: '#e6f7ff',
      100: '#bae7ff',
      // ... brand colors
      600: '#1ca2dc',
      // ...
    },
    // ... other colors
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    // ...
  },
  typography: {
    fontFamily: {
      sans: 'Inter, sans-serif',
      mono: 'JetBrains Mono, monospace'
    },
    fontSize: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      // ...
    }
  },
  borderRadius: {
    sm: '0.25rem',
    md: '0.5rem',
    lg: '0.75rem',
    xl: '1rem',
    full: '9999px'
  }
};
```

### Dashboard-Specific Theming

Each dashboard can override theme values:

```typescript
// apps/admin/styles/theme.ts
import { tokens } from '@virtualassist/ui/styles';

export const adminTheme = {
  ...tokens,
  colors: {
    ...tokens.colors,
    primary: tokens.colors.purple, // Admin uses purple
  }
};

// apps/client/styles/theme.ts
export const clientTheme = {
  ...tokens,
  colors: {
    ...tokens.colors,
    primary: tokens.colors.brand, // Client uses brand blue
  }
};

// apps/va/styles/theme.ts
export const vaTheme = {
  ...tokens,
  colors: {
    ...tokens.colors,
    primary: tokens.colors.success, // VA uses green
  }
};
```

---

## 🔐 Authentication Strategy

### Shared Auth Package

```typescript
// packages/auth/src/providers/AuthProvider.tsx
import { createContext, useContext, useState } from 'react';
import { User } from '@virtualassist/types';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  // Implementation...

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}
```

### Role-Based Access Control

```typescript
// packages/auth/src/hooks/usePermissions.ts
import { useAuth } from './useAuth';
import { UserRole } from '@virtualassist/types';

export function usePermissions() {
  const { user } = useAuth();

  return {
    canManageUsers: user?.role === UserRole.ADMIN,
    canCreateProjects: user?.role === UserRole.CLIENT,
    canViewTasks: user?.role === UserRole.VA || user?.role === UserRole.CLIENT,
    isAdmin: user?.role === UserRole.ADMIN,
    isClient: user?.role === UserRole.CLIENT,
    isVA: user?.role === UserRole.VA,
  };
}
```

---

## 📦 Package Dependencies

### Root `package.json`

```json
{
  "name": "virtualassist-monorepo",
  "private": true,
  "workspaces": [
    "apps/*",
    "packages/*"
  ],
  "scripts": {
    "dev": "turbo run dev",
    "build": "turbo run build",
    "test": "turbo run test",
    "lint": "turbo run lint"
  },
  "devDependencies": {
    "turbo": "^1.10.0",
    "typescript": "^5.0.0"
  }
}
```

### Shared Package Example

```json
// packages/ui/package.json
{
  "name": "@virtualassist/ui",
  "version": "1.0.0",
  "main": "./dist/index.js",
  "types": "./dist/index.d.ts",
  "scripts": {
    "build": "tsup src/index.ts --format cjs,esm --dts",
    "dev": "tsup src/index.ts --format cjs,esm --dts --watch",
    "storybook": "storybook dev -p 6006"
  },
  "dependencies": {
    "react": "^18.2.0",
    "framer-motion": "^10.0.0"
  },
  "devDependencies": {
    "@types/react": "^18.2.0",
    "tsup": "^7.0.0",
    "storybook": "^7.0.0"
  }
}
```

### App Package Example

```json
// apps/admin/package.json
{
  "name": "admin-dashboard",
  "version": "1.0.0",
  "scripts": {
    "dev": "next dev -p 3001",
    "build": "next build",
    "start": "next start"
  },
  "dependencies": {
    "next": "^14.0.0",
    "react": "^18.2.0",
    "@virtualassist/ui": "*",
    "@virtualassist/types": "*",
    "@virtualassist/utils": "*",
    "@virtualassist/api": "*",
    "@virtualassist/auth": "*"
  }
}
```

---

## 🚢 Deployment Strategy

### Vercel Configuration

```json
// vercel.json (root)
{
  "builds": [
    {
      "src": "apps/web/package.json",
      "use": "@vercel/next"
    },
    {
      "src": "apps/admin/package.json",
      "use": "@vercel/next"
    },
    {
      "src": "apps/client/package.json",
      "use": "@vercel/next"
    },
    {
      "src": "apps/va/package.json",
      "use": "@vercel/next"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "apps/web/$1"
    }
  ]
}
```

### Domain Mapping

| Domain | App | Port (Dev) |
|--------|-----|------------|
| virtualassist.ai | apps/web | 3000 |
| admin.virtualassist.ai | apps/admin | 3001 |
| app.virtualassist.ai | apps/client | 3002 |
| va.virtualassist.ai | apps/va | 3003 |

---

## 📊 Pros & Cons Summary

### Hybrid Approach (Recommended)

| Aspect | Rating | Notes |
|--------|--------|-------|
| **Code Reuse** | ⭐⭐⭐⭐⭐ | Shared components, types, utils |
| **Customization** | ⭐⭐⭐⭐⭐ | Full control over dashboard UX |
| **Maintainability** | ⭐⭐⭐⭐☆ | Clear boundaries, good organization |
| **Development Speed** | ⭐⭐⭐⭐⭐ | Fast with shared foundation |
| **Scalability** | ⭐⭐⭐⭐⭐ | Easy to add new apps/features |
| **Type Safety** | ⭐⭐⭐⭐⭐ | Shared types ensure consistency |
| **Testing** | ⭐⭐⭐⭐☆ | Test shared code once |
| **Bundle Size** | ⭐⭐⭐⭐☆ | Tree-shaking eliminates unused code |

---

## 🎯 Final Recommendation

### ✅ Use the Hybrid Approach

**Share:**
1. ✅ Core UI components (Button, Input, Card, etc.)
2. ✅ TypeScript types and interfaces
3. ✅ Utilities and helpers
4. ✅ API client and hooks
5. ✅ Authentication logic
6. ✅ Design tokens and theme

**Keep Separate:**
1. ✅ Dashboard-specific components
2. ✅ Layouts and navigation
3. ✅ Pages and routes
4. ✅ Business logic
5. ✅ Dashboard-specific styles
6. ✅ Role-specific workflows

### Why This Works Best

1. **Consistency Where It Matters**: Brand colors, typography, and core components are consistent
2. **Flexibility Where Needed**: Each dashboard can have unique UX tailored to its users
3. **Fast Development**: Reuse foundation, customize experience
4. **Easy Maintenance**: Fix bugs once in shared packages
5. **Scalable**: Easy to add new dashboards or features
6. **Type Safe**: Shared types prevent API mismatches
7. **Independent Deployment**: Each app can deploy separately

---

## 📚 Next Steps

1. **Review this document** with your team
2. **Create the package structure** as outlined
3. **Extract shared code** from existing web app
4. **Build admin dashboard** first (most complex)
5. **Build client dashboard** second
6. **Build VA dashboard** third
7. **Setup CI/CD** for all apps
8. **Document** shared packages with Storybook

---

## 📞 Questions to Consider

Before implementing, discuss:

1. **Authentication**: Single sign-on or separate logins?
2. **Database**: Shared or separate per app?
3. **API**: Single backend or microservices?
4. **Styling**: Tailwind everywhere or CSS-in-JS for dashboards?
5. **State Management**: Redux, Zustand, or React Query?
6. **Testing**: Jest + React Testing Library?
7. **CI/CD**: GitHub Actions or Vercel?

---

**Document Owner**: Development Team  
**Last Review**: 2025-11-27  
**Next Review**: After Phase 1 completion
