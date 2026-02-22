import React from 'react';
import { useChat } from 'contexts/ChatContext';
import Button from 'components/ui/Button';
import { Input, Textarea } from 'components/ui/Input';
import MainLayout from 'components/layout/MainLayout';

const Settings = () => {
  const { hackathonContext, setHackathonContext, theme, toggleTheme } = useChat();
  const [formData, setFormData] = React.useState(hackathonContext);
  const [saved, setSaved] = React.useState(false);

  const handleSave = async () => {
    setHackathonContext(formData);
    try {
      await fetch('http://localhost:3000/context', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch (error) {
      console.error('Failed to save context:', error);
    }
  };

  return (
    <MainLayout>
      <div className="min-h-screen bg-background pb-20">
        <div className="bg-card border-b border-border p-4 sticky top-0 z-10">
          <h1 className="text-heading-4 font-heading text-foreground">Settings</h1>
        </div>

        <div className="p-4 space-y-6">
          {/* Theme Section */}
          <div className="bg-card border border-border rounded-lg p-4 space-y-4">
            <h2 className="text-heading-5 font-heading text-foreground">Appearance</h2>
            <div className="flex items-center justify-between">
              <span className="text-foreground">Dark Mode</span>
              <button
                onClick={toggleTheme}
                className={`relative inline-flex w-10 h-6 rounded-full transition-colors ${
                  theme === 'dark' ? 'bg-primary' : 'bg-muted'
                }`}
              >
                <span
                  className={`inline-block w-4 h-4 transform rounded-full bg-white transition-transform ${
                    theme === 'dark' ? 'translate-x-4' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>

          {/* Hackathon Settings */}
          <div className="bg-card border border-border rounded-lg p-4 space-y-4">
            <h2 className="text-heading-5 font-heading text-foreground">Hackathon Info</h2>
            
            <Input
              label="Name"
              placeholder="Hackathon name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />

            <Textarea
              label="Description"
              placeholder="Tell us about your hackathon"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />

            <Textarea
              label="Custom Instructions"
              placeholder="Special instructions for the AI"
              value={formData.customInstructions}
              onChange={(e) => setFormData({ ...formData, customInstructions: e.target.value })}
            />

            {saved && (
              <p className="text-sm text-success">✓ Settings saved successfully!</p>
            )}

            <Button onClick={handleSave} size="lg">
              Save Changes
            </Button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Settings;
