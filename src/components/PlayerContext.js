import React, { useState } from 'react';
import { musicList } from './musicList'

const PlayerContext = React.createContext([{}, () => {}]);

const PlayerProvider = (props) => {
  const [state, setState] = useState({
    audio: new Audio(),
    musicList,
    currentAudioIndex: null,
    isPlaying: false,
  });
  return (
    <PlayerContext.Provider value={[state, setState]}>
      {props.children}
    </PlayerContext.Provider>
  );
};

export { PlayerContext, PlayerProvider };
