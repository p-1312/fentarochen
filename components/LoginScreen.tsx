import React, { useState } from 'react';
import { ShieldAlert, Terminal, X, CheckCircle2 } from 'lucide-react';
import { verifyPassword, updatePassword, checkResetCommand } from '../services/storageService';

interface LoginProps {
  onLogin: () => void;
}

const LoginScreen: React.FC<LoginProps> = ({ onLogin }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  
  // Recovery State
  const [showRecovery, setShowRecovery] = useState(false);
  const [recoveryStep, setRecoveryStep] = useState(0);

  const startRecovery = () => {
    setShowRecovery(true);
    setRecoveryStep(0);
    setTimeout(() => setRecoveryStep(1), 500);
    setTimeout(() => setRecoveryStep(2), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Use the Service to verify password
    if (verifyPassword(password)) {
      onLogin();
    } 
    else if (checkResetCommand(password)) {
      startRecovery();
      setPassword('');
    } else {
      setError(true);
      setPassword('');
      setTimeout(() => setError(false), 1000);
    }
  };

  const closeRecovery = () => {
    if (recoveryStep === 2) {
        // Reset password to default 'admin'
        updatePassword('admin');
        setPassword('admin'); 
    }
    setShowRecovery(false);
    setRecoveryStep(0);
  };

  return (
    <div className="fixed inset-0 w-full h-full bg-black flex flex-col items-center justify-center overflow-hidden">
      
      {/* Container is scaled down significantly (scale-50) to create "distance" effect */}
      <div className={`relative z-50 flex flex-col items-center transition-all duration-500 transform scale-50 md:scale-50 ${showRecovery ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
        <form onSubmit={handleSubmit} className="w-64">
            <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="PASSCODE"
            className={`w-full bg-black text-white text-center font-mono text-xl tracking-[0.5em] py-3 rounded-full border-2 outline-none transition-all duration-300 placeholder:text-slate-800 placeholder:text-xs placeholder:tracking-normal
                ${error 
                ? 'border-red-600 shadow-[0_0_30px_rgba(220,38,38,0.6)] animate-pulse' 
                : 'border-white shadow-[0_0_20px_rgba(255,255,255,0.4)] focus:shadow-[0_0_40px_rgba(255,255,255,0.8)]'
                }
            `}
            autoFocus
            autoComplete="off"
            />
            <button type="submit" className="hidden" />
        </form>
      </div>

      {showRecovery && (
        <div className="absolute inset-0 z-[60] bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
            <div className="w-full max-w-md bg-slate-950 border border-slate-800 rounded-lg shadow-2xl overflow-hidden font-mono text-sm relative animate-in zoom-in-95 duration-300">
                <div className="bg-slate-900 px-4 py-2 border-b border-slate-800 flex justify-between items-center">
                    <div className="flex items-center gap-2 text-slate-400">
                        <Terminal size={14} />
                        <span>SYSTEM_RECOVERY.EXE</span>
                    </div>
                    <button onClick={closeRecovery} className="text-slate-500 hover:text-white">
                        <X size={16} />
                    </button>
                </div>
                <div className="p-6 h-64 overflow-y-auto bg-black text-white font-mono text-xs leading-relaxed">
                    <p className="mb-2 text-slate-500">Initializing biometric bypass protocol...</p>
                    {recoveryStep >= 1 && (
                        <>
                            <p>&gt; Connecting to Mainframe... <span className="text-white">OK</span></p>
                            <p>&gt; Bypassing Firewall Layer 1... <span className="text-white">OK</span></p>
                            <p>&gt; Decrypting User Hash...</p>
                            <div className="my-4 w-full bg-slate-900 h-1 overflow-hidden">
                                <div className="h-full bg-red-600 animate-[scan_2s_ease-in-out_infinite] w-1/2"></div>
                            </div>
                        </>
                    )}
                    {recoveryStep >= 2 && (
                        <div className="mt-4 border-t border-red-600/30 pt-4 animate-in fade-in slide-in-from-bottom-2">
                            <p className="text-red-600 font-bold mb-2">WARNING: SECURITY BREACH DETECTED</p>
                            <p className="text-white mb-2">PASSWORT RESET:</p>
                            <div className="bg-white/10 p-3 rounded text-center text-xl tracking-widest text-white font-bold border border-white/20">
                                admin
                            </div>
                            <button 
                                onClick={closeRecovery}
                                className="w-full mt-6 bg-white hover:bg-slate-200 text-black font-bold py-2 rounded flex items-center justify-center gap-2 transition-colors"
                            >
                                <CheckCircle2 size={16} />
                                LOGIN VERWENDEN
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
      )}
      <style>{`
        @keyframes scan {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(200%); }
        }
      `}</style>
    </div>
  );
};

export default LoginScreen;