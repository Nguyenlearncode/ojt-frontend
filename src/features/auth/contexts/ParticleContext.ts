import { createContext } from "react";

export const ParticleContext = createContext<{ triggerGather: (x: number, y: number) => void } | null>(null);
