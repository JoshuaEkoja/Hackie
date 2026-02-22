import React from 'react';
import { Outlet } from 'react-router-dom';
import MobileBottomNav from '../navigation/MobileBottomNav';

const MainLayout = () => {
  return (
    <div className="min-h-screen bg-background">
      <main className="ios-scroll pb-12">
        <Outlet />
      </main>
      <MobileBottomNav />
    </div>
  );
};

export default MainLayout;