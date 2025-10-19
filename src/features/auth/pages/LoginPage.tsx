import React from "react";
import EmailField from "../components/EmailField";
import PasswordField from "../components/PasswordField";
import SubmitButton from "../components/SubmitButton";
import CityParticlesBackground from "../components/backgrounds/CityParticlesBackground";
import { useLogin } from "../hooks/useLogin";
import "../styles/LoginForm.css";
import logo from "../../../assets/react.svg";

const LoginPage: React.FC = () => {
  const { formData, loading, error, handleChange, handleSubmit } = useLogin();

  return (
    <div className="login-page" data-testid="login-page">
      <CityParticlesBackground imageSrc="/backgrounds/lab.jpg" />
      <div className="login-card login-card--glass">
        <div className="login-header">
          <div className="login-logo-row">
            <img src={logo} alt="Lab Logo" className="login-logo" />
            <h2>Laboratory Management</h2>
          </div>
          <p className="login-subtitle">LOGIN</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form" data-testid="login-form">
          <EmailField value={formData.email} onChange={handleChange} />
          <PasswordField value={formData.password} onChange={handleChange} />

          <p
            className={`login-error${error ? " visible" : ""}`}
            data-testid="error-msg"
          >
            {error || ""}
          </p>

          <div className="login-options">
            <a href="#" data-testid="forgot-link">
              Forgot password?
            </a>
          </div>
          <SubmitButton loading={loading} text="Login" />
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
