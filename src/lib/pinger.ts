import { createClient } from '@supabase/supabase-js';
import { PingResult } from '@/types';

export async function pingDatabase(
  url: string,
  anonKey: string,
  databaseId: string,
  databaseName: string
): Promise<PingResult> {
  const startTime = Date.now();
  
  try {
    const supabase = createClient(url, anonKey);
    
    // Simple query to keep the database active
    // This query doesn't require any specific table
    const { error } = await supabase.from('_dummy_ping_check').select('*').limit(1);
    
    // Even if table doesn't exist, the connection was made
    // Supabase will return an error for missing table but connection is established
    const responseTime = Date.now() - startTime;
    
    // If error is about missing table, it's still a successful ping
    // because we established connection
    if (error && !error.message.includes('does not exist') && !error.message.includes('permission denied')) {
      return {
        databaseId,
        databaseName,
        timestamp: new Date().toISOString(),
        success: false,
        responseTime: null,
        error: error.message,
      };
    }
    
    return {
      databaseId,
      databaseName,
      timestamp: new Date().toISOString(),
      success: true,
      responseTime,
      error: null,
    };
  } catch (err) {
    return {
      databaseId,
      databaseName,
      timestamp: new Date().toISOString(),
      success: false,
      responseTime: null,
      error: err instanceof Error ? err.message : 'Unknown error',
    };
  }
}
