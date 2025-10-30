import React, { useEffect, useRef } from "react";
import { Box } from "@chakra-ui/react";

interface Particle {
  color: string;
  x: number;
  y: number;
  direction: { x: number; y: number };
  vx: number;
  vy: number;
  radius: number;
  float: () => void;
  changeDirection: (axis: "x" | "y") => void;
  boundaryCheck: (width: number, height: number) => void;
  draw: (ctx: CanvasRenderingContext2D) => void;
}

const ParticlesBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationFrameRef = useRef<number | null>(null);

  const randomInt = (min: number, max: number): number => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  const createParticle = (ww: number, wh: number): Particle => {
    const particle: any = {
      color: `rgba(255,255,255,${Math.random()})`,
      x: randomInt(0, ww),
      y: randomInt(0, wh),
      direction: {
        x: -1 + Math.random() * 2,
        y: -1 + Math.random() * 2,
      },
      vx: 0.3 * Math.random(),
      vy: 0.3 * Math.random(),
      radius: randomInt(2, 3),
    };

    particle.float = function () {
      this.x += this.vx * this.direction.x;
      this.y += this.vy * this.direction.y;
    };

    particle.changeDirection = function (axis: "x" | "y") {
      this.direction[axis] *= -1;
    };

    particle.boundaryCheck = function (width: number, height: number) {
      if (this.x >= width) {
        this.x = width;
        this.changeDirection("x");
      } else if (this.x <= 0) {
        this.x = 0;
        this.changeDirection("x");
      }
      if (this.y >= height) {
        this.y = height;
        this.changeDirection("y");
      } else if (this.y <= 0) {
        this.y = 0;
        this.changeDirection("y");
      }
    };

    particle.draw = function (ctx: CanvasRenderingContext2D) {
      ctx.beginPath();
      ctx.fillStyle = this.color;
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
      ctx.fill();
    };

    return particle as Particle;
  };

  const createParticles = (count: number, ww: number, wh: number) => {
    const particles: Particle[] = [];
    for (let i = 0; i < count; i++) {
      particles.push(createParticle(ww, wh));
    }
    return particles;
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const updateCanvasSize = () => {
      const ww = window.innerWidth;
      const wh = window.innerHeight;
      canvas.width = ww;
      canvas.height = wh;
      return { ww, wh };
    };

    const { ww, wh } = updateCanvasSize();
    particlesRef.current = createParticles(100, ww, wh);

    const clearCanvas = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    };

    const drawParticles = () => {
      particlesRef.current.forEach((p) => p.draw(ctx));
    };

    const updateParticles = () => {
      particlesRef.current.forEach((p) => {
        p.float();
        p.boundaryCheck(canvas.width, canvas.height);
      });
    };

    const animateParticles = () => {
      clearCanvas();
      drawParticles();
      updateParticles();
      animationFrameRef.current = requestAnimationFrame(animateParticles);
    };

    animateParticles();

    const handleResize = () => {
      const { ww, wh } = updateCanvasSize();
      clearCanvas();
      particlesRef.current = createParticles(100, ww, wh);
      drawParticles();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      {/* Main Canvas */}
      <Box
        as="canvas"
        ref={canvasRef}
        position="fixed"
        top={0}
        left={0}
        width="100%"
        height="100%"
        zIndex={-1}
        pointerEvents="none"
      />

      {/* Gradient Background */}
      <Box
        position="fixed"
        top={0}
        left={0}
        width="100%"
        height="100%"
        bgGradient="linear(25deg, #16054A, #C8A6B4)"
        zIndex={-2}
      />
    </>
  );
};

export default ParticlesBackground;

