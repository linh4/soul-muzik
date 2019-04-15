import { useContext } from 'react';
import { PlayerContext } from "../PlayerContext";

const runPlayer = () => {
  const [state, setState] = useContext(PlayerContext);

  const playTrack = (song) => {
    console.log("song?" ,song.title, state.song)
    // If a song is currently playing, we have to remove it
    if(state.audio !== null) {
      state.audio.removeEventListener('timeupdate', () => {
        setState(state => ({...state, songPosition: 0}));
      });
      state.audio.pause();
      // state.audio.removeAttribute('src');
      // state.audio.load();
    }
    state.audio = new Audio(song.file);
    // state.audio.setAttribute('src', song.file);
    console.log(state.audio)
    state.audio.play()
    setState(state => ({ ...state, song, isPlaying: true }));
    showTime(song)
  }

  const skipSong = (song, index) => {
    let indexTo = song.id + index;
    if(state.musicList.length > indexTo && indexTo > 0) {
      playTrack(state.musicList[indexTo]);
    } else if(indexTo < 0) {
      // Play the last song in the queue
      playTrack(state.musicList[state.musicList.length - 1]);
    } else {
      playTrack(state.musicList[0]);
    }
  }

  const showTime = (song) => {
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
      console.log("song", state.song)
      skipSong(song, 1)
    });
  }

  const formatTime = (time) => {
    let min = Math.floor(time / 60);
    let sec = Math.floor(time % 60);
    return min + ':' + ((sec<10) ? ('0' + sec) : sec);
  }

  const togglePlay = () => {
    console.log(state.audio)
      if (state.isPlaying) {
        state.audio.pause();
      } else {
        state.audio.play();
      }
      setState(state => ({ ...state, isPlaying: !state.isPlaying }));
  }

  return {
    musicList: state.musicList,
    isPlaying: state.isPlaying,
    songPosition: state.songPosition,
    songDuration: state.songDuration,
    playTrack,
    togglePlay,
    song: state.song,
    skipSong,
  }
};

export default runPlayer;
