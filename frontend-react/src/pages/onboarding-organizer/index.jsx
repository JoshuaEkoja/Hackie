import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';

const OnboardingOrganizer = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const handleComplete = () => {
    localStorage.setItem('userRole', 'organizer');
    localStorage.setItem('organizerName', name);
    localStorage.setItem('organizerDescription', description);
    localStorage.setItem('onboardingDone', 'true');
    window.dispatchEvent(new Event('onboardingComplete'));
    navigate('/', { replace: true });
  };

  const canComplete = name?.trim()?.length > 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50 flex flex-col px-4 pt-safe-top py-8">
      {/* Header */}
      <div className="mb-8">
        <button
          onClick={() => navigate(-1)}
          className="mb-4 w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors"
        >
          <Icon name="ChevronLeft" size={20} color="#6B7280" />
        </button>
        <div className="flex items-start gap-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center shadow-lg">
            <Icon name="Building2" size={24} color="white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Tell us about yourself</h1>
            <p className="text-gray-600 text-sm mt-1">We'll help you set up your organizer profile</p>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-8 w-full h-1 bg-gray-200 rounded-full overflow-hidden">
        <div className="h-full w-full bg-gradient-to-r from-orange-500 to-orange-600 rounded-full"></div>
      </div>

      {/* Form */}
      <div className="flex-1">
        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-orange-100 flex items-center justify-center text-xs font-bold text-orange-600">1</span>
            Your Name
          </label>
          <Input
            placeholder="e.g., John Smith"
            value={name}
            onChange={(e) => setName(e?.target?.value)}
            className="w-full h-11 text-sm border-gray-300 bg-white"
          />
          <p className="text-xs text-gray-500 mt-2">This will appear on your event listings</p>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-orange-100 flex items-center justify-center text-xs font-bold text-orange-600">2</span>
            About Your Organization
          </label>
          <textarea
            placeholder="Tell us about your organization, team, or what events you plan to create..."
            value={description}
            onChange={(e) => setDescription(e?.target?.value)}
            className="w-full h-24 px-3 py-2 rounded-lg border border-gray-300 text-sm focus:border-orange-600 focus:outline-none resize-none bg-white"
          />
          <p className="text-xs text-gray-500 mt-2">This helps participants understand your events better</p>
        </div>
      </div>

      {/* Bottom Buttons */}
      <div className="flex gap-3 pb-4 mt-8">
        <Button
          variant="outline"
          onClick={() => {
            localStorage.setItem('userRole', 'organizer');
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

export default OnboardingOrganizer;
