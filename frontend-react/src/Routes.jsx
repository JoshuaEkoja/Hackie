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
    // Clear localStorage on first app load (fresh start)
    const hasLoadedOnce = sessionStorage.getItem('appLoaded');
    if (!hasLoadedOnce) {
      localStorage.removeItem('onboardingDone');
      localStorage.removeItem('userRole');
      localStorage.removeItem('organizerName');
      localStorage.removeItem('organizerEmail');
      localStorage.removeItem('participantName');
      sessionStorage.setItem('appLoaded', 'true');
    }

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
        {/* Root redirect based on onboarding status */}
        <Route path="/" element={hasOnboarded ? <Navigate to="/home" /> : <Navigate to="/user-type-selection" />} />
        
        {/* Onboarding Routes - Always accessible */}
        <Route path="/user-type-selection" element={hasOnboarded ? <Navigate to="/home" /> : <UserTypeSelection />} />
        <Route path="/onboarding-organizer" element={hasOnboarded ? <Navigate to="/home" /> : <OnboardingOrganizer />} />
        <Route path="/onboarding-participant" element={hasOnboarded ? <Navigate to="/home" /> : <OnboardingParticipant />} />
        
        {/* Main App Routes with Layout */}
        <Route element={<MainLayout />}>
          <Route path="/home" element={hasOnboarded ? <Home /> : <Navigate to="/user-type-selection" />} />
          <Route path="/discover" element={hasOnboarded ? <Discover /> : <Navigate to="/user-type-selection" />} />
          {/* Only organizers can create events */}
          <Route 
            path="/create-event" 
            element={hasOnboarded && userRole === 'organizer' ? <CreateEvent /> : <Navigate to="/user-type-selection" />} 
          />
          <Route path="/event/:eventId" element={hasOnboarded ? <EventDetail /> : <Navigate to="/user-type-selection" />} />
          <Route path="/profile" element={hasOnboarded ? <Profile /> : <Navigate to="/user-type-selection" />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
