import React from 'react';
import { ChevronDown, Cloud } from 'lucide-react';

interface HeroProps {
  onExplore: () => void;
}

const HeroSection: React.FC<HeroProps> = ({ onExplore }) => {
  return (
    <div className="relative h-screen w-full overflow-hidden flex flex-col items-center justify-center text-center">
      {/* Background Gradient imitating deep sea/digital cloud */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-[#001e3c] to-black z-0" />
      
      {/* Animated Glow Effects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-ocean-glow/10 rounded-full blur-[100px] animate-pulse-slow" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-bio-green/10 rounded-full blur-[100px] animate-pulse-slow delay-1000" />

      {/* Grid Overlay for Tech feel */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.05)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)] z-0 pointer-events-none" />

      <div className="relative z-10 px-4 max-w-4xl mx-auto space-y-8 animate-float">
        <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-ocean-glow via-white to-bio-green drop-shadow-[0_0_15px_rgba(6,182,212,0.5)]">
          FENTAROCHEN
        </h1>
        <p className="text-xl md:text-2xl text-cyan-100/80 font-light tracking-widest uppercase flex items-center justify-center gap-3">
          <Cloud className="inline-block" /> Personal Deep Cloud Interface
        </p>
        <div className="flex justify-center gap-4 pt-8">
           <button 
             onClick={onExplore}
             className="group relative px-8 py-3 bg-cyan-950/50 border border-ocean-glow/30 hover:border-ocean-glow text-ocean-glow hover:text-white transition-all duration-300 rounded-sm uppercase tracking-widest text-sm font-semibold overflow-hidden"
           >
             <span className="relative z-10">Access Data</span>
             <div className="absolute inset-0 bg-ocean-glow/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
           </button>
        </div>
      </div>

      <div className="absolute bottom-10 z-10 animate-bounce text-cyan-500/50">
        <ChevronDown size={32} />
      </div>
    </div>
  );
};

export default HeroSection;