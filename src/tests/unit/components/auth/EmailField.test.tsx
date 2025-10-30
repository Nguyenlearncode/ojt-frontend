import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { ChakraProvider } from "@chakra-ui/react";
import EmailField from "../../../../features/auth/components/EmailField";

const renderWithChakra = (ui: React.ReactElement) =>
  render(<ChakraProvider>{ui}</ChakraProvider>);

describe("EmailField (Logic Only)", () => {
  it("renders input element", () => {
    renderWithChakra(<EmailField value="" onChange={() => {}} />);
    const input = screen.getByPlaceholderText(/enter your email/i);
    expect(input).toBeInTheDocument();
  });

  it("calls onChange when typing", () => {
    const handleChange = vi.fn();
    renderWithChakra(<EmailField value="" onChange={handleChange} />);

    const input = screen.getByPlaceholderText(/enter your email/i);
    fireEvent.change(input, { target: { value: "user@example.com" } });

    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it("displays the current value", () => {
    renderWithChakra(
      <EmailField value="test@mail.com" onChange={() => {}} />
    );
    expect(screen.getByDisplayValue("test@mail.com")).toBeInTheDocument();
  });
});
