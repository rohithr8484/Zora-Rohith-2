import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { date: '2024-01-01', volume: 45000 },
  { date: '2024-01-02', volume: 52000 },
  { date: '2024-01-03', volume: 38000 },
  { date: '2024-01-04', volume: 67000 },
  { date: '2024-01-05', volume: 71000 },
  { date: '2024-01-06', volume: 59000 },
  { date: '2024-01-07', volume: 85000 },
];

export function VolumeChart() {
  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
          <XAxis dataKey="date" stroke="#9CA3AF" />
          <YAxis stroke="#9CA3AF" />
          <Tooltip
            contentStyle={{
              backgroundColor: '#1F2937',
              border: '1px solid #374151',
              borderRadius: '8px',
              color: '#F9FAFB'
            }}
          />
          <Bar dataKey="volume" fill="#8B5CF6" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}