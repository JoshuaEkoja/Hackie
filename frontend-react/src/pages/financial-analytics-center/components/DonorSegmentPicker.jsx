import React from 'react';
import Icon from '../../../components/AppIcon';

const DonorSegmentPicker = ({ selected, onChange }) => {
  const segments = [
    {
      id: 'all',
      label: 'All Donors',
      icon: 'Users',
      count: 3456,
      color: 'bg-primary'
    },
    {
      id: 'new',
      label: 'New Donors',
      icon: 'UserPlus',
      count: 892,
      color: 'bg-green-500'
    },
    {
      id: 'returning',
      label: 'Returning',
      icon: 'Repeat',
      count: 1847,
      color: 'bg-blue-500'
    },
    {
      id: 'vip',
      label: 'VIP Donors',
      icon: 'Crown',
      count: 234,
      color: 'bg-yellow-500'
    },
    {
      id: 'inactive',
      label: 'Inactive',
      icon: 'UserX',
      count: 483,
      color: 'bg-gray-500'
    }
  ];

  return (
    <div className="card">
      <h4 className="font-semibold mb-4">Donor Segments</h4>
      <div className="space-y-2">
        {segments?.map((segment) => (
          <button
            key={segment?.id}
            onClick={() => onChange(segment?.id)}
            className={`w-full flex items-center justify-between p-3 rounded-lg transition-smooth ${
              selected === segment?.id
                ? 'bg-primary/10 border-2 border-primary' :'bg-muted hover:bg-muted/80 border-2 border-transparent'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className={`w-8 h-8 ${segment?.color} rounded-lg flex items-center justify-center`}>
                <Icon name={segment?.icon} size={16} color="#FFFFFF" />
              </div>
              <span className={`font-medium text-sm ${
                selected === segment?.id ? 'text-primary' : 'text-foreground'
              }`}>
                {segment?.label}
              </span>
            </div>
            <span className="caption text-muted-foreground data-text">{segment?.count}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default DonorSegmentPicker;