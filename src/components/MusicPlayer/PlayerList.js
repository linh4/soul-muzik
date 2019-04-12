import React from 'react';
import runPlayer from "../hooks/runPlayer";

const PlayerList = () => {

  const { musicList, currentAudioName, playTrack, isPlaying, songPosition } = runPlayer();
  // console.log(runPlayer())

  // console.log(currentAudioName, songPosition)

  return (
    <div>
      <h1> PlayerList Component</h1>
      {musicList.map((song, index) => <div key={index}>
          <button onClick={() => playTrack(index)}>
            {song.title} - {song.artist}
          </button>
        </div>
      )}
    </div>
  )
}

export default PlayerList;
