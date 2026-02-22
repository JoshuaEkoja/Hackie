import React from 'react';
import Icon from '../../../components/AppIcon';

const RecentTransactionsFeed = ({ transactions, currency = 'USD' }) => {
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    })?.format(amount);
  };

  const formatTime = (timestamp) => {
    const now = new Date();
    const txTime = new Date(timestamp);
    const diffMs = now - txTime;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    return txTime?.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const getStatusConfig = (status) => {
    const configs = {
      completed: {
        icon: 'CheckCircle2',
        color: 'text-success',
        bg: 'bg-success/10',
        label: 'Completed'
      },
      pending: {
        icon: 'Clock',
        color: 'text-warning',
        bg: 'bg-warning/10',
        label: 'Pending'
      },
      failed: {
        icon: 'XCircle',
        color: 'text-error',
        bg: 'bg-error/10',
        label: 'Failed'
      }
    };
    return configs?.[status] || configs?.completed;
  };

  const getPaymentMethodIcon = (method) => {
    const icons = {
      card: 'CreditCard',
      upi: 'Smartphone',
      wallet: 'Wallet',
      bank: 'Building2'
    };
    return icons?.[method] || 'DollarSign';
  };

  return (
    <div className="card h-full">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg md:text-xl font-semibold mb-1">Recent Transactions</h3>
          <p className="caption text-muted-foreground">Live transaction feed</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
          <span className="caption text-success font-medium">Live</span>
        </div>
      </div>
      <div className="space-y-3 max-h-96 overflow-y-auto custom-scrollbar">
        {transactions?.map((tx) => {
          const statusConfig = getStatusConfig(tx?.status);
          return (
            <div 
              key={tx?.id}
              className="p-3 rounded-lg border border-border hover:border-primary/50 transition-smooth cursor-pointer"
            >
              <div className="flex items-start justify-between gap-3 mb-2">
                <div className="flex items-center gap-2 flex-1 min-w-0">
                  <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon 
                      name={getPaymentMethodIcon(tx?.method)} 
                      size={16} 
                      color="var(--color-primary)" 
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm truncate">{tx?.donor}</p>
                    <p className="caption text-muted-foreground">{tx?.hackathon}</p>
                  </div>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="font-semibold data-text text-sm">{formatCurrency(tx?.amount)}</p>
                  <p className="caption text-muted-foreground">{formatTime(tx?.timestamp)}</p>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className={`flex items-center gap-1 px-2 py-1 rounded-full ${statusConfig?.bg}`}>
                  <Icon name={statusConfig?.icon} size={12} className={statusConfig?.color} />
                  <span className={`caption ${statusConfig?.color} font-medium`}>
                    {statusConfig?.label}
                  </span>
                </div>
                <span className="caption text-muted-foreground">ID: {tx?.transactionId}</span>
              </div>
            </div>
          );
        })}
      </div>
      <button className="w-full mt-4 py-2 text-sm font-medium text-primary hover:bg-primary/5 rounded-lg transition-smooth">
        View All Transactions
      </button>
    </div>
  );
};

export default RecentTransactionsFeed;