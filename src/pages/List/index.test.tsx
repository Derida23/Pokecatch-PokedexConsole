import React from "react";
import { render, screen } from "@testing-library/react";
import ListPage from ".";

test("renders learn react link", () => {
  render(<ListPage />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
