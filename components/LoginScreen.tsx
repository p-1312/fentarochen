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
      <div className="fixed inset-0 w-full h-full bg-black flex flex-col items-center justify-center overflow-hidden z-[100]">

        {/* Main Login Container - ONLY INPUT */}
        <div className={`relative z-10 w-full flex justify-center transition-all duration-500 ${showRecovery ? 'opacity-0 pointer-events-none blur-sm' : 'opacity-100 blur-0'}`}>

          <form onSubmit={handleSubmit} className="w-64 md:w-96 relative">
              <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="ACCESS CODE"
                  className={`w-full bg-transparent text-white text-center font-mono text-2xl tracking-[0.3em] py-4 border-b border-zinc-800 outline-none transition-all duration-300 placeholder:text-zinc-900 placeholder:text-sm placeholder:tracking-normal
                      ${error
                      ? 'border-red-600 text-red-600'
                      : 'focus:border-white'
                      }
                  `}
                  autoFocus
                  autoComplete="off"
              />
              <button type="submit" className="hidden" />
          </form>
        </div>

        {/* Recovery Modal - Only appears on specific command 'reset' or 'hilfe' */}
        {showRecovery && (
          <div className="absolute inset-0 z-[120] bg-black flex items-center justify-center p-4">
              <div className="w-full max-w-md bg-zinc-950 border border-zinc-800 rounded p-1 font-mono text-sm relative">
                  <div className="bg-zinc-900 px-4 py-2 flex justify-between items-center text-zinc-500">
                      <div className="flex items-center gap-2">
                          <Terminal size={14} />
                          <span>RECOVERY</span>
                      </div>
                      <button onClick={closeRecovery}><X size={16} /></button>
                  </div>
                  <div className="p-6 bg-black text-white font-mono text-xs h-64 overflow-y-auto">
                      <p className="mb-2 text-zinc-500">System failure detected...</p>
                      {recoveryStep >= 1 && (
                          <>
                              <p>&gt; Override... <span className="text-green-500">SUCCESS</span></p>
                              <div className="my-4 w-full bg-zinc-900 h-1"><div className="h-full bg-red-600 w-1/2"></div></div>
                          </>
                      )}
                      {recoveryStep >= 2 && (
                          <div className="mt-4 pt-4 border-t border-red-900/30">
                              <p className="text-red-500 font-bold mb-2 flex items-center gap-2"><ShieldAlert size={14}/> RESET REQUIRED</p>
                              <p className="text-zinc-400 mb-2">New Password:</p>
                              <div className="bg-white/10 p-3 rounded text-center text-xl tracking-widest text-white font-bold border border-white/20 select-all">
                                  admin
                              </div>
                              <button onClick={closeRecovery} className="w-full mt-6 bg-white text-black font-bold py-3 rounded flex items-center justify-center gap-2">
                                  <CheckCircle2 size={16} /> LOGIN
                              </button>
                          </div>
                      )}
                  </div>
              </div>
          </div>
        )}
      </div>
    );
  };

  export default LoginScreen;