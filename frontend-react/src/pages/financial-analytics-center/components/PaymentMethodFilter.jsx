import React from 'react';
import { Checkbox, CheckboxGroup } from '../../../components/ui/Checkbox';

const PaymentMethodFilter = ({ selected, onChange }) => {
  const paymentMethods = [
    { id: 'card', label: 'Credit/Debit Card', count: 1247 },
    { id: 'upi', label: 'UPI', count: 892 },
    { id: 'wallet', label: 'Digital Wallet', count: 634 },
    { id: 'bank', label: 'Bank Transfer', count: 421 },
    { id: 'crypto', label: 'Cryptocurrency', count: 156 }
  ];

  const handleChange = (methodId) => {
    const newSelected = selected?.includes(methodId)
      ? selected?.filter(id => id !== methodId)
      : [...selected, methodId];
    onChange(newSelected);
  };

  return (
    <div className="card">
      <h4 className="font-semibold mb-4">Payment Methods</h4>
      <CheckboxGroup>
        {paymentMethods?.map((method) => (
          <div key={method?.id} className="flex items-center justify-between mb-3">
            <Checkbox
              label={method?.label}
              checked={selected?.includes(method?.id)}
              onChange={() => handleChange(method?.id)}
            />
            <span className="caption text-muted-foreground data-text">{method?.count}</span>
          </div>
        ))}
      </CheckboxGroup>
    </div>
  );
};

export default PaymentMethodFilter;