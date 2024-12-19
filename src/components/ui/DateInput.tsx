import React from 'react';

interface Props {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
}

export const DateInput: React.FC<Props> = ({ id, label, value, onChange, required }) => {
  const currentYear = new Date().getFullYear();
  
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <input
        type="date"
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        min="1900-01-01"
        max={`${currentYear + 1}-12-31`}
        className="w-full px-4 py-2 border-2 rounded-xl focus:ring-primary-500 focus:border-primary-500"
      />
      <p className="mt-1 text-xs text-gray-500">YYYY-MM-DD</p>
    </div>
  );
};