import React from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Droplets, Type, AlignVerticalSpaceAround } from 'lucide-react';

const ColorSwatch = ({ name, hex, hslVar }) => (
  <div className="flex flex-col items-center">
    <div
      className="w-24 h-24 rounded-lg shadow-md mb-2 border border-white/20"
      style={{ backgroundColor: `hsl(var(${hslVar}))` }}
    ></div>
    <p className="text-sm font-medium text-white">{name}</p>
    <p className="text-xs text-white/70">{hex}</p>
  </div>
);

const TypographySample = ({ name, className, text }) => (
  <div className="mb-6">
    <p className="text-sm text-white/70 mb-1">{name}</p>
    <p className={`${className} text-white`}>{text}</p>
  </div>
);

const SpacingSample = ({ name, size, unit }) => (
  <div className="flex items-center mb-2">
    <div
      className="h-6 mr-3 bg-purple-400/50 rounded"
      style={{ width: `calc(${size} * ${unit})` }}
    ></div>
    <p className="text-sm text-white">{name} ({size * parseInt(unit)}px)</p>
  </div>
);

function StyleGuidePage() {
  const colors = [
    { name: 'Primary', hex: '#7E22CE', hslVar: '--primary' },
    { name: 'Secondary', hex: '#F3F4F6', hslVar: '--secondary' },
    { name: 'Accent', hex: '#F3F4F6', hslVar: '--accent' },
    { name: 'Destructive', hex: '#EF4444', hslVar: '--destructive' },
    { name: 'Background', hex: '#FFFFFF', hslVar: '--background' },
    { name: 'Foreground', hex: '#0A0A0A', hslVar: '--foreground' },
    { name: 'Muted', hex: '#F3F4F6', hslVar: '--muted' },
    { name: 'Muted Fg', hex: '#6B7280', hslVar: '--muted-foreground' },
  ];

  const spacingUnit = 'var(--spacing-unit)'; // 8px

  return (
    <div className="container mx-auto px-6 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-5xl font-bold text-white text-center mb-16">
          Guide des Styles
        </h1>

        {/* Colors Section */}
        <section className="mb-16">
          <div className="flex items-center mb-8">
            <Droplets className="w-10 h-10 text-purple-400 mr-4" />
            <h2 className="text-3xl font-semibold text-white">Palette de Couleurs</h2>
          </div>
          <Card className="glass-effect border-white/20 p-8">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8">
              {colors.map(color => (
                <ColorSwatch key={color.name} {...color} />
              ))}
            </div>
            <p className="text-white/70 mt-6 text-sm">
              Note: Les couleurs Background et Foreground changent en mode sombre. Les valeurs HEX affichées sont pour le mode clair.
            </p>
          </Card>
        </section>

        {/* Typography Section */}
        <section className="mb-16">
          <div className="flex items-center mb-8">
            <Type className="w-10 h-10 text-yellow-400 mr-4" />
            <h2 className="text-3xl font-semibold text-white">Typographie</h2>
          </div>
          <Card className="glass-effect border-white/20 p-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <TypographySample name="Titre H1 (font-serif)" className="text-5xl font-bold" text="Le voyage du héros" />
                <TypographySample name="Titre H2 (font-serif)" className="text-4xl font-semibold" text="Chapitre Premier" />
                <TypographySample name="Titre H3 (font-serif)" className="text-3xl font-medium" text="Une Aube Nouvelle" />
                <TypographySample name="Titre H4 (font-serif)" className="text-2xl" text="Le Réveil" />
              </div>
              <div>
                <TypographySample name="Paragraphe (font-sans)" className="text-base" text="Le soleil se levait à peine, dorant les cimes des arbres centenaires. Une brise légère agitait les feuilles, portant avec elle le parfum des fleurs sauvages. C'était un matin paisible, annonciateur d'aventures." />
                <TypographySample name="Texte Muted (font-sans)" className="text-sm text-muted-foreground" text="Ceci est un texte mis en sourdine, souvent utilisé pour des informations secondaires ou des légendes." />
                <TypographySample name="Code (font-mono)" className="p-2 bg-white/10 rounded text-sm" text="const message = 'Hello, World!';" />
              </div>
            </div>
             <div className="mt-6">
              <h4 className="text-xl font-semibold text-white mb-2">Polices utilisées :</h4>
              <p className="text-white/80"><span className="font-semibold">Titres :</span> Lora (Serif)</p>
              <p className="text-white/80"><span className="font-semibold">Corps du texte :</span> Inter (Sans-serif)</p>
              <p className="text-white/80"><span className="font-semibold">Code :</span> Fira Code (Monospace)</p>
            </div>
          </Card>
        </section>

        {/* Vertical Rhythm Section */}
        <section>
          <div className="flex items-center mb-8">
            <AlignVerticalSpaceAround className="w-10 h-10 text-blue-400 mr-4" />
            <h2 className="text-3xl font-semibold text-white">Rythme Vertical & Espacements</h2>
          </div>
          <Card className="glass-effect border-white/20 p-8">
            <p className="text-white/80 mb-6">
              L'unité de base pour les espacements est de <code className="bg-white/10 p-1 rounded text-sm">var(--spacing-unit)</code>, qui équivaut à 8px.
              Des classes utilitaires <code className="bg-white/10 p-1 rounded text-sm">.vr-*-*</code> sont disponibles.
            </p>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-xl font-semibold text-white mb-4">Exemples d'espacement :</h4>
                <SpacingSample name="1 unité" size={1} unit={spacingUnit} />
                <SpacingSample name="2 unités" size={2} unit={spacingUnit} />
                <SpacingSample name="3 unités" size={3} unit={spacingUnit} />
                <SpacingSample name="4 unités" size={4} unit={spacingUnit} />
                <SpacingSample name="6 unités" size={6} unit={spacingUnit} />
                <SpacingSample name="8 unités" size={8} unit={spacingUnit} />
              </div>
              <div>
                <h4 className="text-xl font-semibold text-white mb-4">Exemple d'utilisation :</h4>
                <div className="bg-white/5 p-4 rounded-lg">
                  <div className="bg-purple-500/30 p-4 rounded vr-mb-2">
                    <p className="text-white text-sm">Élément avec marge en bas de 2 unités (16px)</p>
                  </div>
                  <div className="bg-green-500/30 p-4 rounded vr-pt-3 vr-pb-3">
                    <p className="text-white text-sm">Élément avec padding haut/bas de 3 unités (24px)</p>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </section>
      </motion.div>
    </div>
  );
}

export default StyleGuidePage;