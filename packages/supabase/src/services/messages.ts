import { supabase, createServerClient } from '../client';
import type { Message, MessageInsert, MessageUpdate, Reaction, ReadReceipt } from '../types';

export class MessageService {
  private client = supabase;

  // Use server client for admin operations
  useServerClient() {
    this.client = createServerClient();
    return this;
  }

  // Create a new message
  async create(data: MessageInsert): Promise<Message | null> {
    const { data: message, error } = await this.client
      .from('messages')
      .insert(data)
      .select()
      .single();

    if (error) throw error;
    return message;
  }

  // Get messages by conversation
  async getByConversation(
    conversationId: string,
    limit: number = 50,
    offset: number = 0
  ): Promise<Message[]> {
    const { data, error } = await this.client
      .from('messages')
      .select('*')
      .eq('conversation_id', conversationId)
      .eq('is_deleted', false)
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    if (error) throw error;
    return data || [];
  }

  // Mark message as read
  async markAsRead(messageId: string, userId: string): Promise<Message | null> {
    // First get the message
    const { data: message, error: fetchError } = await this.client
      .from('messages')
      .select('read_by')
      .eq('id', messageId)
      .single();

    if (fetchError) throw fetchError;

    const readBy = (message?.read_by as ReadReceipt[]) || [];
    const alreadyRead = readBy.some((r) => r.userId === userId);

    if (alreadyRead) return message as Message;

    // Add new read receipt
    const updatedReadBy = [...readBy, { userId, readAt: new Date().toISOString() }];

    const { data: updated, error: updateError } = await this.client
      .from('messages')
      .update({ read_by: updatedReadBy })
      .eq('id', messageId)
      .select()
      .single();

    if (updateError) throw updateError;
    return updated;
  }

  // Add reaction to message
  async addReaction(messageId: string, userId: string, emoji: string): Promise<Message | null> {
    const { data: message, error: fetchError } = await this.client
      .from('messages')
      .select('reactions')
      .eq('id', messageId)
      .single();

    if (fetchError) throw fetchError;

    let reactions = (message?.reactions as Reaction[]) || [];
    // Remove existing reaction from this user
    reactions = reactions.filter((r) => r.userId !== userId);
    // Add new reaction
    reactions.push({ userId, emoji, createdAt: new Date().toISOString() });

    const { data: updated, error: updateError } = await this.client
      .from('messages')
      .update({ reactions })
      .eq('id', messageId)
      .select()
      .single();

    if (updateError) throw updateError;
    return updated;
  }

  // Remove reaction from message
  async removeReaction(messageId: string, userId: string): Promise<Message | null> {
    const { data: message, error: fetchError } = await this.client
      .from('messages')
      .select('reactions')
      .eq('id', messageId)
      .single();

    if (fetchError) throw fetchError;

    const reactions = (message?.reactions as Reaction[]) || [];
    const filtered = reactions.filter((r) => r.userId !== userId);

    const { data: updated, error: updateError } = await this.client
      .from('messages')
      .update({ reactions: filtered })
      .eq('id', messageId)
      .select()
      .single();

    if (updateError) throw updateError;
    return updated;
  }

  // Soft delete message
  async softDelete(messageId: string): Promise<Message | null> {
    const { data, error } = await this.client
      .from('messages')
      .update({
        is_deleted: true,
        deleted_at: new Date().toISOString(),
        content: '[Message deleted]',
        attachments: [],
      })
      .eq('id', messageId)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  // Edit message
  async edit(messageId: string, content: string): Promise<Message | null> {
    const { data, error } = await this.client
      .from('messages')
      .update({
        content,
        is_edited: true,
        edited_at: new Date().toISOString(),
      })
      .eq('id', messageId)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  // Search messages in conversation
  async search(conversationId: string, query: string): Promise<Message[]> {
    const { data, error } = await this.client
      .from('messages')
      .select('*')
      .eq('conversation_id', conversationId)
      .eq('is_deleted', false)
      .textSearch('content', query)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  }
}

export const messageService = new MessageService();
