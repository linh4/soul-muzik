import React, { useState, useEffect } from 'react';
import { PlayerProvider } from './PlayerContext';
import PlayerList from './MusicPlayer/PlayerList';
import PlayerCard from './MusicPlayer/PlayerCard';
import './App.css'

const App = () => {
  return (
    <PlayerProvider>
      <div>
        <PlayerList />
        <PlayerCard />
      </div>
    </PlayerProvider>
  )
}

export default App;
