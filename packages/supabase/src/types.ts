// Database types generated from Supabase schema
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      messages: {
        Row: {
          id: string
          conversation_id: string
          sender_id: string
          content: string
          message_type: 'text' | 'file' | 'image' | 'system'
          attachments: Json
          reactions: Json
          read_by: Json
          reply_to_id: string | null
          is_edited: boolean
          edited_at: string | null
          is_deleted: boolean
          deleted_at: string | null
          metadata: Json | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          conversation_id: string
          sender_id: string
          content: string
          message_type?: 'text' | 'file' | 'image' | 'system'
          attachments?: Json
          reactions?: Json
          read_by?: Json
          reply_to_id?: string | null
          is_edited?: boolean
          edited_at?: string | null
          is_deleted?: boolean
          deleted_at?: string | null
          metadata?: Json | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          conversation_id?: string
          sender_id?: string
          content?: string
          message_type?: 'text' | 'file' | 'image' | 'system'
          attachments?: Json
          reactions?: Json
          read_by?: Json
          reply_to_id?: string | null
          is_edited?: boolean
          edited_at?: string | null
          is_deleted?: boolean
          deleted_at?: string | null
          metadata?: Json | null
          created_at?: string
          updated_at?: string
        }
      }
      files: {
        Row: {
          id: string
          user_id: string
          file_name: string
          original_file_name: string
          file_url: string
          file_type: 'image' | 'video' | 'audio' | 'document' | 'archive' | 'other'
          mime_type: string
          file_size: number
          storage_provider: 'cloudinary' | 'supabase' | 's3' | 'local'
          cloudinary_id: string | null
          supabase_key: string | null
          s3_key: string | null
          folder_id: string | null
          tags: string[]
          is_public: boolean
          shared_with: string[]
          width: number | null
          height: number | null
          duration: number | null
          thumbnail: string | null
          is_scanned: boolean
          is_safe: boolean
          scan_date: string | null
          scan_result: string | null
          download_count: number
          last_accessed_at: string | null
          is_deleted: boolean
          deleted_at: string | null
          metadata: Json | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          file_name: string
          original_file_name: string
          file_url: string
          file_type: 'image' | 'video' | 'audio' | 'document' | 'archive' | 'other'
          mime_type: string
          file_size: number
          storage_provider?: 'cloudinary' | 'supabase' | 's3' | 'local'
          cloudinary_id?: string | null
          supabase_key?: string | null
          s3_key?: string | null
          folder_id?: string | null
          tags?: string[]
          is_public?: boolean
          shared_with?: string[]
          width?: number | null
          height?: number | null
          duration?: number | null
          thumbnail?: string | null
          is_scanned?: boolean
          is_safe?: boolean
          scan_date?: string | null
          scan_result?: string | null
          download_count?: number
          last_accessed_at?: string | null
          is_deleted?: boolean
          deleted_at?: string | null
          metadata?: Json | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          file_name?: string
          original_file_name?: string
          file_url?: string
          file_type?: 'image' | 'video' | 'audio' | 'document' | 'archive' | 'other'
          mime_type?: string
          file_size?: number
          storage_provider?: 'cloudinary' | 'supabase' | 's3' | 'local'
          cloudinary_id?: string | null
          supabase_key?: string | null
          s3_key?: string | null
          folder_id?: string | null
          tags?: string[]
          is_public?: boolean
          shared_with?: string[]
          width?: number | null
          height?: number | null
          duration?: number | null
          thumbnail?: string | null
          is_scanned?: boolean
          is_safe?: boolean
          scan_date?: string | null
          scan_result?: string | null
          download_count?: number
          last_accessed_at?: string | null
          is_deleted?: boolean
          deleted_at?: string | null
          metadata?: Json | null
          created_at?: string
          updated_at?: string
        }
      }
      activity_logs: {
        Row: {
          id: string
          user_id: string
          action: string
          resource_type: 'user' | 'project' | 'task' | 'message' | 'file' | 'subscription' | 'payment' | 'ai_tool' | 'system'
          resource_id: string | null
          description: string
          changes: Json | null
          ip_address: string | null
          user_agent: string | null
          location: Json | null
          severity: 'info' | 'warning' | 'error' | 'critical'
          is_suspicious: boolean
          metadata: Json | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          action: string
          resource_type: 'user' | 'project' | 'task' | 'message' | 'file' | 'subscription' | 'payment' | 'ai_tool' | 'system'
          resource_id?: string | null
          description: string
          changes?: Json | null
          ip_address?: string | null
          user_agent?: string | null
          location?: Json | null
          severity?: 'info' | 'warning' | 'error' | 'critical'
          is_suspicious?: boolean
          metadata?: Json | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          action?: string
          resource_type?: 'user' | 'project' | 'task' | 'message' | 'file' | 'subscription' | 'payment' | 'ai_tool' | 'system'
          resource_id?: string | null
          description?: string
          changes?: Json | null
          ip_address?: string | null
          user_agent?: string | null
          location?: Json | null
          severity?: 'info' | 'warning' | 'error' | 'critical'
          is_suspicious?: boolean
          metadata?: Json | null
          created_at?: string
        }
      }
      ai_logs: {
        Row: {
          id: string
          user_id: string
          tool_name: string
          model: string
          input: Json
          output: Json
          prompt_tokens: number
          completion_tokens: number
          total_tokens: number
          cost_per_token: number
          total_cost: number
          credits_charged: number
          status: 'pending' | 'processing' | 'completed' | 'failed'
          error: string | null
          execution_time_ms: number
          user_agent: string | null
          ip_address: string | null
          metadata: Json | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          tool_name: string
          model: string
          input?: Json
          output?: Json
          prompt_tokens?: number
          completion_tokens?: number
          cost_per_token: number
          credits_charged: number
          status?: 'pending' | 'processing' | 'completed' | 'failed'
          error?: string | null
          execution_time_ms?: number
          user_agent?: string | null
          ip_address?: string | null
          metadata?: Json | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          tool_name?: string
          model?: string
          input?: Json
          output?: Json
          prompt_tokens?: number
          completion_tokens?: number
          cost_per_token?: number
          credits_charged?: number
          status?: 'pending' | 'processing' | 'completed' | 'failed'
          error?: string | null
          execution_time_ms?: number
          user_agent?: string | null
          ip_address?: string | null
          metadata?: Json | null
          created_at?: string
          updated_at?: string
        }
      }
    }
    Functions: {
      get_user_storage_usage: {
        Args: { p_user_id: string }
        Returns: {
          total_size: number
          total_files: number
        }[]
      }
      get_user_ai_usage_stats: {
        Args: {
          p_user_id: string
          p_start_date: string
          p_end_date: string
        }
        Returns: {
          tool_name: string
          usage_count: number
          total_tokens: number
          total_cost: number
          total_credits: number
          avg_execution_time: number
        }[]
      }
      get_suspicious_activity: {
        Args: {
          p_start_date: string
          p_end_date: string
          p_limit?: number
        }
        Returns: Database['public']['Tables']['activity_logs']['Row'][]
      }
    }
  }
}

// Type helpers for application use
export type Message = Database['public']['Tables']['messages']['Row'];
export type MessageInsert = Database['public']['Tables']['messages']['Insert'];
export type MessageUpdate = Database['public']['Tables']['messages']['Update'];

export type File = Database['public']['Tables']['files']['Row'];
export type FileInsert = Database['public']['Tables']['files']['Insert'];
export type FileUpdate = Database['public']['Tables']['files']['Update'];

export type ActivityLog = Database['public']['Tables']['activity_logs']['Row'];
export type ActivityLogInsert = Database['public']['Tables']['activity_logs']['Insert'];
export type ActivityLogUpdate = Database['public']['Tables']['activity_logs']['Update'];

export type AILog = Database['public']['Tables']['ai_logs']['Row'];
export type AILogInsert = Database['public']['Tables']['ai_logs']['Insert'];
export type AILogUpdate = Database['public']['Tables']['ai_logs']['Update'];

// Attachment type for messages
export interface Attachment {
  url: string;
  fileName: string;
  fileType: string;
  fileSize: number;
  cloudinaryId?: string;
}

// Reaction type for messages
export interface Reaction {
  userId: string;
  emoji: string;
  createdAt: string;
}

// Read receipt type for messages
export interface ReadReceipt {
  userId: string;
  readAt: string;
}

// Location type for activity logs
export interface Location {
  country?: string;
  city?: string;
  lat?: number;
  lon?: number;
}

// Changes type for activity logs
export interface Changes {
  before?: Record<string, any>;
  after?: Record<string, any>;
}

// AI Log input/output types
export interface AILogInput {
  prompt?: string;
  parameters?: Record<string, any>;
  files?: string[];
}

export interface AILogOutput {
  result?: string;
  data?: Record<string, any>;
  files?: string[];
}
