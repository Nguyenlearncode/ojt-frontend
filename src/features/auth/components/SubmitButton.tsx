// src/features/auth/components/SubmitButton.tsx

import React, { useRef, useContext } from "react";
import "../styles/GooeyButton.css";
import { ParticleContext } from "../contexts/ParticleContext"; // Correct path

interface SubmitButtonProps {
  loading: boolean;
  text?: string;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({ loading, text = "Sign In" }) => {
  const ref = useRef<HTMLButtonElement | null>(null);
  const context = useContext(ParticleContext);
  const triggerGather = context?.triggerGather ?? (() => {});

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    el.style.setProperty("--x", x.toFixed(2));
    el.style.setProperty("--y", y.toFixed(2));
  };

  const handleClick = () => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      const x = (rect.left + rect.width / 2) / window.innerWidth * 100;
      const y = (rect.top + rect.height / 2) / window.innerHeight * 100;
      triggerGather(x, y);
    }
  };

  return (
    <>
      <button
        ref={ref}
        type="submit"
        className={`btn-login gooey-btn${loading ? " is-loading" : ""}`}
        disabled={loading}
        onMouseMove={handleMouseMove}
        onClick={handleClick}
      >
        {loading ? "Signing in..." : text}
      </button>

      {/* SVG filter for gooey effect */}
      <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden>
        <filter id="goo" x="-50%" y="-50%" width="200%" height="200%">
          <feComponentTransfer>
            <feFuncA type="discrete" tableValues="0 1" />
          </feComponentTransfer>
          <feGaussianBlur stdDeviation="5" />
          <feComponentTransfer>
            <feFuncA type="table" tableValues="-5 11" />
          </feComponentTransfer>
        </filter>
      </svg>
    </>
  );
};

export default SubmitButton;
