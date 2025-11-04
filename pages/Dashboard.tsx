
import React from 'react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { mockMembers, mockClasses, mockPayments, memberGrowthData } from '../data/mockData';
import { MembersIcon, ScheduleIcon, BillingIcon } from '../components/icons';
import { MembershipStatus } from '../types';

const StatCard: React.FC<{ title: string; value: string | number; icon: React.ReactNode }> = ({ title, value, icon }) => (
    <div className="bg-brand-surface rounded-xl p-6 flex items-center shadow-lg">
        <div className="bg-brand-secondary p-4 rounded-full">
            {icon}
        </div>
        <div className="ml-4">
            <p className="text-brand-text-dark text-sm font-medium">{title}</p>
            <p className="text-2xl font-bold text-brand-text-light">{value}</p>
        </div>
    </div>
);

const Dashboard: React.FC = () => {
    const totalMembers = mockMembers.length;
    const activeMembers = mockMembers.filter(m => m.membershipStatus === MembershipStatus.Active).length;
    const upcomingClasses = mockClasses.filter(c => ['Saturday', 'Sunday'].includes(c.day)).length;
    
    return (
        <div className="space-y-8">
            <h1 className="text-3xl font-bold text-brand-text-light">Dashboard</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <StatCard title="Total Members" value={totalMembers} icon={<MembersIcon className="w-7 h-7 text-brand-primary" />} />
                <StatCard title="Active Members" value={activeMembers} icon={<MembersIcon className="w-7 h-7 text-brand-success" />} />
                <StatCard title="Weekend Classes" value={upcomingClasses} icon={<ScheduleIcon className="w-7 h-7 text-brand-warning" />} />
            </div>

            <div className="bg-brand-surface rounded-xl p-6 shadow-lg">
                <h2 className="text-xl font-semibold mb-4 text-brand-text-light">New Member Growth</h2>
                 <div style={{ width: '100%', height: 300 }}>
                    <ResponsiveContainer>
                        <LineChart data={memberGrowthData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                            <XAxis dataKey="name" stroke="#94a3b8" />
                            <YAxis stroke="#94a3b8" />
                            <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155' }} />
                            <Legend />
                            <Line type="monotone" dataKey="newMembers" stroke="#818cf8" strokeWidth={2} activeDot={{ r: 8 }} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>

             <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-brand-surface rounded-xl p-6 shadow-lg">
                    <h2 className="text-xl font-semibold mb-4 text-brand-text-light">Recent Activity</h2>
                     <ul className="space-y-4">
                        {mockPayments.slice(0, 3).map(p => (
                            <li key={p.id} className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <div className="bg-brand-success/20 p-2 rounded-full"><BillingIcon className="h-5 w-5 text-brand-success" /></div>
                                    <p className="ml-3 text-sm font-medium">{p.memberName} made a payment of ${p.amount}.</p>
                                </div>
                                <span className="text-xs text-brand-text-dark">{new Date(p.date).toLocaleDateString()}</span>
                            </li>
                        ))}
                         {mockMembers.slice(0, 2).map(m => (
                            <li key={m.id} className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <div className="bg-brand-primary/20 p-2 rounded-full"><MembersIcon className="h-5 w-5 text-brand-primary" /></div>
                                    <p className="ml-3 text-sm font-medium">{m.name} joined the gym.</p>
                                </div>
                                <span className="text-xs text-brand-text-dark">{new Date(m.joinDate).toLocaleDateString()}</span>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="bg-brand-surface rounded-xl p-6 shadow-lg">
                    <h2 className="text-xl font-semibold mb-4 text-brand-text-light">Today's Classes</h2>
                     <ul className="space-y-3">
                        {mockClasses.slice(0, 4).map(c => (
                            <li key={c.id} className="flex justify-between items-center p-3 bg-brand-secondary/50 rounded-lg">
                                <div>
                                    <p className="font-semibold">{c.name}</p>
                                    <p className="text-sm text-brand-text-dark">{c.instructor} - {c.time}</p>
                                </div>
                                <span className="text-sm font-medium text-brand-primary">{c.enrolled}/{c.capacity}</span>
                            </li>
                        ))}
                    </ul>
                </div>
             </div>
        </div>
    );
};

export default Dashboard;
