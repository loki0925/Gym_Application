import React, { useState, FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import AuthLayout from '../components/AuthLayout';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(email, password);
      navigate('/');
    } catch (err: any) {
      setError(err.message || 'Failed to sign in. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <h2 className="text-2xl font-bold text-center text-brand-text-light">Welcome Back!</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {error && <p className="text-center bg-brand-danger/20 text-brand-danger p-3 rounded-md text-sm">{error}</p>}
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
            autoComplete="current-password"
          />
        </div>
        <div>
          <button type="submit" disabled={loading} className="w-full px-6 py-3 rounded-md bg-brand-primary text-white hover:bg-brand-primary-hover transition-colors font-semibold disabled:bg-brand-secondary disabled:cursor-not-allowed">
            {loading ? 'Signing In...' : 'Sign In'}
          </button>
        </div>
      </form>
      <p className="text-center text-sm text-brand-text-dark">
        Don't have an account?{' '}
        <Link to="/signup" className="font-medium text-brand-primary hover:underline">
          Sign Up
        </Link>
      </p>
    </AuthLayout>
  );
};

export default Login;