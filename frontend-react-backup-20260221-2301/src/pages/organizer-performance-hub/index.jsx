import React, { useState, useEffect } from 'react';
import Icon from '../../components/AppIcon';
import MetricsCard from './components/MetricsCard';
import EventSelector from './components/EventSelector';
import ComparisonToggle from './components/ComparisonToggle';
import ParticipantJourneyChart from './components/ParticipantJourneyChart';
import OrganizerLeaderboard from './components/OrganizerLeaderboard';
import ParticipantBehaviorHeatmap from './components/ParticipantBehaviorHeatmap';
import AdvancedFilters from './components/AdvancedFilters';
import ExportControls from './components/ExportControls';

const OrganizerPerformanceHub = () => {
  const [selectedEvent, setSelectedEvent] = useState('event-1');
  const [comparisonMode, setComparisonMode] = useState('event');
  const [lastUpdate, setLastUpdate] = useState(new Date());

  const mockEvents = [
  {
    id: "event-1",
    name: "AI Innovation Hackathon 2026",
    organizer: "TechVentures Inc",
    participants: 450,
    date: "Jan 15-17, 2026",
    organizerImage: "https://img.rocket.new/generatedImages/rocket_gen_img_1f383ff29-1763295330729.png",
    organizerImageAlt: "Professional headshot of Hispanic man with short black hair wearing navy blue suit and white shirt",
    engagementScore: 92
  },
  {
    id: "event-2",
    name: "Blockchain Summit Hack",
    organizer: "CryptoLabs",
    participants: 380,
    date: "Jan 22-24, 2026",
    organizerImage: "https://img.rocket.new/generatedImages/rocket_gen_img_10d60e496-1763295319842.png",
    organizerImageAlt: "Professional headshot of Asian woman with long black hair wearing red blazer and white blouse",
    engagementScore: 88
  },
  {
    id: "event-3",
    name: "Green Tech Challenge",
    organizer: "EcoInnovate",
    participants: 320,
    date: "Feb 5-7, 2026",
    organizerImage: "https://img.rocket.new/generatedImages/rocket_gen_img_18d854688-1763295573707.png",
    organizerImageAlt: "Professional headshot of African American man with short hair wearing gray suit and blue tie",
    engagementScore: 85
  },
  {
    id: "event-4",
    name: "HealthTech Innovators",
    organizer: "MedTech Solutions",
    participants: 290,
    date: "Feb 12-14, 2026",
    organizerImage: "https://img.rocket.new/generatedImages/rocket_gen_img_16e75c406-1763294340369.png",
    organizerImageAlt: "Professional headshot of Caucasian woman with blonde hair wearing black blazer and pearl necklace",
    engagementScore: 81
  },
  {
    id: "event-5",
    name: "EdTech Revolution",
    organizer: "Learning Labs",
    participants: 410,
    date: "Feb 19-21, 2026",
    organizerImage: "https://img.rocket.new/generatedImages/rocket_gen_img_1c7263203-1763291891265.png",
    organizerImageAlt: "Professional headshot of Middle Eastern man with beard wearing dark blue suit and striped tie",
    engagementScore: 79
  }];


  const mockMetrics = [
  {
    title: "Registration Conversion",
    value: "68.5%",
    change: "+12.3%",
    changeType: "increase",
    icon: "UserPlus",
    trend: "vs. previous event",
    threshold: "green"
  },
  {
    title: "Satisfaction Score",
    value: "4.7/5.0",
    change: "+0.3",
    changeType: "increase",
    icon: "Star",
    trend: "from 2,340 responses",
    threshold: "green"
  },
  {
    title: "Completion Rate",
    value: "82.4%",
    change: "-3.2%",
    changeType: "decrease",
    icon: "CheckCircle",
    trend: "370 projects submitted",
    threshold: "amber"
  },
  {
    title: "Revenue per Participant",
    value: "$145",
    change: "+$23",
    changeType: "increase",
    icon: "DollarSign",
    trend: "total revenue $65,250",
    threshold: "green"
  }];


  const mockJourneyData = [
  { stage: "Discovery", participants: 1250, completed: 1100, dropped: 150 },
  { stage: "Registration", participants: 1100, completed: 850, dropped: 250 },
  { stage: "Onboarding", participants: 850, completed: 720, dropped: 130 },
  { stage: "Team Formation", participants: 720, completed: 680, dropped: 40 },
  { stage: "Project Start", participants: 680, completed: 620, dropped: 60 },
  { stage: "Mid-Event", participants: 620, completed: 580, dropped: 40 },
  { stage: "Submission", participants: 580, completed: 450, dropped: 130 },
  { stage: "Completion", participants: 450, completed: 450, dropped: 0 }];


  const mockHeatmapData = {
    days: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    timeSlots: ["6-9 AM", "9-12 PM", "12-3 PM", "3-6 PM", "6-9 PM", "9-12 AM"],
    values: [
    [25, 30, 28, 32, 35, 45, 40],
    [45, 55, 60, 65, 70, 75, 65],
    [65, 75, 85, 90, 88, 82, 70],
    [80, 88, 92, 95, 90, 85, 75],
    [70, 75, 80, 85, 82, 78, 68],
    [40, 45, 50, 55, 58, 62, 55]]

  };

  useEffect(() => {
    const interval = setInterval(() => {
      setLastUpdate(new Date());
    }, 1800000);

    return () => clearInterval(interval);
  }, []);

  const handleStageClick = (stage) => {
    console.log("Stage clicked:", stage);
  };

  const handleApplyFilters = (appliedFilters) => {
    console.log("Filters applied:", appliedFilters);
  };

  const handleSaveBookmark = (bookmarkFilters) => {
    console.log("Bookmark saved:", bookmarkFilters);
  };

  const handleExport = async (format) => {
    console.log(`Exporting data as ${format}...`);
    await new Promise((resolve) => setTimeout(resolve, 2000));
  };

  return (
    <div className="space-y-6 md:space-y-8">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-semibold mb-2">
            Organizer Performance Hub
          </h1>
          <p className="text-sm md:text-base text-muted-foreground caption">
            Comprehensive event analytics and ROI tracking
          </p>
        </div>
        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          <Icon name="Clock" size={16} />
          <span>Last updated: {lastUpdate?.toLocaleTimeString()}</span>
        </div>
      </div>
      <div className="flex flex-col lg:flex-row gap-4 lg:items-end">
        <EventSelector
          selectedEvent={selectedEvent}
          onEventChange={setSelectedEvent}
          events={mockEvents} />
        
        <ComparisonToggle
          mode={comparisonMode}
          onModeChange={setComparisonMode} />
        
        <div className="lg:ml-auto">
          <ExportControls onExport={handleExport} />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {mockMetrics?.map((metric, index) =>
        <MetricsCard key={index} {...metric} />
        )}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8">
        <div className="lg:col-span-8">
          <ParticipantJourneyChart
            data={mockJourneyData}
            onStageClick={handleStageClick} />
          
        </div>

        <div className="lg:col-span-4">
          <OrganizerLeaderboard events={mockEvents} />
        </div>
      </div>
      <ParticipantBehaviorHeatmap data={mockHeatmapData} />
      <AdvancedFilters
        onApplyFilters={handleApplyFilters}
        onSaveBookmark={handleSaveBookmark} />
      
      <div className="card bg-muted/50">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
            <Icon name="Lightbulb" size={24} color="var(--color-primary)" />
          </div>
          <div>
            <h3 className="font-semibold mb-2">Performance Insights</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <Icon name="TrendingUp" size={16} className="text-success mt-0.5 flex-shrink-0" />
                <span>Registration conversion improved by 12.3% compared to previous event</span>
              </li>
              <li className="flex items-start gap-2">
                <Icon name="Users" size={16} className="text-primary mt-0.5 flex-shrink-0" />
                <span>Peak engagement occurs during weekday afternoons (2-4 PM)</span>
              </li>
              <li className="flex items-start gap-2">
                <Icon name="AlertCircle" size={16} className="text-warning mt-0.5 flex-shrink-0" />
                <span>Completion rate decreased slightly - consider improving mid-event support</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>);

};

export default OrganizerPerformanceHub;