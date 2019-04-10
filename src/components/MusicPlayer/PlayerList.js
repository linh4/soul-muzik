import React from 'react';
import runPlayer from "../hooks/runPlayer";

const PlayerList = () => {

  const { musicList, currentAudioName, playTrack, isPlaying } = runPlayer();

  return (
    <div>
      <h1> PlayerList Component</h1>
      {musicList.map(song => <div key={song.id}>{song.title} - {song.artist}</div>)}
    </div>
  )
}

export default PlayerList;
