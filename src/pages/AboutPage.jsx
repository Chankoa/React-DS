import React from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Users, Zap, Palette } from 'lucide-react';

function AboutPage() {
  return (
    <div className="container mx-auto px-6 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-5xl font-bold text-white text-center mb-12">
          À Propos de Notre Design System
        </h1>
        <p className="text-xl text-white/80 text-center max-w-3xl mx-auto mb-16">
          Notre Design System est une ressource complète pour construire des interfaces utilisateur cohérentes,
          accessibles et esthétiquement plaisantes. Il est conçu pour accélérer le développement
          et garantir une expérience utilisateur de haute qualité sur toutes nos plateformes.
        </p>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <Card className="glass-effect border-white/20 p-8 text-center hover:neon-glow transition-all duration-300">
            <Palette className="w-16 h-16 text-purple-400 mx-auto mb-6" />
            <h2 className="text-2xl font-semibold text-white mb-3">Composants Riches</h2>
            <p className="text-white/70">
              Une vaste bibliothèque de composants React prêts à l'emploi, personnalisables et optimisés pour la performance.
            </p>
          </Card>
          <Card className="glass-effect border-white/20 p-8 text-center hover:neon-glow transition-all duration-300">
            <Zap className="w-16 h-16 text-yellow-400 mx-auto mb-6" />
            <h2 className="text-2xl font-semibold text-white mb-3">Développement Accéléré</h2>
            <p className="text-white/70">
              Réduisez le temps de développement grâce à des éléments d'interface utilisateur standardisés et bien documentés.
            </p>
          </Card>
          <Card className="glass-effect border-white/20 p-8 text-center hover:neon-glow transition-all duration-300">
            <Users className="w-16 h-16 text-blue-400 mx-auto mb-6" />
            <h2 className="text-2xl font-semibold text-white mb-3">Collaboration Améliorée</h2>
            <p className="text-white/70">
              Un langage commun pour les designers et les développeurs, favorisant la cohérence et l'efficacité.
            </p>
          </Card>
        </div>

        <div className="text-center">
          <img  
            alt="Équipe travaillant sur le design system" 
            className="rounded-xl shadow-2xl mx-auto w-full max-w-4xl h-auto object-cover"
           src="https://images.unsplash.com/photo-1531497258014-b5736f376b1b" />
        </div>
      </motion.div>
    </div>
  );
}

export default AboutPage;