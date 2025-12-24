'use client';

import { useState, useEffect, useCallback } from 'react';
import DatabaseCard from '@/components/DatabaseCard';
import PingChart from '@/components/PingChart';
import PingHistoryTable from '@/components/PingHistoryTable';
import StatsCard from '@/components/StatsCard';
import { PingResult } from '@/types';
import { savePingResult, getPingHistory, getPingHistoryForDatabase, clearHistory } from '@/lib/storage';

interface Database {
  id: string;
  name: string;
}

export default function Home() {
  const [databases, setDatabases] = useState<Database[]>([]);
  const [history, setHistory] = useState<PingResult[]>([]);
  const [pingingDatabases, setPingingDatabases] = useState<Set<string>>(new Set());
  const [isPingingAll, setIsPingingAll] = useState(false);
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);

  useEffect(() => {
    fetch('/api/databases')
      .then(res => res.json())
      .then(data => setDatabases(data.databases))
      .catch(console.error);
    
    setHistory(getPingHistory());
  }, []);

  const pingDatabase = useCallback(async (databaseId: string) => {
    setPingingDatabases(prev => new Set(prev).add(databaseId));
    
    try {
      const res = await fetch('/api/ping', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ databaseId }),
      });
      
      const result: PingResult = await res.json();
      savePingResult(result);
      setHistory(getPingHistory());
      setLastUpdate(new Date());
    } catch (error) {
      console.error('Ping failed:', error);
    } finally {
      setPingingDatabases(prev => {
        const next = new Set(prev);
        next.delete(databaseId);
        return next;
      });
    }
  }, []);

  const pingAllDatabases = useCallback(async () => {
    setIsPingingAll(true);
    
    try {
      const res = await fetch('/api/ping');
      const data = await res.json();
      
      data.results.forEach((result: PingResult) => {
        savePingResult(result);
      });
      
      setHistory(getPingHistory());
      setLastUpdate(new Date());
    } catch (error) {
      console.error('Ping all failed:', error);
    } finally {
      setIsPingingAll(false);
    }
  }, []);

  const handleClearHistory = useCallback(() => {
    if (confirm('Effacer tout l\'historique ?')) {
      clearHistory();
      setHistory([]);
    }
  }, []);

  const getLastPingForDatabase = (databaseId: string): PingResult | null => {
    const dbHistory = getPingHistoryForDatabase(databaseId);
    return dbHistory.length > 0 ? dbHistory[0] : null;
  };

  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <header className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold text-gray-900">Database Pinger</h1>
            <div className="flex gap-4">
              <button
                onClick={handleClearHistory}
                className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900 border border-gray-200 hover:border-gray-300 transition-colors"
              >
                Effacer historique
              </button>
              <button
                onClick={pingAllDatabases}
                disabled={isPingingAll}
                className="px-4 py-2 text-sm bg-gray-900 text-white hover:bg-gray-800 disabled:bg-gray-400 transition-colors"
              >
                {isPingingAll ? 'Ping en cours...' : 'Ping toutes les bases'}
              </button>
            </div>
          </div>
          {lastUpdate && (
            <p className="text-sm text-gray-500">
              Derniere mise a jour: {lastUpdate.toLocaleString('fr-FR')}
            </p>
          )}
        </header>

        <section className="mb-8">
          <StatsCard history={history} />
        </section>

        <section className="mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Bases de donnees</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {databases.map(db => (
              <DatabaseCard
                key={db.id}
                id={db.id}
                name={db.name}
                lastPing={getLastPingForDatabase(db.id)}
                onPing={() => pingDatabase(db.id)}
                isPinging={pingingDatabases.has(db.id)}
              />
            ))}
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Graphiques de performance</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {databases.map(db => (
              <PingChart
                key={db.id}
                databaseName={db.name}
                history={history.filter(r => r.databaseId === db.id)}
              />
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Historique des pings</h2>
          <PingHistoryTable history={history} />
        </section>
      </div>
    </main>
  );
}
