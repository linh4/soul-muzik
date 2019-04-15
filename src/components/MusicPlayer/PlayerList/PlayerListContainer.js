import React, { Component } from 'react';
import { musicList } from '../../assets/musicList.js'
import PlayerList from './PlayerList'
import PlayerCard from '../PlayerCard/PlayerCard.js'
import { formatTime } from '../../utils/constants.js'

class PlayerListContainer extends Component {
    state = {
      musicList,
      currentSongIndex: 0,
      song: null,
      audio: new Audio(),
      totalDuration: 0,
      currentTime: 0,
      isPlaying: false,
      volume: 0.5,
      songLoaded: false,
    }

  componentDidMount() {
    this.assignEventsToPlayer();
    this.loadSongIntoState();
  }

  loadSongIntoState = () => {
    const song = this.state.musicList[this.state.currentSongIndex];
    const audio = this.state.audio;
    console.log(song)
    audio.src = audio.src !== song.file ? song.file : audio.src;
    audio.currentTime = 0;
    audio.volume = this.state.volume;
    audio.loop = this.state.loop;
    audio.preload = true;
    audio.autoplay = true;
    this.setState({ song, audio, songLoaded: false, playing: false, volume: audio.volume })
  }

  selectThisSong = (songID) => {
    let currentSongIndex = 0;
    this.state.musicList.map((song, index) => {
      if (song.id === songID) currentSongIndex = index
      return song;
    });
    this.setState({ currentSongIndex }, this.loadSongIntoState );
  }

  assignEventsToPlayer = () => {
    this.state.audio.addEventListener('canplay', () => {
      if (!this.state.songLoaded) {
        this.setState({songLoaded: true, isPlaying: true}, this.playPauseAudio);
      }
    });
    this.state.audio.addEventListener('ended', () => {
        if (this.state.loop) {
            this.setState({isPlaying: true}, this.playPauseAudio);
        } else {
            // this.playNextTrack();
        }
    });
    this.state.audio.addEventListener('timeupdate', () => {
      if (this.state.songLoaded) {
          this.updatePlayingInfo();
        }
    });
  }

  updatePlayingInfo = () => {
    const audio = this.state.audio;
    const totalDuration = formatTime(audio.duration)
    const currentTime = formatTime(currentTime)
    console.log(currentTime)
    this.setState({totalDuration, currentTime});
  }


  render() {
    return (
      <div>
        <h1> PlayerList Component</h1>
        {musicList.map((song, index) => <PlayerList
          key={index}
          song={song}
          selectThisSong={this.selectThisSong}
          />
        )}
        <PlayerCard
          song={this.state.song}
          duration={this.state.totalDuration}
          currentTime={this.state.currentTime}
        />
      </div>
    )
  }
}

export default PlayerListContainer;
