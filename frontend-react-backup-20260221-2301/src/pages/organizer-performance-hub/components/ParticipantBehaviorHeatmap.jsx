import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const ParticipantBehaviorHeatmap = ({ data }) => {
  const [hoveredCell, setHoveredCell] = useState(null);

  const getIntensityColor = (value) => {
    if (value >= 80) return 'bg-success';
    if (value >= 60) return 'bg-primary';
    if (value >= 40) return 'bg-warning';
    if (value >= 20) return 'bg-error/60';
    return 'bg-muted';
  };

  const getIntensityOpacity = (value) => {
    return `opacity-${Math.min(100, Math.max(20, value))}`;
  };

  return (
    <div className="card">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <h3 className="text-lg md:text-xl font-semibold mb-1">Engagement Heatmap</h3>
          <p className="text-sm text-muted-foreground caption">
            Participant activity across event timeline
          </p>
        </div>
        <div className="flex items-center gap-4 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-muted rounded" />
            <span className="text-muted-foreground">Low</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-warning rounded" />
            <span className="text-muted-foreground">Medium</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-success rounded" />
            <span className="text-muted-foreground">High</span>
          </div>
        </div>
      </div>
      <div className="overflow-x-auto custom-scrollbar">
        <div className="min-w-[600px]">
          <div className="grid grid-cols-8 gap-2 mb-2">
            <div className="text-xs font-medium text-muted-foreground caption">Time</div>
            {data?.days?.map((day, index) => (
              <div key={index} className="text-xs font-medium text-center caption">
                {day}
              </div>
            ))}
          </div>

          {data?.timeSlots?.map((slot, slotIndex) => (
            <div key={slotIndex} className="grid grid-cols-8 gap-2 mb-2">
              <div className="text-xs text-muted-foreground flex items-center caption">
                {slot}
              </div>
              {data?.values?.[slotIndex]?.map((value, dayIndex) => (
                <div
                  key={dayIndex}
                  className="relative"
                  onMouseEnter={() => setHoveredCell({ slot, day: data?.days?.[dayIndex], value })}
                  onMouseLeave={() => setHoveredCell(null)}
                >
                  <div 
                    className={`w-full h-12 md:h-14 rounded-md cursor-pointer transition-all duration-300 hover:scale-105 ${getIntensityColor(value)}`}
                    style={{ opacity: value / 100 }}
                  />
                  {hoveredCell?.slot === slot && hoveredCell?.day === data?.days?.[dayIndex] && (
                    <div className="absolute z-10 bottom-full left-1/2 transform -translate-x-1/2 mb-2 bg-card border border-border rounded-lg p-3 shadow-lg whitespace-nowrap">
                      <div className="text-xs font-medium mb-1">
                        {hoveredCell?.day} - {hoveredCell?.slot}
                      </div>
                      <div className="text-sm font-semibold data-text">
                        {hoveredCell?.value}% engagement
                      </div>
                      <div className="absolute top-full left-1/2 transform -translate-x-1/2 -mt-1">
                        <div className="w-2 h-2 bg-card border-r border-b border-border rotate-45" />
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className="mt-6 p-4 bg-muted/50 rounded-lg">
        <div className="flex items-start gap-3">
          <Icon name="Info" size={20} className="text-primary flex-shrink-0 mt-0.5" />
          <div className="text-sm text-muted-foreground">
            <p className="mb-2">
              <strong className="text-foreground">Peak engagement:</strong> Weekdays 2-4 PM show highest participant activity
            </p>
            <p>
              <strong className="text-foreground">Optimization tip:</strong> Schedule key announcements during high-engagement periods
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParticipantBehaviorHeatmap;