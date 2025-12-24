import { NextRequest, NextResponse } from 'next/server';
import { databases } from '@/config/databases';
import { pingDatabase } from '@/lib/pinger';
import { PingResult } from '@/types';

export async function GET() {
  const results: PingResult[] = [];
  
  for (const db of databases) {
    const url = process.env[db.urlEnvKey];
    const anonKey = process.env[db.anonKeyEnvKey];
    
    if (!url || !anonKey) {
      results.push({
        databaseId: db.id,
        databaseName: db.name,
        timestamp: new Date().toISOString(),
        success: false,
        responseTime: null,
        error: `Missing environment variables: ${db.urlEnvKey} or ${db.anonKeyEnvKey}`,
      });
      continue;
    }
    
    const result = await pingDatabase(url, anonKey, db.id, db.name);
    results.push(result);
  }
  
  return NextResponse.json({ results, timestamp: new Date().toISOString() });
}

export async function POST(request: NextRequest) {
  try {
    const { databaseId } = await request.json();
    
    const db = databases.find(d => d.id === databaseId);
    if (!db) {
      return NextResponse.json({ error: 'Database not found' }, { status: 404 });
    }
    
    const url = process.env[db.urlEnvKey];
    const anonKey = process.env[db.anonKeyEnvKey];
    
    if (!url || !anonKey) {
      return NextResponse.json({
        databaseId: db.id,
        databaseName: db.name,
        timestamp: new Date().toISOString(),
        success: false,
        responseTime: null,
        error: `Missing environment variables`,
      });
    }
    
    const result = await pingDatabase(url, anonKey, db.id, db.name);
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}
