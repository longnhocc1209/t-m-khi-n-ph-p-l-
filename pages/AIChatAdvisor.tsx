import React, { useState, useRef, useEffect } from 'react';
import { chatWithAdvisor } from '../services/geminiService';
import { MessageSquare, Send, Loader2, ExternalLink, Trash2, Shield, Sparkles } from 'lucide-react';
import { ChatMessage } from '../types';
import Markdown from 'react-markdown';

const AIChatAdvisor: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { 
      role: 'model', 
      text: "Chào bạn! Tôi là Cố vấn AI của Bố 3 Con. Tôi đã được cập nhật toàn bộ kiến thức pháp luật mới nhất năm 2026. Bạn đang gặp vấn đề gì về nợ nần hay thủ tục pháp lý?" 
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

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

  const clearChat = () => {
    setMessages([{ 
      role: 'model', 
      text: "Chào bạn! Tôi là Cố vấn AI của Bố 3 Con. Tôi đã được cập nhật toàn bộ kiến thức pháp luật mới nhất năm 2026. Bạn đang gặp vấn đề gì về nợ nần hay thủ tục pháp lý?" 
    }]);
  };

  return (
    <div className="max-w-5xl mx-auto h-[calc(100vh-140px)] flex flex-col">
      <div className="bg-white rounded-[3rem] border border-slate-200 shadow-2xl overflow-hidden flex flex-col h-full animate-fade-in-up relative">
        {/* Chat Header */}
        <div className="p-6 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800 shrink-0">
          <div className="flex items-center space-x-4">
            <div className="bg-amber-500 p-3 rounded-2xl shadow-lg shadow-amber-500/20">
              <MessageSquare className="w-6 h-6 text-slate-900" />
            </div>
            <div>
              <h2 className="font-black text-lg tracking-tight">Cố Vấn Pháp Lý AI</h2>
              <div className="flex items-center text-[10px] text-amber-500 font-black uppercase tracking-widest">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
                Trực tuyến • Luật 2026
              </div>
            </div>
          </div>
          <button 
            onClick={clearChat}
            className="p-3 hover:bg-white/10 rounded-2xl transition-colors text-slate-400 hover:text-white"
            title="Xóa hội thoại"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>

        {/* Messages Area */}
        <div className="flex-grow overflow-y-auto p-8 space-y-8 custom-scrollbar bg-slate-50/50">
          {messages.map((msg, idx) => (
            <div 
              key={idx} 
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in-up`}
            >
              <div className={`max-w-[85%] flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                <div className={`p-5 rounded-[2rem] text-sm font-medium leading-relaxed shadow-sm ${
                  msg.role === 'user' 
                    ? 'bg-slate-900 text-white rounded-tr-none' 
                    : 'bg-white border border-slate-200 text-slate-700 rounded-tl-none'
                }`}>
                  <div className="markdown-body">
                    <Markdown>{msg.text}</Markdown>
                  </div>
                </div>
                
                {msg.sources && msg.sources.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {msg.sources.map((source, sIdx) => (
                      <a 
                        key={sIdx} 
                        href={source.uri} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-[10px] bg-amber-100 text-amber-700 px-3 py-1.5 rounded-full font-black uppercase tracking-wider hover:bg-amber-200 transition-colors flex items-center"
                      >
                        <ExternalLink className="w-3 h-3 mr-1.5" />
                        {source.title || `Nguồn ${sIdx + 1}`}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex justify-start animate-pulse">
              <div className="bg-white border border-slate-200 p-5 rounded-[2rem] rounded-tl-none flex space-x-2">
                <div className="w-2 h-2 bg-slate-300 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-slate-300 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                <div className="w-2 h-2 bg-slate-300 rounded-full animate-bounce [animation-delay:0.4s]"></div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-6 bg-white border-t border-slate-100 shrink-0">
          <form 
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="relative group"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Nhập câu hỏi của bạn về Luật 2026..."
              disabled={loading}
              className="w-full pl-6 pr-16 py-5 bg-slate-50 border-2 border-slate-100 rounded-[2rem] text-sm font-medium focus:outline-none focus:border-amber-500 focus:bg-white transition-all duration-300"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="absolute right-2 top-2 bottom-2 px-6 bg-amber-500 text-slate-900 rounded-[1.5rem] font-black uppercase tracking-widest text-[10px] hover:bg-amber-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all active:scale-95 shadow-lg shadow-amber-500/20 flex items-center justify-center"
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
            </button>
          </form>
          <div className="mt-4 flex items-center justify-center space-x-4">
            <div className="flex items-center text-[9px] text-slate-400 font-bold uppercase tracking-widest">
              <Shield className="w-3 h-3 mr-1.5 text-slate-300" />
              Bảo mật tuyệt đối
            </div>
            <div className="flex items-center text-[9px] text-slate-400 font-bold uppercase tracking-widest">
              <Sparkles className="w-3 h-3 mr-1.5 text-amber-400" />
              AI Cố vấn 2026
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIChatAdvisor;
