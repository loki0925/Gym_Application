import React, { useState } from 'react';
import { HashRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import { AuthProvider, useAuth } from './context/AuthContext';
import Dashboard from './pages/Dashboard';
import Members from './pages/Members';
import Schedule from './pages/Schedule';
import Billing from './pages/Billing';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Activity from './pages/Activity';
import Progress from './pages/Progress';
import MealPlan from './pages/MealPlan';
import Exercises from './pages/Exercises';
import WaterIntake from './pages/WaterIntake';
import { MenuIcon } from './components/icons';
import { UserRole } from './types';

// The main layout for the authenticated app
function AppLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  return (
    <div className="flex h-screen bg-brand-bg text-brand-text-light font-sans">
      <Sidebar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-brand-surface lg:hidden flex items-center justify-between p-4 border-b border-brand-secondary shadow-md">
           <button onClick={() => setIsSidebarOpen(true)} className="text-brand-text-dark">
             <MenuIcon />
           </button>
           <div className="flex items-center">
             <i className="fas fa-dumbbell text-brand-primary text-xl"></i>
             <span className="ml-2 text-lg font-bold text-brand-text-light">GymPro</span>
           </div>
        </header>
        <div className="flex-1 overflow-x-hidden overflow-y-auto p-4 sm:p-6 lg:p-8">
            <Outlet />
        </div>
      </main>
    </div>
  );
}

const LoadingScreen: React.FC = () => (
  <div className="flex items-center justify-center h-screen bg-brand-bg">
    <div className="text-brand-text-light text-xl">Loading...</div>
  </div>
);


// Protects routes that require authentication
function PrivateRoute() {
  const { user, loading } = useAuth();
  if (loading) return <LoadingScreen />;
  return user ? <AppLayout /> : <Navigate to="/login" replace />;
}

// Protects public routes from authenticated users
function PublicRoute() {
    const { user, loading } = useAuth();
    if (loading) return <LoadingScreen />;
    return user ? <Navigate to="/" replace /> : <Outlet />;
}


// Protects routes that are only for Admins
function AdminRoute() {
    const { user } = useAuth();
    // This assumes PrivateRoute has already confirmed the user exists.
    return user?.role === UserRole.Admin ? <Outlet /> : <Navigate to="/schedule" replace />;
}

// Redirects logged-in users to their respective home pages from the root URL
function HomeRedirect() {
    const { user } = useAuth();
    if (user?.role === UserRole.Admin) {
        return <Navigate to="/dashboard" replace />;
    }
    return <Navigate to="/schedule" replace />;
}

const App: React.FC = () => {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* Public routes */}
          <Route element={<PublicRoute />}>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Route>
          
          {/* Private routes */}
          <Route path="/" element={<PrivateRoute />}>
             <Route index element={<HomeRedirect />} />
             
             {/* Routes for both Users and Admins */}
             <Route path="schedule" element={<Schedule />} />
             <Route path="activity" element={<Activity />} />
             <Route path="progress" element={<Progress />} />
             <Route path="meal-plan" element={<MealPlan />} />
             <Route path="exercises" element={<Exercises />} />
             <Route path="water-intake" element={<WaterIntake />} />

             {/* Admin-only routes */}
             <Route element={<AdminRoute />}>
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="members" element={<Members />} />
                <Route path="billing" element={<Billing />} />
             </Route>
             
             <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default App;