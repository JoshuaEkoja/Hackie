import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../components/AppIcon';


const Profile = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 pb-16 ios-scroll">
      <div className="ios-header">
        <div className="px-3 py-2">
          <div className="flex items-center gap-2">
            <button
              onClick={() => navigate(-1)}
              className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center active:bg-gray-200 transition-colors no-tap-highlight"
            >
              <Icon name="ArrowLeft" size={16} color="#6B7280" />
            </button>
            <h1 className="text-lg font-bold text-gray-900">Profile</h1>
          </div>
        </div>
      </div>

      <div className="px-3 py-4">
        <div className="ios-card p-4 text-center">
          <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-2">
            <Icon name="User" size={32} className="text-orange-600" />
          </div>
          <h2 className="text-base font-bold text-gray-900 mb-1">Welcome to HackBase</h2>
          <p className="text-xs text-gray-600">Your profile features coming soon!</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;