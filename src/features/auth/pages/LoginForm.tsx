import React from "react";
import EmailField from "../components/EmailField";
import PasswordField from "../components/PasswordField";
import SubmitButton from "../components/SubmitButton";
import { useLogin } from "../hooks/useLogin";
import "../styles/LoginForm.css";
import logo from "../../../assets/react.svg";

const LoginPage: React.FC = () => {
  const { formData, loading, error, handleChange, handleSubmit } = useLogin();

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-header">
          <div className="login-logo-row">
            <img src={logo} alt="Lab Logo" className="login-logo" />
            <h2>Laboratory Management</h2>
          </div>
          <p className="login-subtitle">LOGIN</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <EmailField value={formData.email} onChange={handleChange} />
          <PasswordField value={formData.password} onChange={handleChange} />
          {error && <p className="login-error">{error}</p>}
          <div className="login-options">
            <a href="#">Forgot password?</a>
          </div>
          <SubmitButton loading={loading} />
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
