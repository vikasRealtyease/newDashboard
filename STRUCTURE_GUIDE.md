# Monorepo Structure - Visual Guide

**Last Updated**: 2025-11-27

---

## 📁 Complete Directory Structure

```
realtyeaseai-monorepo/
│
├── 📄 Documentation
│   ├── NAMING_CONVENTIONS.md          # ✨ Naming standards & best practices
│   ├── RESTRUCTURING_PLAN.md          # ✨ Implementation roadmap
│   ├── IMPLEMENTATION_SUMMARY.md      # ✨ Changes summary
│   ├── MONOREPO_ARCHITECTURE.md       # Architecture decisions
│   ├── ARCHITECTURE_DECISIONS.md      # Technical decisions
│   ├── AUTH_STRATEGY.md               # Authentication approach
│   ├── DATABASE_STRATEGY.md           # Database design
│   ├── DEPLOYMENT_STRATEGY.md         # Deployment guide
│   ├── IMPLEMENTATION_ROADMAP.md      # Development roadmap
│   ├── MASTER_IMPLEMENTATION_GUIDE.md # Master guide
│   ├── QUICK_START.md                 # Quick start guide
│   └── README.md                      # Project overview
│
├── 📱 Applications (apps/)
│   ├── web/                           # Marketing website
│   │   └── package.json               # @realtyeaseai/web ✅ Updated
│   ├── admin/                         # Admin dashboard
│   │   └── package.json               # @realtyeaseai/admin
│   ├── client/                        # Client dashboard
│   │   └── package.json               # @realtyeaseai/client
│   ├── manager/                       # Manager dashboard
│   │   └── package.json               # @realtyeaseai/manager
│   └── va/                            # VA dashboard
│       └── package.json               # @realtyeaseai/va
│
├── 📦 Shared Packages (packages/)
│   ├── ui/                            # ✨ Restructured UI components
│   │   ├── src/
│   │   │   ├── features/              # ✨ NEW: Feature components
│   │   │   │   ├── dashboard/         # Dashboard-specific components
│   │   │   │   │   ├── AIToolsHub.tsx
│   │   │   │   │   ├── DashboardOverview.tsx
│   │   │   │   │   ├── InvoicePayments.tsx
│   │   │   │   │   ├── MessagingCenter.tsx
│   │   │   │   │   ├── ProjectManagement.tsx
│   │   │   │   │   ├── ProjectsAndTasks.tsx
│   │   │   │   │   ├── SuperAdminPanel.tsx
│   │   │   │   │   ├── TaskManagement.tsx
│   │   │   │   │   ├── TeamManagement.tsx
│   │   │   │   │   ├── VAManagement.tsx
│   │   │   │   │   └── index.ts
│   │   │   │   ├── auth/              # Auth components
│   │   │   │   │   ├── login-form.tsx
│   │   │   │   │   └── index.ts       # ✨ NEW
│   │   │   │   └── index.ts           # ✨ NEW
│   │   │   ├── layouts/               # Layout components
│   │   │   │   └── dashboard-layout.tsx
│   │   │   ├── (primitives)/          # Primitive UI components
│   │   │   │   ├── button.tsx
│   │   │   │   ├── input.tsx
│   │   │   │   ├── card.tsx
│   │   │   │   └── ... (40+ components)
│   │   │   ├── hooks/                 # Shared hooks
│   │   │   │   └── use-mobile.ts
│   │   │   ├── lib/                   # Utilities
│   │   │   │   └── utils.ts
│   │   │   ├── styles/                # Global styles
│   │   │   │   └── globals.css
│   │   │   └── index.ts               # ✨ Updated main export
│   │   └── package.json               # @realtyeaseai/ui
│   │
│   ├── types/                         # TypeScript types
│   │   ├── src/
│   │   │   └── index.ts
│   │   └── package.json               # @realtyeaseai/types
│   │
│   ├── utils/                         # Shared utilities
│   │   ├── src/
│   │   │   └── index.ts
│   │   └── package.json               # @realtyeaseai/utils
│   │
│   ├── auth/                          # Authentication
│   │   ├── src/
│   │   │   └── index.ts
│   │   └── package.json               # @realtyeaseai/auth
│   │
│   ├── database/                      # Database (PostgreSQL)
│   │   └── package.json               # @realtyeaseai/database
│   │
│   └── mongodb/                       # MongoDB client
│       └── package.json               # @realtyeaseai/mongodb
│
├── ⚙️ Configuration
│   ├── package.json                   # Root package (realtyeaseai-monorepo)
│   ├── turbo.json                     # Turborepo config
│   ├── pnpm-workspace.yaml            # Workspace config
│   ├── .env                           # Environment variables
│   └── .env.example                   # Environment template
│
└── 🔧 Build Artifacts
    ├── node_modules/
    ├── .turbo/
    └── package-lock.json
```

---

## 🎯 Key Changes Highlighted

### ✨ New Structure

```
packages/ui/src/
├── features/              ← ✨ NEW: Organized feature components
│   ├── dashboard/         ← ✨ MOVED from src/dashboard/
│   ├── auth/              ← ✨ MOVED from src/auth/
│   └── index.ts           ← ✨ NEW: Barrel export
```

### ❌ Removed

```
packages/ui/src/
├── dashboard/             ← ❌ REMOVED (moved to features/)
└── auth/                  ← ❌ REMOVED (moved to features/)
```

---

## 📊 Package Dependency Graph

```
┌─────────────────────────────────────────────────────────────┐
│                     Applications                             │
├─────────────────────────────────────────────────────────────┤
│  web     admin     client     manager     va                │
│   │        │          │          │         │                │
│   └────────┴──────────┴──────────┴─────────┘                │
│                       │                                      │
│                       ↓                                      │
├─────────────────────────────────────────────────────────────┤
│                  Shared Packages                             │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│   ┌──────────┐    ┌──────────┐    ┌──────────┐            │
│   │    UI    │    │  Types   │    │  Utils   │            │
│   │ (✨ new) │    │          │    │          │            │
│   └──────────┘    └──────────┘    └──────────┘            │
│        │               │                │                   │
│        └───────────────┴────────────────┘                   │
│                        │                                     │
│   ┌──────────┐    ┌──────────┐    ┌──────────┐            │
│   │   Auth   │    │ Database │    │ MongoDB  │            │
│   └──────────┘    └──────────┘    └──────────┘            │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

---

## 🎨 UI Package Structure (Detailed)

```
@realtyeaseai/ui
│
├── 🎨 Primitive Components (Root Level)
│   ├── accordion.tsx
│   ├── alert-dialog.tsx
│   ├── alert.tsx
│   ├── avatar.tsx
│   ├── badge.tsx
│   ├── button.tsx
│   ├── card.tsx
│   ├── checkbox.tsx
│   ├── dialog.tsx
│   ├── dropdown-menu.tsx
│   ├── form.tsx
│   ├── input.tsx
│   ├── select.tsx
│   ├── table.tsx
│   ├── tabs.tsx
│   └── ... (40+ shadcn/ui components)
│
├── 🧩 Feature Components (features/)
│   ├── dashboard/
│   │   ├── AIToolsHub.tsx           # AI tools integration
│   │   ├── DashboardOverview.tsx    # Main dashboard view
│   │   ├── InvoicePayments.tsx      # Invoice management
│   │   ├── MessagingCenter.tsx      # Communication hub
│   │   ├── ProjectManagement.tsx    # Project tracking
│   │   ├── ProjectsAndTasks.tsx     # Tasks overview
│   │   ├── SuperAdminPanel.tsx      # Admin controls
│   │   ├── TaskManagement.tsx       # Task management
│   │   ├── TeamManagement.tsx       # Team coordination
│   │   ├── VAManagement.tsx         # VA management
│   │   └── index.ts                 # Barrel export
│   │
│   └── auth/
│       ├── login-form.tsx           # Login component
│       └── index.ts                 # Barrel export
│
├── 📐 Layouts (layouts/)
│   └── dashboard-layout.tsx         # Main dashboard layout
│
├── 🪝 Hooks (hooks/)
│   └── use-mobile.ts                # Mobile detection hook
│
├── 🛠️ Utilities (lib/)
│   └── utils.ts                     # Helper functions
│
├── 🎨 Styles (styles/)
│   └── globals.css                  # Global styles
│
└── 📦 Exports
    └── index.ts                     # Main barrel export
```

---

## 🔄 Import Patterns

### Option 1: Main Package Import (Recommended)

```typescript
// Import everything from main package
import { 
  Button,                    // Primitive component
  Card,                      // Primitive component
  DashboardOverview,         // Feature component
  LoginForm,                 // Feature component
  DashboardLayout            // Layout component
} from '@realtyeaseai/ui';
```

### Option 2: Granular Imports

```typescript
// Import specific features
import { DashboardOverview } from '@realtyeaseai/ui/features/dashboard';
import { LoginForm } from '@realtyeaseai/ui/features/auth';
import { DashboardLayout } from '@realtyeaseai/ui/layouts/dashboard-layout';
```

### Option 3: Mixed Approach

```typescript
// Primitives from main package
import { Button, Card, Input } from '@realtyeaseai/ui';

// Features from granular paths
import { DashboardOverview } from '@realtyeaseai/ui/features/dashboard';
```

---

## 📋 Component Categories

### 🎨 Primitive Components (40+)
**Location**: `packages/ui/src/*.tsx`  
**Purpose**: Basic, reusable UI building blocks  
**Examples**: Button, Input, Card, Dialog, Table

### 🧩 Feature Components (11)
**Location**: `packages/ui/src/features/`  
**Purpose**: Complex, feature-specific components  
**Categories**:
- **Dashboard** (10 components): Business logic components
- **Auth** (1 component): Authentication forms

### 📐 Layout Components (1)
**Location**: `packages/ui/src/layouts/`  
**Purpose**: Page layout structures  
**Examples**: DashboardLayout

### 🪝 Hooks (1+)
**Location**: `packages/ui/src/hooks/`  
**Purpose**: Reusable React hooks  
**Examples**: use-mobile

### 🛠️ Utilities
**Location**: `packages/ui/src/lib/`  
**Purpose**: Helper functions  
**Examples**: cn (classnames utility)

---

## 🎯 Naming Conventions Summary

### Packages
```
Format: @realtyeaseai/[package-name]
Case:   lowercase-with-hyphens
```

### Files
```
Components:  PascalCase.tsx
Hooks:       useHookName.ts
Utils:       camelCase.ts
Types:       PascalCase.ts
Pages:       page.tsx, layout.tsx
```

### Directories
```
General:     lowercase-with-hyphens
Components:  PascalCase (optional)
```

---

## ✅ Status Legend

- ✅ **Correct**: Follows conventions
- ✨ **New**: Recently added/updated
- ⚠️ **Can Improve**: Works but can be better organized
- ❌ **Removed**: No longer exists

---

## 🚀 Quick Commands

```bash
# Install dependencies
npm install

# Build all packages
npm run build

# Start development
npm run dev

# Type check
npm run type-check

# Lint code
npm run lint

# Format code
npm run format
```

---

## 📚 Related Documentation

- **NAMING_CONVENTIONS.md** - Detailed naming standards
- **RESTRUCTURING_PLAN.md** - Implementation roadmap
- **IMPLEMENTATION_SUMMARY.md** - Changes summary
- **MONOREPO_ARCHITECTURE.md** - Architecture overview

---

**Last Updated**: 2025-11-27  
**Status**: ✅ Current  
**Maintained By**: RealtyEaseAI Team
