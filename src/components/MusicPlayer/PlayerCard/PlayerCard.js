import React from 'react';

const PlayerCard = (props) => {
  const {song, duration, currentTime, isPlaying, togglePlay, skipSong, progressHandler, doneStyle, handleStyle, handleActive} = props
  return (
    <div>
      {song ? <div>{song.title}</div> : '?'}

      <div className="progress-container" onTouchStart={progressHandler} onMouseDown={progressHandler}>

        <div className="time">{currentTime}</div>
        <div className="progress-bar">
          <div className="done" style={{ right: doneStyle  }}></div>
          <div className="handle-ctr" id="handleCtr" style={{ left: handleStyle }}>
            <div className="handle"  style={{ background: handleActive ? "#333" : null }}></div>
          </div>
        </div>
        <div className="time">{duration}</div>



      </div>



      <div>
        <button onClick={() => skipSong(-1)}> Previous </button>
        <button onClick={togglePlay}> {isPlaying ? 'Pause' : 'Play'} </button>
        <button onClick={() => skipSong(1)}> Next </button>
      </div>



    </div>
  )
}

export default PlayerCard;
