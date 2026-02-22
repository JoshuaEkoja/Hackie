import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const OrganizerLeaderboard = ({ events }) => {
  const getRankIcon = (rank) => {
    switch(rank) {
      case 1:
        return { icon: 'Trophy', color: 'text-warning' };
      case 2:
        return { icon: 'Medal', color: 'text-muted-foreground' };
      case 3:
        return { icon: 'Award', color: 'text-warning' };
      default:
        return { icon: 'Circle', color: 'text-muted-foreground' };
    }
  };

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg md:text-xl font-semibold mb-1">Event Leaderboard</h3>
          <p className="text-sm text-muted-foreground caption">
            Ranked by engagement score
          </p>
        </div>
        <Icon name="BarChart3" size={20} color="var(--color-primary)" />
      </div>
      <div className="space-y-4">
        {events?.map((event, index) => {
          const rankConfig = getRankIcon(index + 1);
          return (
            <div 
              key={event?.id}
              className="flex items-center gap-4 p-3 md:p-4 bg-muted/50 rounded-lg hover:bg-muted transition-smooth"
            >
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <Icon 
                  name={rankConfig?.icon} 
                  size={20} 
                  className={rankConfig?.color}
                />
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full overflow-hidden flex-shrink-0">
                  <Image
                    src={event?.organizerImage}
                    alt={event?.organizerImageAlt}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-sm md:text-base truncate">
                    {event?.name}
                  </h4>
                  <p className="text-xs text-muted-foreground caption truncate">
                    {event?.organizer}
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-end gap-2 flex-shrink-0">
                <span className="text-sm md:text-base font-semibold data-text">
                  {event?.engagementScore}
                </span>
                <div className="w-20 md:w-24 h-2 bg-background rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-primary rounded-full transition-all duration-500"
                    style={{ width: `${event?.engagementScore}%` }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default OrganizerLeaderboard;