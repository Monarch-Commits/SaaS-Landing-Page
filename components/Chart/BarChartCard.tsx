'use client';

import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const data = [
  { name: 'Mon', tasks: 12 },
  { name: 'Tue', tasks: 18 },
  { name: 'Wed', tasks: 9 },
  { name: 'Thu', tasks: 22 },
  { name: 'Fri', tasks: 15 },
  { name: 'Sat', tasks: 28 },
  { name: 'Sun', tasks: 20 },
];

function BarChartCard() {
  return (
    <div className="border-border bg-card/50 w-full rounded-2xl border p-5 shadow-sm backdrop-blur">
      {/* HEADER */}
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h3 className="font-medium">Task Activity</h3>
          <p className="text-muted-foreground text-xs">Weekly distribution</p>
        </div>

        <div className="text-muted-foreground text-xs">Live data</div>
      </div>

      {/* CHART */}
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: '#9ca3af' }}
            />

            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: '#9ca3af' }}
            />

            <Tooltip
              cursor={{ fill: 'rgba(59,130,246,0.1)' }}
              contentStyle={{
                backgroundColor: '#0f172a',
                border: '1px solid #1f2937',
                borderRadius: 10,
                fontSize: 12,
                color: '#fff',
              }}
            />

            <Bar dataKey="tasks" fill="#22c55e" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default React.memo(BarChartCard);
