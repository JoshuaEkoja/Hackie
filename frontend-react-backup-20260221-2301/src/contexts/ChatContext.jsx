import React, { createContext, useContext, useState, useEffect } from 'react';

const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [messages, setMessages] = useState([
    { type: 'bot', text: 'Hi! I\'m your HackBase AI assistant. How can I help you with the hackathon?' }
  ]);
  const [hackathonContext, setHackathonContext] = useState({
    name: '',
    description: '',
    customInstructions: ''
  });
  const [theme, setTheme] = useState(() => localStorage.getItem('chat-theme') || 'light');
  const [userRole, setUserRole] = useState(() => localStorage.getItem('user-role') || 'participant');
  const [onboardingDone, setOnboardingDone] = useState(() => localStorage.getItem('onboarding-done') === 'true');

  useEffect(() => {
    localStorage.setItem('chat-theme', theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('user-role', userRole);
  }, [userRole]);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const sendMessage = async (message) => {
    setMessages(prev => [...prev, { type: 'user', text: message }]);
    try {
      const response = await fetch('http://localhost:3000/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message })
      });

      const data = await response.json();
      setMessages(prev => [...prev, { type: 'bot', text: data.reply || 'No response' }]);
    } catch (error) {
      setMessages(prev => [...prev, { type: 'bot', text: 'Connection error. Please try again.' }]);
    }
  };

  const completeOnboarding = async (data) => {
    setHackathonContext(data);
    localStorage.setItem('onboarding-done', 'true');
    setOnboardingDone(true);

    try {
      await fetch('http://localhost:3000/context', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
    } catch (e) {
      console.error('Context save error:', e);
    }
  };

  const value = {
    messages,
    setMessages,
    hackathonContext,
    setHackathonContext,
    theme,
    toggleTheme,
    userRole,
    setUserRole,
    onboardingDone,
    completeOnboarding,
    sendMessage
  };

  return (
    <ChatContext.Provider value={value}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useChat must be used within ChatProvider');
  }
  return context;
};
