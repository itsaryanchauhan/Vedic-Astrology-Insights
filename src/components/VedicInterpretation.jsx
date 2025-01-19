import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Star, Moon, Sun, Stars, ChevronDown, ChevronUp } from 'lucide-react';

export default function VedicInterpretation({ interpretations }) {
  const [showAll, setShowAll] = useState(false);
  const displayCount = showAll ? interpretations.length : 3;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="bg-gradient-to-br from-purple-900/90 to-pink-800/90 p-8 rounded-xl shadow-lg mt-8 backdrop-blur-sm border border-purple-500/30"
    >
      <motion.div 
        className="flex items-center space-x-3 mb-8"
        initial={{ x: -20 }}
        animate={{ x: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Stars className="w-8 h-8 text-purple-300" />
        <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-300 to-purple-300">
          Vedic Interpretation
        </h2>
      </motion.div>
      
      <div className="space-y-6 relative">
        <div className="absolute inset-0 bg-[url('/stars.png')] opacity-10"></div>
        {interpretations.slice(0, displayCount).map((item, index) => (
          <motion.div
            key={item.planet}
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.15 }}
            whileHover={{ scale: 1.02 }}
            className="bg-purple-900/50 backdrop-blur-sm p-6 rounded-xl border border-purple-500/30 hover:shadow-xl transition-all relative z-10"
          >
            <div className="flex items-start space-x-4">
              {item.planet === "Sun" ? (
                <Sun className="w-6 h-6 text-pink-400 mt-1 flex-shrink-0" />
              ) : item.planet === "Moon" ? (
                <Moon className="w-6 h-6 text-purple-300 mt-1 flex-shrink-0" />
              ) : (
                <Star className="w-6 h-6 text-purple-400 mt-1 flex-shrink-0" />
              )}
              <div>
                <motion.div 
                  className="flex items-center space-x-3 mb-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.2 }}
                >
                  <h3 className="text-xl font-bold text-purple-200">
                    {item.planet} in {item.sign}
                  </h3>
                  {item.retrograde && (
                    <span className="text-sm bg-pink-500/80 text-white px-3 py-1 rounded-full">
                      Retrograde
                    </span>
                  )}
                  {item.degree !== undefined && (
                    <span className="text-sm text-purple-300">
                      {item.degree.toFixed(2)}°
                    </span>
                  )}
                </motion.div>
                <p className="text-purple-200 leading-relaxed">{item.meaning}</p>
              </div>
            </div>
          </motion.div>
        ))}

        {interpretations.length > 3 && (
          <motion.button
            onClick={() => setShowAll(!showAll)}
            className="w-full py-3 px-6 bg-purple-900/50 backdrop-blur-sm rounded-xl border border-purple-500/30 text-purple-200 hover:bg-purple-800/50 transition-all flex items-center justify-center space-x-2"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span>{showAll ? 'Show Less' : 'Show All'}</span>
            {showAll ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
          </motion.button>
        )}
      </div>
    </motion.div>
  );
}