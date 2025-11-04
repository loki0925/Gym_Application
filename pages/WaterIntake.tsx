import React from 'react';

const WaterIntake: React.FC = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-brand-text-light">Water Intake</h1>
      <div className="bg-brand-surface rounded-xl shadow-lg p-6">
        <p className="text-brand-text-dark">
          Stay hydrated! Use this simple tool to track your daily water consumption and ensure you're meeting your hydration goals.
        </p>
      </div>
    </div>
  );
};

export default WaterIntake;
