import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  DashboardIcon, MembersIcon, ScheduleIcon, BillingIcon, LogoutIcon,
  ActivityIcon, ProgressIcon, MealIcon, ExerciseIcon, WaterIcon, GeminiIcon, ClipboardListIcon
} from './icons';
import { UserRole } from '../types';

interface SidebarProps {
  isSidebarOpen: boolean;
  setIsSidebarOpen: (isOpen: boolean) => void;
}

const NavItem: React.FC<{ to: string; icon: React.ReactNode; children: React.ReactNode }> = ({ to, icon, children }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors duration-200 ${
        isActive
          ? 'bg-brand-primary text-white shadow-lg'
          : 'text-brand-text-dark hover:bg-brand-secondary hover:text-brand-text-light'
      }`
    }
  >
    {icon}
    <span className="ml-3">{children}</span>
  </NavLink>
);

const Sidebar: React.FC<SidebarProps> = ({ isSidebarOpen, setIsSidebarOpen }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isAdmin = user?.role === UserRole.Admin;

  return (
    <>
      <aside className={`fixed lg:relative inset-y-0 left-0 bg-brand-surface z-30 w-64 p-4 space-y-4 flex-shrink-0 flex flex-col transition-transform duration-300 ease-in-out ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}>
        <div>
          <div className="flex items-center justify-center mb-6 py-4">
             <i className="fas fa-dumbbell text-brand-primary text-3xl"></i>
             <span className="ml-3 text-2xl font-bold text-brand-text-light">GymPro</span>
          </div>
          <nav className="space-y-2">
            <h3 className="px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Management</h3>
            {isAdmin && (
              <>
                <NavItem to="/dashboard" icon={<DashboardIcon className="w-5 h-5" />}>Dashboard</NavItem>
                <NavItem to="/members" icon={<MembersIcon className="w-5 h-5" />}>Members</NavItem>
              </>
            )}
            <NavItem to="/schedule" icon={<ScheduleIcon className="w-5 h-5" />}>Schedule</NavItem>
            {isAdmin && (
                <NavItem to="/billing" icon={<BillingIcon className="w-5 h-5" />}>Billing</NavItem>
            )}
            
            <h3 className="px-4 pt-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">My Health</h3>
            <NavItem to="/activity" icon={<ActivityIcon className="w-5 h-5" />}>Activity</NavItem>
            <NavItem to="/progress" icon={<ProgressIcon className="w-5 h-5" />}>Progress</NavItem>
            <NavItem to="/meal-plan" icon={<MealIcon className="w-5 h-5" />}>Meal Plan</NavItem>
            <NavItem to="/workout-plan" icon={<ClipboardListIcon className="w-5 h-5" />}>Workout Plan</NavItem>
            <NavItem to="/exercises" icon={<ExerciseIcon className="w-5 h-5" />}>Exercises</NavItem>
            <NavItem to="/water-intake" icon={<WaterIcon className="w-5 h-5" />}>Water Intake</NavItem>

            <h3 className="px-4 pt-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">AI Tools</h3>
            <NavItem to="/gemini" icon={<GeminiIcon className="w-5 h-5" />}>Ask Gemini</NavItem>

          </nav>
        </div>
        <div className="mt-auto">
           {user && (
            <div className="p-4 border-t border-brand-secondary">
              <p className="text-sm font-semibold text-brand-text-light">{user.name}</p>
              <p className="text-xs text-brand-text-dark">{user.email}</p>
            </div>
          )}
          <button
            onClick={handleLogout}
            className="w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg text-brand-text-dark hover:bg-brand-secondary hover:text-brand-text-light"
          >
            <LogoutIcon className="w-5 h-5" />
            <span className="ml-3">Logout</span>
          </button>
        </div>
      </aside>
      {isSidebarOpen && <div onClick={() => setIsSidebarOpen(false)} className="fixed inset-0 bg-black/50 z-20 lg:hidden"></div>}
    </>
  );
};

export default Sidebar;