import { NextResponse } from 'next/server';
import { databases } from '@/config/databases';

export async function GET() {
  return NextResponse.json({ 
    databases: databases.map(db => ({
      id: db.id,
      name: db.name,
    }))
  });
}
