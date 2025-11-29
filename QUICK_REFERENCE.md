# Developer Quick Reference

**RealtyEaseAI Monorepo** | Last Updated: 2025-11-27

---

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start all apps in dev mode
npm run dev

# Build all packages
npm run build

# Type check
npm run type-check

# Lint
npm run lint
```

---

## 📦 Package Names

| Package | Name | Import As |
|---------|------|-----------|
| UI Components | `@realtyeaseai/ui` | `import { Button } from '@realtyeaseai/ui'` |
| Types | `@realtyeaseai/types` | `import { User } from '@realtyeaseai/types'` |
| Utils | `@realtyeaseai/utils` | `import { formatDate } from '@realtyeaseai/utils'` |
| Auth | `@realtyeaseai/auth` | `import { auth } from '@realtyeaseai/auth'` |
| Database | `@realtyeaseai/database` | `import { prisma } from '@realtyeaseai/database'` |
| MongoDB | `@realtyeaseai/mongodb` | `import { mongodb } from '@realtyeaseai/mongodb'` |

---

## 🎨 UI Package Imports

### Primitive Components
```typescript
import { 
  Button, 
  Input, 
  Card, 
  Dialog,
  Table 
} from '@realtyeaseai/ui';
```

### Feature Components
```typescript
// Option 1: From main package (recommended)
import { 
  DashboardOverview,
  LoginForm 
} from '@realtyeaseai/ui';

// Option 2: Granular imports
import { DashboardOverview } from '@realtyeaseai/ui/features/dashboard';
import { LoginForm } from '@realtyeaseai/ui/features/auth';
```

### Layouts
```typescript
import { DashboardLayout } from '@realtyeaseai/ui';
// or
import { DashboardLayout } from '@realtyeaseai/ui/layouts/dashboard-layout';
```

### Styles
```typescript
import '@realtyeaseai/ui/styles/globals.css';
```

---

## 📁 File Naming

| Type | Format | Example |
|------|--------|---------|
| Component | `PascalCase.tsx` | `Button.tsx` |
| Hook | `useHookName.ts` | `useAuth.ts` |
| Utility | `camelCase.ts` | `formatDate.ts` |
| Type | `PascalCase.ts` | `User.ts` |
| Page | `page.tsx` | `page.tsx` |
| Layout | `layout.tsx` | `layout.tsx` |

---

## 📂 Directory Structure

```
packages/ui/src/
├── features/           # Feature components
│   ├── dashboard/     # Dashboard features
│   └── auth/          # Auth features
├── layouts/           # Layout components
├── hooks/             # Shared hooks
├── lib/               # Utilities
└── (primitives)       # UI components (root level)
```

---

## 🎯 Import Order

```typescript
// 1. External dependencies
import React from 'react';
import { useRouter } from 'next/navigation';

// 2. Internal packages (monorepo)
import { Button } from '@realtyeaseai/ui';
import { User } from '@realtyeaseai/types';
import { formatDate } from '@realtyeaseai/utils';

// 3. Relative imports
import { Header } from './components/Header';
import { useAuth } from './hooks/useAuth';

// 4. Styles
import './styles.css';
```

---

## 🔧 TypeScript Conventions

### Interfaces
```typescript
// ✅ Good
interface UserProps {
  name: string;
  email: string;
}

// ❌ Avoid
interface IUserProps { }
```

### Types
```typescript
// ✅ Good
type UserRole = 'admin' | 'client' | 'va';

// ❌ Avoid
type TUserRole = string;
```

### Enums
```typescript
// ✅ Good
enum TaskStatus {
  Pending = 'pending',
  InProgress = 'in_progress',
  Completed = 'completed',
}

// ❌ Avoid
enum ETaskStatus { }
```

---

## 🧩 Component Patterns

### Component Props
```typescript
interface ButtonProps {
  variant: 'primary' | 'secondary';
  size: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export function Button({ variant, size, children }: ButtonProps) {
  return <button>{children}</button>;
}
```

### Named Exports (Preferred)
```typescript
// ✅ Good
export function Button() { }

// Usage
import { Button } from '@realtyeaseai/ui';
```

### Default Exports (Pages Only)
```typescript
// ✅ Acceptable for Next.js pages
export default function HomePage() { }
```

---

## 📋 Common Tasks

### Adding a New Component to UI Package

1. Create component file:
```bash
# Primitive component
touch packages/ui/src/my-component.tsx

# Feature component
touch packages/ui/src/features/dashboard/MyFeature.tsx
```

2. Export from index:
```typescript
// packages/ui/src/index.ts
export * from './my-component';

// or for features
// packages/ui/src/features/dashboard/index.ts
export { MyFeature } from './MyFeature';
```

### Adding a New Type

1. Create type file:
```bash
touch packages/types/src/MyType.ts
```

2. Export from index:
```typescript
// packages/types/src/index.ts
export * from './MyType';
```

### Adding a New Utility

1. Create utility file:
```bash
touch packages/utils/src/myUtil.ts
```

2. Export from index:
```typescript
// packages/utils/src/index.ts
export * from './myUtil';
```

---

## 🎨 Available UI Components

### Primitives (40+)
- Accordion
- Alert, Alert Dialog
- Avatar
- Badge
- Button
- Card
- Checkbox
- Dialog
- Dropdown Menu
- Form
- Input
- Select
- Table
- Tabs
- Textarea
- Toast
- Tooltip
- ... and more

### Features
**Dashboard**:
- AIToolsHub
- DashboardOverview
- InvoicePayments
- MessagingCenter
- ProjectManagement
- ProjectsAndTasks
- SuperAdminPanel
- TaskManagement
- TeamManagement
- VAManagement

**Auth**:
- LoginForm

### Layouts
- DashboardLayout

---

## 🔍 Finding Components

### Search by Name
```bash
# Find a component
grep -r "export.*ComponentName" packages/ui/src/

# Find imports
grep -r "import.*ComponentName" apps/
```

### Browse Structure
```bash
# List all UI components
ls packages/ui/src/*.tsx

# List feature components
ls packages/ui/src/features/*/
```

---

## 🐛 Troubleshooting

### Import Not Found
```typescript
// ❌ Error: Module not found
import { MyComponent } from '@realtyeaseai/ui/dashboard';

// ✅ Fix: Use correct path
import { MyComponent } from '@realtyeaseai/ui';
// or
import { MyComponent } from '@realtyeaseai/ui/features/dashboard';
```

### Type Errors
```bash
# Clear cache and rebuild
rm -rf node_modules .turbo
npm install
npm run build
```

### Build Errors
```bash
# Check for circular dependencies
npm run build -- --verbose

# Type check
npm run type-check
```

---

## 📚 Documentation

| Document | Purpose |
|----------|---------|
| `NAMING_CONVENTIONS.md` | Naming standards & best practices |
| `STRUCTURE_GUIDE.md` | Visual structure overview |
| `IMPLEMENTATION_SUMMARY.md` | Recent changes summary |
| `RESTRUCTURING_PLAN.md` | Implementation roadmap |
| `MONOREPO_ARCHITECTURE.md` | Architecture decisions |
| `README.md` | Project overview |

---

## 🎯 Best Practices

1. ✅ Use named exports (not default)
2. ✅ Import from main package when possible
3. ✅ Follow file naming conventions
4. ✅ Keep components focused and small
5. ✅ Use TypeScript for type safety
6. ✅ Document complex logic
7. ✅ Test before committing

---

## 🚨 Common Mistakes

| ❌ Don't | ✅ Do |
|---------|-------|
| `import { Button } from '../../../ui'` | `import { Button } from '@realtyeaseai/ui'` |
| `export default function Button()` | `export function Button()` |
| `interface IButtonProps` | `interface ButtonProps` |
| `button.tsx` | `Button.tsx` |
| `use_auth.ts` | `useAuth.ts` |

---

## 💡 Tips

- Use IDE autocomplete for imports
- Run `npm run type-check` before committing
- Keep components in appropriate packages
- Use barrel exports for clean imports
- Follow the established patterns

---

## 📞 Need Help?

1. Check the documentation files
2. Search existing code for examples
3. Run `npm run build` to verify changes
4. Ask the team!

---

**Quick Reference Version**: 1.0.0  
**Last Updated**: 2025-11-27  
**Print this for your desk!** 📌
