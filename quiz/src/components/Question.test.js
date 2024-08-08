import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Question from './Question';

describe('Question Component', () => {
  const sampleQuestion = {
    type: 'multiple',
    question: 'What is the capital of France?',
    correct_answer: 'Paris',
    incorrect_answers: ['London', 'Berlin', 'Madrid'],
  };

  const mockHandleAnswer = jest.fn();

  test('renders question and answers correctly', () => {
    render(
      <Question
        question={sampleQuestion}
        handleAnswer={mockHandleAnswer}
        selectedAnswer=""
      />
    );

    // Check if the question is rendered correctly
    expect(screen.getByText(/What is the capital of France\?/i)).toBeInTheDocument();

    // Check if all answers are rendered correctly
    sampleQuestion.incorrect_answers.concat(sampleQuestion.correct_answer).forEach(answer => {
      expect(screen.getByText(answer)).toBeInTheDocument();
    });
  });

  test('handles answer selection', () => {
    const { rerender } = render(
      <Question
        question={sampleQuestion}
        handleAnswer={mockHandleAnswer}
        selectedAnswer=""
      />
    );

    // Select an answer
    fireEvent.click(screen.getByText('Paris'));

    // Mock function should be called
    expect(mockHandleAnswer).toHaveBeenCalledWith('Paris');

    // Rerender with the selected answer
    rerender(
      <Question
        question={sampleQuestion}
        handleAnswer={mockHandleAnswer}
        selectedAnswer="Paris"
      />
    );

    // Check if the selected answer is disabled
    expect(screen.getByText('Paris')).toBeDisabled();
  });
});

