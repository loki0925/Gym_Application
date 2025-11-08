import React, { useState, useEffect } from 'react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { WeightEntry } from '../types';
import { api } from '../utils/api';
import Loading from '../components/Loading';

const Progress: React.FC = () => {
  const [weightHistory, setWeightHistory] = useState<WeightEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [newWeight, setNewWeight] = useState('');

  useEffect(() => {
    const fetchWeightHistory = async () => {
      setLoading(true);
      try {
        const data = await api.get<WeightEntry[]>('/weight-history');
        setWeightHistory(data);
      } catch (error) {
        console.error("Failed to fetch weight history:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchWeightHistory();
  }, []);

  const handleLogWeight = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newWeight || isNaN(parseFloat(newWeight))) return;

    const newEntry: WeightEntry = {
      date: new Date().toISOString().split('T')[0],
      weight: parseFloat(newWeight),
    };

    try {
      const loggedEntry = await api.post<WeightEntry>('/weight-history', newEntry);
      setWeightHistory(prev => [...prev, loggedEntry].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()));
      setNewWeight('');
    } catch (error) {
      console.error("Failed to log new weight:", error);
      alert("Error: Could not log new weight entry.");
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-brand-text-light">My Progress</h1>

      <div className="bg-brand-surface rounded-xl p-6 shadow-lg">
        <h2 className="text-xl font-semibold mb-4 text-brand-text-light">Weight Over Time</h2>
        {loading ? <Loading className="h-[300px]" /> : (
          <div style={{ width: '100%', height: 300 }}>
            <ResponsiveContainer>
              <LineChart data={weightHistory}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="date" stroke="#94a3b8" tickFormatter={(str) => new Date(str).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} />
                <YAxis stroke="#94a3b8" domain={['dataMin - 2', 'dataMax + 2']} />
                <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155' }} labelStyle={{ color: '#f8fafc' }} />
                <Legend />
                <Line type="monotone" dataKey="weight" stroke="#818cf8" strokeWidth={2} activeDot={{ r: 8 }} name="Weight (kg)" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-brand-surface rounded-xl p-6 shadow-lg">
          <h2 className="text-xl font-semibold mb-4 text-brand-text-light">Log Today's Weight</h2>
          <form onSubmit={handleLogWeight} className="flex gap-4 items-end">
              <div className="flex-grow">
                  <label htmlFor="weight" className="block text-sm font-medium text-brand-text-dark mb-2">Weight (kg)</label>
                  <input
                    id="weight"
                    type="number"
                    step="0.1"
                    value={newWeight}
                    onChange={(e) => setNewWeight(e.target.value)}
                    className="w-full bg-brand-secondary border-brand-secondary text-brand-text-light rounded-md p-3 focus:ring-2 focus:ring-brand-primary focus:outline-none"
                    placeholder="e.g., 82.5"
                    required
                  />
              </div>
              <button type="submit" className="px-6 py-3 rounded-md bg-brand-primary text-white hover:bg-brand-primary-hover transition-colors font-semibold">
                Log
              </button>
          </form>
        </div>

        <div className="bg-brand-surface rounded-xl shadow-lg max-h-80 overflow-y-auto">
            <h2 className="text-xl font-semibold text-brand-text-light p-4 sticky top-0 bg-brand-surface border-b border-brand-secondary">History</h2>
            <table className="w-full text-left">
                <tbody>
                    {[...weightHistory].reverse().map((entry, index) => (
                        <tr key={index} className="border-b border-brand-secondary last:border-b-0">
                            <td className="p-3 text-brand-text-light">{new Date(entry.date).toLocaleDateString()}</td>
                            <td className="p-3 text-brand-text-light font-semibold text-right">{entry.weight.toFixed(1)} kg</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
      </div>
    </div>
  );
};

export default Progress;