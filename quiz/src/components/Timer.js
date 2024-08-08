import React from 'react';
import './Timer.css';

const Timer = ({ timeLeft }) => {
  const timerStyle = {
    height: `${100 - (timeLeft * 10)}%`,
  };

  return (
    <div className="timer">
      <div className="timer-fill" style={timerStyle}></div>
      <div className="timer-text">{timeLeft} seconds left</div>
    </div>
  );
};

export default Timer;
