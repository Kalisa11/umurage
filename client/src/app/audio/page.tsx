"use client";
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Play, Pause, Volume2 } from "lucide-react";

const AudioPlayer = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);

  // Song data
  const song = {
    title: "Traditional Rwandan Song",
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

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
  }, []);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
      setVolume(newVolume);
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const progressPercentage = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-lg">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Audio Player
          </h1>
          <p className="text-gray-600">Enjoy your audio content</p>
        </div>

        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex items-center gap-4 mb-4">
              <Button size="icon" className="h-12 w-12" onClick={togglePlay}>
                {isPlaying ? (
                  <Pause className="h-6 w-6" />
                ) : (
                  <Play className="h-6 w-6" />
                )}
              </Button>
              <div className="flex-1">
                <h3 className="font-medium">{song.title}</h3>
                <p className="text-sm text-muted-foreground">
                  Traditional Rwandan Song
                </p>
              </div>
              <div className="text-sm text-muted-foreground">
                {formatTime(currentTime)} / {formatTime(duration)}
              </div>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-secondary rounded-full h-2 mb-4 relative">
              <input
                type="range"
                min="0"
                max={duration || 0}
                value={currentTime}
                onChange={handleSeek}
                className="absolute inset-0 w-full h-2 opacity-0 cursor-pointer"
              />
              <div
                className="bg-primary h-2 rounded-full transition-all duration-300 pointer-events-none"
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>

            {/* Volume Control */}
            <div className="flex items-center space-x-4">
              <Volume2
                className="w-5 h-5 text-gray-600 cursor-pointer"
                onClick={() => setIsMuted(!isMuted)}
              />
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={isMuted ? 0 : volume}
                onChange={handleVolumeChange}
                className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
              <span className="text-sm text-gray-600 w-8">
                {Math.round(volume * 100)}%
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Hidden Audio Element */}
        <audio
          ref={audioRef}
          src="https://znzdqzvbonnrrqueuesu.supabase.co/storage/v1/object/sign/umurage/content/Stereo%20Test%20-%20LeftRight%20Audio%20Test%20for%20HeadphonesSpeakers.mp3?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8xYmM3YmEwOS03ZTE3LTRmYjctYmIzNy1kZmY4NWZkMGZlY2UiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJ1bXVyYWdlL2NvbnRlbnQvU3RlcmVvIFRlc3QgLSBMZWZ0UmlnaHQgQXVkaW8gVGVzdCBmb3IgSGVhZHBob25lc1NwZWFrZXJzLm1wMyIsImlhdCI6MTc1MjY4MDkxOCwiZXhwIjoxNzg0MjE2OTE4fQ.MkN-JUI4IjQeWwnSrwpXC-eMc3rD-U-tuJpvoh6pQPo"
          preload="metadata"
        />
      </div>
    </div>
  );
};

export default AudioPlayer;
