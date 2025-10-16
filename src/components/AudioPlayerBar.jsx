// src/components/AudioPlayerBar.jsx
import React, { useEffect } from "react";
import useAudioPlayer from "../context/AudioPlayer";
import "./AudioPlayerBar.css";

export default function AudioPlayerBar() {
  const { currentTrack, isPlaying, playTrack, pause, position, duration, seek, audioRef, audioEnded } = useAudioPlayer();

  
  useEffect(() => {
  
    if (currentTrack) console.log("AudioPlayerBar: currentTrack set:", currentTrack);
  }, [currentTrack]);

  // The audio bar should be visible if there's a current track AND the audio hasn't ended
  const isAudioBarVisible = currentTrack && !audioEnded;

  return (
    <div className={`audio-bar ${isAudioBarVisible ? "visible" : ""}`}>
      <div className="audio-left">
        {currentTrack?.image && <img src={currentTrack.image} alt={currentTrack.title} className="audio-thumb" />}
        <div className="audio-meta">
          <div className="audio-title">{currentTrack?.title}</div>
          <div className="audio-sub">{currentTrack?.podcastTitle}</div>
        </div>
      </div>

      <div className="audio-center">
        <button
          className="audio-play-btn"
          onClick={() => (isPlaying ? pause() : playTrack(currentTrack))}
        >
          {isPlaying ? "⏸" : "▶"}
        </button>

        <div className="audio-progress">
          <input
            type="range"
            min="0"
            max={duration || 0}
            value={position || 0}
            onChange={(e) => seek(Number(e.target.value))}
          />
        </div>
      </div>

      <div className="audio-right">
        <div className="audio-time">
          {Math.floor(position || 0)} / {Math.floor(duration || 0)}s
        </div>
      </div>
    </div>
  );
}
