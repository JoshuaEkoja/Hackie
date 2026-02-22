import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from '../ui/Button';
import Select from '../ui/Select';

const GlobalAnalyticsHeader = ({ onFilterChange, realTimeStatus }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [dateRange, setDateRange] = useState('7d');
  const [refreshing, setRefreshing] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const dateRangeOptions = [
    { value: '24h', label: 'Last 24 Hours' },
    { value: '7d', label: 'Last 7 Days' },
    { value: '30d', label: 'Last 30 Days' },
    { value: '90d', label: 'Last 90 Days' },
    { value: 'custom', label: 'Custom Range' }
  ];

  const handleDateRangeChange = (value) => {
    setDateRange(value);
    if (onFilterChange) {
      onFilterChange({ dateRange: value });
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    if (onFilterChange) {
      await onFilterChange({ refresh: true });
    }
    setTimeout(() => setRefreshing(false), 1000);
  };

  const handleExport = () => {
    const currentPath = location?.pathname;
    const exportType = currentPath?.includes('financial') ? 'financial' : 
                       currentPath?.includes('organizer') ? 'organizer' : 'platform';
    console.log(`Exporting ${exportType} data...`);
  };

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  return (
    <>
      <header className="global-header">
        <div className="h-full max-w-[1920px] mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <button
              onClick={() => navigate('/')}
              className="flex items-center gap-3 transition-smooth hover:opacity-80"
            >
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <Icon name="Zap" size={24} color="var(--color-primary)" />
              </div>
              <span className="text-xl font-semibold font-heading hidden sm:block">
                HackBase
              </span>
            </button>

            <div className="hidden lg:flex items-center gap-4">
              <Select
                options={dateRangeOptions}
                value={dateRange}
                onChange={handleDateRangeChange}
                className="w-48"
              />
              
              <Button
                variant="outline"
                size="default"
                iconName="RefreshCw"
                iconPosition="left"
                onClick={handleRefresh}
                loading={refreshing}
                className="hidden md:flex"
              >
                Refresh
              </Button>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-3">
              <div className={`status-indicator ${realTimeStatus || 'connected'}`}>
                <div className={`w-2 h-2 rounded-full ${
                  realTimeStatus === 'connected' ? 'bg-success' :
                  realTimeStatus === 'connecting'? 'bg-warning animate-pulse' : 'bg-error'
                }`} />
                <span className="capitalize">{realTimeStatus || 'Connected'}</span>
              </div>

              <Button
                variant="ghost"
                size="default"
                iconName="Download"
                iconPosition="left"
                onClick={handleExport}
              >
                Export
              </Button>
            </div>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 hover:bg-muted rounded-md transition-smooth"
              aria-label="Toggle mobile menu"
            >
              <Icon name={mobileMenuOpen ? "X" : "Menu"} size={24} />
            </button>
          </div>
        </div>
      </header>

      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-background z-[999] lg:hidden animate-fadeIn">
          <div className="pt-20 px-6 space-y-6">
            <div className="space-y-4">
              <label className="text-sm font-medium text-muted-foreground">Date Range</label>
              <Select
                options={dateRangeOptions}
                value={dateRange}
                onChange={handleDateRangeChange}
              />
            </div>

            <div className="flex flex-col gap-3">
              <Button
                variant="outline"
                size="lg"
                iconName="RefreshCw"
                iconPosition="left"
                onClick={handleRefresh}
                loading={refreshing}
                fullWidth
              >
                Refresh Data
              </Button>

              <Button
                variant="outline"
                size="lg"
                iconName="Download"
                iconPosition="left"
                onClick={handleExport}
                fullWidth
              >
                Export Data
              </Button>
            </div>

            <div className={`status-indicator ${realTimeStatus || 'connected'} justify-center`}>
              <div className={`w-2 h-2 rounded-full ${
                realTimeStatus === 'connected' ? 'bg-success' :
                realTimeStatus === 'connecting'? 'bg-warning animate-pulse' : 'bg-error'
              }`} />
              <span className="capitalize">{realTimeStatus || 'Connected'}</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default GlobalAnalyticsHeader;