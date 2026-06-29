
import React, { useState, useRef, useEffect } from 'react';
import { StorageService } from '../services/storage';
import { AppSettings, Store } from '../types';
import { SparklesIcon, XIcon } from './Icons';
import { GoogleGenAI } from "@google/genai";

const AIAssistant: React.FC<{ settings: AppSettings }> = ({ settings }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{role: 'user' | 'assistant', content: string}[]>([
    { role: 'assistant', content: "Bonjour ! Je suis l'assistant intelligent NOVIX. Comment puis-je vous aider ?" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [activeStore, setActiveStore] = useState<Store | null>(null);

  useEffect(() => {
    StorageService.getActiveStore().then(setActiveStore);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isOpen]);

  const handleSend = async () => {
    const text = input.trim();
    if (!text || isLoading) return;
    
    setMessages(prev => [...prev, { role: 'user', content: text }]);
    setInput('');
    setIsLoading(true);

    try {
        const config = StorageService.getAIConfig();
        const systemInstruction = `Tu es l'assistant expert de Meejo Manage. Aide l'utilisateur avec la gestion de sa boutique: ${activeStore?.name || "Meejo"}. Sois concis et professionnel.`;

        if (config.provider === 'PERPLEXITY' && config.perplexityKey) {
            const response = await fetch('https://api.perplexity.ai/chat/completions', {
                method: 'POST',
                headers: { 'Authorization': `Bearer ${config.perplexityKey}`, 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    model: 'sonar-small-chat',
                    messages: [{ role: 'system', content: systemInstruction }, ...messages.map(m => ({ role: m.role, content: m.content })), { role: 'user', content: text }]
                })
            });
            const data = await response.json();
            const botResponse = data.choices[0].message.content;
            setMessages(prev => [...prev, { role: 'assistant', content: botResponse }]);
        } 
        else if (config.provider === 'OPENAI' && config.openaiKey) {
             const response = await fetch('https://api.openai.com/v1/chat/completions', {
                method: 'POST',
                headers: { 'Authorization': `Bearer ${config.openaiKey}`, 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    model: 'gpt-4o',
                    messages: [{ role: 'system', content: systemInstruction }, ...messages.map(m => ({ role: m.role, content: m.content })), { role: 'user', content: text }]
                })
            });
            const data = await response.json();
            const botResponse = data.choices[0].message.content;
            setMessages(prev => [...prev, { role: 'assistant', content: botResponse }]);
        }
        else {
            // Fix: Initializing GoogleGenAI and using ai.models.generateContent according to guidelines
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
            const response = await ai.models.generateContent({
              model: 'gemini-3-flash-preview',
              contents: [
                ...messages.map(m => ({
                  role: m.role === 'user' ? 'user' : 'model',
                  parts: [{ text: m.content }]
                })),
                { role: 'user', parts: [{ text: text }] }
              ],
              config: {
                systemInstruction: systemInstruction,
              }
            });
            
            const botResponse = response.text || "Désolé, je ne peux pas traiter votre demande pour le moment.";
            setMessages(prev => [...prev, { role: 'assistant', content: botResponse }]);
        }
    } catch (error) {
        console.error("AI Assistant Error:", error);
        setMessages(prev => [...prev, { role: 'assistant', content: "Erreur de connexion avec l'IA. Vérifiez votre clé API ou connexion." }]);
    } finally {
        setIsLoading(false);
    }
  };

  if (!activeStore) return null;

  return (
    <>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full shadow-2xl text-white transition-transform hover:scale-110 z-[110] flex items-center justify-center border-2 border-white aspect-square overflow-hidden"
        style={{ backgroundColor: activeStore.primaryColor }}
      >
        <SparklesIcon className="w-6 h-6" />
      </button>

      {isOpen && (
        <div className="fixed bottom-24 right-6 w-[350px] md:w-[400px] h-[550px] bg-white rounded-3xl shadow-2xl border border-gray-200 flex flex-col z-[110] overflow-hidden animate-slide-in">
            <div className="p-4 text-white flex justify-between items-center" style={{ backgroundColor: activeStore.primaryColor }}>
                <div className="flex items-center gap-3">
                    <div className="bg-white/20 p-2 rounded-xl">
                        <SparklesIcon className="w-5 h-5" />
                    </div>
                    <span className="font-black text-sm uppercase tracking-tight">Assistant Expert</span>
                </div>
                <button onClick={() => setIsOpen(false)} className="hover:bg-white/20 rounded-full p-2 transition">
                   <XIcon className="w-5 h-5" />
                </button>
            </div>

            <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-gray-50 custom-scrollbar">
                {messages.map((msg, idx) => (
                    <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[85%] p-4 rounded-2xl text-sm shadow-sm ${msg.role === 'user' ? 'bg-blue-600 text-white rounded-tr-none' : 'bg-white text-gray-800 border border-gray-100 rounded-tl-none font-medium'}`}>
                            {msg.content}
                        </div>
                    </div>
                ))}
                {isLoading && (
                    <div className="flex gap-2 p-2">
                        <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce"></div>
                        <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce delay-75"></div>
                        <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce delay-150"></div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            <div className="p-4 bg-white border-t border-gray-100">
                <div className="flex gap-2">
                    <input 
                        type="text" 
                        className="flex-1 p-4 bg-gray-50 border border-gray-100 rounded-2xl text-sm font-bold focus:outline-none focus:ring-2 focus:ring-blue-500 outline-none"
                        placeholder="Posez une question sur vos stocks..."
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                    />
                    <button 
                        onClick={handleSend} 
                        disabled={!input.trim() || isLoading} 
                        className="p-4 bg-blue-600 text-white rounded-2xl hover:bg-blue-700 disabled:opacity-50 transition shadow-lg shadow-blue-100"
                    >
                        <svg className="w-5 h-5 transform rotate-90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
      )}
    </>
  );
};

export default AIAssistant;
