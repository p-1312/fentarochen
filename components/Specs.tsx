import React, { useState, useEffect } from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { SpecData, DepthData } from '../types';
import { Activity, Thermometer, Droplets, Zap } from 'lucide-react';

const performanceData: SpecData[] = [
  { attribute: 'Geschwindigkeit', value: 95, fullMark: 100 },
  { attribute: 'Stealth', value: 100, fullMark: 100 },
  { attribute: 'Tiefe', value: 98, fullMark: 100 },
  { attribute: 'Autonomie', value: 85, fullMark: 100 },
  { attribute: 'Sensorik', value: 90, fullMark: 100 },
  { attribute: 'Manövrier', value: 92, fullMark: 100 },
];

const depthProfile: DepthData[] = [
  { time: '00:00', depth: 0, pressure: 1 },
  { time: '00:10', depth: 200, pressure: 21 },
  { time: '00:20', depth: 1000, pressure: 101 },
  { time: '00:30', depth: 3500, pressure: 351 },
  { time: '00:40', depth: 6000, pressure: 601 },
  { time: '00:50', depth: 11000, pressure: 1101 },
  { time: '01:00', depth: 8500, pressure: 851 },
];

const Specs: React.FC = () => {
  const [telemetry, setTelemetry] = useState({
    depth: 10994.5,
    pressure: 1105.2,
    temp: 2.1,
    reactor: 98.4
  });

  // Simulation of live data fluctuations
  useEffect(() => {
    const interval = setInterval(() => {
      setTelemetry(prev => ({
        depth: 10990 + Math.random() * 10,
        pressure: 1100 + Math.random() * 10,
        temp: 2.0 + Math.random() * 0.4,
        reactor: 98 + Math.random() * 2
      }));
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full min-h-screen bg-slate-950 p-6 md:p-12 pt-24 flex flex-col gap-12">
      <div className="max-w-7xl mx-auto w-full">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h2 className="text-4xl font-bold text-white mb-2 border-l-4 border-ocean-glow pl-4">Technische Telemetrie</h2>
            <p className="text-slate-400 pl-5">Echtzeit-Analyse der FentaRochen Mk-IV Systeme.</p>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-red-950/30 border border-red-900/50 rounded animate-pulse">
            <span className="w-2 h-2 bg-red-500 rounded-full"></span>
            <span className="text-xs font-mono text-red-400 tracking-widest uppercase">Live-Verbindung aktiv</span>
          </div>
        </div>

        {/* Live Telemetry Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
           <div className="bg-slate-900/50 border border-slate-800 p-4 rounded-lg">
              <div className="flex items-center gap-2 text-slate-500 mb-1 text-xs uppercase tracking-widest">
                <Activity size={14} className="text-ocean-glow" /> Aktuelle Tiefe
              </div>
              <div className="text-2xl font-mono text-white">-{telemetry.depth.toFixed(1)} <span className="text-sm text-slate-500">m</span></div>
           </div>
           <div className="bg-slate-900/50 border border-slate-800 p-4 rounded-lg">
              <div className="flex items-center gap-2 text-slate-500 mb-1 text-xs uppercase tracking-widest">
                <Droplets size={14} className="text-blue-500" /> Außendruck
              </div>
              <div className="text-2xl font-mono text-white">{telemetry.pressure.toFixed(1)} <span className="text-sm text-slate-500">bar</span></div>
           </div>
           <div className="bg-slate-900/50 border border-slate-800 p-4 rounded-lg">
              <div className="flex items-center gap-2 text-slate-500 mb-1 text-xs uppercase tracking-widest">
                <Thermometer size={14} className="text-emerald-500" /> Wassertemp.
              </div>
              <div className="text-2xl font-mono text-white">{telemetry.temp.toFixed(2)} <span className="text-sm text-slate-500">°C</span></div>
           </div>
           <div className="bg-slate-900/50 border border-slate-800 p-4 rounded-lg">
              <div className="flex items-center gap-2 text-slate-500 mb-1 text-xs uppercase tracking-widest">
                <Zap size={14} className="text-yellow-500" /> Reaktor-Output
              </div>
              <div className="text-2xl font-mono text-white">{telemetry.reactor.toFixed(1)} <span className="text-sm text-slate-500">%</span></div>
           </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Radar Chart */}
          <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6 backdrop-blur-sm">
            <h3 className="text-xl text-ocean-glow font-mono mb-4 uppercase tracking-wider">Leistungsprofil</h3>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={performanceData}>
                  <PolarGrid stroke="#334155" />
                  <PolarAngleAxis dataKey="attribute" tick={{ fill: '#94a3b8', fontSize: 12 }} />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                  <Radar
                    name="FentaRochen"
                    dataKey="value"
                    stroke="#06b6d4"
                    strokeWidth={2}
                    fill="#06b6d4"
                    fillOpacity={0.3}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Line Chart */}
          <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6 backdrop-blur-sm">
             <h3 className="text-xl text-bio-green font-mono mb-4 uppercase tracking-wider">Tauchprofil (Simulation)</h3>
             <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={depthProfile}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                  <XAxis dataKey="time" stroke="#64748b" />
                  <YAxis stroke="#64748b" label={{ value: 'Tiefe (m)', angle: -90, position: 'insideLeft', fill: '#64748b' }} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', color: '#f1f5f9' }}
                    itemStyle={{ color: '#10b981' }}
                  />
                  <Line type="monotone" dataKey="depth" stroke="#10b981" strokeWidth={2} dot={{ fill: '#10b981' }} activeDot={{ r: 8 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            {[
                { title: 'Bionische Hülle', val: 'Graphen-Verbund', desc: 'Druckresistent bis 1200 bar' },
                { title: 'Antrieb', val: 'Magnetohydrodynamisch', desc: 'Geräuschlose Fortbewegung' },
                { title: 'KI Core', val: 'Gemini Neural Net', desc: 'Autonome Missionsplanung' }
            ].map((item, i) => (
                <div key={i} className="p-6 border border-slate-800 bg-slate-900/30 rounded-lg hover:border-ocean-glow/50 transition-colors group">
                    <h4 className="text-slate-500 uppercase text-xs font-bold tracking-widest mb-2 group-hover:text-ocean-glow transition-colors">{item.title}</h4>
                    <div className="text-2xl text-white font-mono font-bold mb-1">{item.val}</div>
                    <p className="text-sm text-slate-400">{item.desc}</p>
                </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Specs;