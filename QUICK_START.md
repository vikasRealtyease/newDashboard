# Monorepo Quick Start Guide
## VirtualAssist AI Platform

**TL;DR**: Use a **Hybrid Approach** - Share core components, keep dashboards unique.

---

## 🎯 Recommended Strategy

### ✅ What to Share (packages/)

| Package | Purpose | Examples |
|---------|---------|----------|
| `@virtualassist/ui` | Core UI components | Button, Input, Card, Modal |
| `@virtualassist/types` | TypeScript definitions | User, Task, Project types |
| `@virtualassist/utils` | Helper functions | formatDate, validateEmail |
| `@virtualassist/api` | API client & hooks | useUsers, useTasks |
| `@virtualassist/auth` | Authentication | useAuth, ProtectedRoute |

### ❌ What to Keep Separate (apps/)

| App | Domain | Purpose | Custom Components |
|-----|--------|---------|-------------------|
| `web` | virtualassist.ai | Marketing site | Hero, Pricing, Services |
| `admin` | admin.virtualassist.ai | Admin panel | UserManagement, Analytics |
| `client` | app.virtualassist.ai | Client dashboard | TaskBoard, VASelection |
| `va` | va.virtualassist.ai | VA dashboard | TaskQueue, TimeTracker |

---

## 📁 Folder Structure

```
monorepo/
├── apps/
│   ├── web/          # Marketing (Next.js)
│   ├── admin/        # Admin Dashboard (Next.js)
│   ├── client/       # Client Dashboard (Next.js)
│   └── va/           # VA Dashboard (Next.js)
│
├── packages/
│   ├── ui/           # Shared components
│   ├── types/        # TypeScript types
│   ├── utils/        # Utilities
│   ├── api/          # API client
│   └── auth/         # Authentication
│
├── turbo.json        # Turborepo config
└── package.json      # Root package
```

---

## 🚀 Quick Commands

```bash
# Install dependencies
npm install

# Run all apps in dev mode
npm run dev

# Run specific app
npm run dev --filter=web
npm run dev --filter=admin

# Build all apps
npm run build

# Build specific app
npm run build --filter=client

# Add dependency to shared package
cd packages/ui && npm install framer-motion

# Add dependency to app
cd apps/admin && npm install @tanstack/react-query
```

---

## 💡 Key Principles

### 1. Share Foundation, Customize Experience
- ✅ Same Button component everywhere
- ✅ Different layouts per dashboard
- ✅ Consistent colors, unique workflows

### 2. Type Safety First
- ✅ Define types in `packages/types`
- ✅ Import in all apps
- ✅ No type duplication

### 3. Independent Deployment
- ✅ Each app deploys separately
- ✅ Shared packages are dependencies
- ✅ No coupling between apps

---

## 🎨 Design System

### Shared (packages/ui)
```typescript
import { Button } from '@virtualassist/ui';

<Button variant="primary" size="lg">
  Click Me
</Button>
```

### Custom (apps/admin)
```typescript
import { Button } from '@virtualassist/ui';
import { UserTable } from './components/UserTable';

<div>
  <Button>Add User</Button>
  <UserTable /> {/* Admin-specific */}
</div>
```

---

## 📦 Package Usage

### In Apps
```typescript
// apps/admin/pages/users.tsx
import { Button, Card } from '@virtualassist/ui';
import { User } from '@virtualassist/types';
import { formatDate } from '@virtualassist/utils';
import { useUsers } from '@virtualassist/api';

export default function UsersPage() {
  const { data: users } = useUsers();
  
  return (
    <Card>
      {users?.map((user: User) => (
        <div key={user.id}>
          {user.email} - {formatDate(user.createdAt)}
        </div>
      ))}
    </Card>
  );
}
```

---

## 🔐 Authentication

### Shared Auth Provider
```typescript
// All apps use same auth
import { AuthProvider, useAuth } from '@virtualassist/auth';

function App() {
  return (
    <AuthProvider>
      <YourApp />
    </AuthProvider>
  );
}

function Dashboard() {
  const { user, logout } = useAuth();
  return <div>Welcome {user?.email}</div>;
}
```

---

## 🌐 Deployment

| App | Domain | Vercel Project |
|-----|--------|----------------|
| Web | virtualassist.ai | virtualassist-web |
| Admin | admin.virtualassist.ai | virtualassist-admin |
| Client | app.virtualassist.ai | virtualassist-client |
| VA | va.virtualassist.ai | virtualassist-va |

---

## ✅ Benefits

1. **Fast Development** - Reuse 60% of code
2. **Consistent Brand** - Same design system
3. **Type Safe** - Shared TypeScript types
4. **Easy Maintenance** - Fix bugs once
5. **Flexible UX** - Custom per dashboard
6. **Independent Deploy** - No coupling
7. **Scalable** - Easy to add new apps

---

## 🎯 When to Share vs Separate

### Share If:
- ✅ Used in 2+ apps
- ✅ Part of design system
- ✅ Core business logic
- ✅ Type definitions
- ✅ Utilities

### Keep Separate If:
- ✅ Dashboard-specific UI
- ✅ Role-specific workflow
- ✅ Custom layout
- ✅ Unique feature
- ✅ One-off component

---

## 📊 Example: Task Component

### Shared (packages/ui)
```typescript
// Basic task card
export function TaskCard({ task }: { task: Task }) {
  return (
    <Card>
      <h3>{task.title}</h3>
      <Badge status={task.status} />
    </Card>
  );
}
```

### Client Dashboard (apps/client)
```typescript
// Client-specific task view
import { TaskCard } from '@virtualassist/ui';

export function ClientTaskView({ task }: { task: Task }) {
  return (
    <div>
      <TaskCard task={task} />
      <AssignVAButton taskId={task.id} /> {/* Client-specific */}
      <TaskComments taskId={task.id} />
    </div>
  );
}
```

### VA Dashboard (apps/va)
```typescript
// VA-specific task view
import { TaskCard } from '@virtualassist/ui';

export function VATaskView({ task }: { task: Task }) {
  return (
    <div>
      <TaskCard task={task} />
      <StartTimerButton taskId={task.id} /> {/* VA-specific */}
      <SubmitWorkButton taskId={task.id} />
    </div>
  );
}
```

---

## 🚦 Implementation Phases

### Phase 1: Setup (Week 1-2)
- [ ] Create packages/ structure
- [ ] Setup Turborepo
- [ ] Configure TypeScript
- [ ] Setup Storybook

### Phase 2: Extract Shared (Week 3-4)
- [ ] Move UI components to packages/ui
- [ ] Define types in packages/types
- [ ] Create utils in packages/utils
- [ ] Setup API client

### Phase 3: Build Dashboards (Week 5-8)
- [ ] Create apps/admin
- [ ] Create apps/client
- [ ] Create apps/va
- [ ] Import shared packages

### Phase 4: Deploy (Week 9-10)
- [ ] Setup Vercel projects
- [ ] Configure domains
- [ ] Setup CI/CD
- [ ] Test all apps

---

## 📚 Resources

- [Full Architecture Doc](./MONOREPO_ARCHITECTURE.md)
- [Turborepo Docs](https://turbo.build/repo/docs)
- [Next.js Docs](https://nextjs.org/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

---

**Quick Decision Tree:**

```
Is it a UI component?
├─ Used in 2+ apps? → packages/ui ✅
└─ Dashboard-specific? → apps/[dashboard]/components ✅

Is it a type/interface?
└─ Always → packages/types ✅

Is it a utility function?
├─ Generic (formatDate)? → packages/utils ✅
└─ Dashboard-specific? → apps/[dashboard]/utils ✅

Is it business logic?
├─ Shared (auth, API)? → packages/ ✅
└─ Dashboard-specific? → apps/[dashboard]/ ✅
```

---

**Last Updated**: 2025-11-27  
**See Also**: [MONOREPO_ARCHITECTURE.md](./MONOREPO_ARCHITECTURE.md) for detailed analysis
