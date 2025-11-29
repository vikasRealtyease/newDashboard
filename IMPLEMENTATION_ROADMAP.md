# Implementation Roadmap - Getting Started

**Last Updated**: 2025-11-27  
**Status**: Ready to implement  
**Your Setup**: Vercel Pro + GitHub

---

## 🎯 You Have Vercel Pro - Here's What's Next!

### **Vercel Pro Benefits You Get:**
- ✅ **1TB bandwidth/month** (vs 100GB free)
- ✅ **Unlimited team members**
- ✅ **Advanced analytics**
- ✅ **Password protection** for preview deployments
- ✅ **Faster build times**
- ✅ **Priority support**
- ✅ **Web Analytics** (built-in)

**This means:** You can easily handle **50k-100k users** without additional costs! 🚀

---

## 📋 Step-by-Step Implementation Plan

### **Phase 1: Setup Foundation (Week 1)**

#### **Day 1-2: Repository Setup**

1. **Initialize Monorepo Structure**
```bash
# Navigate to your project
cd "c:\Users\Home\Documents\AI Dashboard for SaaS"

# Initialize pnpm (faster than npm)
npm install -g pnpm

# Initialize workspace
pnpm init

# Create directory structure
mkdir -p apps/web apps/admin apps/client apps/va apps/manager
mkdir -p packages/database packages/ui packages/types packages/utils
mkdir -p packages/auth packages/messaging packages/payments packages/api-client
```

2. **Setup Turborepo**
```bash
# Install Turborepo
pnpm add -D turbo

# Create turbo.json
```

**Create `turbo.json`:**
```json
{
  "$schema": "https://turbo.build/schema.json",
  "globalDependencies": ["**/.env.*local"],
  "pipeline": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": [".next/**", "!.next/cache/**", "dist/**"]
    },
    "dev": {
      "cache": false,
      "persistent": true
    },
    "lint": {
      "dependsOn": ["^lint"]
    },
    "type-check": {
      "dependsOn": ["^type-check"]
    }
  }
}
```

**Create `pnpm-workspace.yaml`:**
```yaml
packages:
  - 'apps/*'
  - 'packages/*'
```

**Update root `package.json`:**
```json
{
  "name": "virtualassist-monorepo",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "turbo run dev",
    "build": "turbo run build",
    "lint": "turbo run lint",
    "type-check": "turbo run type-check",
    "clean": "turbo run clean && rm -rf node_modules"
  },
  "devDependencies": {
    "turbo": "^1.11.0",
    "typescript": "^5.3.0"
  },
  "packageManager": "pnpm@8.0.0"
}
```

---

#### **Day 3-4: Setup Database (Supabase)**

1. **Create Supabase Project**
   - Go to https://supabase.com
   - Click "New Project"
   - Name: "virtualassist-ai"
   - Region: Choose closest to your users
   - Database password: Generate strong password
   - Click "Create Project"

2. **Setup Prisma in Database Package**
```bash
cd packages/database
pnpm init
pnpm add prisma @prisma/client
pnpm add -D tsx
```

**Create `packages/database/package.json`:**
```json
{
  "name": "@virtualassist/database",
  "version": "1.0.0",
  "main": "./src/index.ts",
  "types": "./src/index.ts",
  "scripts": {
    "db:generate": "prisma generate",
    "db:push": "prisma db push",
    "db:migrate": "prisma migrate dev",
    "db:studio": "prisma studio"
  },
  "dependencies": {
    "@prisma/client": "^5.7.0"
  },
  "devDependencies": {
    "prisma": "^5.7.0",
    "tsx": "^4.7.0"
  }
}
```

**Create `packages/database/prisma/schema.prisma`:**
```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

// Core Models
model User {
  id        String     @id @default(uuid())
  email     String     @unique
  password  String
  createdAt DateTime   @default(now())
  updatedAt DateTime   @updatedAt
  
  roles     UserRole[]
  profile   UserProfile?
}

model UserRole {
  id        String   @id @default(uuid())
  userId    String
  role      Role
  isPrimary Boolean  @default(false)
  
  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  
  @@unique([userId, role])
}

model UserProfile {
  id        String   @id @default(uuid())
  userId    String   @unique
  firstName String
  lastName  String
  avatar    String?
  phone     String?
  
  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)
}

enum Role {
  ADMIN
  MANAGER
  CLIENT
  VA
}

// Client Model
model Client {
  id          String   @id @default(uuid())
  userId      String   @unique
  companyName String?
  createdAt   DateTime @default(now())
  
  projects    Project[]
  invoices    Invoice[]
}

// Manager Model
model Manager {
  id         String   @id @default(uuid())
  userId     String   @unique
  department String?
  teamSize   Int?
  hireDate   DateTime @default(now())
  
  vaAssignments ManagerVAAssignment[]
  projects      ManagerProjectOversight[]
}

// VA Model
model VirtualAssistant {
  id           String   @id @default(uuid())
  userId       String   @unique
  skills       String[]
  hourlyRate   Decimal  @db.Decimal(10, 2)
  availability String?
  createdAt    DateTime @default(now())
  
  tasks        Task[]
  timeEntries  TimeEntry[]
  payouts      VAPayout[]
}

// Projects & Tasks
model Project {
  id          String        @id @default(uuid())
  clientId    String
  managerId   String?
  name        String
  description String?
  status      ProjectStatus @default(ACTIVE)
  createdAt   DateTime      @default(now())
  updatedAt   DateTime      @updatedAt
  
  client      Client        @relation(fields: [clientId], references: [id])
  tasks       Task[]
  vas         ProjectVA[]
  oversight   ManagerProjectOversight[]
}

model ProjectVA {
  id         String   @id @default(uuid())
  projectId  String
  vaId       String
  assignedAt DateTime @default(now())
  
  project    Project  @relation(fields: [projectId], references: [id])
}

model Task {
  id          String     @id @default(uuid())
  projectId   String
  vaId        String?
  title       String
  description String?
  status      TaskStatus @default(TODO)
  priority    Priority   @default(MEDIUM)
  dueDate     DateTime?
  createdAt   DateTime   @default(now())
  updatedAt   DateTime   @updatedAt
  
  project     Project    @relation(fields: [projectId], references: [id])
  va          VirtualAssistant? @relation(fields: [vaId], references: [id])
  timeEntries TimeEntry[]
}

// Messaging
model Conversation {
  id          String                    @id @default(uuid())
  type        ConversationType
  projectId   String?
  createdAt   DateTime                  @default(now())
  
  participants ConversationParticipant[]
  messages    Message[]
}

model ConversationParticipant {
  id             String       @id @default(uuid())
  conversationId String
  userId         String
  role           String
  joinedAt       DateTime     @default(now())
  lastReadAt     DateTime?
  
  conversation   Conversation @relation(fields: [conversationId], references: [id])
}

model Message {
  id             String       @id @default(uuid())
  conversationId String
  senderId       String
  content        String
  messageType    MessageType  @default(TEXT)
  sentAt         DateTime     @default(now())
  editedAt       DateTime?
  deletedAt      DateTime?
  
  conversation   Conversation @relation(fields: [conversationId], references: [id])
  attachments    MessageAttachment[]
  reactions      MessageReaction[]
}

model MessageAttachment {
  id         String   @id @default(uuid())
  messageId  String
  fileUrl    String
  fileName   String
  fileSize   Int
  fileType   String
  uploadedAt DateTime @default(now())
  
  message    Message  @relation(fields: [messageId], references: [id])
}

model MessageReaction {
  id        String   @id @default(uuid())
  messageId String
  userId    String
  emoji     String
  createdAt DateTime @default(now())
  
  message   Message  @relation(fields: [messageId], references: [id])
}

// Payments
model Invoice {
  id            String        @id @default(uuid())
  clientId      String
  invoiceNumber String        @unique
  amount        Decimal       @db.Decimal(10, 2)
  tax           Decimal       @db.Decimal(10, 2)
  total         Decimal       @db.Decimal(10, 2)
  status        InvoiceStatus @default(PENDING)
  dueDate       DateTime
  paidAt        DateTime?
  paypalInvoiceId String?
  paypalOrderId   String?
  createdAt     DateTime      @default(now())
  
  client        Client        @relation(fields: [clientId], references: [id])
  items         InvoiceItem[]
  payments      Payment[]
}

model InvoiceItem {
  id          String  @id @default(uuid())
  invoiceId   String
  vaId        String?
  taskId      String?
  description String
  hours       Decimal @db.Decimal(5, 2)
  rate        Decimal @db.Decimal(10, 2)
  amount      Decimal @db.Decimal(10, 2)
  
  invoice     Invoice @relation(fields: [invoiceId], references: [id])
}

model Payment {
  id                  String        @id @default(uuid())
  invoiceId           String
  clientId            String
  amount              Decimal       @db.Decimal(10, 2)
  paypalTransactionId String?
  paypalPayerId       String?
  status              PaymentStatus @default(PENDING)
  paidAt              DateTime?
  refundedAt          DateTime?
  failureReason       String?
  createdAt           DateTime      @default(now())
  
  invoice             Invoice       @relation(fields: [invoiceId], references: [id])
}

model VAPayout {
  id                   String       @id @default(uuid())
  vaId                 String
  amount               Decimal      @db.Decimal(10, 2)
  status               PayoutStatus @default(PENDING)
  paypalPayoutBatchId  String?
  paypalPayoutItemId   String?
  paidAt               DateTime?
  createdAt            DateTime     @default(now())
  
  va                   VirtualAssistant @relation(fields: [vaId], references: [id])
}

// Time Tracking
model TimeEntry {
  id        String   @id @default(uuid())
  vaId      String
  taskId    String
  startTime DateTime
  endTime   DateTime?
  duration  Int?     // in minutes
  createdAt DateTime @default(now())
  
  va        VirtualAssistant @relation(fields: [vaId], references: [id])
  task      Task     @relation(fields: [taskId], references: [id])
}

// Manager Relations
model ManagerVAAssignment {
  id           String    @id @default(uuid())
  managerId    String
  vaId         String
  assignedAt   DateTime  @default(now())
  unassignedAt DateTime?
  
  manager      Manager   @relation(fields: [managerId], references: [id])
}

model ManagerProjectOversight {
  id         String   @id @default(uuid())
  managerId  String
  projectId  String
  assignedAt DateTime @default(now())
  
  manager    Manager  @relation(fields: [managerId], references: [id])
  project    Project  @relation(fields: [projectId], references: [id])
}

// Enums
enum ProjectStatus {
  ACTIVE
  COMPLETED
  ON_HOLD
  CANCELLED
}

enum TaskStatus {
  TODO
  IN_PROGRESS
  IN_REVIEW
  COMPLETED
  CANCELLED
}

enum Priority {
  LOW
  MEDIUM
  HIGH
  URGENT
}

enum ConversationType {
  DIRECT
  GROUP
  ANNOUNCEMENT
}

enum MessageType {
  TEXT
  FILE
  IMAGE
  SYSTEM
}

enum InvoiceStatus {
  DRAFT
  PENDING
  PAID
  OVERDUE
  CANCELLED
}

enum PaymentStatus {
  PENDING
  COMPLETED
  FAILED
  REFUNDED
}

enum PayoutStatus {
  PENDING
  PROCESSING
  PAID
  FAILED
}
```

**Create `packages/database/src/index.ts`:**
```typescript
import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

export * from '@prisma/client';
```

**Create `.env` in root:**
```env
# Supabase
DATABASE_URL="postgresql://postgres:[YOUR-PASSWORD]@db.[YOUR-PROJECT-REF].supabase.co:5432/postgres"
NEXT_PUBLIC_SUPABASE_URL="https://[YOUR-PROJECT-REF].supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="[YOUR-ANON-KEY]"
SUPABASE_SERVICE_ROLE_KEY="[YOUR-SERVICE-ROLE-KEY]"

# PayPal
PAYPAL_CLIENT_ID="[YOUR-PAYPAL-CLIENT-ID]"
PAYPAL_CLIENT_SECRET="[YOUR-PAYPAL-CLIENT-SECRET]"
PAYPAL_BUSINESS_EMAIL="business@virtualassist.ai"
NEXT_PUBLIC_PAYPAL_CLIENT_ID="[YOUR-PAYPAL-CLIENT-ID]"

# App URLs
NEXT_PUBLIC_APP_URL="http://localhost:3000"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="[GENERATE-RANDOM-SECRET]"
```

3. **Run Initial Migration**
```bash
cd packages/database
pnpm db:push
```

---

#### **Day 5-7: Setup Shared Packages**

1. **Create UI Package**
```bash
cd packages/ui
pnpm init
pnpm add react react-dom tailwindcss @tailwindcss/postcss
pnpm add -D @types/react @types/react-dom typescript
```

**Create `packages/ui/package.json`:**
```json
{
  "name": "@virtualassist/ui",
  "version": "1.0.0",
  "main": "./src/index.ts",
  "types": "./src/index.ts",
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "tailwindcss": "^4.0.0-alpha.34",
    "clsx": "^2.0.0",
    "class-variance-authority": "^0.7.0"
  },
  "devDependencies": {
    "@types/react": "^18.2.0",
    "@types/react-dom": "^18.2.0",
    "typescript": "^5.3.0"
  }
}
```

**Create `packages/ui/src/components/Button.tsx`:**
```typescript
import { cva, type VariantProps } from 'class-variance-authority';
import { clsx } from 'clsx';

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        primary: 'bg-blue-600 text-white hover:bg-blue-700',
        secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300',
        outline: 'border border-gray-300 bg-transparent hover:bg-gray-100',
        ghost: 'hover:bg-gray-100',
        danger: 'bg-red-600 text-white hover:bg-red-700',
      },
      size: {
        sm: 'h-9 px-3 text-sm',
        md: 'h-10 px-4',
        lg: 'h-11 px-8 text-lg',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export function Button({ className, variant, size, ...props }: ButtonProps) {
  return (
    <button
      className={clsx(buttonVariants({ variant, size }), className)}
      {...props}
    />
  );
}
```

**Create `packages/ui/src/index.ts`:**
```typescript
export * from './components/Button';
// Export more components as you create them
```

2. **Create Types Package**
```bash
cd packages/types
pnpm init
```

**Create `packages/types/src/index.ts`:**
```typescript
export * from './models';
export * from './api';

// Re-export Prisma types
export type { User, UserRole, Role, Client, Manager, VirtualAssistant } from '@virtualassist/database';
```

---

### **Phase 2: Create First App (Week 2)**

Let's start with the **Client Dashboard** as it's the most important:

```bash
cd apps/client
npx create-next-app@latest . --typescript --tailwind --app --no-src-dir
```

**Update `apps/client/package.json`:**
```json
{
  "name": "@virtualassist/client",
  "version": "1.0.0",
  "scripts": {
    "dev": "next dev -p 3001",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "@virtualassist/database": "workspace:*",
    "@virtualassist/ui": "workspace:*",
    "@virtualassist/types": "workspace:*",
    "next": "latest",
    "react": "latest",
    "react-dom": "latest",
    "@tanstack/react-query": "^5.0.0",
    "next-auth": "^4.24.0",
    "@paypal/react-paypal-js": "^8.1.0"
  }
}
```

---

### **Phase 3: Deploy to Vercel (Week 2)**

1. **Push to GitHub**
```bash
git init
git add .
git commit -m "Initial monorepo setup"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/virtualassist-ai.git
git push -u origin main
```

2. **Connect to Vercel**
   - Go to https://vercel.com
   - Click "Add New Project"
   - Import your GitHub repo
   - Vercel will detect the monorepo
   - Create 5 separate projects:
     - `virtualassist-web` → `apps/web`
     - `virtualassist-admin` → `apps/admin`
     - `virtualassist-client` → `apps/client`
     - `virtualassist-va` → `apps/va`
     - `virtualassist-manager` → `apps/manager`

3. **Add Environment Variables** (in Vercel dashboard for each project)
   - Copy all variables from your `.env`
   - Add to each project's settings

4. **Deploy!**
   - Vercel will auto-deploy on every push to `main`

---

## 🎯 Next Immediate Steps

1. **Today:** Setup monorepo structure
2. **Tomorrow:** Setup Supabase + Prisma
3. **This Week:** Create client dashboard
4. **Next Week:** Deploy to Vercel

Would you like me to help you with any specific step? I can:
- Generate the complete file structure
- Create starter code for any package
- Help with Vercel deployment
- Setup CI/CD pipeline

Let me know what you'd like to tackle first! 🚀
