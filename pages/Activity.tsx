import React, { useState, useMemo, useEffect } from 'react';
import { ActivityLog } from '../types';
import { PlusIcon } from '../components/icons';
import Modal from '../components/Modal';
import { api } from '../utils/api';
import Loading from '../components/Loading';

const activityIcons: Record<ActivityLog['type'], string> = {
  Running: 'fas fa-running',
  Weightlifting: 'fas fa-dumbbell',
  Yoga: 'fas fa-spa',
  Cycling: 'fas fa-biking',
  Swimming: 'fas fa-swimmer',
};

const StatCard: React.FC<{ title: string; value: string; icon: string }> = ({ title, value, icon }) => (
    <div className="bg-brand-surface rounded-xl p-6 flex items-center shadow-lg">
        <div className="bg-brand-secondary p-4 rounded-full">
            <i className={`${icon} w-7 h-7 text-brand-primary`}></i>
        </div>
        <div className="ml-4">
            <p className="text-brand-text-dark text-sm font-medium">{title}</p>
            <p className="text-2xl font-bold text-brand-text-light">{value}</p>
        </div>
    </div>
);

const ActivityForm: React.FC<{ onSubmit: (activity: Omit<ActivityLog, 'id'|'date'>) => void; onCancel: () => void }> = ({ onSubmit, onCancel }) => {
    const [type, setType] = useState<ActivityLog['type']>('Weightlifting');
    const [duration, setDuration] = useState('');
    const [calories, setCalories] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit({
            type,
            duration: parseInt(duration, 10),
            caloriesBurned: parseInt(calories, 10),
        });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div>
                <label htmlFor="type" className="block text-sm font-medium text-brand-text-dark mb-2">Activity Type</label>
                <select id="type" value={type} onChange={(e) => setType(e.target.value as ActivityLog['type'])} className="w-full bg-brand-secondary border-brand-secondary text-brand-text-light rounded-md p-3 focus:ring-2 focus:ring-brand-primary focus:outline-none">
                    {Object.keys(activityIcons).map(t => <option key={t} value={t}>{t}</option>)}
                </select>
            </div>
            <div>
                <label htmlFor="duration" className="block text-sm font-medium text-brand-text-dark mb-2">Duration (minutes)</label>
                <input type="number" id="duration" value={duration} onChange={e => setDuration(e.target.value)} className="w-full bg-brand-secondary border-brand-secondary text-brand-text-light rounded-md p-3 focus:ring-2 focus:ring-brand-primary focus:outline-none" required />
            </div>
            <div>
                <label htmlFor="calories" className="block text-sm font-medium text-brand-text-dark mb-2">Calories Burned</label>
                <input type="number" id="calories" value={calories} onChange={e => setCalories(e.target.value)} className="w-full bg-brand-secondary border-brand-secondary text-brand-text-light rounded-md p-3 focus:ring-2 focus:ring-brand-primary focus:outline-none" required />
            </div>
            <div className="flex justify-end gap-4 pt-4">
                <button type="button" onClick={onCancel} className="px-6 py-2 rounded-md bg-brand-secondary text-brand-text-light hover:bg-slate-600 transition-colors">Cancel</button>
                <button type="submit" className="px-6 py-2 rounded-md bg-brand-primary text-white hover:bg-brand-primary-hover transition-colors font-semibold">Log Activity</button>
            </div>
        </form>
    );
}


const Activity: React.FC = () => {
    const [activities, setActivities] = useState<ActivityLog[]>([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const fetchActivities = async () => {
            setLoading(true);
            try {
                const data = await api.get<ActivityLog[]>('/activity-log');
                setActivities(data);
            } catch (error) {
                console.error("Failed to fetch activities:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchActivities();
    }, []);

    const weeklyStats = useMemo(() => {
        const oneWeekAgo = new Date();
        oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
        const recentActivities = activities.filter(a => new Date(a.date) > oneWeekAgo);

        const totalMinutes = recentActivities.reduce((sum, a) => sum + a.duration, 0);
        const totalCalories = recentActivities.reduce((sum, a) => sum + a.caloriesBurned, 0);

        return {
            count: recentActivities.length,
            time: `${Math.floor(totalMinutes / 60)}h ${totalMinutes % 60}m`,
            calories: totalCalories.toLocaleString(),
        };
    }, [activities]);

    const handleAddActivity = async (activityData: Omit<ActivityLog, 'id'|'date'>) => {
        try {
            const newActivity = await api.post<ActivityLog>('/activity-log', activityData);
            setActivities(prev => [newActivity, ...prev]);
            setIsModalOpen(false);
        } catch (error) {
            console.error("Failed to add activity:", error);
            alert("Error: Could not log new activity.");
        }
    }

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <h1 className="text-3xl font-bold text-brand-text-light">Activity Tracker</h1>
                <button onClick={() => setIsModalOpen(true)} className="flex items-center gap-2 px-4 py-2 rounded-md bg-brand-primary text-white hover:bg-brand-primary-hover transition-colors font-semibold shadow">
                    <PlusIcon className="w-5 h-5"/>
                    <span className="hidden sm:inline">Log New Activity</span>
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <StatCard title="This Week's Activities" value={`${weeklyStats.count}`} icon="fas fa-calendar-check" />
                <StatCard title="Total Time This Week" value={weeklyStats.time} icon="fas fa-clock" />
                <StatCard title="Calories Burned This Week" value={weeklyStats.calories} icon="fas fa-fire" />
            </div>

            <div className="bg-brand-surface rounded-xl shadow-lg overflow-x-auto">
                <h2 className="text-xl font-semibold text-brand-text-light p-4 border-b border-brand-secondary">Activity History</h2>
                {loading ? <Loading /> : (
                    <table className="w-full text-left">
                        <thead className="border-b border-brand-secondary">
                            <tr>
                                <th className="p-4 text-sm font-semibold text-brand-text-dark">Activity</th>
                                <th className="p-4 text-sm font-semibold text-brand-text-dark hidden sm:table-cell">Date</th>
                                <th className="p-4 text-sm font-semibold text-brand-text-dark">Duration</th>
                                <th className="p-4 text-sm font-semibold text-brand-text-dark">Calories Burned</th>
                            </tr>
                        </thead>
                        <tbody>
                            {activities.map(activity => (
                            <tr key={activity.id} className="border-b border-brand-secondary hover:bg-brand-secondary/30 transition-colors">
                                <td className="p-4 flex items-center">
                                    <i className={`${activityIcons[activity.type]} text-brand-primary w-6 text-center`}></i>
                                    <span className="ml-4 font-medium text-brand-text-light">{activity.type}</span>
                                </td>
                                <td className="p-4 text-brand-text-light hidden sm:table-cell">{new Date(activity.date).toLocaleDateString()}</td>
                                <td className="p-4 text-brand-text-light">{activity.duration} min</td>
                                <td className="p-4 text-brand-text-light">{activity.caloriesBurned} kcal</td>
                            </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>

             <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Log New Activity">
                <ActivityForm onSubmit={handleAddActivity} onCancel={() => setIsModalOpen(false)} />
            </Modal>
        </div>
    );
};

export default Activity;