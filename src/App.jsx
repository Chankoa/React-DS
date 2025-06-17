import React, { useState, useContext } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Toaster } from '@/components/ui/toaster';
import { Github, Palette } from 'lucide-react';
import DesignSystemPage from '@/pages/DesignSystemPage';
import AboutPage from '@/pages/AboutPage';
import StyleGuidePage from '@/pages/StyleGuidePage';
import AudioPlayer from '@/components/AudioPlayer';
import { AudioContext } from '@/data/AudioContext';
import { useDarkMode } from '@/hooks/useDarkMode';
import { DarkModeToggle } from './components/DarkModeToggle';

function App() {
  const [darkMode, setDarkMode] = useDarkMode();
  const { currentTrack } = useContext(AudioContext);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={`min-h-screen transition-all duration-500 ${darkMode ? 'dark' : ''}`}>
      <div className="gradient-bg min-h-screen flex flex-col">
        <motion.header 
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="glass-effect border-b border-white/20 sticky top-0 z-50"
        >
          <div className="container mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <motion.div 
                className="flex items-center space-x-3"
                whileHover={{ scale: 1.05 }}
              >
                <Link to="/" className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                    <Palette className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold text-white">Design System</h1>
                    <p className="text-white/70 text-sm">Composants React modernes</p>
                  </div>
                </Link>
              </motion.div>
              
              <nav className="flex items-center space-x-2 md:space-x-4">
                <Link to="/" className="text-white hover:text-white/80 transition-colors px-2 py-1 rounded-md hover:bg-white/10 text-sm md:text-base">Accueil</Link>
                <Link to="/style-guide" className="text-white hover:text-white/80 transition-colors px-2 py-1 rounded-md hover:bg-white/10 text-sm md:text-base">Guide</Link>
                <Link to="/about" className="text-white hover:text-white/80 transition-colors px-2 py-1 rounded-md hover:bg-white/10 text-sm md:text-base">À Propos</Link>
                <DarkModeToggle />
                <Button className="bg-white/20 hover:bg-white/30 text-white border-white/30 hidden md:flex">
                  <Github className="w-4 h-4 mr-2" />
                  GitHub
                </Button>
              </nav>
            </div>
          </div>
        </motion.header>

        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<DesignSystemPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/style-guide" element={<StyleGuidePage />} />
          </Routes>
        </main>
        
        {currentTrack && <AudioPlayer />}
        
        <Toaster />
      </div>
    </div>
  );
}

export default App;