    import { render, screen, fireEvent } from "@testing-library/react";
    import { describe, it, expect, vi, beforeEach } from "vitest";

    // Mock các component con
    vi.mock("../../../../../features/auth/components/EmailField", () => ({
      default: ({ value, onChange }: any) => (
        <input
          data-testid="email-field"
          value={value}
          onChange={onChange}
          name="email"
        />
      ),
    }));
    vi.mock("../../../../../features/auth/components/PasswordField", () => ({
      default: ({ value, onChange }: any) => (
        <input
          data-testid="password-field"
          value={value}
          onChange={onChange}
          name="password"
          type="password"
        />
      ),
    }));
    vi.mock("../../../../../features/auth/components/SubmitButton", () => ({
      default: ({ loading, text }: any) => (
        <button data-testid="submit-btn" disabled={loading}>
          {text}
        </button>
      ),
    }));
    vi.mock("../../../../../features/auth/components/backgrounds/CityParticlesBackground", () => ({
      default: ({ imageSrc }: any) => (
        <div data-testid="background" data-src={imageSrc}></div>
      ),
    }));

    // Mock hook useLogin
    const handleChange = vi.fn();
    const handleSubmit = vi.fn((e) => e.preventDefault());
    const mockUseLogin = {
      formData: { email: "test@example.com", password: "123456" },
      loading: false,
      error: "",
      handleChange,
      handleSubmit,
    };
    vi.mock("../../../../../features/auth/hooks/useLogin", () => ({
      useLogin: () => mockUseLogin,
    }));

    import LoginPage from "../../../../../features/auth/pages/LoginPage";

    describe("LoginPage - kiểm thử tích hợp", () => {
      beforeEach(() => {
        handleChange.mockClear();
        handleSubmit.mockClear();
        mockUseLogin.error = "";
        mockUseLogin.loading = false;
        mockUseLogin.formData = { email: "test@example.com", password: "123456" };
      });

      it("Hiển thị đầy đủ các thành phần chính", () => {
        render(<LoginPage />);
        expect(screen.getByTestId("login-page")).toBeInTheDocument();
        expect(screen.getByTestId("background")).toHaveAttribute(
          "data-src",
          "/backgrounds/lab.jpg"
        );
        expect(screen.getByAltText("Lab Logo")).toBeInTheDocument();
        expect(screen.getByText("Laboratory Management")).toBeInTheDocument();
        expect(screen.getByText("LOGIN")).toBeInTheDocument();
        expect(screen.getByTestId("email-field")).toBeInTheDocument();
        expect(screen.getByTestId("password-field")).toBeInTheDocument();
        expect(screen.getByTestId("submit-btn")).toBeInTheDocument();
        expect(screen.getByTestId("forgot-link")).toHaveTextContent(
          "Forgot password?"
        );
      });

      it("Truyền đúng props cho EmailField và PasswordField", () => {
        render(<LoginPage />);
        expect(screen.getByTestId("email-field")).toHaveValue("test@example.com");
        expect(screen.getByTestId("password-field")).toHaveValue("123456");
      });

      it("Hiển thị thông báo lỗi khi có lỗi", () => {
        mockUseLogin.error = "Sai thông tin đăng nhập";
        render(<LoginPage />);
        const errorMsg = screen.getByTestId("error-msg");
        expect(errorMsg).toHaveTextContent("Sai thông tin đăng nhập");
        expect(errorMsg.className).toContain("visible");
      });

      it("Nút SubmitButton bị disable khi loading", () => {
        mockUseLogin.loading = true;
        render(<LoginPage />);
        expect(screen.getByTestId("submit-btn")).toBeDisabled();
      });

      it("Gọi handleChange khi thay đổi input", () => {
        render(<LoginPage />);
        fireEvent.change(screen.getByTestId("email-field"), {
          target: { value: "new@example.com" },
        });
        expect(handleChange).toHaveBeenCalled();
        fireEvent.change(screen.getByTestId("password-field"), {
          target: { value: "newpass" },
        });
        expect(handleChange).toHaveBeenCalled();
      });

      it("Gọi handleSubmit khi submit form", () => {
        render(<LoginPage />);
        fireEvent.submit(screen.getByTestId("login-form"));
        expect(handleSubmit).toHaveBeenCalled();
      });
    });