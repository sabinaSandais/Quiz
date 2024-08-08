import React, { useContext } from 'react';
import { QuizContext } from '../QuizContext';
import './ResultPage.css';

const ResultPage = () => {
  const { finalScore, resetQuiz } = useContext(QuizContext);

  return (
    <div className="result-page">
    
      <h1>Quiz Completed</h1>
      <p>Your final score is {finalScore} out of 10</p>
      <button className='reset' onClick={resetQuiz}>Try Again</button>
    
    </div>
  );
};

export default ResultPage;
