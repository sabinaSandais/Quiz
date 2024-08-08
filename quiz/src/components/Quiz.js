import React, { useEffect, useState, useContext, useRef, useCallback} from 'react';
import { fetchQuestions } from '../api';
import { QuizContext } from '../QuizContext';
import Question from './Question';
import Score from './Score';
import Timer from './Timer';  // Import the Timer component
import './Quiz.css';

const Quiz = () => {
  const { difficulty, setFinalScore } = useContext(QuizContext);
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [timeLeft, setTimeLeft] = useState(10);  // State to track time left for each question
  const timerRef = useRef(null); // Ref to store timer ID

  const handleAnswer = useCallback((answer) => {
    if (selectedAnswer !== '') return;

    setSelectedAnswer(answer);

    if (answer === questions[currentQuestion].correct_answer) {
      setScore(score + 1);
    }

    // Stop the timer
    clearInterval(timerRef.current);

    // Move to the next question or finish the quiz
    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer('');
        setTimeLeft(10);  // Reset the timer for the next question
      } else {
        setFinalScore(score + (answer === questions[currentQuestion].correct_answer ? 1 : 0));
      }
    }, 500); // Short delay to allow UI update
  }, [selectedAnswer, score, questions, currentQuestion, setFinalScore]);


  useEffect(() => {
    const loadQuestions = async () => {
      try {
        const fetchedQuestions = await fetchQuestions(difficulty);
        setQuestions(fetchedQuestions);
      } catch (error) {
        setError('Failed to load questions. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    loadQuestions();
  }, [difficulty]);

  useEffect(() => {
    if (timeLeft <= 0) {
      handleAnswer(''); // Move to the next question when time runs out
      return; // Early exit to prevent further updates
    }

    timerRef.current = setInterval(() => {
      setTimeLeft(prevTime => prevTime - 1);
    }, 1000); // Decrement every second

    // Cleanup function to clear the interval
    return () => clearInterval(timerRef.current);
  }, [timeLeft, handleAnswer]);

  

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  const currentQ = questions[currentQuestion];

  return (
    <div className="container-quiz">
      <section className="one"> 
        <h2 className='total-question'>Question {currentQuestion + 1}/{questions.length}</h2>
        <Question
          question={currentQ}
          handleAnswer={handleAnswer}
          selectedAnswer={selectedAnswer}
        />
        <Score score={score} />
        <div className="result-image-container">
          {selectedAnswer && (
            <img 
              src={selectedAnswer === currentQ.correct_answer ? '/correct2.png' : '/wronganswer.png'} 
              alt={selectedAnswer === currentQ.correct_answer ? 'Correct' : 'Incorrect'} 
              className={`result-image ${selectedAnswer === currentQ.correct_answer ? 'correct' : 'incorrect'}`}
            />
          )}
        </div>
      </section>
      <section className="two"><Timer timeLeft={timeLeft} />  </section>
    </div>
  );
};

export default Quiz;


// import React, { useEffect, useState, useContext } from 'react';
// import { fetchQuestions } from '../api';
// import { QuizContext } from '../QuizContext';
// import Question from './Question';
// import Score from './Score';
// import Timer from './Timer';  // Import the Timer component
// import './Quiz.css';

// const Quiz = () => {
//   const { difficulty, setFinalScore } = useContext(QuizContext);
//   const [questions, setQuestions] = useState([]);
//   const [currentQuestion, setCurrentQuestion] = useState(0);
//   const [score, setScore] = useState(0);
//   const [selectedAnswer, setSelectedAnswer] = useState('');
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [timeLeft, setTimeLeft] = useState(10);  // State to track time left for each question

//   useEffect(() => {
//     const loadQuestions = async () => {
//       try {
//         const fetchedQuestions = await fetchQuestions(difficulty);
//         setQuestions(fetchedQuestions);
//       } catch (error) {
//         setError('Failed to load questions. Please try again.');
//       } finally {
//         setLoading(false);
//       }
//     };

//     loadQuestions();
//   }, [difficulty]);

//   const handleAnswer = (answer) => {
//     if (selectedAnswer !== '') return;

//     setSelectedAnswer(answer);

//     if (answer === questions[currentQuestion].correct_answer) {
//       setScore(score + 1);
//     }

//     setTimeout(() => {
//       if (currentQuestion < questions.length - 1) {
//         setCurrentQuestion(currentQuestion + 1);
//         setSelectedAnswer('');
//         setTimeLeft(10);  // Reset the timer for the next question
//       } else {
//         setFinalScore(score + (answer === questions[currentQuestion].correct_answer ? 1 : 0));
//       }
//     }, 3000);
//   };

//   useEffect(() => {
//     if (timeLeft === 0) {
//       handleAnswer(''); // Move to next question when time runs out
//     }

//     const timer = setInterval(() => {
//       setTimeLeft(timeLeft => timeLeft - 1);
//     }, 1000); // Decrement every second

//     return () => clearInterval(timer);
//   }, [timeLeft]);

//   if (loading) {
//     return <div className="loading">Loading...</div>;
//   }

//   if (error) {
//     return <div className="error">{error}</div>;
//   }

//   const currentQ = questions[currentQuestion];

//   return (
//     <div className="container-quiz">
//       <section className="one"> 
//         <h2 className='total-question'>Question {currentQuestion + 1}/{questions.length}</h2>
//         <Question
//           question={currentQ}
//           handleAnswer={handleAnswer}
//           selectedAnswer={selectedAnswer}
//         />
//         <Score score={score} />
//         <div className="result-image-container">
//           {selectedAnswer && (
//             <img 
//               src={selectedAnswer === currentQ.correct_answer ? '/correct2.png' : '/wronganswer.png'} 
//               alt={selectedAnswer === currentQ.correct_answer ? 'Correct' : 'Incorrect'} 
//               className={`result-image ${selectedAnswer === currentQ.correct_answer ? 'correct' : 'incorrect'}`}
//             />
//           )}
//         </div>
//       </section>
//       <section className="two"><Timer timeLeft={timeLeft} />  </section>
//     </div>
//   );
// };

// export default Quiz;

// import React, { useEffect, useState, useContext,useCallback } from 'react';
// import { fetchQuestions } from '../api';
// import { QuizContext } from '../QuizContext';
// import Question from './Question';
// import Score from './Score';
// import Timer from './Timer';  // Import the Timer component
// import './Quiz.css';

// const Quiz = () => {
//   const { difficulty, setFinalScore } = useContext(QuizContext);
//   const [questions, setQuestions] = useState([]);
//   const [currentQuestion, setCurrentQuestion] = useState(0);
//   const [score, setScore] = useState(0);
//   const [selectedAnswer, setSelectedAnswer] = useState('');
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [timeLeft, setTimeLeft] = useState(10);  // State to track time left for each question

//   useEffect(() => {
//     const loadQuestions = async () => {
//       try {
//         const fetchedQuestions = await fetchQuestions(difficulty);
//         setQuestions(fetchedQuestions);
//       } catch (error) {
//         setError('Failed to load questions. Please try again.');
//       } finally {
//         setLoading(false);
//       }
//     };

//     loadQuestions();
//   }, [difficulty]);

  

//   // Memoize handleAnswer using useCallback
//   const handleAnswer = useCallback((answer) => {
//     if (selectedAnswer !== '') return;

//     setSelectedAnswer(answer);

//     if (answer === questions[currentQuestion].correct_answer) {
//       setScore(score + 1);
//     }

//     setTimeout(() => {
//       if (currentQuestion < questions.length - 1) {
//         setCurrentQuestion(currentQuestion + 1);
//         setSelectedAnswer('');
//         setTimeLeft(10);  // Reset the timer for the next question
//       } else {
//         setFinalScore(score + (answer === questions[currentQuestion].correct_answer ? 1 : 0));
//       }
//     }, 3000);
//   }, [selectedAnswer, currentQuestion, questions, score, setFinalScore]);

//   useEffect(() => {
//     if (timeLeft === 0) {
//       handleAnswer(''); // Move to next question when time runs out
//     }

//     const timer = setInterval(() => {
//       setTimeLeft(timeLeft => timeLeft - 1);
//     }, 2000);

//     return () => clearInterval(timer);
//   }, [timeLeft, handleAnswer]);

//   if (loading) {
//     return <div className="loading">Loading...</div>;
//   }

//   if (error) {
//     return <div className="error">{error}</div>;
//   }

//   const currentQ = questions[currentQuestion];

//   return (
//     <div className="container-quiz">
     
//       <section className="one"> 
//        <h2 className='total-question'>Question {currentQuestion + 1}/{questions.length}</h2>
//        {/* Add the Timer component */}
//       <Question
//         question={currentQ}
//         handleAnswer={handleAnswer}
//         selectedAnswer={selectedAnswer}
//       />
//       <Score score={score} />
//       <div className="result-image-container">
//         {selectedAnswer && (
//           <img 
//             src={selectedAnswer === currentQ.correct_answer ? '/correct2.png' : '/wronganswer.png'} 
//             alt={selectedAnswer === currentQ.correct_answer ? 'Correct' : 'Incorrect'} 
//             className={`result-image ${selectedAnswer === currentQ.correct_answer ? 'correct' : 'incorrect'}`}
//           />
//           )}
        
//         </div>
//       </section>
//       <section className="two"><Timer timeLeft={timeLeft} />  </section>
        
//     </div>
//   );
// };

// export default Quiz;


// import React, { useEffect, useState, useContext } from 'react';
// import { fetchQuestions } from '../api';
// import { QuizContext } from '../QuizContext';
// import Question from './Question';
// import Score from './Score';
// import './Quiz.css';

// const Quiz = () => {
//   const { difficulty, setFinalScore } = useContext(QuizContext);
//   const [questions, setQuestions] = useState([]);
//   const [currentQuestion, setCurrentQuestion] = useState(0);
//   const [score, setScore] = useState(0);
//   const [selectedAnswer, setSelectedAnswer] = useState('');
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const loadQuestions = async () => {
//       try {
//         const fetchedQuestions = await fetchQuestions(difficulty);
//         setQuestions(fetchedQuestions);
//       } catch (error) {
//         setError('Failed to load questions. Please try again.');
//       } finally {
//         setLoading(false);
//       }
//     };

//     loadQuestions();
//   }, [difficulty]);

//   const handleAnswer = (answer) => {
//     if (selectedAnswer !== '') return;

//     setSelectedAnswer(answer);

//     if (answer === questions[currentQuestion].correct_answer) {
//       setScore(score + 1);
//     }

//     setTimeout(() => {
//       if (currentQuestion < questions.length - 1) {
//         setCurrentQuestion(currentQuestion + 1);
//         setSelectedAnswer('');
//       } else {
//         setFinalScore(score + (answer === questions[currentQuestion].correct_answer ? 1 : 0));
//       }
//     }, 1000);
//   };

//   if (loading) {
//     return <div className="loading">Loading...</div>;
//   }

//   if (error) {
//     return <div className=" error">{error}</div>;
//   }

//   const currentQ = questions[currentQuestion];

//   return (
//     <div className="container-quiz">
//       <h2 className='total-question'>Question {currentQuestion + 1}/{questions.length}</h2>
//       <Question
//         question={currentQ}
//         handleAnswer={handleAnswer}
//         selectedAnswer={selectedAnswer}
//       />
//       <Score score={score} />
//       <div className="result-image-container">
//         {selectedAnswer && (
//           <img 
//             src={selectedAnswer === currentQ.correct_answer ? '/correct2.png' : '/wronganswer.png'} 
//             alt={selectedAnswer === currentQ.correct_answer ? 'Correct' : 'Incorrect'} 
//             className={`result-image ${selectedAnswer === currentQ.correct_answer ? 'correct' : 'incorrect'}`}
//           />
//         )}
//       </div>
//     </div>
//   );
// };

// export default Quiz;