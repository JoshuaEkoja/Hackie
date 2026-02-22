import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import { cn } from '../../utils/cn';

const UserTypeSelection = () => {
  const navigate = useNavigate();
  const [selectedType, setSelectedType] = useState(null);

  const userTypes = [
    {
      id: 'organizer',
      title: "I\'m an Organizer",
      description: 'Create and manage hackathon events, track donations, and engage with participants',
      icon: 'Megaphone',
      benefits: ['Event Management', 'Donation Tracking', 'Analytics Dashboard']
    },
    {
      id: 'participant',
      title: "I\'m a Participant",
      description: 'Discover hackathons, join events, and contribute to innovation projects',
      icon: 'Laptop',
      benefits: ['Event Discovery', 'Easy Registration', 'Support Projects']
    }
  ];

  const handleContinue = () => {
    if (selectedType) {
      navigate('/preferences-setup', { state: { userType: selectedType } });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white flex flex-col ios-scroll">
      {/* Header */}
      <div className="px-5 pt-safe-top pt-8 pb-6 text-center">
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center shadow-ios">
            <Icon name="Rocket" size={32} color="white" />
          </div>
        </div>
        <h1 className="text-[28px] font-bold text-gray-900 mb-2 leading-tight">Join the Innovation Community</h1>
        <p className="text-gray-600 text-[15px] leading-relaxed px-4">Choose how you want to participate in HackBase</p>
      </div>

      {/* Progress Indicator */}
      <div className="px-5 mb-6">
        <div className="flex items-center justify-center gap-2">
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-orange-600 text-white flex items-center justify-center text-sm font-semibold shadow-sm">
              1
            </div>
            <span className="ml-2 text-[13px] font-semibold text-gray-900">User Type</span>
          </div>
          <div className="w-10 h-0.5 bg-gray-300 mx-1" />
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-gray-200 text-gray-500 flex items-center justify-center text-sm font-semibold">
              2
            </div>
            <span className="ml-2 text-[13px] font-medium text-gray-500">Preferences</span>
          </div>
        </div>
      </div>

      {/* Selection Cards */}
      <div className="flex-1 px-4 pb-28 ios-scroll">
        <div className="space-y-3">
          {userTypes?.map((type) => (
            <button
              key={type?.id}
              onClick={() => setSelectedType(type?.id)}
              className={cn(
                'w-full p-5 rounded-2xl border-2 transition-all duration-200 text-left no-tap-highlight',
                'active:scale-[0.98]',
                selectedType === type?.id
                  ? 'border-orange-600 bg-gradient-to-br from-orange-50 to-orange-100 shadow-ios'
                  : 'border-gray-200 bg-white active:bg-gray-50'
              )}
            >
              <div className="flex items-start gap-4">
                <div className={cn(
                  'w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 transition-all duration-200',
                  selectedType === type?.id
                    ? 'bg-orange-600 shadow-md' : 'bg-gray-100'
                )}>
                  <Icon
                    name={type?.icon}
                    size={28}
                    color={selectedType === type?.id ? 'white' : '#6B7280'}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className={cn(
                    'text-[17px] font-semibold mb-2 transition-colors leading-tight',
                    selectedType === type?.id ? 'text-orange-600' : 'text-gray-900'
                  )}>
                    {type?.title}
                  </h3>
                  <p className="text-[14px] text-gray-600 mb-3 leading-relaxed">{type?.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {type?.benefits?.map((benefit, index) => (
                      <span
                        key={index}
                        className={cn(
                          'text-[11px] px-2.5 py-1.5 rounded-full font-medium transition-all duration-200',
                          selectedType === type?.id
                            ? 'bg-orange-600 text-white shadow-sm' : 'bg-gray-100 text-gray-600'
                        )}
                      >
                        {benefit}
                      </span>
                    ))}
                  </div>
                </div>
                {selectedType === type?.id && (
                  <div className="flex-shrink-0">
                    <div className="w-6 h-6 rounded-full bg-orange-600 flex items-center justify-center shadow-sm">
                      <Icon name="Check" size={14} color="white" />
                    </div>
                  </div>
                )}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="fixed bottom-0 left-0 right-0 max-w-[390px] mx-auto bg-white/95 backdrop-blur-lg border-t border-gray-200 px-5 py-3 pb-safe-bottom">
        <Button
          onClick={handleContinue}
          disabled={!selectedType}
          fullWidth
          size="lg"
          className="shadow-ios h-[50px] text-[17px] font-semibold rounded-xl active:scale-[0.97] transition-transform no-tap-highlight"
        >
          Continue
        </Button>
        <p className="text-center text-[12px] text-gray-500 mt-2">
          You can change this later in your profile settings
        </p>
      </div>
    </div>
  );
};

export default UserTypeSelection;