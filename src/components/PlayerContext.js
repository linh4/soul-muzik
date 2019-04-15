import React, { useState } from 'react';
import { musicList } from './musicList'

const PlayerContext = React.createContext([{}, () => {}]);

const PlayerProvider = (props) => {
  const [state, setState] = useState({
    audio: null,
    musicList,
    currentSongIndex: 0,
    song: null,
    isPlaying: false,
    songPosition: '0:00',
    songDuration: '0:00'
  });
  return (
    <PlayerContext.Provider value={[state, setState]}>
      {props.children}
    </PlayerContext.Provider>
  );
};

export { PlayerContext, PlayerProvider };
