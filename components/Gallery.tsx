import React, { useState } from 'react';
import { Camera, RefreshCw, Eye, Download } from 'lucide-react';
import { generateFentaRochenImage } from '../services/geminiService';

const Gallery: React.FC = () => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [promptInput, setPromptInput] = useState('');

  const handleGenerate = async () => {
    if (loading) return;
    setLoading(true);
    // Use a default filler if empty to ensure the model gets something, but the service adds the main subject anyway.
    const userPrompt = promptInput.trim() || "navigating through a coral reef";
    
    const result = await generateFentaRochenImage(userPrompt);
    if (result) {
      setImageUrl(result);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-black text-white p-6 md:p-12 pt-24 flex flex-col items-center">
      <div className="max-w-5xl w-full">
        <h2 className="text-4xl font-bold mb-2 border-l-4 border-bio-green pl-4">Visuelle Sensoren</h2>
        <p className="text-slate-400 mb-8 pl-5">Generiere visuelle Daten basierend auf Missions-Parametern.</p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Controls */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-slate-900/80 p-6 rounded-xl border border-slate-800">
              <label className="block text-sm font-mono text-ocean-glow mb-2">UMGEBUNGS-VARIABLE</label>
              <textarea
                value={promptInput}
                onChange={(e) => setPromptInput(e.target.value)}
                placeholder="z.B. in einer Eishöhle, erkundet ein Schiffswrack, biolumineszierender Schwarm..."
                className="w-full h-32 bg-black border border-slate-700 rounded-lg p-3 text-slate-300 text-sm focus:border-ocean-glow focus:ring-1 focus:ring-ocean-glow outline-none resize-none mb-4"
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
                {loading ? 'Rendere...' : 'Visualisieren'}
              </button>
            </div>
            
            <div className="bg-slate-900/40 p-6 rounded-xl border border-slate-800/50">
              <h4 className="text-white font-bold mb-2 flex items-center gap-2">
                <Eye size={16} className="text-ocean-glow" /> 
                Systemstatus
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Der FentaRochen Mk-IV nutzt fortschrittliche Sonar-zu-Bild-Rekonstruktion (Gemini 2.5 Flash Image). 
                Geben Sie Parameter ein, um eine Simulation der Umgebung zu erstellen.
              </p>
            </div>
          </div>

          {/* Display Area */}
          <div className="lg:col-span-2">
            <div className="aspect-video w-full bg-slate-900 rounded-xl border-2 border-slate-800 overflow-hidden relative flex items-center justify-center group">
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
                      <Download size={16} /> DOWNLOAD LOG
                    </a>
                  </div>
                </>
              ) : (
                <div className="text-center p-8">
                  <div className="w-16 h-16 border-t-2 border-r-2 border-ocean-glow rounded-full animate-spin mx-auto mb-4 opacity-50"></div>
                  <p className="text-slate-500 font-mono text-sm tracking-widest uppercase">
                    Warte auf Input...
                  </p>
                </div>
              )}
              
              {/* Overlay HUD elements */}
              <div className="absolute top-4 left-4 text-[10px] font-mono text-ocean-glow/50">
                REC :: {new Date().toLocaleTimeString()}
              </div>
              <div className="absolute top-4 right-4 w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
              <div className="absolute bottom-4 right-4 text-[10px] font-mono text-ocean-glow/50 border border-ocean-glow/30 px-2 py-1">
                IMG_GEN_MODULE_ACTIVE
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Gallery;