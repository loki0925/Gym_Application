import React, { ReactNode } from 'react';

interface AuthLayoutProps {
  children: ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-brand-bg p-4">
      <div className="flex items-center justify-center mb-8">
        <i className="fas fa-dumbbell text-brand-primary text-4xl"></i>
        <span className="ml-3 text-3xl font-bold text-brand-text-light">GymPro</span>
      </div>
      <div className="w-full max-w-md bg-brand-surface rounded-xl shadow-2xl p-8 space-y-6">
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
