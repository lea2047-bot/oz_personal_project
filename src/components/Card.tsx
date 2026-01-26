import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export const Card = ({ children, className = '' }: CardProps) => {
  return (
    <div className={`bg-white rounded-2xl p-4 shadow-sm border border-gray-50 ${className}`}>
      {children}
    </div>
  );
};