import React from 'react';
import Icon from '../../../components/AppIcon';

const FinancialKPICard = ({ title, value, change, changeType, icon, goal, currency = 'USD' }) => {
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    })?.format(amount);
  };

  const formatPercentage = (value) => {
    return `${value > 0 ? '+' : ''}${value?.toFixed(1)}%`;
  };

  const getChangeColor = () => {
    if (changeType === 'positive') return 'text-success';
    if (changeType === 'negative') return 'text-error';
    return 'text-muted-foreground';
  };

  const getChangeIcon = () => {
    if (changeType === 'positive') return 'TrendingUp';
    if (changeType === 'negative') return 'TrendingDown';
    return 'Minus';
  };

  const goalProgress = goal ? (value / goal) * 100 : null;

  return (
    <div className="card transition-smooth hover:shadow-lg">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <p className="caption text-muted-foreground mb-1">{title}</p>
          <h3 className="text-2xl md:text-3xl lg:text-4xl font-semibold data-text">
            {typeof value === 'number' && title?.toLowerCase()?.includes('donation') 
              ? formatCurrency(value)
              : typeof value === 'number' && title?.toLowerCase()?.includes('rate')
              ? `${value?.toFixed(1)}%`
              : value}
          </h3>
        </div>
        <div className="w-10 h-10 md:w-12 md:h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
          <Icon name={icon} size={20} color="var(--color-primary)" />
        </div>
      </div>
      <div className="flex items-center gap-2 mb-3">
        <div className={`flex items-center gap-1 caption ${getChangeColor()}`}>
          <Icon name={getChangeIcon()} size={14} />
          <span className="font-medium">{formatPercentage(change)}</span>
        </div>
        <span className="caption text-muted-foreground">vs last period</span>
      </div>
      {goal && (
        <div className="space-y-2">
          <div className="flex items-center justify-between caption text-muted-foreground">
            <span>Goal Progress</span>
            <span className="font-medium">{goalProgress?.toFixed(0)}%</span>
          </div>
          <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
            <div 
              className="h-full bg-primary transition-all duration-500 rounded-full"
              style={{ width: `${Math.min(goalProgress, 100)}%` }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default FinancialKPICard;