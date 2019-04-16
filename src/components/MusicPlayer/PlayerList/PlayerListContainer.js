import React, { Component } from 'react';
import { musicList } from '../../assets/musicList.js'
import PlayerList from './PlayerList'
import PlayerCard from '../PlayerCard/PlayerCard.js'
import { formatTime } from '../../utils/constants.js'

class PlayerListContainer extends Component {
    state = {
      musicList,
      currentSongIndex: 0,
      audio: new Audio(),
      song: null,
      songLoaded: false,
      isPlaying: false,
      totalDuration: 0,
      currentTime: 0,
      volume: 0.5,
    }

  componentDidMount() {
    this.loadSongToState();
    this.addEventsToAudio();
  }

  selectThisSong = (songId) => {
    let currentSongIndex = 0;
    this.state.musicList.map((song, index) => {
      if (song.id === songId) currentSongIndex = index
      return song;
    });
    this.setState({ currentSongIndex }, this.loadSongToState );
  }

  loadSongToState = () => {
    const song = this.state.musicList[this.state.currentSongIndex];
    const audio = this.state.audio;
    audio.src = audio.src !== song.file ? song.file : audio.src;
    audio.currentTime = 0;
    audio.volume = this.state.volume;
    audio.loop = this.state.loop;
    audio.preload = true;
    audio.autoplay = true;
    this.setState({ song, audio, songLoaded: false, isPlaying: false, volume: audio.volume }, this.playPauseAudio)
  }

  addEventsToAudio = () => {
    this.state.audio.addEventListener('canplay', () => {
      if (!this.state.songLoaded) {
        this.setState({songLoaded: true, isPlaying: true}, this.playPauseAudio);
      }
    });
    this.state.audio.addEventListener('ended', () => {
        // if (this.state.loop) {
            // this.setState({isPlaying: true}, this.playPauseAudio);
        // } else {
        this.skipSong(1)
        // }
    });
    this.state.audio.addEventListener('timeupdate', () => {
      if (this.state.songLoaded) {
          this.updateAudioTime();
        }
    });
  }

  updateAudioTime = () => {
    const audio = this.state.audio;
    const totalDuration = formatTime(audio.duration)
    const currentTime = formatTime(audio.currentTime)
    this.setState({totalDuration, currentTime});
  }

  playPauseAudio = () => {
    this.state.isPlaying ? this.state.audio.play() :  this.state.audio.pause()
  }

  togglePlay = () => {
    this.setState({isPlaying: !this.state.isPlaying}, this.playPauseAudio);
  }

  skipSong = (index) => {
    let currentSongIndex = this.state.currentSongIndex;
    let indexTo = currentSongIndex + index;
    if(this.state.musicList.length > indexTo && indexTo > 0) {
      currentSongIndex = indexTo
    } else if(indexTo < 0) {
      currentSongIndex - 1
    } else {
      currentSongIndex = 0
    }
    this.setState({currentSongIndex}, this.loadSongToState);
  }


  render() {
    return (
      <div>
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
          isPlaying={this.state.isPlaying}
          togglePlay={this.togglePlay}
          skipSong={this.skipSong}
        />
      </div>
    )
  }
}

export default PlayerListContainer;
