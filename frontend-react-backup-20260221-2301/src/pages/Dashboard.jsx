import { useState, useRef, useEffect } from 'react';
import { Button } from '../components/ui/Button';
import { useOnboarding } from '../contexts/OnboardingContext';

export default function Dashboard() {
  const { userRole, toggleTheme, hackathonContext } = useOnboarding();
  const [messages, setMessages] = useState([
    { type: 'bot', text: 'Hi! I\'m your HackBase AI assistant. How can I help you with the hackathon?' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [showContextModal, setShowContextModal] = useState(false);
  const [contextForm, setContextForm] = useState(hackathonContext);
  const chatEndRef = useRef(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = input;
    setInput('');
    setMessages(prev => [...prev, { type: 'user', text: userMessage }]);
    setLoading(true);

    try {
      const response = await fetch('http://localhost:3000/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessage })
      });

      const data = await response.json();
      setMessages(prev => [...prev, { type: 'bot', text: data.reply || 'No response' }]);
    } catch (error) {
      setMessages(prev => [...prev, { type: 'bot', text: 'Connection error. Please try again.' }]);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveContext = async () => {
    try {
      const response = await fetch('http://localhost:3000/context', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(contextForm)
      });

      if (response.ok) {
        alert('✅ Context saved!');
        setShowContextModal(false);
      }
    } catch (error) {
      alert('Error saving context');
    }
  };

  return (
    <div className="flex h-screen flex-col bg-white dark:bg-dark-bg">
      {/* Top Bar */}
      <div className="border-b border-gray-200 bg-white dark:border-gray-700 dark:bg-dark-surface">
        <div className="flex items-center justify-between px-4 py-3">
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">HackBase</h1>
          <div className="flex gap-2">
            <button
              onClick={toggleTheme}
              className="rounded-lg bg-gray-100 p-2 text-lg dark:bg-gray-800 dark:text-white"
              title="Toggle theme"
            >
              🌓
            </button>
            <button
              onClick={() => setShowContextModal(true)}
              className="rounded-lg bg-gray-100 p-2 text-lg dark:bg-gray-800 dark:text-white"
              title="Settings"
            >
              ⚙️
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        <div className="flex flex-1 flex-col gap-4 overflow-y-auto p-4">
          {/* Chat Messages */}
          <div className="space-y-3">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs rounded-lg px-4 py-2 ${
                    msg.type === 'user'
                      ? 'bg-orange-500 text-white'
                      : 'bg-gray-100 text-gray-900 dark:bg-gray-700 dark:text-white'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-gray-100 px-4 py-2 text-gray-600 dark:bg-gray-700 dark:text-gray-400">
                  Typing...
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Hackathons List */}
          <div className="mt-6 rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800">
            <h2 className="mb-3 font-bold text-gray-900 dark:text-white">🔍 Hackathons Near You</h2>
            <div className="space-y-2 text-sm">
              {[
                { title: 'HackNC 2026', info: '📅 Mar 15–17 • 📍 Chapel Hill, NC' },
                { title: 'Charlotte Fintech Hack', info: '📅 Apr 5–6 • 📍 Charlotte, NC' },
                { title: 'Triangle Tech Summit', info: '📅 May 10–12 • 📍 Raleigh, NC' }
              ].map((hack, i) => (
                <div key={i} className="rounded px-2 py-1 hover:bg-gray-100 dark:hover:bg-gray-700">
                  <div className="font-semibold text-gray-900 dark:text-white">{hack.title}</div>
                  <div className="text-gray-600 dark:text-gray-400">{hack.info}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Input Area */}
        <div className="border-t border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-dark-surface">
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
              placeholder="Ask me anything..."
              className="input-field flex-1"
              disabled={loading}
            />
            <Button
              onClick={sendMessage}
              variant="primary"
              disabled={loading}
              className="!flex-none !px-5"
            >
              Send
            </Button>
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="border-t border-gray-200 bg-white dark:border-gray-700 dark:bg-dark-surface">
        <div className="flex justify-around px-4 py-3">
          {[
            { icon: '💬', label: 'Chat' },
            { icon: '🔍', label: 'Hacks' },
            { icon: '⭐', label: 'Saved' },
            { icon: '👤', label: 'Profile' }
          ].map((item, i) => (
            <button
              key={i}
              className="flex flex-col items-center gap-1 text-gray-600 transition-colors hover:text-orange-500 dark:text-gray-400"
            >
              <div className="text-xl">{item.icon}</div>
              <div className="text-xs font-semibold">{item.label}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Context Modal */}
      {showContextModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 p-4 dark:bg-black/70">
          <div className="w-full max-w-sm space-y-4 rounded-lg bg-white p-6 dark:bg-dark-surface">
            <div className="flex items-center justify-between">
              <h2 className="font-bold text-gray-900 dark:text-white">Hackathon Context</h2>
              <button
                onClick={() => setShowContextModal(false)}
                className="text-xl text-gray-600 dark:text-gray-400"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3">
              <input
                type="text"
                placeholder="Hackathon Name"
                value={contextForm.name}
                onChange={(e) => setContextForm(prev => ({ ...prev, name: e.target.value }))}
                className="input-field"
              />
              <textarea
                placeholder="Description"
                value={contextForm.description}
                onChange={(e) => setContextForm(prev => ({ ...prev, description: e.target.value }))}
                className="input-field"
                rows={3}
              />
              {userRole === 'hoster' && (
                <textarea
                  placeholder="Custom Instructions"
                  value={contextForm.customInstructions}
                  onChange={(e) => setContextForm(prev => ({ ...prev, customInstructions: e.target.value }))}
                  className="input-field"
                  rows={3}
                />
              )}
            </div>

            <div className="flex gap-2">
              <Button variant="secondary" onClick={() => setShowContextModal(false)}>
                Close
              </Button>
              <Button variant="primary" onClick={handleSaveContext}>
                Save
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
