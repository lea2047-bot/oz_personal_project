import React from 'react';

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export const Checkbox = ({ label, ...props }: CheckboxProps) => {
  return (
    <label className="flex items-center cursor-pointer group">
      <input
        type="checkbox"
        className="hidden peer"
        {...props}
      />
      <div className="w-6 h-6 border-2 border-gray-300 rounded-lg flex items-center justify-center 
                      peer-checked:bg-indigo-500 peer-checked:border-indigo-500 transition-all">
        <svg className="w-4 h-4 text-white opacity-0 peer-checked:opacity-100" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      </div>
      {label && <span className="ml-3 text-gray-700 group-hover:text-black transition-colors">{label}</span>}
    </label>
  );
};