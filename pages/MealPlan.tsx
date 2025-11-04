import React from 'react';

const MealPlan: React.FC = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-brand-text-light">Meal Plan</h1>
      <div className="bg-brand-surface rounded-xl shadow-lg p-6">
        <p className="text-brand-text-dark">
          Plan and track your nutrition here. You'll be able to create daily meal plans, log your food intake, and monitor your macronutrient and calorie consumption to stay on track with your goals.
        </p>
      </div>
    </div>
  );
};

export default MealPlan;
