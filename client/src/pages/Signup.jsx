import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Signup = () => {
  const [name, setName] = useState('');
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
      const { data } = await axios.post('http://localhost:5000/api/auth/signup', { name, email, password }, config);
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
      {/* Left Side - Visual */}
      <div className="hidden lg:flex flex-1 bg-gray-900 relative overflow-hidden items-center justify-center p-24">
        <div className="absolute top-0 right-0 w-full h-full opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-500 via-transparent to-transparent"></div>
        <div className="relative text-white max-w-lg text-center">
          <div className="w-24 h-24 bg-blue-600 rounded-3xl mx-auto mb-10 flex items-center justify-center text-4xl font-black rotate-12 shadow-2xl shadow-blue-500/20">E</div>
          <h3 className="text-5xl font-black mb-6 leading-tight">Create Something Amazing.</h3>
          <p className="text-gray-400 text-lg leading-relaxed">The only platform designed specifically for college organizations to reach every student on campus.</p>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="flex-1 flex flex-col justify-center px-8 lg:px-24">
        <div className="max-w-md w-full mx-auto">
          <h2 className="text-4xl font-black text-gray-900 mb-2">Get Started</h2>
          <p className="text-gray-500 font-medium mb-10">Join the Eventify community today.</p>

          {error && <div className="p-4 bg-red-50 text-red-600 rounded-2xl text-sm font-bold mb-6 border border-red-100">{error}</div>}

          <form onSubmit={submitHandler} className="space-y-6">
            <div>
              <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Full Name</label>
              <input
                type="text"
                placeholder="John Doe"
                className="w-full px-6 py-4 bg-white border border-gray-100 rounded-2xl focus:ring-4 focus:ring-blue-50 outline-none transition-all font-medium text-gray-900 shadow-sm shadow-gray-50"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
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
                placeholder="Min. 8 characters"
                className="w-full px-6 py-4 bg-white border border-gray-100 rounded-2xl focus:ring-4 focus:ring-blue-50 outline-none transition-all font-medium text-gray-900 shadow-sm shadow-gray-50"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            
            <button 
              type="submit" 
              disabled={loading}
              className="w-full py-4 bg-blue-600 text-white rounded-2xl font-bold hover:bg-blue-700 transition-all active:scale-[0.98] shadow-xl shadow-blue-100 disabled:bg-gray-400"
            >
              {loading ? 'Creating Account...' : 'Sign Up'}
            </button>
          </form>

          <p className="mt-10 text-center text-gray-500 font-medium">
            Already have an account? <Link to="/login" className="text-blue-600 font-bold hover:underline">Log in here</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
