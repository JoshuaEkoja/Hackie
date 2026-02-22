import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';

const MobileBottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [userRole, setUserRole] = useState('participant');

  useEffect(() => {
    const role = localStorage.getItem('userRole') || 'participant';
    setUserRole(role);
  }, []);

  const participantTabs = [
    { id: 'home', label: 'Home', path: '/', icon: 'Home' },
    { id: 'discover', label: 'Discover', path: '/discover', icon: 'Compass' },
    { id: 'profile', label: 'Profile', path: '/profile', icon: 'User' }
  ];

  const organizerTabs = [
    { id: 'home', label: 'Home', path: '/', icon: 'Home' },
    { id: 'discover', label: 'Discover', path: '/discover', icon: 'Compass' },
    { id: 'create', label: 'Create', path: '/create-event', icon: 'Plus' },
    { id: 'profile', label: 'Profile', path: '/profile', icon: 'User' }
  ];

  const tabs = userRole === 'organizer' ? organizerTabs : participantTabs;

  const isActive = (path) => {
    if (path === '/') {
      return location?.pathname === '/';
    }
    return location?.pathname?.startsWith(path);
  };

  return (
    <nav className="ios-bottom-nav">
      <div className="flex items-center justify-around w-full px-0.5 py-0.5">
        {tabs?.map((tab) => {
          const active = isActive(tab?.path);
          
          return (
            <button
              key={tab?.id}
              onClick={() => navigate(tab?.path)}
              className={`flex flex-col items-center justify-center gap-0 py-0.5 px-0.5 flex-1 no-tap-highlight ${
                active ? 'text-orange-600' : 'text-gray-500'
              }`}
            >
              <Icon
                name={tab?.icon}
                size={18}
                color={active ? '#FF6B35' : '#9CA3AF'}
              />
              <span className={`text-[7px] font-medium leading-none ${
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