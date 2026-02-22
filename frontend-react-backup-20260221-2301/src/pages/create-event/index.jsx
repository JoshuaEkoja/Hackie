import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../components/AppIcon';

import Input from '../../components/ui/Input';
import Select from '../../components/ui/Select';

const CreateEvent = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    location: '',
    startDate: '',
    endDate: '',
    description: '',
    maxParticipants: '',
    enableDonations: false,
    fundingGoal: '',
    acceptCrypto: false,
    acceptApplePay: true
  });

  const categories = [
    { value: 'technology', label: 'Technology' },
    { value: 'ai-ml', label: 'AI/ML' },
    { value: 'blockchain', label: 'Blockchain' },
    { value: 'sustainability', label: 'Sustainability' },
    { value: 'healthcare', label: 'Healthcare' },
    { value: 'education', label: 'Education' },
    { value: 'fintech', label: 'FinTech' },
    { value: 'other', label: 'Other' }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = () => {
    console.log('Event created:', formData);
    navigate('/');
  };

  const isStepValid = () => {
    if (step === 1) {
      return formData?.name && formData?.category && formData?.location;
    }
    if (step === 2) {
      return formData?.startDate && formData?.endDate && formData?.description;
    }
    if (step === 3) {
      return !formData?.enableDonations || formData?.fundingGoal;
    }
    return false;
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-28 ios-scroll">
      {/* Header */}
      <div className="ios-header">
        <div className="px-4 py-3">
          <div className="flex items-center gap-3">
            <button
              onClick={() => step === 1 ? navigate(-1) : handleBack()}
              className="ios-touch-target w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center active:bg-gray-200 transition-colors no-tap-highlight"
            >
              <Icon name="ArrowLeft" size={20} color="#6B7280" />
            </button>
            <div className="flex-1">
              <h1 className="text-[24px] font-bold text-gray-900 leading-tight">Create Event</h1>
              <p className="text-[13px] text-gray-500">Step {step} of 3</p>
            </div>
          </div>
        </div>
        
        {/* Progress Bar */}
        <div className="h-1 bg-gray-100">
          <div
            className="h-full bg-orange-600 transition-all duration-300"
            style={{ width: `${(step / 3) * 100}%` }}
          />
        </div>
      </div>

      <div className="px-4 py-5">
        {/* Step 1: Basic Info */}
        {step === 1 && (
          <div className="space-y-4">
            <div>
              <h2 className="text-[20px] font-bold text-gray-900 mb-1">Basic Information</h2>
              <p className="text-[14px] text-gray-600">Tell us about your hackathon</p>
            </div>

            <Input
              label="Event Name"
              placeholder="e.g., SF Tech Hackathon 2026"
              value={formData?.name}
              onChange={(e) => handleInputChange('name', e?.target?.value)}
              required
              className="h-[50px] text-[15px]"
            />

            <Select
              label="Category"
              placeholder="Select a category"
              options={categories}
              value={formData?.category}
              onChange={(value) => handleInputChange('category', value)}
              required
            />

            <Input
              label="Location"
              placeholder="e.g., San Francisco, CA"
              value={formData?.location}
              onChange={(e) => handleInputChange('location', e?.target?.value)}
              required
              className="h-[50px] text-[15px]"
            />

            <Input
              label="Max Participants"
              type="number"
              placeholder="e.g., 200"
              value={formData?.maxParticipants}
              onChange={(e) => handleInputChange('maxParticipants', e?.target?.value)}
              className="h-[50px] text-[15px]"
            />
          </div>
        )}

        {/* Step 2: Event Details */}
        {step === 2 && (
          <div className="space-y-4">
            <div>
              <h2 className="text-[20px] font-bold text-gray-900 mb-1">Event Details</h2>
              <p className="text-[14px] text-gray-600">When and what is your event about</p>
            </div>

            <Input
              label="Start Date"
              type="date"
              value={formData?.startDate}
              onChange={(e) => handleInputChange('startDate', e?.target?.value)}
              required
              className="h-[50px] text-[15px]"
            />

            <Input
              label="End Date"
              type="date"
              value={formData?.endDate}
              onChange={(e) => handleInputChange('endDate', e?.target?.value)}
              required
              className="h-[50px] text-[15px]"
            />

            <div>
              <label className="text-[15px] font-semibold text-gray-900 mb-2 block">
                Description <span className="text-red-600">*</span>
              </label>
              <textarea
                placeholder="Describe your hackathon, themes, prizes, and what participants can expect..."
                value={formData?.description}
                onChange={(e) => handleInputChange('description', e?.target?.value)}
                rows={6}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-[15px] focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 resize-none ios-input no-tap-highlight"
              />
            </div>
          </div>
        )}

        {/* Step 3: Donation Settings */}
        {step === 3 && (
          <div className="space-y-4">
            <div>
              <h2 className="text-[20px] font-bold text-gray-900 mb-1">Donation Pool</h2>
              <p className="text-[14px] text-gray-600">Optional: Enable donations for your event</p>
            </div>

            <div className="ios-card p-4">
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  checked={formData?.enableDonations}
                  onChange={(e) => handleInputChange('enableDonations', e?.target?.checked)}
                  className="mt-1 h-5 w-5 rounded-lg border-gray-300 text-orange-600 focus:ring-orange-500"
                />
                <div className="flex-1">
                  <h3 className="font-semibold text-[15px] text-gray-900 mb-1">Enable Donation Pool</h3>
                  <p className="text-[13px] text-gray-600 leading-relaxed">Allow people to contribute funds to support your hackathon</p>
                </div>
              </div>
            </div>

            {formData?.enableDonations && (
              <div className="space-y-4 animate-fadeIn">
                <Input
                  label="Funding Goal"
                  type="number"
                  placeholder="e.g., 50000"
                  value={formData?.fundingGoal}
                  onChange={(e) => handleInputChange('fundingGoal', e?.target?.value)}
                  required
                  description="Target amount in USD"
                  className="h-[50px] text-[15px]"
                />

                <div className="bg-orange-50 rounded-2xl p-4 border-2 border-orange-100">
                  <h3 className="font-semibold text-[15px] text-gray-900 mb-3 flex items-center gap-2">
                    <Icon name="CreditCard" size={18} className="text-orange-600" />
                    Payment Methods
                  </h3>
                  
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked
                        disabled
                        className="h-5 w-5 rounded-lg border-gray-300 text-orange-600"
                      />
                      <div className="flex-1">
                        <span className="text-[14px] font-semibold text-gray-900">Credit/Debit Cards</span>
                        <p className="text-[12px] text-gray-600">Visa, Mastercard, Amex</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={formData?.acceptApplePay}
                        onChange={(e) => handleInputChange('acceptApplePay', e?.target?.checked)}
                        className="h-5 w-5 rounded-lg border-gray-300 text-orange-600 focus:ring-orange-500"
                      />
                      <div className="flex-1">
                        <span className="text-[14px] font-semibold text-gray-900">Apple Pay</span>
                        <p className="text-[12px] text-gray-600">One-tap mobile payments</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={formData?.acceptCrypto}
                        onChange={(e) => handleInputChange('acceptCrypto', e?.target?.checked)}
                        className="h-5 w-5 rounded-lg border-gray-300 text-orange-600 focus:ring-orange-500"
                      />
                      <div className="flex-1">
                        <span className="text-[14px] font-semibold text-gray-900">Cryptocurrency</span>
                        <p className="text-[12px] text-gray-600">Solana blockchain</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Bottom Actions */}
      <div className="fixed bottom-0 left-0 right-0 max-w-[390px] mx-auto bg-white/95 backdrop-blur-lg border-t border-gray-200 px-4 py-3 pb-safe-bottom">
        <div className="flex gap-3">
          {step > 1 && (
            <button
              onClick={handleBack}
              className="flex-1 h-[50px] bg-white border-2 border-gray-200 rounded-xl font-semibold text-[15px] text-gray-900 active:scale-[0.97] transition-transform no-tap-highlight"
            >
              Back
            </button>
          )}
          <button
            onClick={step === 3 ? handleSubmit : handleNext}
            disabled={!isStepValid()}
            className="flex-1 h-[50px] bg-orange-600 rounded-xl font-semibold text-[15px] text-white shadow-ios active:scale-[0.97] transition-transform no-tap-highlight disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {step === 3 ? 'Create Event' : 'Next'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateEvent;