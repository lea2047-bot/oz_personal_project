import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-[#F0F2FF] flex justify-center py-10 px-4">
      <div className="w-full max-w-[500px] flex flex-col items-center">
        {children}
      </div>
    </div>
  );
};