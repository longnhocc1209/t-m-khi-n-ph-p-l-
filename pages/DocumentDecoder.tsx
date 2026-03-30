
import React, { useState } from 'react';
import { decodeDocument } from '../services/geminiService';
import { BookOpen, Loader2, ArrowRight } from 'lucide-react';

const DocumentDecoder: React.FC = () => {
  const [inputText, setInputText] = useState('');
  const [analysis, setAnalysis] = useState('');
  const [loading, setLoading] = useState(false);

  const handleDecode = async () => {
    if (!inputText.trim()) return;
    setLoading(true);
    try {
      const text = await decodeDocument(inputText);
      setAnalysis(text);
    } catch (error) {
      console.error(error);
      setAnalysis("Có lỗi xảy ra khi phân tích.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl animate-fade-in-up">
      <div className="max-w-4xl mx-auto">
        <div className="mb-10 text-center">
          <div className="inline-flex items-center space-x-2 bg-indigo-100 px-3 py-1 rounded-full mb-4">
             <BookOpen className="w-4 h-4 text-indigo-600" />
             <span className="text-[10px] font-bold text-indigo-700 uppercase tracking-widest">Cập nhật Luật 2026</span>
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900">
            Thông Hiểu Văn Bản & Quyền Lợi
          </h1>
          <p className="text-slate-500 mt-3 max-w-lg mx-auto leading-relaxed">
            Bóc tách các thuật ngữ pháp lý phức tạp hoặc tin nhắn đòi nợ thành ngôn ngữ dễ hiểu, chỉ rõ điểm đúng/sai của chủ nợ.
          </p>
        </div>

        <div className="space-y-6">
          <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-200">
            <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-3">
              Nội dung văn bản (Tin nhắn, Thông báo nợ, Hợp đồng...)
            </label>
            <textarea 
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              rows={6}
              className="w-full rounded-2xl border-slate-200 border p-4 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm bg-slate-50 transition-all placeholder:text-slate-400"
              placeholder="Dán nội dung bạn nhận được tại đây để AI phân tích..."
            ></textarea>
            <div className="mt-6 flex justify-end">
              <button 
                onClick={handleDecode}
                disabled={loading || !inputText}
                className="py-4 px-8 bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-300 text-white font-bold rounded-2xl transition-all shadow-xl shadow-indigo-500/20 flex items-center gap-2 active:scale-95"
              >
                {loading ? <Loader2 className="animate-spin w-5 h-5" /> : <>Phân tích quyền lợi <ArrowRight className="w-4 h-4"/></>}
              </button>
            </div>
          </div>

          {analysis && (
            <div className="bg-white p-8 rounded-[2rem] border border-indigo-100 shadow-xl shadow-indigo-900/5 animate-fade-in-up">
              <div className="flex items-center space-x-2 mb-6">
                <div className="w-2 h-6 bg-indigo-500 rounded-full"></div>
                <h3 className="text-lg font-bold text-slate-900">Bản bóc tách pháp lý chuyên sâu</h3>
              </div>
              <div className="prose prose-indigo max-w-none whitespace-pre-line text-slate-700 text-sm leading-relaxed">
                {analysis}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DocumentDecoder;
