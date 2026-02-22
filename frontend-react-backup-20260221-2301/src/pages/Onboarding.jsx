import { useState } from 'react';
import { Button } from '../components/ui/Button';
import { Input, Textarea } from '../components/ui/Input';
import { useOnboarding } from '../contexts/OnboardingContext';

export default function Onboarding() {
  const { userRole, setUserRole, theme, toggleTheme, completeOnboarding } = useOnboarding();
  const [currentScreen, setCurrentScreen] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    customInstructions: ''
  });

  const screens = [
    'welcome',
    'role',
    'theme',
    'setup'
  ];

  const nextScreen = () => {
    if (currentScreen < screens.length - 1) {
      setCurrentScreen(currentScreen + 1);
    }
  };

  const prevScreen = () => {
    if (currentScreen > 0) {
      setCurrentScreen(currentScreen - 1);
    }
  };

  const handleRoleSelect = (role) => {
    setUserRole(role);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFinish = async () => {
    if (!formData.name && !formData.description) {
      alert('Please enter at least a hackathon name');
      return;
    }

    await completeOnboarding(formData);
  };

  const skipOnboarding = () => {
    completeOnboarding({ name: 'My Hackathon', description: '', customInstructions: '' });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-white p-4 dark:bg-dark-bg">
      <div className="w-full max-w-sm animate-slide-in space-y-6">
        {/* Progress Dots */}
        <div className="flex justify-center gap-2">
          {screens.map((_, i) => (
            <div
              key={i}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === currentScreen
                  ? 'w-6 bg-orange-500'
                  : 'w-2 bg-gray-300 dark:bg-gray-700'
              }`}
            />
          ))}
        </div>

        {/* Screen 0: Welcome */}
        {currentScreen === 0 && (
          <div className="space-y-6 text-center">
            <div>
              <div className="mb-4 text-5xl">🚀</div>
              <h1 className="mb-3 text-3xl font-bold text-gray-900 dark:text-white">
                Welcome to HackBase
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Your AI-powered hackathon assistant. Let's get you started in just a few taps.
              </p>
            </div>
            <Button onClick={nextScreen} variant="primary">
              Get Started
            </Button>
            <button
              onClick={skipOnboarding}
              className="text-sm text-gray-600 hover:text-orange-500 dark:text-gray-400"
            >
              Skip for now
            </button>
          </div>
        )}

        {/* Screen 1: Role Selection */}
        {currentScreen === 1 && (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="mb-2 text-2xl font-bold text-gray-900 dark:text-white">
                Who Are You?
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Let's personalize your experience.
              </p>
            </div>

            <div className="space-y-3">
              {[
                { id: 'participant', icon: '👥', title: 'Hackathon Participant', desc: 'I\'m attending a hackathon and need help finding events and getting support.' },
                { id: 'hoster', icon: '🎯', title: 'Hackathon Hoster', desc: 'I\'m organizing a hackathon and want to set up an AI assistant for participants.' }
              ].map(role => (
                <button
                  key={role.id}
                  onClick={() => handleRoleSelect(role.id)}
                  className={`w-full rounded-lg border-2 p-6 text-center transition-all duration-300 ${
                    userRole === role.id
                      ? 'border-orange-500 bg-gray-50 dark:bg-gray-700'
                      : 'border-gray-300 hover:border-orange-500 hover:-translate-y-1 hover:shadow-md dark:border-gray-700'
                  }`}
                >
                  <div className="mb-3 text-4xl">{role.icon}</div>
                  <h3 className="mb-2 font-bold text-gray-900 dark:text-white">{role.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{role.desc}</p>
                </button>
              ))}
            </div>

            <div className="flex gap-3">
              <Button onClick={prevScreen} variant="secondary">Back</Button>
              <Button onClick={nextScreen} variant="primary">Continue</Button>
            </div>
          </div>
        )}

        {/* Screen 2: Theme Selection */}
        {currentScreen === 2 && (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="mb-2 text-2xl font-bold text-gray-900 dark:text-white">
                Choose Your Theme
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Pick your preferred appearance — you can change it anytime.
              </p>
            </div>

            <div className="space-y-3">
              {[
                { id: 'light', icon: '☀️', title: 'Light', desc: 'Clean, bright, and professional' },
                { id: 'dark', icon: '🌙', title: 'Dark', desc: 'Easy on the eyes, modern feel' }
              ].map(t => (
                <button
                  key={t.id}
                  onClick={() => theme !== t.id && toggleTheme()}
                  className={`w-full rounded-lg border-2 p-4 text-center transition-all duration-300 ${
                    theme === t.id
                      ? 'border-orange-500 bg-gray-50 dark:bg-gray-700'
                      : 'border-gray-300 hover:border-orange-500 dark:border-gray-700'
                  }`}
                >
                  <div className="mb-2 text-3xl">{t.icon}</div>
                  <h3 className="font-bold text-gray-900 dark:text-white">{t.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{t.desc}</p>
                </button>
              ))}
            </div>

            <div className="flex gap-3">
              <Button onClick={prevScreen} variant="secondary">Back</Button>
              <Button onClick={nextScreen} variant="primary">Continue</Button>
            </div>
          </div>
        )}

        {/* Screen 3: Setup */}
        {currentScreen === 3 && (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="mb-2 text-2xl font-bold text-gray-900 dark:text-white">
                {userRole === 'hoster' ? 'Set Up Your Hackathon' : 'Find Your Hackathon'}
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {userRole === 'hoster'
                  ? 'Configure your hackathon details and AI assistant settings.'
                  : 'Tell us about the hackathon you\'re attending so we can help you better.'}
              </p>
            </div>

            <div className="space-y-4">
              <Input
                label="Hackathon Name"
                placeholder="e.g., HealthTech Hack 2026"
                name="name"
                value={formData.name}
                onChange={handleFormChange}
              />

              <Textarea
                label="Description (Optional)"
                placeholder="What's your hackathon about?"
                name="description"
                value={formData.description}
                onChange={handleFormChange}
              />

              {userRole === 'hoster' && (
                <Textarea
                  label="Custom Instructions for Participants (Optional)"
                  placeholder="e.g., 'Remember to emphasize innovation in healthcare...'"
                  name="customInstructions"
                  value={formData.customInstructions}
                  onChange={handleFormChange}
                />
              )}
            </div>

            <div className="flex gap-3">
              <Button onClick={prevScreen} variant="secondary">Back</Button>
              <Button onClick={handleFinish} variant="primary">Done</Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
