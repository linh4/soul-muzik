import { useContext } from 'react';
import { PlayerContext } from "../PlayerContext";

const runPlayer = () => {
  const [state, setState] = useContext(PlayerContext);

  const playTrack = (index) => {
    if (index === state.currentSongIndex) {
      if (state.isPlaying) {
        state.audio.pause()
        state.audio.currentTime = 0
        // state.audio.play()
      }
      else {
        state.audio = new Audio(state.musicList[index].file);
      }
    }
    else {
      state.audio.pause();
      state.audio = new Audio(state.musicList[index].file);
      state.audio.play();
      setState(state => ({ ...state, currentSongIndex: index, isPlaying: true }));
    }
    showTime()
  }

  const showTime = () => {
    // Update the song position as the song plays
    state.audio.addEventListener('timeupdate', () => {
      let time = formatTime(state.audio.currentTime)
      setState(state => ({ ...state, songPosition: time}));
    });

    state.audio.addEventListener('loadedmetadata', () => {
      const time = formatTime(state.audio.duration)
      setState(state => ({ ...state, songDuration: time }))
    });

    // Move to the next song in the queue after the current one has finished
    state.audio.addEventListener('ended', () => {
      playNextTrack();
    });
  }

  const formatTime = (time) => {
    let min = Math.floor(time / 60);
    let sec = Math.floor(time % 60);
    return min + ':' + ((sec<10) ? ('0' + sec) : sec);
  }

  const togglePlay = () => {
    if (state.isPlaying) {
      state.audio.pause();
    } else {
      state.audio.play();
    }
    setState(state => ({ ...state, isPlaying: !state.isPlaying }));
  }

  const playPreviousTrack = () => {
    const newIndex = ((state.currentSongIndex - 1)  % state.musicList.length + state.musicList.length) % state.musicList.length;
    playTrack(newIndex);
  }

  const playNextTrack = () => {
    const newIndex = (state.currentSongIndex + 1) % state.musicList.length;
    playTrack(newIndex);
  }

  return {
    currentSongName: state.currentSongIndex !== null && state.musicList[state.currentSongIndex].title,
    musicList: state.musicList,
    isPlaying: state.isPlaying,
    songPosition: state.songPosition,
    songDuration: state.songDuration,
    playTrack,
    togglePlay,
    playPreviousTrack,
    playNextTrack,
  }
};

export default runPlayer;
