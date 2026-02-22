import React from 'react';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';

const FilterControls = ({ filters, onFilterChange, onRefresh, refreshing }) => {
  const categoryOptions = [
    { value: 'all', label: 'All Categories' },
    { value: 'web', label: 'Web Development' },
    { value: 'mobile', label: 'Mobile Apps' },
    { value: 'ai', label: 'AI/ML' },
    { value: 'blockchain', label: 'Blockchain' },
    { value: 'iot', label: 'IoT' },
    { value: 'gaming', label: 'Gaming' }
  ];

  const regionOptions = [
    { value: 'all', label: 'All Regions' },
    { value: 'north-america', label: 'North America' },
    { value: 'europe', label: 'Europe' },
    { value: 'asia', label: 'Asia' },
    { value: 'south-america', label: 'South America' },
    { value: 'africa', label: 'Africa' },
    { value: 'oceania', label: 'Oceania' }
  ];

  const refreshIntervalOptions = [
    { value: 'realtime', label: 'Real-time' },
    { value: 'hourly', label: 'Hourly' },
    { value: 'daily', label: 'Daily' }
  ];

  return (
    <div className="card">
      <div className="flex flex-col lg:flex-row items-start lg:items-center gap-4">
        <div className="flex-1 w-full lg:w-auto">
          <Select
            label="Category"
            options={categoryOptions}
            value={filters?.category}
            onChange={(value) => onFilterChange({ category: value })}
            className="w-full"
          />
        </div>

        <div className="flex-1 w-full lg:w-auto">
          <Select
            label="Region"
            options={regionOptions}
            value={filters?.region}
            onChange={(value) => onFilterChange({ region: value })}
            className="w-full"
          />
        </div>

        <div className="flex-1 w-full lg:w-auto">
          <Select
            label="Refresh Interval"
            options={refreshIntervalOptions}
            value={filters?.refreshInterval}
            onChange={(value) => onFilterChange({ refreshInterval: value })}
            className="w-full"
          />
        </div>

        <div className="w-full lg:w-auto lg:mt-6">
          <Button
            variant="outline"
            size="default"
            iconName="RefreshCw"
            iconPosition="left"
            onClick={onRefresh}
            loading={refreshing}
            fullWidth
          >
            Refresh Now
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FilterControls;