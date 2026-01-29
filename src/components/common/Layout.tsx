import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
  maxWidth?: string; 
}

export const Layout = ({ children, maxWidth = "500px" }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-[#F0F2FF] flex justify-center py-10 px-4">
      <div 
        className="w-full flex flex-col items-center" 
        style={{ maxWidth: maxWidth }}
      >
        {children}
      </div>
    </div>
  );
};