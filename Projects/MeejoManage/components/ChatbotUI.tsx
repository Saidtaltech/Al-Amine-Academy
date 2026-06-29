import React, { useState, useRef, useEffect } from 'react';
import { StorageService } from '../services/storage';
import { SparklesIcon, XIcon } from './Icons';
import { formatCurrency } from '../constants';
import { Store } from '../types';

const ChatbotUI: React.FC = () => {
  const [activeStore, setActiveStore] = useState<Store | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{role: 'user' | 'assistant', content: string}[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const load = async () => {
        try {
            const store = await StorageService.getActiveStore();
            setActiveStore(store);
            const welcomeMsg = store 
                ? `Bonjour ! Je suis votre assistant expert. Comment puis-je aider ${store.name} aujourd'hui ?`
                : `Bonjour ! Comment puis-je vous aider aujourd'hui ?`;
            
            setMessages([{ role: 'assistant', content: welcomeMsg }]);
        } catch (error) {
            console.error("Error loading store for chatbot:", error);
        }
    };
    load();
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isOpen]);

  const startVoiceInput = () => {
      const SpeechRec = (window as any).SpeechRecognition || (window as any).webkitRecognition;
      if (!SpeechRec) return alert("Microphone non supporté sur ce navigateur.");

      const recognition = new SpeechRec();
      recognition.lang = 'fr-FR';
      recognition.interimResults = true;
      recognition.start();
      setIsListening(true);

      recognition.onresult = (event: any) => {
          const transcript = event.results[event.results.length - 1][0].transcript;
          setInput(transcript);
          if (event.results[event.results.length - 1].isFinal) {
              setIsListening(false);
              handleSend(transcript);
          }
      };

      recognition.onerror = (err: any) => {
          console.error("Speech Recognition Error:", err);
          setIsListening(false);
      };
      
      recognition.onend = () => setIsListening(false);
  };

  const handleSend = async (val?: string) => {
    const text = val || input;
    if (!text.trim() || isLoading) return;
    setMessages(prev => [...prev, { role: 'user', content: text }]);
    setInput('');
    setIsLoading(true);

    try {
        const config = StorageService.getAIConfig();
        const systemInstruction = `Tu es l'assistant expert de Meejo Manage pour la boutique ${activeStore?.name || 'Meejo'}. Aide l'utilisateur à gérer son commerce, ses stocks et ses imports Alibaba. Sois concis, professionnel et utilise un ton encourageant en français.`;

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
            setMessages(prev => [...prev, { role: 'assistant', content: data.choices[0].message.content }]);
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
            setMessages(prev => [...prev, { role: 'assistant', content: data.choices[0].message.content }]);
        }
        else {
            // Utilisation directe de l'API REST de Gemini pour éviter les erreurs de build Rollup/SDK
            const apiKey = (process.env as any).API_KEY;
            const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                contents: [
                  ...messages.map(m => ({
                    role: m.role === 'user' ? 'user' : 'model',
                    parts: [{ text: m.content }]
                  })),
                  { role: 'user', parts: [{ text: text }] }
                ],
                systemInstruction: {
                  parts: [{ text: systemInstruction }]
                }
              })
            });
            
            const data = await response.json();
            const botResponse = data.candidates?.[0]?.content?.parts?.[0]?.text || "Désolé, je ne peux pas répondre pour le moment.";
            setMessages(prev => [...prev, { role: 'assistant', content: botResponse }]);
        }
    } catch (e) {
        console.error("AI API Error:", e);
        setMessages(prev => [...prev, { role: 'assistant', content: "Une erreur s'est produite lors de la connexion à l'IA expert." }]);
    } finally {
        setIsLoading(false);
    }
  };

  return (
    <>
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full shadow-2xl text-white transition-all hover:scale-110 z-[105] flex items-center justify-center animate-fade-in bg-gradient-to-br from-blue-600 to-indigo-700 border-2 border-white aspect-square overflow-hidden"
        aria-label="Assistant IA"
      >
        <SparklesIcon className="w-6 h-6" />
      </button>

      {isOpen && (
        <div className="fixed bottom-24 right-4 md:right-6 w-[340px] md:w-[380px] h-[550px] bg-white dark:bg-gray-800 rounded-[2.5rem] shadow-2xl border border-gray-100 dark:border-gray-700 flex flex-col z-[105] overflow-hidden animate-slide-in">
            <div className="p-6 text-white flex justify-between items-center bg-gradient-to-r from-blue-600 to-indigo-600">
                <div className="flex items-center gap-3">
                    <div className="bg-white/20 p-2 rounded-xl backdrop-blur-md">
                        <SparklesIcon className="w-5 h-5" />
                    </div>
                    <div>
                        <h3 className="font-black text-sm uppercase tracking-tight">Expert Meejo IA</h3>
                        <p className="text-[10px] opacity-75 font-bold flex items-center gap-1">
                            <span className={`w-1.5 h-1.5 rounded-full animate-pulse ${isListening ? 'bg-red-400' : 'bg-green-400'}`}></span>
                            {isListening ? 'ÉCOUTE EN COURS...' : 'PRÊT À VOUS AIDER'}
                        </p>
                    </div>
                </div>
                <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-white/10 rounded-lg transition"><XIcon className="w-5 h-5" /></button>
            </div>

            <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-slate-50/50 dark:bg-gray-900 custom-scrollbar">
                {messages.map((msg, i) => (
                    <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[85%] p-4 rounded-3xl shadow-sm text-sm ${msg.role === 'user' ? 'bg-blue-600 text-white rounded-tr-none' : 'bg-white dark:bg-gray-700 dark:text-gray-100 border border-slate-100 dark:border-gray-600 rounded-bl-none font-medium'}`}>
                            {msg.content}
                        </div>
                    </div>
                ))}
                {isLoading && (
                    <div className="flex gap-2 p-2">
                        <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce"></div>
                        <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce delay-100"></div>
                        <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce delay-200"></div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            <div className="p-5 bg-white dark:bg-gray-800 border-t dark:border-gray-700 flex flex-col gap-4">
                <div className="flex gap-2 items-center">
                    <button 
                        onClick={startVoiceInput} 
                        className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all shadow-lg ${isListening ? 'bg-red-500 text-white animate-pulse' : 'bg-slate-100 dark:bg-gray-700 text-blue-600 hover:bg-blue-50 active:scale-90'}`}
                        title="Parler à l'IA"
                    >
                        {isListening ? (
                             <div className="flex gap-1">
                                <div className="w-1 h-4 bg-white rounded-full animate-grow"></div>
                                <div className="w-1 h-6 bg-white rounded-full animate-grow delay-75"></div>
                                <div className="w-1 h-4 bg-white rounded-full animate-grow delay-150"></div>
                             </div>
                        ) : (
                            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-20a3 3 0 013 3v5a3 3 0 01-6 0V5a3 3 0 013-3z" />
                            </svg>
                        )}
                    </button>
                    
                    <div className="flex-1 relative">
                        <input 
                            className="w-full p-4 bg-slate-50 dark:bg-gray-700 border-none rounded-2xl text-sm font-bold focus:ring-2 focus:ring-blue-500 pr-12 outline-none dark:text-white" 
                            placeholder={isListening ? "Je vous écoute..." : "Poser une question..."} 
                            value={input} 
                            onChange={e => setInput(e.target.value)} 
                            onKeyDown={e => e.key === 'Enter' && handleSend()} 
                        />
                        <button 
                            onClick={() => handleSend()} 
                            disabled={!input.trim() || isLoading}
                            className="absolute right-2 top-2 p-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition disabled:opacity-30"
                        >
                            <svg className="w-5 h-5 transform rotate-90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
      )}
    </>
  );
};

export default ChatbotUI;