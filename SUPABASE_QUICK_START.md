# Supabase Quick Start

## 5-Minute Setup

### 1. Create Supabase Project
```bash
# Go to supabase.com → New Project
# Save your credentials:
PROJECT_URL=https://xxxxx.supabase.co
ANON_KEY=eyJhbGc...
SERVICE_KEY=eyJhbGc...
```

### 2. Run Migration
```sql
-- Copy contents of packages/supabase/src/migrations/001_initial_schema.sql
-- Paste into Supabase SQL Editor → Run
```

### 3. Update .env
```bash
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGc...
```

### 4. Install & Build
```bash
pnpm install
pnpm build
```

### 5. Usage Examples

```typescript
import { messageService, fileService, activityLogService, aiLogService } from '@realtyeaseai/supabase';

// Create a message
const message = await messageService.create({
  conversation_id: 'conv-123',
  sender_id: 'user-456',
  content: 'Hello!',
  message_type: 'text'
});

// Upload file metadata
const file = await fileService.create({
  user_id: 'user-456',
  file_name: 'document.pdf',
  original_file_name: 'My Doc.pdf',
  file_url: 'https://storage.../file.pdf',
  file_type: 'document',
  mime_type: 'application/pdf',
  file_size: 123456
});

// Log activity
await activityLogService.logActivity({
  user_id: 'user-456',
  action: 'file_upload',
  resource_type: 'file',
  resource_id: file.id,
  description: 'User uploaded a file',
  severity: 'info'
});

// Track AI usage
const aiLog = await aiLogService.create({
  user_id: 'user-456',
  tool_name: 'gpt-4',
  model: 'gpt-4-turbo',
  input: { prompt: 'Summarize this...' },
  output: { result: 'Summary: ...' },
  prompt_tokens: 100,
  completion_tokens: 50,
  cost_per_token: 0.00003,
  credits_charged: 1.5,
  status: 'completed',
  execution_time_ms: 2500
});
```

## Field Name Mapping

| MongoDB (camelCase) | PostgreSQL (snake_case) |
|---------------------|-------------------------|
| `userId` | `user_id` |
| `conversationId` | `conversation_id` |
| `senderId` | `sender_id` |
| `messageType` | `message_type` |
| `fileName` | `file_name` |
| `fileUrl` | `file_url` |
| `fileType` | `file_type` |
| `fileSize` | `file_size` |
| `isDeleted` | `is_deleted` |
| `createdAt` | `created_at` |
| `updatedAt` | `updated_at` |

## Useful Supabase Commands

### Direct SQL Queries
```typescript
import { supabase } from '@realtyeaseai/supabase';

// Raw SQL query
const { data, error } = await supabase
  .from('messages')
  .select('*')
  .eq('conversation_id', 'conv-123')
  .order('created_at', { ascending: false })
  .limit(50);
```

### Real-time Subscriptions
```typescript
// Subscribe to new messages
const subscription = supabase
  .channel('messages')
  .on('postgres_changes', {
    event: 'INSERT',
    schema: 'public',
    table: 'messages',
    filter: `conversation_id=eq.conv-123`
  }, (payload) => {
    console.log('New message:', payload.new);
  })
  .subscribe();

// Unsubscribe
subscription.unsubscribe();
```

### Call Database Functions
```typescript
// Get user storage usage
const { data } = await supabase
  .rpc('get_user_storage_usage', { p_user_id: 'user-456' });

// Get AI usage stats
const { data: stats } = await supabase
  .rpc('get_user_ai_usage_stats', {
    p_user_id: 'user-456',
    p_start_date: '2024-01-01T00:00:00Z',
    p_end_date: '2024-01-31T23:59:59Z'
  });
```

## Common Patterns

### Batch Insert
```typescript
const messages = [
  { conversation_id: 'conv-1', sender_id: 'user-1', content: 'Hi' },
  { conversation_id: 'conv-1', sender_id: 'user-2', content: 'Hello' },
];

const { data, error } = await supabase
  .from('messages')
  .insert(messages)
  .select();
```

### Update with Filter
```typescript
const { data, error } = await supabase
  .from('files')
  .update({ is_public: true })
  .eq('user_id', 'user-456')
  .eq('file_type', 'image')
  .select();
```

### Soft Delete
```typescript
await fileService.softDelete(fileId);
// Sets: is_deleted = true, deleted_at = now()
```

### Full-Text Search
```typescript
const { data } = await supabase
  .from('messages')
  .select('*')
  .textSearch('content', 'important meeting');
```

## Performance Tips

1. **Use Indexes** - Already created in migration
2. **Limit Results** - Always use `.limit()` or `.range()`
3. **Select Specific Columns** - `.select('id, content')` instead of `.select('*')`
4. **Use Server Client for Admin** - `createServerClient()` bypasses RLS
5. **Enable Real-time Carefully** - Only for tables that need it

## Security (RLS)

Row Level Security is already enabled. Users can only access their own data.

**Bypass RLS for admin operations:**
```typescript
import { createServerClient } from '@realtyeaseai/supabase';

const serverClient = createServerClient();
const { data } = await serverClient
  .from('users')
  .select('*'); // Returns ALL users (admin access)
```

## Migration from MongoDB

See full guide: `SUPABASE_MIGRATION_GUIDE.md`

Quick replace:
```typescript
// OLD
import { Message, File } from '@realtyeaseai/mongodb';
await Message.create({ ... });

// NEW
import { messageService } from '@realtyeaseai/supabase';
await messageService.create({ ... });
```

---

**That's it! You're ready to use Supabase. 🚀**

For detailed migration steps, see `SUPABASE_MIGRATION_GUIDE.md`.
