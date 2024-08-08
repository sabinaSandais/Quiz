import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Score from "../components/Score";

test("renders Score component with the given score", () => {
  const testScore = 2;

  render(<Score score={testScore} />);

  expect(screen.getByText(`Score: ${testScore}`)).toBeInTheDocument();
});
