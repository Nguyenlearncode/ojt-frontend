import React from "react";

interface SubmitButtonProps {
  loading: boolean;
  text?: string;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({
  loading,
  text = "Sign In",
}) => {
  return (
    <button type="submit" className="btn-login" disabled={loading}>
      {loading ? "Signing in..." : text}
    </button>
  );
};

export default SubmitButton;
