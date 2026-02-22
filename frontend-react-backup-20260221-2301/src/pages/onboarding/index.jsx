import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useChat } from 'contexts/ChatContext';
import Button from 'components/ui/Button';
import { Input, Textarea } from 'components/ui/Input';

const Onboarding = () => {
  const navigate = useNavigate();
  const { userRole, setUserRole, completeOnboarding } = useChat();
  const [currentScreen, setCurrentScreen] = React.useState(0);
  const [formData, setFormData] = React.useState({
    name: '',
    description: '',
    customInstructions: ''
  });

  const screens = ['welcome', 'role', 'setup'];

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

  const handleFinish = async () => {
    if (!formData.name && !formData.description) {
      alert('Please enter at least a hackathon name');
      return;
    }

    await completeOnboarding(formData);
    navigate('/');
  };

  const skipOnboarding = () => {
    completeOnboarding({ name: 'My Hackathon', description: '', customInstructions: '' });
    navigate('/');
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <div className="w-full max-w-sm animate-slide-in space-y-6">
        {/* Progress */}
        <div className="flex justify-center gap-2">
          {screens.map((_, i) => (
            <div
              key={i}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === currentScreen
                  ? 'w-6 bg-primary'
                  : 'w-2 bg-muted'
              }`}
            />
          ))}
        </div>

        {/* Screen 0: Welcome */}
        {currentScreen === 0 && (
          <div className="space-y-6 text-center">
            <div>
              <div className="mb-4 text-5xl">🚀</div>
              <h1 className="mb-3 text-heading-2 font-heading text-foreground">
                Welcome to HackBase
              </h1>
              <p className="text-muted-foreground">
                Your AI-powered hackathon assistant
              </p>
            </div>
            <Button onClick={nextScreen} size="lg">
              Get Started
            </Button>
            <button
              onClick={skipOnboarding}
              className="text-sm text-muted-foreground hover:text-primary"
            >
              Skip for now
            </button>
          </div>
        )}

        {/* Screen 1: Role Selection */}
        {currentScreen === 1 && (
          <div className="space-y-6">
            <h2 className="text-heading-3 font-heading text-foreground text-center">
              Who Are You?
            </h2>
            <div className="space-y-4">
              {['participant', 'hoster'].map((role) => (
                <button
                  key={role}
                  onClick={() => setUserRole(role)}
                  className={`w-full p-6 rounded-lg border-2 transition-all ${
                    userRole === role
                      ? 'border-primary bg-primary/5'
                      : 'border-border hover:border-primary'
                  }`}
                >
                  <div className="text-3xl mb-2">{role === 'participant' ? '👥' : '🎯'}</div>
                  <h3 className="font-semibold text-foreground capitalize">{role}</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {role === 'participant'
                      ? 'I\'m attending a hackathon'
                      : 'I\'m organizing a hackathon'}
                  </p>
                </button>
              ))}
            </div>
            <div className="flex gap-3">
              <Button onClick={prevScreen} variant="outline" size="lg">
                Back
              </Button>
              <Button onClick={nextScreen} size="lg">
                Continue
              </Button>
            </div>
          </div>
        )}

        {/* Screen 2: Setup */}
        {currentScreen === 2 && (
          <div className="space-y-6">
            <h2 className="text-heading-3 font-heading text-foreground">
              Customize Your Experience
            </h2>
            <div className="space-y-4">
              <Input
                label="Hackathon Name"
                placeholder="e.g., HealthTech Hack 2026"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
              <Textarea
                label="Description (Optional)"
                placeholder="What's your hackathon about?"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
              {userRole === 'hoster' && (
                <Textarea
                  label="Custom Instructions (Optional)"
                  placeholder="e.g., 'Remember to emphasize innovation...'"
                  value={formData.customInstructions}
                  onChange={(e) => setFormData({ ...formData, customInstructions: e.target.value })}
                />
              )}
            </div>
            <div className="flex gap-3">
              <Button onClick={prevScreen} variant="outline" size="lg">
                Back
              </Button>
              <Button onClick={handleFinish} size="lg">
                Done
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Onboarding;
