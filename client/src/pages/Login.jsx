import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const config = { headers: { 'Content-Type': 'application/json' } };
      const { data } = await axios.post('/api/auth/login', { email, password }, config);
      localStorage.setItem('userInfo', JSON.stringify(data));
      setLoading(false);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || err.message);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex">
      {/* Left Side - Form */}
      <div className="flex-1 flex flex-col justify-center px-8 lg:px-24">
        <div className="max-w-md w-full mx-auto">
          <Link to="/" className="flex items-center gap-2 mb-12 group inline-flex">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white font-bold text-xl group-hover:rotate-6 transition-transform">E</div>
            <span className="text-2xl font-black text-gray-900 tracking-tight">Eventify</span>
          </Link>
          
          <h2 className="text-4xl font-black text-gray-900 mb-2">Welcome Back</h2>
          <p className="text-gray-500 font-medium mb-10">Log in to manage your campus events.</p>

          {error && <div className="p-4 bg-red-50 text-red-600 rounded-2xl text-sm font-bold mb-6 border border-red-100">{error}</div>}

          <form onSubmit={submitHandler} className="space-y-6">
            <div>
              <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Email Address</label>
              <input
                type="email"
                placeholder="name@college.edu"
                className="w-full px-6 py-4 bg-white border border-gray-100 rounded-2xl focus:ring-4 focus:ring-blue-50 outline-none transition-all font-medium text-gray-900 shadow-sm shadow-gray-50"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Password</label>
              <input
                type="password"
                placeholder="••••••••"
                className="w-full px-6 py-4 bg-white border border-gray-100 rounded-2xl focus:ring-4 focus:ring-blue-50 outline-none transition-all font-medium text-gray-900 shadow-sm shadow-gray-50"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            
            <button 
              type="submit" 
              disabled={loading}
              className="w-full py-4 bg-gray-900 text-white rounded-2xl font-bold hover:bg-gray-800 transition-all active:scale-[0.98] shadow-xl shadow-gray-200 disabled:bg-gray-400"
            >
              {loading ? 'Authenticating...' : 'Sign In'}
            </button>
          </form>

          <p className="mt-10 text-center text-gray-500 font-medium">
            Don't have an account? <Link to="/signup" className="text-blue-600 font-bold hover:underline">Create one for free</Link>
          </p>
        </div>
      </div>

      {/* Right Side - Visual */}
      <div className="hidden lg:flex flex-1 bg-blue-600 relative overflow-hidden items-center justify-center p-24">
        <div className="absolute top-0 right-0 w-full h-full opacity-10">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path d="M0 0 L100 100 M0 100 L100 0" stroke="white" strokeWidth="0.1" />
          </svg>
        </div>
        <div className="relative text-white max-w-lg">
          <h3 className="text-5xl font-black mb-6 leading-tight">Your Passport to Campus Life.</h3>
          <p className="text-blue-100 text-lg leading-relaxed">Join thousands of students and discover the most exciting events happening right now on campus.</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
