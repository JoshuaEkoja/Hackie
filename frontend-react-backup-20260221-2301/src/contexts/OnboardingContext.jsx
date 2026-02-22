import React, { createContext, useState, useContext, useEffect } from 'react';

const OnboardingContext = createContext();

export const OnboardingProvider = ({ children }) => {
  const [userRole, setUserRole] = useState(() => localStorage.getItem('userRole') || 'participant');
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light');
  const [onboardingDone, setOnboardingDone] = useState(() => localStorage.getItem('onboarding-done') === 'true');
  const [hackathonContext, setHackathonContext] = useState({
    name: '',
    description: '',
    customInstructions: ''
  });

  useEffect(() => {
    localStorage.setItem('userRole', userRole);
  }, [userRole]);

  useEffect(() => {
    localStorage.setItem('theme', theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const completeOnboarding = async (data) => {
    setHackathonContext(data);
    localStorage.setItem('onboarding-done', 'true');
    setOnboardingDone(true);

    // Save to backend
    try {
      const response = await fetch('http://localhost:3000/context', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (!response.ok) throw new Error('Failed to save context');
    } catch (e) {
      console.error('Context save error:', e);
    }
  };

  const value = {
    userRole,
    setUserRole,
    theme,
    toggleTheme,
    onboardingDone,
    hackathonContext,
    setHackathonContext,
    completeOnboarding
  };

  return (
    <OnboardingContext.Provider value={value}>
      {children}
    </OnboardingContext.Provider>
  );
};

export const useOnboarding = () => {
  const context = useContext(OnboardingContext);
  if (!context) {
    throw new Error('useOnboarding must be used within OnboardingProvider');
  }
  return context;
};
