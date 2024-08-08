import { useContext } from "react";
import Welcome from "./views/Welcome";
import Quiz from "./views/Quiz";
import QuizProvider, { QuizContext } from "./QuizContext";
import ResultPage from "./components/Result";

import "./App.css";

const AppContent = () => {
  const { difficulty, finalScore } = useContext(QuizContext);

  return (
    <div className="App">
      {!difficulty ? (
        <Welcome />
      ) : finalScore === null ? (
        <Quiz />
      ) : (
        <ResultPage />
      )}
    </div>
  );
};
const App = () => {
  return (
    <QuizProvider>
      <AppContent />
    </QuizProvider>
  );
};

export default App;
