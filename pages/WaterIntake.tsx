import React, { useState } from 'react';
import { WaterIcon } from '../components/icons';

const WaterIntake: React.FC = () => {
  const [glasses, setGlasses] = useState(0);
  const goal = 8;

  const handleAddGlass = () => {
    if (glasses < goal) {
      setGlasses(g => g + 1);
    }
  };

  const handleRemoveGlass = () => {
    if (glasses > 0) {
      setGlasses(g => g - 1);
    }
  };
  
  const handleReset = () => {
      setGlasses(0);
  };

  const progressPercentage = (glasses / goal) * 100;

  return (
    <div className="space-y-6 flex flex-col items-center text-center">
      <h1 className="text-3xl font-bold text-brand-text-light">Water Intake</h1>
      <p className="text-brand-text-dark max-w-md">
        Stay hydrated! A common recommendation is 8 glasses of water a day. Use this tracker to log your consumption.
      </p>

      <div className="bg-brand-surface rounded-xl shadow-lg p-8 w-full max-w-lg space-y-8">
        <div className="relative w-48 h-48 mx-auto bg-brand-secondary rounded-full flex items-center justify-center overflow-hidden">
            <div className="absolute bottom-0 left-0 w-full bg-blue-500/50 transition-all duration-500" style={{ height: `${progressPercentage}%` }}></div>
            <div className="relative text-center">
                <WaterIcon className="w-16 h-16 text-brand-text-light" />
                <p className="text-3xl font-bold text-brand-text-light mt-2">{glasses} / {goal}</p>
                <p className="text-sm text-brand-text-dark">glasses</p>
            </div>
        </div>

        {glasses >= goal && (
            <div className="text-center p-3 bg-brand-success/20 text-brand-success rounded-md">
                <p className="font-semibold">Goal Achieved! Great job!</p>
            </div>
        )}

        <div className="flex justify-center gap-4">
            <button onClick={handleRemoveGlass} disabled={glasses === 0} className="w-16 h-16 rounded-full bg-brand-secondary text-brand-text-light text-3xl font-bold hover:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed">-</button>
            <button onClick={handleAddGlass} disabled={glasses === goal} className="w-16 h-16 rounded-full bg-brand-primary text-white text-3xl font-bold hover:bg-brand-primary-hover disabled:opacity-50 disabled:cursor-not-allowed">+</button>
        </div>
        
        <div className="border-t border-brand-secondary pt-6 text-center">
            <button onClick={handleReset} className="text-sm text-brand-text-dark hover:text-brand-primary">
                Reset for a new day
            </button>
        </div>
      </div>
    </div>
  );
};

export default WaterIntake;
