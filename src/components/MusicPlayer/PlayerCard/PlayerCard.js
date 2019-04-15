import React from 'react';

const PlayerCard = ({song, duration, currentTime}) => {
  console.log(currentTime)
  return (
    <div>
      {song ? <div>{song.title}</div> : '?'}
        <div>
          <button>
              Previous
          </button>
          <button>

          </button>
          <button>
            Next
          </button>
        </div>
        <p>{currentTime}</p>
        <p>{duration}</p>
      </div>
  )
}

export default PlayerCard;
