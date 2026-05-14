'use client';

import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const chartData = [
  { name: 'Mon', value: 40 },
  { name: 'Tue', value: 65 },
  { name: 'Wed', value: 45 },
  { name: 'Thu', value: 80 },
  { name: 'Fri', value: 55 },
  { name: 'Sat', value: 90 },
  { name: 'Sun', value: 75 },
];

function ChartComponent() {
  return (
    <div className="border-border bg-muted/30 rounded-xl border p-4 sm:p-6">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="font-medium">Workflow Performance</h3>
        <span className="text-muted-foreground text-xs">Last 7 days</span>
      </div>

      {/* SCROLL WRAPPER FOR MOBILE */}
      <div className="w-full overflow-x-auto">
        {/* FIX MIN WIDTH FOR SCROLL EFFECT */}
        <div className="h-[260px] min-w-[500px] sm:min-w-0">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="flow" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.35} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                </linearGradient>
              </defs>

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
                contentStyle={{
                  backgroundColor: '#0f172a',
                  border: '1px solid #1f2937',
                  borderRadius: 10,
                  fontSize: 12,
                  color: '#fff',
                }}
              />

              <Area
                type="monotone"
                dataKey="value"
                stroke="#3b82f6"
                strokeWidth={2}
                fill="url(#flow)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default React.memo(ChartComponent);
