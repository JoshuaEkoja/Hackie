import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Icon from '../../components/AppIcon';

import DonationModal from './components/DonationModal';

const EventDetail = () => {
  const navigate = useNavigate();
  const { eventId } = useParams();
  const [showDonationModal, setShowDonationModal] = useState(false);
  const [activeTab, setActiveTab] = useState('about');
  const [chatMessages, setChatMessages] = useState([
    {
      id: 1,
      type: 'bot',
      text: 'Hi! I\'m your ' + 'SF Tech Hackathon 2026' + ' assistant. Ask me anything about the event, schedule, prizes, or registration!'
    }
  ]);
  const [chatInput, setChatInput] = useState('');
  const chatEndRef = useRef(null);

  const event = {
    id: eventId,
    name: 'SF Tech Hackathon 2026',
    location: 'San Francisco, CA',
    date: 'March 15-17, 2026',
    participants: 247,
    fundingGoal: 50000,
    currentFunding: 32450,
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_14a02c1b5-1766567212764.png",
    category: 'Technology',
    organizer: 'TechHub SF',
    description: 'Join us for an exciting 48-hour hackathon focused on building innovative tech solutions. Work with talented developers, designers, and entrepreneurs to create amazing projects. Prizes worth $25,000 for winning teams!',
    schedule: [
      { time: 'Day 1 - 9:00 AM', event: 'Registration & Breakfast' },
      { time: 'Day 1 - 10:00 AM', event: 'Opening Ceremony' },
      { time: 'Day 1 - 11:00 AM', event: 'Hacking Begins' },
      { time: 'Day 2 - 9:00 AM', event: 'Mentor Sessions' },
      { time: 'Day 3 - 2:00 PM', event: 'Project Submissions' },
      { time: 'Day 3 - 4:00 PM', event: 'Final Presentations' }
    ],
    prizes: [
      { place: '1st Place', amount: '$10,000' },
      { place: '2nd Place', amount: '$7,000' },
      { place: '3rd Place', amount: '$5,000' },
      { place: 'Best Design', amount: '$3,000' }
    ],
    recentDonors: [
      { name: 'Sarah Chen', amount: 500, time: '2 hours ago' },
      { name: 'Michael Rodriguez', amount: 250, time: '5 hours ago' },
      { name: 'Anonymous', amount: 1000, time: '1 day ago' },
      { name: 'Emily Watson', amount: 100, time: '1 day ago' }
    ]
  };

  const progress = (event?.currentFunding / event?.fundingGoal * 100)?.toFixed(0);
  const remaining = event?.fundingGoal - event?.currentFunding;

  // Auto scroll to latest message
  useEffect(() => {
    chatEndRef?.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  const handleSendMessage = () => {
    if (!chatInput.trim()) return;

    // Add user message
    const userMsg = {
      id: chatMessages.length + 1,
      type: 'user',
      text: chatInput
    };
    setChatMessages(prev => [...prev, userMsg]);
    setChatInput('');

    // Simulate bot response
    setTimeout(() => {
      const botResponses = [
        'Great question! You can register on our website or through the mobile app.',
        'The hackathon runs for 48 hours starting at 9 AM on March 15th.',
        'We have prizes totaling $25,000 for the winning teams!',
        'Yes, we provide free meals and coffee throughout the event.',
        'Teams can have 2-5 members. You can form a team on the day of the event.',
        'The location is at the San Francisco Convention Center, 747 Market Street.',
        'Yes, beginners are welcome! We have mentors available to help.',
        'Check-in starts at 8:30 AM on March 15th. Please arrive early!'
      ];
      const randomResponse = botResponses[Math.floor(Math.random() * botResponses.length)];
      
      const botMsg = {
        id: chatMessages.length + 2,
        type: 'bot',
        text: randomResponse
      };
      setChatMessages(prev => [...prev, botMsg]);
    }, 500);
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
    <div className="min-h-screen bg-gray-50 pb-28 ios-scroll">
      {/* Header Image */}
      <div className="relative h-64">
        <img
          src={event?.image}
          alt={`${event?.name} event banner`}
          className="w-full h-full object-cover"
        />
        
        <div className="absolute top-0 left-0 right-0 p-4 pt-safe-top">
          <button
            onClick={() => navigate(-1)}
            className="ios-touch-target w-10 h-10 rounded-full bg-black/50 backdrop-blur-md flex items-center justify-center active:bg-black/70 transition-colors no-tap-highlight"
          >
            <Icon name="ArrowLeft" size={20} color="white" />
          </button>
        </div>
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
          <span className="inline-block bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full text-[11px] font-semibold text-gray-700 mb-2">
            {event?.category}
          </span>
          <h1 className="text-[24px] font-bold text-white leading-tight">{event?.name}</h1>
        </div>
      </div>

      {/* Event Info */}
      <div className="bg-white border-b border-gray-100 px-4 py-4">
        <div className="flex items-center gap-4 text-[13px] text-gray-600 mb-4">
          <div className="flex items-center gap-1.5">
            <Icon name="Calendar" size={14} color="#6B7280" />
            <span>{event?.date}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Icon name="MapPin" size={14} color="#6B7280" />
            <span>{event?.location}</span>
          </div>
        </div>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
            <Icon name="User" size={18} className="text-orange-600" />
          </div>
          <div>
            <p className="text-[15px] font-semibold text-gray-900">{event?.organizer}</p>
            <p className="text-[12px] text-gray-500">Event Organizer</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex -space-x-2">
            {[1, 2, 3, 4]?.map((i) => (
              <div key={i} className="w-8 h-8 bg-gray-300 rounded-full border-2 border-white" />
            ))}
          </div>
          <span className="text-[13px] text-gray-600 font-medium">{event?.participants} participants</span>
        </div>
      </div>

      {/* Funding Progress */}
      <div className="bg-gradient-to-br from-orange-500 to-orange-600 px-4 py-5 text-white">
        <div className="flex items-center justify-between mb-3">
          <div>
            <p className="text-[13px] opacity-90 mb-1 font-medium">Raised so far</p>
            <h2 className="text-[32px] font-bold leading-none">{formatCurrency(event?.currentFunding)}</h2>
          </div>
          <div className="text-right">
            <p className="text-[13px] opacity-90 mb-1 font-medium">Goal</p>
            <p className="text-[20px] font-bold leading-none">{formatCurrency(event?.fundingGoal)}</p>
          </div>
        </div>

        <div className="w-full h-2.5 bg-white/30 rounded-full overflow-hidden mb-3">
          <div
            className="h-full bg-white rounded-full transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="flex items-center justify-between text-[13px]">
          <span className="opacity-90 font-medium">{progress}% funded</span>
          <span className="opacity-90 font-medium">{formatCurrency(remaining)} to go</span>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b border-gray-100 px-4 sticky top-0 z-10">
        <div className="flex gap-6 overflow-x-auto">
          {['about', 'schedule', 'donors', 'chat']?.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`py-3 text-[15px] font-semibold border-b-2 transition-colors capitalize no-tap-highlight ${
                activeTab === tab
                  ? 'border-orange-600 text-orange-600' :'border-transparent text-gray-500'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="px-4 py-5">
        {activeTab === 'about' && (
          <div className="space-y-6">
            <div>
              <h3 className="font-bold text-[17px] text-gray-900 mb-3">About</h3>
              <p className="text-[15px] text-gray-700 leading-relaxed">{event?.description}</p>
            </div>

            <div>
              <h3 className="font-bold text-[17px] text-gray-900 mb-3">Prizes</h3>
              <div className="space-y-2">
                {event?.prizes?.map((prize, index) => (
                  <div key={index} className="flex items-center justify-between ios-card p-4">
                    <span className="text-[15px] font-semibold text-gray-900">{prize?.place}</span>
                    <span className="text-[15px] font-bold text-orange-600">{prize?.amount}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'schedule' && (
          <div className="space-y-2">
            {event?.schedule?.map((item, index) => (
              <div key={index} className="ios-card p-4">
                <p className="text-[12px] font-semibold text-orange-600 mb-1">{item?.time}</p>
                <p className="text-[15px] text-gray-900 font-medium">{item?.event}</p>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'donors' && (
          <div className="space-y-3">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-[17px] text-gray-900">Recent Donors</h3>
              <span className="text-[13px] text-gray-600 font-medium">{event?.recentDonors?.length} donations</span>
            </div>
            {event?.recentDonors?.map((donor, index) => (
              <div key={index} className="ios-card p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                    <Icon name="Heart" size={18} className="text-orange-600" />
                  </div>
                  <div>
                    <p className="text-[15px] font-semibold text-gray-900">{donor?.name}</p>
                    <p className="text-[12px] text-gray-500">{donor?.time}</p>
                  </div>
                </div>
                <span className="text-[15px] font-bold text-orange-600">{formatCurrency(donor?.amount)}</span>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'chat' && (
          <div className="flex flex-col h-[500px] bg-gray-50 rounded-lg overflow-hidden">
            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {chatMessages?.map((msg) => (
                <div key={msg.id} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div
                    className={`max-w-xs px-4 py-3 rounded-lg ${
                      msg.type === 'user'
                        ? 'bg-orange-600 text-white rounded-br-none'
                        : 'bg-white text-gray-900 border border-gray-200 rounded-bl-none'
                    }`}
                  >
                    <p className="text-[14px] leading-relaxed">{msg.text}</p>
                  </div>
                </div>
              ))}
              <div ref={chatEndRef} />
            </div>

            {/* Chat Input */}
            <div className="border-t border-gray-200 bg-white p-4">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Ask about the hackathon..."
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg text-[14px] focus:border-orange-600 focus:outline-none"
                />
                <button
                  onClick={handleSendMessage}
                  className="h-11 w-11 bg-orange-600 rounded-lg flex items-center justify-center active:scale-95 transition-transform no-tap-highlight"
                >
                  <Icon name="Send" size={18} color="white" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Bottom CTA */}
      <div className="fixed bottom-0 left-0 right-0 max-w-[390px] mx-auto bg-white/95 backdrop-blur-lg border-t border-gray-200 px-4 py-3 pb-safe-bottom">
        <div className="flex gap-3">
          <button
            onClick={() => {}}
            className="flex-1 h-[50px] bg-white border-2 border-gray-200 rounded-xl flex items-center justify-center gap-2 font-semibold text-[15px] text-gray-900 active:scale-[0.97] transition-transform no-tap-highlight"
          >
            <Icon name="Share2" size={18} color="#1F2937" />
            Share
          </button>
          <button
            onClick={() => setShowDonationModal(true)}
            className="flex-1 h-[50px] bg-orange-600 rounded-xl flex items-center justify-center gap-2 font-semibold text-[15px] text-white shadow-ios active:scale-[0.97] transition-transform no-tap-highlight"
          >
            <Icon name="Heart" size={18} color="white" />
            Donate Now
          </button>
        </div>
      </div>

      {showDonationModal && (
        <DonationModal
          event={event}
          onClose={() => setShowDonationModal(false)}
        />
      )}
    </div>
  );
};

export default EventDetail;