import React, { useState, useMemo, useEffect } from 'react';
import { DayOfWeek, Exercise } from '../types';
import { PlusIcon } from '../components/icons';
import { api } from '../utils/api';
import Loading from '../components/Loading';

const days: DayOfWeek[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const muscleGroups: Exercise['muscleGroup'][] = ['Chest', 'Back', 'Legs', 'Shoulders', 'Arms', 'Core'];

interface WorkoutEntry {
  instanceId: string;
  exercise: Exercise;
}

type UserWorkoutPlan = Record<DayOfWeek, WorkoutEntry[]>;

const initialPlanState = days.reduce((acc, day) => {
    acc[day] = [];
    return acc;
}, {} as UserWorkoutPlan);

const WorkoutPlan: React.FC = () => {
    const [plan, setPlan] = useState<UserWorkoutPlan>(initialPlanState);
    const [exercises, setExercises] = useState<Exercise[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedDay, setSelectedDay] = useState<DayOfWeek>('Monday');
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedGroup, setSelectedGroup] = useState<Exercise['muscleGroup'] | 'All'>('All');

    useEffect(() => {
        const fetchExercises = async () => {
            setLoading(true);
            try {
                const data = await api.get<Exercise[]>('/exercises');
                setExercises(data);
            } catch (error) {
                console.error("Failed to fetch exercises:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchExercises();
    }, []);

    const handleAddExercise = (day: DayOfWeek, exercise: Exercise) => {
        if (day === 'Saturday') return;
        
        const newEntry: WorkoutEntry = {
            instanceId: `${exercise.id}_${Date.now()}_${Math.random()}`,
            exercise: exercise
        };

        setPlan(prevPlan => ({
            ...prevPlan,
            [day]: [...prevPlan[day], newEntry]
        }));
    };

    const handleRemoveExercise = (day: DayOfWeek, instanceId: string) => {
        setPlan(prevPlan => ({
            ...prevPlan,
            [day]: prevPlan[day].filter(entry => entry.instanceId !== instanceId)
        }));
    };

    const filteredExercises = useMemo(() => {
        return exercises.filter(ex => {
            const matchesGroup = selectedGroup === 'All' || ex.muscleGroup === selectedGroup;
            const matchesSearch = ex.name.toLowerCase().includes(searchTerm.toLowerCase());
            return matchesGroup && matchesSearch;
        });
    }, [exercises, searchTerm, selectedGroup]);

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold text-brand-text-light">My Workout Planner</h1>
            <p className="text-brand-text-dark max-w-3xl">
                Build your own weekly workout routine. Click a day on the left to select it, then add exercises from the library on the right.
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Left Column: Weekly Planner */}
                <div className="bg-brand-surface rounded-xl shadow-lg p-6 space-y-4">
                    <h2 className="text-xl font-semibold text-brand-text-light">My Weekly Plan</h2>
                    <div className="space-y-3">
                    {days.map(day => (
                        <div 
                            key={day}
                            onClick={() => day !== 'Saturday' && setSelectedDay(day)}
                            className={`rounded-lg border-2 p-4 transition-all duration-200 ${
                                selectedDay === day ? 'border-brand-primary bg-brand-primary/10' : 'border-brand-secondary hover:border-brand-secondary/60'
                            } ${day === 'Saturday' ? 'cursor-not-allowed bg-brand-secondary/50' : 'cursor-pointer'}`}
                        >
                            <h3 className="font-bold text-brand-text-light">{day}</h3>
                            {day === 'Saturday' ? (
                                <div className="text-sm text-brand-text-dark mt-2 flex items-center gap-2">
                                    <i className="fas fa-spa text-brand-success"></i>
                                    <span>Yoga & Active Recovery</span>
                                </div>
                            ) : (
                                <ul className="mt-2 space-y-2">
                                    {plan[day].length > 0 ? plan[day].map(entry => (
                                        <li key={entry.instanceId} className="flex justify-between items-center text-sm bg-brand-secondary px-3 py-2 rounded-md">
                                            <span className="text-brand-text-light">{entry.exercise.name}</span>
                                            <button onClick={() => handleRemoveExercise(day, entry.instanceId)} className="text-brand-danger hover:opacity-75">
                                                 <i className="fas fa-minus-circle"></i>
                                            </button>
                                        </li>
                                    )) : (
                                        <p className="text-xs text-brand-text-dark">No exercises added yet.</p>
                                    )}
                                </ul>
                            )}
                        </div>
                    ))}
                    </div>
                </div>

                {/* Right Column: Exercise Library */}
                <div className="bg-brand-surface rounded-xl shadow-lg p-6 flex flex-col">
                    <h2 className="text-xl font-semibold text-brand-text-light mb-4">Exercise Library</h2>
                    <p className="text-sm text-brand-text-dark mb-4">Adding exercises to: <span className="font-bold text-brand-primary">{selectedDay}</span></p>
                     <div className="flex flex-col sm:flex-row gap-2 mb-4">
                        <input
                            type="text"
                            placeholder="Search..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="flex-grow bg-brand-secondary border-brand-secondary text-brand-text-light rounded-md px-4 py-2 focus:ring-2 focus:ring-brand-primary focus:outline-none"
                        />
                         <select
                            value={selectedGroup}
                            onChange={(e) => setSelectedGroup(e.target.value as any)}
                            className="bg-brand-secondary border-brand-secondary text-brand-text-light rounded-md px-4 py-2 focus:ring-2 focus:ring-brand-primary focus:outline-none"
                          >
                              <option value="All">All Groups</option>
                              {muscleGroups.map(g => <option key={g} value={g}>{g}</option>)}
                         </select>
                    </div>
                    <div className="flex-grow overflow-y-auto pr-2 -mr-2">
                        {loading ? <Loading /> : (
                            <ul className="space-y-2">
                                {filteredExercises.map(exercise => (
                                    <li key={exercise.id} className="flex justify-between items-center bg-brand-secondary/50 p-3 rounded-md">
                                        <div>
                                            <p className="font-medium text-brand-text-light">{exercise.name}</p>
                                            <p className="text-xs text-brand-text-dark">{exercise.muscleGroup}</p>
                                        </div>
                                        <button 
                                          onClick={() => handleAddExercise(selectedDay, exercise)} 
                                          className="text-brand-success hover:opacity-75 text-xl disabled:text-brand-text-dark disabled:cursor-not-allowed"
                                          title={`Add to ${selectedDay}`}
                                          disabled={selectedDay === 'Saturday'}
                                          >
                                          <PlusIcon className="w-5 h-5"/>
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WorkoutPlan;