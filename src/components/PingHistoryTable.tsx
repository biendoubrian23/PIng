'use client';

import { PingResult } from '@/types';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

interface PingHistoryTableProps {
  history: PingResult[];
}

export default function PingHistoryTable({ history }: PingHistoryTableProps) {
  const sortedHistory = [...history]
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
    .slice(0, 50);

  if (sortedHistory.length === 0) {
    return (
      <div className="bg-white border border-gray-200 p-6">
        <p className="text-gray-500 text-center">Aucun historique disponible</p>
      </div>
    );
  }

  return (
    <div className="bg-white border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Base de donnees
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Statut
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Temps
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {sortedHistory.map((result, index) => (
              <tr key={`${result.databaseId}-${result.timestamp}-${index}`} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {result.databaseName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {format(new Date(result.timestamp), 'dd MMM yyyy HH:mm:ss', { locale: fr })}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex items-center px-2.5 py-0.5 text-xs font-medium ${
                    result.success 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {result.success ? 'Succes' : 'Echec'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {result.responseTime ? `${result.responseTime}ms` : '-'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
