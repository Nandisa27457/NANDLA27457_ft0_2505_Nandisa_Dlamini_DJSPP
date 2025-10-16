
import React, { createContext, useState, useRef, useContext, useEffect } from "react";

const AudioPlayerContext = createContext(null);

export const AudioPlayerProvider = ({ children }) => {
  const audioRef = useRef(new Audio());
  const [currentTrack, setCurrentTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [position, setPosition] = useState(0); // seconds
  const [duration, setDuration] = useState(0);
  const [audioEnded, setAudioEnded] = useState(false); // New state to track if audio has ended

  useEffect(() => {
    const audio = audioRef.current;

    const onPlay = () => {
      setIsPlaying(true);
      setAudioEnded(false); // Reset audioEnded when playing
    };
    const onPause = () => setIsPlaying(false);
    const onTimeUpdate = () => setPosition(audio.currentTime);
    const onLoadedMetadata = () => setDuration(audio.duration || 0);
    const onEnded = () => {
      setIsPlaying(false);
      setAudioEnded(true); // Set audioEnded to true when audio finishes
    };

    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);
    audio.addEventListener("timeupdate", onTimeUpdate);
    audio.addEventListener("loadedmetadata", onLoadedMetadata);
    audio.addEventListener("ended", onEnded);

    return () => {
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
      audio.removeEventListener("timeupdate", onTimeUpdate);
      audio.removeEventListener("loadedmetadata", onLoadedMetadata);
      audio.removeEventListener("ended", onEnded);
    };
  }, []);

  // playTrack: if same track, toggle play/pause; otherwise load & play new track
  const playTrack = async (track) => {
    if (!track || !track.audio) {
      console.warn("playTrack called with invalid track:", track);
      return;
    }

    const audio = audioRef.current;

    try {
      // If new track, set it first (so AudioPlayerBar sees it) then load & play
      if (!currentTrack || currentTrack.id !== track.id) {
        console.log("Loading new track:", track);
        setCurrentTrack(track);
        setAudioEnded(false); // Reset audioEnded when a new track is loaded
        audio.pause();
        audio.src = track.audio;
        audio.load();
        // give the browser a moment to load metadata
        await audio.play();
        setIsPlaying(true);
        return;
      }

      // same track: toggle
      if (isPlaying) {
        audio.pause();
        setIsPlaying(false);
      } else {
        await audio.play();
        setIsPlaying(true);
      }
    } catch (err) {
      console.error("Audio play error:", err);
    }
  };

  const pause = () => {
    audioRef.current.pause();
    setIsPlaying(false);
  };

  const seek = (timeSec) => {
    audioRef.current.currentTime = timeSec;
    setPosition(timeSec);
  };

  return (
    <AudioPlayerContext.Provider
      value={{
        currentTrack,
        isPlaying,
        position,
        duration,
        playTrack,
        pause,
        seek,
        audioRef,
        audioEnded, // Expose audioEnded state
      }}
    >
      {children}
    </AudioPlayerContext.Provider>
  );
};

// default export hook
export default function useAudioPlayer() {
  const ctx = useContext(AudioPlayerContext);
  if (!ctx) {
    throw new Error("useAudioPlayer must be used within an AudioPlayerProvider");
  }
  return ctx;
}
