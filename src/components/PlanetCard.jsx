import { motion } from 'framer-motion';
import { Star, Sun, Moon, Sparkles } from 'lucide-react';

const zodiacSigns = [
  'Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo',
  'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'
];

const planetIcons = {
  Sun: Sun,
  Moon: Moon,
  default: Star
};

export default function PlanetCard({ planet, index }) {
  const PlanetIcon = planetIcons[planet.name] || planetIcons.default;

  return (
    <motion.div
      initial={{ opacity: 0, x: -100 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1, duration: 0.8 }}
      whileHover={{ scale: 1.05 }}
      className="bg-gradient-to-br from-purple-900/80 to-pink-800/80 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-purple-500/30"
    >
      <div className="flex items-center space-x-4">
        <motion.div 
          className="bg-purple-500/20 p-3 rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
          <PlanetIcon className="w-8 h-8 text-purple-200" />
        </motion.div>
        <div>
          <div className="flex items-center space-x-2">
            <h3 className="text-xl font-bold text-purple-200">{planet.name}</h3>
            <Sparkles className="w-4 h-4 text-pink-400" />
          </div>
          <p className="text-purple-200">
            {zodiacSigns[planet.current_sign - 1]}
          </p>
          <p className="text-purple-300/80 text-sm">
            {planet.normDegree.toFixed(2)}°
          </p>
          {planet.isRetro === "true" && (
            <motion.span 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-block bg-gradient-to-r from-pink-500 to-purple-500 text-white text-sm px-3 py-1 rounded-full mt-2 shadow-lg shadow-purple-500/30"
            >
              Retrograde
            </motion.span>
          )}
        </div>
      </div>
    </motion.div>
  );
}