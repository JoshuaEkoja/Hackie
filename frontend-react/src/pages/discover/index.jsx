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
    <div className="min-h-screen bg-gray-50 pb-16 ios-scroll">
      {/* Header */}
      <div className="ios-header">
        <div className="px-3 py-2">
          <div className="flex items-center gap-2 mb-2">
            <button
              onClick={() => navigate(-1)}
              className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center active:bg-gray-200 transition-colors no-tap-highlight"
            >
              <Icon name="ArrowLeft" size={16} color="#6B7280" />
            </button>
            <div className="flex-1">
              <h1 className="text-lg font-bold text-gray-900 leading-tight">Discover</h1>
              <p className="text-xs text-gray-500">Find events near you</p>
            </div>
          </div>

          {/* Filters */}
          <div className="space-y-2">
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
        <div className="bg-orange-50 border-b border-orange-100 px-3 py-2">
          <div className="flex items-center gap-2">
            <Icon name="MapPin" size={12} className="text-orange-600" />
            <span className="text-xs text-gray-700 font-medium">
              {hackathons?.length} near you
            </span>
          </div>
        </div>
      )}

      {/* Results */}
      <div className="px-3 py-2">
        {loading ? (
          <div className="space-y-2">
            {[1, 2, 3]?.map(i => (
              <div key={i} className="ios-card p-2.5 animate-pulse">
                <div className="h-3 bg-gray-200 rounded w-3/4 mb-1.5" />
                <div className="h-2.5 bg-gray-200 rounded w-1/2 mb-2" />
                <div className="h-1.5 bg-gray-200 rounded w-full" />
              </div>
            ))}
          </div>
        ) : hackathons?.length === 0 ? (
          <div className="text-center py-8">
            <div className="w-14 h-14 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <Icon name="Search" size={28} className="text-gray-400" />
            </div>
            <h3 className="font-bold text-sm text-gray-900 mb-1">No hackathons found</h3>
            <p className="text-xs text-gray-600 mb-3 px-6">Try adjusting filters</p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSelectedRadius('100');
              }}
              className="py-2.5 px-4 bg-white border border-gray-200 rounded-lg font-semibold text-xs text-gray-900 active:bg-gray-100 transition-colors no-tap-highlight"
            >
              Reset
            </button>
          </div>
        ) : (
          <div className="space-y-2">
            {hackathons?.map(hackathon => (
              <button
                key={hackathon?.id}
                onClick={() => navigate(`/event/${hackathon?.id}`)}
                className="w-full ios-card p-2.5 active:bg-gray-100 transition-colors no-tap-highlight text-left"
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <h3 className="font-bold text-sm text-gray-900 mb-1.5 leading-tight">{hackathon?.name}</h3>
                    <div className="flex items-center gap-2 text-xs text-gray-600 mb-1">
                      <div className="flex items-center gap-0.5">
                        <Icon name="MapPin" size={11} color="#6B7280" />
                        <span>{hackathon?.location}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-0.5 text-xs text-gray-600">
                      <Icon name="Navigation" size={11} color="#6B7280" />
                      <span>{hackathon?.distance} mi</span>
                    </div>
                  </div>
                  <span className="text-[9px] font-semibold text-orange-600 bg-orange-50 px-2 py-0.5 rounded-full capitalize whitespace-nowrap ml-2">
                    {hackathon?.category?.replace('-', '/')}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-xs text-gray-600 mb-2">
                  <div className="flex items-center gap-0.5">
                    <Icon name="Calendar" size={11} color="#6B7280" />
                    <span className="truncate">{hackathon?.date}</span>
                  </div>
                  <div className="flex items-center gap-0.5">
                    <Icon name="Users" size={11} color="#6B7280" />
                    <span>{hackathon?.participants}</span>
                  </div>
                </div>

                {/* Funding Progress */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-gray-600 font-medium">Funding</span>
                    <span className="font-bold text-orange-600">{hackathon?.fundingProgress}%</span>
                  </div>
                  <div className="w-full h-1 bg-gray-100 rounded-full overflow-hidden">
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