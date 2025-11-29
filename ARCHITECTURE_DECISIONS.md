# Architecture Decisions for VirtualAssist AI SaaS Platform

**Last Updated**: 2025-11-27  
**Version**: 1.0.0

---

## 🎯 Platform Overview

### User Roles
1. **Admin** - System administrator with full access
2. **Manager** - Oversees VAs and client projects
3. **Client** - Business owners who hire VAs
4. **VA (Virtual Assistant)** - Service providers

### Core Features
- ✅ Multi-role authentication and authorization
- ✅ Real-time messaging between Client ↔ VA ↔ Manager
- ✅ Payment processing for clients
- ✅ Task and project management
- ✅ Time tracking and invoicing

---

## 📋 Architecture Decisions

### 1. **Authentication Strategy**

**Decision: Single Sign-On (SSO) with Role-Based Access Control**

**Why:**
- ✅ Single user account can have multiple roles (e.g., a Manager who is also a Client)
- ✅ Seamless experience across all dashboards
- ✅ Centralized user management
- ✅ Easier to implement role switching
- ✅ Better security with single token management

**Implementation:**
```typescript
// Shared authentication with role-based routing
interface User {
  id: string;
  email: string;
  roles: UserRole[]; // Can have multiple roles
  primaryRole: UserRole;
  profile: UserProfile;
}

enum UserRole {
  ADMIN = 'admin',
  MANAGER = 'manager',
  CLIENT = 'client',
  VA = 'va'
}
```

**Login Flow:**
1. User logs in once at `auth.virtualassist.ai`
2. System checks user roles
3. Redirects to appropriate dashboard based on primary role
4. User can switch between roles if they have multiple

**Tech Stack:**
- **Auth Provider**: NextAuth.js (supports multiple providers, JWT, sessions)
- **Token Storage**: HTTP-only cookies + localStorage for client state
- **Session Management**: Redis for server-side sessions
- **Password Security**: bcrypt with salt rounds

**Package Structure:**
```
packages/auth/
├── providers/
│   ├── AuthProvider.tsx
│   └── RoleProvider.tsx
├── hooks/
│   ├── useAuth.ts
│   ├── useRole.ts
│   └── usePermissions.ts
├── guards/
│   ├── ProtectedRoute.tsx
│   └── RoleGuard.tsx
└── utils/
    ├── token.ts
    └── permissions.ts
```

---

### 2. **Database Strategy**

**Decision: Single Shared Database with Multi-Tenancy**

**Why:**
- ✅ Easier to manage relationships (Client → Manager → VA)
- ✅ Real-time messaging requires shared data
- ✅ Payment tracking across all roles
- ✅ Simplified reporting and analytics
- ✅ Better data consistency
- ✅ Cost-effective (single database instance)

**Database Schema:**
```sql
-- Core Tables
users (id, email, password_hash, created_at)
user_roles (user_id, role, is_primary)
user_profiles (user_id, first_name, last_name, avatar, phone)

-- Business Logic
clients (id, user_id, company_name, billing_info)
managers (id, user_id, department, team_size)
virtual_assistants (id, user_id, skills, hourly_rate, availability)

-- Projects & Tasks
projects (id, client_id, manager_id, name, status)
project_vas (project_id, va_id, assigned_at)
tasks (id, project_id, va_id, title, status, priority)

-- Messaging
conversations (id, type, created_at)
conversation_participants (conversation_id, user_id, role)
messages (id, conversation_id, sender_id, content, sent_at, read_at)
message_attachments (id, message_id, file_url, file_type)

-- Payments
invoices (id, client_id, amount, status, due_date)
invoice_items (id, invoice_id, description, amount, va_id)
payments (id, invoice_id, amount, payment_method, paid_at)
payment_methods (id, client_id, type, details, is_default)

-- Time Tracking
time_entries (id, va_id, task_id, start_time, end_time, duration)
```

**Tech Stack:**
- **Database**: PostgreSQL (robust, ACID compliant, great for complex queries)
- **ORM**: Prisma (type-safe, great DX, auto-migrations)
- **Caching**: Redis (for sessions, real-time data, rate limiting)
- **Search**: PostgreSQL Full-Text Search (or Algolia for advanced search)

**Multi-Tenancy Approach:**
- Row-Level Security (RLS) in PostgreSQL
- Each query filtered by user's organization/role
- Prevents data leakage between clients

---

### 3. **API Architecture**

**Decision: Single Backend (Monolithic API) with Modular Structure**

**Why:**
- ✅ Easier to manage shared data (messaging, payments)
- ✅ Simpler deployment and monitoring
- ✅ Better for real-time features (WebSockets)
- ✅ Faster development for MVP
- ✅ Can migrate to microservices later if needed

**API Structure:**
```
apps/api/
├── src/
│   ├── modules/
│   │   ├── auth/
│   │   │   ├── auth.controller.ts
│   │   │   ├── auth.service.ts
│   │   │   └── auth.routes.ts
│   │   ├── users/
│   │   ├── projects/
│   │   ├── tasks/
│   │   ├── messaging/
│   │   │   ├── messaging.controller.ts
│   │   │   ├── messaging.service.ts
│   │   │   ├── websocket.gateway.ts
│   │   │   └── messaging.routes.ts
│   │   ├── payments/
│   │   │   ├── payments.controller.ts
│   │   │   ├── stripe.service.ts
│   │   │   └── payments.routes.ts
│   │   └── notifications/
│   ├── middleware/
│   │   ├── auth.middleware.ts
│   │   ├── role.middleware.ts
│   │   └── rateLimit.middleware.ts
│   ├── utils/
│   └── app.ts
└── package.json
```

**Tech Stack:**
- **Framework**: Next.js API Routes (or Express.js/Fastify for standalone API)
- **Validation**: Zod (type-safe validation)
- **API Documentation**: OpenAPI/Swagger
- **Rate Limiting**: Redis-based rate limiter
- **Error Handling**: Centralized error handler with proper HTTP codes

**API Endpoints Structure:**
```
/api/v1/
├── /auth
│   ├── POST /login
│   ├── POST /register
│   ├── POST /logout
│   └── GET /me
├── /users
├── /projects
├── /tasks
├── /messages
│   ├── GET /conversations
│   ├── POST /conversations
│   ├── GET /conversations/:id/messages
│   ├── POST /conversations/:id/messages
│   └── WS /conversations/:id/live
├── /payments
│   ├── GET /invoices
│   ├── POST /invoices
│   ├── POST /payments
│   ├── GET /payment-methods
│   └── POST /payment-methods
└── /notifications
```

**Future Migration Path to Microservices:**
If the platform grows, we can extract:
- Messaging Service (handles WebSockets, real-time chat)
- Payment Service (handles Stripe, invoicing)
- Notification Service (handles emails, push notifications)

---

### 4. **Styling Strategy**

**Decision: Tailwind CSS Everywhere**

**Why:**
- ✅ Consistent styling across all apps
- ✅ Utility-first approach = faster development
- ✅ Built-in responsive design
- ✅ Easy to customize with design tokens
- ✅ Great performance (purges unused CSS)
- ✅ Works perfectly with Next.js

**Implementation:**
```
packages/ui/
├── styles/
│   ├── globals.css          # Tailwind directives
│   ├── theme.ts             # Design tokens
│   └── tailwind.config.ts   # Shared Tailwind config
└── components/
    └── [All components use Tailwind]
```

**Tailwind Config (Shared):**
```typescript
// packages/ui/tailwind.config.ts
export default {
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#e6f7ff',
          500: '#1ca2dc',
          900: '#003d5c',
        },
        admin: {
          500: '#8b5cf6', // Purple for admin
        },
        manager: {
          500: '#f59e0b', // Orange for manager
        },
        client: {
          500: '#1ca2dc', // Blue for client
        },
        va: {
          500: '#10b981', // Green for VA
        },
      },
    },
  },
};
```

**Dashboard-Specific Overrides:**
Each dashboard can extend the base config:
```typescript
// apps/admin/tailwind.config.ts
import baseConfig from '@virtualassist/ui/tailwind.config';

export default {
  ...baseConfig,
  theme: {
    ...baseConfig.theme,
    extend: {
      ...baseConfig.theme.extend,
      colors: {
        ...baseConfig.theme.extend.colors,
        primary: baseConfig.theme.extend.colors.admin,
      },
    },
  },
};
```

**Why NOT CSS-in-JS:**
- ❌ Runtime overhead
- ❌ Larger bundle sizes
- ❌ More complex setup
- ❌ Harder to share styles across apps

---

### 5. **State Management**

**Decision: React Query (TanStack Query) + Zustand**

**Why:**
- ✅ **React Query** for server state (API data, caching, synchronization)
- ✅ **Zustand** for client state (UI state, user preferences)
- ✅ Lightweight and performant
- ✅ Great TypeScript support
- ✅ Easy to use and learn
- ✅ Built-in caching and refetching

**When to Use Each:**

**React Query** (Server State):
- ✅ Fetching data from API
- ✅ Caching API responses
- ✅ Automatic refetching
- ✅ Optimistic updates
- ✅ Real-time data synchronization

```typescript
// Example: Fetching tasks
import { useQuery } from '@tanstack/react-query';

function useTasks() {
  return useQuery({
    queryKey: ['tasks'],
    queryFn: () => api.tasks.getAll(),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}
```

**Zustand** (Client State):
- ✅ UI state (modals, sidebars, theme)
- ✅ User preferences
- ✅ Form state (complex forms)
- ✅ Global app state

```typescript
// Example: UI state store
import { create } from 'zustand';

interface UIStore {
  sidebarOpen: boolean;
  toggleSidebar: () => void;
  theme: 'light' | 'dark';
  setTheme: (theme: 'light' | 'dark') => void;
}

export const useUIStore = create<UIStore>((set) => ({
  sidebarOpen: true,
  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
  theme: 'light',
  setTheme: (theme) => set({ theme }),
}));
```

**Why NOT Redux:**
- ❌ Too much boilerplate
- ❌ Overkill for most use cases
- ❌ React Query handles server state better
- ❌ Zustand is simpler and more performant

**Package Structure:**
```
packages/api/
├── hooks/              # React Query hooks
│   ├── useAuth.ts
│   ├── useTasks.ts
│   ├── useMessages.ts
│   └── usePayments.ts
└── stores/             # Zustand stores
    ├── useUIStore.ts
    └── useUserStore.ts
```

---

### 6. **Testing Strategy**

**Decision: Jest + React Testing Library + Playwright**

**Why:**
- ✅ **Jest**: Fast, great for unit tests
- ✅ **React Testing Library**: Tests user behavior, not implementation
- ✅ **Playwright**: E2E tests across all browsers
- ✅ Industry standard
- ✅ Great TypeScript support

**Testing Pyramid:**
```
        /\
       /E2E\          (10%) - Playwright
      /------\
     /  API   \       (20%) - Supertest
    /----------\
   / Component \      (30%) - React Testing Library
  /--------------\
 /  Unit Tests   \    (40%) - Jest
/------------------\
```

**Test Structure:**
```
packages/ui/
├── src/
│   └── components/
│       └── Button/
│           ├── Button.tsx
│           ├── Button.test.tsx      # Unit tests
│           └── Button.stories.tsx   # Storybook stories

apps/client/
├── __tests__/
│   ├── unit/
│   ├── integration/
│   └── e2e/
│       └── payment-flow.spec.ts    # Playwright E2E
```

**Example Tests:**
```typescript
// Unit Test (Jest + RTL)
import { render, screen } from '@testing-library/react';
import { Button } from './Button';

test('renders button with text', () => {
  render(<Button>Click me</Button>);
  expect(screen.getByText('Click me')).toBeInTheDocument();
});

// E2E Test (Playwright)
import { test, expect } from '@playwright/test';

test('client can make a payment', async ({ page }) => {
  await page.goto('http://localhost:3000/billing');
  await page.click('text=Pay Invoice');
  await page.fill('[name="cardNumber"]', '4242424242424242');
  await page.click('text=Submit Payment');
  await expect(page.locator('text=Payment Successful')).toBeVisible();
});
```

**CI Pipeline:**
1. Run unit tests on every commit
2. Run integration tests on PR
3. Run E2E tests before deployment

---

### 7. **CI/CD Strategy**

**Decision: GitHub Actions + Vercel**

**Why:**
- ✅ **GitHub Actions**: Free for public repos, great for monorepos
- ✅ **Vercel**: Best Next.js deployment experience
- ✅ Automatic preview deployments for PRs
- ✅ Easy to set up and maintain
- ✅ Great performance (Edge network)

**Deployment Strategy:**
```
GitHub Repo
    ↓
GitHub Actions (CI)
    ↓
Vercel (CD)
    ↓
Production Domains:
- virtualassist.ai (Marketing)
- admin.virtualassist.ai (Admin Dashboard)
- app.virtualassist.ai (Client Dashboard)
- va.virtualassist.ai (VA Dashboard)
- manager.virtualassist.ai (Manager Dashboard)
```

**GitHub Actions Workflow:**
```yaml
# .github/workflows/ci.yml
name: CI

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm ci
      - run: npm run lint
      - run: npm run test
      - run: npm run build

  e2e:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm ci
      - run: npx playwright install
      - run: npm run test:e2e
```

**Vercel Configuration:**
```json
// vercel.json
{
  "projects": [
    {
      "name": "virtualassist-web",
      "path": "apps/web",
      "domain": "virtualassist.ai"
    },
    {
      "name": "virtualassist-admin",
      "path": "apps/admin",
      "domain": "admin.virtualassist.ai"
    },
    {
      "name": "virtualassist-client",
      "path": "apps/client",
      "domain": "app.virtualassist.ai"
    },
    {
      "name": "virtualassist-va",
      "path": "apps/va",
      "domain": "va.virtualassist.ai"
    },
    {
      "name": "virtualassist-manager",
      "path": "apps/manager",
      "domain": "manager.virtualassist.ai"
    }
  ]
}
```

**Environment Variables:**
- Shared across all apps via Vercel dashboard
- Separate for development, staging, production
- Secrets stored in Vercel/GitHub Secrets

---

## 🔥 Messaging Feature Architecture

### Real-Time Messaging System

**Tech Stack:**
- **WebSockets**: Socket.io (reliable, fallback to polling)
- **Message Queue**: Redis Pub/Sub
- **Storage**: PostgreSQL (message history)
- **File Uploads**: AWS S3 or Cloudinary

**Message Types:**
1. **Direct Messages**: Client ↔ VA
2. **Group Chats**: Client ↔ Manager ↔ VAs (project-based)
3. **Announcements**: Admin → All users

**Database Schema:**
```sql
conversations (
  id UUID PRIMARY KEY,
  type ENUM('direct', 'group', 'announcement'),
  project_id UUID REFERENCES projects(id),
  created_at TIMESTAMP
)

conversation_participants (
  id UUID PRIMARY KEY,
  conversation_id UUID REFERENCES conversations(id),
  user_id UUID REFERENCES users(id),
  role VARCHAR(50),
  joined_at TIMESTAMP,
  last_read_at TIMESTAMP
)

messages (
  id UUID PRIMARY KEY,
  conversation_id UUID REFERENCES conversations(id),
  sender_id UUID REFERENCES users(id),
  content TEXT,
  message_type ENUM('text', 'file', 'image', 'system'),
  sent_at TIMESTAMP,
  edited_at TIMESTAMP,
  deleted_at TIMESTAMP
)

message_reactions (
  id UUID PRIMARY KEY,
  message_id UUID REFERENCES messages(id),
  user_id UUID REFERENCES users(id),
  emoji VARCHAR(10),
  created_at TIMESTAMP
)

message_attachments (
  id UUID PRIMARY KEY,
  message_id UUID REFERENCES messages(id),
  file_url TEXT,
  file_name VARCHAR(255),
  file_size INTEGER,
  file_type VARCHAR(50),
  uploaded_at TIMESTAMP
)
```

**WebSocket Events:**
```typescript
// Client → Server
socket.emit('message:send', { conversationId, content, attachments });
socket.emit('message:typing', { conversationId, isTyping });
socket.emit('message:read', { conversationId, messageId });

// Server → Client
socket.on('message:new', (message) => { /* Update UI */ });
socket.on('message:typing', ({ userId, isTyping }) => { /* Show typing indicator */ });
socket.on('message:read', ({ messageId, readBy }) => { /* Update read status */ });
```

**Features:**
- ✅ Real-time messaging
- ✅ Typing indicators
- ✅ Read receipts
- ✅ File attachments (images, documents)
- ✅ Message reactions (emojis)
- ✅ Message search
- ✅ Unread message count
- ✅ Push notifications
- ✅ Message history pagination

**Package Structure:**
```
packages/messaging/
├── hooks/
│   ├── useConversations.ts
│   ├── useMessages.ts
│   └── useWebSocket.ts
├── components/
│   ├── ConversationList.tsx
│   ├── MessageThread.tsx
│   ├── MessageInput.tsx
│   └── FileUpload.tsx
└── utils/
    ├── socket.ts
    └── messageFormatter.ts
```

---

## 💳 Payment System Architecture

### Payment Processing

**Tech Stack:**
- **Payment Gateway**: PayPal (trusted globally, supports multiple payment methods)
- **Invoicing**: PayPal Invoicing API
- **Subscriptions**: PayPal Subscriptions (if needed)
- **Webhooks**: PayPal Webhooks for payment events
- **SDK**: @paypal/checkout-server-sdk (Node.js)

**Payment Flow:**
```
Client Dashboard
    ↓
1. View Invoice
    ↓
2. Click "Pay with PayPal"
    ↓
3. PayPal Checkout Modal Opens
    ↓
4. Client Logs into PayPal / Pays
    ↓
5. PayPal Processes Payment
    ↓
6. Webhook → Update Database
    ↓
7. Send Receipt Email
    ↓
8. Notify VA (payment received)
```

**Database Schema:**
```sql
payment_methods (
  id UUID PRIMARY KEY,
  client_id UUID REFERENCES clients(id),
  paypal_email VARCHAR(255),
  type ENUM('paypal', 'card', 'bank_account'),
  is_default BOOLEAN,
  created_at TIMESTAMP
)

invoices (
  id UUID PRIMARY KEY,
  client_id UUID REFERENCES clients(id),
  invoice_number VARCHAR(50) UNIQUE,
  amount DECIMAL(10, 2),
  tax DECIMAL(10, 2),
  total DECIMAL(10, 2),
  status ENUM('draft', 'pending', 'paid', 'overdue', 'cancelled'),
  due_date DATE,
  paid_at TIMESTAMP,
  paypal_invoice_id VARCHAR(255),
  paypal_order_id VARCHAR(255),
  created_at TIMESTAMP
)

invoice_items (
  id UUID PRIMARY KEY,
  invoice_id UUID REFERENCES invoices(id),
  va_id UUID REFERENCES virtual_assistants(id),
  task_id UUID REFERENCES tasks(id),
  description TEXT,
  hours DECIMAL(5, 2),
  rate DECIMAL(10, 2),
  amount DECIMAL(10, 2)
)

payments (
  id UUID PRIMARY KEY,
  invoice_id UUID REFERENCES invoices(id),
  client_id UUID REFERENCES clients(id),
  amount DECIMAL(10, 2),
  payment_method_id UUID REFERENCES payment_methods(id),
  paypal_transaction_id VARCHAR(255),
  paypal_payer_id VARCHAR(255),
  status ENUM('pending', 'completed', 'failed', 'refunded'),
  paid_at TIMESTAMP,
  refunded_at TIMESTAMP,
  failure_reason TEXT
)

va_payouts (
  id UUID PRIMARY KEY,
  va_id UUID REFERENCES virtual_assistants(id),
  amount DECIMAL(10, 2),
  status ENUM('pending', 'processing', 'paid', 'failed'),
  paypal_payout_batch_id VARCHAR(255),
  paypal_payout_item_id VARCHAR(255),
  paid_at TIMESTAMP,
  created_at TIMESTAMP
)
```

**PayPal Integration:**
```typescript
// packages/payments/src/paypal.service.ts
import paypal from '@paypal/checkout-server-sdk';

// PayPal environment setup
function environment() {
  const clientId = process.env.PAYPAL_CLIENT_ID!;
  const clientSecret = process.env.PAYPAL_CLIENT_SECRET!;
  
  if (process.env.NODE_ENV === 'production') {
    return new paypal.core.LiveEnvironment(clientId, clientSecret);
  }
  return new paypal.core.SandboxEnvironment(clientId, clientSecret);
}

const client = new paypal.core.PayPalHttpClient(environment());

export class PayPalService {
  // Create order for payment
  async createOrder(amount: number, currency: string = 'USD', invoiceId: string) {
    const request = new paypal.orders.OrdersCreateRequest();
    request.prefer('return=representation');
    request.requestBody({
      intent: 'CAPTURE',
      purchase_units: [{
        amount: {
          currency_code: currency,
          value: amount.toFixed(2),
        },
        invoice_id: invoiceId,
        description: `Invoice #${invoiceId}`,
      }],
      application_context: {
        brand_name: 'VirtualAssist AI',
        landing_page: 'BILLING',
        user_action: 'PAY_NOW',
        return_url: `${process.env.APP_URL}/payment/success`,
        cancel_url: `${process.env.APP_URL}/payment/cancel`,
      },
    });

    const response = await client.execute(request);
    return response.result;
  }

  // Capture payment after user approves
  async captureOrder(orderId: string) {
    const request = new paypal.orders.OrdersCaptureRequest(orderId);
    request.requestBody({});
    
    const response = await client.execute(request);
    return response.result;
  }

  // Create invoice
  async createInvoice(clientEmail: string, items: any[], dueDate: string) {
    const request = new paypal.invoices.InvoicesCreateRequest();
    request.requestBody({
      detail: {
        invoice_number: `INV-${Date.now()}`,
        invoice_date: new Date().toISOString().split('T')[0],
        payment_term: {
          due_date: dueDate,
        },
      },
      invoicer: {
        name: {
          business_name: 'VirtualAssist AI',
        },
        email_address: process.env.PAYPAL_BUSINESS_EMAIL,
      },
      primary_recipients: [{
        billing_info: {
          email_address: clientEmail,
        },
      }],
      items: items.map(item => ({
        name: item.description,
        quantity: item.hours?.toString() || '1',
        unit_amount: {
          currency_code: 'USD',
          value: item.rate?.toFixed(2) || item.amount.toFixed(2),
        },
      })),
      configuration: {
        allow_tip: false,
        tax_calculated_after_discount: true,
      },
    });

    const response = await client.execute(request);
    return response.result;
  }

  // Send invoice to client
  async sendInvoice(invoiceId: string) {
    const request = new paypal.invoices.InvoicesSendRequest(invoiceId);
    request.requestBody({
      send_to_invoicer: true,
    });

    const response = await client.execute(request);
    return response.result;
  }

  // Get invoice details
  async getInvoice(invoiceId: string) {
    const request = new paypal.invoices.InvoicesGetRequest(invoiceId);
    const response = await client.execute(request);
    return response.result;
  }

  // Create payout to VA
  async createPayout(vaEmail: string, amount: number, note: string) {
    const request = new paypal.payouts.PayoutsPostRequest();
    request.requestBody({
      sender_batch_header: {
        sender_batch_id: `PAYOUT-${Date.now()}`,
        email_subject: 'You have a payment from VirtualAssist AI',
        email_message: note,
      },
      items: [{
        recipient_type: 'EMAIL',
        amount: {
          value: amount.toFixed(2),
          currency: 'USD',
        },
        receiver: vaEmail,
        note: note,
        sender_item_id: `VA-PAYOUT-${Date.now()}`,
      }],
    });

    const response = await client.execute(request);
    return response.result;
  }

  // Handle webhooks
  async handleWebhook(event: any) {
    switch (event.event_type) {
      case 'PAYMENT.CAPTURE.COMPLETED':
        await this.handlePaymentSuccess(event.resource);
        break;
      case 'PAYMENT.CAPTURE.DENIED':
        await this.handlePaymentFailure(event.resource);
        break;
      case 'INVOICING.INVOICE.PAID':
        await this.handleInvoicePaid(event.resource);
        break;
      case 'PAYMENT.PAYOUTS-ITEM.SUCCEEDED':
        await this.handlePayoutSuccess(event.resource);
        break;
      case 'PAYMENT.PAYOUTS-ITEM.FAILED':
        await this.handlePayoutFailure(event.resource);
        break;
    }
  }

  private async handlePaymentSuccess(payment: any) {
    // Update payment status in database
    console.log('Payment successful:', payment.id);
  }

  private async handlePaymentFailure(payment: any) {
    // Update payment status and notify client
    console.log('Payment failed:', payment.id);
  }

  private async handleInvoicePaid(invoice: any) {
    // Mark invoice as paid, notify VA
    console.log('Invoice paid:', invoice.id);
  }

  private async handlePayoutSuccess(payout: any) {
    // Update payout status
    console.log('Payout successful:', payout.payout_item_id);
  }

  private async handlePayoutFailure(payout: any) {
    // Handle payout failure
    console.log('Payout failed:', payout.payout_item_id);
  }

  // Verify webhook signature
  verifyWebhookSignature(headers: any, body: string): boolean {
    const transmissionId = headers['paypal-transmission-id'];
    const transmissionTime = headers['paypal-transmission-time'];
    const certUrl = headers['paypal-cert-url'];
    const authAlgo = headers['paypal-auth-algo'];
    const transmissionSig = headers['paypal-transmission-sig'];
    const webhookId = process.env.PAYPAL_WEBHOOK_ID!;

    // Verify using PayPal SDK
    // Implementation depends on PayPal's webhook verification method
    return true; // Placeholder
  }
}
```

**Client-Side Integration (React):**
```typescript
// packages/payments/src/components/PayPalButton.tsx
import { PayPalButtons, PayPalScriptProvider } from '@paypal/react-paypal-js';

interface PayPalButtonProps {
  amount: number;
  invoiceId: string;
  onSuccess: (details: any) => void;
  onError: (error: any) => void;
}

export function PayPalButton({ amount, invoiceId, onSuccess, onError }: PayPalButtonProps) {
  const createOrder = async () => {
    const response = await fetch('/api/payments/create-order', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount, invoiceId }),
    });
    const data = await response.json();
    return data.orderId;
  };

  const onApprove = async (data: any) => {
    const response = await fetch('/api/payments/capture-order', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ orderId: data.orderID }),
    });
    const details = await response.json();
    onSuccess(details);
  };

  return (
    <PayPalScriptProvider options={{ 
      clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID!,
      currency: 'USD',
    }}>
      <PayPalButtons
        createOrder={createOrder}
        onApprove={onApprove}
        onError={onError}
        style={{
          layout: 'vertical',
          color: 'gold',
          shape: 'rect',
          label: 'paypal',
        }}
      />
    </PayPalScriptProvider>
  );
}
```

**API Routes:**
```typescript
// apps/client/app/api/payments/create-order/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { PayPalService } from '@virtualassist/payments';

const paypalService = new PayPalService();

export async function POST(request: NextRequest) {
  try {
    const { amount, invoiceId } = await request.json();
    
    const order = await paypalService.createOrder(amount, 'USD', invoiceId);
    
    return NextResponse.json({ orderId: order.id });
  } catch (error) {
    console.error('Error creating PayPal order:', error);
    return NextResponse.json({ error: 'Failed to create order' }, { status: 500 });
  }
}

// apps/client/app/api/payments/capture-order/route.ts
export async function POST(request: NextRequest) {
  try {
    const { orderId } = await request.json();
    
    const capture = await paypalService.captureOrder(orderId);
    
    // Update database with payment info
    // await updatePaymentStatus(capture);
    
    return NextResponse.json({ 
      success: true,
      transactionId: capture.id,
      status: capture.status,
    });
  } catch (error) {
    console.error('Error capturing PayPal order:', error);
    return NextResponse.json({ error: 'Failed to capture payment' }, { status: 500 });
  }
}

// apps/client/app/api/payments/webhook/route.ts
export async function POST(request: NextRequest) {
  try {
    const body = await request.text();
    const headers = Object.fromEntries(request.headers);
    
    // Verify webhook signature
    const isValid = paypalService.verifyWebhookSignature(headers, body);
    if (!isValid) {
      return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
    }
    
    const event = JSON.parse(body);
    await paypalService.handleWebhook(event);
    
    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Error processing webhook:', error);
    return NextResponse.json({ error: 'Webhook error' }, { status: 500 });
  }
}
```

**Features:**
- ✅ PayPal checkout (credit card, debit card, PayPal balance)
- ✅ PayPal invoicing
- ✅ Saved PayPal accounts
- ✅ Automatic payment processing
- ✅ Payment history
- ✅ Refunds via PayPal
- ✅ VA payouts (PayPal Payouts API)
- ✅ Payment reminders
- ✅ Receipt emails
- ✅ Multi-currency support
- ✅ Buyer protection
- ✅ Dispute resolution

**Environment Variables:**
```env
# PayPal Configuration
PAYPAL_CLIENT_ID=your_client_id
PAYPAL_CLIENT_SECRET=your_client_secret
PAYPAL_BUSINESS_EMAIL=business@virtualassist.ai
PAYPAL_WEBHOOK_ID=your_webhook_id
NEXT_PUBLIC_PAYPAL_CLIENT_ID=your_client_id

# URLs
APP_URL=https://app.virtualassist.ai
```

**Package Structure:**
```
packages/payments/
├── src/
│   ├── services/
│   │   └── paypal.service.ts
│   ├── components/
│   │   ├── PayPalButton.tsx
│   │   ├── InvoiceList.tsx
│   │   └── PaymentHistory.tsx
│   ├── hooks/
│   │   ├── usePayments.ts
│   │   └── useInvoices.ts
│   └── types/
│       └── payment.types.ts
├── package.json
└── tsconfig.json
```

**Dependencies:**
```json
{
  "dependencies": {
    "@paypal/checkout-server-sdk": "^1.0.3",
    "@paypal/react-paypal-js": "^8.1.0"
  }
}
```



---

## 👤 Manager Role Implementation

### Manager Dashboard Features

**Responsibilities:**
1. **Team Management**
   - Assign VAs to projects
   - Monitor VA performance
   - Approve timesheets
   - Handle VA onboarding

2. **Project Oversight**
   - View all client projects
   - Track project progress
   - Manage deadlines
   - Quality assurance

3. **Communication Hub**
   - Message clients and VAs
   - Resolve conflicts
   - Provide support

4. **Reporting**
   - VA productivity reports
   - Client satisfaction metrics
   - Revenue analytics

**Database Schema:**
```sql
managers (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  department VARCHAR(100),
  team_size INTEGER,
  hire_date DATE
)

manager_va_assignments (
  id UUID PRIMARY KEY,
  manager_id UUID REFERENCES managers(id),
  va_id UUID REFERENCES virtual_assistants(id),
  assigned_at TIMESTAMP,
  unassigned_at TIMESTAMP
)

manager_project_oversight (
  id UUID PRIMARY KEY,
  manager_id UUID REFERENCES managers(id),
  project_id UUID REFERENCES projects(id),
  assigned_at TIMESTAMP
)
```

**Permissions:**
```typescript
// packages/auth/src/permissions/manager.ts
export const managerPermissions = {
  // VA Management
  canViewVAs: true,
  canAssignVAs: true,
  canApproveTimesheets: true,
  canViewVAPerformance: true,
  
  // Project Management
  canViewAllProjects: true,
  canReassignTasks: true,
  canUpdateProjectStatus: true,
  
  // Communication
  canMessageClients: true,
  canMessageVAs: true,
  canCreateAnnouncements: true,
  
  // Reporting
  canViewReports: true,
  canExportData: true,
  
  // Limitations
  canManageUsers: false, // Only admin
  canAccessBilling: false, // Only admin
  canChangeSystemSettings: false, // Only admin
};
```

**Manager Dashboard Structure:**
```
apps/manager/
├── app/
│   ├── dashboard/
│   ├── team/              # VA management
│   ├── projects/          # Project oversight
│   ├── reports/           # Analytics
│   ├── messages/          # Communication
│   └── settings/
└── components/
    ├── VAList/
    ├── ProjectOverview/
    ├── PerformanceMetrics/
    └── TeamCalendar/
```

---

## 📦 Final Package Structure

```
monorepo/
├── apps/
│   ├── web/               # Marketing website
│   ├── admin/             # Admin dashboard
│   ├── manager/           # Manager dashboard (NEW)
│   ├── client/            # Client dashboard
│   ├── va/                # VA dashboard
│   └── api/               # Backend API (optional, can use Next.js API routes)
│
├── packages/
│   ├── ui/                # Shared UI components (Tailwind)
│   ├── types/             # TypeScript types
│   ├── utils/             # Shared utilities
│   ├── api/               # API client + React Query hooks
│   ├── auth/              # Authentication (NextAuth.js)
│   ├── messaging/         # Real-time messaging (Socket.io)
│   ├── payments/          # Payment processing (PayPal)
│   └── config/            # Shared configuration
│
├── .github/
│   └── workflows/
│       └── ci.yml         # GitHub Actions
│
├── turbo.json             # Turborepo config
├── package.json           # Root package.json
└── vercel.json            # Vercel deployment config
```

---

## 🚀 Implementation Timeline

### Phase 1: Foundation (Weeks 1-2)
- ✅ Set up monorepo structure
- ✅ Create shared packages (ui, types, utils)
- ✅ Set up authentication (NextAuth.js)
- ✅ Set up database (PostgreSQL + Prisma)

### Phase 2: Core Features (Weeks 3-6)
- ✅ Build Admin dashboard
- ✅ Build Client dashboard
- ✅ Build VA dashboard
- ✅ Build Manager dashboard
- ✅ Implement role-based access control

### Phase 3: Messaging (Weeks 7-8)
- ✅ Set up WebSocket server (Socket.io)
- ✅ Build messaging UI components
- ✅ Implement real-time messaging
- ✅ Add file uploads

### Phase 4: Payments (Weeks 9-10)
- ✅ Integrate PayPal
- ✅ Build payment UI
- ✅ Implement invoicing
- ✅ Set up webhooks

### Phase 5: Testing & Deployment (Weeks 11-12)
- ✅ Write tests (Jest + Playwright)
- ✅ Set up CI/CD (GitHub Actions + Vercel)
- ✅ Deploy to production
- ✅ Monitor and optimize

---

## 📊 Summary Table

| Decision | Choice | Reason |
|----------|--------|--------|
| **Authentication** | Single Sign-On (NextAuth.js) | Seamless experience, role switching |
| **Database** | Single PostgreSQL | Easier relationships, real-time features |
| **API** | Monolithic (Next.js API) | Faster development, easier to manage |
| **Styling** | Tailwind CSS | Fast development, consistent design |
| **State Management** | React Query + Zustand | Best for server + client state |
| **Testing** | Jest + RTL + Playwright | Industry standard, comprehensive |
| **CI/CD** | GitHub Actions + Vercel | Best Next.js experience, free |
| **Messaging** | Socket.io + Redis | Reliable, real-time, scalable |
| **Payments** | PayPal | Trusted globally, great API |

---

## 🎯 Next Steps

1. **Review this document** with your team
2. **Set up the monorepo** structure
3. **Create the database schema** in Prisma
4. **Start building** the shared packages
5. **Implement authentication** first
6. **Build dashboards** one by one
7. **Add messaging** and **payments** last

---

**Questions or concerns?** Let's discuss and refine this architecture together!
