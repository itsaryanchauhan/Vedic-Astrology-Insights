import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Stars, Sparkles, Moon, Sun, Compass, Calendar, Clock } from 'lucide-react';
import axios from 'axios';
import Spline from '@splinetool/react-spline';
import PlanetCard from '../components/PlanetCard';
import BirthDetailsForm from '../components/BirthDetailsForm';
import VedicInterpretation from '../components/VedicInterpretation';
import { getVedicInterpretations, processAstrologyData } from '../utils/interpretations';
import { fetchAstrologyData } from '../utils/api';

const HOROSCOPE_API_BASE = 'https://cors-proxy.fringe.zone/https://horoscope-app-api.vercel.app/api/v1/get-horoscope';

const zodiacSigns = [
  { sign: "Capricorn", start: { day: 22, month: 12 }, end: { day: 19, month: 1 } },
  { sign: "Aquarius", start: { day: 20, month: 1 }, end: { day: 18, month: 2 } },
  { sign: "Pisces", start: { day: 19, month: 2 }, end: { day: 20, month: 3 } },
  { sign: "Aries", start: { day: 21, month: 3 }, end: { day: 19, month: 4 } },
  { sign: "Taurus", start: { day: 20, month: 4 }, end: { day: 20, month: 5 } },
  { sign: "Gemini", start: { day: 21, month: 5 }, end: { day: 20, month: 6 } },
  { sign: "Cancer", start: { day: 21, month: 6 }, end: { day: 22, month: 7 } },
  { sign: "Leo", start: { day: 23, month: 7 }, end: { day: 22, month: 8 } },
  { sign: "Virgo", start: { day: 23, month: 8 }, end: { day: 22, month: 9 } },
  { sign: "Libra", start: { day: 23, month: 9 }, end: { day: 22, month: 10 } },
  { sign: "Scorpio", start: { day: 23, month: 10 }, end: { day: 21, month: 11 } },
  { sign: "Sagittarius", start: { day: 22, month: 11 }, end: { day: 21, month: 12 } },
];

const zodiacSymbols = {
  "Aries": "♈", "Taurus": "♉", "Gemini": "♊", "Cancer": "♋",
  "Leo": "♌", "Virgo": "♍", "Libra": "♎", "Scorpio": "♏",
  "Sagittarius": "♐", "Capricorn": "♑", "Aquarius": "♒", "Pisces": "♓"
};

function getSunSign(day, month) {
  const zodiac = zodiacSigns.find(({ start, end }) => 
    (month === start.month && day >= start.day) || 
    (month === end.month && day <= end.day)
  );
  return zodiac?.sign || "Capricorn";
}

async function fetchHoroscope(sign, period) {
  try {
    const response = await axios.get(
      `${HOROSCOPE_API_BASE}/${period}?sign=${sign}${period === 'daily' ? '&day=TODAY' : ''}`,
      { headers: { 'accept': 'application/json' } }
    );
    console.log(response);
    return response.data;
  } catch (error) {
    throw new Error(`Failed to fetch ${period} horoscope`);
  }
}

function HoroscopeCard({ title, description, icon, delay }) {
  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay }}
      className="bg-purple-900/30 backdrop-blur-md p-6 max-h-[300px] overflow-y-auto rounded-xl scroll-effect shadow-lg border border-purple-500/30 hover:bg-purple-800/40 transition-all duration-300"
    >
      <div className="flex items-center gap-3 mb-4 bg-purple-800/50 p-3 rounded-lg backdrop-blur-lg">    
        {icon}
        <h3 className="text-xl font-bold text-purple-200">{title}</h3>
      </div>
      <p className="text-purple-200 leading-relaxed">{description}</p>
    </motion.div>
  );
}

function Horoscope() {
  const [astrologyData, setAstrologyData] = useState(null);
  const [horoscopes, setHoroscopes] = useState({ daily: null, weekly: null, monthly: null });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [sunSign, setSunSign] = useState(null);

  const handleSubmit = async (details) => {
    setLoading(true);
    setError(null);
    
    try {
      // Fetch astrology data
      const response = await fetchAstrologyData(details);
      const processedData = processAstrologyData(response.output[1]);
      setAstrologyData(processedData);
      
      // Calculate sun sign
      const sign = getSunSign(details.date, details.month);
      setSunSign(sign);

      // Fetch horoscopes
      const [daily, weekly, monthly] = await Promise.all([
        fetchHoroscope(sign, 'daily'),
        fetchHoroscope(sign, 'weekly'),
        fetchHoroscope(sign, 'monthly')
      ]);

      setHoroscopes({ daily, weekly, monthly });
    } catch (err) {
      setError('Failed to fetch data. Please try again later.');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen w-full overflow-y-auto relative">
      <div className="fixed inset-0 z-0 bg-black">
        {/* <Spline scene="https://prod.spline.design/gYaMUQXWs0CtooqG/scene.splinecode" /> */}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="relative z-10"
      >
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-purple-600/40 to-pink-600/40 backdrop-blur-lg p-8 shadow-lg border-b border-purple-500/30"
        >
          <div className="max-w-7xl mx-auto min-h-fit">
            <div className="flex items-center justify-center space-x-4 bg-purple-800/30 p-4 rounded-2xl backdrop-blur-md">
              <Stars className="w-12 h-12 text-purple-200 " />
              <h1 className="text-4xl relative z-20 font-bold  text-transparent bg-clip-text bg-gradient-to-r from-purple-200 to-pink-200 text-center">
                Vedic Astrology Insights
              </h1>
              <Stars className="w-12 h-12 text-purple-200" />
            </div>
            <p className="text-purple-200 text-center mt-4 bg-purple-700/20 text-sm p-3 rounded-xl max-w-2xl mx-auto backdrop-blur-sm">
              Discover Your Cosmic Blueprint Through Ancient Indian Wisdom
            </p>
          </div>
        </motion.header>

        <main className="max-w-7xl mx-auto px-4 py-12">
          <BirthDetailsForm onSubmit={handleSubmit} disabled={loading} />

          {loading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12 bg-purple-900/30 backdrop-blur-md rounded-xl border border-purple-500/30"
            >
              <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-purple-500 mx-auto"></div>
              <p className="text-purple-200 mt-4">Consulting the celestial bodies...</p>
            </motion.div>
          )}

          {error && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-red-900/30 backdrop-blur-lg border border-red-500/50 p-6 my-8 rounded-xl"
            >
              <p className="text-red-200">{error}</p>
            </motion.div>
          )}

          {astrologyData && !loading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              {sunSign && (
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="bg-purple-900/30 backdrop-blur-lg mt-5 p-8 rounded-xl shadow-lg mb-8 border border-purple-500/30 hover:bg-purple-800/40 transition-all duration-300"
                >
                  <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-200 to-pink-200 mb-2 flex items-center gap-3">
                    <Sun className="w-8 h-8   text-pink-400" />
                    Your Sun Sign: {sunSign} <span className="text-3xl text-white">{zodiacSymbols[sunSign]}</span>
                  </h2>
                </motion.div>
              )}

              {horoscopes.daily && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                  <HoroscopeCard
                    title="Daily Horoscope"
                    description={horoscopes.daily.data.horoscope_data}
                    icon={<Clock className="w-6 h-6 text-pink-400" />}
                    delay={0.4}
                  />
                  <HoroscopeCard
                    title="Weekly Forecast"
                    description={horoscopes.weekly.data.horoscope_data}
                    icon={<Calendar className="w-6 h-6 text-purple-400" />}
                    delay={0.5}
                  />
                  <HoroscopeCard
                    title="Monthly Overview"
                    description={horoscopes.monthly.data.horoscope_data}
                    icon={<Moon className="w-6 h-6 text-pink-400" />}
                    delay={0.6}
                  />
                </div>
              )}

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {Object.entries(astrologyData).map(([name, data], index) => (
                  <PlanetCard
                    key={name}
                    planet={{ ...data, name }}
                    index={index}
                  />
                ))}
              </motion.div>

              <VedicInterpretation 
                interpretations={getVedicInterpretations(astrologyData)} 
              />

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="mt-12 bg-purple-900/30 backdrop-blur-lg p-8 rounded-xl shadow-lg border border-purple-500/30 hover:bg-purple-800/40 transition-all duration-300"
              >
                <div className="flex items-center space-x-4 mb-6 bg-purple-800/50 p-4 rounded-lg backdrop-blur-lg">
                  <Compass className="w-8 h-8 text-purple-300" />
                  <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-200 to-pink-200">
                    Vedic Wisdom
                  </h2>
                </div>
                <p className="text-purple-200 leading-relaxed">
                  In Vedic astrology, your birth chart is a cosmic snapshot of the universe 
                  at the moment of your birth. Each planet's position carries deep meaning 
                  about your karma, dharma, and life's purpose.
                </p>
              </motion.div>
            </motion.div>
          )}
        </main>

        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className={`bg-gradient-to-r from-purple-600/40 to-pink-600/40 backdrop-blur-lg text-white py-8 mt-12 border-t border-purple-500/30 ${loading ? 'hidden' : 'flex'}`}
        >
          <div className="max-w-7xl mx-auto px-4 text-center">
            <p className="text-purple-200 bg-purple-800/30 inline-block px-6 py-3 rounded-full backdrop-blur-md">
              {loading ? (
                <>
                  <Sparkles className="inline-block w-5 h-5 mr-2 animate-spin" />
                  Loading your cosmic insights...
                  <Sparkles className="inline-block w-5 h-5 ml-2 animate-spin" />
                </>
              ) : (
                <>
                  <Sparkles className="inline-block w-5 h-5 mr-2" />
                  Exploring the ancient wisdom of Vedic astrology
                  <Sparkles className="inline-block w-5 h-5 ml-2" />
                </>
              )}
            </p>
          </div>
        </motion.footer>
      </motion.div>
    </div>
  );
}

export default Horoscope;
