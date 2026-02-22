import React from 'react';
import Select from '../../../components/ui/Select';

const CurrencySelector = ({ value, onChange }) => {
  const currencyOptions = [
    { value: 'USD', label: 'USD - US Dollar' },
    { value: 'EUR', label: 'EUR - Euro' },
    { value: 'GBP', label: 'GBP - British Pound' },
    { value: 'INR', label: 'INR - Indian Rupee' },
    { value: 'JPY', label: 'JPY - Japanese Yen' },
    { value: 'AUD', label: 'AUD - Australian Dollar' },
    { value: 'CAD', label: 'CAD - Canadian Dollar' },
    { value: 'SGD', label: 'SGD - Singapore Dollar' }
  ];

  return (
    <Select
      options={currencyOptions}
      value={value}
      onChange={onChange}
      placeholder="Select currency"
      className="w-full md:w-48"
    />
  );
};

export default CurrencySelector;