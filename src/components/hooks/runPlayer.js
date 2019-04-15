import { useContext } from 'react';
import { PlayerContext } from "../PlayerContext";

const runPlayer = () => {
  const [state, setState] = useContext(PlayerContext);

  const playTrack = (song) => {
    // console.log("song?" ,song)
    // If a song is currently playing, we have to remove it
    // if(state.audio !== null) {
      // state.audio.removeEventListener('timeupdate', () => {
        // setState({songPosition: 0});
      // });
      // state.audio.pause();
      // state.audio.removeAttribute('src');
      // state.audio.load();
    // }

    // if (song === state.song) {
    //   togglePlay()
    // }
    state.audio.pause();
    state.audio = new Audio(song.file);
    state.audio.play();
    //
    // // Show the status bar at the bottom
    setState(state => ({ ...state, song, isPlaying: true }));
    console.log(state.song)
    showTime()
    // console.log(state.song)
    //
    // Update the song position as the song plays
    // state.audio.addEventListener('timeupdate', e => {
    //   setState({ ...state, songPosition: formatTime(state.audio.currentTime)});
    // });

    // If autoplay is set, move to the next song in the queue after the current one has finished
    // state.audio.addEventListener('ended', () => {
      // if(state.autoplay) {
        // state.skipSong(1);
      // } else {
        // setState({playing: false, statusVisible: false});
      // }
    // });
  }

  const skipSong = index => {
  // Reset times
  // console.log(state.song)
  let indexTo = state.song.id + index;
  if(state.musicList.length > indexTo && indexTo > 0) {
    playTrack(state.musicList[indexTo]);
  } else if(indexTo < 0) {
    // Play the last song in the queue
    playTrack(state.musicList[state.musicList.length - 1]);

  } else {
    playTrack(state.musicList[0]);
  }
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
      // playNextTrack();
      // console.log("song", state.song)
      skipSong(1)
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
    musicList: state.musicList,
    isPlaying: state.isPlaying,
    songPosition: state.songPosition,
    songDuration: state.songDuration,
    playTrack,
    togglePlay,
    playPreviousTrack,
    playNextTrack,
    song: state.song,
    skipSong
  }
};

export default runPlayer;
