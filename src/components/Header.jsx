import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Palette, Github } from 'lucide-react';
import DarkModeToggle from './DarkModeToggle'; // ou { DarkModeToggle } selon ton export
import { Button } from './ui/button'; // adapte le chemin si besoin

export default function Header() {
  return (
    <motion.header 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="border-b border-white/20 sticky top-0 z-50"
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
                <h1 className="text-2xl font-bold text-white"> React DS Fusion</h1>
                <p className="text-white/70 text-sm">Composants React modernes</p>
              </div>
            </Link>
          </motion.div>
          
          <nav className="flex items-center space-x-2 md:space-x-4">
            <Link to="/" className="text-white hover:text-white/80 transition-colors px-2 py-1 rounded-md hover:bg-white/10 text-sm md:text-base">Accueil</Link>
            <Link to="/style-guide" className="text-white hover:text-white/80 transition-colors px-2 py-1 rounded-md hover:bg-white/10 text-sm md:text-base">Guide</Link>
            <Link to="/admin" className="text-white hover:text-white/80 transition-colors px-2 py-1 rounded-md hover:bg-white/10 text-sm md:text-base">Admin</Link>
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
  );
}
