import React, { useState } from 'react';
import { generateRoadmap } from '../services/geminiService';
import { RoadmapResponse } from '../types';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TrendingUp, Loader2, DollarSign } from 'lucide-react';

const FinancialRoadmap: React.FC = () => {
  const [income, setIncome] = useState<number | ''>('');
  const [debt, setDebt] = useState<number | ''>('');
  const [expenses, setExpenses] = useState<number | ''>('');
  const [roadmap, setRoadmap] = useState<RoadmapResponse | null>(null);
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async () => {
    if (!income || !debt || !expenses) return;
    setLoading(true);
    try {
      const data = await generateRoadmap(Number(income), Number(debt), Number(expenses));
      setRoadmap(data);
    } catch (error) {
      console.error(error);
      alert("Không thể tạo lộ trình. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8 text-center">
          <div className="inline-flex items-center space-x-2 bg-emerald-100 px-3 py-1 rounded-full mb-4">
             <TrendingUp className="w-4 h-4 text-emerald-600" />
             <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-widest">Cập nhật Luật 2026</span>
          </div>
          <h1 className="text-3xl font-bold text-slate-900 flex items-center justify-center gap-3">
            Phân Tích & Lộ Trình Tài Chính
          </h1>
          <p className="text-slate-600 mt-2">Xây dựng kế hoạch trả nợ khả thi trong 6 tháng tới.</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Input Form */}
          <div className="lg:col-span-1 bg-white p-6 rounded-xl shadow-sm border border-slate-200 h-fit">
            <h3 className="font-semibold text-slate-800 mb-4 border-b pb-2">Thông tin tài chính (Triệu VNĐ)</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-600 mb-1">Thu nhập hàng tháng</label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                  <input 
                    type="number" 
                    value={income}
                    onChange={(e) => setIncome(Number(e.target.value))}
                    className="w-full pl-9 rounded-lg border-slate-300 border p-2.5 focus:ring-emerald-500 focus:border-emerald-500" 
                    placeholder="VD: 15"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-600 mb-1">Tổng dư nợ hiện tại</label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                  <input 
                    type="number" 
                    value={debt}
                    onChange={(e) => setDebt(Number(e.target.value))}
                    className="w-full pl-9 rounded-lg border-slate-300 border p-2.5 focus:ring-emerald-500 focus:border-emerald-500" 
                    placeholder="VD: 100"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-600 mb-1">Chi phí sinh hoạt tối thiểu</label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                  <input 
                    type="number" 
                    value={expenses}
                    onChange={(e) => setExpenses(Number(e.target.value))}
                    className="w-full pl-9 rounded-lg border-slate-300 border p-2.5 focus:ring-emerald-500 focus:border-emerald-500" 
                    placeholder="VD: 8"
                  />
                </div>
              </div>
              <button 
                onClick={handleAnalyze}
                disabled={loading || !income || !debt || !expenses}
                className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-300 text-white font-semibold rounded-lg transition-colors flex items-center justify-center gap-2 mt-4"
              >
                {loading ? <Loader2 className="animate-spin w-5 h-5" /> : "Lập Lộ Trình"}
              </button>
            </div>
          </div>

          {/* Analysis & Chart */}
          <div className="lg:col-span-2 space-y-6">
            {roadmap ? (
              <>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                  <h3 className="font-semibold text-slate-800 mb-4">Biểu đồ Dự phóng Dư nợ vs Tích lũy</h3>
                  <div className="h-72 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={roadmap.data}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                        <XAxis dataKey="month" stroke="#64748b" fontSize={12} />
                        <YAxis stroke="#64748b" fontSize={12} />
                        <Tooltip contentStyle={{backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #e2e8f0'}} />
                        <Legend />
                        <Line type="monotone" dataKey="remainingDebt" name="Dư nợ còn lại" stroke="#ef4444" strokeWidth={2} dot={{r: 4}} />
                        <Line type="monotone" dataKey="savings" name="Khả năng trả nợ tích lũy" stroke="#10b981" strokeWidth={2} dot={{r: 4}} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div className="bg-emerald-50 p-6 rounded-xl border border-emerald-100">
                  <h3 className="font-bold text-emerald-800 mb-3">Đánh giá từ Chuyên gia</h3>
                  <p className="text-slate-700 whitespace-pre-line leading-relaxed">{roadmap.analysis}</p>
                </div>
              </>
            ) : (
              <div className="h-full bg-slate-50 rounded-xl border border-dashed border-slate-300 flex items-center justify-center p-12 text-slate-400 text-center">
                <div>
                  <TrendingUp className="w-16 h-16 mx-auto mb-4 opacity-20" />
                  <p>Nhập số liệu để AI phân tích khả năng trả nợ của bạn</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinancialRoadmap;
