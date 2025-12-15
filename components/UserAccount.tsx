import React, { useState } from 'react';
import { User, Mail, Server, Shield, LogOut, Camera, Save, Key, Check, Cloud, AlertTriangle, RefreshCw, CheckCircle2 } from 'lucide-react';
import { UserProfile } from '../types';

const UserAccount: React.FC = () => {
  const [profile, setProfile] = useState<UserProfile>({
    username: 'Commander Fenta',
    email: 'cmdr@fentarochen.net',
    avatarUrl: 'https://ui-avatars.com/api/?name=Commander+Fenta&background=06b6d4&color=000',
    serverUrl: 'https://cloud.fentarochen.net'
  });

  const [isEditing, setIsEditing] = useState(false);
  
  // Server Connection State
  const [connectionStatus, setConnectionStatus] = useState<'idle' | 'checking' | 'connected' | 'error'>('connected');
  const [serverMessage, setServerMessage] = useState<string | null>(null);

  // Password State
  const [showPasswordChange, setShowPasswordChange] = useState(false);
  const [newPassword, setNewPassword] = useState({ current: '', new: '', confirm: '' });
  const [passwordMessage, setPasswordMessage] = useState<string | null>(null);

  const handleSave = () => {
    setIsEditing(false);
    // Logic to save profile would go here
  };

  const handleConnectServer = (e: React.FormEvent) => {
    e.preventDefault();
    setConnectionStatus('checking');
    setServerMessage(null);

    // Simulate network request
    setTimeout(() => {
        if (profile.serverUrl.includes('fentarochen.net')) {
            setConnectionStatus('connected');
            setServerMessage('Gesicherte Verbindung zu cloud.fentarochen.net erfolgreich hergestellt.');
        } else {
            setConnectionStatus('error');
            setServerMessage(`Die Verbindung zu Nextcloud auf ${profile.serverUrl} konnte nicht hergestellt werden. Bitte überprüfen Sie die Serveradresse oder wenden Sie sich an die Administration.`);
        }
    }, 1500);
  };

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword.new !== newPassword.confirm) {
        setPasswordMessage('Passwörter stimmen nicht überein.');
        return;
    }
    if (newPassword.new.length < 4) {
        setPasswordMessage('Passwort zu kurz.');
        return;
    }
    // Simulate API call
    setPasswordMessage('Passwort erfolgreich aktualisiert.');
    setTimeout(() => {
        setShowPasswordChange(false);
        setPasswordMessage(null);
        setNewPassword({ current: '', new: '', confirm: '' });
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-slate-950 pt-24 px-4 flex justify-center pb-12">
      <div className="w-full max-w-4xl">
         <h2 className="text-4xl font-bold text-white mb-2 border-l-4 border-ocean-glow pl-4 mb-8">Benutzerprofil</h2>

         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* User Card */}
            <div className="md:col-span-1 h-fit">
                <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 flex flex-col items-center text-center relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-ocean-glow/20 to-transparent"></div>
                    
                    <div className="relative z-10 w-32 h-32 rounded-full border-4 border-slate-950 shadow-xl mb-4 group cursor-pointer overflow-hidden">
                        <img src={profile.avatarUrl} alt="Profile" className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <Camera className="text-white" />
                        </div>
                    </div>
                    
                    <h3 className="text-xl font-bold text-white">{profile.username}</h3>
                    <p className="text-ocean-glow font-mono text-sm mb-6">Administrator</p>
                    
                    <div className="w-full space-y-2">
                        <button className="w-full py-2 bg-slate-800 hover:bg-slate-700 rounded border border-slate-700 text-sm text-slate-300 transition-colors flex items-center justify-center gap-2">
                            <LogOut size={16} /> Abmelden
                        </button>
                    </div>
                </div>
            </div>

            {/* Settings Form */}
            <div className="md:col-span-2 space-y-8">
                
                {/* Server Connection Module (New Request) */}
                <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-8">
                    <div className="flex justify-between items-center mb-6">
                        <h4 className="text-lg font-bold text-white flex items-center gap-2">
                            <Cloud size={20} className="text-ocean-glow" /> Cloud Server Verbindung
                        </h4>
                        <div className={`px-2 py-1 rounded text-xs font-mono uppercase border ${
                            connectionStatus === 'connected' ? 'bg-emerald-950/30 border-emerald-900 text-emerald-400' : 
                            connectionStatus === 'error' ? 'bg-red-950/30 border-red-900 text-red-400' : 'bg-slate-800 border-slate-700 text-slate-400'
                        }`}>
                            {connectionStatus === 'checking' ? 'Verbinde...' : connectionStatus === 'connected' ? 'Online' : 'Offline'}
                        </div>
                    </div>

                    <form onSubmit={handleConnectServer} className="space-y-4">
                        <div>
                            <label className="block text-xs font-mono text-slate-500 mb-2 uppercase tracking-wider">Serveradresse</label>
                            <div className="flex flex-col md:flex-row gap-2">
                                <div className="flex-1 flex items-center gap-3 bg-slate-950 border border-slate-800 rounded-lg p-3 focus-within:border-ocean-glow focus-within:ring-1 focus-within:ring-ocean-glow transition-all">
                                    <Server size={18} className="text-slate-500" />
                                    <input 
                                        type="url" 
                                        value={profile.serverUrl}
                                        onChange={(e) => {
                                            setProfile({...profile, serverUrl: e.target.value});
                                            setConnectionStatus('idle');
                                        }}
                                        placeholder="https://cloud.beispiel.de"
                                        className="bg-transparent border-none outline-none text-white w-full placeholder-slate-700"
                                    />
                                </div>
                                <button 
                                    type="submit"
                                    disabled={connectionStatus === 'checking'}
                                    className="px-6 py-3 bg-white text-black font-bold rounded-lg hover:bg-ocean-glow transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 min-w-[120px]"
                                >
                                    {connectionStatus === 'checking' ? <RefreshCw className="animate-spin" size={18} /> : 'Verbinden'}
                                </button>
                            </div>
                        </div>

                        {/* Status / Error Message Area */}
                        {connectionStatus === 'error' && (
                            <div className="bg-red-950/20 border border-red-900/50 rounded-lg p-4 flex items-start gap-3 animate-in slide-in-from-top-2">
                                <AlertTriangle className="text-red-500 flex-shrink-0 mt-0.5" size={20} />
                                <div className="text-sm text-red-200">
                                    <p className="font-bold mb-1">Verbindungsfehler</p>
                                    <p className="opacity-80 leading-relaxed">{serverMessage}</p>
                                </div>
                            </div>
                        )}

                        {connectionStatus === 'connected' && serverMessage && (
                             <div className="bg-emerald-950/20 border border-emerald-900/50 rounded-lg p-4 flex items-start gap-3 animate-in slide-in-from-top-2">
                                <CheckCircle2 className="text-emerald-500 flex-shrink-0 mt-0.5" size={20} />
                                <div className="text-sm text-emerald-200">
                                    <p className="opacity-80 leading-relaxed">{serverMessage}</p>
                                </div>
                             </div>
                        )}
                    </form>
                </div>

                {/* General Info */}
                <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-8">
                    <div className="flex justify-between items-center mb-6">
                        <h4 className="text-lg font-bold text-white flex items-center gap-2">
                            <Shield size={20} className="text-slate-400" /> Account Details
                        </h4>
                        <button 
                            onClick={() => isEditing ? handleSave() : setIsEditing(true)}
                            className={`px-4 py-2 rounded text-sm font-bold flex items-center gap-2 transition-all ${isEditing ? 'bg-bio-green text-slate-900' : 'bg-slate-800 text-slate-300'}`}
                        >
                            {isEditing ? <><Save size={16} /> Speichern</> : 'Bearbeiten'}
                        </button>
                    </div>

                    <div className="space-y-6">
                        <div>
                            <label className="block text-xs font-mono text-slate-500 mb-2 uppercase tracking-wider">Benutzername</label>
                            <div className="flex items-center gap-3 bg-slate-950 border border-slate-800 rounded-lg p-3">
                                <User size={18} className="text-slate-500" />
                                <input 
                                    type="text" 
                                    disabled={!isEditing}
                                    value={profile.username}
                                    onChange={(e) => setProfile({...profile, username: e.target.value})}
                                    className="bg-transparent border-none outline-none text-white w-full disabled:text-slate-400"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-mono text-slate-500 mb-2 uppercase tracking-wider">E-Mail Adresse</label>
                            <div className="flex items-center gap-3 bg-slate-950 border border-slate-800 rounded-lg p-3">
                                <Mail size={18} className="text-slate-500" />
                                <input 
                                    type="email" 
                                    disabled={!isEditing}
                                    value={profile.email}
                                    onChange={(e) => setProfile({...profile, email: e.target.value})}
                                    className="bg-transparent border-none outline-none text-white w-full disabled:text-slate-400"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Password Change Section */}
                <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-8">
                     <div className="flex justify-between items-start mb-4">
                        <h5 className="text-lg font-bold text-white flex items-center gap-2">
                            <Key size={20} className="text-slate-400" /> Sicherheit
                        </h5>
                        {!showPasswordChange && (
                            <button 
                                onClick={() => setShowPasswordChange(true)}
                                className="text-sm text-ocean-glow hover:text-white underline decoration-dotted underline-offset-4"
                            >
                                Passwort ändern
                            </button>
                        )}
                     </div>

                     {showPasswordChange && (
                        <form onSubmit={handleChangePassword} className="space-y-4 animate-in slide-in-from-top-4 fade-in">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="md:col-span-2">
                                    <label className="block text-xs font-mono text-slate-500 mb-2 uppercase">Aktuelles Passwort</label>
                                    <input 
                                        type="password"
                                        required
                                        value={newPassword.current}
                                        onChange={(e) => setNewPassword({...newPassword, current: e.target.value})}
                                        className="w-full bg-slate-950 border border-slate-700 rounded p-3 text-white focus:border-ocean-glow focus:outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-mono text-slate-500 mb-2 uppercase">Neues Passwort</label>
                                    <input 
                                        type="password"
                                        required
                                        value={newPassword.new}
                                        onChange={(e) => setNewPassword({...newPassword, new: e.target.value})}
                                        className="w-full bg-slate-950 border border-slate-700 rounded p-3 text-white focus:border-ocean-glow focus:outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-mono text-slate-500 mb-2 uppercase">Bestätigen</label>
                                    <input 
                                        type="password"
                                        required
                                        value={newPassword.confirm}
                                        onChange={(e) => setNewPassword({...newPassword, confirm: e.target.value})}
                                        className="w-full bg-slate-950 border border-slate-700 rounded p-3 text-white focus:border-ocean-glow focus:outline-none"
                                    />
                                </div>
                            </div>
                            
                            {passwordMessage && (
                                <div className={`text-sm flex items-center gap-2 ${passwordMessage.includes('erfolgreich') ? 'text-bio-green' : 'text-red-400'}`}>
                                    {passwordMessage.includes('erfolgreich') && <Check size={16} />}
                                    {passwordMessage}
                                </div>
                            )}

                            <div className="flex gap-3 pt-2">
                                <button 
                                    type="submit"
                                    className="px-4 py-2 bg-ocean-glow text-black font-bold rounded hover:bg-cyan-300 transition-colors"
                                >
                                    Passwort aktualisieren
                                </button>
                                <button 
                                    type="button"
                                    onClick={() => { setShowPasswordChange(false); setPasswordMessage(null); }}
                                    className="px-4 py-2 bg-slate-800 text-slate-300 font-bold rounded hover:bg-slate-700 transition-colors"
                                >
                                    Abbrechen
                                </button>
                            </div>
                        </form>
                     )}
                </div>
            </div>
         </div>
      </div>
    </div>
  );
};

export default UserAccount;