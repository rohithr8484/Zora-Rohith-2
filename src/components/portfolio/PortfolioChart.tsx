import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { date: '2024-01-01', value: 1000 },
  { date: '2024-01-02', value: 1050 },
  { date: '2024-01-03', value: 980 },
  { date: '2024-01-04', value: 1120 },
  { date: '2024-01-05', value: 1200 },
  { date: '2024-01-06', value: 1180 },
  { date: '2024-01-07', value: 1248 },
];

export function PortfolioChart() {
  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
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
          <Line type="monotone" dataKey="value" stroke="#8B5CF6" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}