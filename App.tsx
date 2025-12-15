import React, { useState } from 'react';
import HeroSection from './components/HeroSection';
import Dashboard from './components/Dashboard';
import FileBrowser from './components/FileBrowser';
import Gallery from './components/Gallery';
import UserAccount from './components/UserAccount';
import LegalInfo from './components/LegalInfo';
import LoginScreen from './components/LoginScreen';
import { ViewSection } from './types';
import { Activity, HardDrive, User, Menu, X, Home, Eye } from 'lucide-react';

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
        return <HeroSection onExplore={() => handleNavClick(ViewSection.DASHBOARD)} />;
      case ViewSection.DASHBOARD:
        return <Dashboard />;
      case ViewSection.FILES:
        return <FileBrowser />;
      case ViewSection.VISION:
        return <Gallery />;
      case ViewSection.PROFILE:
        return <UserAccount />;
      case ViewSection.LEGAL:
        return <LegalInfo />;
      default:
        return <HeroSection onExplore={() => handleNavClick(ViewSection.DASHBOARD)} />;
    }
  };

  if (!isLoggedIn) {
    return <LoginScreen onLogin={() => setIsLoggedIn(true)} />;
  }

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-ocean-glow selection:text-white">
      {/* Sticky Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/95 backdrop-blur-md border-b border-white/10 h-20 flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="flex items-center justify-between">
            <div 
              className="flex items-center gap-2 cursor-pointer group" 
              onClick={() => handleNavClick(ViewSection.HOME)}
            >
              <div className="text-ocean-glow transition-all duration-300 group-hover:drop-shadow-[0_0_10px_rgba(139,0,0,0.8)] group-hover:scale-110">
                <FentanylPatchIcon size={32} />
              </div>
              <span className="font-bold text-2xl tracking-tighter text-white transition-colors group-hover:text-ocean-glow">
                FENTA<span className="text-ocean-glow group-hover:text-white transition-colors">ROCHEN</span>
                <span className="text-[10px] ml-2 text-zinc-500 font-normal border border-zinc-800 rounded px-1 align-top relative top-[-5px]">CLOUD</span>
              </span>
            </div>
            
            {/* Desktop Menu */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <button
                  onClick={() => handleNavClick(ViewSection.HOME)}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${currentView === ViewSection.HOME ? 'text-ocean-glow bg-white/5 border border-ocean-glow/20' : 'text-zinc-400 hover:text-white hover:bg-white/5'}`}
                >
                  START
                </button>
                <button
                  onClick={() => handleNavClick(ViewSection.DASHBOARD)}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-2 ${currentView === ViewSection.DASHBOARD ? 'text-ocean-glow bg-white/5 border border-ocean-glow/20' : 'text-zinc-400 hover:text-white hover:bg-white/5'}`}
                >
                  <Activity size={16} /> DATEN
                </button>
                <button
                  onClick={() => handleNavClick(ViewSection.VISION)}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-2 ${currentView === ViewSection.VISION ? 'text-ocean-glow bg-white/5 border border-ocean-glow/20' : 'text-zinc-400 hover:text-white hover:bg-white/5'}`}
                >
                  <Eye size={16} /> VISION
                </button>
                <button
                  onClick={() => handleNavClick(ViewSection.FILES)}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-2 ${currentView === ViewSection.FILES ? 'text-ocean-glow bg-white/5 border border-ocean-glow/20' : 'text-zinc-400 hover:text-white hover:bg-white/5'}`}
                >
                  <HardDrive size={16} /> FILES
                </button>
                <button
                  onClick={() => handleNavClick(ViewSection.PROFILE)}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-2 ${currentView === ViewSection.PROFILE ? 'text-ocean-glow bg-white/5 border border-ocean-glow/20' : 'text-zinc-400 hover:text-white hover:bg-white/5'}`}
                >
                  <User size={16} /> PROFIL
                </button>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center">
               <button 
                 onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                 className="text-zinc-400 hover:text-white p-2"
               >
                 {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
               </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMobileMenuOpen && (
          <div className="absolute top-20 left-0 right-0 bg-black/95 backdrop-blur-xl border-b border-white/10 animate-in slide-in-from-top-2 shadow-2xl">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <button
                onClick={() => handleNavClick(ViewSection.HOME)}
                className={`w-full text-left block px-3 py-3 rounded-md text-base font-medium ${currentView === ViewSection.HOME ? 'bg-white/10 text-ocean-glow' : 'text-zinc-300 hover:bg-zinc-900 hover:text-white'}`}
              >
                <div className="flex items-center gap-3">
                  <Home size={18} /> START
                </div>
              </button>
              <button
                onClick={() => handleNavClick(ViewSection.DASHBOARD)}
                className={`w-full text-left block px-3 py-3 rounded-md text-base font-medium ${currentView === ViewSection.DASHBOARD ? 'bg-white/10 text-ocean-glow' : 'text-zinc-300 hover:bg-zinc-900 hover:text-white'}`}
              >
                 <div className="flex items-center gap-3">
                  <Activity size={18} /> DATEN
                </div>
              </button>
              <button
                onClick={() => handleNavClick(ViewSection.VISION)}
                className={`w-full text-left block px-3 py-3 rounded-md text-base font-medium ${currentView === ViewSection.VISION ? 'bg-white/10 text-ocean-glow' : 'text-zinc-300 hover:bg-zinc-900 hover:text-white'}`}
              >
                 <div className="flex items-center gap-3">
                  <Eye size={18} /> VISION
                </div>
              </button>
              <button
                onClick={() => handleNavClick(ViewSection.FILES)}
                className={`w-full text-left block px-3 py-3 rounded-md text-base font-medium ${currentView === ViewSection.FILES ? 'bg-white/10 text-ocean-glow' : 'text-zinc-300 hover:bg-zinc-900 hover:text-white'}`}
              >
                 <div className="flex items-center gap-3">
                  <HardDrive size={18} /> FILES
                </div>
              </button>
              <button
                onClick={() => handleNavClick(ViewSection.PROFILE)}
                className={`w-full text-left block px-3 py-3 rounded-md text-base font-medium ${currentView === ViewSection.PROFILE ? 'bg-white/10 text-ocean-glow' : 'text-zinc-300 hover:bg-zinc-900 hover:text-white'}`}
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
        <footer className="bg-black py-8 border-t border-zinc-900 text-center text-zinc-600 text-sm">
          <p className="mb-2">© 2024 FentaRochen Cloud Systems (v0.7.8). Secure Personal Data Environment.</p>
          <button 
            onClick={() => handleNavClick(ViewSection.LEGAL)}
            className="text-zinc-500 hover:text-ocean-glow transition-colors underline decoration-dotted"
          >
            Impressum & Datenschutz
          </button>
        </footer>
      )}
    </div>
  );
};

export default App;