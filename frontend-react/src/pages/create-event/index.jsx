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
    <div className="min-h-screen bg-gray-50 pb-16 ios-scroll">
      {/* Header */}
      <div className="ios-header">
        <div className="px-3 py-2">
          <div className="flex items-center gap-2">
            <button
              onClick={() => step === 1 ? navigate(-1) : handleBack()}
              className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center active:bg-gray-200 transition-colors no-tap-highlight"
            >
              <Icon name="ArrowLeft" size={16} color="#6B7280" />
            </button>
            <div className="flex-1 min-w-0">
              <h1 className="text-lg font-bold text-gray-900 leading-tight truncate">Create Event</h1>
              <p className="text-xs text-gray-500">Step {step} of 3</p>
            </div>
          </div>
        </div>
        
        {/* Progress Bar */}
        <div className="h-0.5 bg-gray-100">
          <div
            className="h-full bg-orange-600 transition-all duration-300"
            style={{ width: `${(step / 3) * 100}%` }}
          />
        </div>
      </div>

      <div className="px-3 py-3">
        {/* Step 1: Basic Info */}
        {step === 1 && (
          <div className="space-y-3">
            <div>
              <h2 className="text-base font-bold text-gray-900 mb-0.5">Basic Information</h2>
              <p className="text-xs text-gray-600">Tell us about your hackathon</p>
            </div>

            <Input
              label="Event Name"
              placeholder="e.g., Tech Hackathon 2026"
              value={formData?.name}
              onChange={(e) => handleInputChange('name', e?.target?.value)}
              required
              className="h-9 text-xs"
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
              className="h-9 text-xs"
            />

            <Input
              label="Max Participants"
              type="number"
              placeholder="e.g., 200"
              value={formData?.maxParticipants}
              onChange={(e) => handleInputChange('maxParticipants', e?.target?.value)}
              className="h-9 text-xs"
            />
          </div>
        )}

        {/* Step 2: Event Details */}
        {step === 2 && (
          <div className="space-y-3">
            <div>
              <h2 className="text-base font-bold text-gray-900 mb-0.5">Event Details</h2>
              <p className="text-xs text-gray-600">When and what is your event about</p>
            </div>

            <Input
              label="Start Date"
              type="date"
              value={formData?.startDate}
              onChange={(e) => handleInputChange('startDate', e?.target?.value)}
              required
              className="h-9 text-xs"
            />

            <Input
              label="End Date"
              type="date"
              value={formData?.endDate}
              onChange={(e) => handleInputChange('endDate', e?.target?.value)}
              required
              className="h-9 text-xs"
            />

            <div>
              <label className="text-xs font-semibold text-gray-900 mb-1.5 block">
                Description <span className="text-red-600">*</span>
              </label>
              <textarea
                placeholder="Describe your hackathon, themes, prizes..."
                value={formData?.description}
                onChange={(e) => handleInputChange('description', e?.target?.value)}
                rows={4}
                className="w-full px-2.5 py-1.5 border border-gray-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 resize-none ios-input no-tap-highlight"
              />
            </div>
          </div>
        )}

        {/* Step 3: Donation Settings */}
        {step === 3 && (
          <div className="space-y-3">
            <div>
              <h2 className="text-base font-bold text-gray-900 mb-0.5">Donation Pool</h2>
              <p className="text-xs text-gray-600">Optional: Enable donations for your event</p>
            </div>

            <div className="ios-card p-2.5">
              <div className="flex items-start gap-2">
                <input
                  type="checkbox"
                  checked={formData?.enableDonations}
                  onChange={(e) => handleInputChange('enableDonations', e?.target?.checked)}
                  className="mt-0.5 h-4 w-4 rounded border-gray-300 text-orange-600 focus:ring-orange-500"
                />
                <div className="flex-1">
                  <h3 className="font-semibold text-xs text-gray-900 mb-0.5">Enable Donation Pool</h3>
                  <p className="text-xs text-gray-600 leading-snug">Allow people to contribute funds to support your hackathon</p>
                </div>
              </div>
            </div>

            {formData?.enableDonations && (
              <div className="space-y-3 animate-fadeIn">
                <Input
                  label="Funding Goal"
                  type="number"
                  placeholder="e.g., 50000"
                  value={formData?.fundingGoal}
                  onChange={(e) => handleInputChange('fundingGoal', e?.target?.value)}
                  required
                  description="Target amount in USD"
                  className="h-9 text-xs"
                />

                <div className="bg-orange-50 rounded-lg p-2.5 border border-orange-100">
                  <h3 className="font-semibold text-xs text-gray-900 mb-2 flex items-center gap-1">
                    <Icon name="CreditCard" size={14} className="text-orange-600" />
                    Payment Methods
                  </h3>
                  
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked
                        disabled
                        className="h-4 w-4 rounded border-gray-300 text-orange-600"
                      />
                      <div className="flex-1">
                        <span className="text-xs font-semibold text-gray-900">Credit/Debit Cards</span>
                        <p className="text-[10px] text-gray-600">Visa, Mastercard, Amex</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={formData?.acceptApplePay}
                        onChange={(e) => handleInputChange('acceptApplePay', e?.target?.checked)}
                        className="h-4 w-4 rounded border-gray-300 text-orange-600 focus:ring-orange-500"
                      />
                      <div className="flex-1">
                        <span className="text-xs font-semibold text-gray-900">Apple Pay</span>
                        <p className="text-[10px] text-gray-600">One-tap mobile payments</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={formData?.acceptCrypto}
                        onChange={(e) => handleInputChange('acceptCrypto', e?.target?.checked)}
                        className="h-4 w-4 rounded border-gray-300 text-orange-600 focus:ring-orange-500"
                      />
                      <div className="flex-1">
                        <span className="text-xs font-semibold text-gray-900">Cryptocurrency</span>
                        <p className="text-[10px] text-gray-600">Solana blockchain</p>
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
      <div className="fixed bottom-0 left-0 right-0 max-w-[390px] mx-auto bg-white/95 backdrop-blur-lg border-t border-gray-200 px-3 py-2 pb-safe-bottom">
        <div className="flex gap-2">
          {step > 1 && (
            <button
              onClick={handleBack}
              className="flex-1 py-2 px-2 bg-white border border-gray-200 rounded-lg font-semibold text-xs text-gray-900 active:bg-gray-100 transition-colors no-tap-highlight"
            >
              Back
            </button>
          )}
          <button
            onClick={step === 3 ? handleSubmit : handleNext}
            disabled={!isStepValid()}
            className="flex-1 py-2 px-2 bg-orange-600 rounded-lg font-semibold text-xs text-white shadow-ios active:bg-orange-700 transition-colors no-tap-highlight disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {step === 3 ? 'Create' : 'Next'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateEvent;