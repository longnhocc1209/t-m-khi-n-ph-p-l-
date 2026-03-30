
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Shield, BookOpen, TrendingUp, Scale, AlertTriangle, Home, Menu, X, ChevronRight } from 'lucide-react';
import AIChatWidget from './AIChatWidget';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { path: '/', label: 'Trang chủ', icon: <Home /> },
    { path: '/tools/insolvency', label: 'Mất KN Thanh Toán', icon: <AlertTriangle /> },
    { path: '/tools/legal-docs', label: 'Soạn Văn Bản', icon: <Scale /> },
    { path: '/tools/decoder', label: 'Giải Mã Văn Bản', icon: <BookOpen /> },
    { path: '/tools/response', label: 'Đối Kháng Phản Hồi', icon: <Shield /> },
    { path: '/tools/roadmap', label: 'Lộ Trình Tài Chính', icon: <TrendingUp /> },
  ];

  return (
    <div className="h-screen bg-slate-50 flex flex-col md:flex-row overflow-hidden">
      {/* Sidebar - Desktop */}
      <aside className="hidden md:flex flex-col w-72 bg-slate-900 border-r border-slate-800 h-screen sticky top-0 z-40 text-slate-300 shrink-0 shadow-[20px_0_50px_rgba(0,0,0,0.2)]">
        <div className="p-8 flex flex-col h-full">
          <Link to="/" className="flex items-center space-x-4 mb-12 group">
            <div className="bg-amber-500 p-3 rounded-2xl shadow-lg shadow-amber-500/20 group-hover:rotate-12 transition-transform duration-500">
              <Shield className="w-6 h-6 text-slate-900" />
            </div>
            <div>
              <h1 className="font-black text-white text-lg tracking-tighter leading-none uppercase">Bố 3 Con</h1>
              <span className="text-[9px] text-slate-500 uppercase tracking-[0.3em] font-black">Shield of Justice</span>
            </div>
          </Link>

          <nav className="space-y-2 flex-grow">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`flex items-center space-x-4 px-5 py-4 rounded-2xl transition-all duration-500 group relative overflow-hidden ${
                    isActive 
                    ? 'bg-amber-500 text-slate-900 font-black shadow-xl shadow-amber-500/20' 
                    : 'hover:bg-white/5 text-slate-400 hover:text-white'
                  }`}
                >
                  <div className={`shrink-0 transition-colors duration-500 ${isActive ? 'text-slate-900' : 'text-slate-500 group-hover:text-amber-500'}`}>
                    {React.cloneElement(link.icon as React.ReactElement<{ className?: string }>, { className: "w-5 h-5" })}
                  </div>
                  <span className="text-xs uppercase tracking-widest font-bold">{link.label}</span>
                  
                  {isActive && (
                    <div className="absolute right-0 top-0 bottom-0 w-1 bg-slate-900/10"></div>
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="mt-auto pt-8 border-t border-slate-800/50">
            <div className="bg-slate-800/30 p-5 rounded-[2rem] border border-slate-800/50 text-center group hover:bg-slate-800/50 transition-colors">
              <p className="text-[9px] text-slate-500 leading-relaxed font-bold uppercase tracking-widest mb-2">Hỗ trợ 24/7</p>
              <p className="text-[10px] text-slate-400 font-medium italic">"Kiến thức là sức mạnh, <br /> bình tĩnh là chiến thắng."</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Header - Mobile */}
      <header className={`md:hidden fixed top-0 left-0 right-0 z-[60] transition-all duration-300 ${scrolled || isMobileMenuOpen ? 'bg-slate-900 shadow-xl py-4' : 'bg-white/90 backdrop-blur-lg border-b border-slate-100 py-4'}`}>
        <div className="px-5 flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2">
            <div className={`p-1.5 rounded-lg ${scrolled || isMobileMenuOpen ? 'bg-amber-500 text-slate-900' : 'bg-slate-900 text-amber-500'}`}>
              <Shield className="w-4 h-4" />
            </div>
            <span className={`font-black text-sm uppercase tracking-tighter ${scrolled || isMobileMenuOpen ? 'text-white' : 'text-slate-900'}`}>Bố 3 Con</span>
          </Link>
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`w-10 h-10 flex items-center justify-center rounded-xl transition-colors ${scrolled || isMobileMenuOpen ? 'bg-white/10 text-white' : 'bg-slate-100 text-slate-900'}`}
            aria-label="Menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-[55] bg-slate-900 pt-24 animate-fade-in overflow-y-auto pb-safe">
          <nav className="p-5 space-y-3">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`flex items-center justify-between p-5 rounded-2xl transition-all active:scale-[0.98] ${
                    isActive ? 'bg-amber-500 text-slate-900 shadow-lg shadow-amber-500/20' : 'bg-white/5 text-slate-300 border border-white/5'
                  }`}
                >
                  <div className="flex items-center space-x-4">
                    {React.cloneElement(link.icon as React.ReactElement<{ className?: string }>, { className: "w-5 h-5" })}
                    <span className="font-bold text-base">{link.label}</span>
                  </div>
                  <ChevronRight className={`w-5 h-5 ${isActive ? 'text-slate-900' : 'text-slate-600'}`} />
                </Link>
              );
            })}
          </nav>
          <div className="p-5 mt-4">
            <div className="bg-white/5 border border-white/10 p-4 rounded-2xl text-center">
              <p className="text-[10px] text-slate-500 font-black uppercase tracking-[0.2em]">Cộng đồng hỗ trợ 2026</p>
              <p className="text-[9px] text-slate-600 mt-1">Lạc quan - Am hiểu - Vượt khó</p>
            </div>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <main className="flex-grow h-full pt-[72px] md:pt-0 overflow-hidden relative flex flex-col bg-slate-50">
        {/* Atmospheric Background Elements */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-amber-500/[0.03] rounded-full blur-[120px] -translate-y-1/2 translate-x-1/4 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-500/[0.03] rounded-full blur-[100px] translate-y-1/2 -translate-x-1/4 pointer-events-none"></div>

        <div className="flex-grow overflow-y-auto custom-scrollbar scrolling-touch relative z-10">
          <div className="container mx-auto p-6 md:p-12 max-w-7xl pb-safe">
            {children}
          </div>
        </div>
      </main>

      <AIChatWidget />
    </div>
  );
};

export default Layout;
