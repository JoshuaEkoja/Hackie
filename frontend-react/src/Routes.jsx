import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes as RouterRoutes, Route, Navigate } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import MainLayout from "components/layout/MainLayout";
import Home from './pages/home';
import CreateEvent from './pages/create-event';
import EventDetail from './pages/event-detail';
import Discover from './pages/discover';
import Profile from './pages/profile';
import UserTypeSelection from './pages/user-type-selection';
import OnboardingOrganizer from './pages/onboarding-organizer';
import OnboardingParticipant from './pages/onboarding-participant';

const Routes = () => {
  const [hasOnboarded, setHasOnboarded] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user has completed onboarding
    const checkOnboarding = () => {
      const onboarded = localStorage.getItem('onboardingDone') === 'true';
      const role = localStorage.getItem('userRole') || 'participant';
      setHasOnboarded(onboarded);
      setUserRole(role);
      setIsLoading(false);
    };

    checkOnboarding();

    // Listen for custom onboarding completion event
    const handleOnboardingComplete = () => {
      checkOnboarding();
    };

    window.addEventListener('onboardingComplete', handleOnboardingComplete);
    return () => window.removeEventListener('onboardingComplete', handleOnboardingComplete);
  }, []);

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Onboarding Routes - Always accessible */}
        <Route path="/user-type-selection" element={<UserTypeSelection />} />
        <Route path="/onboarding-organizer" element={<OnboardingOrganizer />} />
        <Route path="/onboarding-participant" element={<OnboardingParticipant />} />
        {/* Main App Routes with Layout */}
        <Route element={<MainLayout />}>
          <Route path="/" element={hasOnboarded ? <Home /> : <Navigate to="/user-type-selection" />} />
          <Route path="/discover" element={<Discover />} />
          {/* Only organizers can create events */}
          <Route 
            path="/create-event" 
            element={userRole === 'organizer' ? <CreateEvent /> : <Navigate to="/" />} 
          />
          <Route path="/event/:eventId" element={<EventDetail />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
