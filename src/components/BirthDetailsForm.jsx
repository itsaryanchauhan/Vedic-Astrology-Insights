import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin } from 'lucide-react';

/**
 * BirthDetailsForm component for collecting user's birth details.
 * @param {function} onSubmit - Function to call on form submission.
 * @param {boolean} disabled - Flag to disable the form.
 */
export default function BirthDetailsForm({ onSubmit, disabled }) {
  // State to hold birth details
  const [details, setDetails] = React.useState({
    year: 2022,
    month: 8,
    date: 11,
    hours: 16,
    minutes: 30,
    seconds: 0,
    latitude: 17.38333,
    longitude: 78.4666,
    timezone: 5.5
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(details);
  };

  return (
    <form
      className="bg-gradient-to-br from-purple-900/90 to-pink-800/90 p-6 rounded-xl shadow-lg border border-purple-500/30 backdrop-blur-sm"
      onSubmit={handleSubmit}
    >
      {/* Form fields for birth date, time, and location */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Birth Date */}
        <div className="space-y-4">
          <div className="flex items-center space-x-2 text-purple-200">
            <Calendar className="w-5 h-5" />
            <h3 className="font-semibold">Birth Date</h3>
          </div>
          <div className="grid grid-cols-3 gap-2">
            <input
              type="number"
              placeholder="Year"
              value={details.year}
              onChange={(e) => setDetails({ ...details, year: parseInt(e.target.value) })}
              className="p-2 rounded border border-purple-500/30 bg-purple-900/50 text-purple-200 focus:ring-2 focus:ring-pink-500/50"
              disabled={disabled}
            />
            <input
              type="number"
              placeholder="Month"
              min="1"
              max="12"
              value={details.month}
              onChange={(e) => setDetails({ ...details, month: parseInt(e.target.value) })}
              className="p-2 rounded border border-purple-500/30 bg-purple-900/50 text-purple-200 focus:ring-2 focus:ring-pink-500/50"
              disabled={disabled}
            />
            <input
              type="number"
              placeholder="Day"
              min="1"
              max="31"
              value={details.date}
              onChange={(e) => setDetails({ ...details, date: parseInt(e.target.value) })}
              className="p-2 rounded border border-purple-500/30 bg-purple-900/50 text-purple-200 focus:ring-2 focus:ring-pink-500/50"
              disabled={disabled}
            />
          </div>
        </div>

        {/* Birth Time */}
        <div className="space-y-4">
          <div className="flex items-center space-x-2 text-purple-200">
            <Clock className="w-5 h-5" />
            <h3 className="font-semibold">Birth Time</h3>
          </div>
          <div className="grid grid-cols-3 gap-2">
            <input
              type="number"
              placeholder="Hours"
              min="0"
              max="23"
              value={details.hours}
              onChange={(e) => setDetails({ ...details, hours: parseInt(e.target.value) })}
              className="p-2 rounded border border-purple-500/30 bg-purple-900/50 text-purple-200 focus:ring-2 focus:ring-pink-500/50"
              disabled={disabled}
            />
            <input
              type="number"
              placeholder="Minutes"
              min="0"
              max="59"
              value={details.minutes}
              onChange={(e) => setDetails({ ...details, minutes: parseInt(e.target.value) })}
              className="p-2 rounded border border-purple-500/30 bg-purple-900/50 text-purple-200 focus:ring-2 focus:ring-pink-500/50"
              disabled={disabled}
            />
            <input
              type="number"
              placeholder="Seconds"
              min="0"
              max="59"
              value={details.seconds}
              onChange={(e) => setDetails({ ...details, seconds: parseInt(e.target.value) })}
              className="p-2 rounded border border-purple-500/30 bg-purple-900/50 text-purple-200 focus:ring-2 focus:ring-pink-500/50"
              disabled={disabled}
            />
          </div>
        </div>

        {/* Location */}
        <div className="space-y-4">
          <div className="flex items-center space-x-2 text-purple-200">
            <MapPin className="w-5 h-5" />
            <h3 className="font-semibold">Location</h3>
          </div>
          <div className="grid grid-cols-3 gap-2">
            <input
              type="number"
              step="0.00001"
              placeholder="Latitude"
              value={details.latitude}
              onChange={(e) => setDetails({ ...details, latitude: parseFloat(e.target.value) })}
              className="p-2 rounded border border-purple-500/30 bg-purple-900/50 text-purple-200 focus:ring-2 focus:ring-pink-500/50"
              disabled={disabled}
            />
            <input
              type="number"
              step="0.00001"
              placeholder="Longitude"
              value={details.longitude}
              onChange={(e) => setDetails({ ...details, longitude: parseFloat(e.target.value) })}
              className="p-2 rounded border border-purple-500/30 bg-purple-900/50 text-purple-200 focus:ring-2 focus:ring-pink-500/50"
              disabled={disabled}
            />
            <input
              type="number"
              step="0.5"
              placeholder="Timezone"
              value={details.timezone}
              onChange={(e) => setDetails({ ...details, timezone: parseFloat(e.target.value) })}
              className="p-2 rounded border border-purple-500/30 bg-purple-900/50 text-purple-200 focus:ring-2 focus:ring-pink-500/50"
              disabled={disabled}
            />
          </div>
        </div>
      </div>

      <button
        className={`mt-6 w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white py-3 rounded-lg font-semibold shadow-lg transition-all duration-200 ${
          disabled ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-xl hover:from-pink-600 hover:to-purple-600'
        }`}
        type="submit"
        disabled={disabled}
      >
        {disabled ? 'Calculating...' : 'Calculate Horoscope'}
      </button>
    </form>
  );
}