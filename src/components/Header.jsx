import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { Palette, Github, Menu, X } from 'lucide-react';
import { Button } from './ui/button';
import { DarkModeToggle } from './DarkModeToggle';

const navLinks = [
  { to: '/', label: 'Accueil' },
  { to: '/style-guide', label: 'Guide' },
  { to: '/admin', label: 'Admin' },
  { to: '/about', label: 'À Propos' },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  // Ferme le menu lors du changement de route
  React.useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  return (
    <motion.header 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="border-b border-white/20 sticky top-0 z-50 bg-banner/80 backdrop-blur"
    >
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
            <Palette className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white"> <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">DS Fusion</span> <span className="font-light">/ React</span> </h1>
            <p className="text-white/70 text-sm">Composants React modernes</p>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center space-x-2 md:space-x-4">
          {navLinks.map(link => (
            <Link
              key={link.to}
              to={link.to}
              className={`transition-colors px-2 py-1 rounded-md hover:bg-white/10 text-sm md:text-base ${
                location.pathname === link.to ? 'bg-white/10 text-white font-semibold' : 'text-white'
              }`}
            >
              {link.label}
            </Link>
          ))}
          <DarkModeToggle />
          <Button className="bg-white/20 hover:bg-white/30 border-white/30 hidden md:flex">
            <Github className="w-4 h-4 mr-2" />
            GitHub
          </Button>
        </nav>

        {/* Mobile menu button */}
        <button
          className="md:hidden p-2 rounded focus:outline-none focus:ring-2 focus:ring-flame-bright"
          onClick={() => setOpen(true)}
          aria-label="Ouvrir le menu"
        >
          <Menu className="w-7 h-7 text-white" />
        </button>
      </div>

      {/* Off Canvas Menu */}
      <AnimatePresence>
        {open && (
          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.25 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur"
          >
            <div className="absolute right-0 top-0 h-full w-72 bg-banner/95 shadow-lg flex flex-col bg-dark">
              <button
                className="self-end m-4 p-2 rounded focus:outline-none focus:ring-2 focus:ring-flame-bright"
                onClick={() => setOpen(false)}
                aria-label="Fermer le menu"
              >
                <X className="w-7 h-7 text-flame-bright" />
              </button>
              <nav className="flex flex-col gap-2 px-8 mt-8">
                {navLinks.map(link => (
                  <Link
                    key={link.to}
                    to={link.to}
                    className={`px-4 py-3 rounded-lg text-base font-medium transition-colors ${
                      location.pathname === link.to
                        ? 'bg-flame-bright text-white shadow'
                        : 'text-flame-bright hover:bg-flame-light/30 hover:text-flame-medium'
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
                <div className="mt-6 flex items-center gap-3">
                  <DarkModeToggle />
                  <Button className="bg-flame-bright hover:bg-flame-medium text-white flex-1">
                    <Github className="w-4 h-4 mr-2" />
                    GitHub
                  </Button>
                </div>
              </nav>
            </div>
            {/* Click outside to close */}
            <button
              className="absolute inset-0 w-full h-full cursor-default"
              onClick={() => setOpen(false)}
              tabIndex={-1}
              aria-label="Fermer le menu"
              style={{ background: 'transparent', border: 'none' }}
            />
          </motion.aside>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
