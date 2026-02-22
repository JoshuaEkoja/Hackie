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
      
      // Navigate to home after successful setup
      navigate('/', { replace: true });
    } catch (error) {
      console.error('Setup error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSkip = () => {
    navigate('/', { replace: true });
  };

  const canComplete = selectedInterests?.length > 0 || locationInput?.trim()?.length > 0;

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white flex flex-col ios-scroll">
      {/* Header */}
      <div className="px-5 pt-safe-top pt-8 pb-6">
        <button
          onClick={() => navigate(-1)}
          className="mb-6 ios-touch-target w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center active:bg-gray-200 transition-colors no-tap-highlight -ml-1"
        >
          <Icon name="ChevronLeft" size={20} color="#6B7280" />
        </button>
        <h1 className="text-[28px] font-bold text-gray-900 mb-2 leading-tight">Set Your Preferences</h1>
        <p className="text-gray-600 text-[15px] leading-relaxed">Help us personalize your hackathon experience</p>
      </div>

      {/* Progress Indicator */}
      <div className="px-5 mb-6">
        <div className="flex items-center justify-center gap-2">
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-orange-600 text-white flex items-center justify-center shadow-sm">
              <Icon name="Check" size={14} color="white" />
            </div>
            <span className="ml-2 text-[13px] font-medium text-gray-500">User Type</span>
          </div>
          <div className="w-10 h-0.5 bg-orange-600 mx-1" />
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-orange-600 text-white flex items-center justify-center text-sm font-semibold shadow-sm">
              2
            </div>
            <span className="ml-2 text-[13px] font-semibold text-gray-900">Preferences</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 px-5 pb-28 overflow-y-auto ios-scroll">
        <div className="space-y-8">
          {/* Location Section */}
          <div>
            <h2 className="text-[20px] font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Icon name="MapPin" size={20} color="#FF6B35" />
              Location Preferences
            </h2>
            <div className="space-y-3">
              <Input
                placeholder="Enter your city or region"
                value={locationInput}
                onChange={(e) => setLocationInput(e?.target?.value)}
                className="w-full h-[50px] text-[15px]"
              />
              <button
                onClick={handleLocationDetect}
                disabled={locationLoading}
                className="w-full h-[50px] bg-white border-2 border-gray-200 rounded-xl flex items-center justify-center gap-2 font-semibold text-[15px] text-gray-900 active:scale-[0.97] transition-transform no-tap-highlight"
              >
                <Icon name="Navigation" size={18} color="#6B7280" />
                {locationLoading ? 'Detecting...' : 'Use Current Location'}
              </button>
            </div>
          </div>

          {/* Interests Section */}
          <div>
            <h2 className="text-[20px] font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Icon name="Heart" size={20} color="#FF6B35" />
              Your Interests
            </h2>
            <p className="text-[14px] text-gray-600 mb-4 leading-relaxed">
              Select topics you're interested in (choose as many as you like)
            </p>
            <div className="flex flex-wrap gap-2">
              {displayedInterests?.map((interest) => {
                const isSelected = selectedInterests?.includes(interest?.id);
                return (
                  <button
                    key={interest?.id}
                    onClick={() => toggleInterest(interest?.id)}
                    className={cn(
                      'px-4 py-2.5 rounded-full text-[14px] font-semibold transition-all duration-200',
                      'flex items-center gap-2 border-2 no-tap-highlight',
                      isSelected
                        ? 'bg-orange-600 text-white border-orange-600 shadow-ios scale-105'
                        : 'bg-white text-gray-700 border-gray-200 active:bg-gray-50'
                    )}
                  >
                    <Icon
                      name={interest?.icon}
                      size={14}
                      color={isSelected ? 'white' : '#6B7280'}
                    />
                    {interest?.label}
                    {isSelected && (
                      <Icon name="Check" size={12} color="white" />
                    )}
                  </button>
                );
              })}
            </div>
            {!showMoreInterests && (
              <button
                onClick={() => setShowMoreInterests(true)}
                className="mt-4 text-orange-600 text-[14px] font-semibold flex items-center gap-1 active:opacity-70 transition-opacity no-tap-highlight"
              >
                Show More Interests
                <Icon name="ChevronDown" size={16} color="#FF6B35" />
              </button>
            )}
            {showMoreInterests && (
              <button
                onClick={() => setShowMoreInterests(false)}
                className="mt-4 text-orange-600 text-[14px] font-semibold flex items-center gap-1 active:opacity-70 transition-opacity no-tap-highlight"
              >
                Show Less
                <Icon name="ChevronUp" size={16} color="#FF6B35" />
              </button>
            )}
          </div>

          {/* Selected Count */}
          {selectedInterests?.length > 0 && (
            <div className="bg-orange-50 border-2 border-orange-200 rounded-2xl p-4">
              <p className="text-[14px] text-orange-800 font-medium">
                <span className="font-bold">{selectedInterests?.length}</span> interest{selectedInterests?.length !== 1 ? 's' : ''} selected
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="fixed bottom-0 left-0 right-0 max-w-[390px] mx-auto bg-white/95 backdrop-blur-lg border-t border-gray-200 px-5 py-3 pb-safe-bottom">
        <div className="flex gap-3">
          <button
            onClick={handleSkip}
            className="flex-1 h-[50px] bg-white border-2 border-gray-200 rounded-xl font-semibold text-[15px] text-gray-900 active:scale-[0.97] transition-transform no-tap-highlight"
          >
            Skip for Now
          </button>
          <button
            onClick={handleComplete}
            disabled={!canComplete || loading}
            className="flex-1 h-[50px] bg-orange-600 rounded-xl font-semibold text-[15px] text-white shadow-ios active:scale-[0.97] transition-transform no-tap-highlight disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Saving...' : 'Complete Setup'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PreferencesSetup;