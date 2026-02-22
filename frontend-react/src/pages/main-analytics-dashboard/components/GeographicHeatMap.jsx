import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const GeographicHeatMap = ({ regions, loading }) => {
  const [selectedRegion, setSelectedRegion] = useState(null);

  const getIntensityColor = (value, max) => {
    const intensity = value / max;
    if (intensity > 0.7) return 'bg-primary';
    if (intensity > 0.4) return 'bg-primary/70';
    if (intensity > 0.2) return 'bg-primary/40';
    return 'bg-primary/20';
  };

  const maxValue = Math.max(...regions?.map(r => r?.hackathons));

  if (loading) {
    return (
      <div className="w-full h-64 md:h-80 lg:h-96">
        <div className="skeleton-shimmer w-full h-full rounded-lg" />
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
        {regions?.map((region) => (
          <div
            key={region?.id}
            className={`card cursor-pointer transition-spring hover:scale-105 ${
              selectedRegion?.id === region?.id ? 'ring-2 ring-primary' : ''
            }`}
            onClick={() => setSelectedRegion(region)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e?.key === 'Enter' || e?.key === ' ') {
                e?.preventDefault();
                setSelectedRegion(region);
              }
            }}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <h4 className="font-medium text-foreground mb-1">{region?.name}</h4>
                <p className="caption text-muted-foreground">{region?.country}</p>
              </div>
              <div
                className={`w-12 h-12 rounded-lg flex items-center justify-center ${getIntensityColor(
                  region?.hackathons,
                  maxValue
                )}`}
              >
                <Icon name="MapPin" size={20} color="var(--color-primary-foreground)" />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="caption text-muted-foreground">Active Hackathons</span>
                <span className="text-sm font-medium data-text">{region?.hackathons}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="caption text-muted-foreground">Participants</span>
                <span className="text-sm font-medium data-text">
                  {region?.participants?.toLocaleString()}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="caption text-muted-foreground">Growth</span>
                <span
                  className={`text-sm font-medium ${
                    region?.growth >= 0 ? 'text-success' : 'text-error'
                  }`}
                >
                  {region?.growth >= 0 ? '+' : ''}
                  {region?.growth}%
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
      {selectedRegion && (
        <div className="mt-6 p-4 md:p-6 bg-muted/50 rounded-lg">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="text-lg md:text-xl font-semibold mb-1">
                {selectedRegion?.name}, {selectedRegion?.country}
              </h3>
              <p className="caption text-muted-foreground">Regional Analytics</p>
            </div>
            <button
              onClick={() => setSelectedRegion(null)}
              className="p-2 hover:bg-background rounded-md transition-smooth"
              aria-label="Close region details"
            >
              <Icon name="X" size={20} />
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <p className="caption text-muted-foreground mb-1">Total Events</p>
              <p className="text-xl md:text-2xl font-semibold data-text">
                {selectedRegion?.hackathons}
              </p>
            </div>
            <div>
              <p className="caption text-muted-foreground mb-1">Participants</p>
              <p className="text-xl md:text-2xl font-semibold data-text">
                {selectedRegion?.participants?.toLocaleString()}
              </p>
            </div>
            <div>
              <p className="caption text-muted-foreground mb-1">Avg. Team Size</p>
              <p className="text-xl md:text-2xl font-semibold data-text">
                {Math.round(selectedRegion?.participants / selectedRegion?.hackathons / 4)}
              </p>
            </div>
            <div>
              <p className="caption text-muted-foreground mb-1">Growth Rate</p>
              <p
                className={`text-xl md:text-2xl font-semibold ${
                  selectedRegion?.growth >= 0 ? 'text-success' : 'text-error'
                }`}
              >
                {selectedRegion?.growth >= 0 ? '+' : ''}
                {selectedRegion?.growth}%
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GeographicHeatMap;