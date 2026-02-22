import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../components/AppIcon';


const Profile = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 pb-24 ios-scroll">
      <div className="ios-header">
        <div className="px-4 py-3">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate(-1)}
              className="ios-touch-target w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center active:bg-gray-200 transition-colors no-tap-highlight"
            >
              <Icon name="ArrowLeft" size={20} color="#6B7280" />
            </button>
            <h1 className="text-[24px] font-bold text-gray-900">Profile</h1>
          </div>
        </div>
      </div>

      <div className="px-4 py-6">
        <div className="ios-card p-8 text-center">
          <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="User" size={40} className="text-orange-600" />
          </div>
          <h2 className="text-[20px] font-bold text-gray-900 mb-2">Welcome to HackBase</h2>
          <p className="text-[14px] text-gray-600">Your profile features are coming soon!</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;