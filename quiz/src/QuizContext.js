import React, { useState, createContext } from "react";

export const QuizContext = createContext();

const QuizProvider = ({ children }) => {
    const [difficulty, setDifficulty] = useState("");
    const [finalScore, setFinalScore] = useState(null);

    const resetQuiz = () => {
        setDifficulty("");
        setFinalScore(null);
    };
    return (
        <QuizContext.Provider value={{ difficulty, setDifficulty, finalScore, setFinalScore, resetQuiz }}>
            {children}
        </QuizContext.Provider>
    );
    
}
export default QuizProvider;