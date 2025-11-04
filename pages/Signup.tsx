import React, { useState, FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import AuthLayout from '../components/AuthLayout';
import { UserRole } from '../types';

const Signup: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<UserRole>(UserRole.User);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { signup } = useAuth();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
     if (password.length < 8) {
      setError('Password must be at least 8 characters long.');
      return;
    }
    setError('');
    setLoading(true);
    try {
      await signup(name, email, password, role);
      navigate('/');
    } catch (err: any) {
      setError(err.message || 'Failed to create an account.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <h2 className="text-2xl font-bold text-center text-brand-text-light">Create Your Account</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {error && <p className="text-center bg-brand-danger/20 text-brand-danger p-3 rounded-md text-sm">{error}</p>}

        <div>
         <label className="block text-sm font-medium text-brand-text-dark mb-2">Select Account Type</label>
         <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
           {/* User Role Button */}
           <button
             type="button"
             onClick={() => setRole(UserRole.User)}
             className={`p-4 rounded-lg border-2 text-left transition-colors w-full ${
               role === UserRole.User
                 ? 'border-brand-primary bg-brand-primary/10'
                 : 'border-brand-secondary hover:border-brand-primary/50'
             }`}
           >
             <h3 className="font-semibold text-brand-text-light">Member</h3>
             <p className="text-xs text-brand-text-dark mt-1">Track workouts & view schedules.</p>
           </button>
           
           {/* Admin Role Button */}
           <button
             type="button"
             onClick={() => setRole(UserRole.Admin)}
             className={`p-4 rounded-lg border-2 text-left transition-colors w-full ${
               role === UserRole.Admin
                 ? 'border-brand-primary bg-brand-primary/10'
                 : 'border-brand-secondary hover:border-brand-primary/50'
             }`}
           >
             <h3 className="font-semibold text-brand-text-light">Admin</h3>
             <p className="text-xs text-brand-text-dark mt-1">Manage members & billing.</p>
           </button>
         </div>
       </div>

        <div>
          <label htmlFor="name" className="block text-sm font-medium text-brand-text-dark mb-2">Full Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-brand-secondary border-brand-secondary text-brand-text-light rounded-md p-3 focus:ring-2 focus:ring-brand-primary focus:outline-none"
            required
            autoComplete="name"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-brand-text-dark mb-2">Email Address</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-brand-secondary border-brand-secondary text-brand-text-light rounded-md p-3 focus:ring-2 focus:ring-brand-primary focus:outline-none"
            required
            autoComplete="email"
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-brand-text-dark mb-2">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-brand-secondary border-brand-secondary text-brand-text-light rounded-md p-3 focus:ring-2 focus:ring-brand-primary focus:outline-none"
            required
            autoComplete="new-password"
          />
        </div>
       
        <div>
          <button type="submit" disabled={loading} className="w-full px-6 py-3 rounded-md bg-brand-primary text-white hover:bg-brand-primary-hover transition-colors font-semibold disabled:bg-brand-secondary disabled:cursor-not-allowed">
            {loading ? 'Creating Account...' : 'Sign Up'}
          </button>
        </div>
      </form>
      <p className="text-center text-sm text-brand-text-dark">
        Already have an account?{' '}
        <Link to="/login" className="font-medium text-brand-primary hover:underline">
          Sign In
        </Link>
      </p>
    </AuthLayout>
  );
};

export default Signup;