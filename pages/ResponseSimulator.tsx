import React, { useState } from 'react';
import { simulateResponse } from '../services/geminiService';
import { ShieldAlert, Loader2, Send, Smartphone, Mail } from 'lucide-react';

const ResponseSimulator: React.FC = () => {
  const [threat, setThreat] = useState('');
  const [responseScript, setResponseScript] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSimulate = async () => {
    if (!threat.trim()) return;
    setLoading(true);
    try {
      const text = await simulateResponse(threat);
      setResponseScript(text);
    } catch (error) {
      console.error(error);
      setResponseScript("Có lỗi xảy ra.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8 text-center">
          <div className="inline-flex items-center space-x-2 bg-red-100 px-3 py-1 rounded-full mb-4">
             <ShieldAlert className="w-4 h-4 text-red-600" />
             <span className="text-[10px] font-bold text-red-700 uppercase tracking-widest">Cập nhật Luật 2026</span>
          </div>
          <h1 className="text-3xl font-bold text-slate-900 flex items-center justify-center gap-3">
            Mô Phỏng & Soạn Thảo Phản Hồi
          </h1>
          <p className="text-slate-600 mt-2">Ngăn chặn hành vi quấy rối. Chuyển từ bị động sang chủ động.</p>
        </div>

        <div className="grid md:grid-cols-5 gap-8">
          {/* Left Col */}
          <div className="md:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-slate-200 h-fit">
             <h3 className="font-semibold text-slate-800 mb-4 flex items-center gap-2">
               <Smartphone className="w-5 h-5 text-slate-500" /> Mối đe dọa bạn nhận được
             </h3>
             <textarea 
              value={threat}
              onChange={(e) => setThreat(e.target.value)}
              rows={10}
              className="w-full rounded-lg border-slate-300 border p-3 focus:ring-2 focus:ring-red-500 focus:border-red-500 text-sm mb-4"
              placeholder="Mô tả cuộc gọi hoặc tin nhắn bạn nhận được. Ví dụ: Họ gọi điện dọa đến công ty làm ầm ĩ, họ nhắn tin bôi nhọ danh dự trên Facebook..."
            ></textarea>
            <button 
              onClick={handleSimulate}
              disabled={loading || !threat}
              className="w-full py-3 px-4 bg-red-600 hover:bg-red-700 disabled:bg-slate-300 text-white font-semibold rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              {loading ? <Loader2 className="animate-spin w-5 h-5" /> : "Tạo kịch bản phản đòn"}
            </button>
          </div>

          {/* Right Col */}
          <div className="md:col-span-3 bg-slate-900 text-slate-100 p-6 rounded-xl shadow-lg border border-slate-800 flex flex-col">
             <h3 className="font-semibold text-slate-300 mb-4 flex items-center gap-2">
               <Mail className="w-5 h-5" /> Kịch bản Phản hồi Chiến lược
             </h3>
             <div className="flex-grow bg-slate-800 rounded-lg p-4 overflow-y-auto max-h-[600px]">
                {responseScript ? (
                  <div className="whitespace-pre-wrap leading-relaxed font-mono text-sm">
                    {responseScript}
                  </div>
                ) : (
                  <div className="h-full flex items-center justify-center text-slate-500 text-sm italic">
                    Nhập mối đe dọa bên trái để AI tạo kịch bản bảo vệ bạn.
                  </div>
                )}
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResponseSimulator;
