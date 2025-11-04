import React from 'react';

const Progress: React.FC = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-brand-text-light">My Progress</h1>
      <div className="bg-brand-surface rounded-xl shadow-lg p-6">
        <p className="text-brand-text-dark">
          Visualize your fitness journey. This section will feature charts and graphs to track your weight, body measurements, strength gains, and other personal metrics over time.
        </p>
      </div>
    </div>
  );
};

export default Progress;
