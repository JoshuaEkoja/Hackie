import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const DonationModal = ({ event, onClose }) => {
  const [amount, setAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [processing, setProcessing] = useState(false);

  const presetAmounts = [25, 50, 100, 250];

  const handleDonate = async () => {
    setProcessing(true);
    
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    alert(`Thank you for donating $${amount} to ${event?.name}!`);
    setProcessing(false);
    onClose();
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    })?.format(value);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-end">
      <div className="bg-white rounded-t-3xl w-full max-h-[90vh] overflow-y-auto animate-slideIn">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-4 py-4 flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900">Make a Donation</h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
          >
            <Icon name="X" size={24} />
          </Button>
        </div>

        <div className="px-4 py-6 space-y-6">
          {/* Event Info */}
          <div className="bg-orange-50 rounded-xl p-4 border border-orange-100">
            <p className="text-sm text-gray-600 mb-1">You're supporting</p>
            <p className="font-semibold text-gray-900">{event?.name}</p>
          </div>

          {/* Amount Selection */}
          <div>
            <label className="text-sm font-medium text-gray-900 mb-3 block">Select Amount</label>
            <div className="grid grid-cols-4 gap-2 mb-3">
              {presetAmounts?.map(preset => (
                <button
                  key={preset}
                  onClick={() => setAmount(preset?.toString())}
                  className={`py-3 rounded-lg border-2 font-medium text-sm transition-all ${
                    amount === preset?.toString()
                      ? 'border-orange-600 bg-orange-50 text-orange-600' :'border-gray-200 text-gray-700 hover:border-gray-300'
                  }`}
                >
                  ${preset}
                </button>
              ))}
            </div>
            <Input
              type="number"
              placeholder="Custom amount"
              value={amount}
              onChange={(e) => setAmount(e?.target?.value)}
            />
          </div>

          {/* Payment Method */}
          <div>
            <label className="text-sm font-medium text-gray-900 mb-3 block">Payment Method</label>
            <div className="space-y-2">
              <button
                onClick={() => setPaymentMethod('card')}
                className={`w-full flex items-center gap-3 p-4 rounded-xl border-2 transition-all ${
                  paymentMethod === 'card' ?'border-orange-600 bg-orange-50' :'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                  paymentMethod === 'card' ? 'border-orange-600' : 'border-gray-300'
                }`}>
                  {paymentMethod === 'card' && (
                    <div className="w-3 h-3 bg-orange-600 rounded-full" />
                  )}
                </div>
                <Icon name="CreditCard" size={20} className="text-gray-700" />
                <div className="flex-1 text-left">
                  <p className="font-medium text-gray-900">Credit/Debit Card</p>
                  <p className="text-xs text-gray-600">Visa, Mastercard, Amex</p>
                </div>
              </button>

              <button
                onClick={() => setPaymentMethod('applepay')}
                className={`w-full flex items-center gap-3 p-4 rounded-xl border-2 transition-all ${
                  paymentMethod === 'applepay' ?'border-orange-600 bg-orange-50' :'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                  paymentMethod === 'applepay' ? 'border-orange-600' : 'border-gray-300'
                }`}>
                  {paymentMethod === 'applepay' && (
                    <div className="w-3 h-3 bg-orange-600 rounded-full" />
                  )}
                </div>
                <Icon name="Smartphone" size={20} className="text-gray-700" />
                <div className="flex-1 text-left">
                  <p className="font-medium text-gray-900">Apple Pay</p>
                  <p className="text-xs text-gray-600">One-tap payment</p>
                </div>
              </button>

              <button
                onClick={() => setPaymentMethod('crypto')}
                className={`w-full flex items-center gap-3 p-4 rounded-xl border-2 transition-all ${
                  paymentMethod === 'crypto' ?'border-orange-600 bg-orange-50' :'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                  paymentMethod === 'crypto' ? 'border-orange-600' : 'border-gray-300'
                }`}>
                  {paymentMethod === 'crypto' && (
                    <div className="w-3 h-3 bg-orange-600 rounded-full" />
                  )}
                </div>
                <Icon name="Wallet" size={20} className="text-gray-700" />
                <div className="flex-1 text-left">
                  <p className="font-medium text-gray-900">Cryptocurrency</p>
                  <p className="text-xs text-gray-600">Solana blockchain</p>
                </div>
              </button>
            </div>
          </div>

          {/* Card Details (if card selected) */}
          {paymentMethod === 'card' && (
            <div className="space-y-3 animate-fadeIn">
              <Input
                label="Card Number"
                placeholder="1234 5678 9012 3456"
                type="text"
              />
              <div className="grid grid-cols-2 gap-3">
                <Input
                  label="Expiry"
                  placeholder="MM/YY"
                  type="text"
                />
                <Input
                  label="CVV"
                  placeholder="123"
                  type="text"
                />
              </div>
            </div>
          )}

          {/* Crypto Info */}
          {paymentMethod === 'crypto' && (
            <div className="bg-blue-50 rounded-xl p-4 border border-blue-100 animate-fadeIn">
              <div className="flex items-start gap-2">
                <Icon name="Info" size={16} className="text-blue-600 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-blue-900 mb-1">Blockchain Transparency</p>
                  <p className="text-xs text-blue-700">Your donation will be recorded on the Solana blockchain for full transparency and traceability.</p>
                </div>
              </div>
            </div>
          )}

          {/* Donate Button */}
          <Button
            variant="default"
            fullWidth
            size="lg"
            onClick={handleDonate}
            disabled={!amount || parseFloat(amount) <= 0 || processing}
            loading={processing}
          >
            {processing ? 'Processing...' : `Donate ${amount ? formatCurrency(parseFloat(amount)) : '$0'}`}
          </Button>

          <p className="text-xs text-center text-gray-500">
            Your donation is secure and will be processed through our trusted payment partners.
          </p>
        </div>
      </div>
    </div>
  );
};

export default DonationModal;