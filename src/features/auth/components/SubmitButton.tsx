// src/features/auth/components/SubmitButton.tsx
interface SubmitButtonProps {
  loading?: boolean;
  text?: string;
  onClick?: () => void;
}

const SubmitButton = ({
  loading = false,
  text = "Sign In",
  onClick,
}: SubmitButtonProps) => {
  const baseClass = "btn-login gooey-btn";
  const className = loading ? `${baseClass} is-loading` : baseClass;

  return (
    <button
      type="submit"
      disabled={loading}
      className={className}
      aria-busy={loading}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default SubmitButton;
