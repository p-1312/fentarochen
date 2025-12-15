import React, { useState, useEffect, useRef } from 'react';
import { Send, Terminal, Cpu } from 'lucide-react';
import { createChatSession, sendMessage } from '../services/geminiService';
import { ChatMessage } from '../types';

const ChatInterface: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'init',
      role: 'model',
      text: 'System online. FentaRochen KI-Schnittstelle aktiviert. Ich höre.',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Initialize chat session ref to persist across renders
  const chatSessionRef = useRef(createChatSession());

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsThinking(true);

    try {
      const responseText = await sendMessage(chatSessionRef.current, userMsg.text);
      const botMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: responseText,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMsg]);
    } catch (err) {
      console.error(err);
    } finally {
      setIsThinking(false);
    }
  };

  return (
    <div className="w-full h-screen pt-20 pb-6 px-4 md:px-0 flex flex-col items-center justify-center bg-black/90">
      <div className="w-full max-w-3xl h-[80vh] bg-slate-900 border border-slate-700 rounded-lg overflow-hidden flex flex-col shadow-2xl shadow-cyan-900/20">
        
        {/* Header */}
        <div className="bg-slate-950 p-4 border-b border-slate-800 flex items-center gap-3">
          <div className="p-2 bg-ocean-glow/10 rounded-full text-ocean-glow animate-pulse">
            <Cpu size={20} />
          </div>
          <div>
            <h3 className="text-white font-mono font-bold tracking-wider">COMMS LINK // <span className="text-ocean-glow">ONLINE</span></h3>
            <p className="text-xs text-slate-500">Secure Channel: FentaRochen Core AI</p>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 font-mono text-sm bg-gradient-to-b from-slate-900 to-black/50">
          {messages.map((msg) => (
            <div 
              key={msg.id} 
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div 
                className={`max-w-[80%] p-3 rounded-lg border ${
                  msg.role === 'user' 
                    ? 'bg-slate-800 border-slate-600 text-slate-200 rounded-tr-none' 
                    : 'bg-cyan-950/30 border-cyan-900/50 text-cyan-100 rounded-tl-none'
                }`}
              >
                 {msg.role === 'model' && <Terminal size={14} className="inline-block mr-2 mb-1 text-ocean-glow" />}
                 {msg.text}
                 <div className="text-[10px] opacity-40 mt-2 text-right">
                   {msg.timestamp.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                 </div>
              </div>
            </div>
          ))}
          {isThinking && (
            <div className="flex justify-start">
               <div className="bg-cyan-950/20 border border-cyan-900/30 p-3 rounded-lg rounded-tl-none flex gap-2 items-center text-ocean-glow text-xs">
                 <span className="w-2 h-2 bg-ocean-glow rounded-full animate-bounce"></span>
                 <span className="w-2 h-2 bg-ocean-glow rounded-full animate-bounce delay-100"></span>
                 <span className="w-2 h-2 bg-ocean-glow rounded-full animate-bounce delay-200"></span>
                 <span>Verarbeite Daten...</span>
               </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-4 bg-slate-950 border-t border-slate-800">
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Befehl eingeben..."
              className="flex-1 bg-slate-900 border border-slate-700 text-white px-4 py-3 rounded-md focus:outline-none focus:border-ocean-glow focus:ring-1 focus:ring-ocean-glow font-mono transition-all"
            />
            <button
              onClick={handleSend}
              disabled={isThinking || !input.trim()}
              className="bg-ocean-glow text-slate-950 px-6 py-3 rounded-md font-bold hover:bg-cyan-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;