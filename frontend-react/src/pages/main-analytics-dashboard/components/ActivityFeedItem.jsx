import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const ActivityFeedItem = ({ type, user, action, timestamp, amount, avatar, avatarAlt }) => {
  const getActivityIcon = () => {
    switch (type) {
      case 'registration':
        return { name: 'UserPlus', color: 'var(--color-success)' };
      case 'donation':
        return { name: 'DollarSign', color: 'var(--color-primary)' };
      case 'chat':
        return { name: 'MessageSquare', color: 'var(--color-accent)' };
      default:
        return { name: 'Activity', color: 'var(--color-muted-foreground)' };
    }
  };

  const getTimeAgo = () => {
    const now = new Date();
    const activityTime = new Date(timestamp);
    const diff = Math.floor((now - activityTime) / 1000);

    if (diff < 60) return 'Just now';
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
    return `${Math.floor(diff / 86400)}d ago`;
  };

  const iconConfig = getActivityIcon();

  return (
    <div className="flex items-start gap-3 p-3 md:p-4 hover:bg-muted/50 rounded-lg transition-smooth">
      <div className="relative flex-shrink-0">
        {avatar ? (
          <Image
            src={avatar}
            alt={avatarAlt}
            className="w-8 h-8 md:w-10 md:h-10 rounded-full object-cover"
          />
        ) : (
          <div className="w-8 h-8 md:w-10 md:h-10 bg-muted rounded-full flex items-center justify-center">
            <Icon name="User" size={16} color="var(--color-muted-foreground)" />
          </div>
        )}
        <div
          className="absolute -bottom-1 -right-1 w-4 h-4 md:w-5 md:h-5 rounded-full flex items-center justify-center"
          style={{ backgroundColor: 'var(--color-card)' }}
        >
          <Icon name={iconConfig?.name} size={10} color={iconConfig?.color} />
        </div>
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm text-foreground line-clamp-2">
          <span className="font-medium">{user}</span> {action}
        </p>
        <div className="flex items-center gap-2 mt-1">
          <span className="caption text-muted-foreground">{getTimeAgo()}</span>
          {amount && (
            <>
              <span className="text-muted-foreground">•</span>
              <span className="caption text-primary font-medium">{amount}</span>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ActivityFeedItem;