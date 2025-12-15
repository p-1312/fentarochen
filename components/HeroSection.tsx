import React, { useState } from 'react';
import { ChevronDown, Cloud, Play, X } from 'lucide-react';

interface HeroProps {
  onExplore: () => void;
}

const HeroSection: React.FC<HeroProps> = ({ onExplore }) => {
  const [showTrailer, setShowTrailer] = useState(false);

  return (
    <div className="relative h-screen w-full overflow-hidden flex flex-col items-center justify-center text-center">
      {/* Background Gradient imitating deep red void */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-[#1a0000] to-black z-0" />
      
      {/* Animated Glow Effects - Red */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-ocean-glow/10 rounded-full blur-[100px] animate-pulse-slow" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-red-900/10 rounded-full blur-[100px] animate-pulse-slow delay-1000" />

      {/* Grid Overlay for Tech feel */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(139,0,0,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(139,0,0,0.05)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)] z-0 pointer-events-none" />

      <div className="relative z-10 px-4 max-w-4xl mx-auto space-y-8 animate-float">
        <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-ocean-glow via-white to-ocean-glow drop-shadow-[0_0_15px_rgba(139,0,0,0.5)]">
          FENTAROCHEN
        </h1>
        <p className="text-xl md:text-2xl text-red-100/80 font-light tracking-widest uppercase flex items-center justify-center gap-3">
          <Cloud className="inline-block" /> Personal Deep Cloud Interface
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4 pt-8">
           <button 
             onClick={onExplore}
             className="group relative px-8 py-3 bg-red-950/50 border border-ocean-glow/30 hover:border-ocean-glow text-ocean-glow hover:text-white transition-all duration-300 rounded-sm uppercase tracking-widest text-sm font-semibold overflow-hidden"
           >
             <span className="relative z-10">Access Data</span>
             <div className="absolute inset-0 bg-ocean-glow/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
           </button>

           <button 
             onClick={() => setShowTrailer(true)}
             className="group relative px-8 py-3 bg-transparent border border-white/20 hover:border-white text-white transition-all duration-300 rounded-sm uppercase tracking-widest text-sm font-semibold flex items-center justify-center gap-2"
           >
             <Play size={16} className="fill-white" />
             <span>Trailer</span>
           </button>
        </div>
      </div>

      <div className="absolute bottom-10 z-10 animate-bounce text-red-600/50">
        <ChevronDown size={32} />
      </div>

      {/* Trailer Overlay */}
      {showTrailer && (
        <div className="fixed inset-0 z-[60] bg-black/95 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-300">
            <div className="relative w-full max-w-5xl aspect-video bg-black rounded-lg border border-red-900 shadow-[0_0_50px_rgba(139,0,0,0.2)]">
                <button 
                    onClick={() => setShowTrailer(false)}
                    className="absolute -top-12 right-0 text-white hover:text-red-500 transition-colors flex items-center gap-2"
                >
                    SCHLIESSEN <X size={24} />
                </button>
                
                {/* Decorative Elements */}
                <div className="absolute top-4 left-4 text-[10px] font-mono text-ocean-glow opacity-50">PLAYBACK :: ID_7721</div>
                <div className="absolute bottom-4 right-4 text-[10px] font-mono text-ocean-glow opacity-50">SECURE STREAM</div>
                
                <video 
                    controls 
                    autoPlay 
                    className="w-full h-full rounded-lg"
                    poster="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070"
                >
                    <source src="https://storage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4" type="video/mp4" />
                    Dein Browser unterstützt dieses Video-Format nicht.
                </video>
            </div>
        </div>
      )}
    </div>
  );
};

export default HeroSection;