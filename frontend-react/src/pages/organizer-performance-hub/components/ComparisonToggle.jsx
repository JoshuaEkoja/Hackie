import React from 'react';
import Button from '../../../components/ui/Button';

const ComparisonToggle = ({ mode, onModeChange }) => {
  return (
    <div className="flex items-center gap-2 p-1 bg-muted rounded-lg">
      <Button
        variant={mode === 'event' ? 'default' : 'ghost'}
        size="sm"
        onClick={() => onModeChange('event')}
        className="flex-1"
      >
        Event vs Event
      </Button>
      <Button
        variant={mode === 'period' ? 'default' : 'ghost'}
        size="sm"
        onClick={() => onModeChange('period')}
        className="flex-1"
      >
        Period over Period
      </Button>
    </div>
  );
};

export default ComparisonToggle;