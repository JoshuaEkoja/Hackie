import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';

const TabNavigationController = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const tabs = [
    {
      id: 'platform',
      label: 'Platform Overview',
      path: '/main-analytics-dashboard',
      icon: 'BarChart3',
      tooltip: 'Cross-platform insights and real-time activity',
      mobileLabel: 'Platform'
    },
    {
      id: 'events',
      label: 'Event Performance',
      path: '/organizer-performance-hub',
      icon: 'Target',
      tooltip: 'Event management analytics and ROI tracking',
      mobileLabel: 'Events'
    },
    {
      id: 'financial',
      label: 'Financial Analytics',
      path: '/financial-analytics-center',
      icon: 'DollarSign',
      tooltip: 'Donation tracking and revenue insights',
      mobileLabel: 'Financial'
    }
  ];

  const isActive = (path) => location?.pathname === path;

  const handleTabClick = (path) => {
    navigate(path);
  };

  const handleKeyDown = (e, path) => {
    if (e?.key === 'Enter' || e?.key === ' ') {
      e?.preventDefault();
      navigate(path);
    }
    
    if (e?.key === 'ArrowRight') {
      e?.preventDefault();
      const currentIndex = tabs?.findIndex(tab => tab?.path === location?.pathname);
      const nextIndex = (currentIndex + 1) % tabs?.length;
      navigate(tabs?.[nextIndex]?.path);
    }
    
    if (e?.key === 'ArrowLeft') {
      e?.preventDefault();
      const currentIndex = tabs?.findIndex(tab => tab?.path === location?.pathname);
      const prevIndex = currentIndex === 0 ? tabs?.length - 1 : currentIndex - 1;
      navigate(tabs?.[prevIndex]?.path);
    }
  };

  return (
    <nav className="tab-navigation" role="tablist" aria-label="Analytics navigation">
      <div className="max-w-[1920px] mx-auto px-6">
        <div className="hidden md:flex items-center gap-2">
          {tabs?.map((tab) => (
            <button
              key={tab?.id}
              role="tab"
              aria-selected={isActive(tab?.path)}
              aria-label={tab?.tooltip}
              title={tab?.tooltip}
              onClick={() => handleTabClick(tab?.path)}
              onKeyDown={(e) => handleKeyDown(e, tab?.path)}
              className={`tab-navigation-item ${isActive(tab?.path) ? 'active' : ''}`}
            >
              <div className="flex items-center gap-2">
                <Icon 
                  name={tab?.icon} 
                  size={18} 
                  color={isActive(tab?.path) ? 'var(--color-primary)' : 'currentColor'}
                />
                <span>{tab?.label}</span>
              </div>
            </button>
          ))}
        </div>

        <div className="flex md:hidden items-center justify-around">
          {tabs?.map((tab) => (
            <button
              key={tab?.id}
              role="tab"
              aria-selected={isActive(tab?.path)}
              aria-label={tab?.tooltip}
              onClick={() => handleTabClick(tab?.path)}
              onKeyDown={(e) => handleKeyDown(e, tab?.path)}
              className={`tab-navigation-item ${isActive(tab?.path) ? 'active' : ''}`}
            >
              <Icon 
                name={tab?.icon} 
                size={20} 
                color={isActive(tab?.path) ? 'var(--color-primary)' : 'currentColor'}
              />
              <span className="text-xs">{tab?.mobileLabel}</span>
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default TabNavigationController;