import { useContext } from 'react';
import { PlayerContext } from "../PlayerContext";

const runPlayer = () => {
  const [state, setState] = useContext(PlayerContext);

  const playTrack = (index) => {
    if (index === state.currentAudioIndex) {
      togglePlay();
    } else {
      state.audio.pause();
      state.audio = new Audio(state.musicList[index].file);
      state.audio.play();
      setState(state => ({ ...state, currentAudioIndex: index, isPlaying: true }));

      // Update the song position as the song plays
      state.audio.addEventListener('timeupdate', e => {
        setState(state => ({ ...state, songPosition: state.audio.currentTime}));
      });

      // If autoplay is set, move to the next song in the queue after the current one has finished
      // state.audio.addEventListener('ended', () => {
      //   if(state.isPlaying) {
      //     console.log('hit nextrack')
      //     playNextTrack();
      //   } else {
      //     setState(state => ({ ...state, isPlaying: false}));
      //   }
      // });
    }
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
    const newIndex = ((state.currentAudioIndex - 1)  % state.musicList.length + state.musicList.length) % state.musicList.length;
    playTrack(newIndex);
  }

  const playNextTrack = () => {
    const newIndex = (state.currentAudioIndex + 1) % state.musicList.length;
    playTrack(newIndex);
  }

  return {
    currentAudioName: state.currentAudioIndex !== null && state.musicList[state.currentAudioIndex].title,
    musicList: state.musicList,
    isPlaying: state.isPlaying,
    songPosition: state.songPosition,
    playTrack,
    togglePlay,
    playPreviousTrack,
    playNextTrack,
  }
};

export default runPlayer;
