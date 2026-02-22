import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Icon from '../../components/AppIcon';

import Input from '../../components/ui/Input';
import { cn } from '../../utils/cn';
import { useAuth } from '../../contexts/AuthContext';

const PreferencesSetup = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { updateProfile } = useAuth();
  const userType = location?.state?.userType || 'participant';

  const [locationInput, setLocationInput] = useState('');
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [selectedInterests, setSelectedInterests] = useState([]);
  const [showMoreInterests, setShowMoreInterests] = useState(false);
  const [loading, setLoading] = useState(false);
  const [locationLoading, setLocationLoading] = useState(false);

  const popularInterests = [
    { id: 'ai-ml', label: 'AI/ML', icon: 'Brain' },
    { id: 'blockchain', label: 'Blockchain', icon: 'Link' },
    { id: 'web-dev', label: 'Web Development', icon: 'Globe' },
    { id: 'mobile', label: 'Mobile Apps', icon: 'Smartphone' },
    { id: 'iot', label: 'IoT', icon: 'Wifi' },
    { id: 'cybersecurity', label: 'Cybersecurity', icon: 'Shield' },
    { id: 'cloud', label: 'Cloud Computing', icon: 'Cloud' },
    { id: 'data-science', label: 'Data Science', icon: 'BarChart' }
  ];

  const additionalInterests = [
    { id: 'ar-vr', label: 'AR/VR', icon: 'Glasses' },
    { id: 'gaming', label: 'Gaming', icon: 'Gamepad2' },
    { id: 'fintech', label: 'FinTech', icon: 'DollarSign' },
    { id: 'healthtech', label: 'HealthTech', icon: 'Heart' },
    { id: 'edtech', label: 'EdTech', icon: 'GraduationCap' },
    { id: 'sustainability', label: 'Sustainability', icon: 'Leaf' },
    { id: 'robotics', label: 'Robotics', icon: 'Bot' },
    { id: 'quantum', label: 'Quantum Computing', icon: 'Atom' }
  ];

  const allInterests = [...popularInterests, ...additionalInterests];
  const displayedInterests = showMoreInterests ? allInterests : popularInterests;

  const handleLocationDetect = () => {
    setLocationLoading(true);
    if (navigator?.geolocation) {
      navigator?.geolocation?.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position?.coords;
          // In production, use reverse geocoding API
          setSelectedLocation({
            name: `${latitude?.toFixed(2)}, ${longitude?.toFixed(2)}`,
            coordinates: { latitude, longitude }
          });
          setLocationInput(`${latitude?.toFixed(2)}, ${longitude?.toFixed(2)}`);
          setLocationLoading(false);
        },
        (error) => {
          console.error('Location error:', error);
          setLocationLoading(false);
        }
      );
    } else {
      setLocationLoading(false);
    }
  };

  const toggleInterest = (interestId) => {
    setSelectedInterests((prev) =>
      prev?.includes(interestId)
        ? prev?.filter((id) => id !== interestId)
        : [...prev, interestId]
    );
  };

  const handleComplete = async () => {
    setLoading(true);
    try {
      // Save preferences to user profile
      await updateProfile({
        user_type: userType,
        location: selectedLocation?.name || locationInput,
        interests: selectedInterests
      });
      
      // Mark onboarding as complete
      localStorage.setItem('onboardingDone', 'true');
      
      // Navigate to home after successful setup
      navigate('/', { replace: true });
    } catch (error) {
      console.error('Setup error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSkip = () => {
    // Mark onboarding as complete even when skipping
    localStorage.setItem('onboardingDone', 'true');
    navigate('/', { replace: true });
  };

  const canComplete = selectedInterests?.length > 0 || locationInput?.trim()?.length > 0;

  return (
    <div className="h-screen bg-gradient-to-b from-orange-50 to-white flex flex-col">
      {/* Header */}
      <div className="px-5 pt-safe-top pt-4 pb-2 flex-shrink-0">
        <button
          onClick={() => navigate(-1)}
          className="mb-2 w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center active:bg-gray-200 transition-colors no-tap-highlight"
        >
          <Icon name="ChevronLeft" size={20} color="#6B7280" />
        </button>
        <h1 className="text-[24px] font-bold text-gray-900 mb-0.5 leading-tight">Your Interests</h1>
        <p className="text-gray-600 text-[14px]">Select topics you like</p>
      </div>

      {/* Progress Indicator */}
      <div className="px-5 pb-2 flex-shrink-0">
        <div className="flex items-center justify-center gap-2">
          <div className="flex items-center">
            <div className="w-6 h-6 rounded-full bg-orange-600 text-white flex items-center justify-center text-xs">✓</div>
            <span className="ml-1.5 text-[13px] font-medium text-gray-500">Role</span>
          </div>
          <div className="w-8 h-0.5 bg-orange-600" />
          <div className="flex items-center">
            <div className="w-6 h-6 rounded-full bg-orange-600 text-white flex items-center justify-center text-xs font-semibold">2</div>
            <span className="ml-1.5 text-[13px] font-semibold text-gray-900">Interests</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 px-4 overflow-y-auto">
        {/* Location Input */}
        <div className="mb-4">
          <label className="text-[14px] font-semibold text-gray-900 block mb-2">📍 Location (Optional)</label>
          <div className="flex gap-2">
            <Input
              placeholder="City"
              value={locationInput}
              onChange={(e) => setLocationInput(e?.target?.value)}
              className="flex-1 h-[44px] text-[15px]"
            />
            <button
              onClick={handleLocationDetect}
              disabled={locationLoading}
              className="h-[44px] w-[44px] bg-white border-2 border-gray-200 rounded-lg flex items-center justify-center active:scale-[0.95] transition-transform no-tap-highlight"
            >
              <Icon name="Navigation" size={18} color="#6B7280" />
            </button>
          </div>
        </div>

        {/* Interests Section */}
        <div>
          <label className="text-[14px] font-semibold text-gray-900 block mb-2">❤️ Select Interests</label>
          <div className="flex flex-wrap gap-2">
            {displayedInterests?.map((interest) => {
              const isSelected = selectedInterests?.includes(interest?.id);
              return (
                <button
                  key={interest?.id}
                  onClick={() => toggleInterest(interest?.id)}
                  className={cn(
                    'px-3.5 py-2.5 rounded-lg text-[13px] font-semibold transition-all duration-200',
                    'flex items-center gap-1 border no-tap-highlight',
                    isSelected
                      ? 'bg-orange-600 text-white border-orange-600 shadow-sm'
                      : 'bg-white text-gray-700 border-gray-200 active:bg-gray-50'
                  )}
                >
                  {isSelected && <Icon name="Check" size={11} color="white" />}
                  {interest?.label}
                </button>
              );
            })}
          </div>
          {!showMoreInterests && (
            <button
              onClick={() => setShowMoreInterests(true)}
              className="mt-2 text-orange-600 text-[13px] font-semibold flex items-center gap-1 active:opacity-70"
            >
              Show More
              <Icon name="ChevronDown" size={14} color="#FF6B35" />
            </button>
          )}
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="flex-shrink-0 bg-white/95 backdrop-blur-lg border-t border-gray-200 px-5 py-3" style={{ paddingBottom: 'calc(0.75rem + var(--safe-area-bottom))' }}>
        <div className="flex gap-2">
          <button
            onClick={handleSkip}
            className="flex-1 h-[44px] bg-white border-2 border-gray-200 rounded-lg font-semibold text-[14px] text-gray-900 active:scale-[0.95] transition-transform no-tap-highlight"
          >
            Skip
          </button>
          <button
            onClick={handleComplete}
            disabled={!canComplete || loading}
            className="flex-1 h-[44px] bg-orange-600 rounded-lg font-semibold text-[14px] text-white active:scale-[0.95] transition-transform no-tap-highlight disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Saving...' : 'Done'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PreferencesSetup;