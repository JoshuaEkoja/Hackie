import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';

const UserTypeSelection = () => {
  const navigate = useNavigate();
  const [selectedType, setSelectedType] = useState(null);

  const handleContinue = () => {
    if (selectedType) {
      const route = selectedType === 'organizer' 
        ? '/onboarding-organizer' 
        : '/onboarding-participant';
      navigate(route, { state: { userType: selectedType } });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-blue-50 flex flex-col px-4 pt-safe-top py-8">
      {/* Header */}
      <div className="text-center mb-12 mt-4">
        <div className="mb-4 inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-orange-500 to-orange-600 shadow-lg">
          <Icon name="Zap" size={32} color="white" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-3">Welcome to HackBase</h1>
        <p className="text-gray-600 text-base max-w-sm mx-auto">Choose your role to get started with hackathons</p>
      </div>

      {/* Selection Cards */}
      <div className="flex-1 flex flex-col gap-4 justify-center">
        {/* Organizer Card */}
        <button
          onClick={() => setSelectedType('organizer')}
          className={`relative p-6 rounded-2xl border-2 transition-all duration-300 transform hover:scale-105 ${
            selectedType === 'organizer'
              ? 'border-orange-600 bg-gradient-to-br from-orange-50 to-orange-100 shadow-xl'
              : 'border-gray-200 bg-white shadow-md hover:shadow-lg'
          }`}
        >
          <div className="flex items-start gap-4">
            <div className={`w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
              selectedType === 'organizer' 
                ? 'bg-gradient-to-br from-orange-500 to-orange-600 shadow-lg scale-110' 
                : 'bg-orange-100'
            }`}>
              <Icon name="Users" size={28} color={selectedType === 'organizer' ? 'white' : '#FF6B35'} />
            </div>
            <div className="text-left flex-1">
              <h3 className={`text-lg font-bold transition-colors ${
                selectedType === 'organizer' ? 'text-orange-600' : 'text-gray-900'
              }`}>Event Organizer</h3>
              <p className="text-sm text-gray-600 mt-1">Create & manage hackathons, track donations, engage participants</p>
            </div>
            {selectedType === 'organizer' && (
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-orange-600 flex items-center justify-center animate-pulse">
                <Icon name="Check" size={14} color="white" />
              </div>
            )}
          </div>
        </button>

        {/* Participant Card */}
        <button
          onClick={() => setSelectedType('participant')}
          className={`relative p-6 rounded-2xl border-2 transition-all duration-300 transform hover:scale-105 ${
            selectedType === 'participant'
              ? 'border-blue-600 bg-gradient-to-br from-blue-50 to-blue-100 shadow-xl'
              : 'border-gray-200 bg-white shadow-md hover:shadow-lg'
          }`}
        >
          <div className="flex items-start gap-4">
            <div className={`w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
              selectedType === 'participant' 
                ? 'bg-gradient-to-br from-blue-500 to-blue-600 shadow-lg scale-110' 
                : 'bg-blue-100'
            }`}>
              <Icon name="Zap" size={28} color={selectedType === 'participant' ? 'white' : '#3B82F6'} />
            </div>
            <div className="text-left flex-1">
              <h3 className={`text-lg font-bold transition-colors ${
                selectedType === 'participant' ? 'text-blue-600' : 'text-gray-900'
              }`}>Participant</h3>
              <p className="text-sm text-gray-600 mt-1">Discover events, join hackathons, build projects, win prizes</p>
            </div>
            {selectedType === 'participant' && (
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center animate-pulse">
                <Icon name="Check" size={14} color="white" />
              </div>
            )}
          </div>
        </button>
      </div>

      {/* Bottom Button */}
      <div className="pb-4 mt-8">
        <Button
          onClick={handleContinue}
          disabled={!selectedType}
          fullWidth
          className="h-12 text-base font-semibold shadow-lg"
        >
          Continue
        </Button>
        <p className="text-xs text-center text-gray-500 mt-4">You can change this later in settings</p>
      </div>
    </div>
  );
};

export default UserTypeSelection;