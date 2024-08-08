
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; // for the toBeInTheDocument matcher
import Score from './Score';

test('renders Score component with the given score', () => {
  const testScore = 2; // Example score value
  
  render(<Score score={testScore} />);
  
  // Check that the text is rendered correctly
  expect(screen.getByText(`Score: ${testScore}`)).toBeInTheDocument();
});
