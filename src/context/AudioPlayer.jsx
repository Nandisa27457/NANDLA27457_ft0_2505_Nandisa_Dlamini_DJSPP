
/**
 * @file AudioPlayer context for managing global audio playback state and controls.
 * @module AudioPlayer
 */

import React, { createContext, useState, useRef, useContext, useEffect } from "react"; // Import React hooks

// Create a context for the audio player
const AudioPlayerContext = createContext(null);

/**
 * Provides audio playback functionality and state to its children components.
 * @param {object} props - The component props.
 * @param {React.ReactNode} props.children - The child components to be rendered within the provider.
 * @returns {JSX.Element} The AudioPlayerProvider component.
 */
export const AudioPlayerProvider = ({ children }) => {
  const audioRef = useRef(new Audio()); // Create a ref to an HTML Audio element
  const [currentTrack, setCurrentTrack] = useState(null); // State for the currently playing track
  const [isPlaying, setIsPlaying] = useState(false); // State to track if audio is playing
  const [position, setPosition] = useState(0); // State for current playback position in seconds
  const [duration, setDuration] = useState(0); // State for total track duration in seconds
  const [audioEnded, setAudioEnded] = useState(false); // State to track if audio has ended

  // useEffect hook to set up and clean up audio event listeners
  useEffect(() => {
    const audio = audioRef.current; // Get the current audio element

    // Event handler for when audio starts playing
    const onPlay = () => {
      setIsPlaying(true); // Set isPlaying to true
      setAudioEnded(false); // Reset audioEnded when playing
    };
    // Event handler for when audio is paused
    const onPause = () => setIsPlaying(false); // Set isPlaying to false
    // Event handler for when audio time updates
    const onTimeUpdate = () => setPosition(audio.currentTime); // Update position state
    // Event handler for when audio metadata is loaded
    const onLoadedMetadata = () => setDuration(audio.duration || 0); // Set duration state
    // Event handler for when audio finishes playing
    const onEnded = () => {
      setIsPlaying(false); // Set isPlaying to false
      setAudioEnded(true); // Set audioEnded to true when audio finishes
    };

    // Add event listeners to the audio element
    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);
    audio.addEventListener("timeupdate", onTimeUpdate);
    audio.addEventListener("loadedmetadata", onLoadedMetadata);
    audio.addEventListener("ended", onEnded);

    // Cleanup function to remove event listeners when component unmounts
    return () => {
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
      audio.removeEventListener("timeupdate", onTimeUpdate);
      audio.removeEventListener("loadedmetadata", onLoadedMetadata);
      audio.removeEventListener("ended", onEnded);
    };
  }, []); // Empty dependency array ensures this effect runs only once on mount

  /**
   * Plays a given track. If the track is new, it loads and plays it.
   * If it's the same track, it toggles play/pause.
   * @param {object} track - The track object to play, must contain `audio` and `id` properties.
   */
  const playTrack = async (track) => {
    // Warn if track or track.audio is invalid
    if (!track || !track.audio) {
      console.warn("playTrack called with invalid track:", track);
      return;
    }

    const audio = audioRef.current; // Get the current audio element

    try {
      // If a new track is selected (or no track is currently playing)
      if (!currentTrack || currentTrack.id !== track.id) {
        console.log("Loading new track:", track); // Log loading of new track
        setCurrentTrack(track); // Set the new current track
        setAudioEnded(false); // Reset audioEnded when a new track is loaded
        audio.pause(); // Pause any currently playing audio
        audio.src = track.audio; // Set the audio source to the new track's audio URL
        audio.load(); // Load the new audio
        await audio.play(); // Play the new audio
        setIsPlaying(true); // Set isPlaying to true
        return; // Exit the function
      }

      // If it's the same track, toggle play/pause
      if (isPlaying) {
        audio.pause(); // Pause the audio
        setIsPlaying(false); // Set isPlaying to false
      } else {
        await audio.play(); // Play the audio
        setIsPlaying(true); // Set isPlaying to true
      }
    } catch (err) {
      console.error("Audio play error:", err); // Log any errors during audio playback
    }
  };

  /**
   * Pauses the currently playing audio.
   */
  const pause = () => {
    audioRef.current.pause(); // Pause the audio element
    setIsPlaying(false); // Set isPlaying to false
  };

  /**
   * Seeks to a specific time in the audio track.
   * @param {number} timeSec - The time in seconds to seek to.
   */
  const seek = (timeSec) => {
    audioRef.current.currentTime = timeSec; // Set the current time of the audio element
    setPosition(timeSec); // Update the position state
  };

  return (
    // Provide the audio player context values to children
    <AudioPlayerContext.Provider
      value={{
        currentTrack, // The currently playing track
        isPlaying, // Whether the audio is playing
        position, // Current playback position
        duration, // Total track duration
        playTrack, // Function to play a track
        pause, // Function to pause audio
        seek, // Function to seek to a specific time
        audioRef, // Reference to the audio element
        audioEnded, // Whether the audio has ended
      }}
    >
      {children} {/* Render children components */}
    </AudioPlayerContext.Provider>
  );
};

/**
 * Custom hook to access the AudioPlayerContext.
 * Throws an error if used outside of an AudioPlayerProvider.
 * @returns {object} The audio player context values.
 */
export default function useAudioPlayer() {
  const ctx = useContext(AudioPlayerContext); // Get the context
  // Throw an error if context is not available (i.e., not within a provider)
  if (!ctx) {
    throw new Error("useAudioPlayer must be used within an AudioPlayerProvider");
  }
  return ctx; // Return the context values
}
