import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../components/AppIcon';

import { getDistance } from 'geolib';

const Home = () => {
  const navigate = useNavigate();
  const [userLocation, setUserLocation] = useState(null);
  const [nearbyHackathons, setNearbyHackathons] = useState([]);
  const [loading, setLoading] = useState(true);

  const mockHackathons = [
    {
      id: 1,
      name: 'SF Tech Hackathon 2026',
      location: 'San Francisco, CA',
      coordinates: { latitude: 37.7749, longitude: -122.4194 },
      date: 'March 15-17, 2026',
      participants: 247,
      fundingGoal: 50000,
      currentFunding: 32450,
      image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800',
      category: 'Technology',
      organizer: 'TechHub SF'
    },
    {
      id: 2,
      name: 'AI Innovation Challenge',
      location: 'New York, NY',
      coordinates: { latitude: 40.7128, longitude: -74.0060 },
      date: 'March 22-24, 2026',
      participants: 189,
      fundingGoal: 75000,
      currentFunding: 68200,
      image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800',
      category: 'AI/ML',
      organizer: 'AI Labs NYC'
    },
    {
      id: 3,
      name: 'Green Tech Summit',
      location: 'Seattle, WA',
      coordinates: { latitude: 47.6062, longitude: -122.3321 },
      date: 'April 5-7, 2026',
      participants: 156,
      fundingGoal: 40000,
      currentFunding: 15800,
      image: 'https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?w=800',
      category: 'Sustainability',
      organizer: 'EcoTech Seattle'
    },
    {
      id: 4,
      name: 'Web3 Builder Fest',
      location: 'Austin, TX',
      coordinates: { latitude: 30.2672, longitude: -97.7431 },
      date: 'April 12-14, 2026',
      participants: 312,
      fundingGoal: 100000,
      currentFunding: 89500,
      image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800',
      category: 'Blockchain',
      organizer: 'Crypto Austin'
    }
  ];

  useEffect(() => {
    if (navigator?.geolocation) {
      navigator?.geolocation?.getCurrentPosition(
        (position) => {
          setUserLocation({
            latitude: position?.coords?.latitude,
            longitude: position?.coords?.longitude
          });
        },
        () => {
          setUserLocation({ latitude: 37.7749, longitude: -122.4194 });
        }
      );
    } else {
      setUserLocation({ latitude: 37.7749, longitude: -122.4194 });
    }
  }, []);

  useEffect(() => {
    if (userLocation) {
      const sorted = mockHackathons?.map(hackathon => {
        const distance = getDistance(userLocation, hackathon?.coordinates);
        return { ...hackathon, distance: (distance / 1609.34)?.toFixed(1) };
      })?.sort((a, b) => parseFloat(a?.distance) - parseFloat(b?.distance));
      
      setNearbyHackathons(sorted);
      setLoading(false);
    }
  }, [userLocation]);

  const calculateProgress = (current, goal) => {
    return ((current / goal) * 100)?.toFixed(0);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    })?.format(amount);
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-24 ios-scroll">
      {/* Header */}
      <div className="ios-header">
        <div className="px-4 py-3">
          <div className="flex items-center justify-between mb-3">
            <h1 className="text-[28px] font-bold text-gray-900">HackBase</h1>
            <button
              onClick={() => navigate('/profile')}
              className="ios-touch-target w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center active:bg-gray-200 transition-colors no-tap-highlight"
            >
              <Icon name="User" size={20} color="#6B7280" />
            </button>
          </div>
          <div className="relative">
            <Icon name="Search" size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search hackathons..."
              className="w-full pl-10 pr-4 h-[44px] bg-gray-100 rounded-xl text-[15px] focus:outline-none focus:ring-2 focus:ring-orange-500 focus:bg-white transition-all no-tap-highlight"
            />
          </div>
        </div>
      </div>

      {/* Location Banner */}
      {userLocation && (
        <div className="bg-orange-50 border-b border-orange-100 px-4 py-2.5">
          <div className="flex items-center gap-2 text-[13px]">
            <Icon name="MapPin" size={14} className="text-orange-600" />
            <span className="text-gray-700 font-medium">Showing hackathons near you</span>
          </div>
        </div>
      )}

      {/* Quick Actions */}
      <div className="px-4 py-4">
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => navigate('/create-event')}
            className="h-[88px] bg-orange-600 rounded-2xl flex flex-col items-center justify-center gap-2 shadow-ios active:scale-[0.97] transition-transform no-tap-highlight"
          >
            <Icon name="Plus" size={28} color="white" />
            <span className="text-[15px] font-semibold text-white">Create Event</span>
          </button>
          <button
            onClick={() => navigate('/discover')}
            className="h-[88px] bg-white border-2 border-orange-200 rounded-2xl flex flex-col items-center justify-center gap-2 shadow-ios active:scale-[0.97] transition-transform no-tap-highlight"
          >
            <Icon name="Compass" size={28} color="#FF6B35" />
            <span className="text-[15px] font-semibold text-orange-600">Discover</span>
          </button>
        </div>
      </div>

      {/* Hackathon Feed */}
      <div className="px-4 pb-4">
        <h2 className="text-[20px] font-bold text-gray-900 mb-3">Nearby Hackathons</h2>
        
        {loading ? (
          <div className="space-y-3">
            {[1, 2, 3]?.map(i => (
              <div key={i} className="ios-card p-0 overflow-hidden animate-pulse">
                <div className="h-40 bg-gray-200" />
                <div className="p-4">
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
                  <div className="h-3 bg-gray-200 rounded w-1/2" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-3">
            {nearbyHackathons?.map(hackathon => {
              const progress = calculateProgress(hackathon?.currentFunding, hackathon?.fundingGoal);
              
              return (
                <button
                  key={hackathon?.id}
                  onClick={() => navigate(`/event/${hackathon?.id}`)}
                  className="w-full ios-card p-0 overflow-hidden active:scale-[0.98] transition-transform no-tap-highlight"
                >
                  <div className="relative h-40">
                    <img
                      src={hackathon?.image}
                      alt={`${hackathon?.name} event banner`}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full text-[11px] font-semibold text-gray-700">
                      {hackathon?.category}
                    </div>
                    {hackathon?.distance && (
                      <div className="absolute bottom-3 left-3 bg-black/75 backdrop-blur-sm px-3 py-1.5 rounded-full text-[11px] font-semibold text-white flex items-center gap-1">
                        <Icon name="MapPin" size={10} color="white" />
                        {hackathon?.distance} mi away
                      </div>
                    )}
                  </div>
                  
                  <div className="p-4 text-left">
                    <h3 className="font-bold text-[17px] text-gray-900 mb-2 leading-tight">{hackathon?.name}</h3>
                    <div className="flex items-center gap-4 text-[13px] text-gray-600 mb-3">
                      <div className="flex items-center gap-1">
                        <Icon name="Calendar" size={13} color="#6B7280" />
                        <span>{hackathon?.date}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Icon name="Users" size={13} color="#6B7280" />
                        <span>{hackathon?.participants}</span>
                      </div>
                    </div>
                    
                    {/* Funding Progress */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-[13px]">
                        <span className="text-gray-600 font-medium">Funding Progress</span>
                        <span className="font-bold text-orange-600">{progress}%</span>
                      </div>
                      <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-orange-500 to-orange-600 rounded-full transition-all"
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                      <div className="flex items-center justify-between text-[11px] text-gray-500">
                        <span className="font-medium">{formatCurrency(hackathon?.currentFunding)} raised</span>
                        <span>Goal: {formatCurrency(hackathon?.fundingGoal)}</span>
                      </div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;