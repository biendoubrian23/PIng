import { PingResult } from '@/types';

const STORAGE_KEY = 'ping_history';
const MAX_HISTORY_PER_DB = 100;

export function savePingResult(result: PingResult): void {
  if (typeof window === 'undefined') return;
  
  const history = getPingHistory();
  history.push(result);
  
  // Keep only last MAX_HISTORY_PER_DB results per database
  const groupedByDb: Record<string, PingResult[]> = {};
  history.forEach(r => {
    if (!groupedByDb[r.databaseId]) {
      groupedByDb[r.databaseId] = [];
    }
    groupedByDb[r.databaseId].push(r);
  });
  
  const trimmedHistory: PingResult[] = [];
  Object.values(groupedByDb).forEach(dbResults => {
    const sorted = dbResults.sort((a, b) => 
      new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );
    trimmedHistory.push(...sorted.slice(0, MAX_HISTORY_PER_DB));
  });
  
  localStorage.setItem(STORAGE_KEY, JSON.stringify(trimmedHistory));
}

export function getPingHistory(): PingResult[] {
  if (typeof window === 'undefined') return [];
  
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) return [];
  
  try {
    return JSON.parse(stored);
  } catch {
    return [];
  }
}

export function getPingHistoryForDatabase(databaseId: string): PingResult[] {
  return getPingHistory()
    .filter(r => r.databaseId === databaseId)
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
}

export function clearHistory(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(STORAGE_KEY);
}
