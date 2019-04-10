import React, { useState, useEffect } from 'react';
import { PlayerProvider } from './PlayerContext';
import PlayerList from './MusicPlayer/PlayerList';

const App = () => {
  return (
    <PlayerProvider>
      <div>
        <PlayerList />
      </div>
    </PlayerProvider>
  )
}

export default App;
