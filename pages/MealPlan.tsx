import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { DayOfWeek, MealPlan as MealPlanType, Meal, MealType, Member } from '../types';
import { api } from '../utils/api';
import Loading from '../components/Loading';

const days: DayOfWeek[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const mealTypes: MealType[] = ['Breakfast', 'Lunch', 'Dinner', 'Snack'];

const planTypeColors: Record<MealPlanType['type'], string> = {
    'Veg': 'border-green-500 text-green-400',
    'Non-Veg': 'border-red-500 text-red-400',
    'Vegan': 'border-blue-500 text-blue-400',
};

const MealPlan: React.FC = () => {
    const { user } = useAuth();
    const [assignedPlan, setAssignedPlan] = useState<MealPlanType | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMealPlan = async () => {
            if (!user) {
                setLoading(false);
                return;
            };

            setLoading(true);
            try {
                // In a larger app, we might have a dedicated /api/me endpoint
                const allMembers = await api.get<Member[]>('/members');
                const currentMember = allMembers.find(m => m.email === user.email);

                if (currentMember && currentMember.assignedMealPlanId) {
                    const plan = await api.get<MealPlanType>(`/meal-plans/${currentMember.assignedMealPlanId}`);
                    setAssignedPlan(plan);
                } else {
                    setAssignedPlan(null);
                }
            } catch (error) {
                console.error("Failed to fetch meal plan:", error);
                setAssignedPlan(null);
            } finally {
                setLoading(false);
            }
        };

        fetchMealPlan();
    }, [user]);

    if (loading) {
        return <Loading />;
    }

    if (!assignedPlan) {
        return (
            <div className="flex flex-col items-center justify-center h-full text-center p-6">
                <i className="fas fa-utensils text-5xl text-brand-secondary mb-4"></i>
                <h1 className="text-3xl font-bold text-brand-text-light">No Meal Plan Assigned</h1>
                <p className="text-brand-text-dark max-w-md mt-2">
                    It looks like you don't have a meal plan assigned yet. Please contact an admin to get one set up for you.
                </p>
            </div>
        );
    }
    
    return (
        <div className="space-y-6">
            <div className={`p-6 rounded-xl border-2 bg-brand-surface ${planTypeColors[assignedPlan.type]}`}>
                 <h1 className="text-3xl font-bold text-brand-text-light">{assignedPlan.name}</h1>
                 <p className="text-brand-text-dark mt-1">{assignedPlan.description}</p>
                 <span className={`mt-2 inline-block px-3 py-1 text-xs font-semibold rounded-full bg-opacity-20 ${planTypeColors[assignedPlan.type]}`}>
                    {assignedPlan.type} Plan
                 </span>
            </div>
           
            <div className="bg-brand-surface rounded-xl shadow-lg overflow-x-auto">
                <div className="grid grid-cols-8 min-w-[1000px]">
                    <div className="p-4"></div> {/* Empty corner */}
                    {days.map(day => (
                        <div key={day} className="text-center font-semibold p-4 border-b border-l border-brand-secondary text-brand-primary">
                            {day}
                        </div>
                    ))}
                    
                    {mealTypes.map(mealType => (
                        <React.Fragment key={mealType}>
                            <div className="font-semibold p-4 border-l border-t border-brand-secondary text-brand-primary">{mealType}</div>
                            {days.map(day => {
                                const meal = assignedPlan.schedule[day]?.[mealType];
                                return (
                                <div key={`${day}-${mealType}`} className="p-2 border-l border-t border-brand-secondary">
                                    {meal ? (
                                        <div className="bg-brand-secondary/50 rounded-md p-3 h-full">
                                            <p className="font-semibold text-sm text-brand-text-light">{meal.name}</p>
                                            <p className="text-xs text-brand-text-dark">{meal.calories} kcal</p>
                                        </div>
                                    ) : (
                                        <div className="flex items-center justify-center h-full text-brand-text-dark text-xs">
                                           -
                                        </div>
                                    )}
                                </div>
                                )
                            })}
                        </React.Fragment>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MealPlan;