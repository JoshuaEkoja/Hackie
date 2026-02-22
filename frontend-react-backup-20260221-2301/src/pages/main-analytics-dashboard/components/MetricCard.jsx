import React from 'react';
import Icon from '../../../components/AppIcon';

const MetricCard = ({ title, value, change, changeType, icon, trend, loading }) => {
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

  return (
    <div className="card transition-smooth hover:shadow-lg">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <p className="caption text-muted-foreground mb-1">{title}</p>
          {loading ? (
            <div className="skeleton h-8 w-24 mb-2" />
          ) : (
            <h3 className="text-2xl md:text-3xl lg:text-4xl font-semibold data-text mb-2">
              {value}
            </h3>
          )}
        </div>
        <div className="w-10 h-10 md:w-12 md:h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
          <Icon name={icon} size={20} color="var(--color-primary)" />
        </div>
      </div>
      <div className="flex items-center justify-between">
        <div className={`flex items-center gap-1 ${getChangeColor()}`}>
          <Icon name={getChangeIcon()} size={16} />
          <span className="text-sm font-medium">{change}</span>
        </div>
        {trend && (
          <div className="flex items-center gap-1">
            {trend?.map((point, index) => (
              <div
                key={index}
                className="w-1 bg-primary/30 rounded-full transition-smooth"
                style={{ height: `${point}px` }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MetricCard;