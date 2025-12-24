'use client';

import { PingResult } from '@/types';

interface StatsCardProps {
  history: PingResult[];
}

export default function StatsCard({ history }: StatsCardProps) {
  const totalPings = history.length;
  const successfulPings = history.filter(r => r.success).length;
  const failedPings = totalPings - successfulPings;
  const successRate = totalPings > 0 ? Math.round((successfulPings / totalPings) * 100) : 0;
  
  const avgResponseTime = history
    .filter(r => r.success && r.responseTime)
    .reduce((sum, r, _, arr) => sum + (r.responseTime! / arr.length), 0);

  const stats = [
    { label: 'Total pings', value: totalPings.toString() },
    { label: 'Succes', value: successfulPings.toString() },
    { label: 'Echecs', value: failedPings.toString() },
    { label: 'Taux de succes', value: `${successRate}%` },
    { label: 'Temps moyen', value: avgResponseTime > 0 ? `${Math.round(avgResponseTime)}ms` : '-' },
  ];

  return (
    <div className="bg-white border border-gray-200 p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Statistiques globales</h2>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {stats.map((stat) => (
          <div key={stat.label} className="text-center">
            <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
            <p className="text-sm text-gray-500">{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
