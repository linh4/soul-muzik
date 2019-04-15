import React, { useEffect } from 'react';
import runPlayer from "../hooks/runPlayer";

const PlayerCard = (props) => {

  const { isPlaying, currentAudioName, togglePlay, playPreviousTrack, playNextTrack, song, skipSong, songPosition, songDuration } = runPlayer();

  return (
    <div>
        <div>
          {song ? <div>{song.title}</div> : '?'}
        </div>
        <div>
          <button onClick={() => skipSong(-1)} >
              Previous
          </button>
          <button onClick={togglePlay}>
            {isPlaying ? 'Pause' : 'Play' }
          </button>
          <button onClick={() => skipSong(1)}>
            Next
          </button>
        </div>
        <p>{songPosition}</p>
        <p>{songDuration}</p>
      </div>
  )
}

export default PlayerCard;
