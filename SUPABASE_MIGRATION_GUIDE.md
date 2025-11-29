# Supabase Migration Guide

Complete guide to migrate from MongoDB to Supabase/PostgreSQL.

---

## Table of Contents
1. [Overview](#overview)
2. [Prerequisites](#prerequisites)
3. [Step 1: Create Supabase Project](#step-1-create-supabase-project)
4. [Step 2: Run Database Migrations](#step-2-run-database-migrations)
5. [Step 3: Configure Environment Variables](#step-3-configure-environment-variables)
6. [Step 4: Install Dependencies](#step-4-install-dependencies)
7. [Step 5: Update Application Code](#step-5-update-application-code)
8. [Step 6: Data Migration (if needed)](#step-6-data-migration-if-needed)
9. [Step 7: Testing](#step-7-testing)
10. [Step 8: Remove MongoDB](#step-8-remove-mongodb)
11. [API Comparison](#api-comparison)
12. [Troubleshooting](#troubleshooting)

---

## Overview

### What's Being Migrated:
- **Messages** - Chat/messaging with attachments, reactions, read receipts
- **Files** - File storage metadata with virus scanning and sharing
- **Activity Logs** - Audit logs with 90-day retention
- **AI Logs** - AI tool usage tracking with token/cost metrics

### Why Supabase?
- Auto-generated REST & GraphQL APIs
- Row Level Security (RLS) for multi-tenant SaaS
- Real-time subscriptions out of the box
- Built-in auth with social providers
- No DevOps headache - hosted solution
- PostgreSQL power with better relational data support

---

## Prerequisites

- [ ] Node.js 18+ installed
- [ ] Git installed
- [ ] Account on [supabase.com](https://supabase.com)
- [ ] Basic SQL knowledge (helpful but not required)

---

## Step 1: Create Supabase Project

### 1.1 Sign Up / Login
1. Go to [supabase.com](https://supabase.com)
2. Sign up or login with GitHub

### 1.2 Create New Project
1. Click "New Project"
2. Fill in:
   - **Name**: `realtyease-ai-saas` (or your preferred name)
   - **Database Password**: Generate a strong password and SAVE IT
   - **Region**: Choose closest to your users (e.g., `us-east-1`)
   - **Pricing Plan**: Start with Free tier
3. Click "Create new project"
4. Wait 2-3 minutes for project to initialize

### 1.3 Get API Keys
1. Go to **Settings** → **API**
2. Copy the following values:
   - **Project URL**: `https://xxxxxxxxxxxxx.supabase.co`
   - **anon/public key**: `eyJhbGc...` (long string)
   - **service_role key**: `eyJhbGc...` (different long string)

**⚠️ IMPORTANT**: Keep the `service_role` key secret! Never commit to Git.

---

## Step 2: Run Database Migrations

### 2.1 Open SQL Editor
1. In Supabase dashboard, go to **SQL Editor**
2. Click "New query"

### 2.2 Run Migration Script
1. Open `packages/supabase/src/migrations/001_initial_schema.sql`
2. Copy the entire contents
3. Paste into Supabase SQL Editor
4. Click "Run" (bottom right)
5. Wait for "Success. No rows returned" message

### 2.3 Verify Tables Created
1. Go to **Table Editor** in Supabase dashboard
2. You should see 4 tables:
   - `messages`
   - `files`
   - `activity_logs`
   - `ai_logs`

---

## Step 3: Configure Environment Variables

### 3.1 Update `.env` File

```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxxxxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# Optional: Keep MongoDB for data migration (remove after migration complete)
# MONGODB_URI=mongodb+srv://...
```

### 3.2 Update `.env.example`

```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
```

### 3.3 Update `.env` in All App Directories
Copy the Supabase variables to:
- `apps/admin/.env`
- `apps/web/.env`
- `apps/va/.env`
- `apps/manager/.env`

---

## Step 4: Install Dependencies

### 4.1 Install Supabase Client

```bash
# From monorepo root
pnpm install

# The @supabase/supabase-js package is already in packages/supabase/package.json
# This command will install it across the workspace
```

### 4.2 Update Package Dependencies

If any app needs to use Supabase directly, update their `package.json`:

```json
{
  "dependencies": {
    "@realtyeaseai/supabase": "workspace:*"
  }
}
```

Then run:
```bash
pnpm install
```

---

## Step 5: Update Application Code

### 5.1 Replace MongoDB Imports

**Old (MongoDB)**:
```typescript
import { connectMongoDB, Message, File, ActivityLog, AILog } from '@realtyeaseai/mongodb';
```

**New (Supabase)**:
```typescript
import {
  supabase,
  messageService,
  fileService,
  activityLogService,
  aiLogService
} from '@realtyeaseai/supabase';
```

### 5.2 Update API Usage

See [API Comparison](#api-comparison) section below for detailed examples.

**Quick Example - Creating a Message**:

**Old**:
```typescript
const message = await Message.create({
  conversationId: 'xxx',
  senderId: 'yyy',
  content: 'Hello!',
  messageType: 'text'
});
```

**New**:
```typescript
const message = await messageService.create({
  conversation_id: 'xxx',
  sender_id: 'yyy',
  content: 'Hello!',
  message_type: 'text'
});
```

---

## Step 6: Data Migration (if needed)

If you have existing data in MongoDB that needs to be migrated:

### 6.1 Create Migration Script

Create `scripts/migrate-mongo-to-supabase.ts`:

```typescript
import { connectMongoDB, Message, File, ActivityLog, AILog } from '@realtyeaseai/mongodb';
import { messageService, fileService, activityLogService, aiLogService } from '@realtyeaseai/supabase';

async function migrateMessages() {
  console.log('Migrating messages...');
  const messages = await Message.find({}).lean();

  for (const msg of messages) {
    await messageService.create({
      conversation_id: msg.conversationId,
      sender_id: msg.senderId,
      content: msg.content,
      message_type: msg.messageType,
      attachments: msg.attachments || [],
      reactions: msg.reactions || [],
      read_by: msg.readBy || [],
      reply_to_id: msg.replyToId,
      is_edited: msg.isEdited,
      edited_at: msg.editedAt?.toISOString(),
      is_deleted: msg.isDeleted,
      deleted_at: msg.deletedAt?.toISOString(),
      metadata: msg.metadata,
      created_at: msg.createdAt.toISOString(),
      updated_at: msg.updatedAt.toISOString(),
    });
  }

  console.log(`Migrated ${messages.length} messages`);
}

async function migrateFiles() {
  console.log('Migrating files...');
  const files = await File.find({}).lean();

  for (const file of files) {
    await fileService.create({
      user_id: file.userId,
      file_name: file.fileName,
      original_file_name: file.originalFileName,
      file_url: file.fileUrl,
      file_type: file.fileType,
      mime_type: file.mimeType,
      file_size: file.fileSize,
      storage_provider: file.storageProvider,
      cloudinary_id: file.cloudinaryId,
      supabase_key: file.supabaseKey,
      s3_key: file.s3Key,
      folder_id: file.folderId,
      tags: file.tags || [],
      is_public: file.isPublic,
      shared_with: file.sharedWith || [],
      width: file.width,
      height: file.height,
      duration: file.duration,
      thumbnail: file.thumbnail,
      is_scanned: file.isScanned,
      is_safe: file.isSafe,
      scan_date: file.scanDate?.toISOString(),
      scan_result: file.scanResult,
      download_count: file.downloadCount,
      last_accessed_at: file.lastAccessedAt?.toISOString(),
      is_deleted: file.isDeleted,
      deleted_at: file.deletedAt?.toISOString(),
      metadata: file.metadata,
      created_at: file.createdAt.toISOString(),
      updated_at: file.updatedAt.toISOString(),
    });
  }

  console.log(`Migrated ${files.length} files`);
}

async function migrate() {
  await connectMongoDB();
  await migrateMessages();
  await migrateFiles();
  // Add migrateActivityLogs() and migrateAILogs() if needed
  console.log('Migration complete!');
  process.exit(0);
}

migrate().catch(console.error);
```

### 6.2 Run Migration

```bash
npx tsx scripts/migrate-mongo-to-supabase.ts
```

---

## Step 7: Testing

### 7.1 Unit Tests
Update your tests to use Supabase services:

```typescript
import { messageService } from '@realtyeaseai/supabase';

describe('Message Service', () => {
  it('should create a message', async () => {
    const message = await messageService.create({
      conversation_id: 'test-conv',
      sender_id: 'test-user',
      content: 'Test message'
    });

    expect(message).toBeDefined();
    expect(message?.content).toBe('Test message');
  });
});
```

### 7.2 Manual Testing Checklist
- [ ] Create a message
- [ ] Upload a file
- [ ] Log an activity
- [ ] Track AI usage
- [ ] Test RLS policies (users can only see their own data)
- [ ] Test real-time subscriptions (optional)

---

## Step 8: Remove MongoDB

Once migration is complete and tested:

### 8.1 Remove MongoDB Package

```bash
# Remove from specific apps if installed there
cd apps/admin
pnpm remove mongodb mongoose

# Remove the MongoDB package entirely
rm -rf packages/mongodb
```

### 8.2 Update Package References

Remove `@realtyeaseai/mongodb` from all `package.json` files.

### 8.3 Remove MongoDB Environment Variables

Delete from `.env`:
```bash
# MONGODB_URI=mongodb+srv://...  # Remove this line
```

### 8.4 Delete MongoDB Setup Docs

```bash
rm MONGODB_SETUP.md
```

---

## API Comparison

### Messages

#### Create Message
**MongoDB**:
```typescript
const message = await Message.create({
  conversationId: '123',
  senderId: 'user1',
  content: 'Hello',
  messageType: 'text'
});
```

**Supabase**:
```typescript
const message = await messageService.create({
  conversation_id: '123',
  sender_id: 'user1',
  content: 'Hello',
  message_type: 'text'
});
```

#### Get Messages
**MongoDB**:
```typescript
const messages = await Message.find({ conversationId: '123' })
  .sort({ createdAt: -1 })
  .limit(50);
```

**Supabase**:
```typescript
const messages = await messageService.getByConversation('123', 50);
```

#### Mark as Read
**MongoDB**:
```typescript
await message.markAsRead('user1');
```

**Supabase**:
```typescript
await messageService.markAsRead(message.id, 'user1');
```

---

### Files

#### Create File
**MongoDB**:
```typescript
const file = await File.create({
  userId: 'user1',
  fileName: 'document.pdf',
  originalFileName: 'My Document.pdf',
  fileUrl: 'https://...',
  fileType: 'document',
  mimeType: 'application/pdf',
  fileSize: 12345
});
```

**Supabase**:
```typescript
const file = await fileService.create({
  user_id: 'user1',
  file_name: 'document.pdf',
  original_file_name: 'My Document.pdf',
  file_url: 'https://...',
  file_type: 'document',
  mime_type: 'application/pdf',
  file_size: 12345
});
```

#### Get User Files
**MongoDB**:
```typescript
const files = await File.find({ userId: 'user1', isDeleted: false })
  .sort({ createdAt: -1 });
```

**Supabase**:
```typescript
const files = await fileService.getUserFiles('user1');
```

#### Get Storage Usage
**MongoDB**:
```typescript
const usage = await File.getUserStorageUsed('user1');
```

**Supabase**:
```typescript
const usage = await fileService.getUserStorageUsage('user1');
```

---

### Activity Logs

#### Log Activity
**MongoDB**:
```typescript
await ActivityLog.logActivity({
  userId: 'user1',
  action: 'login',
  resourceType: 'user',
  description: 'User logged in',
  severity: 'info'
});
```

**Supabase**:
```typescript
await activityLogService.logActivity({
  user_id: 'user1',
  action: 'login',
  resource_type: 'user',
  description: 'User logged in',
  severity: 'info'
});
```

---

### AI Logs

#### Create AI Log
**MongoDB**:
```typescript
const log = await AILog.create({
  userId: 'user1',
  toolName: 'gpt-4',
  model: 'gpt-4-turbo',
  input: { prompt: 'Hello' },
  promptTokens: 10,
  completionTokens: 20,
  costPerToken: 0.00003,
  creditsCharged: 1
});
```

**Supabase**:
```typescript
const log = await aiLogService.create({
  user_id: 'user1',
  tool_name: 'gpt-4',
  model: 'gpt-4-turbo',
  input: { prompt: 'Hello' },
  prompt_tokens: 10,
  completion_tokens: 20,
  cost_per_token: 0.00003,
  credits_charged: 1
});
```

#### Get Usage Stats
**MongoDB**:
```typescript
const stats = await AILog.getUserUsageStats(
  'user1',
  new Date('2024-01-01'),
  new Date('2024-01-31')
);
```

**Supabase**:
```typescript
const stats = await aiLogService.getUserUsageStats(
  'user1',
  '2024-01-01T00:00:00Z',
  '2024-01-31T23:59:59Z'
);
```

---

## Troubleshooting

### Issue: "relation does not exist"
**Solution**: Run the migration SQL script in Supabase SQL Editor.

### Issue: "permission denied for table"
**Solution**: Check Row Level Security policies. Use `createServerClient()` for admin operations.

### Issue: "Could not find Supabase URL"
**Solution**: Check that environment variables are properly set in `.env` files.

### Issue: Real-time not working
**Solution**: Enable real-time in Supabase dashboard → Database → Replication → Enable for specific tables.

### Issue: Data types mismatch
**Solution**: PostgreSQL uses snake_case (e.g., `user_id`) instead of camelCase. Update your code accordingly.

---

## Benefits Summary

### What You Gain:
✅ **Better Performance** - PostgreSQL is faster for relational queries
✅ **ACID Compliance** - True transactions and data integrity
✅ **Auto-generated APIs** - REST & GraphQL endpoints
✅ **Row Level Security** - Built-in multi-tenancy
✅ **Real-time Subscriptions** - Live data updates
✅ **Better Scaling** - Horizontal scaling with read replicas
✅ **Lower Costs** - Free tier includes 500MB database + 1GB file storage
✅ **Better Developer Experience** - SQL is universal, great tooling

### What You Lose:
❌ Flexible schema (but you don't need it for your use case)
❌ Horizontal sharding (but you won't need it until 100M+ records)

---

## Next Steps

1. **Set up Supabase Auth** - Replace custom auth with Supabase Auth
2. **Enable Real-time** - Add live updates to your dashboard
3. **Set up Storage** - Use Supabase Storage for file uploads
4. **Configure RLS Policies** - Fine-tune security policies
5. **Add Database Backups** - Set up automated backups
6. **Monitor Performance** - Use Supabase dashboard analytics

---

## Support

- **Supabase Docs**: https://supabase.com/docs
- **PostgreSQL Docs**: https://www.postgresql.org/docs/
- **Community**: https://github.com/supabase/supabase/discussions

---

**Migration Complete! 🎉**

You're now running on a modern, scalable, production-ready database infrastructure.
