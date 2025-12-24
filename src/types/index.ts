export interface PingResult {
  databaseId: string;
  databaseName: string;
  timestamp: string;
  success: boolean;
  responseTime: number | null;
  error: string | null;
}

export interface PingHistory {
  results: PingResult[];
}

export interface DatabaseStatus {
  id: string;
  name: string;
  lastPing: PingResult | null;
  pingHistory: PingResult[];
}
