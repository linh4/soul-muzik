import React, { useEffect } from 'react';
import { useContext } from 'react';
import { PlayerContext } from "../PlayerContext";
import runPlayer from "../hooks/runPlayer";

const PlayerCard = (props) => {

  const [state, setState] = useContext(PlayerContext);

  const { isPlaying, currentSongName, togglePlay, playPreviousTrack, playNextTrack, songPosition, songDuration, playTrack, audio } = runPlayer();

  return (
    <div>
        <div>
          <marquee>{currentSongName}</marquee>
        </div>
        <div>
          <button onClick={playPreviousTrack} disabled={!currentSongName}>
              Previous
          </button>
          <button onClick={togglePlay}>
            {isPlaying ? 'Pause' : 'Play' }
          </button>
          <button onClick={playNextTrack} disabled={!currentSongName}>
            Next
          </button>
        </div>
        <p>{songPosition}</p>
        <p>{songDuration}</p>
      </div>
  )
}

export default PlayerCard;
