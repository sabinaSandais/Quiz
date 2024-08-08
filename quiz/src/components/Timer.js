import React from 'react';
import './Timer.css';

const Timer = ({ timeLeft }) => {
  const percentage = (timeLeft / 10) * 100; // Convert timeLeft to percentage

  return (
    <div className="timer-circle">
      <div
        className="timer-mask"
        style={{ WebkitMaskImage: `linear-gradient(to top, transparent ${percentage}%, rgba(0, 0, 0, 0.3) ${percentage}%)` }}
      />
      <div className="timer-text">{timeLeft}</div>
    </div>
  );
};

export default Timer;




// import React from 'react';
// import './Timer.css';

// const Timer = ({ timeLeft }) => {
//   const radius = 70; // Radius of the circle
//   const circumference = 2 * Math.PI * radius; // Total circumference of the circle
  
//   // Calculate the stroke-dasharray and stroke-dashoffset based on timeLeft
//   const strokeDasharray = circumference;
//   const strokeDashoffset = circumference - (timeLeft / 10) * circumference;

//   return (
//     <div className="timer-circle">
//       <svg className="timer-svg">
//         {/* Background Circle */}
//         <circle
//           className="timer-svg-bg"
//           cx="75"
//           cy="75"
//           r={radius}
//         />
//         {/* Foreground Circle */}
//         <circle
//           className="timer-svg-circle"
//           cx="75"
//           cy="75"
//           r={radius}
//           style={{ strokeDasharray, strokeDashoffset }}
//         />
//       </svg>
//       <div className="timer-text">{timeLeft}</div>
//     </div>
//   );
// };

// export default Timer;

