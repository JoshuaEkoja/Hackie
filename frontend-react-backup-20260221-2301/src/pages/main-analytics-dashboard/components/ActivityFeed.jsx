import React from 'react';
import ActivityFeedItem from './ActivityFeedItem';
import Icon from '../../../components/AppIcon';

const ActivityFeed = ({ activities, loading }) => {
  if (loading) {
    return (
      <div className="card h-full">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg md:text-xl font-semibold">Real-time Activity</h3>
          <div className="skeleton w-16 h-6 rounded-full" />
        </div>
        <div className="space-y-3">
          {[1, 2, 3, 4, 5]?.map((i) => (
            <div key={i} className="skeleton h-16 rounded-lg" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="card h-full flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg md:text-xl font-semibold">Real-time Activity</h3>
        <div className="flex items-center gap-2 px-3 py-1 bg-success/10 text-success rounded-full">
          <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
          <span className="caption font-medium">Live</span>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto custom-scrollbar -mx-4 px-4 md:-mx-6 md:px-6">
        <div className="space-y-1">
          {activities?.length > 0 ? (
            activities?.map((activity) => (
              <ActivityFeedItem key={activity?.id} {...activity} />
            ))
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
                <Icon name="Activity" size={32} color="var(--color-muted-foreground)" />
              </div>
              <p className="text-muted-foreground">No recent activity</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ActivityFeed;