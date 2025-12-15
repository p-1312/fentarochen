import React, { useState } from 'react';

interface LoginProps {
  onLogin: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Hardcoded password for demo purposes: "admin" or "1234"
    if (password === 'admin' || password === '1234') {
      onLogin();
    } else {
      setError(true);
      setPassword('');
      setTimeout(() => setError(false), 1000);
    }
  };

  return (
    <div className="fixed inset-0 w-full h-full bg-black flex items-center justify-center overflow-hidden">
      <form onSubmit={handleSubmit} className="w-64 relative z-50">
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={`w-full bg-black text-white text-center font-mono text-xl tracking-[0.5em] py-3 rounded-full border-2 outline-none transition-all duration-300
            ${error 
              ? 'border-red-600 shadow-[0_0_30px_rgba(220,38,38,0.6)] animate-pulse' 
              : 'border-white shadow-[0_0_20px_rgba(255,255,255,0.4)] focus:shadow-[0_0_40px_rgba(255,255,255,0.8)]'
            }
          `}
          autoFocus
          autoComplete="off"
        />
        {/* Hidden submit button allows "Enter" key to submit the form */}
        <button type="submit" className="hidden" />
      </form>
    </div>
  );
};

export default Login;