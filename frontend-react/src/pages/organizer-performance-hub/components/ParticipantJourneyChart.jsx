import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Icon from '../../../components/AppIcon';

const ParticipantJourneyChart = ({ data, onStageClick }) => {
  const [selectedStage, setSelectedStage] = useState(null);

  const handleStageClick = (stage) => {
    setSelectedStage(stage);
    if (onStageClick) {
      onStageClick(stage);
    }
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
      return (
        <div className="bg-card border border-border rounded-lg p-4 shadow-lg">
          <p className="font-medium mb-2">{label}</p>
          {payload?.map((entry, index) => (
            <div key={index} className="flex items-center gap-2 text-sm">
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: entry?.color }}
              />
              <span className="text-muted-foreground">{entry?.name}:</span>
              <span className="font-medium data-text">{entry?.value}</span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg md:text-xl font-semibold mb-1">Participant Journey</h3>
          <p className="text-sm text-muted-foreground caption">
            Track conversion through each stage
          </p>
        </div>
        <button
          onClick={() => setSelectedStage(null)}
          className="p-2 hover:bg-muted rounded-md transition-smooth"
          aria-label="Reset view"
        >
          <Icon name="RotateCcw" size={20} />
        </button>
      </div>
      <div className="w-full h-80 md:h-96" aria-label="Participant Journey Line Chart">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis 
              dataKey="stage" 
              stroke="var(--color-muted-foreground)"
              style={{ fontSize: '12px' }}
            />
            <YAxis 
              stroke="var(--color-muted-foreground)"
              style={{ fontSize: '12px' }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend 
              wrapperStyle={{ fontSize: '12px' }}
              iconType="circle"
            />
            <Line 
              type="monotone" 
              dataKey="participants" 
              stroke="var(--color-primary)" 
              strokeWidth={3}
              dot={{ fill: 'var(--color-primary)', r: 5 }}
              activeDot={{ r: 7, onClick: (e, payload) => handleStageClick(payload) }}
              name="Participants"
            />
            <Line 
              type="monotone" 
              dataKey="completed" 
              stroke="var(--color-success)" 
              strokeWidth={3}
              dot={{ fill: 'var(--color-success)', r: 5 }}
              activeDot={{ r: 7 }}
              name="Completed"
            />
            <Line 
              type="monotone" 
              dataKey="dropped" 
              stroke="var(--color-error)" 
              strokeWidth={2}
              strokeDasharray="5 5"
              dot={{ fill: 'var(--color-error)', r: 4 }}
              name="Dropped"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      {selectedStage && (
        <div className="mt-6 p-4 bg-muted rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-medium">Stage Details: {selectedStage?.stage}</h4>
            <button
              onClick={() => setSelectedStage(null)}
              className="p-1 hover:bg-background rounded transition-smooth"
            >
              <Icon name="X" size={16} />
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div>
              <span className="text-muted-foreground">Participants:</span>
              <span className="ml-2 font-medium data-text">{selectedStage?.participants}</span>
            </div>
            <div>
              <span className="text-muted-foreground">Completed:</span>
              <span className="ml-2 font-medium data-text">{selectedStage?.completed}</span>
            </div>
            <div>
              <span className="text-muted-foreground">Conversion:</span>
              <span className="ml-2 font-medium data-text">
                {((selectedStage?.completed / selectedStage?.participants) * 100)?.toFixed(1)}%
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ParticipantJourneyChart;