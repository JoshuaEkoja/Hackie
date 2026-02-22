import React from 'react';
import Icon from '../../../components/AppIcon';

const DonationFunnelVisualization = ({ funnelData, currency = 'USD' }) => {
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
      notation: 'compact',
      compactDisplay: 'short'
    })?.format(amount);
  };

  const formatNumber = (num) => {
    return new Intl.NumberFormat('en-US', {
      notation: 'compact',
      compactDisplay: 'short'
    })?.format(num);
  };

  const calculateDropoff = (current, previous) => {
    if (!previous) return 0;
    return ((previous - current) / previous * 100)?.toFixed(1);
  };

  const getStageColor = (index) => {
    const colors = [
      'bg-blue-500',
      'bg-green-500',
      'bg-yellow-500',
      'bg-orange-500',
      'bg-primary'
    ];
    return colors?.[index] || 'bg-primary';
  };

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl md:text-2xl font-semibold mb-1">Donation Funnel</h3>
          <p className="caption text-muted-foreground">Conversion tracking from intent to completion</p>
        </div>
        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
          <Icon name="Filter" size={20} color="var(--color-primary)" />
        </div>
      </div>
      <div className="space-y-4">
        {funnelData?.map((stage, index) => {
          const widthPercentage = (stage?.count / funnelData?.[0]?.count) * 100;
          const dropoff = calculateDropoff(stage?.count, funnelData?.[index - 1]?.count);
          
          return (
            <div key={stage?.id} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 ${getStageColor(index)} rounded-lg flex items-center justify-center`}>
                    <Icon name={stage?.icon} size={16} color="#FFFFFF" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">{stage?.name}</p>
                    <p className="caption text-muted-foreground">{stage?.description}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold data-text">{formatNumber(stage?.count)}</p>
                  <p className="caption text-muted-foreground">{formatCurrency(stage?.value)}</p>
                </div>
              </div>
              <div className="relative">
                <div className="w-full h-12 bg-muted rounded-lg overflow-hidden">
                  <div 
                    className={`h-full ${getStageColor(index)} transition-all duration-500 flex items-center justify-center`}
                    style={{ width: `${widthPercentage}%` }}
                  >
                    <span className="text-white font-medium text-sm">
                      {stage?.conversionRate}%
                    </span>
                  </div>
                </div>
              </div>
              {index < funnelData?.length - 1 && dropoff > 0 && (
                <div className="flex items-center gap-2 pl-11">
                  <Icon name="AlertTriangle" size={14} color="var(--color-warning)" />
                  <span className="caption text-warning">
                    {dropoff}% drop-off to next stage
                  </span>
                </div>
              )}
            </div>
          );
        })}
      </div>
      <div className="mt-6 pt-6 border-t border-border">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-muted/50 rounded-lg">
            <p className="caption text-muted-foreground mb-1">Overall Conversion</p>
            <p className="text-2xl font-semibold data-text text-success">
              {((funnelData?.[funnelData?.length - 1]?.count / funnelData?.[0]?.count) * 100)?.toFixed(1)}%
            </p>
          </div>
          <div className="text-center p-4 bg-muted/50 rounded-lg">
            <p className="caption text-muted-foreground mb-1">Avg. Donation</p>
            <p className="text-2xl font-semibold data-text">
              {formatCurrency(funnelData?.[funnelData?.length - 1]?.value / funnelData?.[funnelData?.length - 1]?.count)}
            </p>
          </div>
          <div className="text-center p-4 bg-muted/50 rounded-lg">
            <p className="caption text-muted-foreground mb-1">Abandonment Rate</p>
            <p className="text-2xl font-semibold data-text text-error">
              {(100 - ((funnelData?.[funnelData?.length - 1]?.count / funnelData?.[0]?.count) * 100))?.toFixed(1)}%
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonationFunnelVisualization;