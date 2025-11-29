import { supabase, createServerClient } from '../client';
import type { AILog, AILogInsert, AILogUpdate } from '../types';

export class AILogService {
  private client = supabase;

  useServerClient() {
    this.client = createServerClient();
    return this;
  }

  // Create a new AI log
  async create(data: AILogInsert): Promise<AILog | null> {
    const { data: log, error } = await this.client
      .from('ai_logs')
      .insert(data)
      .select()
      .single();

    if (error) throw error;
    return log;
  }

  // Update AI log status
  async updateStatus(
    logId: string,
    status: 'pending' | 'processing' | 'completed' | 'failed',
    error?: string
  ): Promise<AILog | null> {
    const updateData: AILogUpdate = { status };
    if (error) {
      updateData.error = error;
    }

    const { data, error: updateError } = await this.client
      .from('ai_logs')
      .update(updateData)
      .eq('id', logId)
      .select()
      .single();

    if (updateError) throw updateError;
    return data;
  }

  // Get user usage stats
  async getUserUsageStats(
    userId: string,
    startDate: string,
    endDate: string
  ): Promise<
    Array<{
      toolName: string;
      usageCount: number;
      totalTokens: number;
      totalCost: number;
      totalCredits: number;
      avgExecutionTime: number;
    }>
  > {
    const { data, error } = await this.client.rpc('get_user_ai_usage_stats', {
      p_user_id: userId,
      p_start_date: startDate,
      p_end_date: endDate,
    });

    if (error) throw error;
    return data || [];
  }

  // Get user logs
  async getUserLogs(
    userId: string,
    options: {
      toolName?: string;
      status?: 'pending' | 'processing' | 'completed' | 'failed';
      limit?: number;
      offset?: number;
    } = {}
  ): Promise<AILog[]> {
    const { toolName, status, limit = 50, offset = 0 } = options;

    let query = this.client
      .from('ai_logs')
      .select('*')
      .eq('user_id', userId);

    if (toolName) {
      query = query.eq('tool_name', toolName);
    }

    if (status) {
      query = query.eq('status', status);
    }

    const { data, error } = await query
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    if (error) throw error;
    return data || [];
  }

  // Get tool usage stats (across all users)
  async getToolUsageStats(
    toolName: string,
    startDate: string,
    endDate: string
  ): Promise<{
    count: number;
    totalTokens: number;
    totalCost: number;
    avgExecutionTime: number;
    uniqueUsers: string[];
  }> {
    const { data, error } = await this.client
      .from('ai_logs')
      .select('user_id, total_tokens, total_cost, execution_time_ms')
      .eq('tool_name', toolName)
      .eq('status', 'completed')
      .gte('created_at', startDate)
      .lte('created_at', endDate);

    if (error) throw error;
    if (!data) {
      return {
        count: 0,
        totalTokens: 0,
        totalCost: 0,
        avgExecutionTime: 0,
        uniqueUsers: [],
      };
    }

    const uniqueUsers = Array.from(new Set(data.map((log) => log.user_id)));
    const totalTokens = data.reduce((sum, log) => sum + (log.total_tokens || 0), 0);
    const totalCost = data.reduce((sum, log) => sum + (log.total_cost || 0), 0);
    const avgExecutionTime =
      data.reduce((sum, log) => sum + (log.execution_time_ms || 0), 0) / data.length || 0;

    return {
      count: data.length,
      totalTokens,
      totalCost,
      avgExecutionTime,
      uniqueUsers,
    };
  }

  // Get failed logs
  async getFailedLogs(
    userId?: string,
    startDate?: string,
    endDate?: string,
    limit: number = 50
  ): Promise<AILog[]> {
    let query = this.client
      .from('ai_logs')
      .select('*')
      .eq('status', 'failed');

    if (userId) {
      query = query.eq('user_id', userId);
    }

    if (startDate) {
      query = query.gte('created_at', startDate);
    }

    if (endDate) {
      query = query.lte('created_at', endDate);
    }

    const { data, error } = await query
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) throw error;
    return data || [];
  }

  // Get total cost by user
  async getTotalCostByUser(
    userId: string,
    startDate: string,
    endDate: string
  ): Promise<{ totalCost: number; totalCredits: number }> {
    const { data, error } = await this.client
      .from('ai_logs')
      .select('total_cost, credits_charged')
      .eq('user_id', userId)
      .eq('status', 'completed')
      .gte('created_at', startDate)
      .lte('created_at', endDate);

    if (error) throw error;
    if (!data) return { totalCost: 0, totalCredits: 0 };

    const totalCost = data.reduce((sum, log) => sum + (log.total_cost || 0), 0);
    const totalCredits = data.reduce((sum, log) => sum + (log.credits_charged || 0), 0);

    return { totalCost, totalCredits };
  }

  // Get usage trends (daily aggregation)
  async getUsageTrends(
    userId: string,
    days: number = 30
  ): Promise<
    Array<{
      date: string;
      count: number;
      totalTokens: number;
      totalCost: number;
    }>
  > {
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    const { data, error } = await this.client
      .from('ai_logs')
      .select('created_at, total_tokens, total_cost')
      .eq('user_id', userId)
      .eq('status', 'completed')
      .gte('created_at', startDate.toISOString())
      .lte('created_at', endDate.toISOString());

    if (error) throw error;
    if (!data) return [];

    // Group by date
    const grouped = data.reduce((acc, log) => {
      const date = log.created_at.split('T')[0];
      if (!acc[date]) {
        acc[date] = { date, count: 0, totalTokens: 0, totalCost: 0 };
      }
      acc[date].count++;
      acc[date].totalTokens += log.total_tokens || 0;
      acc[date].totalCost += log.total_cost || 0;
      return acc;
    }, {} as Record<string, any>);

    return Object.values(grouped).sort((a: any, b: any) => a.date.localeCompare(b.date));
  }
}

export const aiLogService = new AILogService();
