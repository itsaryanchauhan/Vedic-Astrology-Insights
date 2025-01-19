import React from 'react';
import { motion } from 'framer-motion';
import { Stars, Sparkles, Moon, Sun, Compass } from 'lucide-react';
import { Link } from 'react-router-dom';
import '../App.css';
import GlobeDemo from '../components/Globe';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-pink-800">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/stars.png')] opacity-30 animate-twinkle"></div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="relative z-10"
      >
        <nav className="p-6 backdrop-blur-sm bg-purple-900/10">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <motion.div
              whileHover={{ scale: 1.1 }}
              className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-300 to-purple-300 px-6 py-2 rounded-lg backdrop-blur-md bg-white/5 border border-white/10 shadow-lg"
            >
              AstroVision
            </motion.div>
            <div className="space-x-8 backdrop-blur-md bg-purple-900/30 px-6 py-3 rounded-full">
              <Link to="/horoscope" className="text-purple-200 hover:text-pink-300 transition-colors">Horoscope</Link>
              <Link to="/numerology" className="text-purple-200 hover:text-pink-300 transition-colors">Numerology</Link>
            </div>
          </div>
        </nav>

        <main className="max-w-7xl mx-auto px-4 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="p-8 rounded-2xl backdrop-blur-lg bg-white/5 border border-white/10 shadow-xl"
            >
              <h1 className="text-5xl md:text-7xl font-bold mb-6">
                <span className="text-white backdrop-blur-sm bg-purple-900/30 px-4 py-2 rounded-lg inline-block">
                  Discover Your
                </span>
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400 mt-2 backdrop-blur-md bg-white/5 px-4 py-2 rounded-lg">
                  Cosmic Blueprint
                </span>
              </h1>
              <p className="text-purple-200 text-lg mb-8 backdrop-blur-sm bg-purple-900/20 p-4 rounded-lg">
                Unlock the secrets of the universe through advanced astrology and numerology. 
                Let the stars guide your path to self-discovery.
              </p>
              <div className="space-x-4">
                <Link to="/horoscope">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-3 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full text-white font-semibold shadow-lg shadow-purple-500/30 backdrop-blur-md"
                >
                  Get Started
                </motion.button>
                </Link>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-3 border-2 border-purple-400 rounded-full text-purple-200 font-semibold backdrop-blur-md bg-purple-900/20"
                >
                  Learn More
                </motion.button>
              </div>
            </motion.div>

            <motion.div
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="relative backdrop-blur-lg bg-white/5 rounded-2xl p-8 border border-white/10"
            >
              <div className="relative w-full h-[500px]">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-xl"
                />
                <div className="absolute inset-0 flex items-center justify-center backdrop-blur-sm bg-purple-900/10 rounded-full">
                  {/* <GlobeDemo /> */}
                </div>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            <div className="backdrop-blur-xl bg-white/5 p-8 rounded-2xl border border-white/10 shadow-xl hover:bg-white/10 transition-all duration-300">
              <Sparkles className="w-12 h-12 text-pink-400 mb-4" />
              <h3 className="text-xl font-bold text-white mb-2 bg-purple-900/30 px-4 py-2 rounded-lg backdrop-blur-sm inline-block">Daily Horoscope</h3>
              <p className="text-purple-200">Get personalized daily insights based on your celestial alignment.</p>
            </div>
            <div className="backdrop-blur-xl bg-white/5 p-8 rounded-2xl border border-white/10 shadow-xl hover:bg-white/10 transition-all duration-300">
              <Compass className="w-12 h-12 text-purple-400 mb-4" />
              <h3 className="text-xl font-bold text-white mb-2 bg-purple-900/30 px-4 py-2 rounded-lg backdrop-blur-sm inline-block">Birth Chart Analysis</h3>
              <p className="text-purple-200">Deep dive into your complete astrological profile.</p>
            </div>
            <div className="backdrop-blur-xl bg-white/5 p-8 rounded-2xl border border-white/10 shadow-xl hover:bg-white/10 transition-all duration-300">
              <Moon className="w-12 h-12 text-pink-400 mb-4" />
              <h3 className="text-xl font-bold text-white mb-2 bg-purple-900/30 px-4 py-2 rounded-lg backdrop-blur-sm inline-block">Numerology Reading</h3>
              <p className="text-purple-200">Discover the hidden meaning behind your numbers.</p>
            </div>
          </motion.div>
        </main>
      </motion.div>
    </div>
  );
};

export default LandingPage;
