'use client';

import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { PingResult } from '@/types';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface PingChartProps {
  history: PingResult[];
  databaseName: string;
}

export default function PingChart({ history, databaseName }: PingChartProps) {
  const sortedHistory = [...history]
    .sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime())
    .slice(-30);

  const data = {
    labels: sortedHistory.map(r => 
      format(new Date(r.timestamp), 'dd/MM HH:mm', { locale: fr })
    ),
    datasets: [
      {
        label: 'Temps de reponse (ms)',
        data: sortedHistory.map(r => r.responseTime || 0),
        borderColor: '#111827',
        backgroundColor: 'rgba(17, 24, 39, 0.1)',
        fill: true,
        tension: 0.3,
        pointRadius: 4,
        pointBackgroundColor: sortedHistory.map(r => 
          r.success ? '#22c55e' : '#ef4444'
        ),
        pointBorderColor: sortedHistory.map(r => 
          r.success ? '#22c55e' : '#ef4444'
        ),
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: databaseName,
        font: {
          size: 14,
          weight: 'normal' as const,
        },
        color: '#111827',
      },
      tooltip: {
        callbacks: {
          afterLabel: (context: { dataIndex: number }) => {
            const result = sortedHistory[context.dataIndex];
            return result.success ? 'Succes' : `Erreur: ${result.error}`;
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'ms',
          color: '#6b7280',
        },
        grid: {
          color: '#f3f4f6',
        },
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          maxRotation: 45,
          minRotation: 45,
        },
      },
    },
  };

  if (sortedHistory.length === 0) {
    return (
      <div className="bg-white border border-gray-200 p-6 h-64 flex items-center justify-center">
        <p className="text-gray-500">Aucune donnee pour {databaseName}</p>
      </div>
    );
  }

  return (
    <div className="bg-white border border-gray-200 p-6">
      <div className="h-64">
        <Line data={data} options={options} />
      </div>
    </div>
  );
}
