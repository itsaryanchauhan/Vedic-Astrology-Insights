import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MessageSquare } from 'lucide-react';
import Horoscope from './page/Horoscope';
import LandingPage from './page/LandingPage';
import GeetaBot from './components/GeetaBot';
import HoroscopeBot from "./HoroScopeBot"

function App() {
  const [showBot, setShowBot] = useState(false);
  const [currentBot, setCurrentBot] = useState('geeta'); // 'geeta' or 'horoscope'

  const toggleBot = () => {
    setShowBot(!showBot);
  };

  const switchBot = () => {
    setCurrentBot(currentBot === 'geeta' ? 'horoscope' : 'geeta');
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/horoscope" element={<Horoscope />} />
      </Routes>

      <div className="fixed bottom-6 right-6 z-50">
        {showBot && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="mb-4"
          >
            {currentBot === 'geeta' ? (
              <GeetaBot 
                showBot={showBot} 
                setShowBot={setShowBot}
                onSwitchBot={switchBot}
                currentBot={currentBot}
              />
            ) : (
              <HoroscopeBot
                showBot={showBot}
                setShowBot={setShowBot} 
                onSwitchBot={switchBot}
                currentBot={currentBot}
              />
            )}
          </motion.div>
        )}
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={toggleBot}
          className="p-4 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-lg"
        >
          <MessageSquare className="w-6 h-6" />
        </motion.button>
      </div>
    </Router>
  );
}

export default App;