import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';

const MobileBottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const tabs = [
    {
      id: 'home',
      label: 'Home',
      path: '/',
      icon: 'Home'
    },
    {
      id: 'discover',
      label: 'Discover',
      path: '/discover',
      icon: 'Compass'
    },
    {
      id: 'create',
      label: 'Create',
      path: '/create-event',
      icon: 'Plus'
    },
    {
      id: 'profile',
      label: 'Profile',
      path: '/profile',
      icon: 'User'
    }
  ];

  const isActive = (path) => {
    if (path === '/') {
      return location?.pathname === '/';
    }
    return location?.pathname?.startsWith(path);
  };

  return (
    <nav className="ios-bottom-nav">
      <div className="flex items-center justify-around px-2 py-2">
        {tabs?.map((tab) => {
          const active = isActive(tab?.path);
          
          return (
            <button
              key={tab?.id}
              onClick={() => navigate(tab?.path)}
              className={`flex flex-col items-center justify-center gap-1 py-2 px-3 rounded-xl transition-all duration-200 ios-touch-target no-tap-highlight ${
                active ? 'text-orange-600' : 'text-gray-500'
              }`}
            >
              <div className={`relative ${
                active ? 'scale-110' : ''
              } transition-transform duration-200`}>
                <Icon
                  name={tab?.icon}
                  size={26}
                  color={active ? '#FF6B35' : '#9CA3AF'}
                />
              </div>
              <span className={`text-[10px] font-medium ${
                active ? 'text-orange-600' : 'text-gray-500'
              }`}>
                {tab?.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default MobileBottomNav;