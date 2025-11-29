# Enterprise Security Implementation Plan
## RealtyEaseAI Monorepo - Complete Security from Day One

**Last Updated**: 2025-11-27
**Status**: Ready to Implement

---

## 🎯 Executive Summary

This document outlines a comprehensive enterprise-grade security implementation for the RealtyEaseAI monorepo, ensuring that security is baked in from the start rather than retrofitted later.

### Current State Analysis

**✅ What's Already Built:**
- Monorepo structure with 5 apps + 6 packages
- Prisma schema with auth models (User, Account, Session, Roles)
- NextAuth.js integration (partial)
- UI component library (49 components)
- All dashboard pages and layouts
- MongoDB connection handler

**❌ Critical Security Gaps:**
1. No MongoDB schemas or data validation
2. No OAuth providers configured
3. No role-based permission system
4. No API routes with security middleware
5. No input validation/sanitization
6. No rate limiting
7. No CSRF tokens (beyond NextAuth default)
8. No secrets management strategy
9. No security headers
10. No audit logging

---

## 🔐 Enterprise Security Architecture

### Security Layers

```
┌─────────────────────────────────────────────────────┐
│  Layer 1: Network Security (Vercel Edge Network)    │
│  - DDoS protection                                   │
│  - SSL/TLS termination                               │
│  - Geographic routing                                │
└─────────────────────────────────────────────────────┘
                        ↓
┌─────────────────────────────────────────────────────┐
│  Layer 2: Application Security (Next.js Middleware) │
│  - Rate limiting                                     │
│  - Security headers                                  │
│  - CORS configuration                                │
└─────────────────────────────────────────────────────┘
                        ↓
┌─────────────────────────────────────────────────────┐
│  Layer 3: Authentication & Authorization            │
│  - NextAuth.js with OAuth + Credentials             │
│  - Multi-role RBAC system                           │
│  - JWT token validation                             │
│  - Session management                                │
└─────────────────────────────────────────────────────┘
                        ↓
┌─────────────────────────────────────────────────────┐
│  Layer 4: API Security                              │
│  - Input validation (Zod schemas)                   │
│  - SQL injection prevention (Prisma/Mongoose ORM)   │
│  - XSS prevention (React auto-escaping)             │
│  - CSRF tokens                                       │
└─────────────────────────────────────────────────────┘
                        ↓
┌─────────────────────────────────────────────────────┐
│  Layer 5: Data Security                             │
│  - Encryption at rest (database level)              │
│  - Encrypted environment variables                  │
│  - Secure file upload validation                    │
│  - Data sanitization                                 │
└─────────────────────────────────────────────────────┘
                        ↓
┌─────────────────────────────────────────────────────┐
│  Layer 6: Monitoring & Audit                        │
│  - Security event logging                           │
│  - Failed auth attempts tracking                    │
│  - Anomaly detection                                │
│  - Compliance audit trails                          │
└─────────────────────────────────────────────────────┘
```

---

## 📋 Implementation Checklist

### Phase 1: Foundation Security (Week 1)

#### 1.1 Environment & Secrets Management
- [ ] Create secure `.env` files for each environment
- [ ] Set up Vercel environment variables (encrypted)
- [ ] Implement secrets rotation strategy
- [ ] Configure environment validation schema (Zod)
- [ ] Add `.env.example` with all required variables
- [ ] Document secret generation procedures

#### 1.2 Database Security Setup
- [ ] Generate and run Prisma migrations
- [ ] Enable PostgreSQL SSL mode
- [ ] Configure MongoDB connection with authentication
- [ ] Set up database user permissions (least privilege)
- [ ] Enable database audit logging
- [ ] Configure automated backups

#### 1.3 Authentication Foundation
- [ ] Configure OAuth providers (Google, GitHub)
- [ ] Implement password hashing (bcrypt rounds: 12)
- [ ] Add email verification flow
- [ ] Set up password reset functionality
- [ ] Configure session expiration (30 days)
- [ ] Implement refresh token rotation

---

### Phase 2: Authorization & RBAC (Week 1-2)

#### 2.1 Permission System Architecture

```typescript
// Permissions structure
{
  "ADMIN": {
    "users": ["create", "read", "update", "delete"],
    "projects": ["create", "read", "update", "delete"],
    "tasks": ["create", "read", "update", "delete"],
    "billing": ["create", "read", "update", "delete"],
    "settings": ["manage"],
    "audit": ["view"]
  },
  "MANAGER": {
    "users": ["read", "update"], // Team members only
    "projects": ["create", "read", "update"],
    "tasks": ["create", "read", "update", "assign"],
    "billing": ["read"],
    "reports": ["view"]
  },
  "CLIENT": {
    "projects": ["create", "read", "update"], // Own projects only
    "tasks": ["create", "read", "comment"],
    "billing": ["read", "pay"],
    "va": ["hire", "message"]
  },
  "VA": {
    "tasks": ["read", "update", "complete"], // Assigned tasks only
    "projects": ["read"], // Assigned projects only
    "time": ["log"],
    "messages": ["read", "send"]
  }
}
```

#### 2.2 Implementation Tasks
- [ ] Create `packages/permissions` package
- [ ] Define permission constants
- [ ] Implement `hasPermission()` utility
- [ ] Create role-based middleware
- [ ] Add UI component permission wrapper
- [ ] Implement service-based access control
- [ ] Add permission caching layer

---

### Phase 3: API Security (Week 2)

#### 3.1 Input Validation & Sanitization
- [ ] Create Zod schemas for all models
- [ ] Implement request validation middleware
- [ ] Add file upload validation (type, size, mime)
- [ ] Sanitize HTML input (DOMPurify)
- [ ] Validate email formats
- [ ] Sanitize database queries

#### 3.2 Rate Limiting
```typescript
// Rate limit configuration
const rateLimits = {
  "auth": {
    login: "5 per 15 minutes",
    signup: "3 per hour",
    passwordReset: "3 per hour"
  },
  "api": {
    default: "100 per minute",
    mutations: "30 per minute",
    fileUpload: "10 per hour"
  }
}
```

- [ ] Install `@upstash/ratelimit` or `express-rate-limit`
- [ ] Configure Redis/Upstash for distributed rate limiting
- [ ] Add rate limit middleware to API routes
- [ ] Implement per-user rate limits
- [ ] Add rate limit headers to responses
- [ ] Create rate limit exceeded handler

#### 3.3 CSRF Protection
- [ ] Verify NextAuth CSRF tokens working
- [ ] Add CSRF tokens to all mutation forms
- [ ] Implement double submit cookie pattern
- [ ] Add CSRF middleware to API routes
- [ ] Test CSRF protection on all forms

---

### Phase 4: Data Security (Week 2-3)

#### 4.1 MongoDB Schemas with Validation

```typescript
// Example: Message schema with validation
const MessageSchema = new mongoose.Schema({
  conversationId: {
    type: String,
    required: true,
    index: true,
    validate: {
      validator: (v) => /^[a-f\d]{24}$/i.test(v),
      message: 'Invalid conversation ID'
    }
  },
  senderId: {
    type: String,
    required: true,
    validate: {
      validator: (v) => /^[a-f\d]{8}(-[a-f\d]{4}){3}-[a-f\d]{12}$/i.test(v),
      message: 'Invalid user ID'
    }
  },
  content: {
    type: String,
    required: true,
    maxlength: [5000, 'Message too long'],
    validate: {
      validator: (v) => v.trim().length > 0,
      message: 'Message cannot be empty'
    }
  },
  messageType: {
    type: String,
    enum: ['text', 'file', 'image', 'system'],
    default: 'text'
  },
  attachments: [{
    url: {
      type: String,
      validate: {
        validator: (v) => /^https?:\/\/.+/.test(v),
        message: 'Invalid URL'
      }
    },
    fileName: String,
    fileType: {
      type: String,
      validate: {
        validator: (v) => /^[a-z]+\/[a-z0-9\-\+]+$/i.test(v),
        message: 'Invalid MIME type'
      }
    },
    fileSize: {
      type: Number,
      max: [10485760, 'File too large (max 10MB)']
    }
  }],
  isDeleted: {
    type: Boolean,
    default: false
  },
  deletedAt: Date
}, {
  timestamps: true
});

// Indexes for performance and security
MessageSchema.index({ conversationId: 1, createdAt: -1 });
MessageSchema.index({ senderId: 1, createdAt: -1 });
MessageSchema.index({ 'attachments.url': 1 });

// Pre-save middleware for sanitization
MessageSchema.pre('save', function(next) {
  if (this.content) {
    // Sanitize content
    this.content = sanitizeHtml(this.content, {
      allowedTags: [],
      allowedAttributes: {}
    });
  }
  next();
});
```

#### 4.2 Implementation Tasks
- [ ] Create Message schema with validation
- [ ] Create File schema with validation
- [ ] Create AILog schema with validation
- [ ] Create ActivityLog schema with validation
- [ ] Create Notification schema with validation
- [ ] Add pre-save sanitization hooks
- [ ] Implement query result filtering
- [ ] Add field-level encryption for sensitive data

#### 4.3 File Upload Security
- [ ] Validate file types (whitelist)
- [ ] Scan for malware (ClamAV integration)
- [ ] Limit file sizes (10MB for docs, 50MB for videos)
- [ ] Generate secure random filenames
- [ ] Store files in isolated buckets
- [ ] Implement signed URLs for private files
- [ ] Add virus scanning before storage

---

### Phase 5: Security Headers & Middleware (Week 3)

#### 5.1 Security Headers Configuration

```typescript
// next.config.ts
const securityHeaders = [
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on'
  },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload'
  },
  {
    key: 'X-Frame-Options',
    value: 'SAMEORIGIN'
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff'
  },
  {
    key: 'X-XSS-Protection',
    value: '1; mode=block'
  },
  {
    key: 'Referrer-Policy',
    value: 'strict-origin-when-cross-origin'
  },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=()'
  },
  {
    key: 'Content-Security-Policy',
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-eval' 'unsafe-inline'",
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: https:",
      "font-src 'self' data:",
      "connect-src 'self' https://api.example.com",
      "frame-ancestors 'self'"
    ].join('; ')
  }
]
```

#### 5.2 Implementation Tasks
- [ ] Configure security headers in `next.config.ts`
- [ ] Test CSP policy compatibility
- [ ] Add HSTS header
- [ ] Configure CORS properly
- [ ] Implement security.txt file
- [ ] Add robots.txt security directives

---

### Phase 6: Audit Logging & Monitoring (Week 3-4)

#### 6.1 Security Event Logging

```typescript
// Audit log schema
const AuditLogSchema = new mongoose.Schema({
  userId: String,
  action: {
    type: String,
    enum: [
      'auth.login',
      'auth.logout',
      'auth.failed_login',
      'auth.password_reset',
      'user.create',
      'user.update',
      'user.delete',
      'data.create',
      'data.read',
      'data.update',
      'data.delete',
      'permission.granted',
      'permission.denied',
      'security.suspicious_activity'
    ],
    required: true
  },
  resource: String,
  resourceId: String,
  ipAddress: String,
  userAgent: String,
  metadata: mongoose.Schema.Types.Mixed,
  severity: {
    type: String,
    enum: ['info', 'warning', 'error', 'critical'],
    default: 'info'
  },
  timestamp: {
    type: Date,
    default: Date.now,
    index: true
  }
});

// Indexes
AuditLogSchema.index({ userId: 1, timestamp: -1 });
AuditLogSchema.index({ action: 1, timestamp: -1 });
AuditLogSchema.index({ severity: 1, timestamp: -1 });
```

#### 6.2 Implementation Tasks
- [ ] Create AuditLog schema
- [ ] Implement audit logging middleware
- [ ] Log all authentication events
- [ ] Log all data mutations
- [ ] Log permission denials
- [ ] Create audit log viewer (admin only)
- [ ] Set up log retention policy (90 days)
- [ ] Configure log shipping to external service

#### 6.3 Anomaly Detection
- [ ] Track failed login attempts
- [ ] Detect unusual access patterns
- [ ] Monitor for brute force attacks
- [ ] Alert on suspicious activity
- [ ] Implement account lockout after 5 failed attempts
- [ ] Add CAPTCHA after 3 failed attempts

---

### Phase 7: Advanced Security Features (Week 4)

#### 7.1 Two-Factor Authentication (2FA)
- [ ] Add 2FA setup page
- [ ] Implement TOTP (Time-based OTP)
- [ ] Generate QR codes for authenticator apps
- [ ] Create backup codes
- [ ] Add 2FA verification to login flow
- [ ] Allow 2FA recovery process

#### 7.2 API Key Management (for integrations)
- [ ] Create API key generation system
- [ ] Implement key rotation
- [ ] Add key scoping (permissions)
- [ ] Create API key revocation
- [ ] Log API key usage
- [ ] Rate limit by API key

#### 7.3 Data Encryption
- [ ] Encrypt sensitive fields in database
- [ ] Implement field-level encryption for PII
- [ ] Use AES-256 encryption
- [ ] Manage encryption keys securely
- [ ] Implement key rotation schedule

---

## 🛠️ Implementation Code Examples

### 1. Secure Middleware

```typescript
// packages/security/src/middleware/auth.ts
import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { rateLimit } from './rateLimit';

export async function authMiddleware(req: NextRequest) {
  // Rate limiting
  const rateLimitResult = await rateLimit(req);
  if (!rateLimitResult.success) {
    return new NextResponse('Too Many Requests', { status: 429 });
  }

  // Authentication
  const token = await getToken({ req });
  if (!token) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  // Add security headers
  const response = NextResponse.next();
  response.headers.set('X-User-Id', token.sub || '');

  return response;
}
```

### 2. Permission Checker

```typescript
// packages/permissions/src/index.ts
import { Role } from '@realtyeaseai/database';

type Permission = 'create' | 'read' | 'update' | 'delete' | 'manage';
type Resource = 'users' | 'projects' | 'tasks' | 'billing' | 'settings';

const rolePermissions: Record<Role, Record<Resource, Permission[]>> = {
  ADMIN: {
    users: ['create', 'read', 'update', 'delete', 'manage'],
    projects: ['create', 'read', 'update', 'delete', 'manage'],
    tasks: ['create', 'read', 'update', 'delete', 'manage'],
    billing: ['create', 'read', 'update', 'delete', 'manage'],
    settings: ['manage']
  },
  MANAGER: {
    users: ['read', 'update'],
    projects: ['create', 'read', 'update'],
    tasks: ['create', 'read', 'update'],
    billing: ['read'],
    settings: []
  },
  CLIENT: {
    users: ['read'],
    projects: ['create', 'read', 'update'],
    tasks: ['create', 'read'],
    billing: ['read'],
    settings: []
  },
  VA: {
    users: [],
    projects: ['read'],
    tasks: ['read', 'update'],
    billing: [],
    settings: []
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

export function requirePermission(
  role: Role,
  resource: Resource,
  permission: Permission
) {
  if (!hasPermission(role, resource, permission)) {
    throw new Error(`Insufficient permissions: ${role} cannot ${permission} ${resource}`);
  }
}
```

### 3. Input Validation

```typescript
// packages/validation/src/schemas/user.ts
import { z } from 'zod';

export const createUserSchema = z.object({
  email: z.string().email('Invalid email format'),
  password: z
    .string()
    .min(12, 'Password must be at least 12 characters')
    .regex(/[A-Z]/, 'Password must contain uppercase letter')
    .regex(/[a-z]/, 'Password must contain lowercase letter')
    .regex(/[0-9]/, 'Password must contain number')
    .regex(/[^A-Za-z0-9]/, 'Password must contain special character'),
  firstName: z
    .string()
    .min(1, 'First name required')
    .max(50, 'First name too long')
    .regex(/^[a-zA-Z\s\-']+$/, 'Invalid characters in first name'),
  lastName: z
    .string()
    .min(1, 'Last name required')
    .max(50, 'Last name too long')
    .regex(/^[a-zA-Z\s\-']+$/, 'Invalid characters in last name'),
  phone: z
    .string()
    .regex(/^\+?[1-9]\d{1,14}$/, 'Invalid phone number')
    .optional()
});

export type CreateUserInput = z.infer<typeof createUserSchema>;
```

### 4. Rate Limiting

```typescript
// packages/security/src/rateLimit.ts
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!
});

// Different rate limits for different endpoints
export const authRateLimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(5, '15 m'), // 5 requests per 15 minutes
  analytics: true
});

export const apiRateLimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(100, '1 m'), // 100 requests per minute
  analytics: true
});

export const fileUploadRateLimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(10, '1 h'), // 10 uploads per hour
  analytics: true
});
```

---

## 🔍 Security Testing Checklist

### Authentication Testing
- [ ] Test SQL injection in login form
- [ ] Test XSS in login form
- [ ] Test brute force protection
- [ ] Test session hijacking prevention
- [ ] Test CSRF token validation
- [ ] Test OAuth flow security
- [ ] Test password reset flow

### Authorization Testing
- [ ] Test horizontal privilege escalation
- [ ] Test vertical privilege escalation
- [ ] Test IDOR (Insecure Direct Object Reference)
- [ ] Test role switching security
- [ ] Test permission bypasses

### API Security Testing
- [ ] Test rate limiting
- [ ] Test input validation
- [ ] Test file upload restrictions
- [ ] Test API authentication
- [ ] Test SQL injection in API params
- [ ] Test NoSQL injection

### Infrastructure Testing
- [ ] Test security headers present
- [ ] Test SSL/TLS configuration
- [ ] Test CORS configuration
- [ ] Test environment variable exposure
- [ ] Test error message information leakage

---

## 📊 Security Metrics & Monitoring

### Key Metrics to Track
1. **Failed login attempts** (threshold: >5 per user per 15 min)
2. **API rate limit hits** (threshold: >10% of requests)
3. **CSRF failures** (threshold: >0)
4. **Permission denials** (threshold: monitor trends)
5. **Unusual access patterns** (e.g., accessing 100+ resources in 1 min)
6. **File upload rejections** (malware, size, type)
7. **Database query times** (detect SQL injection attempts)

### Alert Triggers
- 5+ failed logins from same IP → Block IP temporarily
- Permission denial spike → Security review
- Unusual data access pattern → Flag for review
- Multiple CSRF failures → Investigate session
- Large file uploads → Scan for malware

---

## 🎯 Success Criteria

### Security Implementation Complete When:
- ✅ All authentication flows tested and secured
- ✅ All API routes have input validation
- ✅ Rate limiting active on all endpoints
- ✅ RBAC system fully implemented
- ✅ Security headers configured and tested
- ✅ Audit logging capturing all critical events
- ✅ File uploads validated and scanned
- ✅ Environment variables secured
- ✅ Security testing completed with 0 critical issues
- ✅ Monitoring and alerts configured

---

## 📚 Security Standards Compliance

This implementation ensures compliance with:
- **OWASP Top 10** - Protection against all major vulnerabilities
- **GDPR** - Data protection and privacy requirements
- **SOC 2** - Security, availability, and confidentiality
- **HIPAA** (if needed) - Healthcare data security
- **PCI DSS** (if processing payments) - Payment card industry standards

---

## 🚀 Next Steps

1. **Review this document** with development team
2. **Prioritize phases** based on launch timeline
3. **Assign ownership** for each security component
4. **Set deadlines** for each phase
5. **Begin implementation** starting with Phase 1
6. **Conduct security reviews** at each phase completion
7. **Perform penetration testing** before production launch

---

**Document Owner**: Security Team
**Last Review**: 2025-11-27
**Next Review**: Before production deployment
