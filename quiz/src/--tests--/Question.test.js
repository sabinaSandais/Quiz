import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Question from "../components/Question";

describe("Question Component", () => {
  const sampleQuestion = {
    type: "multiple",
    question: "What is the capital of France?",
    correct_answer: "Paris",
    incorrect_answers: ["London", "Berlin", "Madrid"],
  };

  const mockHandleAnswer = jest.fn();

  test("renders question and answers correctly", () => {
    render(
      <Question
        question={sampleQuestion}
        handleAnswer={mockHandleAnswer}
        selectedAnswer=""
      />
    );

    expect(
      screen.getByText(/What is the capital of France\?/i)
    ).toBeInTheDocument();

    sampleQuestion.incorrect_answers
      .concat(sampleQuestion.correct_answer)
      .forEach((answer) => {
        expect(screen.getByText(answer)).toBeInTheDocument();
      });
  });

  test("handles answer selection", () => {
    const { rerender } = render(
      <Question
        question={sampleQuestion}
        handleAnswer={mockHandleAnswer}
        selectedAnswer=""
      />
    );

    fireEvent.click(screen.getByText("Paris"));

    expect(mockHandleAnswer).toHaveBeenCalledWith("Paris");

    rerender(
      <Question
        question={sampleQuestion}
        handleAnswer={mockHandleAnswer}
        selectedAnswer="Paris"
      />
    );

    expect(screen.getByText("Paris")).toBeDisabled();
  });
});
