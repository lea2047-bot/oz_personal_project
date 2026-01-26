import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export const Input = ({ label, className = '', ...props }: InputProps) => {
  return (
    <div className="w-full flex flex-col gap-2">
      {label && <label className="text-sm font-bold text-gray-700 ml-1">{label}</label>}
      <input
        className={`w-full px-4 py-3 bg-gray-100 border-none rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all placeholder:text-gray-400 ${className}`}
        {...props}
      />
    </div>
  );
};