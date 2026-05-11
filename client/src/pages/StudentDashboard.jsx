import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const StudentDashboard = () => {
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const userInfo = JSON.parse(localStorage.getItem('userInfo'));

  useEffect(() => {
    const fetchMyRegistrations = async () => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        };
        const { data } = await axios.get('/api/registrations/my', config);
        setRegistrations(data);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || err.message);
        setLoading(false);
      }
    };

    if (userInfo) {
      fetchMyRegistrations();
    }
  }, [userInfo]);

  if (loading) return <div className="text-center py-20">Loading your events...</div>;

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-3xl font-bold text-gray-900">Student Dashboard</h1>
          <Link to="/" className="text-blue-600 hover:underline">Browse More Events</Link>
        </div>

        <h2 className="text-xl font-semibold mb-6 text-gray-700">My Registered Events</h2>

        {error && <div className="text-red-500 mb-4">{error}</div>}

        {registrations.length === 0 ? (
          <div className="bg-white p-8 rounded-xl shadow-sm text-center">
            <p className="text-gray-500 mb-4">You haven't registered for any events yet.</p>
            <Link to="/" className="inline-block px-6 py-2 bg-blue-600 text-white rounded-lg">Explore Events</Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {registrations.map((reg) => (
              <div key={reg._id} className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
                <img src={reg.eventId.image} alt={reg.eventId.title} className="w-full h-40 object-cover" />
                <div className="p-5">
                  <h3 className="font-bold text-lg mb-2">{reg.eventId.title}</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    {new Date(reg.eventId.date).toLocaleDateString()} at {reg.eventId.location}
                  </p>
                  <Link 
                    to={`/events/${reg.eventId._id}`}
                    className="text-blue-600 text-sm font-medium hover:underline"
                  >
                    View Details &rarr;
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentDashboard;
