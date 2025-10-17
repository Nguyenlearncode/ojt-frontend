import React from "react";
import "../styles/AnimatedBackground.css";

const AnimatedBackground: React.FC = () => {
  return (
    <div className="med-bg" aria-hidden>
      <div className="med-bg__gradient" />
      <div className="med-bg__blob med-bg__blob--a" />
      <div className="med-bg__blob med-bg__blob--b" />
      <div className="med-bg__blob med-bg__blob--c" />

      <div className="med-bg__icons">
        <span className="med-icon med-icon--cross" />
        <span className="med-icon med-icon--heart" />
        <span className="med-icon med-icon--pill" />
        <span className="med-icon med-icon--cross" />
        <span className="med-icon med-icon--ecg" />
      </div>

      <svg className="med-bg__ecg" viewBox="0 0 600 120" preserveAspectRatio="none">
        <polyline
          className="med-ecg-line"
          fill="none"
          points="0,60 60,60 90,20 110,90 140,60 200,60 230,10 250,100 280,60 340,60 360,45 380,75 420,60 480,60 510,15 530,105 560,60 600,60"
        />
      </svg>
    </div>
  );
};

export default AnimatedBackground;


