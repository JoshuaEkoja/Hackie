import React, { useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const DonationFlowChart = ({ data, currency = 'USD' }) => {
  const [zoomLevel, setZoomLevel] = useState('all');
  const [selectedSegment, setSelectedSegment] = useState('all');

  const zoomOptions = [
    { value: 'all', label: 'All Time' },
    { value: '30d', label: 'Last 30 Days' },
    { value: '7d', label: 'Last 7 Days' },
    { value: '24h', label: 'Last 24 Hours' }
  ];

  const segmentOptions = [
    { value: 'all', label: 'All Methods', color: '#FF6B35' },
    { value: 'card', label: 'Credit Card', color: '#4299E1' },
    { value: 'upi', label: 'UPI', color: '#48BB78' },
    { value: 'wallet', label: 'Digital Wallet', color: '#ED8936' },
    { value: 'bank', label: 'Bank Transfer', color: '#9F7AEA' }
  ];

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
      notation: 'compact',
      compactDisplay: 'short'
    })?.format(value);
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (!active || !payload) return null;

    return (
      <div className="bg-card border border-border rounded-lg p-4 shadow-lg">
        <p className="caption font-medium mb-2">{label}</p>
        {payload?.map((entry, index) => (
          <div key={index} className="flex items-center justify-between gap-4 mb-1">
            <div className="flex items-center gap-2">
              <div 
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: entry?.color }}
              />
              <span className="caption text-muted-foreground">{entry?.name}</span>
            </div>
            <span className="caption font-medium data-text">{formatCurrency(entry?.value)}</span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="card">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
        <div>
          <h3 className="text-xl md:text-2xl font-semibold mb-1">Donation Flow Over Time</h3>
          <p className="caption text-muted-foreground">Segmented by payment method and donor type</p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {zoomOptions?.map((option) => (
            <Button
              key={option?.value}
              variant={zoomLevel === option?.value ? 'default' : 'outline'}
              size="sm"
              onClick={() => setZoomLevel(option?.value)}
            >
              {option?.label}
            </Button>
          ))}
        </div>
      </div>
      <div className="flex flex-wrap items-center gap-3 mb-6 pb-4 border-b border-border">
        {segmentOptions?.map((segment) => (
          <button
            key={segment?.value}
            onClick={() => setSelectedSegment(segment?.value)}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-full caption transition-smooth ${
              selectedSegment === segment?.value
                ? 'bg-primary/10 text-primary' :'bg-muted text-muted-foreground hover:bg-muted/80'
            }`}
          >
            <div 
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: segment?.color }}
            />
            <span>{segment?.label}</span>
          </button>
        ))}
      </div>
      <div className="w-full h-64 md:h-80 lg:h-96" aria-label="Donation Flow Area Chart">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorCard" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#4299E1" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#4299E1" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorUPI" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#48BB78" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#48BB78" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorWallet" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#ED8936" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#ED8936" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorBank" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#9F7AEA" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#9F7AEA" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis 
              dataKey="date" 
              stroke="var(--color-muted-foreground)"
              style={{ fontSize: '12px', fontFamily: 'var(--font-caption)' }}
            />
            <YAxis 
              stroke="var(--color-muted-foreground)"
              style={{ fontSize: '12px', fontFamily: 'var(--font-data)' }}
              tickFormatter={formatCurrency}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend 
              wrapperStyle={{ fontSize: '12px', fontFamily: 'var(--font-caption)' }}
            />
            <Area 
              type="monotone" 
              dataKey="card" 
              stackId="1"
              stroke="#4299E1" 
              fill="url(#colorCard)"
              name="Credit Card"
            />
            <Area 
              type="monotone" 
              dataKey="upi" 
              stackId="1"
              stroke="#48BB78" 
              fill="url(#colorUPI)"
              name="UPI"
            />
            <Area 
              type="monotone" 
              dataKey="wallet" 
              stackId="1"
              stroke="#ED8936" 
              fill="url(#colorWallet)"
              name="Digital Wallet"
            />
            <Area 
              type="monotone" 
              dataKey="bank" 
              stackId="1"
              stroke="#9F7AEA" 
              fill="url(#colorBank)"
              name="Bank Transfer"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <div className="flex items-center justify-center gap-2 mt-4 pt-4 border-t border-border">
        <Icon name="Info" size={14} color="var(--color-muted-foreground)" />
        <p className="caption text-muted-foreground">
          Click and drag on the chart to zoom into specific time periods
        </p>
      </div>
    </div>
  );
};

export default DonationFlowChart;