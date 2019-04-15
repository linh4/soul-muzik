import React, { useEffect } from 'react';
import runPlayer from "../hooks/runPlayer";

const PlayerList = () => {

  const { musicList, currentAudioName, playTrack, isPlaying, songPosition } = runPlayer();

  useEffect(() => {
    playTrack(musicList[0])
  },[])

  return (
    <div>
      <h1> PlayerList Component</h1>
      {musicList.map((song, index) => <div key={index}>
          <button onClick={() => playTrack(song)}>
            {song.title} - {song.artist}
          </button>
        </div>
      )}
    </div>
  )
}

export default PlayerList;
