import { supabase, createServerClient } from '../client';
import type { ActivityLog, ActivityLogInsert } from '../types';

export class ActivityLogService {
  private client = supabase;

  useServerClient() {
    this.client = createServerClient();
    return this;
  }

  // Log an activity
  async logActivity(data: ActivityLogInsert): Promise<ActivityLog | null> {
    const { data: log, error } = await this.client
      .from('activity_logs')
      .insert(data)
      .select()
      .single();

    if (error) throw error;
    return log;
  }

  // Get user activity
  async getUserActivity(
    userId: string,
    startDate: string,
    endDate: string,
    limit: number = 100
  ): Promise<ActivityLog[]> {
    const { data, error } = await this.client
      .from('activity_logs')
      .select('*')
      .eq('user_id', userId)
      .gte('created_at', startDate)
      .lte('created_at', endDate)
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) throw error;
    return data || [];
  }

  // Get suspicious activity
  async getSuspiciousActivity(
    startDate: string,
    endDate: string,
    limit: number = 50
  ): Promise<ActivityLog[]> {
    const { data, error } = await this.client
      .rpc('get_suspicious_activity', {
        p_start_date: startDate,
        p_end_date: endDate,
        p_limit: limit,
      });

    if (error) throw error;
    return data || [];
  }

  // Get activity by action
  async getActivityByAction(
    action: string,
    startDate: string,
    endDate: string
  ): Promise<
    Array<{
      userId: string;
      count: number;
      firstOccurrence: string;
      lastOccurrence: string;
    }>
  > {
    const { data, error } = await this.client
      .from('activity_logs')
      .select('user_id, created_at')
      .eq('action', action)
      .gte('created_at', startDate)
      .lte('created_at', endDate);

    if (error) throw error;
    if (!data) return [];

    // Group by user_id manually (since Supabase doesn't have $group)
    const grouped = data.reduce((acc, log) => {
      if (!acc[log.user_id]) {
        acc[log.user_id] = {
          userId: log.user_id,
          count: 0,
          firstOccurrence: log.created_at,
          lastOccurrence: log.created_at,
        };
      }
      acc[log.user_id].count++;
      if (log.created_at < acc[log.user_id].firstOccurrence) {
        acc[log.user_id].firstOccurrence = log.created_at;
      }
      if (log.created_at > acc[log.user_id].lastOccurrence) {
        acc[log.user_id].lastOccurrence = log.created_at;
      }
      return acc;
    }, {} as Record<string, any>);

    return Object.values(grouped).sort((a: any, b: any) => b.count - a.count);
  }

  // Get resource history
  async getResourceHistory(
    resourceType: string,
    resourceId: string
  ): Promise<ActivityLog[]> {
    const { data, error } = await this.client
      .from('activity_logs')
      .select('*')
      .eq('resource_type', resourceType)
      .eq('resource_id', resourceId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  }

  // Get activity by severity
  async getBySeverity(
    severity: 'info' | 'warning' | 'error' | 'critical',
    startDate: string,
    endDate: string,
    limit: number = 100
  ): Promise<ActivityLog[]> {
    const { data, error } = await this.client
      .from('activity_logs')
      .select('*')
      .eq('severity', severity)
      .gte('created_at', startDate)
      .lte('created_at', endDate)
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) throw error;
    return data || [];
  }

  // Cleanup old logs (for manual execution or cron job)
  async cleanupOldLogs(daysOld: number = 90): Promise<number> {
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - daysOld);

    const { data, error } = await this.client
      .from('activity_logs')
      .delete()
      .lt('created_at', cutoffDate.toISOString())
      .select();

    if (error) throw error;
    return data?.length || 0;
  }
}

export const activityLogService = new ActivityLogService();
