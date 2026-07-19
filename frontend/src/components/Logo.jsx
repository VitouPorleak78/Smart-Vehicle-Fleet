import React from 'react';
import { Car } from 'lucide-react';

export default function Logo() {
  return (
    <div className="flex items-center gap-3">
      {/* Icon frame with corporate accent background */}
      <div className="bg-white/10 p-2 rounded-lg flex items-center justify-center">
        <Car className="h-5 w-5 text-white" />
      </div>
      <div>
        <h2 className="text-[11px] font-black uppercase text-white tracking-wider leading-tight">
          Fleet Management
        </h2>
        <span className="text-[10px] font-bold text-slate-400 tracking-widest uppercase block">
          System
        </span>
      </div>
    </div>
  );
}