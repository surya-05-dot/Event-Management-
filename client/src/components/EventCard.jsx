import React from 'react';
import { Link } from 'react-router-dom';

const EventCard = ({ event }) => {
  return (
    <div className="group bg-white rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-2xl hover:shadow-blue-100 transition-all duration-500 overflow-hidden flex flex-col h-full">
      <div className="relative h-64 overflow-hidden">
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute top-4 left-4">
          <span className="px-4 py-2 bg-white/90 backdrop-blur-md rounded-2xl text-xs font-black uppercase tracking-wider text-blue-600 shadow-sm">
            {new Date(event.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
          </span>
        </div>
      </div>
      
      <div className="p-8 flex flex-col flex-grow">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></div>
          <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">{event.location}</span>
        </div>
        
        <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors line-clamp-1">
          {event.title}
        </h3>
        
        <p className="text-gray-500 leading-relaxed line-clamp-2 mb-8 text-sm font-medium">
          {event.description}
        </p>
        
        <div className="mt-auto pt-6 border-t border-gray-50">
          <Link
            to={`/events/${event._id}`}
            className="flex items-center justify-between group/btn"
          >
            <span className="text-gray-900 font-bold group-hover/btn:translate-x-1 transition-transform">Register Now</span>
            <div className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center group-hover/btn:bg-blue-600 group-hover/btn:text-white transition-all">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
