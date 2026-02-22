import React, { useState, useEffect } from 'react';
import Icon from '../AppIcon';

const RealTimeStatusIndicator = ({ connectionStatus, lastUpdate, onManualRefresh }) => {
  const [status, setStatus] = useState(connectionStatus || 'connected');
  const [timeAgo, setTimeAgo] = useState('Just now');
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    setStatus(connectionStatus || 'connected');
  }, [connectionStatus]);

  useEffect(() => {
    if (!lastUpdate) return;

    const updateTimeAgo = () => {
      const now = new Date();
      const diff = Math.floor((now - new Date(lastUpdate)) / 1000);

      if (diff < 60) {
        setTimeAgo('Just now');
      } else if (diff < 3600) {
        const minutes = Math.floor(diff / 60);
        setTimeAgo(`${minutes}m ago`);
      } else if (diff < 86400) {
        const hours = Math.floor(diff / 3600);
        setTimeAgo(`${hours}h ago`);
      } else {
        const days = Math.floor(diff / 86400);
        setTimeAgo(`${days}d ago`);
      }
    };

    updateTimeAgo();
    const interval = setInterval(updateTimeAgo, 30000);

    return () => clearInterval(interval);
  }, [lastUpdate]);

  const handleRefresh = async () => {
    if (isRefreshing) return;
    
    setIsRefreshing(true);
    if (onManualRefresh) {
      await onManualRefresh();
    }
    setTimeout(() => setIsRefreshing(false), 1000);
  };

  const getStatusConfig = () => {
    switch (status) {
      case 'connected':
        return {
          icon: 'Wifi',
          text: 'Live',
          className: 'status-indicator connected',
          dotColor: 'bg-success'
        };
      case 'connecting':
        return {
          icon: 'WifiOff',
          text: 'Connecting',
          className: 'status-indicator connecting',
          dotColor: 'bg-warning animate-pulse'
        };
      case 'disconnected':
        return {
          icon: 'WifiOff',
          text: 'Offline',
          className: 'status-indicator disconnected',
          dotColor: 'bg-error'
        };
      default:
        return {
          icon: 'Wifi',
          text: 'Live',
          className: 'status-indicator connected',
          dotColor: 'bg-success'
        };
    }
  };

  const statusConfig = getStatusConfig();

  return (
    <div className="flex items-center gap-3">
      <div className={statusConfig?.className}>
        <div className={`w-2 h-2 rounded-full ${statusConfig?.dotColor}`} />
        <Icon name={statusConfig?.icon} size={14} />
        <span>{statusConfig?.text}</span>
      </div>
      {lastUpdate && (
        <span className="hidden lg:inline text-xs text-muted-foreground caption">
          Updated {timeAgo}
        </span>
      )}
      <button
        onClick={handleRefresh}
        disabled={isRefreshing}
        className="p-1.5 hover:bg-muted rounded-md transition-smooth disabled:opacity-50"
        aria-label="Refresh data"
        title="Refresh data"
      >
        <Icon 
          name="RefreshCw" 
          size={16} 
          className={isRefreshing ? 'animate-spin' : ''}
        />
      </button>
    </div>
  );
};

export default RealTimeStatusIndicator;