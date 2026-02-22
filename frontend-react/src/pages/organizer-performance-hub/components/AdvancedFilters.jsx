import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';


const AdvancedFilters = ({ onApplyFilters, onSaveBookmark }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [filters, setFilters] = useState({
    demographics: [],
    technologies: [],
    locations: []
  });

  const demographicOptions = [
    { value: 'student', label: 'Students' },
    { value: 'professional', label: 'Professionals' },
    { value: 'beginner', label: 'Beginners' },
    { value: 'experienced', label: 'Experienced' }
  ];

  const technologyOptions = [
    { value: 'web', label: 'Web Development' },
    { value: 'mobile', label: 'Mobile Apps' },
    { value: 'ai', label: 'AI/ML' },
    { value: 'blockchain', label: 'Blockchain' },
    { value: 'iot', label: 'IoT' }
  ];

  const locationOptions = [
    { value: 'north-america', label: 'North America' },
    { value: 'europe', label: 'Europe' },
    { value: 'asia', label: 'Asia' },
    { value: 'south-america', label: 'South America' }
  ];

  const handleApply = () => {
    if (onApplyFilters) {
      onApplyFilters(filters);
    }
    setIsExpanded(false);
  };

  const handleReset = () => {
    setFilters({
      demographics: [],
      technologies: [],
      locations: []
    });
  };

  const handleSaveBookmark = () => {
    if (onSaveBookmark) {
      onSaveBookmark(filters);
    }
  };

  return (
    <div className="card">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between p-4 hover:bg-muted rounded-lg transition-smooth"
      >
        <div className="flex items-center gap-3">
          <Icon name="Filter" size={20} color="var(--color-primary)" />
          <span className="font-medium">Advanced Filters</span>
        </div>
        <Icon 
          name={isExpanded ? "ChevronUp" : "ChevronDown"} 
          size={20} 
        />
      </button>
      {isExpanded && (
        <div className="mt-4 space-y-6 animate-fadeIn">
          <div>
            <Select
              label="Demographics"
              options={demographicOptions}
              value={filters?.demographics}
              onChange={(value) => setFilters({ ...filters, demographics: value })}
              multiple
              searchable
              placeholder="Select demographics..."
            />
          </div>

          <div>
            <Select
              label="Technology Preferences"
              options={technologyOptions}
              value={filters?.technologies}
              onChange={(value) => setFilters({ ...filters, technologies: value })}
              multiple
              searchable
              placeholder="Select technologies..."
            />
          </div>

          <div>
            <Select
              label="Geographic Origin"
              options={locationOptions}
              value={filters?.locations}
              onChange={(value) => setFilters({ ...filters, locations: value })}
              multiple
              searchable
              placeholder="Select locations..."
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-border">
            <Button
              variant="default"
              iconName="Check"
              iconPosition="left"
              onClick={handleApply}
              className="flex-1"
            >
              Apply Filters
            </Button>
            <Button
              variant="outline"
              iconName="Bookmark"
              iconPosition="left"
              onClick={handleSaveBookmark}
              className="flex-1"
            >
              Save as Bookmark
            </Button>
            <Button
              variant="ghost"
              iconName="RotateCcw"
              iconPosition="left"
              onClick={handleReset}
            >
              Reset
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdvancedFilters;