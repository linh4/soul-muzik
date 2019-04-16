import React from 'react';

const PlayerCard = ({song, duration, currentTime, isPlaying, togglePlay, skipSong}) => {
  return (
    <div>
      {song ? <div>{song.title}</div> : '?'}
        <div>
          <button onClick={() => skipSong(-1)}>
              Previous
          </button>
          <button onClick={togglePlay}>
            {isPlaying ? 'Pause' : 'Play'}
          </button>
          <button onClick={() => skipSong(1)}>
            Next
          </button>
        </div>
        <p>{currentTime}</p>
        <p>{duration}</p>
      </div>
  )
}

export default PlayerCard;
