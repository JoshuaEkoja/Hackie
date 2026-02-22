import React from 'react';
import Icon from '../../../components/AppIcon';

const MetricsCard = ({ 
  title, 
  value, 
  change, 
  changeType, 
  icon, 
  trend,
  threshold = 'green'
}) => {
  const getThresholdColor = () => {
    switch(threshold) {
      case 'green':
        return 'text-success bg-success/10';
      case 'amber':
        return 'text-warning bg-warning/10';
      case 'red':
        return 'text-error bg-error/10';
      default:
        return 'text-success bg-success/10';
    }
  };

  const getTrendIcon = () => {
    if (changeType === 'increase') return 'TrendingUp';
    if (changeType === 'decrease') return 'TrendingDown';
    return 'Minus';
  };

  return (
    <div className="card transition-smooth hover:shadow-lg">
      <div className="flex items-start justify-between mb-4">
        <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${getThresholdColor()}`}>
          <Icon name={icon} size={24} />
        </div>
        <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
          changeType === 'increase' ? 'bg-success/10 text-success' :
          changeType === 'decrease'? 'bg-error/10 text-error' : 'bg-muted text-muted-foreground'
        }`}>
          <Icon name={getTrendIcon()} size={14} />
          <span>{change}</span>
        </div>
      </div>
      
      <h3 className="text-sm text-muted-foreground mb-2 caption">{title}</h3>
      <p className="text-3xl md:text-4xl font-semibold mb-2 data-text">{value}</p>
      
      {trend && (
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Icon name="Activity" size={14} />
          <span>{trend}</span>
        </div>
      )}
    </div>
  );
};

export default MetricsCard;