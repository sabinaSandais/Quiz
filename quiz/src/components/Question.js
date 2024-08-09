import React from "react";
import "./Question.css";
import parse from "html-react-parser";

const Question = ({ question, handleAnswer, selectedAnswer }) => {
  const isMultipleChoice = question.type === "multiple";
  const answers = isMultipleChoice
    ? question.incorrect_answers.concat(question.correct_answer).sort()
    : ["True", "False"];

  return (
    <div className="question-container">
      <p className="question">{parse(question.question)}</p>
      <div className="answer-buttons">
        {answers.map((answer, index) => (
          <button
            key={index}
            onClick={() => handleAnswer(answer)}
            className={
              selectedAnswer
                ? answer === question.correct_answer
                  ? "correct"
                  : "incorrect"
                : ""
            }
            disabled={selectedAnswer !== ""}
          >
            {parse(answer)}
          </button>
        ))}
        <div className="result-image-container">
          {selectedAnswer && (
            <img
              src={
                selectedAnswer === question.correct_answer
                  ? "/correct2.png"
                  : "/wronganswer.png"
              }
              alt={
                selectedAnswer === question.correct_answer
                  ? "Correct"
                  : "Incorrect"
              }
              className={`result-image ${
                selectedAnswer === question.correct_answer
                  ? "correct"
                  : "incorrect"
              }`}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Question;
