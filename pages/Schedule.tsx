
import React from 'react';
import { mockClasses } from '../data/mockData';
import { GymClass } from '../types';

const daysOfWeek: GymClass['day'][] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const categoryColors = {
  Cardio: 'bg-red-500/20 text-red-400 border-red-500/50',
  Strength: 'bg-blue-500/20 text-blue-400 border-blue-500/50',
  Yoga: 'bg-green-500/20 text-green-400 border-green-500/50',
  CrossFit: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50',
};

const ClassCard: React.FC<{ gymClass: GymClass }> = ({ gymClass }) => (
  <div className={`p-3 rounded-lg border-l-4 ${categoryColors[gymClass.category]} bg-brand-secondary/50 space-y-1`}>
    <p className="font-bold text-sm text-brand-text-light">{gymClass.name}</p>
    <p className="text-xs text-brand-text-dark">{gymClass.instructor}</p>
    <p className="text-xs text-brand-text-dark">{gymClass.time} - {new Date(new Date(`1970-01-01T${gymClass.time}:00`).getTime() + gymClass.duration * 60000).toTimeString().substring(0,5)}</p>
    <div className="flex justify-between items-center text-xs pt-1">
        <span className="font-medium">{gymClass.enrolled}/{gymClass.capacity}</span>
        <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${categoryColors[gymClass.category]}`}>{gymClass.category}</span>
    </div>
  </div>
);

const Schedule: React.FC = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-brand-text-light">Class Schedule</h1>

      <div className="bg-brand-surface rounded-xl shadow-lg p-4 sm:p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-4">
          {daysOfWeek.map(day => (
            <div key={day} className="space-y-4">
              <h2 className="text-center font-semibold text-lg text-brand-primary">{day}</h2>
              <div className="space-y-3">
                {mockClasses
                  .filter(c => c.day === day)
                  .sort((a, b) => a.time.localeCompare(b.time))
                  .map(gymClass => (
                    <ClassCard key={gymClass.id} gymClass={gymClass} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Schedule;
