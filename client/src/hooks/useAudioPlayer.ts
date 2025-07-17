import { useEffect, useRef, useState } from "react";

export const useAudioPlayer = (audioUrl: string | undefined) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !audioUrl) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);
    const handleEnded = () => setIsPlaying(false);

    audio.addEventListener("timeupdate", updateTime);
    audio.addEventListener("loadedmetadata", updateDuration);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("timeupdate", updateTime);
      audio.removeEventListener("loadedmetadata", updateDuration);
      audio.removeEventListener("ended", handleEnded);
    };
  }, [audioUrl]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (value: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = value;
      setCurrentTime(value);
    }
  };

  const handleVolumeChange = (value: number) => {
    if (audioRef.current) {
      audioRef.current.volume = value;
      setVolume(value);
      if (value > 0) setIsMuted(false);
    }
  };

  const toggleMute = () => {
    if (!audioRef.current) return;
    setIsMuted((prev) => {
      audioRef.current!.muted = !prev;
      return !prev;
    });
  };
  const progressPercentage = duration > 0 ? (currentTime / duration) * 100 : 0;

  return {
    audioRef,
    isPlaying,
    togglePlay,
    currentTime,
    duration,
    handleSeek,
    volume,
    handleVolumeChange,
    isMuted,
    toggleMute,
    progressPercentage,
  };
};
