import React, { createContext, useState, useRef, useEffect } from 'react';

export const AudioContext = createContext();

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

export const AudioProvider = ({ children }) => {
  const [currentTrack, setCurrentTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(0.5); 
  const [duration, setDuration] = useState(0);
  const audioRef = useRef(new Audio());

  useEffect(() => {
    const audio = audioRef.current;
    audio.addEventListener('timeupdate', updateProgress);
    audio.addEventListener('loadedmetadata', () => setDuration(audio.duration));
    audio.addEventListener('ended', playNextTrack);
    audio.volume = volume;

    return () => {
      audio.removeEventListener('timeupdate', updateProgress);
      audio.removeEventListener('loadedmetadata', () => setDuration(audio.duration));
      audio.removeEventListener('ended', playNextTrack);
    };
  }, []);

  useEffect(() => {
    if (currentTrack) {
      audioRef.current.src = currentTrack.url;
      audioRef.current.play().then(() => setIsPlaying(true)).catch(e => console.error("Error playing audio:", e));
    } else {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  }, [currentTrack]);

  useEffect(() => {
    audioRef.current.volume = volume;
  }, [volume]);

  const updateProgress = () => {
    setProgress((audioRef.current.currentTime / audioRef.current.duration) * 100);
  };

  const playTrack = (track) => {
    setCurrentTrack(track);
  };

  const togglePlayPause = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      if (currentTrack) audioRef.current.play().catch(e => console.error("Error playing audio:", e));
    }
    setIsPlaying(!isPlaying);
  };

  const playNextTrack = () => {
    if (!currentTrack) return;
    const currentIndex = sampleTracks.findIndex(track => track.id === currentTrack.id);
    const nextIndex = (currentIndex + 1) % sampleTracks.length;
    playTrack(sampleTracks[nextIndex]);
  };

  const playPrevTrack = () => {
    if (!currentTrack) return;
    const currentIndex = sampleTracks.findIndex(track => track.id === currentTrack.id);
    const prevIndex = (currentIndex - 1 + sampleTracks.length) % sampleTracks.length;
    playTrack(sampleTracks[prevIndex]);
  };

  const seek = (newProgress) => {
    if (currentTrack && audioRef.current.duration) {
      audioRef.current.currentTime = (newProgress / 100) * audioRef.current.duration;
      setProgress(newProgress);
    }
  };

  const changeVolume = (newVolume) => {
    setVolume(newVolume);
  };

  return (
    <AudioContext.Provider value={{
      currentTrack,
      isPlaying,
      progress,
      duration,
      volume,
      playTrack,
      togglePlayPause,
      playNextTrack,
      playPrevTrack,
      seek,
      changeVolume,
      audioRef
    }}>
      {children}
    </AudioContext.Provider>
  );
};