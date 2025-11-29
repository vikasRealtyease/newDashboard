-- =====================================================
-- INITIAL DATABASE SCHEMA
-- Migration: 001_initial_schema.sql
-- Description: Creates all core tables for the SaaS platform
-- =====================================================

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm"; -- For full-text search

-- =====================================================
-- 1. MESSAGES TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    conversation_id UUID NOT NULL,
    sender_id UUID NOT NULL,
    content TEXT NOT NULL CHECK (char_length(content) <= 10000),
    message_type VARCHAR(20) NOT NULL DEFAULT 'text' CHECK (message_type IN ('text', 'file', 'image', 'system')),

    -- Attachments stored as JSONB array
    attachments JSONB DEFAULT '[]'::jsonb,

    -- Reactions stored as JSONB array
    reactions JSONB DEFAULT '[]'::jsonb,

    -- Read receipts stored as JSONB array
    read_by JSONB DEFAULT '[]'::jsonb,

    -- Reply tracking
    reply_to_id UUID REFERENCES messages(id) ON DELETE SET NULL,

    -- Edit tracking
    is_edited BOOLEAN DEFAULT false,
    edited_at TIMESTAMP WITH TIME ZONE,

    -- Soft delete
    is_deleted BOOLEAN DEFAULT false,
    deleted_at TIMESTAMP WITH TIME ZONE,

    -- Metadata
    metadata JSONB,

    -- Timestamps
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for messages
CREATE INDEX idx_messages_conversation_id ON messages(conversation_id, created_at DESC);
CREATE INDEX idx_messages_sender_id ON messages(sender_id, created_at DESC);
CREATE INDEX idx_messages_conversation_deleted ON messages(conversation_id, is_deleted, created_at DESC);
CREATE INDEX idx_messages_attachments ON messages USING GIN (attachments);
CREATE INDEX idx_messages_reply_to ON messages(reply_to_id) WHERE reply_to_id IS NOT NULL;

-- Full-text search index for message content
CREATE INDEX idx_messages_content_search ON messages USING GIN (to_tsvector('english', content));

-- =====================================================
-- 2. FILES TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS files (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL,
    file_name VARCHAR(255) NOT NULL,
    original_file_name VARCHAR(255) NOT NULL,
    file_url TEXT NOT NULL CHECK (file_url ~ '^https?://.*'),
    file_type VARCHAR(20) NOT NULL CHECK (file_type IN ('image', 'video', 'audio', 'document', 'archive', 'other')),
    mime_type VARCHAR(100) NOT NULL,
    file_size BIGINT NOT NULL CHECK (file_size > 0 AND file_size <= 104857600), -- Max 100MB

    -- Storage provider info
    storage_provider VARCHAR(20) NOT NULL DEFAULT 'supabase' CHECK (storage_provider IN ('cloudinary', 'supabase', 's3', 'local')),
    cloudinary_id VARCHAR(255),
    supabase_key VARCHAR(255),
    s3_key VARCHAR(255),

    -- Organization
    folder_id UUID,
    tags TEXT[] DEFAULT '{}',

    -- Access control
    is_public BOOLEAN DEFAULT false,
    shared_with UUID[] DEFAULT '{}',

    -- File metadata
    width INTEGER CHECK (width > 0),
    height INTEGER CHECK (height > 0),
    duration INTEGER CHECK (duration >= 0), -- seconds
    thumbnail TEXT CHECK (thumbnail IS NULL OR thumbnail ~ '^https?://.*'),

    -- Virus scan
    is_scanned BOOLEAN DEFAULT false,
    is_safe BOOLEAN DEFAULT false,
    scan_date TIMESTAMP WITH TIME ZONE,
    scan_result TEXT,

    -- Usage tracking
    download_count INTEGER DEFAULT 0 CHECK (download_count >= 0),
    last_accessed_at TIMESTAMP WITH TIME ZONE,

    -- Soft delete
    is_deleted BOOLEAN DEFAULT false,
    deleted_at TIMESTAMP WITH TIME ZONE,

    -- Metadata
    metadata JSONB,

    -- Timestamps
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for files
CREATE INDEX idx_files_user_id ON files(user_id, created_at DESC);
CREATE INDEX idx_files_user_type ON files(user_id, file_type);
CREATE INDEX idx_files_user_deleted ON files(user_id, is_deleted);
CREATE INDEX idx_files_tags ON files USING GIN (tags);
CREATE INDEX idx_files_public_deleted ON files(is_public, is_deleted);
CREATE INDEX idx_files_cloudinary ON files(cloudinary_id) WHERE cloudinary_id IS NOT NULL;
CREATE INDEX idx_files_supabase ON files(supabase_key) WHERE supabase_key IS NOT NULL;
CREATE INDEX idx_files_scan_status ON files(is_scanned, is_safe);
CREATE INDEX idx_files_shared_with ON files USING GIN (shared_with);

-- =====================================================
-- 3. ACTIVITY_LOGS TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS activity_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL,
    action VARCHAR(100) NOT NULL,
    resource_type VARCHAR(50) NOT NULL CHECK (resource_type IN ('user', 'project', 'task', 'message', 'file', 'subscription', 'payment', 'ai_tool', 'system')),
    resource_id VARCHAR(100),

    -- Details
    description VARCHAR(1000) NOT NULL,
    changes JSONB, -- { before: {}, after: {} }

    -- Context
    ip_address INET,
    user_agent VARCHAR(500),
    location JSONB, -- { country, city, lat, lon }

    -- Security
    severity VARCHAR(20) DEFAULT 'info' CHECK (severity IN ('info', 'warning', 'error', 'critical')),
    is_suspicious BOOLEAN DEFAULT false,

    -- Metadata
    metadata JSONB,

    -- Timestamp (only created_at, no updates for logs)
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for activity_logs
CREATE INDEX idx_activity_logs_user_id ON activity_logs(user_id, created_at DESC);
CREATE INDEX idx_activity_logs_action ON activity_logs(action, created_at DESC);
CREATE INDEX idx_activity_logs_resource ON activity_logs(resource_type, resource_id);
CREATE INDEX idx_activity_logs_severity ON activity_logs(severity, created_at DESC);
CREATE INDEX idx_activity_logs_suspicious ON activity_logs(is_suspicious, created_at DESC);
CREATE INDEX idx_activity_logs_user_action ON activity_logs(user_id, action, created_at DESC);
CREATE INDEX idx_activity_logs_created_at ON activity_logs(created_at DESC);

-- Auto-delete logs older than 90 days (using pg_cron or manual cleanup)
-- Note: PostgreSQL doesn't have TTL like MongoDB, but we can use pg_cron extension or scheduled job
COMMENT ON TABLE activity_logs IS 'Activity logs with 90-day retention policy. Run: DELETE FROM activity_logs WHERE created_at < NOW() - INTERVAL ''90 days''';

-- =====================================================
-- 4. AI_LOGS TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS ai_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL,
    tool_name VARCHAR(100) NOT NULL CHECK (tool_name IN (
        'gpt-4', 'gpt-4-turbo', 'gpt-3.5-turbo',
        'claude-3-opus', 'claude-3-sonnet', 'claude-3-haiku',
        'dall-e-3', 'dall-e-2', 'whisper', 'tts',
        'embeddings', 'moderation', 'vision',
        'code-interpreter', 'web-search', 'document-analysis',
        'image-generation', 'voice-generation', 'translation',
        'summarization', 'sentiment-analysis', 'content-moderation'
    )),
    model VARCHAR(100) NOT NULL,

    -- Input/Output as JSONB
    input JSONB NOT NULL DEFAULT '{}'::jsonb, -- { prompt, parameters, files[] }
    output JSONB NOT NULL DEFAULT '{}'::jsonb, -- { result, data, files[] }

    -- Usage metrics
    prompt_tokens INTEGER DEFAULT 0 CHECK (prompt_tokens >= 0),
    completion_tokens INTEGER DEFAULT 0 CHECK (completion_tokens >= 0),
    total_tokens INTEGER GENERATED ALWAYS AS (prompt_tokens + completion_tokens) STORED,

    -- Cost tracking
    cost_per_token DECIMAL(12, 8) NOT NULL CHECK (cost_per_token >= 0),
    total_cost DECIMAL(12, 4) GENERATED ALWAYS AS (total_tokens * cost_per_token) STORED,
    credits_charged DECIMAL(12, 2) NOT NULL CHECK (credits_charged >= 0),

    -- Status
    status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'completed', 'failed')),
    error TEXT CHECK (char_length(error) <= 1000),

    -- Performance
    execution_time_ms INTEGER DEFAULT 0 CHECK (execution_time_ms >= 0),

    -- Metadata
    user_agent VARCHAR(500),
    ip_address INET,
    metadata JSONB,

    -- Timestamps
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for ai_logs
CREATE INDEX idx_ai_logs_user_id ON ai_logs(user_id, created_at DESC);
CREATE INDEX idx_ai_logs_tool_name ON ai_logs(tool_name, created_at DESC);
CREATE INDEX idx_ai_logs_status ON ai_logs(status, created_at DESC);
CREATE INDEX idx_ai_logs_user_tool ON ai_logs(user_id, tool_name, created_at DESC);
CREATE INDEX idx_ai_logs_user_status ON ai_logs(user_id, status);
CREATE INDEX idx_ai_logs_created_at ON ai_logs(created_at DESC);

-- =====================================================
-- TRIGGERS FOR AUTO-UPDATING updated_at
-- =====================================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply trigger to tables with updated_at
CREATE TRIGGER update_messages_updated_at BEFORE UPDATE ON messages
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_files_updated_at BEFORE UPDATE ON files
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_ai_logs_updated_at BEFORE UPDATE ON ai_logs
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- =====================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- =====================================================
-- Enable RLS on all tables
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE files ENABLE ROW LEVEL SECURITY;
ALTER TABLE activity_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_logs ENABLE ROW LEVEL SECURITY;

-- Example RLS policies (customize based on your auth setup)
-- Users can only see their own files
CREATE POLICY files_user_policy ON files
    FOR ALL
    USING (auth.uid()::text = user_id::text);

-- Users can only see their own AI logs
CREATE POLICY ai_logs_user_policy ON ai_logs
    FOR ALL
    USING (auth.uid()::text = user_id::text);

-- Users can only see their own activity logs
CREATE POLICY activity_logs_user_policy ON activity_logs
    FOR ALL
    USING (auth.uid()::text = user_id::text);

-- Messages: users can see messages in conversations they're part of
-- (This requires a conversations table with participants - add later if needed)
CREATE POLICY messages_conversation_policy ON messages
    FOR ALL
    USING (true); -- Customize based on conversation membership

-- =====================================================
-- HELPFUL FUNCTIONS
-- =====================================================

-- Function to get user storage usage
CREATE OR REPLACE FUNCTION get_user_storage_usage(p_user_id UUID)
RETURNS TABLE (
    total_size BIGINT,
    total_files BIGINT
) AS $$
BEGIN
    RETURN QUERY
    SELECT
        COALESCE(SUM(file_size), 0)::BIGINT as total_size,
        COUNT(*)::BIGINT as total_files
    FROM files
    WHERE user_id = p_user_id AND is_deleted = false;
END;
$$ LANGUAGE plpgsql;

-- Function to get user AI usage stats
CREATE OR REPLACE FUNCTION get_user_ai_usage_stats(
    p_user_id UUID,
    p_start_date TIMESTAMP WITH TIME ZONE,
    p_end_date TIMESTAMP WITH TIME ZONE
)
RETURNS TABLE (
    tool_name VARCHAR,
    usage_count BIGINT,
    total_tokens BIGINT,
    total_cost NUMERIC,
    total_credits NUMERIC,
    avg_execution_time NUMERIC
) AS $$
BEGIN
    RETURN QUERY
    SELECT
        al.tool_name,
        COUNT(*)::BIGINT as usage_count,
        SUM(al.total_tokens)::BIGINT as total_tokens,
        SUM(al.total_cost) as total_cost,
        SUM(al.credits_charged) as total_credits,
        AVG(al.execution_time_ms) as avg_execution_time
    FROM ai_logs al
    WHERE
        al.user_id = p_user_id
        AND al.status = 'completed'
        AND al.created_at BETWEEN p_start_date AND p_end_date
    GROUP BY al.tool_name
    ORDER BY total_cost DESC;
END;
$$ LANGUAGE plpgsql;

-- Function to get suspicious activity
CREATE OR REPLACE FUNCTION get_suspicious_activity(
    p_start_date TIMESTAMP WITH TIME ZONE,
    p_end_date TIMESTAMP WITH TIME ZONE,
    p_limit INTEGER DEFAULT 50
)
RETURNS SETOF activity_logs AS $$
BEGIN
    RETURN QUERY
    SELECT *
    FROM activity_logs
    WHERE
        is_suspicious = true
        AND created_at BETWEEN p_start_date AND p_end_date
    ORDER BY created_at DESC
    LIMIT p_limit;
END;
$$ LANGUAGE plpgsql;

-- =====================================================
-- COMMENTS FOR DOCUMENTATION
-- =====================================================
COMMENT ON TABLE messages IS 'Chat messages with attachments, reactions, and read receipts';
COMMENT ON TABLE files IS 'File storage metadata with virus scanning and sharing capabilities';
COMMENT ON TABLE ai_logs IS 'AI tool usage tracking with token and cost metrics';
COMMENT ON COLUMN messages.attachments IS 'Array of attachment objects: [{url, fileName, fileType, fileSize, cloudinaryId}]';
COMMENT ON COLUMN messages.reactions IS 'Array of reaction objects: [{userId, emoji, createdAt}]';
COMMENT ON COLUMN messages.read_by IS 'Array of read receipt objects: [{userId, readAt}]';
COMMENT ON COLUMN activity_logs.changes IS 'Object with before and after states: {before: {}, after: {}}';
COMMENT ON COLUMN ai_logs.input IS 'Input data: {prompt, parameters, files[]}';
COMMENT ON COLUMN ai_logs.output IS 'Output data: {result, data, files[]}';
