import { useState, useEffect, useImperativeHandle, forwardRef } from "react";
import "../../styles/CityParticlesBackground.css";

const NUM_CIRCLES = 150; // Reduced from 200 for better performance

interface Props {
  imageSrc?: string;
  onGather?: (targetX: number, targetY: number) => void; // Not used yet
}

const CityParticlesBackground = forwardRef(({ imageSrc = "/backgrounds/lab.jpg" }: Props, ref) => {
  const cacheBustParam = typeof window !== "undefined" ? `?v=${Math.floor(Date.now() / 60000)}` : "";
  const bgUrl = `${imageSrc}${cacheBustParam}`;

  const [phase, setPhase] = useState<'normal' | 'gathering' | 'resetting'>('normal');
  const [targetPos, setTargetPos] = useState({ x: 50, y: 50 }); // vw, vh
  const [particles, setParticles] = useState<Array<{
    sx: number;
    ex: number;
    sy: number;
    ey: number;
    size: number;
    dur: number;
    delay: number;
  }>>([]); // To regenerate on reset

  useImperativeHandle(ref, () => ({
    triggerGather: (tx: number, ty: number) => {
      setTargetPos({ x: tx, y: ty });
      setPhase('gathering');
      setTimeout(() => {
        setPhase('resetting');
        regenerateParticles();
        setTimeout(() => setPhase('normal'), 100); // Small delay for reset animation
      }, 500);
    }
  }));

  const regenerateParticles = () => {
    const newParticles = Array.from({ length: NUM_CIRCLES }).map((_, index) => {
      const r1 = ((index * 9301 + 49297) % 233280) / 233280;
      const r2 = ((index * 23333 + 12345) % 233280) / 233280;
      const r3 = ((index * 83497 + 77) % 233280) / 233280;
      const r4 = ((index * 19237 + 555) % 233280) / 233280;

      const sx = Math.round(r1 * 100);
      const ex = Math.round(r2 * 100);
      const sy = Math.round(100 + r3 * 40);
      const ey = Math.round(-20 - r4 * 40);
      const size = 3 + Math.round(r1 * 5);
      const dur = 20000 + Math.round(r2 * 20000);
      const delay = Math.round(r3 * 20000);

      return { sx, ex, sy, ey, size, dur, delay };
    });
    setParticles(newParticles);
  };

  useEffect(() => {
    regenerateParticles();
  }, []);

  return (
    <div
      className={`city-bg ${phase}`}
      aria-hidden
      style={{ ['--bg-url' as any]: `url('${bgUrl}')` }}
    >
      {particles.map((p, index) => (
        <div
          className="circle-container"
          key={index}
          style={{
            width: `${p.size}px`,
            height: `${p.size}px`,
            ['--sx' as any]: `${p.sx}vw`,
            ['--ex' as any]: phase === 'gathering' ? `${targetPos.x}vw` : `${p.ex}vw`,
            ['--sy' as any]: `${p.sy}vh`,
            ['--ey' as any]: phase === 'gathering' ? `${targetPos.y}vh` : `${p.ey}vh`,
            ['--dur' as any]: phase === 'gathering' ? '500ms' : `${p.dur}ms`, // Faster for gathering
            ['--delay' as any]: phase === 'gathering' ? '0ms' : `${p.delay}ms`,
            animationTimingFunction: phase === 'gathering' ? 'ease-in' : 'linear',
          }}
        >
          <div className="circle" />
          <div className="trail" /> {/* New trail element */}
        </div>
      ))}
    </div>
  );
});

export default CityParticlesBackground;


