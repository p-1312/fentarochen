import React, { useState } from 'react';
import Hero from "./components/Hero.tsx";
import StorageDashboard from "./components/StorageDashboard.tsx";
import FileManager from './components/FileManager';
import Profile from "./components/Profile.tsx";
import Legal from "./components/Legal.tsx";
import Login from "./components/Login.tsx";
import { ViewSection } from './types';
import { Activity, HardDrive, User, Menu, X, Home } from 'lucide-react';

// Custom Icon representing the Fentanyl Patch (Matrixpflaster)
const FentanylPatchIcon = ({ size = 24, className = "" }: { size?: number | string, className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    {/* Outline of the patch with slight fill for material feel */}
    <rect x="2" y="5" width="20" height="14" rx="2" fill="currentColor" fillOpacity="0.05" />

    {/* The characteristic wavy cut of the protective liner (S-Curve) */}
    <path d="M12 5c0 3.5-1.5 3.5-1.5 7s1.5 3.5 1.5 7" />

    {/* Stylized markings representing the text on the patch */}
    <path d="M5 9h3" opacity="0.5" />
    <path d="M5 11h2" opacity="0.3" />
    <path d="M16 13h3" opacity="0.5" />
    <path d="M17 15h2" opacity="0.3" />
  </svg>
);

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentView, setCurrentView] = useState<ViewSection>(ViewSection.HOME);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleNavClick = (view: ViewSection) => {
    setCurrentView(view);
    setIsMobileMenuOpen(false);
  };

  const renderView = () => {
    switch (currentView) {
      case ViewSection.HOME:
        return <Hero onExplore={() => handleNavClick(ViewSection.DASHBOARD)} />;
      case ViewSection.DASHBOARD:
        return <StorageDashboard />;
      case ViewSection.FILES:
        return <FileManager />;
      case ViewSection.PROFILE:
        return <Profile />;
      case ViewSection.LEGAL:
        return <Legal />;
      default:
        return <Hero onExplore={() => handleNavClick(ViewSection.DASHBOARD)} />;
    }
  };

  if (!isLoggedIn) {
    return <Login onLogin={() => setIsLoggedIn(true)} />;
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-ocean-glow selection:text-black">
      {/* Sticky Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-950/80 backdrop-blur-md border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div
              className="flex items-center gap-2 cursor-pointer group"
              onClick={() => handleNavClick(ViewSection.HOME)}
            >
              <div className="text-ocean-glow transition-all duration-300 group-hover:drop-shadow-[0_0_10px_rgba(6,182,212,0.8)] group-hover:scale-110">
                <FentanylPatchIcon size={28} />
              </div>
              <span className="font-bold text-xl tracking-tighter text-white transition-colors group-hover:text-ocean-glow">
                FENTA<span className="text-ocean-glow group-hover:text-white transition-colors">ROCHEN</span>
                <span className="text-[10px] ml-2 text-slate-500 font-normal border border-slate-700 rounded px-1">CLOUD</span>
              </span>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <button
                  onClick={() => handleNavClick(ViewSection.HOME)}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${currentView === ViewSection.HOME ? 'text-white bg-white/10' : 'text-slate-400 hover:text-white'}`}
                >
                  START
                </button>
                <button
                  onClick={() => handleNavClick(ViewSection.DASHBOARD)}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-2 ${currentView === ViewSection.DASHBOARD ? 'text-white bg-white/10' : 'text-slate-400 hover:text-white'}`}
                >
                  <Activity size={16} /> DATEN
                </button>
                <button
                  onClick={() => handleNavClick(ViewSection.FILES)}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-2 ${currentView === ViewSection.FILES ? 'text-white bg-white/10' : 'text-slate-400 hover:text-white'}`}
                >
                  <HardDrive size={16} /> FILES
                </button>
                <button
                  onClick={() => handleNavClick(ViewSection.PROFILE)}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-2 ${currentView === ViewSection.PROFILE ? 'text-white bg-white/10' : 'text-slate-400 hover:text-white'}`}
                >
                  <User size={16} /> PROFIL
                </button>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center">
               <button
                 onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                 className="text-slate-400 hover:text-white p-2"
               >
                 {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
               </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-slate-900/95 backdrop-blur-xl border-b border-slate-800 animate-in slide-in-from-top-2">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <button
                onClick={() => handleNavClick(ViewSection.HOME)}
                className={`w-full text-left block px-3 py-3 rounded-md text-base font-medium ${currentView === ViewSection.HOME ? 'bg-white/10 text-white' : 'text-slate-300 hover:bg-slate-800 hover:text-white'}`}
              >
                <div className="flex items-center gap-3">
                  <Home size={18} /> START
                </div>
              </button>
              <button
                onClick={() => handleNavClick(ViewSection.DASHBOARD)}
                className={`w-full text-left block px-3 py-3 rounded-md text-base font-medium ${currentView === ViewSection.DASHBOARD ? 'bg-white/10 text-white' : 'text-slate-300 hover:bg-slate-800 hover:text-white'}`}
              >
                 <div className="flex items-center gap-3">
                  <Activity size={18} /> DATEN
                </div>
              </button>
              <button
                onClick={() => handleNavClick(ViewSection.FILES)}
                className={`w-full text-left block px-3 py-3 rounded-md text-base font-medium ${currentView === ViewSection.FILES ? 'bg-white/10 text-white' : 'text-slate-300 hover:bg-slate-800 hover:text-white'}`}
              >
                 <div className="flex items-center gap-3">
                  <HardDrive size={18} /> FILES
                </div>
              </button>
              <button
                onClick={() => handleNavClick(ViewSection.PROFILE)}
                className={`w-full text-left block px-3 py-3 rounded-md text-base font-medium ${currentView === ViewSection.PROFILE ? 'bg-white/10 text-white' : 'text-slate-300 hover:bg-slate-800 hover:text-white'}`}
              >
                 <div className="flex items-center gap-3">
                  <User size={18} /> PROFIL
                </div>
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Main Content Area */}
      <main className="w-full">
        {renderView()}
      </main>

      {/* Footer */}
      {currentView !== ViewSection.HOME && (
        <footer className="bg-black py-8 border-t border-slate-900 text-center text-slate-600 text-sm">
          <p className="mb-2">© 2024 FentaRochen Cloud Systems (v0.7.4). Secure Personal Data Environment.</p>
          <button
            onClick={() => handleNavClick(ViewSection.LEGAL)}
            className="text-slate-700 hover:text-ocean-glow transition-colors underline decoration-dotted"
          >
            Impressum & Datenschutz
          </button>
        </footer>
      )}
    </div>
  );
};

export default App;