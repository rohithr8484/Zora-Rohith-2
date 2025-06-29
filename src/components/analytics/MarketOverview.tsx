import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

const data = [
  { name: 'Art', value: 35, color: '#8B5CF6' },
  { name: 'Music', value: 25, color: '#14B8A6' },
  { name: 'Writing', value: 20, color: '#F59E0B' },
  { name: 'Photography', value: 15, color: '#EF4444' },
  { name: 'Other', value: 5, color: '#6B7280' },
];

export function MarketOverview() {
  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={100}
            paddingAngle={5}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              backgroundColor: '#1F2937',
              border: '1px solid #374151',
              borderRadius: '8px',
              color: '#F9FAFB'
            }}
          />
        </PieChart>
      </ResponsiveContainer>
      <div className="grid grid-cols-2 gap-2 mt-4">
        {data.map((entry) => (
          <div key={entry.name} className="flex items-center space-x-2">
            <div 
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: entry.color }}
            />
            <span className="text-sm text-slate-300">{entry.name}</span>
            <span className="text-sm text-slate-400">{entry.value}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}