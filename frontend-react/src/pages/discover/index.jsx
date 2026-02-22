import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../components/AppIcon';

import Select from '../../components/ui/Select';
import { getDistance } from 'geolib';

const Discover = () => {
  const navigate = useNavigate();
  const [userLocation, setUserLocation] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedRadius, setSelectedRadius] = useState('50');
  const [hackathons, setHackathons] = useState([]);
  const [loading, setLoading] = useState(true);

  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'technology', label: 'Technology' },
    { value: 'ai-ml', label: 'AI/ML' },
    { value: 'blockchain', label: 'Blockchain' },
    { value: 'sustainability', label: 'Sustainability' },
    { value: 'healthcare', label: 'Healthcare' }
  ];

  const radiusOptions = [
    { value: '10', label: '10 miles' },
    { value: '25', label: '25 miles' },
    { value: '50', label: '50 miles' },
    { value: '100', label: '100 miles' },
    { value: '500', label: '500 miles' }
  ];

  const mockHackathons = [
    {
      id: 1,
      name: 'SF Tech Hackathon 2026',
      location: 'San Francisco, CA',
      coordinates: { latitude: 37.7749, longitude: -122.4194 },
      date: 'March 15-17, 2026',
      category: 'technology',
      participants: 247,
      fundingProgress: 65
    },
    {
      id: 2,
      name: 'AI Innovation Challenge',
      location: 'New York, NY',
      coordinates: { latitude: 40.7128, longitude: -74.0060 },
      date: 'March 22-24, 2026',
      category: 'ai-ml',
      participants: 189,
      fundingProgress: 91
    },
    {
      id: 3,
      name: 'Green Tech Summit',
      location: 'Seattle, WA',
      coordinates: { latitude: 47.6062, longitude: -122.3321 },
      date: 'April 5-7, 2026',
      category: 'sustainability',
      participants: 156,
      fundingProgress: 40
    },
    {
      id: 4,
      name: 'Web3 Builder Fest',
      location: 'Austin, TX',
      coordinates: { latitude: 30.2672, longitude: -97.7431 },
      date: 'April 12-14, 2026',
      category: 'blockchain',
      participants: 312,
      fundingProgress: 90
    },
    {
      id: 5,
      name: 'HealthTech Innovation',
      location: 'Boston, MA',
      coordinates: { latitude: 42.3601, longitude: -71.0589 },
      date: 'April 20-22, 2026',
      category: 'healthcare',
      participants: 198,
      fundingProgress: 55
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
      const filtered = mockHackathons
        ?.map(hackathon => {
          const distance = getDistance(userLocation, hackathon?.coordinates);
          return { ...hackathon, distance: (distance / 1609.34)?.toFixed(1) };
        })
        ?.filter(hackathon => {
          const withinRadius = parseFloat(hackathon?.distance) <= parseFloat(selectedRadius);
          const matchesCategory = selectedCategory === 'all' || hackathon?.category === selectedCategory;
          return withinRadius && matchesCategory;
        })
        ?.sort((a, b) => parseFloat(a?.distance) - parseFloat(b?.distance));
      
      setHackathons(filtered);
      setLoading(false);
    }
  }, [userLocation, selectedCategory, selectedRadius]);

  return (
    <div className="min-h-screen bg-gray-50 pb-24 ios-scroll">
      {/* Header */}
      <div className="ios-header">
        <div className="px-4 py-3">
          <div className="flex items-center gap-3 mb-4">
            <button
              onClick={() => navigate(-1)}
              className="ios-touch-target w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center active:bg-gray-200 transition-colors no-tap-highlight"
            >
              <Icon name="ArrowLeft" size={20} color="#6B7280" />
            </button>
            <div className="flex-1">
              <h1 className="text-[24px] font-bold text-gray-900 leading-tight">Discover Hackathons</h1>
              <p className="text-[13px] text-gray-500">Find events near you</p>
            </div>
          </div>

          {/* Filters */}
          <div className="space-y-3">
            <Select
              placeholder="Category"
              options={categories}
              value={selectedCategory}
              onChange={setSelectedCategory}
            />
            <Select
              placeholder="Radius"
              options={radiusOptions}
              value={selectedRadius}
              onChange={setSelectedRadius}
            />
          </div>
        </div>
      </div>

      {/* Location Info */}
      {userLocation && (
        <div className="bg-orange-50 border-b border-orange-100 px-4 py-2.5">
          <div className="flex items-center gap-2">
            <Icon name="MapPin" size={14} className="text-orange-600" />
            <span className="text-[13px] text-gray-700 font-medium">
              Showing {hackathons?.length} hackathons within {selectedRadius} miles
            </span>
          </div>
        </div>
      )}

      {/* Results */}
      <div className="px-4 py-4">
        {loading ? (
          <div className="space-y-3">
            {[1, 2, 3]?.map(i => (
              <div key={i} className="ios-card p-4 animate-pulse">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
                <div className="h-3 bg-gray-200 rounded w-1/2 mb-3" />
                <div className="h-2 bg-gray-200 rounded w-full" />
              </div>
            ))}
          </div>
        ) : hackathons?.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="Search" size={32} className="text-gray-400" />
            </div>
            <h3 className="font-bold text-[17px] text-gray-900 mb-2">No hackathons found</h3>
            <p className="text-[14px] text-gray-600 mb-4 px-8">Try adjusting your filters or search radius</p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSelectedRadius('100');
              }}
              className="h-[44px] px-6 bg-white border-2 border-gray-200 rounded-xl font-semibold text-[15px] text-gray-900 active:scale-[0.97] transition-transform no-tap-highlight"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {hackathons?.map(hackathon => (
              <button
                key={hackathon?.id}
                onClick={() => navigate(`/event/${hackathon?.id}`)}
                className="w-full ios-card p-4 active:scale-[0.98] transition-transform no-tap-highlight text-left"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="font-bold text-[17px] text-gray-900 mb-2 leading-tight">{hackathon?.name}</h3>
                    <div className="flex items-center gap-3 text-[13px] text-gray-600">
                      <div className="flex items-center gap-1">
                        <Icon name="MapPin" size={13} color="#6B7280" />
                        <span>{hackathon?.location}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Icon name="Navigation" size={13} color="#6B7280" />
                        <span>{hackathon?.distance} mi</span>
                      </div>
                    </div>
                  </div>
                  <span className="text-[11px] font-semibold text-orange-600 bg-orange-50 px-2.5 py-1.5 rounded-full capitalize whitespace-nowrap ml-2">
                    {hackathon?.category?.replace('-', '/')}
                  </span>
                </div>

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
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-[12px]">
                    <span className="text-gray-600 font-medium">Funding Progress</span>
                    <span className="font-bold text-orange-600">{hackathon?.fundingProgress}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-orange-500 to-orange-600 rounded-full"
                      style={{ width: `${hackathon?.fundingProgress}%` }}
                    />
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Discover;