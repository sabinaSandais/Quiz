import React from 'react';
import './Timer.css';

const Timer = ({ timeLeft }) => {
  // Calculate the height of the fill based on the remaining time
  const fillHeight = (timeLeft / 10) * 100; // Start fully filled and reduce over time

  return (
    <div className="timer-container">
      <div className="timer-fill" style={{ height: `${fillHeight}%` }}></div>
      <div className="timer-text">{timeLeft} seconds</div>
    </div>
  );
};

export default Timer;
// import React from 'react';
// import './Timer.css';

// const Timer = ({ timeLeft }) => {
//   const timerStyle = {
//     height: `${100 - (timeLeft * 10)}%`,
//   };

//   return (
//     <div className="timer">
//       <div className="timer-fill" style={timerStyle}></div>
//       <div className="timer-text">{timeLeft} seconds left</div>
//     </div>
//   );
// };

// export default Timer;
