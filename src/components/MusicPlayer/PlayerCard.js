import React, { useEffect } from 'react';
import runPlayer from "../hooks/runPlayer";

const PlayerCard = (props) => {

  const { isPlaying, currentAudioName, togglePlay, song, skipSong, songPosition, songDuration, playTrack } = runPlayer();

  return (
    <div>
        <div>
          {song ? <div>{song.title}</div> : '?'}
        </div>
        <div>
          <button onClick={() => skipSong(song, -1)} >
              Previous
          </button>
          <button onClick={togglePlay}>
            {isPlaying ? 'Pause' : 'Play' }
          </button>
          <button onClick={() => skipSong(song, 1)}>
            Next
          </button>
        </div>
        <p>{songPosition}</p>
        <p>{songDuration}</p>
      </div>
  )
}

export default PlayerCard;
