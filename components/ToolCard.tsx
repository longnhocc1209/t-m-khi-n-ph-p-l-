import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

interface ToolCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  path: string;
  colorClass: string;
}

const ToolCard: React.FC<ToolCardProps> = ({ title, description, icon, path, colorClass }) => {
  return (
    <Link to={path} className="group block h-full">
      <div className="bg-white h-full rounded-2xl border border-slate-200 p-8 transition-all duration-300 ease-out hover:shadow-xl hover:shadow-slate-200/50 hover:-translate-y-2 hover:border-orange-200 relative overflow-hidden">
        {/* Decorative Background Blob */}
        <div className={`absolute -right-6 -top-6 w-24 h-24 rounded-full opacity-5 transition-transform group-hover:scale-150 duration-500 ${colorClass.replace('text', 'bg')}`}></div>
        
        <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 shadow-md transition-transform group-hover:rotate-3 duration-300 ${colorClass} text-white`}>
          {React.cloneElement(icon as React.ReactElement<{ className?: string }>, { className: "w-7 h-7" })}
        </div>
        
        <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-orange-600 transition-colors">
          {title}
        </h3>
        
        <p className="text-slate-600 text-sm mb-6 leading-relaxed">
          {description}
        </p>
        
        <div className="flex items-center text-sm font-semibold text-orange-600">
          <span className="relative">
            Sử dụng ngay
            <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-orange-600 transition-all group-hover:w-full"></span>
          </span>
          <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
        </div>
      </div>
    </Link>
  );
};

export default ToolCard;