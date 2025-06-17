import React, { useState, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { 
  Layers, 
  Zap, 
  Sparkles, 
  Code,
  Eye,
  Download,
  Heart,
  Star,
  ArrowRight,
  CheckCircle,
  AlertCircle,
  Info,
  X,
  PlayCircle
} from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { AudioContext } from '@/data/AudioContext';

const coreComponentsList = [
  { name: 'Button', icon: Zap, color: 'bg-blue-500' },
  { name: 'Card', icon: Layers, color: 'bg-purple-500' },
  { name: 'Input', icon: Code, color: 'bg-green-500' },
  { name: 'Badge', icon: Star, color: 'bg-yellow-500' },
  { name: 'Alert', icon: AlertCircle, color: 'bg-red-500' },
  { name: 'Avatar', icon: Eye, color: 'bg-indigo-500' },
  { name: 'Progress', icon: ArrowRight, color: 'bg-pink-500' },
  { name: 'Slider', icon: Sparkles, color: 'bg-cyan-500' }
];

const sampleTracks = [
  {
    id: 1,
    title: "Forest Lullaby",
    artist: "Lesfm",
    url: "https://assets.mixkit.co/music/preview/mixkit-forest-lullaby-121.mp3",
    cover: "https://images.unsplash.com/photo-1500530855697-b586789ba3ee?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80"
  },
  {
    id: 2,
    title: "Tech House Vibes",
    artist: "Alejandro Magaña",
    url: "https://assets.mixkit.co/music/preview/mixkit-tech-house-vibes-130.mp3",
    cover: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80"
  },
  {
    id: 3,
    title: "Sleepy Cat",
    artist: "Alejandro Magaña",
    url: "https://assets.mixkit.co/music/preview/mixkit-sleepy-cat-135.mp3",
    cover: "https://images.unsplash.com/photo-1494232410401-ad00d5433cfa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80"
  }
];

const HeroSection = ({ onExploreClick }) => (
  <section className="py-20 px-6">
    <div className="container mx-auto text-center">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="floating-animation"
      >
        <h1 className="text-6xl font-bold text-white mb-6">
          Design System
          <span className="block text-4xl bg-gradient-to-r from-yellow-400 to-pink-400 bg-clip-text text-transparent">
            Extraordinaire
          </span>
        </h1>
        <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
          Une collection de composants React élégants et modernes, 
          conçus pour créer des interfaces utilisateur exceptionnelles.
        </p>
        <div className="flex justify-center space-x-4">
          <Button 
            size="lg" 
            className="bg-white text-purple-600 hover:bg-white/90 neon-glow"
            onClick={onExploreClick}
          >
            <Eye className="w-5 h-5 mr-2" />
            Explorer les composants
          </Button>
          <Button 
            size="lg" 
            variant="outline" 
            className="border-white/30 text-white hover:bg-white/10"
          >
            <Download className="w-5 h-5 mr-2" />
            Télécharger
          </Button>
        </div>
      </motion.div>
    </div>
  </section>
);

const OverviewContent = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    className="grid grid-cols-1 md:grid-cols-3 gap-6"
  >
    {coreComponentsList.map((component, index) => (
      <motion.div
        key={component.name}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1 }}
        whileHover={{ scale: 1.05, y: -5 }}
        className="glass-effect rounded-xl p-6 hover:neon-glow transition-all duration-300"
      >
        <div className={`w-12 h-12 ${component.color} rounded-lg flex items-center justify-center mb-4`}>
          <component.icon className="w-6 h-6 text-white" />
        </div>
        <h3 className="text-xl font-semibold text-white mb-2">{component.name}</h3>
        <p className="text-white/70">Composant moderne et accessible</p>
      </motion.div>
    ))}
  </motion.div>
);

const ComponentsContent = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    className="space-y-8"
  >
    <Card className="glass-effect border-white/20 p-6">
      <h3 className="text-2xl font-bold text-white mb-6">Boutons</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Button>Défaut</Button>
        <Button variant="secondary">Secondaire</Button>
        <Button variant="outline">Contour</Button>
        <Button variant="destructive">Destructeur</Button>
        <Button variant="ghost">Fantôme</Button>
        <Button variant="link">Lien</Button>
        <Button size="sm">Petit</Button>
        <Button size="lg">Grand</Button>
      </div>
    </Card>

    <Card className="glass-effect border-white/20 p-6">
      <h3 className="text-2xl font-bold text-white mb-6">Champs de saisie</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <Input placeholder="Nom d'utilisateur" />
          <Input type="email" placeholder="Email" />
          <Input type="password" placeholder="Mot de passe" />
        </div>
        <div className="space-y-4">
          <Textarea placeholder="Votre message..." />
          <div className="flex items-center space-x-2">
            <Switch id="notifications-ds" />
            <label htmlFor="notifications-ds" className="text-white">Notifications</label>
          </div>
        </div>
      </div>
    </Card>

    <Card className="glass-effect border-white/20 p-6">
      <h3 className="text-2xl font-bold text-white mb-6">Alertes</h3>
      <div className="space-y-4">
        <Alert>
          <Info className="h-4 w-4" />
          <AlertTitle>Information</AlertTitle>
          <AlertDescription>
            Ceci est une alerte d'information standard.
          </AlertDescription>
        </Alert>
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Erreur</AlertTitle>
          <AlertDescription>
            Une erreur s'est produite lors du traitement.
          </AlertDescription>
        </Alert>
      </div>
    </Card>

    <Card className="glass-effect border-white/20 p-6">
      <h3 className="text-2xl font-bold text-white mb-6">Autres composants</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <Avatar>
              <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-white font-medium">John Doe</p>
              <p className="text-white/70 text-sm">Développeur</p>
            </div>
          </div>
          <div className="flex space-x-2">
            <Badge>Nouveau</Badge>
            <Badge variant="secondary">Populaire</Badge>
            <Badge variant="outline">Tendance</Badge>
          </div>
        </div>
        <div className="space-y-4">
          <div>
            <label className="text-white text-sm mb-2 block">Progression</label>
            <Progress value={75} className="w-full" />
          </div>
          <div>
            <label className="text-white text-sm mb-2 block">Volume</label>
            <Slider defaultValue={[50]} max={100} step={1} />
          </div>
        </div>
      </div>
    </Card>
  </motion.div>
);

const ExamplesContent = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    className="grid grid-cols-1 md:grid-cols-2 gap-6"
  >
    <Card className="glass-effect border-white/20 p-6">
      <h3 className="text-xl font-bold text-white mb-4">Formulaire de contact</h3>
      <div className="space-y-4">
        <Input placeholder="Votre nom" />
        <Input type="email" placeholder="Votre email" />
        <Textarea placeholder="Votre message" />
        <Button className="w-full">
          <ArrowRight className="w-4 h-4 mr-2" />
          Envoyer
        </Button>
      </div>
    </Card>

    <Card className="glass-effect border-white/20 p-6">
      <h3 className="text-xl font-bold text-white mb-4">Profil utilisateur</h3>
      <div className="space-y-4">
        <div className="flex items-center space-x-4">
          <Avatar className="w-16 h-16">
            <AvatarImage src="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face" />
            <AvatarFallback>SA</AvatarFallback>
          </Avatar>
          <div>
            <h4 className="text-white font-semibold">Sarah Anderson</h4>
            <p className="text-white/70">Designer UI/UX</p>
            <div className="flex space-x-1 mt-1">
              <Badge variant="secondary">Pro</Badge>
              <Badge>Vérifiée</Badge>
            </div>
          </div>
        </div>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-white/70">Projets complétés</span>
            <span className="text-white">24/30</span>
          </div>
          <Progress value={80} />
        </div>
      </div>
    </Card>
  </motion.div>
);

const PlaygroundContent = ({ showToast, playTrack }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
  >
    <Card className="glass-effect border-white/20 p-6">
      <h3 className="text-2xl font-bold text-white mb-6">Playground interactif</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-white">Testez les notifications</h4>
          <div className="space-y-2">
            <Button 
              onClick={() => showToast('success')} 
              className="w-full bg-green-600 hover:bg-green-700"
            >
              <CheckCircle className="w-4 h-4 mr-2" />
              Toast de succès
            </Button>
            <Button 
              onClick={() => showToast('error')} 
              variant="destructive" 
              className="w-full"
            >
              <X className="w-4 h-4 mr-2" />
              Toast d'erreur
            </Button>
            <Button 
              onClick={() => showToast('info')} 
              variant="outline" 
              className="w-full border-white/30 text-white hover:bg-white/10"
            >
              <Info className="w-4 h-4 mr-2" />
              Toast d'info
            </Button>
          </div>
        </div>
        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-white">Animations</h4>
          <motion.div
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.95 }}
            className="w-20 h-20 bg-gradient-to-r from-pink-500 to-purple-500 rounded-xl flex items-center justify-center cursor-pointer pulse-glow"
          >
            <Heart className="w-8 h-8 text-white" />
          </motion.div>
          <p className="text-white/70 text-sm">Survolez et cliquez sur l'icône !</p>
        </div>
      </div>
    </Card>
    <Card className="glass-effect border-white/20 p-6 mt-6">
      <h3 className="text-2xl font-bold text-white mb-6">Lecteur Audio</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {sampleTracks.map((track) => (
          <motion.div
            key={track.id}
            className="bg-white/10 p-4 rounded-lg flex flex-col items-center text-center cursor-pointer hover:bg-white/20 transition-all"
            onClick={() => playTrack(track)}
            whileHover={{ y: -5 }}
          >
            <img-replace src={track.cover} alt={track.title} className="w-24 h-24 rounded-md object-cover mb-3"/>
            <h4 className="text-white font-semibold text-sm">{track.title}</h4>
            <p className="text-white/70 text-xs">{track.artist}</p>
            <PlayCircle className="w-8 h-8 text-white mt-2 opacity-75 group-hover:opacity-100" />
          </motion.div>
        ))}
      </div>
    </Card>
  </motion.div>
);

const PageFooter = () => (
  <footer className="py-12 border-t border-white/20">
    <div className="container mx-auto px-6 text-center">
      <div className="flex items-center justify-center space-x-2 mb-4">
        <span className="text-white/70">Créé avec</span>
        <Heart className="w-4 h-4 text-red-400" />
        <span className="text-white/70">par l'équipe Design System</span>
      </div>
      <p className="text-white/50 text-sm">
        © {new Date().getFullYear()} Design System React. Tous droits réservés.
      </p>
    </div>
  </footer>
);

function DesignSystemPage() {
  const [activeTab, setActiveTab] = useState('overview');
  const { playTrack } = useContext(AudioContext);

  const showToast = (type) => {
    const toastMessages = {
      success: { title: "Succès !", description: "Votre action a été effectuée avec succès." },
      error: { title: "Erreur", description: "Une erreur s'est produite lors de l'opération." },
      info: { title: "Information", description: "Voici une notification informative." }
    };
    toast(toastMessages[type]);
  };

  return (
    <>
      <HeroSection onExploreClick={() => setActiveTab('components')} />

      <div className="container mx-auto px-6 pb-20">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 glass-effect border-white/20">
            <TabsTrigger value="overview" className="text-white data-[state=active]:bg-white/20">
              Vue d'ensemble
            </TabsTrigger>
            <TabsTrigger value="components" className="text-white data-[state=active]:bg-white/20">
              Composants
            </TabsTrigger>
            <TabsTrigger value="examples" className="text-white data-[state=active]:bg-white/20">
              Exemples
            </TabsTrigger>
            <TabsTrigger value="playground" className="text-white data-[state=active]:bg-white/20">
              Playground
            </TabsTrigger>
          </TabsList>

          <div className="mt-8">
            <AnimatePresence mode="wait">
              {activeTab === 'overview' && <TabsContent value="overview" className="space-y-8"><OverviewContent /></TabsContent>}
              {activeTab === 'components' && <TabsContent value="components" className="space-y-8"><ComponentsContent /></TabsContent>}
              {activeTab === 'examples' && <TabsContent value="examples" className="space-y-8"><ExamplesContent /></TabsContent>}
              {activeTab === 'playground' && <TabsContent value="playground" className="space-y-8"><PlaygroundContent showToast={showToast} playTrack={playTrack} /></TabsContent>}
            </AnimatePresence>
          </div>
        </Tabs>
      </div>
      <PageFooter />
    </>
  );
}

export default DesignSystemPage;