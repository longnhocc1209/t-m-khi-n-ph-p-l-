
import React, { useState } from 'react';
import { generateInsolvencySupport } from '../services/geminiService';
import { AlertTriangle, BookOpen, Loader2, FileSignature, HelpCircle, CheckCircle, ShieldCheck } from 'lucide-react';

const InsolvencyGuide: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'learn' | 'action'>('learn');
  const [reason, setReason] = useState('');
  const [status, setStatus] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!reason || !status) return;
    setLoading(true);
    try {
      const text = await generateInsolvencySupport(reason, status);
      setResult(text);
    } catch (error) {
      console.error(error);
      setResult("Có lỗi xảy ra, vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl animate-fade-in-up">
      <div className="mb-8 text-center">
        <div className="inline-flex items-center space-x-2 bg-orange-100 px-3 py-1 rounded-full mb-4">
           <ShieldCheck className="w-4 h-4 text-orange-600" />
           <span className="text-[10px] font-bold text-orange-700 uppercase tracking-widest">Cập nhật Luật 2026</span>
        </div>
        <h1 className="text-3xl font-bold text-slate-900 flex items-center justify-center gap-3">
          Mất Khả Năng Thanh Toán
        </h1>
        <p className="text-slate-600 mt-2">Giải pháp pháp lý văn minh theo quy định mới nhất 2026.</p>
      </div>

      {/* Navigation Tabs */}
      <div className="flex justify-center mb-8">
        <div className="bg-slate-200/50 p-1.5 rounded-2xl inline-flex shadow-inner">
          <button
            onClick={() => setActiveTab('learn')}
            className={`px-8 py-3 rounded-xl text-sm font-bold transition-all ${
              activeTab === 'learn' 
                ? 'bg-white text-orange-600 shadow-lg' 
                : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            <BookOpen className="w-4 h-4 inline mr-2" />
            Kiến thức 2026
          </button>
          <button
            onClick={() => setActiveTab('action')}
            className={`px-8 py-3 rounded-xl text-sm font-bold transition-all ${
              activeTab === 'action' 
                ? 'bg-white text-orange-600 shadow-lg' 
                : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            <FileSignature className="w-4 h-4 inline mr-2" />
            Soạn Văn Bản AI
          </button>
        </div>
      </div>

      {/* Content Area */}
      {activeTab === 'learn' ? (
        <div className="grid md:grid-cols-2 gap-8 animate-fade-in-up">
          <div className="space-y-8">
            <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-500">
              <h3 className="text-xl font-black text-slate-900 mb-4 flex items-center">
                <HelpCircle className="w-6 h-6 text-blue-500 mr-3" />
                Định nghĩa theo Luật 2026
              </h3>
              <p className="text-slate-600 leading-relaxed text-sm font-medium">
                Theo các quy định mới về quản lý nợ cá nhân 2026, mất khả năng thanh toán là tình trạng chủ quan hoặc khách quan khiến bạn không thể trả nợ đúng hạn. Luật 2026 nhấn mạnh vào việc <strong className="text-slate-900">hòa giải và đàm phán</strong> trước khi thực hiện các biện pháp cưỡng chế.
              </p>
            </div>

            <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-500">
              <h3 className="text-xl font-black text-slate-900 mb-6 flex items-center">
                <AlertTriangle className="w-6 h-6 text-red-500 mr-3" />
                Hậu quả & Giới hạn Pháp lý
              </h3>
              <ul className="space-y-4 text-sm text-slate-600 font-medium">
                <li className="flex items-start p-4 bg-slate-50 rounded-2xl border border-slate-100">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 mr-3 shrink-0" />
                  <span><strong className="text-slate-900">Cấm quấy rối:</strong> Luật Tổ chức tín dụng 2024 cấm việc đòi nợ người không có nghĩa vụ trả nợ.</span>
                </li>
                <li className="flex items-start p-4 bg-slate-50 rounded-2xl border border-slate-100">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 mr-3 shrink-0" />
                  <span><strong className="text-slate-900">Lãi suất quá hạn:</strong> Không được vượt quá 150% lãi suất trong hạn và tổng các loại phí không vượt trần quy định 2026.</span>
                </li>
                <li className="flex items-start p-4 bg-slate-50 rounded-2xl border border-slate-100">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 mr-3 shrink-0" />
                  <span><strong className="text-slate-900">Dữ liệu cá nhân:</strong> Mọi hành vi đăng ảnh bôi nhọ lên mạng xã hội bị truy cứu trách nhiệm hình sự theo Luật Bảo vệ dữ liệu cá nhân 2026.</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="space-y-8">
            <div className="bg-slate-900 p-10 rounded-[3rem] text-white relative overflow-hidden shadow-2xl group">
              <div className="absolute -right-10 -top-10 w-40 h-40 bg-amber-500/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-1000"></div>
              <h3 className="text-2xl font-black text-amber-500 mb-8 flex items-center">Quy trình Ứng phó Văn minh</h3>
              <div className="space-y-8 relative">
                <div className="absolute left-4 top-2 bottom-2 w-px bg-slate-700"></div>
                
                {[
                  { t: "Xác lập bằng chứng", d: "Ghi âm cuộc gọi, lưu tin nhắn đe dọa làm căn cứ tố cáo." },
                  { t: "Gửi văn bản chính thức", d: "Dùng công cụ AI để soạn đơn thông báo tình trạng tài chính cho chủ nợ." },
                  { t: "Yêu cầu bảo mật dữ liệu", d: "Gửi thông báo yêu cầu bên đòi nợ ngừng liên lạc với người thân theo Luật 2026." }
                ].map((step, i) => (
                  <div key={i} className="relative pl-12 group/step">
                    <div className="absolute left-0 w-8 h-8 bg-amber-500 rounded-full flex items-center justify-center text-xs font-black text-slate-900 shadow-lg shadow-amber-500/20 group-hover/step:scale-110 transition-transform">{i+1}</div>
                    <h4 className="font-black text-base text-slate-100 mb-1">{step.t}</h4>
                    <p className="text-xs text-slate-400 leading-relaxed font-medium">{step.d}</p>
                  </div>
                ))}
              </div>
              
              <div className="mt-12 p-6 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-sm">
                <p className="text-[10px] uppercase tracking-[0.2em] font-black text-amber-500 mb-2">Lời khuyên</p>
                <p className="text-xs text-slate-300 italic">"Sự im lặng không phải là giải pháp, hãy đối diện bằng văn bản pháp lý."</p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="grid md:grid-cols-5 gap-8 animate-fade-in-up">
          <div className="md:col-span-2 bg-white p-8 rounded-[2rem] border border-slate-200 shadow-sm h-fit">
            <h3 className="font-bold text-lg text-slate-800 mb-4">Thông tin của bạn</h3>
            <div className="space-y-5">
              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Lý do khó khăn</label>
                <textarea
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  placeholder="Mô tả ngắn gọn biến cố tài chính..."
                  rows={4}
                  className="w-full rounded-2xl border-slate-200 border p-4 text-sm focus:ring-2 focus:ring-orange-500 bg-slate-50 transition-all"
                ></textarea>
              </div>

              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Tình trạng tài chính hiện tại</label>
                <textarea
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  placeholder="Thu nhập hiện tại, số người phụ thuộc..."
                  rows={3}
                  className="w-full rounded-2xl border-slate-200 border p-4 text-sm focus:ring-2 focus:ring-orange-500 bg-slate-50 transition-all"
                ></textarea>
              </div>

              <button
                onClick={handleGenerate}
                disabled={loading || !reason || !status}
                className="w-full py-4 bg-orange-600 hover:bg-orange-700 disabled:bg-slate-300 text-white font-black rounded-2xl transition-all shadow-xl shadow-orange-500/20 flex items-center justify-center gap-2 active:scale-95"
              >
                {loading ? <Loader2 className="animate-spin w-5 h-5" /> : "Tạo Văn Bản Chuẩn 2026"}
              </button>
            </div>
          </div>

          <div className="md:col-span-3 bg-slate-900 p-8 rounded-[2rem] border border-slate-800 shadow-2xl min-h-[500px] flex flex-col">
            {result ? (
              <div className="flex flex-col h-full">
                 <div className="flex items-center gap-2 mb-6 p-4 bg-green-500/10 border border-green-500/20 rounded-2xl text-green-400 text-xs font-bold">
                    <CheckCircle className="w-4 h-4 shrink-0" />
                    <span>Văn bản đã được tích hợp các điều luật bảo vệ dữ liệu 2026.</span>
                 </div>
                 <div className="flex-grow overflow-y-auto pr-2 custom-scrollbar">
                   <div className="whitespace-pre-wrap font-serif leading-relaxed text-slate-200 text-sm">
                     {result}
                   </div>
                 </div>
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-slate-600">
                <div className="w-20 h-20 bg-slate-800 rounded-full flex items-center justify-center mb-6">
                  <FileSignature className="w-10 h-10 opacity-20" />
                </div>
                <p className="text-center font-medium max-w-xs">Nhập thông tin bên trái để AI hỗ trợ bạn soạn thảo văn bản pháp lý chính xác nhất theo luật 2026.</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default InsolvencyGuide;
