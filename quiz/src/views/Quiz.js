import React, {
  useState,
  useContext,
  useCallback,
  useEffect,
  useRef,
} from "react";
import { QuizContext } from "../QuizContext";
import useFetchQuestions from "../hooks/useFetchQuestions";
import Question from "../components/Question";
import Score from "../components/Score";
import Timer from "../components/Timer";
import "./Quiz.css";

const Quiz = () => {
  const { difficulty, setFinalScore } = useContext(QuizContext);
  const { questions, loading, error } = useFetchQuestions(difficulty);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [timeLeft, setTimeLeft] = useState(10);
  const timerRef = useRef(null);

  const handleAnswer = useCallback(
    (answer) => {
      if (selectedAnswer !== "") return;

      setSelectedAnswer(answer);

      if (answer === questions[currentQuestion].correct_answer) {
        setScore(score + 1);
      }

      clearInterval(timerRef.current);

      setTimeout(() => {
        if (currentQuestion < questions.length - 1) {
          setCurrentQuestion(currentQuestion + 1);
          setSelectedAnswer("");
          setTimeLeft(10);
        } else {
          setFinalScore(
            score +
              (answer === questions[currentQuestion].correct_answer ? 1 : 0)
          );
        }
      }, 3000);
    },
    [selectedAnswer, score, questions, currentQuestion, setFinalScore]
  );

  const handleTimeOut = useCallback(() => {
    clearInterval(timerRef.current);
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer("");
      setTimeLeft(10);
    } else {
      setFinalScore(
        score +
          (selectedAnswer === questions[currentQuestion].correct_answer ? 1 : 0)
      );
    }
  }, [currentQuestion, questions, score, selectedAnswer, setFinalScore]);
//Timer
  useEffect(() => {
    if (timeLeft <= 0) {
      handleTimeOut();
      return;
    }

    timerRef.current = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(timerRef.current);
  }, [timeLeft, handleTimeOut]);

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  const currentQ = questions[currentQuestion];

  return (
    <div className="container-quiz">
      <section className="one">
        <h2 className="total-question">
          Question {currentQuestion + 1}/{questions.length}
        </h2>
        <Question
          question={currentQ}
          handleAnswer={handleAnswer}
          selectedAnswer={selectedAnswer}
        />
        <Score score={score} />
      </section>
      <section className="two">
        <Timer timeLeft={timeLeft} />
      </section>
    </div>
  );
};

export default Quiz;
