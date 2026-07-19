import React from 'react';

export default function Logo({ variant = 'light', size = 'md' }) {
  // Handle sizing classes dynamically
  const sizeClasses = {
    sm: { svg: 'h-6 w-6', text: 'text-sm', sub: 'text-[9px]' },
    md: { svg: 'h-8 w-8', text: 'text-base', sub: 'text-[10px]' },
    lg: { svg: 'h-12 w-12', text: 'text-xl', sub: 'text-xs' }
  };

  const currentSize = sizeClasses[size] || sizeClasses.md;

  // Handle light/dark themes depending on background placement
  const isDarkBg = variant === 'dark-bg'; // Used for the deep navy sidebar

  return (
    <div className="flex items-center gap-3">
      {/* The "Digital Horizon" Abstract Data Marks */}
      <svg 
        className={currentSize.svg} 
        viewBox="0 0 32 32" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M6 24L12 8H16L10 24H6Z" fill="#38BDF8" opacity="0.3" />
        <path d="M12 24L18 8H22L16 24H12Z" fill="#38BDF8" opacity="0.6" />
        <path d="M18 24L24 8H28L26 13.5L29 13.5L22 24H18Z" fill="#38BDF8" />
      </svg>
      
      {/* Updated Branding Typography */}
      <div>
        <h2 className={`font-normal tracking-tight leading-none ${currentSize.text} ${isDarkBg ? 'text-white' : 'text-[#0F172A]'}`}>
          <span className={`font-black ${isDarkBg ? 'text-slate-100' : 'text-sky-600'}`}>Fleet</span>Management
        </h2>
        <span className={`font-semibold tracking-wider uppercase block mt-1 ${currentSize.sub} ${isDarkBg ? 'text-slate-500' : 'text-[#64748B]'}`}>
          Admin Suite
        </span>
      </div>
    </div>
  );
}
