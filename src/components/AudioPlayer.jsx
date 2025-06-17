import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import { AudioContext } from '@/data/AudioContext';
import { Play, Pause, SkipForward, SkipBack, Volume2, VolumeX, Maximize2, Minimize2 } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';

const formatTime = (timeInSeconds) => {
  if (isNaN(timeInSeconds) || timeInSeconds === Infinity) return '0:00';
  const minutes = Math.floor(timeInSeconds / 60);
  const seconds = Math.floor(timeInSeconds % 60);
  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
};

function AudioPlayer() {
  const {
    currentTrack,
    isPlaying,
    progress,
    duration,
    volume,
    togglePlayPause,
    playNextTrack,
    playPrevTrack,
    seek,
    changeVolume,
    audioRef
  } = useContext(AudioContext);

  const [isExpanded, setIsExpanded] = React.useState(false);

  if (!currentTrack) return null;

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 100, opacity: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className={`fixed bottom-0 left-0 right-0 z-50 glass-effect border-t border-white/20 p-4 shadow-lg ${isExpanded ? 'h-48' : 'h-24'} transition-all duration-300 ease-in-out`}
    >
      <div className="container mx-auto h-full flex flex-col justify-between">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <img-replace 
              src={currentTrack.cover} 
              alt={currentTrack.title} 
              className="w-12 h-12 rounded-md object-cover"
            />
            <div>
              <p className="text-white font-semibold text-sm truncate max-w-[150px] md:max-w-xs">{currentTrack.title}</p>
              <p className="text-white/70 text-xs truncate max-w-[150px] md:max-w-xs">{currentTrack.artist}</p>
            </div>
          </div>

          <div className="flex items-center space-x-2 md:space-x-4">
            <Button variant="ghost" size="icon" onClick={playPrevTrack} className="text-white hover:bg-white/20">
              <SkipBack className="w-5 h-5" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={togglePlayPause} 
              className="text-white bg-white/10 hover:bg-white/20 w-10 h-10 rounded-full"
            >
              {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
            </Button>
            <Button variant="ghost" size="icon" onClick={playNextTrack} className="text-white hover:bg-white/20">
              <SkipForward className="w-5 h-5" />
            </Button>
          </div>

          <div className="hidden md:flex items-center space-x-2">
            {volume === 0 ? <VolumeX className="w-5 h-5 text-white" /> : <Volume2 className="w-5 h-5 text-white" />}
            <Slider
              defaultValue={[volume * 100]}
              max={100}
              step={1}
              className="w-24"
              onValueChange={(value) => changeVolume(value[0] / 100)}
            />
          </div>
          <Button variant="ghost" size="icon" onClick={() => setIsExpanded(!isExpanded)} className="text-white hover:bg-white/20 md:hidden">
            {isExpanded ? <Minimize2 className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}
          </Button>
        </div>
        
        <div className={`flex items-center space-x-2 ${isExpanded ? 'opacity-100 h-auto' : 'opacity-0 h-0 overflow-hidden md:opacity-100 md:h-auto'} transition-all duration-300 ease-in-out`}>
          <span className="text-white/70 text-xs w-10 text-right">{formatTime(audioRef.current?.currentTime || 0)}</span>
          <Progress value={progress} className="w-full h-2 bg-white/20 [&>div]:bg-purple-400 cursor-pointer" onClick={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const clickX = e.clientX - rect.left;
            const newProgress = (clickX / rect.width) * 100;
            seek(newProgress);
          }}/>
          <span className="text-white/70 text-xs w-10">{formatTime(duration)}</span>
        </div>

        {isExpanded && (
          <div className="flex md:hidden items-center space-x-2 mt-2">
            {volume === 0 ? <VolumeX className="w-5 h-5 text-white" /> : <Volume2 className="w-5 h-5 text-white" />}
            <Slider
              defaultValue={[volume * 100]}
              max={100}
              step={1}
              className="w-full"
              onValueChange={(value) => changeVolume(value[0] / 100)}
            />
          </div>
        )}
      </div>
    </motion.div>
  );
}

export default AudioPlayer;