'use client';

import { PingResult } from '@/types';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

interface DatabaseCardProps {
  name: string;
  id: string;
  lastPing: PingResult | null;
  onPing: () => void;
  isPinging: boolean;
}

export default function DatabaseCard({ name, id, lastPing, onPing, isPinging }: DatabaseCardProps) {
  const getStatusColor = () => {
    if (!lastPing) return 'bg-gray-200';
    return lastPing.success ? 'bg-green-500' : 'bg-red-500';
  };

  const getStatusText = () => {
    if (!lastPing) return 'Aucun ping';
    return lastPing.success ? 'Actif' : 'Erreur';
  };

  return (
    <div className="bg-white border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">{name}</h3>
        <div className={`w-3 h-3 ${getStatusColor()}`} />
      </div>
      
      <div className="space-y-2 mb-4">
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Statut</span>
          <span className={lastPing?.success ? 'text-green-600' : 'text-gray-600'}>
            {getStatusText()}
          </span>
        </div>
        
        {lastPing && (
          <>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Dernier ping</span>
              <span className="text-gray-900">
                {format(new Date(lastPing.timestamp), 'dd MMM HH:mm', { locale: fr })}
              </span>
            </div>
            
            {lastPing.responseTime && (
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Temps de reponse</span>
                <span className="text-gray-900">{lastPing.responseTime}ms</span>
              </div>
            )}
            
            {lastPing.error && (
              <div className="text-sm text-red-600 mt-2">
                {lastPing.error}
              </div>
            )}
          </>
        )}
      </div>
      
      <button
        onClick={onPing}
        disabled={isPinging}
        className="w-full py-2 px-4 bg-gray-900 text-white text-sm font-medium hover:bg-gray-800 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
      >
        {isPinging ? 'Ping en cours...' : 'Ping maintenant'}
      </button>
    </div>
  );
}
