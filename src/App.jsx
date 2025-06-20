import React, { useState, useContext } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
// import { Header } from '@/components/Header';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Toaster } from '@/components/ui/toaster';
import { Github, Palette } from 'lucide-react';
import DesignSystemPage from '@/pages/DesignSystemPage';
import AboutPage from '@/pages/AboutPage';
import StyleGuidePage from '@/pages/StyleGuidePage';
import AdminPage from '@/pages/AdminPage';
import AudioPlayer from '@/components/AudioPlayer';
import { AudioContext } from '@/data/AudioContext';
import { useDarkMode } from '@/hooks/useDarkMode';
import { DarkModeToggle } from './components/DarkModeToggle';
import Header from './components/Header';

function App() {
  const [darkMode, setDarkMode] = useDarkMode();
  const { currentTrack } = useContext(AudioContext);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={`min-h-screen transition-all duration-500 ${darkMode ? 'dark' : ''}`}>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<DesignSystemPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/style-guide" element={<StyleGuidePage />} />
            <Route path="/admin" element={<AdminPage />} />
          </Routes>
        </main>
        
        {currentTrack && <AudioPlayer />}
        
        <Toaster />
      </div>
    </div>
  );
}

export default App;