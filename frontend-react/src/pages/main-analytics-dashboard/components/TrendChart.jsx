import React from 'react';
import { Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ComposedChart, Area } from 'recharts';

const TrendChart = ({ data, loading }) => {
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
      return (
        <div className="bg-card border border-border rounded-lg p-3 shadow-lg">
          <p className="caption text-muted-foreground mb-2">{label}</p>
          {payload?.map((entry, index) => (
            <div key={index} className="flex items-center gap-2 mb-1">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: entry?.color }}
              />
              <span className="text-sm font-medium">{entry?.name}:</span>
              <span className="text-sm data-text">{entry?.value?.toLocaleString()}</span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  if (loading) {
    return (
      <div className="w-full h-64 md:h-80 lg:h-96 flex items-center justify-center">
        <div className="skeleton-shimmer w-full h-full rounded-lg" />
      </div>
    );
  }

  return (
    <div className="w-full h-64 md:h-80 lg:h-96" aria-label="Hackathon Discovery and Registration Trends">
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="discoveryGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="var(--color-primary)" stopOpacity={0.3} />
              <stop offset="95%" stopColor="var(--color-primary)" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
          <XAxis
            dataKey="date"
            stroke="var(--color-muted-foreground)"
            style={{ fontSize: '12px', fontFamily: 'var(--font-caption)' }}
          />
          <YAxis
            stroke="var(--color-muted-foreground)"
            style={{ fontSize: '12px', fontFamily: 'var(--font-data)' }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend
            wrapperStyle={{ fontSize: '12px', fontFamily: 'var(--font-caption)' }}
          />
          <Area
            type="monotone"
            dataKey="discoveries"
            fill="url(#discoveryGradient)"
            stroke="var(--color-primary)"
            strokeWidth={2}
            name="Discoveries"
          />
          <Bar
            dataKey="registrations"
            fill="var(--color-accent)"
            name="Registrations"
            radius={[4, 4, 0, 0]}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TrendChart;