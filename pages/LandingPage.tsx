
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  ShieldAlert, TrendingUp, Scale, AlertTriangle, ArrowRight, 
  BookOpen, Search, ShieldCheck, ChevronRight, ChevronLeft, Lightbulb 
} from 'lucide-react';

const QUICK_TIPS = [
  {
    id: 1,
    title: "Bảo vệ dữ liệu cá nhân",
    content: "Nghị định 13/2023/NĐ-CP (Cập nhật 2026) nghiêm cấm việc truy cập danh bạ và sử dụng hình ảnh cá nhân để quấy rối. Bạn có quyền tố cáo ngay lập tức.",
    category: "Pháp lý",
    icon: <ShieldCheck className="w-4 h-4" />
  },
  {
    id: 2,
    title: "Giới hạn nhắc nợ",
    content: "Theo Luật Các tổ chức tín dụng 2024, bên đòi nợ chỉ được liên lạc tối đa 5 lần/ngày và tuyệt đối không được gọi cho người thân, đồng nghiệp.",
    category: "Quy định",
    icon: <TrendingUp className="w-4 h-4" />
  },
  {
    id: 3,
    title: "Tố cáo cưỡng đoạt",
    content: "Mọi hành vi đe dọa gây áp lực tinh thần để ép trả nợ đều có dấu hiệu của tội Cưỡng đoạt tài sản (Điều 170 BLHS). Hãy ghi âm làm bằng chứng.",
    category: "Hình sự",
    icon: <ShieldAlert className="w-4 h-4" />
  }
];

const LandingPage: React.FC = () => {
  const [currentTip, setCurrentTip] = useState(0);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      nextTip();
    }, 6000);
    return () => clearInterval(timer);
  }, [currentTip]);

  const nextTip = () => {
    setIsFading(true);
    setTimeout(() => {
      setCurrentTip((prev) => (prev + 1) % QUICK_TIPS.length);
      setIsFading(false);
    }, 300);
  };

  const prevTip = () => {
    setIsFading(true);
    setTimeout(() => {
      setCurrentTip((prev) => (prev - 1 + QUICK_TIPS.length) % QUICK_TIPS.length);
      setIsFading(false);
    }, 300);
  };

  const tools = [
    { title: "Mất KN Thanh Toán", desc: "Quy trình đối diện văn minh & đàm phán tái cơ cấu nợ.", icon: <AlertTriangle />, path: "/tools/insolvency", color: "bg-orange-500", delay: "0" },
    { title: "Soạn Văn Bản AI", desc: "Đơn giãn nợ, tố giác hình sự & yêu cầu bảo mật dữ liệu.", icon: <Scale />, path: "/tools/legal-docs", color: "bg-blue-600", delay: "100" },
    { title: "Giải Mã Văn Bản", desc: "Bóc tách thuật ngữ hù dọa, chỉ rõ điểm đúng/sai pháp lý.", icon: <BookOpen />, path: "/tools/decoder", color: "bg-indigo-600", delay: "200" },
    { title: "Đối Kháng Tự Vệ", desc: "Chặn đứng quấy rối danh dự & phản đòn tâm lý đòi nợ.", icon: <ShieldAlert />, path: "/tools/response", color: "bg-red-600", delay: "300" },
    { title: "Lộ Trình Trả Nợ", desc: "Kế hoạch thoát nợ 6 tháng dựa trên thu nhập thực tế.", icon: <TrendingUp />, path: "/tools/roadmap", color: "bg-emerald-600", delay: "400" },
    { title: "Cố Vấn AI 24/7", desc: "Hỏi đáp pháp lý & tài chính tức thời với dữ liệu 2026.", icon: <Search />, path: "/chat", color: "bg-violet-600", delay: "500" },
  ];

  return (
    <div className="flex flex-col space-y-8 md:space-y-12 animate-fade-in-up pb-12">
      {/* Hero Section - Editorial Style */}
      <section className="relative bg-slate-900 rounded-[2rem] md:rounded-[3rem] p-8 md:p-16 text-white overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/4"></div>
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-blue-500/10 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/4"></div>
        
        <div className="relative z-10 grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 md:space-y-8">
            <div className="inline-flex items-center space-x-3 bg-white/5 px-4 py-1.5 rounded-full border border-white/10 backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse shadow-[0_0_10px_rgba(245,158,11,0.5)]"></span>
              <span className="text-[10px] md:text-xs font-black uppercase tracking-[0.2em] text-amber-200">Hệ thống bảo vệ 2026</span>
            </div>
            
            <h1 className="text-4xl md:text-7xl font-black leading-[0.9] tracking-tighter">
              Tấm Khiên <br />
              <span className="text-amber-500 font-serif italic font-normal">Pháp Lý</span> <br />
              Vững Chắc
            </h1>
            
            <p className="text-slate-400 text-sm md:text-lg leading-relaxed max-w-md font-medium">
              Chúng tôi cung cấp công cụ AI chuyên sâu giúp bạn tái thiết tài chính và chặn đứng mọi hành vi đòi nợ trái luật.
            </p>
            
            <div className="flex flex-wrap gap-4 pt-4">
              <Link to="/tools/insolvency" className="px-8 py-4 bg-amber-500 hover:bg-amber-600 text-slate-900 font-black rounded-2xl transition-all shadow-xl shadow-amber-500/20 active:scale-95 flex items-center gap-2">
                Bắt đầu ngay <ArrowRight className="w-5 h-5" />
              </Link>
              <Link to="/chat" className="px-8 py-4 bg-white/5 hover:bg-white/10 text-white font-bold rounded-2xl border border-white/10 transition-all backdrop-blur-md active:scale-95">
                Hỏi Cố Vấn AI
              </Link>
            </div>
          </div>
          
          <div className="hidden lg:block relative">
            <div className="absolute inset-0 bg-gradient-to-tr from-amber-500/20 to-transparent rounded-[3rem] blur-3xl"></div>
            <div className="relative bg-slate-800/50 border border-white/10 backdrop-blur-xl p-8 rounded-[3rem] shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-700">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 bg-amber-500 rounded-2xl flex items-center justify-center text-slate-900 shadow-lg">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-black text-white uppercase tracking-widest text-xs">Trạng thái bảo vệ</h4>
                  <p className="text-amber-500 text-[10px] font-bold">Đang hoạt động 24/7</p>
                </div>
              </div>
              
              <div className="space-y-4">
                {[1, 2, 3].map(i => (
                  <div key={i} className="h-2 bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-amber-500/50 rounded-full" style={{ width: `${Math.random() * 60 + 40}%` }}></div>
                  </div>
                ))}
              </div>
              
              <div className="mt-8 grid grid-cols-2 gap-4">
                <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
                  <p className="text-[10px] text-slate-500 font-bold uppercase mb-1">Dữ liệu luật</p>
                  <p className="text-xl font-black text-white">2026</p>
                </div>
                <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
                  <p className="text-[10px] text-slate-500 font-bold uppercase mb-1">Độ chính xác</p>
                  <p className="text-xl font-black text-amber-500">99.8%</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Tips - Marquee Style feel */}
      <section className="relative px-2">
        <div className="bg-white rounded-[2rem] border border-slate-200 shadow-xl p-6 md:p-8 flex flex-col md:flex-row items-center gap-6 relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-2 h-full bg-amber-500"></div>
          
          <div className="shrink-0 w-14 h-14 bg-amber-50 rounded-2xl flex items-center justify-center text-amber-600 shadow-inner group-hover:rotate-12 transition-transform duration-500">
            <Lightbulb className="w-7 h-7" />
          </div>

          <div className="flex-grow text-center md:text-left">
            <div className={`transition-all duration-500 ${isFading ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}>
              <div className="flex flex-col md:flex-row items-center gap-2 mb-2">
                <span className="px-2 py-0.5 bg-amber-100 text-[10px] font-black text-amber-700 rounded-md uppercase tracking-wider">{QUICK_TIPS[currentTip].category}</span>
                <h3 className="text-lg font-black text-slate-900 tracking-tight">
                  {QUICK_TIPS[currentTip].title}
                </h3>
              </div>
              <p className="text-sm md:text-base text-slate-600 leading-relaxed font-medium italic">
                "{QUICK_TIPS[currentTip].content}"
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button onClick={prevTip} className="w-10 h-10 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-400 hover:text-amber-600 active:scale-90 transition-all flex items-center justify-center border border-slate-100">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button onClick={nextTip} className="w-10 h-10 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-400 hover:text-amber-600 active:scale-90 transition-all flex items-center justify-center border border-slate-100">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* Tools Grid - Bento Style */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {tools.map((tool, idx) => (
          <Link 
            key={idx} 
            to={tool.path}
            className="group bg-white p-8 rounded-[2.5rem] border border-slate-200 hover:border-amber-500/50 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 flex flex-col relative overflow-hidden min-h-[220px] active:scale-[0.98]"
          >
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 text-white shadow-xl transition-all group-hover:scale-110 group-hover:rotate-6 duration-500 ${tool.color}`}>
              {React.cloneElement(tool.icon as React.ReactElement<{ className?: string }>, { className: "w-7 h-7" })}
            </div>
            
            <h3 className="text-xl font-black text-slate-900 mb-2 group-hover:text-amber-600 transition-colors">{tool.title}</h3>
            <p className="text-xs text-slate-500 leading-relaxed mb-8 font-medium">{tool.desc}</p>
            
            <div className="mt-auto flex items-center justify-between pt-4 border-t border-slate-50">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] group-hover:text-amber-500 transition-colors">Truy cập ngay</span>
              <div className="w-8 h-8 rounded-full bg-slate-50 group-hover:bg-amber-500 flex items-center justify-center transition-all group-hover:translate-x-1">
                <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-slate-900" />
              </div>
            </div>

            {/* Subtle background pattern */}
            <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-slate-50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
          </Link>
        ))}
        
        {/* Community Card - Specialized Design */}
        <div className="lg:col-span-2 bg-slate-900 p-8 md:p-12 rounded-[2.5rem] border border-slate-800 flex flex-col md:flex-row items-center justify-between relative overflow-hidden group shadow-2xl">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-amber-500/5 to-transparent"></div>
          <ShieldCheck className="absolute -right-10 -bottom-10 w-48 h-48 text-white/5 group-hover:scale-110 group-hover:rotate-12 transition-transform duration-1000" />
          
          <div className="relative z-10 space-y-4 text-center md:text-left">
            <h4 className="text-amber-500 text-xs font-black uppercase tracking-[0.3em]">Cộng đồng Bố 3 Con</h4>
            <h2 className="text-2xl md:text-4xl font-black text-white leading-tight">
              Bạn không bao giờ <br /> phải <span className="text-amber-500 italic font-serif font-normal">đơn độc</span>.
            </h2>
            <p className="text-slate-400 text-sm max-w-sm font-medium">
              Tham gia cùng hàng ngàn người đã lấy lại được sự tự do tài chính và bình yên cho gia đình.
            </p>
          </div>
          
          <div className="relative z-10 mt-8 md:mt-0">
            <button className="px-10 py-5 bg-white text-slate-900 font-black rounded-2xl hover:bg-amber-500 transition-all shadow-xl active:scale-95">
              Tham Gia Ngay
            </button>
          </div>
        </div>

        {/* Mini Stat Card */}
        <div className="bg-emerald-600 p-8 rounded-[2.5rem] flex flex-col justify-between text-white shadow-xl shadow-emerald-600/20 group hover:bg-emerald-500 transition-colors">
          <TrendingUp className="w-10 h-10 mb-6 group-hover:scale-110 transition-transform" />
          <div>
            <p className="text-[10px] font-black uppercase tracking-widest opacity-60 mb-1">Tỉ lệ thành công</p>
            <h3 className="text-4xl font-black tracking-tighter">85%</h3>
            <p className="text-[10px] mt-2 font-medium opacity-80">Người dùng đã tái cơ cấu nợ thành công trong năm 2025.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
