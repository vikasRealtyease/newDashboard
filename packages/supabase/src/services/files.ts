import { supabase, createServerClient } from '../client';
import type { File, FileInsert, FileUpdate } from '../types';

export class FileService {
  private client = supabase;

  useServerClient() {
    this.client = createServerClient();
    return this;
  }

  // Create a new file record
  async create(data: FileInsert): Promise<File | null> {
    const { data: file, error } = await this.client
      .from('files')
      .insert(data)
      .select()
      .single();

    if (error) throw error;
    return file;
  }

  // Get user's files
  async getUserFiles(
    userId: string,
    options: {
      fileType?: string;
      includeDeleted?: boolean;
      limit?: number;
      offset?: number;
    } = {}
  ): Promise<File[]> {
    const { fileType, includeDeleted = false, limit = 50, offset = 0 } = options;

    let query = this.client
      .from('files')
      .select('*')
      .eq('user_id', userId);

    if (!includeDeleted) {
      query = query.eq('is_deleted', false);
    }

    if (fileType) {
      query = query.eq('file_type', fileType);
    }

    const { data, error } = await query
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    if (error) throw error;
    return data || [];
  }

  // Get user storage usage
  async getUserStorageUsage(userId: string): Promise<{ totalSize: number; totalFiles: number }> {
    const { data, error } = await this.client
      .rpc('get_user_storage_usage', { p_user_id: userId });

    if (error) throw error;
    return data[0] || { totalSize: 0, totalFiles: 0 };
  }

  // Increment download count
  async incrementDownloadCount(fileId: string): Promise<File | null> {
    // First get current count
    const { data: file, error: fetchError } = await this.client
      .from('files')
      .select('download_count')
      .eq('id', fileId)
      .single();

    if (fetchError) throw fetchError;

    const { data, error } = await this.client
      .from('files')
      .update({
        download_count: (file?.download_count || 0) + 1,
        last_accessed_at: new Date().toISOString(),
      })
      .eq('id', fileId)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  // Share file with user
  async shareWithUser(fileId: string, userId: string): Promise<File | null> {
    const { data: file, error: fetchError } = await this.client
      .from('files')
      .select('shared_with')
      .eq('id', fileId)
      .single();

    if (fetchError) throw fetchError;

    const sharedWith = file?.shared_with || [];
    if (sharedWith.includes(userId)) return file as File;

    const { data, error } = await this.client
      .from('files')
      .update({ shared_with: [...sharedWith, userId] })
      .eq('id', fileId)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  // Unshare file with user
  async unshareWithUser(fileId: string, userId: string): Promise<File | null> {
    const { data: file, error: fetchError } = await this.client
      .from('files')
      .select('shared_with')
      .eq('id', fileId)
      .single();

    if (fetchError) throw fetchError;

    const sharedWith = (file?.shared_with || []).filter((id: string) => id !== userId);

    const { data, error } = await this.client
      .from('files')
      .update({ shared_with: sharedWith })
      .eq('id', fileId)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  // Soft delete file
  async softDelete(fileId: string): Promise<File | null> {
    const { data, error } = await this.client
      .from('files')
      .update({
        is_deleted: true,
        deleted_at: new Date().toISOString(),
      })
      .eq('id', fileId)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  // Mark file as scanned
  async markAsScanned(
    fileId: string,
    isSafe: boolean,
    scanResult?: string
  ): Promise<File | null> {
    const { data, error } = await this.client
      .from('files')
      .update({
        is_scanned: true,
        is_safe: isSafe,
        scan_date: new Date().toISOString(),
        scan_result: scanResult,
      })
      .eq('id', fileId)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  // Get files by tag
  async getByTag(userId: string, tag: string): Promise<File[]> {
    const { data, error } = await this.client
      .from('files')
      .select('*')
      .eq('user_id', userId)
      .eq('is_deleted', false)
      .contains('tags', [tag])
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  }

  // Get public files
  async getPublicFiles(limit: number = 50): Promise<File[]> {
    const { data, error } = await this.client
      .from('files')
      .select('*')
      .eq('is_public', true)
      .eq('is_deleted', false)
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) throw error;
    return data || [];
  }
}

export const fileService = new FileService();
