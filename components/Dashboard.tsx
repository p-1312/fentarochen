import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import { HardDrive, Cloud, Server, Activity, Globe, Wifi, Eye, Radio, Maximize2 } from 'lucide-react';

const storageData = [
  { name: 'Videos', value: 450, color: '#06b6d4' }, // cyan
  { name: 'Musik', value: 300, color: '#10b981' },  // green
  { name: 'Dokumente', value: 150, color: '#f59e0b' }, // amber
  { name: 'System', value: 50, color: '#64748b' },   // slate
];

const trafficData = [
  { time: 'Mo', upload: 400, download: 240 },
  { time: 'Di', upload: 300, download: 139 },
  { time: 'Mi', upload: 200, download: 980 },
  { time: 'Do', upload: 278, download: 390 },
  { time: 'Fr', upload: 189, download: 480 },
  { time: 'Sa', upload: 239, download: 380 },
  { time: 'So', upload: 349, download: 430 },
];

const Dashboard: React.FC = () => {
  const totalStorage = 2000; // 2TB
  const usedStorage = storageData.reduce((acc, curr) => acc + curr.value, 0);
  const percentage = Math.round((usedStorage / totalStorage) * 100);

  return (
    <div className="w-full min-h-screen bg-slate-950 p-6 md:p-12 pt-24 flex flex-col gap-8">
      <div className="max-w-7xl mx-auto w-full">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h2 className="text-4xl font-bold text-white mb-2 border-l-4 border-ocean-glow pl-4 flex items-center gap-3">
              Cloud Interface <span className="text-sm font-mono font-normal text-slate-500 bg-slate-900 px-2 py-1 rounded border border-slate-800">v0.7.5</span>
            </h2>
            <div className="pl-5 flex items-center gap-2 text-ocean-glow font-mono text-sm">
                <Globe size={14} />
                <span>Verbunden mit:</span>
                <a href="https://cloud.fentarochen.net" target="_blank" rel="noopener noreferrer" className="underline decoration-dotted hover:text-white transition-colors">
                    https://cloud.fentarochen.net
                </a>
            </div>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-emerald-950/30 border border-emerald-900/50 rounded animate-pulse shadow-[0_0_15px_rgba(16,185,129,0.2)]">
            <Wifi size={16} className="text-emerald-500" />
            <span className="text-xs font-mono text-emerald-400 tracking-widest uppercase">Server Online</span>
          </div>
        </div>

        {/* Live Video Feed Widget */}
        <div className="mb-8 w-full">
          <div className="bg-black/80 border border-slate-800 rounded-xl overflow-hidden relative group">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-ocean-glow to-transparent opacity-50"></div>

            {/* Header overlay */}
            <div className="absolute top-0 left-0 right-0 p-4 flex justify-between items-start z-10 bg-gradient-to-b from-black/80 to-transparent">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                <span className="text-red-500 font-mono text-xs font-bold tracking-widest">LIVE FEED // CAM-01 [BUG]</span>
              </div>
              <div className="font-mono text-xs text-ocean-glow/80">
                TIEFE: -4102m | DRUCK: 420bar
              </div>
            </div>

            {/* Video Content Simulation */}
            <div className="relative w-full aspect-[21/9] md:aspect-[32/9] overflow-hidden bg-[#000510]">
              {/* Deep Sea Simulation CSS */}
              <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_50%_50%,rgba(6,182,212,0.1),transparent_70%)]"></div>

              {/* Particles */}
              <div className="absolute inset-0 overflow-hidden">
                 {[...Array(20)].map((_, i) => (
                   <div
                     key={i}
                     className="absolute bg-white/10 rounded-full blur-[1px]"
                     style={{
                       width: Math.random() * 4 + 1 + 'px',
                       height: Math.random() * 4 + 1 + 'px',
                       left: Math.random() * 100 + '%',
                       top: Math.random() * 100 + '%',
                       animation: `float ${Math.random() * 10 + 5}s linear infinite`
                     }}
                   />
                 ))}
              </div>

              {/* Light beams */}
              <div className="absolute top-[-50%] left-[20%] w-[20%] h-[200%] bg-gradient-to-b from-ocean-glow/5 to-transparent rotate-12 blur-3xl animate-pulse-slow"></div>
              <div className="absolute top-[-50%] left-[60%] w-[15%] h-[200%] bg-gradient-to-b from-bio-green/5 to-transparent -rotate-12 blur-3xl animate-pulse-slow delay-700"></div>

              {/* Scanline */}
              <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.5)_50%)] bg-[length:100%_4px] pointer-events-none opacity-20"></div>
              <div className="absolute w-full h-[2px] bg-ocean-glow/30 top-0 animate-[scan_4s_linear_infinite] shadow-[0_0_10px_rgba(6,182,212,0.5)]"></div>

              {/* Central HUD Crosshair */}
              <div className="absolute inset-0 flex items-center justify-center opacity-30 pointer-events-none">
                 <div className="w-64 h-64 border border-ocean-glow/30 rounded-full flex items-center justify-center relative">
                    <div className="w-1 h-4 bg-ocean-glow absolute top-0"></div>
                    <div className="w-1 h-4 bg-ocean-glow absolute bottom-0"></div>
                    <div className="w-4 h-1 bg-ocean-glow absolute left-0"></div>
                    <div className="w-4 h-1 bg-ocean-glow absolute right-0"></div>
                    <div className="w-2 h-2 bg-ocean-glow rounded-full"></div>
                 </div>
              </div>
            </div>

            {/* Bottom Info */}
            <div className="absolute bottom-0 left-0 right-0 p-4 flex justify-between items-end z-10 bg-gradient-to-t from-black/90 to-transparent">
               <div className="text-[10px] font-mono text-slate-500">
                  <p>ISO: 12800</p>
                  <p>BLENDE: F/1.4</p>
                  <p>BELICHTUNG: 1/60</p>
               </div>
               <div className="flex gap-2">
                 <button className="p-2 hover:bg-white/10 rounded text-ocean-glow transition-colors" title="Fullscreen">
                    <Maximize2 size={16} />
                 </button>
               </div>
            </div>
          </div>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
           <div className="bg-slate-900/50 border border-slate-800 p-6 rounded-lg flex items-center gap-4 hover:border-ocean-glow/30 transition-colors">
              <div className="p-3 bg-ocean-glow/10 rounded-lg text-ocean-glow">
                <HardDrive size={24} />
              </div>
              <div>
                <div className="text-slate-400 text-xs uppercase tracking-wider">Belegt</div>
                <div className="text-xl font-bold text-white">{usedStorage} GB <span className="text-slate-600 text-sm">/ {totalStorage} GB</span></div>
              </div>
           </div>
           <div className="bg-slate-900/50 border border-slate-800 p-6 rounded-lg flex items-center gap-4 hover:border-purple-500/30 transition-colors">
              <div className="p-3 bg-purple-500/10 rounded-lg text-purple-500">
                <Cloud size={24} />
              </div>
              <div>
                <div className="text-slate-400 text-xs uppercase tracking-wider">Sync Status</div>
                <div className="text-xl font-bold text-white">Aktiv</div>
              </div>
           </div>
           <div className="bg-slate-900/50 border border-slate-800 p-6 rounded-lg flex items-center gap-4 hover:border-blue-500/30 transition-colors">
              <div className="p-3 bg-blue-500/10 rounded-lg text-blue-500">
                <Server size={24} />
              </div>
              <div>
                <div className="text-slate-400 text-xs uppercase tracking-wider">CPU Last</div>
                <div className="text-xl font-bold text-white">12%</div>
              </div>
           </div>
           <div className="bg-slate-900/50 border border-slate-800 p-6 rounded-lg flex items-center gap-4 hover:border-yellow-500/30 transition-colors">
              <div className="p-3 bg-yellow-500/10 rounded-lg text-yellow-500">
                <Activity size={24} />
              </div>
              <div>
                <div className="text-slate-400 text-xs uppercase tracking-wider">Uptime</div>
                <div className="text-xl font-bold text-white">14d 2h</div>
              </div>
           </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Storage Distribution */}
          <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6 backdrop-blur-sm">
            <h3 className="text-xl text-ocean-glow font-mono mb-6 uppercase tracking-wider">Speicherverteilung</h3>
            <div className="h-[300px] w-full flex items-center justify-center relative">
              <div className="absolute inset-0 flex items-center justify-center flex-col pointer-events-none">
                <span className="text-4xl font-bold text-white">{percentage}%</span>
                <span className="text-xs text-slate-500 uppercase">Belegt</span>
              </div>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={storageData}
                    cx="50%"
                    cy="50%"
                    innerRadius={80}
                    outerRadius={110}
                    paddingAngle={5}
                    dataKey="value"
                    stroke="none"
                  >
                    {storageData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', borderRadius: '8px' }}
                    itemStyle={{ color: '#fff' }}
                  />
                  <Legend verticalAlign="bottom" height={36} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Network Traffic */}
          <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6 backdrop-blur-sm">
             <h3 className="text-xl text-bio-green font-mono mb-6 uppercase tracking-wider">Netzwerk Traffic (MB)</h3>
             <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={trafficData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                  <XAxis dataKey="time" stroke="#64748b" />
                  <YAxis stroke="#64748b" />
                  <Tooltip 
                    cursor={{fill: '#1e293b', opacity: 0.4}}
                    contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', color: '#f1f5f9' }}
                  />
                  <Legend />
                  <Bar name="Upload" dataKey="upload" fill="#06b6d4" radius={[4, 4, 0, 0]} />
                  <Bar name="Download" dataKey="download" fill="#10b981" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes scan {
          0% { top: 0; }
          100% { top: 100%; }
        }
      `}</style>
    </div>
  );
};

export default Dashboard;