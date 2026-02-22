import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';

const OnboardingParticipant = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');

  const handleComplete = () => {
    localStorage.setItem('userRole', 'participant');
    localStorage.setItem('participantName', name);
    localStorage.setItem('participantLocation', location);
    localStorage.setItem('onboardingDone', 'true');
    window.dispatchEvent(new Event('onboardingComplete'));
    navigate('/', { replace: true });
  };

  const canComplete = name?.trim()?.length > 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 flex flex-col px-4 pt-safe-top py-8">
      {/* Header */}
      <div className="mb-8">
        <button
          onClick={() => navigate(-1)}
          className="mb-4 w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors"
        >
          <Icon name="ChevronLeft" size={20} color="#6B7280" />
        </button>
        <div className="flex items-start gap-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg">
            <Icon name="Zap" size={24} color="white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Welcome to HackBase</h1>
            <p className="text-gray-600 text-sm mt-1">Set up your profile to get started</p>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-8 w-full h-1 bg-gray-200 rounded-full overflow-hidden">
        <div className="h-full w-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full"></div>
      </div>

      {/* Form */}
      <div className="flex-1">
        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-xs font-bold text-blue-600">1</span>
            Your Name
          </label>
          <Input
            placeholder="e.g., Alex Johnson"
            value={name}
            onChange={(e) => setName(e?.target?.value)}
            className="w-full h-11 text-sm border-gray-300 bg-white"
          />
          <p className="text-xs text-gray-500 mt-2">This will appear on teams you join</p>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-xs font-bold text-blue-600">2</span>
            Location
          </label>
          <div className="flex gap-2">
            <Input
              placeholder="e.g., San Francisco, CA"
              value={location}
              onChange={(e) => setLocation(e?.target?.value)}
              className="flex-1 h-11 text-sm border-gray-300 bg-white"
            />
            <button className="h-11 w-11 rounded-lg bg-white border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors">
              <Icon name="MapPin" size={18} color="#6B7280" />
            </button>
          </div>
          <p className="text-xs text-gray-500 mt-2">Helps us show you nearby hackathons</p>
        </div>

        {/* Benefits Preview */}
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4 border border-blue-200">
          <p className="text-xs font-semibold text-blue-900 mb-2">With your profile, you can:</p>
          <ul className="space-y-1.5">
            <li className="flex items-center gap-2 text-xs text-blue-800">
              <Icon name="Check" size={14} color="#3B82F6" />
              Discover amazing hackathons
            </li>
            <li className="flex items-center gap-2 text-xs text-blue-800">
              <Icon name="Check" size={14} color="#3B82F6" />
              Join teams and build projects
            </li>
            <li className="flex items-center gap-2 text-xs text-blue-800">
              <Icon name="Check" size={14} color="#3B82F6" />
              Win prizes and recognition
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Buttons */}
      <div className="flex gap-3 pb-4 mt-8">
        <Button
          variant="outline"
          onClick={() => {
            localStorage.setItem('userRole', 'participant');
            localStorage.setItem('onboardingDone', 'true');
            window.dispatchEvent(new Event('onboardingComplete'));
            navigate('/', { replace: true });
          }}
          fullWidth
          className="h-11"
        >
          Skip
        </Button>
        <Button
          onClick={handleComplete}
          disabled={!canComplete}
          fullWidth
          className="h-11 shadow-lg"
        >
          Done
        </Button>
      </div>
      <p className="text-xs text-center text-gray-500">Step 1 of 1</p>
    </div>
  );
};

export default OnboardingParticipant;
