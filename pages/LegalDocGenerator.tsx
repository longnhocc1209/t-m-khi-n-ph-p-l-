
import React, { useState } from 'react';
import { generateLegalDoc } from '../services/geminiService';
import { FileText, Loader2, Copy, Check, Info, FileSearch, ShieldAlert, Scale } from 'lucide-react';

const LegalDocGenerator: React.FC = () => {
  const [docType, setDocType] = useState('Đơn tố cáo hành vi Cưỡng đoạt tài sản');
  const [details, setDetails] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleGenerate = async () => {
    if (!details.trim()) return;
    setLoading(true);
    setCopied(false);
    try {
      const text = await generateLegalDoc(docType, details);
      setResult(text);
    } catch (error) {
      console.error(error);
      setResult("Có lỗi xảy ra, vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-5 md:space-y-6 animate-fade-in-up">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-xl md:text-2xl font-black text-slate-900 leading-none">Soạn Văn Bản AI</h1>
          <p className="text-[11px] md:text-xs text-slate-500 mt-2 font-medium">Sử dụng sức mạnh luật pháp 2026 để bảo vệ bản thân.</p>
        </div>
        
        {/* Compact Warning Box */}
        <div className="bg-red-50 border border-red-100 rounded-xl md:rounded-2xl p-3 flex items-center gap-3 max-w-md">
          <ShieldAlert className="w-5 h-5 text-red-600 shrink-0" />
          <p className="text-[10px] text-red-800 font-medium leading-tight">
            Mọi hành vi đe dọa, nhục mạ ép trả tiền đều có dấu hiệu tội <strong>Cưỡng đoạt tài sản (Điều 170 BLHS)</strong>.
          </p>
        </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-5 md:gap-6 items-start">
        {/* Input Panel - Mobile Friendly */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-white p-5 rounded-[1.5rem] md:rounded-[2rem] border border-slate-200 shadow-sm">
            <div className="space-y-4">
              <div>
                <label className="block text-[9px] font-black uppercase tracking-widest text-slate-400 mb-2">Loại văn bản</label>
                <div className="grid grid-cols-1 gap-1.5">
                  {[
                    "Đơn tố cáo Cưỡng đoạt tài sản",
                    "Đơn đề nghị giãn nợ & Tái cơ cấu",
                    "Yêu cầu bảo mật dữ liệu cá nhân"
                  ].map(type => (
                    <button
                      key={type}
                      onClick={() => setDocType(type)}
                      className={`text-left px-4 py-3 rounded-xl border text-[11px] md:text-[11px] font-bold transition-all flex items-center justify-between active:scale-[0.98] ${
                        docType === type 
                        ? 'bg-slate-900 border-slate-900 text-white shadow-md' 
                        : 'bg-slate-50 border-slate-200 text-slate-600 hover:border-slate-400'
                      }`}
                    >
                      <span className="line-clamp-1">{type}</span>
                      {docType === type && <Scale className="w-3 h-3 text-amber-500 shrink-0" />}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-[9px] font-black uppercase tracking-widest text-slate-400 mb-2">Thông tin & Bằng chứng</label>
                <textarea 
                  value={details}
                  onChange={(e) => setDetails(e.target.value)}
                  rows={5}
                  placeholder="Ví dụ: Tên App, số điện thoại quấy rối, nội dung tin nhắn đe dọa..."
                  className="w-full rounded-xl md:rounded-2xl border-slate-200 border p-3.5 focus:ring-2 focus:ring-amber-500/20 text-base md:text-xs bg-slate-50 transition-all leading-relaxed placeholder:text-slate-400"
                ></textarea>
                <p className="text-[9px] text-slate-400 mt-1 italic">* Cỡ chữ lớn trên di động để bạn nhập liệu dễ dàng hơn.</p>
              </div>

              <button 
                onClick={handleGenerate}
                disabled={loading || !details}
                className="w-full py-3.5 md:py-4 font-black text-xs uppercase tracking-widest bg-amber-500 hover:bg-amber-600 text-slate-900 rounded-xl md:rounded-2xl transition-all shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2 active:scale-95 disabled:bg-slate-100 disabled:text-slate-300"
              >
                {loading ? <Loader2 className="animate-spin w-4 h-4" /> : "Tạo văn bản ngay"}
              </button>
            </div>
          </div>

          <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 flex items-start space-x-3 text-white">
            <Info className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
            <p className="text-[10px] text-slate-400 leading-relaxed uppercase tracking-wider font-bold">
              AI soạn thảo bản mẫu theo luật 2026. Hãy kiểm tra lại trước khi gửi.
            </p>
          </div>
        </div>

        {/* Preview Panel - Responsive Height */}
        <div className="lg:col-span-8">
          <div className="bg-white rounded-[1.5rem] md:rounded-[2.5rem] p-5 md:p-10 shadow-lg relative min-h-[300px] md:h-[600px] border border-slate-200 flex flex-col">
            <div className="flex justify-between items-center mb-5 md:mb-6 pb-4 border-b border-slate-50 shrink-0">
              <div className="flex items-center space-x-2 text-slate-400">
                <FileSearch className="w-4 h-4" />
                <span className="text-[10px] font-black uppercase tracking-widest">Bản thảo pháp lý</span>
              </div>
              {result && (
                <button 
                  onClick={copyToClipboard}
                  className="flex items-center space-x-2 bg-slate-100 hover:bg-slate-900 hover:text-white px-3 py-2 rounded-lg md:rounded-xl transition-all text-[10px] font-black uppercase tracking-wider active:scale-90"
                >
                  {copied ? <><Check className="w-3 h-3 text-green-500" /> <span>Đã chép</span></> : <><Copy className="w-3 h-3" /> <span>Sao chép</span></>}
                </button>
              )}
            </div>

            <div className="flex-grow overflow-y-auto custom-scrollbar md:pr-2">
              {result ? (
                <div className="prose prose-slate prose-sm max-w-none whitespace-pre-wrap font-serif leading-relaxed text-slate-800 text-sm md:text-base italic bg-slate-50/50 p-4 md:p-6 rounded-xl border border-slate-100">
                  {result}
                </div>
              ) : (
                <div className="h-full py-12 md:py-0 flex flex-col items-center justify-center text-slate-300 space-y-4">
                  <div className="w-14 h-14 bg-slate-50 rounded-full flex items-center justify-center">
                    <FileText className="w-7 h-7 opacity-20" />
                  </div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-center">Nội dung sẽ hiển thị tại đây</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LegalDocGenerator;
