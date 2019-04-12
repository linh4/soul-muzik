import React from 'react';
import runPlayer from "../hooks/runPlayer";

const PlayerCard = (props) => {

  const { isPlaying, currentAudioName, togglePlay, playPreviousTrack, playNextTrack } = runPlayer();
  // console.log(isPlaying)

  return (
    <div>
        <div>
          <marquee>{currentAudioName}</marquee>
        </div>
        <div>
          <button onClick={playPreviousTrack} disabled={!currentAudioName}>
              Previous
          </button>
          <button onClick={togglePlay} disabled={!currentAudioName}>
            {isPlaying ? 'Pause' : 'Play' }
          </button>
          <button onClick={playNextTrack} disabled={!currentAudioName}>
            Next
          </button>
        </div>
      </div>
  )
}

export default PlayerCard;
