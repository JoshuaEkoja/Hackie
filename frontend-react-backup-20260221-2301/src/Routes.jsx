import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import MobileBottomNav from "components/navigation/MobileBottomNav";
import Home from './pages/home';
import CreateEvent from './pages/create-event';
import EventDetail from './pages/event-detail';
import Discover from './pages/discover';
import Profile from './pages/profile';
import UserTypeSelection from './pages/user-type-selection';
import PreferencesSetup from './pages/preferences-setup';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/user-type-selection" element={<UserTypeSelection />} />
        <Route path="/preferences-setup" element={<PreferencesSetup />} />
        <Route path="/" element={<Home />} />
        <Route path="/create-event" element={<CreateEvent />} />
        <Route path="/event/:eventId" element={<EventDetail />} />
        <Route path="/discover" element={<Discover />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      <MobileBottomNav />
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
