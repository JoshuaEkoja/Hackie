import React, { useState, useEffect } from 'react';
import MetricCard from './components/MetricCard';
import TrendChart from './components/TrendChart';
import GeographicHeatMap from './components/GeographicHeatMap';
import FilterControls from './components/FilterControls';
import ActivityFeed from './components/ActivityFeed';

const MainAnalyticsDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [realTimeStatus, setRealTimeStatus] = useState('connected');
  const [filters, setFilters] = useState({
    category: 'all',
    region: 'all',
    refreshInterval: 'realtime'
  });

  const kpiMetrics = [
  {
    id: 1,
    title: "Active Hackathons",
    value: "247",
    change: "+12.5%",
    changeType: "positive",
    icon: "Zap",
    trend: [12, 19, 15, 23, 18, 25, 22, 28, 24, 30]
  },
  {
    id: 2,
    title: "Total Registrations",
    value: "18,542",
    change: "+8.3%",
    changeType: "positive",
    icon: "Users",
    trend: [15, 22, 18, 26, 20, 28, 24, 32, 28, 35]
  },
  {
    id: 3,
    title: "Donation Volume",
    value: "$342.5K",
    change: "+15.7%",
    changeType: "positive",
    icon: "DollarSign",
    trend: [10, 15, 12, 20, 16, 24, 20, 28, 25, 32]
  },
  {
    id: 4,
    title: "AI Chat Interactions",
    value: "52,847",
    change: "-2.1%",
    changeType: "negative",
    icon: "MessageSquare",
    trend: [25, 28, 24, 30, 26, 32, 28, 26, 24, 22]
  }];


  const chartData = [
  { date: "Jan 15", discoveries: 1240, registrations: 856 },
  { date: "Jan 22", discoveries: 1580, registrations: 1024 },
  { date: "Jan 29", discoveries: 1420, registrations: 945 },
  { date: "Feb 5", discoveries: 1890, registrations: 1256 },
  { date: "Feb 12", discoveries: 1650, registrations: 1108 },
  { date: "Feb 19", discoveries: 2140, registrations: 1487 },
  { date: "Feb 26", discoveries: 1980, registrations: 1342 }];


  const geographicData = [
  {
    id: 1,
    name: "San Francisco",
    country: "USA",
    hackathons: 45,
    participants: 3240,
    growth: 18.5
  },
  {
    id: 2,
    name: "London",
    country: "UK",
    hackathons: 38,
    participants: 2856,
    growth: 12.3
  },
  {
    id: 3,
    name: "Bangalore",
    country: "India",
    hackathons: 52,
    participants: 4120,
    growth: 24.7
  },
  {
    id: 4,
    name: "Berlin",
    country: "Germany",
    hackathons: 31,
    participants: 2145,
    growth: 8.9
  },
  {
    id: 5,
    name: "Singapore",
    country: "Singapore",
    hackathons: 28,
    participants: 1987,
    growth: 15.2
  },
  {
    id: 6,
    name: "Toronto",
    country: "Canada",
    hackathons: 34,
    participants: 2534,
    growth: -3.4
  }];


  const [activities, setActivities] = useState([
  {
    id: 1,
    type: "registration",
    user: "Sarah Chen",
    action: "registered for AI Innovation Summit 2026",
    timestamp: new Date(Date.now() - 120000),
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_10d60e496-1763295319842.png",
    avatarAlt: "Professional headshot of Asian woman with long black hair wearing white blouse and warm smile"
  },
  {
    id: 2,
    type: "donation",
    user: "Michael Rodriguez",
    action: "donated to Blockchain Builders Hackathon",
    timestamp: new Date(Date.now() - 240000),
    amount: "$250",
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_17b3c9c38-1763299336236.png",
    avatarAlt: "Professional headshot of Hispanic man with short dark hair in navy blue suit"
  },
  {
    id: 3,
    type: "chat",
    user: "Emma Thompson",
    action: "asked about Web3 hackathon eligibility criteria",
    timestamp: new Date(Date.now() - 360000),
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1de93534e-1763301290608.png",
    avatarAlt: "Professional headshot of Caucasian woman with blonde hair wearing gray blazer"
  },
  {
    id: 4,
    type: "registration",
    user: "David Kim",
    action: "joined Mobile App Development Challenge",
    timestamp: new Date(Date.now() - 480000),
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_161e90cc7-1763294253846.png",
    avatarAlt: "Professional headshot of Asian man with glasses wearing black turtleneck"
  },
  {
    id: 5,
    type: "donation",
    user: "Lisa Anderson",
    action: "sponsored Climate Tech Hackathon",
    timestamp: new Date(Date.now() - 600000),
    amount: "$500",
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1436c4089-1763294954354.png",
    avatarAlt: "Professional headshot of African American woman with curly hair wearing blue business suit"
  }]
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (filters?.refreshInterval === 'realtime' && realTimeStatus === 'connected') {
      const interval = setInterval(() => {
        const newActivity = {
          id: Date.now(),
          type: ['registration', 'donation', 'chat']?.[Math.floor(Math.random() * 3)],
          user: ['Alex Johnson', 'Maria Garcia', 'James Wilson', 'Priya Patel']?.[Math.floor(Math.random() * 4)],
          action: [
          'registered for IoT Innovation Challenge',
          'donated to Gaming Hackathon',
          'asked about prize distribution',
          'joined Cybersecurity Sprint']?.[
          Math.floor(Math.random() * 4)],
          timestamp: new Date(),
          amount: Math.random() > 0.5 ? `$${Math.floor(Math.random() * 500) + 50}` : null,
          avatar: `https://randomuser.me/api/portraits/${Math.random() > 0.5 ? 'women' : 'men'}/${Math.floor(Math.random() * 70)}.jpg`,
          avatarAlt: "Professional headshot of person in business attire with friendly expression"
        };

        setActivities((prev) => [newActivity, ...prev?.slice(0, 9)]);
      }, 15000);

      return () => clearInterval(interval);
    }
  }, [filters?.refreshInterval, realTimeStatus]);

  const handleFilterChange = (newFilters) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setRefreshing(false);
  };

  return (
    <div className="space-y-6 md:space-y-8">
      <div>
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold mb-2">
          Platform Analytics
        </h1>
        <p className="text-base md:text-lg text-muted-foreground">
          Real-time insights across hackathon discovery, engagement, and community growth
        </p>
      </div>
      <FilterControls
        filters={filters}
        onFilterChange={handleFilterChange}
        onRefresh={handleRefresh}
        refreshing={refreshing} />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {kpiMetrics?.map((metric) =>
        <MetricCard key={metric?.id} {...metric} loading={loading} />
        )}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
        <div className="lg:col-span-2">
          <div className="card">
            <div className="mb-6">
              <h2 className="text-xl md:text-2xl font-semibold mb-2">
                Discovery & Registration Trends
              </h2>
              <p className="caption text-muted-foreground">
                Weekly hackathon discovery patterns with registration conversion overlay
              </p>
            </div>
            <TrendChart data={chartData} loading={loading} />
          </div>
        </div>

        <div className="lg:col-span-1">
          <ActivityFeed activities={activities} loading={loading} />
        </div>
      </div>
      <div className="card">
        <div className="mb-6">
          <h2 className="text-xl md:text-2xl font-semibold mb-2">
            Geographic Distribution
          </h2>
          <p className="caption text-muted-foreground">
            Regional hackathon activity and participant engagement metrics
          </p>
        </div>
        <GeographicHeatMap regions={geographicData} loading={loading} />
      </div>
    </div>);

};

export default MainAnalyticsDashboard;