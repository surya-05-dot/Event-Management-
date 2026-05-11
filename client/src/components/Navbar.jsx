import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));

  const handleLogout = () => {
    localStorage.removeItem('userInfo');
    navigate('/login');
  };

  return (
    <nav className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white font-bold text-xl group-hover:rotate-6 transition-transform">
              E
            </div>
            <span className="text-2xl font-black text-gray-900 tracking-tight">Eventify</span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <Link to="/" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">Home</Link>
            {userInfo ? (
              <div className="flex items-center gap-6">
                {userInfo.role === 'admin' ? (
                  <Link to="/admin/dashboard" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">Admin Panel</Link>
                ) : (
                  <Link to="/dashboard" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">My Events</Link>
                )}
                <div className="h-6 w-[1px] bg-gray-200"></div>
                <div className="flex items-center gap-3">
                  <span className="text-sm font-semibold text-gray-700">Hi, {userInfo.name.split(' ')[0]}</span>
                  <button 
                    onClick={handleLogout}
                    className="px-4 py-2 bg-red-50 text-red-600 rounded-xl text-sm font-bold hover:bg-red-100 transition-all"
                  >
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex gap-4">
                <Link to="/login" className="text-gray-600 hover:text-blue-600 font-medium self-center">Login</Link>
                <Link to="/signup" className="px-6 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-bold hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-200 transition-all active:scale-95">
                  Get Started
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button - Placeholder */}
          <div className="md:hidden flex items-center">
            <button className="text-gray-600">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
