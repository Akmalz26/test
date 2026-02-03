import React, { ChangeEvent } from 'react';

interface FormFieldProps {
  label: string;
  name: string;
  type?: string;
  value: string | number;
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
  required?: boolean;
  disabled?: boolean;
  error?: string;
  placeholder?: string;
  options?: string[];
}

export default function FormField({ 
  label, 
  name, 
  type = 'text', 
  value, 
  onChange, 
  required = false, 
  disabled = false, 
  error, 
  placeholder, 
  options = [] 
}: FormFieldProps) {
  
  const renderInput = () => {
    switch (type) {
      case 'textarea':
        return (
          <textarea
            id={name}
            name={name}
            value={value}
            onChange={onChange}
            required={required}
            disabled={disabled}
            placeholder={placeholder || `Masukkan ${label.toLowerCase()}`}
            className={`w-full bg-white border ${
              error ? 'border-red-500' : 'border-gray-300 focus:border-orange-500'
            } rounded-lg px-3 py-2.5 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-orange-500 transition-colors`}
            rows={4}
          />
        );
      
      case 'select':
        return (
          <select
            id={name}
            name={name}
            value={value}
            onChange={onChange}
            required={required}
            disabled={disabled}
            className={`w-full bg-white border ${
              error ? 'border-red-500' : 'border-gray-300 focus:border-orange-500'
            } rounded-lg px-3 py-2.5 text-gray-700 focus:outline-none focus:ring-1 focus:ring-orange-500 transition-colors appearance-none bg-no-repeat bg-right bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20"%3E%3Cpath stroke="%23f97316" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="m6 8 4 4 4-4"/%3E%3C/svg%3E')] bg-[length:20px_20px] pr-8`}
          >
            <option value="" disabled>
              Pilih {label}
            </option>
            {options.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        );
        
      default:
        return (
          <input
            id={name}
            name={name}
            type={type}
            value={value}
            onChange={onChange}
            required={required}
            disabled={disabled}
            placeholder={placeholder || `Masukkan ${label.toLowerCase()}`}
            className={`w-full bg-white border ${
              error ? 'border-red-500' : 'border-gray-300 focus:border-orange-500'
            } rounded-lg px-3 py-2.5 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-orange-500 transition-colors`}
          />
        );
    }
  };
  
  return (
    <div>
      <div className="flex justify-between mb-1.5">
        <label htmlFor={name} className="block text-sm font-medium text-gray-700">
          {label} {required && <span className="text-orange-500">*</span>}
        </label>
      </div>
      {renderInput()}
      {error && <p className="mt-1.5 text-xs text-red-500">{error}</p>}
    </div>
  );
} 