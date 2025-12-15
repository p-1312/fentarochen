import React, { useState } from 'react';
import { Camera, RefreshCw, Eye, Download, Play, Film, Aperture } from 'lucide-react';
import { generateFentaRochenImage } from '../services/geminiService';

const MISSION_LOGS = [
  {
    id: 1,
    title: "Mission: Trench Dive",
    duration: "03:45",
    description: "Erkundung des Marianengrabens. Maximale Tiefe erreicht.",
    url: "https://storage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
    thumbnail: "https://images.unsplash.com/photo-1582967788606-a171f1080ca8?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: 2,
    title: "System Test: Hydro-Thrusters",
    duration: "01:20",
    description: "Diagnose der Antriebssysteme bei 500 Bar Außendruck.",
    url: "https://storage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
    thumbnail: "https://images.unsplash.com/photo-1518337231011-7024e292b656?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: 3,
    title: "Biolumineszenz Scan",
    duration: "05:12",
    description: "Aufzeichnung unbekannter Lichtmuster im Sektor 7G.",
    url: "https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    thumbnail: "https://images.unsplash.com/photo-1550989460-0adf9ea622e2?q=80&w=800&auto=format&fit=crop"
  }
];

const Gallery: React.FC = () => {
  // Image Gen State
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [promptInput, setPromptInput] = useState('');

  // Video Player State
  const [currentVideo, setCurrentVideo] = useState(MISSION_LOGS[0]);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleGenerate = async () => {
    if (loading) return;
    setLoading(true);
    const userPrompt = promptInput.trim() || "navigating through a coral reef";
    
    const result = await generateFentaRochenImage(userPrompt);
    if (result) {
      setImageUrl(result);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white p-4 md:p-12 pt-24 flex flex-col items-center">
      <div className="max-w-7xl w-full">
        <h2 className="text-4xl font-bold mb-2 border-l-4 border-ocean-glow pl-4 flex items-center gap-3">
            VISION HUB <span className="text-xs bg-ocean-glow/20 text-ocean-glow px-2 py-1 rounded border border-ocean-glow/30">MEDIA CENTER</span>
        </h2>
        <p className="text-slate-400 mb-8 pl-5">Zugriff auf optische Sensoren und gespeicherte Missions-Logs.</p>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* LEFT COLUMN: VIDEO PLAYER (8 Cols) */}
            <div className="lg:col-span-8 space-y-4">
                <div className="bg-black border border-slate-800 rounded-xl overflow-hidden shadow-2xl relative aspect-video group">
                    <video 
                        key={currentVideo.url} // Force reload on change
                        src={currentVideo.url}
                        controls
                        poster={currentVideo.thumbnail}
                        className="w-full h-full object-cover"
                        onPlay={() => setIsPlaying(true)}
                        onPause={() => setIsPlaying(false)}
                    />
                    
                    {/* Video HUD Overlay (Hidden when controls active mostly, but adds flair) */}
                    <div className="absolute top-4 left-4 pointer-events-none">
                        <div className="flex items-center gap-2">
                             <div className={`w-2 h-2 rounded-full ${isPlaying ? 'bg-red-500 animate-pulse' : 'bg-slate-500'}`}></div>
                             <span className="text-[10px] font-mono tracking-widest text-white/50">{isPlaying ? 'PLAYBACK :: ACTIVE' : 'PLAYBACK :: PAUSED'}</span>
                        </div>
                    </div>
                </div>

                <div className="bg-slate-900/50 border border-slate-800 p-6 rounded-xl">
                    <h3 className="text-xl font-bold text-white mb-1 flex items-center gap-2">
                        <Film className="text-ocean-glow" size={20} />
                        {currentVideo.title}
                    </h3>
                    <p className="text-slate-400 text-sm">{currentVideo.description}</p>
                </div>

                {/* Playlist */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {MISSION_LOGS.map(log => (
                        <div 
                            key={log.id} 
                            onClick={() => setCurrentVideo(log)}
                            className={`p-3 rounded-lg border cursor-pointer transition-all flex gap-3 items-center group ${
                                currentVideo.id === log.id 
                                ? 'bg-ocean-glow/10 border-ocean-glow/50' 
                                : 'bg-slate-900/40 border-slate-800 hover:bg-slate-800 hover:border-slate-600'
                            }`}
                        >
                            <div className="relative w-16 h-12 bg-black rounded overflow-hidden flex-shrink-0">
                                <img src={log.thumbnail} alt="" className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity" />
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <Play size={10} className="fill-white text-white drop-shadow-md" />
                                </div>
                            </div>
                            <div className="overflow-hidden">
                                <div className={`text-xs font-bold truncate ${currentVideo.id === log.id ? 'text-ocean-glow' : 'text-slate-300'}`}>{log.title}</div>
                                <div className="text-[10px] font-mono text-slate-500">{log.duration}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* RIGHT COLUMN: AI IMAGE GEN (4 Cols) */}
            <div className="lg:col-span-4 flex flex-col gap-6">
                 {/* Generation Display */}
                 <div className="w-full aspect-square bg-slate-900 rounded-xl border-2 border-slate-800 overflow-hidden relative flex items-center justify-center group shadow-lg">
                    {imageUrl ? (
                        <>
                        <img 
                            src={imageUrl} 
                            alt="FentaRochen Generation" 
                            className="w-full h-full object-cover animate-in fade-in duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                            <a 
                            href={imageUrl} 
                            download="fentarochen_vision.png"
                            className="text-white flex items-center gap-2 hover:text-ocean-glow transition-colors font-mono text-sm"
                            >
                            <Download size={16} /> DOWNLOAD SNAPSHOT
                            </a>
                        </div>
                        </>
                    ) : (
                        <div className="text-center p-8">
                            <Aperture className="w-16 h-16 text-slate-800 mx-auto mb-4 animate-spin-slow" />
                            <p className="text-slate-500 font-mono text-sm tracking-widest uppercase">
                                Sensor Standby...
                            </p>
                        </div>
                    )}
                    <div className="absolute top-4 right-4 text-[10px] font-mono text-ocean-glow/50 border border-ocean-glow/30 px-2 py-1 bg-black/50 backdrop-blur">
                        IMG_GEN_MODULE
                    </div>
                </div>

                {/* Generation Controls */}
                <div className="bg-slate-900/80 p-6 rounded-xl border border-slate-800 flex-1 flex flex-col">
                    <div className="flex items-center gap-2 mb-4 text-ocean-glow">
                         <Eye size={20} />
                         <h3 className="font-bold tracking-wider text-sm">SONAR VISUALIZER</h3>
                    </div>
                    
                    <textarea
                        value={promptInput}
                        onChange={(e) => setPromptInput(e.target.value)}
                        placeholder="Beschreibe die Umgebung für die Sonar-Rekonstruktion (z.B. Eishöhle, Wrack, Schwarm)..."
                        className="w-full flex-1 min-h-[100px] bg-black border border-slate-700 rounded-lg p-3 text-slate-300 text-sm focus:border-ocean-glow focus:ring-1 focus:ring-ocean-glow outline-none resize-none mb-4"
                    />
                    
                    <button
                        onClick={handleGenerate}
                        disabled={loading}
                        className={`w-full py-4 rounded-lg font-bold uppercase tracking-widest flex items-center justify-center gap-2 transition-all ${
                        loading 
                            ? 'bg-slate-800 text-slate-500 cursor-wait' 
                            : 'bg-bio-green hover:bg-emerald-400 text-slate-950 shadow-[0_0_20px_rgba(16,185,129,0.3)]'
                        }`}
                    >
                        {loading ? <RefreshCw className="animate-spin" size={20} /> : <Camera size={20} />}
                        {loading ? 'RENDERING...' : 'GENERATE'}
                    </button>
                    
                    <p className="text-[10px] text-slate-500 mt-4 leading-relaxed font-mono">
                        Nutzung der Gemini 2.5 Flash Image API zur Rekonstruktion visueller Daten aus akustischen Signalen.
                    </p>
                </div>
            </div>

        </div>
      </div>
    </div>
  );
};

export default Gallery;