import React from 'react';
import './Score.css';

const Score = ({ score }) => {
  return <p className='score'>Score: {score}</p>;
};

export default Score;
