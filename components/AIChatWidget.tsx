
import React, { useState, useRef, useEffect } from 'react';
import { chatWithAdvisor } from '../services/geminiService';
import { MessageCircle, Send, Loader2, ExternalLink, Bot, User, X, Copy, Check } from 'lucide-react';
import { ChatMessage } from '../types';

const AIChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: "Xin chào! Tôi là trợ lý AI của Bố 3 Con. Tôi có thể giúp gì cho bạn về luật pháp hoặc tài chính hôm nay?" }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg: ChatMessage = { role: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const history = messages.map(m => ({
        role: m.role,
        parts: [{ text: m.text }]
      }));

      const { text, sources } = await chatWithAdvisor(userMsg.text, history);
      
      const botMsg: ChatMessage = { role: 'model', text, sources };
      setMessages(prev => [...prev, botMsg]);
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { role: 'model', text: "Xin lỗi, hệ thống đang bận. Vui lòng thử lại sau." }]);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end pointer-events-none">
      {/* Chat Window */}
      {isOpen && (
        <div className="pointer-events-auto bg-white w-[90vw] md:w-[400px] h-[70vh] md:h-[600px] rounded-2xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden mb-4 animate-fade-in-up origin-bottom-right">
          {/* Header */}
          <div className="bg-slate-900 text-white p-4 flex justify-between items-center shrink-0">
            <div className="flex items-center space-x-2">
              <div className="bg-violet-600 p-1.5 rounded-lg">
                <Bot className="w-4 h-4 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-sm">Cố Vấn AI</h3>
                <span className="text-[10px] text-slate-300 flex items-center">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-1 animate-pulse"></span>
                  Online
                </span>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-grow overflow-y-auto p-4 space-y-4 bg-slate-50">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`flex max-w-[85%] gap-2 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-1 ${msg.role === 'user' ? 'bg-slate-700' : 'bg-violet-600'}`}>
                    {msg.role === 'user' ? <User className="w-3 h-3 text-white" /> : <Bot className="w-3 h-3 text-white" />}
                  </div>
                  
                  <div className={`p-3 rounded-2xl text-sm relative group/msg ${msg.role === 'user' ? 'bg-slate-800 text-white rounded-tr-none' : 'bg-white border border-slate-200 text-slate-800 rounded-tl-none shadow-sm'}`}>
                    <p className="whitespace-pre-wrap leading-relaxed pr-6">{msg.text}</p>
                    
                    {/* Copy Button for Model messages */}
                    {msg.role === 'model' && (
                      <button 
                        onClick={() => handleCopy(msg.text, idx)}
                        className="absolute bottom-2 right-2 p-1 text-slate-400 hover:text-violet-600 transition-colors bg-white/50 rounded group-hover/msg:opacity-100 opacity-0 md:opacity-0 transition-opacity"
                        title="Sao chép câu trả lời"
                      >
                        {copiedIndex === idx ? <Check className="w-3 h-3 text-green-500" /> : <Copy className="w-3 h-3" />}
                      </button>
                    )}

                    {msg.sources && msg.sources.length > 0 && (
                      <div className="mt-2 pt-2 border-t border-slate-100/20">
                        <p className="text-[10px] font-semibold opacity-70 mb-1">Nguồn tham khảo:</p>
                        <div className="flex flex-wrap gap-1">
                          {msg.sources.map((src, i) => (
                            <a 
                              key={i} 
                              href={src.uri} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-[10px] flex items-center bg-black/5 hover:bg-black/10 px-1.5 py-0.5 rounded transition-colors truncate max-w-[150px]"
                            >
                              <ExternalLink className="w-2 h-2 mr-1" />
                              <span className="truncate">{src.title}</span>
                            </a>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
            {loading && (
               <div className="flex justify-start">
                 <div className="flex gap-2 bg-white border border-slate-200 p-3 rounded-2xl rounded-tl-none shadow-sm">
                   <div className="w-2 h-2 bg-violet-400 rounded-full animate-bounce"></div>
                   <div className="w-2 h-2 bg-violet-400 rounded-full animate-bounce delay-75"></div>
                   <div className="w-2 h-2 bg-violet-400 rounded-full animate-bounce delay-150"></div>
                 </div>
               </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-3 bg-white border-t border-slate-100">
            <div className="relative flex items-center gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Nhập câu hỏi..."
                className="flex-grow rounded-xl border-slate-200 border bg-slate-50 p-3 text-sm focus:ring-2 focus:ring-violet-500 focus:border-violet-500 focus:bg-white transition-all outline-none"
                disabled={loading}
              />
              <button 
                onClick={handleSend}
                disabled={loading || !input.trim()}
                className="p-3 bg-violet-600 hover:bg-violet-700 disabled:bg-slate-300 text-white rounded-xl transition-colors shadow-md shadow-violet-200"
              >
                {loading ? <Loader2 className="animate-spin w-4 h-4" /> : <Send className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="pointer-events-auto w-14 h-14 bg-gradient-to-tr from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white rounded-full shadow-lg shadow-violet-500/30 flex items-center justify-center transition-all hover:scale-110 active:scale-95 group relative"
      >
        {isOpen ? (
          <X className="w-6 h-6 transition-transform rotate-90 group-hover:rotate-180" />
        ) : (
          <>
            <MessageCircle className="w-7 h-7" />
            <span className="absolute top-0 right-0 w-3.5 h-3.5 bg-red-500 border-2 border-white rounded-full"></span>
          </>
        )}
      </button>
    </div>
  );
};

export default AIChatWidget;
