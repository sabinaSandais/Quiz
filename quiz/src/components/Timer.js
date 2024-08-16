import React from "react";
import "./Timer.css";

const Timer = ({ timeLeft }) => {
  const percentage = (timeLeft / 20) * 100;

  return (
    <div className="timer-circle">
      <div
        className="timer-mask"
        style={{
          WebkitMaskImage: `linear-gradient(to top, transparent ${percentage}%, rgba(0, 0, 0, 0.3) ${percentage}%)`,
        }}
      />
      <div className="timer-text">{timeLeft}</div>
    </div>
  );
};

export default Timer;
