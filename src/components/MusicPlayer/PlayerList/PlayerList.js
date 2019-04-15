import React from 'react';

const PlayerList = ({ song, selectThisSong }) => {
  return (
    <div>
      <button onClick={() => selectThisSong(song.id)}>
        {song.title} - {song.artist}
      </button>
    </div>
  )
}

export default PlayerList;
