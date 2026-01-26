import React from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}

export const Modal = ({ isOpen, onClose, title, children }: ModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/30 backdrop-blur-sm">
      <div className="bg-white w-full max-w-sm rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
        <div className="p-6">
          {title && (
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold">{title}</h3>
              <button onClick={onClose} className="text-gray-400 hover:text-black">✕</button>
            </div>
          )}
          {children}
        </div>
      </div>
    </div>
  );
};