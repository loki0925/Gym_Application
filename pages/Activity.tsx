import React from 'react';

const Activity: React.FC = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-brand-text-light">Activity Tracker</h1>
      <div className="bg-brand-surface rounded-xl shadow-lg p-6">
        <p className="text-brand-text-dark">
          This is where you'll log your workouts, track your daily steps, and monitor your overall physical activity. 
          Future features will include workout templates and integration with fitness trackers.
        </p>
      </div>
    </div>
  );
};

export default Activity;
