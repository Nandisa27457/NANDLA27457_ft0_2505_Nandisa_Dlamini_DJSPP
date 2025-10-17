
/**
 * @file AudioPlayerBar component for displaying and controlling the currently playing audio track.
 * @module AudioPlayerBar
 */

import React, { useEffect } from "react"; // Import React and the useEffect hook for side effects
import useAudioPlayer from "../context/AudioPlayer"; // Import the custom hook for audio player context
import "./AudioPlayerBar.css"; // Import the CSS for styling the audio player bar

/**
 * AudioPlayerBar component displays the current track's information, play/pause controls,
 * and a progress bar for seeking.
 * @returns {JSX.Element} The AudioPlayerBar component.
 */
export default function AudioPlayerBar() {
  // Destructure values and functions from the useAudioPlayer hook
  const { currentTrack, isPlaying, playTrack, pause, position, duration, seek, audioRef, audioEnded } = useAudioPlayer();

  // useEffect hook to log when the currentTrack changes
  useEffect(() => {
    // If a current track is set, log it to the console
    if (currentTrack) console.log("AudioPlayerBar: currentTrack set:", currentTrack);
  }, [currentTrack]); // Dependency array ensures this effect runs only when currentTrack changes

  // Determine if the audio bar should be visible
  // It is visible if there's a current track AND the audio hasn't ended
  const isAudioBarVisible = currentTrack && !audioEnded;

  return (
    // The main container for the audio bar, dynamically applies 'visible' class
    <div className={`audio-bar ${isAudioBarVisible ? "visible" : ""}`}>
      <div className="audio-left"> {/* Container for track image and metadata */}
        {/* Display track image if available */}
        {currentTrack?.image && <img src={currentTrack.image} alt={currentTrack.title} className="audio-thumb" />}
        <div className="audio-meta"> {/* Container for track title and podcast title */}
          <div className="audio-title">{currentTrack?.title}</div> {/* Display track title */}
          <div className="audio-sub">{currentTrack?.podcastTitle}</div> {/* Display podcast title */}
        </div>
      </div>

      <div className="audio-center"> {/* Container for play/pause button and progress bar */}
        <button
          className="audio-play-btn" // CSS class for the play/pause button
          // onClick handler to toggle play/pause based on current state
          onClick={() => (isPlaying ? pause() : playTrack(currentTrack))}
        >
          {isPlaying ? "⏸" : "▶"} {/* Display play or pause icon based on isPlaying state */}
        </button>

        <div className="audio-progress"> {/* Container for the progress slider */}
          <input
            type="range" // Input type is a range slider
            min="0" // Minimum value of the slider
            max={duration || 0} // Maximum value is the track duration, or 0 if not available
            value={position || 0} // Current value is the track position, or 0 if not available
            // onChange handler to update track position when slider is moved
            onChange={(e) => seek(Number(e.target.value))}
          />
        </div>
      </div>

      <div className="audio-right"> {/* Container for current time and total duration */}
        <div className="audio-time"> {/* Display current position and total duration */}
          {Math.floor(position || 0)} / {Math.floor(duration || 0)}s {/* Format time to whole seconds */}
        </div>
      </div>
    </div>
  );
}
