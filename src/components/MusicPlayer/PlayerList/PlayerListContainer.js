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
    doneStyle: '100%',
    handleStyle: '0%',
    progressSpanTime: 0,
    handleActive: false,
  }
  pointerFirst = 0;
  spannedTime = 0;

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
    audio.loop = this.state.loop;
    audio.preload = true;
    audio.autoplay = true;
    this.setState({ song, audio, songLoaded: false, isPlaying: false })
  }

  addEventsToAudio = () => {
    this.state.audio.addEventListener('canplay', () => {
      if (!this.state.songLoaded) {
        this.setState({songLoaded: true, isPlaying: true}, this.playPauseAudio);
      }
    });
    this.state.audio.addEventListener('ended', () => {
        this.skipSong(1)
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
    this.setState({totalDuration, currentTime},
            () => {
                this.updateProgressBar()
            });
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

  updateProgressBar = () => {
    const handleParent = document.getElementById("handleCtr").parentElement;
    const handleCtr = document.getElementById("handleCtr");

    if (handleParent && handleCtr) {
      const handleParentWidth = parseFloat(window.getComputedStyle(handleParent, null).width);
      const timeRunning = (this.state.audio.currentTime / this.state.audio.duration) * handleParentWidth;

      this.setState({
        handleStyle: !this.state.handleActive ? timeRunning + "px" : this.state.handleStyle,
        doneStyle: `${handleParentWidth - timeRunning}px`
      });
    }
  }

  progressHandler = (event) => {
    if (event.type === 'mousedown') {
      this.pointerFirst = event.pageX;
      document.addEventListener('mousemove', this.progressMove);
      document.addEventListener('mouseup', this.progressDrop);
    } else if (event.type === 'touchstart') {
        this.pointerFirst = event.touches[0].pageX;
        event.target.addEventListener('touchmove', this.progressMove);
        event.target.addEventListener('touchend', this.progressDrop);
    }

    const handleCtr = document.getElementById('handleCtr');
    const progressBarWidth = parseFloat(window.getComputedStyle(handleCtr.parentElement, null).width);
    let handleCtrStyle = parseFloat(this.pointerFirst - ((window.innerWidth - progressBarWidth) / 2)) + 'px'
    let doneStyleRight = (progressBarWidth - parseFloat(handleCtrStyle)) + 'px';
    this.spannedTime = parseFloat(this.state.audio.duration / progressBarWidth) * parseFloat(handleCtrStyle);

    this.setState({
      handleActive: true,
      handleStyle: handleCtrStyle,
      doneStyle: doneStyleRight,
      progressSpanTime: formatTime(this.spannedTime)
    });
  }

  progressMove = (event) => {
    let pointerSecond = 0;
    if (event.type === 'mousemove') {
        pointerSecond = event.pageX;
        document.addEventListener('mouseup', this.progressDrop);
    } else if (event.type === 'touchmove') {
        pointerSecond = event.touches[0].pageX;
        event.target.addEventListener('touchend', this.progressDrop);
    }

    const handleCtr = document.getElementById('handleCtr');
    const progressBarWidth = parseFloat(window.getComputedStyle(handleCtr.parentElement, null).width);
    let pointerPosition = pointerSecond - this.pointerFirst;
    this.pointerFirst = pointerSecond;
    let handleCtrStyle = parseFloat(this.state.handleStyle) + pointerPosition + 'px';
    let doneStyleRight = (progressBarWidth - (parseFloat(this.state.handleStyle) + pointerPosition)) + 'px';
    this.spannedTime = parseFloat(this.state.audio.duration / progressBarWidth) * parseFloat(handleCtrStyle);

    this.setState({
      handleStyle: handleCtrStyle,
      doneStyle: doneStyleRight,
      progressSpanTime: formatTime(this.spannedTime)
    });
  }

  progressDrop = (event) => {
    const audio = this.state.audio;
    audio.currentTime = this.spannedTime;
    this.setState({
      handleActive: false,
      currentTime: formatTime(this.spannedTime),
      progressSpanTime: formatTime(this.spannedTime)
    }, () => {
      event.target.removeEventListener('touchmove', this.progressMove);
      event.target.removeEventListener('touchend', this.progressDrop);
      document.removeEventListener('mousemove', this.progressMove);
      document.removeEventListener('mouseup', this.progressDrop);
    });
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
        <div className="Player">
          <PlayerCard
            song={this.state.song}
            duration={this.state.totalDuration}
            currentTime={this.state.currentTime}
            isPlaying={this.state.isPlaying}
            togglePlay={this.togglePlay}
            skipSong={this.skipSong}
            progressHandler={this.progressHandler}
            doneStyle={this.state.doneStyle}
            handleStyle={this.state.handleStyle}
            handleActive={this.state.handleActive}
          />
        </div>
      </div>
    )
  }
}

export default PlayerListContainer;
