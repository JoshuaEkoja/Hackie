import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const FraudDetectionAlerts = ({ alerts }) => {
  const [filter, setFilter] = useState('all');

  const getSeverityConfig = (severity) => {
    const configs = {
      critical: {
        icon: 'AlertOctagon',
        color: 'text-error',
        bg: 'bg-error/10',
        border: 'border-error/30',
        label: 'Critical'
      },
      high: {
        icon: 'AlertTriangle',
        color: 'text-warning',
        bg: 'bg-warning/10',
        border: 'border-warning/30',
        label: 'High'
      },
      medium: {
        icon: 'AlertCircle',
        color: 'text-yellow-600',
        bg: 'bg-yellow-600/10',
        border: 'border-yellow-600/30',
        label: 'Medium'
      },
      low: {
        icon: 'Info',
        color: 'text-blue-600',
        bg: 'bg-blue-600/10',
        border: 'border-blue-600/30',
        label: 'Low'
      }
    };
    return configs?.[severity] || configs?.low;
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date?.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const filteredAlerts = filter === 'all' 
    ? alerts 
    : alerts?.filter(alert => alert?.severity === filter);

  const severityCounts = {
    critical: alerts?.filter(a => a?.severity === 'critical')?.length,
    high: alerts?.filter(a => a?.severity === 'high')?.length,
    medium: alerts?.filter(a => a?.severity === 'medium')?.length,
    low: alerts?.filter(a => a?.severity === 'low')?.length
  };

  return (
    <div className="card">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
        <div>
          <h3 className="text-xl md:text-2xl font-semibold mb-1">Fraud Detection Alerts</h3>
          <p className="caption text-muted-foreground">Real-time suspicious pattern monitoring</p>
        </div>

        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-error animate-pulse" />
          <span className="caption text-error font-medium">
            {severityCounts?.critical} Critical
          </span>
        </div>
      </div>
      <div className="flex flex-wrap items-center gap-2 mb-6">
        <Button
          variant={filter === 'all' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setFilter('all')}
        >
          All ({alerts?.length})
        </Button>
        <Button
          variant={filter === 'critical' ? 'destructive' : 'outline'}
          size="sm"
          onClick={() => setFilter('critical')}
        >
          Critical ({severityCounts?.critical})
        </Button>
        <Button
          variant={filter === 'high' ? 'warning' : 'outline'}
          size="sm"
          onClick={() => setFilter('high')}
        >
          High ({severityCounts?.high})
        </Button>
        <Button
          variant={filter === 'medium' ? 'outline' : 'outline'}
          size="sm"
          onClick={() => setFilter('medium')}
        >
          Medium ({severityCounts?.medium})
        </Button>
        <Button
          variant={filter === 'low' ? 'outline' : 'outline'}
          size="sm"
          onClick={() => setFilter('low')}
        >
          Low ({severityCounts?.low})
        </Button>
      </div>
      <div className="space-y-3 max-h-96 overflow-y-auto custom-scrollbar">
        {filteredAlerts?.length === 0 ? (
          <div className="text-center py-8">
            <Icon name="Shield" size={48} color="var(--color-muted-foreground)" className="mx-auto mb-3" />
            <p className="text-muted-foreground">No alerts for this filter</p>
          </div>
        ) : (
          filteredAlerts?.map((alert) => {
            const config = getSeverityConfig(alert?.severity);
            return (
              <div 
                key={alert?.id}
                className={`p-4 rounded-lg border-2 ${config?.border} ${config?.bg} transition-smooth hover:shadow-md cursor-pointer`}
              >
                <div className="flex items-start gap-3 mb-3">
                  <div className={`w-10 h-10 ${config?.bg} rounded-lg flex items-center justify-center flex-shrink-0 border-2 ${config?.border}`}>
                    <Icon name={config?.icon} size={20} className={config?.color} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`caption font-semibold ${config?.color}`}>
                        {config?.label}
                      </span>
                      <span className="caption text-muted-foreground">•</span>
                      <span className="caption text-muted-foreground">{formatTime(alert?.timestamp)}</span>
                    </div>
                    <p className="font-medium text-sm mb-1">{alert?.title}</p>
                    <p className="caption text-muted-foreground">{alert?.description}</p>
                  </div>
                </div>
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  {alert?.tags?.map((tag, index) => (
                    <span 
                      key={index}
                      className="px-2 py-1 bg-muted rounded-md caption text-muted-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex items-center justify-between pt-3 border-t border-border">
                  <div className="flex items-center gap-2">
                    <Icon name="MapPin" size={14} color="var(--color-muted-foreground)" />
                    <span className="caption text-muted-foreground">{alert?.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm" iconName="Eye">
                      Review
                    </Button>
                    <Button variant="outline" size="sm" iconName="Ban">
                      Block
                    </Button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
      {filteredAlerts?.length > 0 && (
        <button className="w-full mt-4 py-2 text-sm font-medium text-primary hover:bg-primary/5 rounded-lg transition-smooth">
          View All Alerts
        </button>
      )}
    </div>
  );
};

export default FraudDetectionAlerts;