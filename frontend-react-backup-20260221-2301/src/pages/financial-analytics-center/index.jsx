import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import FinancialKPICard from './components/FinancialKPICard';
import DonationFlowChart from './components/DonationFlowChart';
import TopDonorsLeaderboard from './components/TopDonorsLeaderboard';
import RecentTransactionsFeed from './components/RecentTransactionsFeed';
import DonationFunnelVisualization from './components/DonationFunnelVisualization';
import FraudDetectionAlerts from './components/FraudDetectionAlerts';
import CurrencySelector from './components/CurrencySelector';
import PaymentMethodFilter from './components/PaymentMethodFilter';
import DonorSegmentPicker from './components/DonorSegmentPicker';

const FinancialAnalyticsCenter = () => {
  const [currency, setCurrency] = useState('USD');
  const [selectedPaymentMethods, setSelectedPaymentMethods] = useState(['card', 'upi', 'wallet', 'bank']);
  const [selectedDonorSegment, setSelectedDonorSegment] = useState('all');
  const [showExportModal, setShowExportModal] = useState(false);

  const kpiData = [
  {
    title: 'Total Donations',
    value: 2847650,
    change: 18.5,
    changeType: 'positive',
    icon: 'DollarSign',
    goal: 3000000
  },
  {
    title: 'Average Donation',
    value: 824,
    change: 12.3,
    changeType: 'positive',
    icon: 'TrendingUp',
    goal: null
  },
  {
    title: 'Donor Retention Rate',
    value: 67.8,
    change: -3.2,
    changeType: 'negative',
    icon: 'Users',
    goal: null
  },
  {
    title: 'Payment Success Rate',
    value: 94.6,
    change: 2.1,
    changeType: 'positive',
    icon: 'CheckCircle2',
    goal: null
  }];


  const donationFlowData = [
  { date: 'Jan 15', card: 45000, upi: 32000, wallet: 18000, bank: 12000 },
  { date: 'Jan 16', card: 52000, upi: 38000, wallet: 22000, bank: 15000 },
  { date: 'Jan 17', card: 48000, upi: 35000, wallet: 20000, bank: 13000 },
  { date: 'Jan 18', card: 61000, upi: 42000, wallet: 25000, bank: 18000 },
  { date: 'Jan 19', card: 58000, upi: 40000, wallet: 23000, bank: 16000 },
  { date: 'Jan 20', card: 67000, upi: 48000, wallet: 28000, bank: 21000 },
  { date: 'Jan 21', card: 72000, upi: 52000, wallet: 31000, bank: 24000 }];


  const topDonors = [
  {
    id: 1,
    name: 'Sarah Johnson',
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1f8f896f2-1763299689286.png",
    avatarAlt: 'Professional woman with blonde hair in business attire smiling at camera',
    amount: 125000,
    donations: 24,
    growth: 32.5
  },
  {
    id: 2,
    name: 'Michael Chen',
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1f81431f3-1763294967566.png",
    avatarAlt: 'Asian man with black hair wearing glasses and blue shirt',
    amount: 98500,
    donations: 18,
    growth: 28.3
  },
  {
    id: 3,
    name: 'Emily Rodriguez',
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1f225624a-1763293838525.png",
    avatarAlt: 'Hispanic woman with brown hair in professional attire with warm smile',
    amount: 87200,
    donations: 15,
    growth: 24.7
  },
  {
    id: 4,
    name: 'David Kim',
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_11f91b066-1763300526499.png",
    avatarAlt: 'Korean man with short black hair in casual business attire',
    amount: 76800,
    donations: 12,
    growth: 19.2
  },
  {
    id: 5,
    name: 'Jessica Williams',
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1436c4089-1763294954354.png",
    avatarAlt: 'African American woman with curly hair in elegant professional outfit',
    amount: 65400,
    donations: 10,
    growth: 15.8
  }];


  const recentTransactions = [
  {
    id: 1,
    donor: 'Anonymous Donor',
    hackathon: 'AI Innovation Challenge 2026',
    amount: 5000,
    method: 'card',
    status: 'completed',
    timestamp: new Date(Date.now() - 300000),
    transactionId: 'TXN-2026-001847'
  },
  {
    id: 2,
    donor: 'Tech Corp Foundation',
    hackathon: 'Green Tech Hackathon',
    amount: 15000,
    method: 'bank',
    status: 'completed',
    timestamp: new Date(Date.now() - 600000),
    transactionId: 'TXN-2026-001846'
  },
  {
    id: 3,
    donor: 'John Anderson',
    hackathon: 'Healthcare Innovation Sprint',
    amount: 2500,
    method: 'upi',
    status: 'pending',
    timestamp: new Date(Date.now() - 900000),
    transactionId: 'TXN-2026-001845'
  },
  {
    id: 4,
    donor: 'Maria Garcia',
    hackathon: 'EdTech Solutions Hackathon',
    amount: 3200,
    method: 'wallet',
    status: 'completed',
    timestamp: new Date(Date.now() - 1200000),
    transactionId: 'TXN-2026-001844'
  },
  {
    id: 5,
    donor: 'Robert Taylor',
    hackathon: 'Blockchain Security Challenge',
    amount: 1800,
    method: 'card',
    status: 'failed',
    timestamp: new Date(Date.now() - 1500000),
    transactionId: 'TXN-2026-001843'
  }];


  const funnelData = [
  {
    id: 1,
    name: 'Donation Intent',
    description: 'Users clicked donate button',
    count: 12450,
    value: 0,
    conversionRate: 100,
    icon: 'MousePointer'
  },
  {
    id: 2,
    name: 'Amount Selection',
    description: 'Selected donation amount',
    count: 9876,
    value: 0,
    conversionRate: 79.3,
    icon: 'DollarSign'
  },
  {
    id: 3,
    name: 'Payment Method',
    description: 'Chose payment method',
    count: 8234,
    value: 0,
    conversionRate: 83.4,
    icon: 'CreditCard'
  },
  {
    id: 4,
    name: 'Details Entry',
    description: 'Entered payment details',
    count: 6892,
    value: 0,
    conversionRate: 83.7,
    icon: 'FileText'
  },
  {
    id: 5,
    name: 'Completed',
    description: 'Successfully donated',
    count: 6234,
    value: 5134680,
    conversionRate: 90.5,
    icon: 'CheckCircle2'
  }];


  const fraudAlerts = [
  {
    id: 1,
    severity: 'critical',
    title: 'Multiple Failed Transactions',
    description: 'Same card attempted 15 transactions in 5 minutes from different locations',
    timestamp: new Date(Date.now() - 180000),
    location: 'Mumbai, India',
    tags: ['Card Fraud', 'Velocity Check', 'Location Mismatch']
  },
  {
    id: 2,
    severity: 'high',
    title: 'Unusual Donation Pattern',
    description: 'New account made 10 donations of exactly $999 within 1 hour',
    timestamp: new Date(Date.now() - 360000),
    location: 'Lagos, Nigeria',
    tags: ['Pattern Anomaly', 'New Account', 'High Frequency']
  },
  {
    id: 3,
    severity: 'medium',
    title: 'Suspicious Email Domain',
    description: 'Donation from temporary email service with VPN usage detected',
    timestamp: new Date(Date.now() - 540000),
    location: 'Unknown (VPN)',
    tags: ['Email Verification', 'VPN Detected', 'Risk Assessment']
  },
  {
    id: 4,
    severity: 'high',
    title: 'Chargeback Risk',
    description: 'Donor with 3 previous chargebacks attempted large donation',
    timestamp: new Date(Date.now() - 720000),
    location: 'New York, USA',
    tags: ['Chargeback History', 'High Risk', 'Manual Review']
  },
  {
    id: 5,
    severity: 'low',
    title: 'Geolocation Mismatch',
    description: 'Card billing address does not match transaction location',
    timestamp: new Date(Date.now() - 900000),
    location: 'London, UK',
    tags: ['Location Check', 'Low Risk', 'Verification Needed']
  }];


  const handleExport = () => {
    setShowExportModal(true);
    setTimeout(() => {
      console.log('Exporting financial data with privacy compliance...');
      setShowExportModal(false);
    }, 2000);
  };

  useEffect(() => {
    document.title = 'Financial Analytics Center - HackBase';
  }, []);

  return (
    <>
      <Helmet>
        <title>Financial Analytics Center - HackBase</title>
        <meta name="description" content="Comprehensive donation tracking and revenue insights for sponsors, administrators, and financial stakeholders with real-time analytics and fraud detection." />
      </Helmet>
      <div className="min-h-screen bg-background pb-8">
        <div className="mb-6 md:mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-4">
            <div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-2">Financial Analytics Center</h1>
              <p className="text-base md:text-lg text-muted-foreground">
                Comprehensive donation tracking and revenue insights
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <CurrencySelector value={currency} onChange={setCurrency} />
              <Button
                variant="outline"
                iconName="Download"
                iconPosition="left"
                onClick={handleExport}
                loading={showExportModal}>
                
                Export Data
              </Button>
            </div>
          </div>

          <div className="flex items-center gap-2 p-3 bg-success/10 border border-success/30 rounded-lg">
            <Icon name="Shield" size={20} color="var(--color-success)" />
            <p className="caption text-success">
              All financial data is encrypted and complies with PCI DSS standards
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6 md:mb-8">
          {kpiData?.map((kpi, index) =>
          <FinancialKPICard key={index} {...kpi} currency={currency} />
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-6 mb-6 md:mb-8">
          <div className="lg:col-span-8">
            <DonationFlowChart data={donationFlowData} currency={currency} />
          </div>

          <div className="lg:col-span-4 space-y-4 md:space-y-6">
            <TopDonorsLeaderboard donors={topDonors} currency={currency} />
            <div className="hidden lg:block">
              <PaymentMethodFilter
                selected={selectedPaymentMethods}
                onChange={setSelectedPaymentMethods} />
              
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-6 mb-6 md:mb-8">
          <div className="lg:col-span-8">
            <DonationFunnelVisualization funnelData={funnelData} currency={currency} />
          </div>

          <div className="lg:col-span-4">
            <RecentTransactionsFeed transactions={recentTransactions} currency={currency} />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-6">
          <div className="lg:col-span-8">
            <FraudDetectionAlerts alerts={fraudAlerts} />
          </div>

          <div className="lg:col-span-4">
            <DonorSegmentPicker
              selected={selectedDonorSegment}
              onChange={setSelectedDonorSegment} />
            
          </div>
        </div>

        <div className="lg:hidden mt-6">
          <PaymentMethodFilter
            selected={selectedPaymentMethods}
            onChange={setSelectedPaymentMethods} />
          
        </div>
      </div>
    </>);

};

export default FinancialAnalyticsCenter;