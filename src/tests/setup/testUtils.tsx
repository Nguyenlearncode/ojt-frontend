import React from "react";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

// Giúp render component có router context
export const renderWithRouter = (ui: React.ReactElement) => {
  return render(<MemoryRouter>{ui}</MemoryRouter>);
};

// Jest-dom matchers (toBeInTheDocument, v.v.)
import "@testing-library/jest-dom";

// Dọn localStorage trước mỗi test
beforeEach(() => {
  localStorage.clear();
});
