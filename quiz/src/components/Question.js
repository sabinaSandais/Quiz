import React from 'react';
import './Question.css';
import parse from 'html-react-parser';

const Question = ({ question, handleAnswer, selectedAnswer }) => {
  const isMultipleChoice = question.type === 'multiple';
  const answers = isMultipleChoice
    ? question.incorrect_answers.concat(question.correct_answer).sort()
    : ['True', 'False'];

  return (
    <div className='question-container'>
      <p className='question'>{parse(question.question)}</p>
      <div className="answer-buttons">
        {answers.map((answer, index) => (
          <button
            key={index}
            onClick={() => handleAnswer(answer)}
            className={selectedAnswer ? (answer === question.correct_answer ? 'correct' : 'incorrect') : ''}
            disabled={selectedAnswer !== '' && selectedAnswer !== answer}
          >
            {parse(answer)}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Question;

// import React from 'react';
// import AnswerButton from './AnswerButton';
// import './Question.css';
// import parse from 'html-react-parser';

// const Question = ({ question, handleAnswer, selectedAnswer }) => {
//   const isMultipleChoice = question.type === 'multiple';
//   const answers = isMultipleChoice
//     ? question.incorrect_answers.concat(question.correct_answer).sort()
//     : ['True', 'False'];

//   return (
//     <div>
//       <p>{parse(question.question)}</p>
//       <div className="answer-buttons">
//         {answers.map((answer, index) => (
//           <AnswerButton
//             key={index}
//             answer={answer}
//             onClick={() => handleAnswer(answer)}
//             isCorrect={answer === question.correct_answer}
//             isSelected={selectedAnswer === answer}
//             disabled={selectedAnswer !== '' && selectedAnswer !== answer}
//           />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Question;

// import React from 'react';
// import AnswerButton from './AnswerButton';
// import './Question.css';
// import parse from 'html-react-parser';

// const Question = ({ question, handleAnswer, selectedAnswer }) => {
//   const isMultipleChoice = question.type === 'multiple';
//   const answers = isMultipleChoice
//     ? question.incorrect_answers.concat(question.correct_answer).sort()
//     : ['True', 'False'];

//   return (
//     <div>
//       <p>{parse(question.question)}</p>
//       <div className="answer-buttons">
//         {answers.map((answer, index) => (
//           <AnswerButton
//             key={index}
//             answer={answer}
//             onClick={() => handleAnswer(answer)}
//             isCorrect={answer === question.correct_answer}
//             isSelected={selectedAnswer === answer}
//             disabled={selectedAnswer !== ''}
//           />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Question;
