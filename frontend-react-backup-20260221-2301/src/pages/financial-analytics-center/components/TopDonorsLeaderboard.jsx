import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const TopDonorsLeaderboard = ({ donors, currency = 'USD' }) => {
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    })?.format(amount);
  };

  const getRankBadge = (rank) => {
    const badges = {
      1: { icon: 'Trophy', color: 'text-yellow-500', bg: 'bg-yellow-500/10' },
      2: { icon: 'Medal', color: 'text-gray-400', bg: 'bg-gray-400/10' },
      3: { icon: 'Award', color: 'text-orange-500', bg: 'bg-orange-500/10' }
    };
    return badges?.[rank] || { icon: 'Star', color: 'text-primary', bg: 'bg-primary/10' };
  };

  return (
    <div className="card h-full">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg md:text-xl font-semibold mb-1">Top Donors</h3>
          <p className="caption text-muted-foreground">Highest contributors this period</p>
        </div>
        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
          <Icon name="Users" size={20} color="var(--color-primary)" />
        </div>
      </div>
      <div className="space-y-3">
        {donors?.map((donor, index) => {
          const badge = getRankBadge(index + 1);
          return (
            <div 
              key={donor?.id}
              className="flex items-center gap-3 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-smooth cursor-pointer"
            >
              <div className={`w-8 h-8 ${badge?.bg} rounded-full flex items-center justify-center flex-shrink-0`}>
                <Icon name={badge?.icon} size={16} className={badge?.color} />
              </div>
              <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0 border-2 border-border">
                <Image 
                  src={donor?.avatar}
                  alt={donor?.avatarAlt}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm truncate">{donor?.name}</p>
                <p className="caption text-muted-foreground">{donor?.donations} donations</p>
              </div>
              <div className="text-right flex-shrink-0">
                <p className="font-semibold data-text text-sm">{formatCurrency(donor?.amount)}</p>
                <div className="flex items-center gap-1 caption text-success">
                  <Icon name="TrendingUp" size={12} />
                  <span>{donor?.growth}%</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <button className="w-full mt-4 py-2 text-sm font-medium text-primary hover:bg-primary/5 rounded-lg transition-smooth">
        View All Donors
      </button>
    </div>
  );
};

export default TopDonorsLeaderboard;