import React, { useState, useMemo } from 'react';
import { mockExercises } from '../data/mockData';
import { Exercise } from '../types';

const muscleGroups: Exercise['muscleGroup'][] = ['Chest', 'Back', 'Legs', 'Shoulders', 'Arms', 'Core'];

const ExerciseCard: React.FC<{ exercise: Exercise }> = ({ exercise }) => (
    <div className="bg-brand-secondary/50 rounded-lg overflow-hidden shadow-md group">
        <img src={exercise.imageUrl} alt={exercise.name} className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300" />
        <div className="p-4">
            <h3 className="font-bold text-lg text-brand-text-light">{exercise.name}</h3>
            <span className="text-xs font-semibold px-2 py-1 bg-brand-primary/20 text-brand-primary rounded-full">{exercise.muscleGroup}</span>
        </div>
    </div>
);

const Exercises: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedGroup, setSelectedGroup] = useState<Exercise['muscleGroup'] | 'All'>('All');

    const filteredExercises = useMemo(() => {
        return mockExercises.filter(ex => {
            const matchesGroup = selectedGroup === 'All' || ex.muscleGroup === selectedGroup;
            const matchesSearch = ex.name.toLowerCase().includes(searchTerm.toLowerCase());
            return matchesGroup && matchesSearch;
        });
    }, [searchTerm, selectedGroup]);

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold text-brand-text-light">Exercise Library</h1>

            <div className="bg-brand-surface rounded-xl shadow-lg p-4 space-y-4">
                <div className="flex flex-col md:flex-row gap-4">
                    <input
                        type="text"
                        placeholder="Search exercises..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full md:flex-grow bg-brand-secondary border-brand-secondary text-brand-text-light rounded-md px-4 py-2 focus:ring-2 focus:ring-brand-primary focus:outline-none"
                    />
                     <select
                        value={selectedGroup}
                        onChange={(e) => setSelectedGroup(e.target.value as Exercise['muscleGroup'] | 'All')}
                        className="w-full md:w-48 bg-brand-secondary border-brand-secondary text-brand-text-light rounded-md px-4 py-2 focus:ring-2 focus:ring-brand-primary focus:outline-none"
                      >
                          <option value="All">All Muscle Groups</option>
                          {muscleGroups.map(group => <option key={group} value={group}>{group}</option>)}
                     </select>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredExercises.map(exercise => (
                        <ExerciseCard key={exercise.id} exercise={exercise} />
                    ))}
                </div>
                 {filteredExercises.length === 0 && (
                    <div className="text-center p-10 text-brand-text-dark">
                        <p>No exercises found matching your criteria.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Exercises;
