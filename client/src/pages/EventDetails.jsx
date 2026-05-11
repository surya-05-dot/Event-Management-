import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EventDetails = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [registering, setRegistering] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const userInfo = JSON.parse(localStorage.getItem('userInfo'));

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const { data } = await axios.get(`http://localhost:5000/api/events/${id}`);
        setEvent(data);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || err.message);
        setLoading(false);
      }
    };
    fetchEvent();
  }, [id]);

  const handleRegister = async () => {
    if (!userInfo) {
      navigate('/login');
      return;
    }

    setRegistering(true);
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      await axios.post(
        'http://localhost:5000/api/registrations',
        { eventId: id },
        config
      );

      setMessage('Successfully registered for the event!');
      setRegistering(false);
    } catch (err) {
      setMessage(err.response?.data?.message || err.message);
      setRegistering(false);
    }
  };

  if (loading) return <div className="text-center py-20">Loading event details...</div>;
  if (error) return <div className="text-center py-20 text-red-500">{error}</div>;

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <button 
          onClick={() => navigate(-1)}
          className="mb-6 text-blue-600 hover:underline flex items-center gap-2"
        >
          &larr; Back to Events
        </button>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <img 
            src={event.image} 
            alt={event.title} 
            className="w-full h-96 object-cover"
          />
          <div className="p-8">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h1 className="text-4xl font-bold text-gray-900 mb-2">{event.title}</h1>
                <p className="text-lg text-blue-600 font-medium">
                  {new Date(event.date).toLocaleDateString('en-US', {
                    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
                  })}
                </p>
              </div>
              <div className="text-right">
                <span className="inline-block px-4 py-2 bg-gray-100 rounded-full text-gray-700 font-semibold">
                  {event.location}
                </span>
              </div>
            </div>

            <div className="prose max-w-none text-gray-700 mb-8">
              <h2 className="text-xl font-semibold mb-4 text-gray-900">About this Event</h2>
              <p className="whitespace-pre-line leading-relaxed">{event.description}</p>
            </div>

            <div className="border-t pt-8">
              {message && (
                <div className={`p-4 rounded-lg mb-6 ${message.includes('Success') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                  {message}
                </div>
              )}

              <button
                onClick={handleRegister}
                disabled={registering}
                className={`w-full py-4 rounded-xl text-white font-bold text-lg transition-all ${
                  registering ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 transform hover:scale-[1.01]'
                }`}
              >
                {registering ? 'Registering...' : 'Register for Event'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
